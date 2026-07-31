# Remove Course Progress Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the sidebar course-progress card and its dead percentage code while preserving lesson completion storage and completed-day indicators.

**Architecture:** Delete the card markup and its dedicated CSS, then reduce the existing progress updater to one responsibility: synchronizing `.completed` on lesson menu buttons. Rename that function and every caller so its interface describes the behavior that remains.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Node.js built-ins, PowerShell acceptance checks

## Global Constraints

- Remove only the visual «پیشرفت دوره» card, its percentage bar, and its summary text.
- Preserve the complete-lesson button, `completedLessons` in `localStorage`, and `.completed` status on lesson menu items.
- Do not clear existing users' stored completion data.
- Preserve lesson selection, navigation, the «مصاحبه کاری» group, dark theme, and mobile sidebar behavior.
- Do not change lesson content files.

---

### Task 1: Remove the progress card and retain completion indicators

**Files:**
- Create: `tests/remove-course-progress-card.ps1`
- Modify: `index.html:71-87`
- Modify: `style.css:192-249`
- Modify: `script.js:7-9,90,240,265-313,498`

**Interfaces:**
- Consumes: `lessonButtons: HTMLButtonElement[]` and `completedLessons: number[]`.
- Produces: `updateLessonCompletionStates(): void`, which toggles `.completed` on every lesson menu button.

- [ ] **Step 1: Write the failing acceptance check**

Create `tests/remove-course-progress-card.ps1`:

```powershell
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
const source = fs.readFileSync(process.argv[1], 'utf8');
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
```

- [ ] **Step 2: Run the check and verify it fails**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\remove-course-progress-card.ps1
```

Expected: exit code 1 with `index.html still contains removed progress-card markup: class="course-progress"`.

- [ ] **Step 3: Remove the card markup and CSS**

Delete this complete block from `index.html`:

```html
<div class="course-progress">
    <div class="progress-header">
        <span>پیشرفت دوره</span>
        <span id="progressPercent">۰٪</span>
    </div>
    <div class="progress-track">
        <div id="progressBar" class="progress-bar"></div>
    </div>
    <p id="progressText">
        هنوز هیچ درسی تکمیل نشده است.
    </p>
</div>
```

Delete the complete rules for `.course-progress`, `.progress-header`, `.progress-header span:last-child`, `.progress-track`, `.progress-bar`, and `.course-progress p` from `style.css`. Keep the existing `.sidebar-section-title` rule, including `margin: 25px 9px 10px`, unless browser inspection shows an abnormal gap.

- [ ] **Step 4: Remove card lookups and narrow the updater**

Delete these declarations from the top of `script.js`:

```javascript
const progressBar = document.getElementById("progressBar");
const progressPercent = document.getElementById("progressPercent");
const progressText = document.getElementById("progressText");
```

Replace the entire existing `updateProgress` function with:

```javascript
/**
 * همگام‌سازی وضعیت تکمیل درس‌ها در منوی کناری
 */
function updateLessonCompletionStates() {
    lessonButtons.forEach((button) => {
        const lessonId = Number(button.dataset.lessonId);

        button.classList.toggle(
            "completed",
            completedLessons.includes(lessonId)
        );
    });
}
```

Replace all three calls to `updateProgress()` with:

```javascript
updateLessonCompletionStates();
```

- [ ] **Step 5: Run the new check and the complete suite**

Run:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\tests\remove-course-progress-card.ps1
Get-ChildItem .\tests\*.ps1 | ForEach-Object {
    & powershell.exe -NoProfile -ExecutionPolicy Bypass -File $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "$($_.Name) failed" }
}
node --check script.js
git diff --check
```

Expected: the new check and all existing checks pass, `node --check` exits 0, and `git diff --check` reports no errors.

- [ ] **Step 6: Verify the user-visible behavior in a browser**

Serve the repository locally and verify:

1. No course-progress card appears above «سرفصل‌های دوره».
2. The heading spacing is balanced in desktop, dark theme, and a 390×844 mobile viewport.
3. Marking the current lesson complete adds `.completed` to its sidebar button and persists its ID in `localStorage.completedLessons`.
4. Unmarking it removes the class and stored ID.
5. The «مصاحبه کاری» group still collapses and expands.

- [ ] **Step 7: Commit the implementation**

```powershell
git add -- index.html style.css script.js tests/remove-course-progress-card.ps1
git commit -m "feat: remove course progress card"
```
