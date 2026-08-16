$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/encapsulation.html'

if (-not (Test-Path -LiteralPath $lessonPath)) {
    throw 'days/encapsulation.html does not exist'
}

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$title = 'Encapsulation in .NET'

@(
    'data-lesson-id="15"',
    'data-file="days/encapsulation.html"',
    ('data-title="{0}"' -f $title),
    '<strong>Encapsulation</strong>'
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing Encapsulation navigation content: $_"
    }
}

if (-not $lesson.Contains("<h1>$title</h1>")) {
    throw 'encapsulation.html is missing the requested title'
}

@(
    'public decimal Balance { get; set; }',
    'public decimal Balance { get; private set; }',
    'public void Deposit(decimal amount)',
    'public void Withdraw(decimal amount)',
    'private',
    'public',
    'protected',
    'internal',
    '<table class="vocabulary-table',
    'id="completeLessonButton"'
) | ForEach-Object {
    if (-not $lesson.Contains($_)) {
        throw "encapsulation.html is missing required lesson content: $_"
    }
}

$englishCards = ([regex]::Matches($lesson, 'class="sentence-english"')).Count
$persianCards = ([regex]::Matches($lesson, 'class="sentence-persian"')).Count
if ($englishCards -ne $persianCards -or $englishCards -lt 25) {
    throw "Transcript must contain at least 25 paired English/Persian cards; found $englishCards English and $persianCards Persian"
}

$vocabularyRows = ([regex]::Matches($lesson, '<tr class="vocabulary-row">')).Count
if ($vocabularyRows -lt 15) {
    throw "encapsulation.html must contain at least 15 difficult vocabulary entries; found $vocabularyRows"
}

Write-Output 'Dotnet podcast Encapsulation acceptance checks passed.'
