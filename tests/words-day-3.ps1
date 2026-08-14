$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/words-day-3.html'
if (-not (Test-Path -LiteralPath $lessonPath)) { throw 'days/words-day-3.html does not exist' }

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$expectedEntries = @(
    'weirdos',
    'You totally owned her',
    'That would never have happened to you',
    ('Bon app' + [char]0x00E9 + 'tit'),
    'tough guy',
    'cleavage',
    'low-cut',
    "I'll have a Greek salad",
    'deserve',
    'Want to raise the stakes a bit?'
)

foreach ($entry in $expectedEntries) {
    if (-not $lesson.Contains("<h3>$entry</h3>")) { throw "words-day-3.html is missing entry: $entry" }
}

if ($lesson.Contains('<h3>fell off</h3>')) {
    throw 'words-day-3.html must not duplicate entries retained in day 2'
}

$entryCount = ([regex]::Matches($lesson, '<div class="word-entry">')).Count
$exampleCount = ([regex]::Matches($lesson, '<li><strong class="word-tense-label">')).Count
if ($entryCount -ne 10) { throw "words-day-3.html must contain 10 entries; found $entryCount" }
if ($exampleCount -ne 70) { throw "words-day-3.html must contain 70 examples; found $exampleCount" }

@('Present Simple','Present Continuous','Past Simple','Past Continuous','Present Perfect','Past Perfect','Future') | ForEach-Object {
    $count = ([regex]::Matches($lesson, [regex]::Escape($_))).Count
    if ($count -ne 10) { throw "Each day-three entry must include $_; found $count" }
}

@(
    'data-lesson-id="13"',
    'data-file="days/words-day-3.html"',
    'data-title=',
    '<small>'
) | ForEach-Object {
    if (-not $index.Contains($_)) { throw "index.html is missing day-three vocabulary menu content: $_" }
}

Write-Output 'Words day 3 acceptance checks passed.'
