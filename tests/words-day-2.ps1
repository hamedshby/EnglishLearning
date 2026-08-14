$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/words-day-2.html'

if (-not (Test-Path -LiteralPath $lessonPath)) {
    throw 'days/words-day-2.html does not exist'
}

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')

$expectedEntries = @(
    'fell off',
    'looks like I found it',
    'Give some noise',
    'embarrass',
    "That's not gonna happen",
    'adore',
    'spot',
    'Have you decided on something?',
    'make it quick',
    'strange'
)

foreach ($entry in $expectedEntries) {
    if (-not $lesson.Contains("<h3>$entry</h3>")) {
        throw "words-day-2.html is missing entry: $entry"
    }
}

if ($lesson.Contains('<h3>weirdos</h3>')) {
    throw 'words-day-2.html must not retain entries moved to day 3'
}

$entryCount = ([regex]::Matches($lesson, '<div class="word-entry">')).Count
if ($entryCount -ne 10) {
    throw "words-day-2.html must contain exactly 10 entries; found $entryCount"
}

$exampleCount = ([regex]::Matches($lesson, '<li><strong class="word-tense-label">')).Count
if ($exampleCount -ne 70) {
    throw "words-day-2.html must contain exactly 70 tense examples; found $exampleCount"
}

@(
    'Present Simple',
    'Present Continuous',
    'Past Simple',
    'Past Continuous',
    'Present Perfect',
    'Past Perfect',
    'Future'
) | ForEach-Object {
    $tenseCount = ([regex]::Matches($lesson, [regex]::Escape($_))).Count
    if ($tenseCount -ne 10) {
        throw "Each entry must include $_; found $tenseCount occurrences"
    }
}

$baseFormNoteCount = ([regex]::Matches(
    $lesson,
    '<div class="word-entry-heading"><h3>[^<]+</h3><p>[^<]+</p></div>'
)).Count
if ($baseFormNoteCount -ne 10) {
    throw "Each entry must include a base-form or grammar note; found $baseFormNoteCount"
}

if ($lesson.Contains('<audio')) {
    throw 'words-day-2.html must not reference audio until day-two recordings exist'
}

@(
    'data-lesson-id="12"',
    'data-file="days/words-day-2.html"',
    'data-title=',
    '<span class="lesson-number">',
    '<span class="lesson-menu-content">',
    '<small>'
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing day-two vocabulary menu content: $_"
    }
}

Write-Output 'Words day 2 acceptance checks passed.'
