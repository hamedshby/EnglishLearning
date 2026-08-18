$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/polymorphism.html'

if (-not (Test-Path -LiteralPath $lessonPath)) {
    throw 'days/polymorphism.html does not exist'
}

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$title = 'Polymorphism'

@(
    'data-lesson-id="18"',
    'data-file="days/polymorphism.html"',
    ('data-title="{0}"' -f $title),
    '<strong>Polymorphism</strong>',
    '<small>One Interface, Many Behaviors</small>'
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing Polymorphism navigation content: $_"
    }
}

if (-not $lesson.Contains("<h1>$title</h1>")) {
    throw 'polymorphism.html is missing the requested title'
}

@(
    'public virtual void Pay()',
    'public override void Pay()',
    'Payment payment = new CreditCardPayment();',
    'Payment payment = new PayPalPayment();',
    'public interface IPayment',
    'List&lt;Payment&gt; payments = new()',
    './audio/CPodcast/Polymorphism.mp3',
    '<table class="vocabulary-table',
    'id="completeLessonButton"'
) | ForEach-Object {
    if (-not $lesson.Contains($_)) {
        throw "polymorphism.html is missing required lesson content: $_"
    }
}

$englishCards = ([regex]::Matches($lesson, 'class="sentence-english"')).Count
$persianCards = ([regex]::Matches($lesson, 'class="sentence-persian"')).Count
if ($englishCards -ne $persianCards -or $englishCards -lt 40) {
    throw "Transcript must contain at least 40 paired English/Persian cards; found $englishCards English and $persianCards Persian"
}

$vocabularyRows = ([regex]::Matches($lesson, '<tr class="vocabulary-row">')).Count
if ($vocabularyRows -lt 15) {
    throw "polymorphism.html must contain at least 15 difficult vocabulary entries; found $vocabularyRows"
}

Write-Output 'Dotnet podcast Polymorphism acceptance checks passed.'
