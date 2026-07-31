$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$day7Path = Join-Path $root 'days/day-7.html'

if (-not (Test-Path -LiteralPath $day7Path)) {
    throw 'days/day-7.html does not exist'
}

$day7 = Get-Content -Raw -Encoding UTF8 -LiteralPath $day7Path
$day6 = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'days/day-6.html')
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')

@(
    '<section class="lesson-hero">',
    'Priorities &amp; Deadlines',
    '<div class="section-number">01</div>',
    '<div class="section-number">02</div>',
    '<div class="section-number">03</div>',
    '<div class="section-number">04</div>',
    '<div class="section-number">05</div>',
    '<div class="section-number">06</div>',
    'Tell me about a time you had to manage competing priorities.',
    '<strong>Situation:</strong>',
    '<strong>Task:</strong>',
    '<strong>Action:</strong>',
    '<strong>Result:</strong>',
    'Given the deadline',
    'I communicated the risk to the stakeholders early',
    'Could we reduce the scope',
    'id="completeLessonButton"',
    'data-navigation-id="6"'
) | ForEach-Object {
    if (-not $day7.Contains($_)) {
        throw "day-7.html is missing: $_"
    }
}

@(
    'priority',
    'deadline',
    'scope',
    'estimate',
    'blocker',
    'urgent',
    'impact',
    'trade-off',
    'stakeholder',
    'reprioritize'
) | ForEach-Object {
    if (-not $day7.Contains($_)) {
        throw "day-7.html is missing vocabulary: $_"
    }
}

if ($day7 -match '\.mp3') {
    throw 'day-7.html references audio that is not part of this change'
}

if (-not $index.Contains('data-lesson-id="7"')) {
    throw 'index.html has no day 7 menu item'
}

if (-not $index.Contains('data-file="days/day-7.html"')) {
    throw 'index.html has the wrong day 7 file path'
}

if (-not $day6.Contains('data-navigation-id="7"')) {
    throw 'day-6.html has no day 7 navigation'
}

Write-Output 'Day 7 lesson acceptance checks passed.'
