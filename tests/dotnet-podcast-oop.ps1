$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/oop.html'

if (-not (Test-Path -LiteralPath $lessonPath)) {
    throw 'days/oop.html does not exist'
}

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$title = 'OOP in .NET — Why Do We Need Object-Oriented Programming?'

@(
    'id="dotnetPodcastToggle"',
    'aria-controls="dotnetPodcastLessons"',
    'پادکست دات‌نت',
    'data-lesson-id="14"',
    'data-file="days/oop.html"',
    ('data-title="{0}"' -f $title)
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing podcast navigation content: $_"
    }
}

if (-not $lesson.Contains("<h1>$title</h1>")) {
    throw 'oop.html is missing the requested title'
}

@(
    'Object-Oriented Programming is a way of designing software',
    'برنامه‌نویسی شیءگرا روشی برای طراحی نرم‌افزار است',
    'Encapsulation',
    'Inheritance',
    'Polymorphism',
    'Abstraction',
    'var laptop = new Product();',
    '<table class="vocabulary-table',
    'id="completeLessonButton"'
) | ForEach-Object {
    if (-not $lesson.Contains($_)) {
        throw "oop.html is missing required lesson content: $_"
    }
}

if ($lesson -match '(?i)day[- ]?1|روز اول') {
    throw 'oop.html must not use day1 or روز اول as its filename or title'
}

$vocabularyRows = ([regex]::Matches($lesson, '<tr class="vocabulary-row">')).Count
if ($vocabularyRows -lt 15) {
    throw "oop.html must contain at least 15 difficult vocabulary entries; found $vocabularyRows"
}

Write-Output 'Dotnet podcast OOP acceptance checks passed.'
