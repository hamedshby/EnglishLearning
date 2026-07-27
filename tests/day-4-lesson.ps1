$ErrorActionPreference = 'Stop'

$projectRoot = Split-Path -Parent $PSScriptRoot
$day4Path = Join-Path $projectRoot 'days/day-4.html'
$indexPath = Join-Path $projectRoot 'index.html'
$day3Path = Join-Path $projectRoot 'days/day-3.html'

if (-not (Test-Path -LiteralPath $day4Path)) {
    throw 'days/day-4.html does not exist'
}

$day4 = Get-Content -Raw -Encoding UTF8 -LiteralPath $day4Path
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath $indexPath
$day3 = Get-Content -Raw -Encoding UTF8 -LiteralPath $day3Path

@(
    '<section class="lesson-hero">',
    '<div class="section-number">06</div>',
    'Tell me about a technical challenge you faced and how you solved it.',
    'Situation',
    'Task',
    'Action',
    'Result',
    'two seconds',
    '500 milliseconds',
    'id="completeLessonButton"',
    'data-navigation-id="3"'
) | ForEach-Object {
    if (-not $day4.Contains($_)) {
        throw "day-4.html is missing: $_"
    }
}

@('audio/day-4-word.mp3', 'audio/day-4.mp3') | ForEach-Object {
    if (-not (Test-Path -LiteralPath (Join-Path $projectRoot $_))) {
        throw "day-4.html references missing audio: $_"
    }
}

if (-not $index.Contains('data-lesson-id="4"')) {
    throw 'index.html has no day 4 menu item'
}

if (-not $day3.Contains('data-navigation-id="4"')) {
    throw 'day-3.html has no day 4 navigation'
}

Write-Output 'Day 4 lesson acceptance checks passed.'
