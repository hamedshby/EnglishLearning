$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$style = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'style.css')
$script = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'script.js')
$groupTitle = -join [char[]](
    0x0645, 0x0635, 0x0627, 0x062D, 0x0628, 0x0647,
    0x0020,
    0x06A9, 0x0627, 0x0631, 0x06CC
)
$chevron = [char]0x2304

@(
    'id="lessonGroupToggle"',
    'class="lesson-group-toggle"',
    'aria-expanded="true"',
    'aria-controls="jobInterviewLessons"',
    "<span class=`"lesson-group-title`">$groupTitle</span>",
    "<span class=`"lesson-group-chevron`" aria-hidden=`"true`">$chevron</span>",
    'id="jobInterviewLessons"',
    'class="lesson-menu-items"'
) | ForEach-Object {
    if (-not $index.Contains($_)) {
        throw "index.html is missing the job-interview group marker: $_"
    }
}

$groupStart = $index.IndexOf('id="jobInterviewLessons"')
$groupEnd = $index.IndexOf('</div>', $groupStart)
if ($groupStart -lt 0 -or $groupEnd -lt 0) {
    throw 'The job-interview lesson container is incomplete.'
}

$groupMarkup = $index.Substring($groupStart, $groupEnd - $groupStart)
1..7 | ForEach-Object {
    if (-not $groupMarkup.Contains("data-lesson-id=`"$_`"")) {
        throw "Day $_ is not inside the job-interview group."
    }
}

@(
    '.lesson-group-toggle',
    '.lesson-group-chevron',
    '.lesson-group-toggle[aria-expanded="false"] .lesson-group-chevron',
    '.lesson-menu-items[hidden]'
) | ForEach-Object {
    if (-not $style.Contains($_)) {
        throw "style.css is missing the group rule: $_"
    }
}

@(
    'const lessonGroupToggle = document.getElementById("lessonGroupToggle");',
    'const jobInterviewLessons = document.getElementById("jobInterviewLessons");',
    'function toggleLessonGroup()',
    'lessonGroupToggle.setAttribute(',
    'lessonGroupToggle.addEventListener('
) | ForEach-Object {
    if (-not $script.Contains($_)) {
        throw "script.js is missing the group behavior: $_"
    }
}

$behaviorCheck = @'
const fs = require('fs');
const source = fs.readFileSync(process.argv[1], 'utf8');
const functionSource = source.match(/function toggleLessonGroup\(\) \{[\s\S]*?\n\}/);

if (!functionSource) {
    throw new Error('toggleLessonGroup function was not found');
}

const attributes = new Map([['aria-expanded', 'true']]);
const lessonGroupToggle = {
    getAttribute(name) {
        return attributes.get(name) ?? null;
    },
    setAttribute(name, value) {
        attributes.set(name, value);
    }
};
const jobInterviewLessons = { hidden: false };
const createToggle = new Function(
    'lessonGroupToggle',
    'jobInterviewLessons',
    `${functionSource[0]}; return toggleLessonGroup;`
);
const toggleLessonGroup = createToggle(lessonGroupToggle, jobInterviewLessons);

toggleLessonGroup();
if (attributes.get('aria-expanded') !== 'false' || jobInterviewLessons.hidden !== true) {
    throw new Error('collapsing must set aria-expanded=false and hidden=true');
}

toggleLessonGroup();
if (attributes.get('aria-expanded') !== 'true' || jobInterviewLessons.hidden !== false) {
    throw new Error('expanding must set aria-expanded=true and hidden=false');
}
'@

& node -e $behaviorCheck (Join-Path $root 'script.js')
if ($LASTEXITCODE -ne 0) {
    throw 'The lesson group toggle behavior is incorrect.'
}

Write-Output 'Job interview group acceptance checks passed.'
