# Day 6 Mentoring Lesson Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete sixth interview-English lesson about mentoring a junior developer and building their independence.

**Architecture:** Create a PowerShell acceptance test that captures the lesson-content and navigation contracts, then add one static lesson fragment following the markup of day five. Extend the existing menu and adjacent-day navigation without changing the shared CSS or JavaScript architecture.

**Tech Stack:** HTML5, existing CSS, vanilla JavaScript, PowerShell acceptance tests

## Global Constraints

- Preserve the current lesson structure, visual language and Persian teaching tone.
- Reuse the existing CSS classes and JavaScript contracts.
- Keep the lesson duration at approximately 30 minutes.
- Do not reference missing day-six audio.
- Focus the content on creating independence rather than portraying the junior developer negatively.
- Do not implement day seven or day eight in this change.

---

### Task 1: Define the Day 6 Acceptance Contract

**Files:**
- Create: `tests/day-6-lesson.ps1`

**Interfaces:**
- Consumes: Repository files resolved from `$PSScriptRoot`.
- Produces: A zero exit code and `Day 6 lesson acceptance checks passed.` when all lesson, menu and navigation contracts are satisfied.

- [ ] **Step 1: Write the failing acceptance test**

```powershell
$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$day6Path = Join-Path $root 'days/day-6.html'

if (-not (Test-Path -LiteralPath $day6Path)) {
    throw 'days/day-6.html does not exist'
}

$day6 = Get-Content -Raw -Encoding UTF8 -LiteralPath $day6Path
$day5 = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'days/day-5.html')
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')

@(
    '<section class="lesson-hero">',
    '<div class="section-number">06</div>',
    'رهبری تیم و منتورینگ',
    'Tell me about a time you mentored a junior developer.',
    'Situation',
    'Task',
    'Action',
    'Result',
    'I guided them through',
    'I gave specific, actionable feedback',
    'id="completeLessonButton"',
    'data-navigation-id="5"'
) | ForEach-Object {
    if (-not $day6.Contains($_)) { throw "day-6.html is missing: $_" }
}

if ($day6 -match 'day-6.*\.mp3') { throw 'day-6.html references missing audio' }
if (-not $index.Contains('data-lesson-id="6"')) { throw 'index.html has no day 6 menu item' }
if (-not $day5.Contains('data-navigation-id="6"')) { throw 'day-5.html has no day 6 navigation' }

Write-Output 'Day 6 lesson acceptance checks passed.'
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\day-6-lesson.ps1
```

Expected: FAIL with `days/day-6.html does not exist`.

- [ ] **Step 3: Commit the test**

```powershell
git add tests/day-6-lesson.ps1
git commit -m "test: define day 6 mentoring lesson"
```

---

### Task 2: Add the Mentoring Lesson Content

**Files:**
- Create: `days/day-6.html`
- Reference: `days/day-5.html`

**Interfaces:**
- Consumes: Existing class names, quiz markup, completion-button ID and `data-navigation-id` behavior used by `script.js`.
- Produces: A loadable HTML fragment for lesson ID `6`, with six numbered learning sections, a final exercise and navigation back to lesson ID `5`.

- [ ] **Step 1: Create the lesson hero and vocabulary section**

Create `days/day-6.html` by following the structural markup of `days/day-5.html`. Use:

```html
<h1>رهبری تیم و منتورینگ</h1>
```

Set the lesson metadata to ۳۰ دقیقه, سطح متوسط and `Leadership & Mentoring`. Add a clear daily goal and a vocabulary table containing `mentor`, `guidance`, `ownership`, `delegate`, `feedback`, `growth`, `support` and `independent`, with Persian meanings and mentoring-focused examples.

- [ ] **Step 2: Add practical phrases and the language note**

Add section 02 with cohesive phrases including:

```text
I guided them through the problem-solving process.
I encouraged them to propose their own solution.
I gave specific, actionable feedback.
I gradually gave them more ownership.
```

Add section 03 contrasting constructive language with negative framing. Explicitly teach `I guided them through...`, `I encouraged them to...`, and `I gave specific, actionable feedback`, and discourage language such as `They could not do anything without me`.

- [ ] **Step 3: Add STAR interview answers**

Add section 04 with the primary question:

```text
Tell me about a time you mentored a junior developer.
```

Write a full STAR answer in which a junior developer needs help planning a feature, the speaker must deliver it while building the colleague's independence, uses task decomposition, pair programming, guiding questions and gradual ownership, and achieves these results:

- The colleague completes the next feature with much less help.
- Code-review iterations decrease.
- The colleague shares the learning with another teammate.

Add at least one related interview question and a concise sample answer about giving constructive feedback.

- [ ] **Step 4: Add speaking practice, quiz and final exercise**

Add section 05 with a staged speaking exercise that prompts Situation, Task, Action and Result. Add section 06 with multiple-choice questions covering vocabulary, constructive phrasing and mentoring behavior. Reuse the existing quiz option markup and answer attributes so `script.js` handles selection.

Add the final exercise, a text area, the existing completion control:

```html
<button id="completeLessonButton" class="complete-lesson-button" type="button">
```

and previous-day navigation:

```html
<button class="lesson-navigation-button" type="button" data-navigation-id="5">
```

Do not add any `day-6*.mp3` reference.

- [ ] **Step 5: Run the focused acceptance test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\day-6-lesson.ps1
```

Expected: FAIL only because the day-six menu item and forward navigation from day five have not yet been added.

- [ ] **Step 6: Commit the lesson fragment**

```powershell
git add days/day-6.html
git commit -m "feat: add day 6 mentoring lesson content"
```

---

### Task 3: Connect the Menu and Adjacent-Day Navigation

**Files:**
- Modify: `index.html`
- Modify: `days/day-5.html`
- Test: `tests/day-6-lesson.ps1`

**Interfaces:**
- Consumes: The existing `lesson-menu-item` contract in `index.html` and `data-navigation-id` click handling in `script.js`.
- Produces: Menu loading for lesson ID `6`, forward navigation from day five and backward navigation from day six.

- [ ] **Step 1: Add the day-six menu item**

After the day-five menu button in `index.html`, add a matching inactive menu entry with:

```html
data-lesson-id="6"
data-file="days/day-6.html"
data-title="روز ششم"
```

Use `روز ششم` as the visible label and `رهبری و منتورینگ` as the subtitle.

- [ ] **Step 2: Add forward navigation from day five**

Update the navigation block at the bottom of `days/day-5.html` to include a next-day button with:

```html
data-navigation-id="6"
```

Label it `روز ششم` and preserve the existing previous-day button for day four.

- [ ] **Step 3: Run all lesson acceptance tests**

Run:

```powershell
Get-ChildItem .\tests\day-*-lesson.ps1 | Sort-Object Name | ForEach-Object {
    powershell -ExecutionPolicy Bypass -File $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "Failed: $($_.Name)" }
}
```

Expected: Every day lesson acceptance script prints its success message and exits with code 0.

- [ ] **Step 4: Run repository consistency checks**

Run:

```powershell
git diff --check
rg -n 'day-6.*\.mp3' days index.html
```

Expected: `git diff --check` exits successfully and `rg` returns no audio reference.

- [ ] **Step 5: Review the rendered lesson locally**

Open `index.html`, select روز ششم, and verify:

- All content sections render with the established layout.
- Quiz choices respond to clicks.
- The completion button updates the lesson state.
- Breadcrumb and active menu state show روز ششم.
- Previous and next navigation work between days five and six.
- No missing audio control or broken asset is visible.

- [ ] **Step 6: Commit the integration**

```powershell
git add index.html days/day-5.html
git commit -m "feat: connect day 6 lesson navigation"
```

