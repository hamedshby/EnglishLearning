$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$day5Path = Join-Path $root 'days/day-5.html'

if (-not (Test-Path -LiteralPath $day5Path)) {
    throw 'days/day-5.html does not exist'
}

$day5 = Get-Content -Raw -Encoding UTF8 -LiteralPath $day5Path
$day4 = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'days/day-4.html')
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')

@(
    '<section class="lesson-hero">',
    '<div class="section-number">06</div>',
    'Tell me about a time you disagreed with a teammate. How did you handle it?',
    'Situation',
    'Task',
    'Action',
    'Result',
    'I understand your concern',
    'id="completeLessonButton"',
    'data-navigation-id="4"'
) | ForEach-Object {
    if (-not $day5.Contains($_)) { throw "day-5.html is missing: $_" }
}

if ($day5 -match 'day-5.*\.mp3') { throw 'day-5.html references missing audio' }
if (-not $index.Contains('data-lesson-id="5"')) { throw 'index.html has no day 5 menu item' }
if (-not $day4.Contains('data-navigation-id="5"')) { throw 'day-4.html has no day 5 navigation' }

Write-Output 'Day 5 lesson acceptance checks passed.'
