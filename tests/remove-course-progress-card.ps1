$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$style = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'style.css')
$script = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'script.js')

@(
    'class="course-progress"',
    'id="progressPercent"',
    'id="progressBar"',
    'id="progressText"'
) | ForEach-Object {
    if ($index.Contains($_)) {
        throw "index.html still contains removed progress-card markup: $_"
    }
}

@(
    '.course-progress',
    '.progress-header',
    '.progress-track',
    '.progress-bar'
) | ForEach-Object {
    if ($style.Contains($_)) {
        throw "style.css still contains removed progress-card styling: $_"
    }
}

@(
    'progressBar',
    'progressPercent',
    'progressText',
    'function updateProgress()'
) | ForEach-Object {
    if ($script.Contains($_)) {
        throw "script.js still contains removed progress-card logic: $_"
    }
}

@(
    'completedLessons',
    'localStorage.setItem(',
    'function updateLessonCompletionStates()',
    'button.classList.toggle(',
    '"completed"'
) | ForEach-Object {
    if (-not $script.Contains($_)) {
        throw "script.js is missing preserved lesson-completion behavior: $_"
    }
}

$behaviorCheck = @'
const fs = require('fs');
const source = fs.readFileSync(process.argv[1], 'utf8').replace(/\r\n/g, '\n');
const functionSource = source.match(
    /function updateLessonCompletionStates\(\) \{[\s\S]*?\n\}\n\n\/\*\*/
);

if (!functionSource) {
    throw new Error('updateLessonCompletionStates function was not found');
}

function makeButton(lessonId) {
    const classes = new Set();

    return {
        dataset: { lessonId: String(lessonId) },
        classList: {
            toggle(name, enabled) {
                if (enabled) classes.add(name);
                else classes.delete(name);
            },
            contains(name) {
                return classes.has(name);
            }
        }
    };
}

const lessonButtons = [makeButton(1), makeButton(2)];
const completedLessons = [2];
const createUpdater = new Function(
    'lessonButtons',
    'completedLessons',
    `${functionSource[0].replace(/\n\n\/\*\*$/, '')}; return updateLessonCompletionStates;`
);
const updateLessonCompletionStates = createUpdater(lessonButtons, completedLessons);

updateLessonCompletionStates();

if (lessonButtons[0].classList.contains('completed')) {
    throw new Error('an incomplete lesson received the completed class');
}

if (!lessonButtons[1].classList.contains('completed')) {
    throw new Error('a completed lesson did not receive the completed class');
}
'@

& node -e $behaviorCheck (Join-Path $root 'script.js')
if ($LASTEXITCODE -ne 0) {
    throw 'Lesson completion-state behavior is incorrect.'
}

Write-Output 'Course progress card removal checks passed.'
