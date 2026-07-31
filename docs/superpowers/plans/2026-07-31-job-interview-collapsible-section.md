# Job Interview Collapsible Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Group days one through seven under a keyboard-accessible, collapsible «مصاحبه کاری» heading in the sidebar.

**Architecture:** Keep every existing `.lesson-menu-item` unchanged and wrap the seven buttons in a dedicated controlled container. A separate toggle button owns `aria-expanded`, while a small JavaScript function synchronizes that value with the container's `hidden` property; CSS styles the heading and rotates its chevron from the ARIA state.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, PowerShell acceptance checks

## Global Constraints

- The group is open on every initial page load.
- Collapsing the group hides only the sidebar lesson list and does not replace or clear the selected lesson content.
- The state is not persisted in `localStorage`.
- Existing lesson selection, completion progress, navigation, `?day=` URL handling, dark theme, and mobile sidebar behavior must remain unchanged.
- The toggle must use a native `button`, `aria-controls="jobInterviewLessons"`, and a synchronized `aria-expanded` value.
- Do not change lesson content files or add other course groups.

---

### Task 1: Add the collapsible job-interview lesson group

**Files:**
- Create: `tests/job-interview-group.ps1`
- Modify: `index.html:93-179`
- Modify: `style.css:262-391`
- Modify: `script.js:1-20,428-440`

**Interfaces:**
- Consumes: the existing `#lessonMenu` container and `.lesson-menu-item` buttons used by lesson loading and progress logic.
- Produces: `#lessonGroupToggle` (`HTMLButtonElement`), `#jobInterviewLessons` (`HTMLDivElement`), and `toggleLessonGroup()` (`() => void`).

- [ ] **Step 1: Write the failing acceptance check**

Create `tests/job-interview-group.ps1` with the following content:

```powershell
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')
$style = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'style.css')
$script = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'script.js')

@(
    'id="lessonGroupToggle"',
    'class="lesson-group-toggle"',
    'aria-expanded="true"',
    'aria-controls="jobInterviewLessons"',
    '<span class="lesson-group-title">مصاحبه کاری</span>',
    '<span class="lesson-group-chevron" aria-hidden="true">⌄</span>',
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
    if (-not $groupMarkup.Contains("data-lesson-id=\"$_\"")) {
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
    'jobInterviewLessons.hidden = !isExpanded;',
    'lessonGroupToggle.addEventListener('
) | ForEach-Object {
    if (-not $script.Contains($_)) {
        throw "script.js is missing the group behavior: $_"
    }
}

Write-Output 'Job interview group acceptance checks passed.'
```

- [ ] **Step 2: Run the check and verify it fails**

Run:

```powershell
& .\tests\job-interview-group.ps1
```

Expected: the script exits non-zero with `index.html is missing the job-interview group marker: id="lessonGroupToggle"`.

- [ ] **Step 3: Add the semantic group markup**

In `index.html`, immediately inside `<nav id="lessonMenu" class="lesson-menu">`, insert:

```html
<button id="lessonGroupToggle" class="lesson-group-toggle" type="button" aria-expanded="true"
    aria-controls="jobInterviewLessons">
    <span class="lesson-group-title">مصاحبه کاری</span>
    <span class="lesson-group-chevron" aria-hidden="true">⌄</span>
</button>

<div id="jobInterviewLessons" class="lesson-menu-items">
```

Keep all seven existing `.lesson-menu-item` buttons, in their current order and without changing their attributes, inside that new `<div>`. Insert the matching closing tag immediately after the day-seven button and before `</nav>`:

```html
</div>
```

- [ ] **Step 4: Style the heading, nested list, collapsed state, and chevron**

In `style.css`, after the existing `.lesson-menu` rule, add:

```css
.lesson-group-toggle {
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    padding: 10px 12px;

    border: 1px solid var(--border);
    border-radius: 12px;

    color: var(--text-primary);
    background: var(--surface-secondary);

    text-align: right;
    font: inherit;
    font-size: 13px;
    font-weight: 700;

    transition: var(--transition);
}

.lesson-group-toggle:hover {
    color: var(--primary);
    border-color: rgba(105, 92, 255, 0.25);
}

.lesson-group-toggle:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
}

.lesson-group-title {
    flex-grow: 1;
}

.lesson-group-chevron {
    flex-shrink: 0;

    font-size: 18px;
    line-height: 1;

    transform: rotate(0deg);
    transition: transform var(--transition);
}

.lesson-group-toggle[aria-expanded="false"] .lesson-group-chevron {
    transform: rotate(90deg);
}

.lesson-menu-items {
    display: flex;
    flex-direction: column;
    gap: 7px;
}

.lesson-menu-items[hidden] {
    display: none;
}
```

- [ ] **Step 5: Implement the in-memory toggle behavior**

At the top of `script.js`, immediately after the `lessonMenu` lookup, add:

```javascript
const lessonGroupToggle = document.getElementById("lessonGroupToggle");
const jobInterviewLessons = document.getElementById("jobInterviewLessons");
```

Immediately before the existing `lessonMenu.addEventListener("click", ...)` block, add:

```javascript
function toggleLessonGroup() {
    const isExpanded =
        lessonGroupToggle.getAttribute("aria-expanded") === "true";

    lessonGroupToggle.setAttribute(
        "aria-expanded",
        String(!isExpanded)
    );
    jobInterviewLessons.hidden = !isExpanded;
}

lessonGroupToggle.addEventListener(
    "click",
    toggleLessonGroup
);
```

Do not add storage calls: the HTML default (`aria-expanded="true"` with no `hidden` attribute) must restore the open state after every reload.

- [ ] **Step 6: Run the new and existing acceptance checks**

Run:

```powershell
& .\tests\job-interview-group.ps1
Get-ChildItem .\tests\*.ps1 | ForEach-Object { & $_.FullName }
```

Expected: `Job interview group acceptance checks passed.` followed by successful output from every existing lesson check, with exit code 0.

- [ ] **Step 7: Verify the interaction in a browser**

Run:

```powershell
python -m http.server 8000
```

Open `http://localhost:8000/?day=1` and verify:

1. The group starts open and displays all seven days.
2. Clicking «مصاحبه کاری» hides all seven day buttons and changes `aria-expanded` to `false` without clearing the day-one content.
3. Pressing Enter or Space while the toggle has focus reopens the group and restores `aria-expanded="true"`.
4. Selecting day seven still updates the active item, lesson content, progress behavior, and URL to `?day=7`.
5. The group remains readable in dark theme, at desktop width, and with the mobile sidebar open.
6. Refreshing while the group is closed opens it again.

Stop the local server after verification.

- [ ] **Step 8: Commit the implementation**

```powershell
git add -- index.html style.css script.js tests/job-interview-group.ps1
git commit -m "feat: group interview lessons in collapsible section"
```
