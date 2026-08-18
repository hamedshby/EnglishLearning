$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$lessonPath = Join-Path $root 'days/abstraction.html'

if (-not (Test-Path -LiteralPath $lessonPath)) {
    throw 'days/abstraction.html does not exist'
}

$lesson = Get-Content -Raw -Encoding UTF8 -LiteralPath $lessonPath
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$title = 'Abstraction'

@(
    'data-lesson-id="19"',
    'data-file="days/abstraction.html"',
    ('data-title="{0}"' -f $title),
    '<strong>Abstraction</strong>',
    '<small>Hiding Complexity Behind Clear Contracts</small>'
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing Abstraction navigation content: $_"
    }
}

if (-not $lesson.Contains("<h1>$title</h1>")) {
    throw 'abstraction.html is missing the requested title'
}

@(
    'public interface IPaymentService',
    'Task PayAsync(decimal amount);',
    'public class CreditCardPaymentService : IPaymentService',
    'await paymentService.PayAsync(100);',
    'public class BankPaymentService : IPaymentService',
    'public abstract class NotificationService',
    'public class EmailNotificationService : NotificationService',
    'public OrderService(IPaymentService paymentService)',
    './audio/CPodcast/Abstraction.mp3',
    '<table class="vocabulary-table',
    'id="completeLessonButton"'
) | ForEach-Object {
    if (-not $lesson.Contains($_)) {
        throw "abstraction.html is missing required lesson content: $_"
    }
}

$englishCards = ([regex]::Matches($lesson, 'class="sentence-english"')).Count
$persianCards = ([regex]::Matches($lesson, 'class="sentence-persian"')).Count
if ($englishCards -ne $persianCards -or $englishCards -lt 40) {
    throw "Transcript must contain at least 40 paired English/Persian cards; found $englishCards English and $persianCards Persian"
}

$vocabularyRows = ([regex]::Matches($lesson, '<tr class="vocabulary-row">')).Count
if ($vocabularyRows -lt 15) {
    throw "abstraction.html must contain at least 15 difficult vocabulary entries; found $vocabularyRows"
}

Write-Output 'Dotnet podcast Abstraction acceptance checks passed.'
