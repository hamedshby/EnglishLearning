# Day 7 Priorities and Deadlines Lesson Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete seventh interview-English lesson about managing competing priorities, deadlines and stakeholder expectations.

**Architecture:** Define the lesson, menu and adjacent-navigation contracts in one PowerShell acceptance test, then add a static HTML lesson fragment that follows day six. Extend the existing menu and day-six navigation while leaving the shared CSS and JavaScript unchanged.

**Tech Stack:** HTML5, existing CSS, vanilla JavaScript, PowerShell acceptance tests

## Global Constraints

- Preserve the existing lesson structure, visual language and Persian teaching tone.
- Reuse the current CSS classes and JavaScript contracts without modifying `style.css` or `script.js`.
- Keep the lesson duration at approximately 30 minutes and the level at intermediate.
- Use one cohesive scenario with a production incident, a near-deadline reporting feature and a new stakeholder request.
- Teach prioritization through urgency, impact, risk and transparent communication rather than personal preference.
- Do not reference any missing day-seven audio file.
- Do not implement day eight in this change.

---

### Task 1: Define the Day 7 Acceptance Contract

**Files:**
- Create: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: Repository files resolved from `$PSScriptRoot`.
- Produces: Exit code `0` and `Day 7 lesson acceptance checks passed.` when the content, menu, audio and navigation contracts are satisfied.

- [ ] **Step 1: Write the failing acceptance test**

```powershell
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
    'مدیریت مهلت تحویل و اولویت‌ها',
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
    if (-not $day7.Contains($_)) { throw "day-7.html is missing: $_" }
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
    if (-not $day7.Contains($_)) { throw "day-7.html is missing vocabulary: $_" }
}

if ($day7 -match '\.mp3') { throw 'day-7.html references audio that is not part of this change' }
if (-not $index.Contains('data-lesson-id="7"')) { throw 'index.html has no day 7 menu item' }
if (-not $index.Contains('data-file="days/day-7.html"')) { throw 'index.html has the wrong day 7 file path' }
if (-not $day6.Contains('data-navigation-id="7"')) { throw 'day-6.html has no day 7 navigation' }

Write-Output 'Day 7 lesson acceptance checks passed.'
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\day-7-lesson.ps1
```

Expected: FAIL with `days/day-7.html does not exist`.

- [ ] **Step 3: Commit the test**

```powershell
git add tests/day-7-lesson.ps1
git commit -m "test: define day 7 priorities lesson"
```

---

### Task 2: Add the Priorities and Deadlines Lesson Content

**Files:**
- Create: `days/day-7.html`
- Reference: `days/day-6.html`
- Test: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: The existing lesson section classes, quiz markup, `completeLessonButton` ID and `data-navigation-id` behavior.
- Produces: A loadable HTML fragment for lesson ID `7`, with six numbered sections, a final exercise and navigation back to lesson ID `6`.

- [ ] **Step 1: Create the hero and vocabulary section**

Create `days/day-7.html` with the same top-level fragment structure as `days/day-6.html`. Use this title and metadata:

```html
<h1>مدیریت مهلت تحویل و اولویت‌ها</h1>
<div class="meta-item"><span>⏱️</span>۳۰ دقیقه</div>
<div class="meta-item"><span>📊</span>سطح متوسط</div>
<div class="meta-item"><span>🎯</span>Priorities &amp; Deadlines</div>
```

Set the daily goal to producing a professional answer that evaluates urgency and impact, communicates risks early and negotiates scope. Section `01` must contain these exact vocabulary concepts, each with a Persian meaning and scenario-specific English example:

```text
priority, deadline, scope, estimate, blocker, urgent, impact, trade-off, stakeholder, reprioritize
```

- [ ] **Step 2: Add practical phrases and the language framework**

Section `02` must teach these six phrases with Persian translations:

```text
I prioritized the production issue because it affected all customers.
Given the deadline, I suggested reducing the scope.
I communicated the risk to the stakeholders early.
We agreed to postpone the lower-impact work.
To stay on track, we focused on the essential requirements.
I reviewed the priorities again when new information became available.
```

Section `03` must teach the four-part professional framework below and contrast it with the blunt sentence `We cannot do everything`:

```text
Context: Given the current deadline...
Priority and reason: I would prioritize X because...
Risk: The main risk is...
Alternative: Could we reduce the scope or move Y to the next sprint?
```

- [ ] **Step 3: Add the STAR interview section**

Section `04` must use this primary question:

```text
Tell me about a time you had to manage competing priorities.
```

Write a complete STAR answer with these exact facts:

- Situation: A production payment issue, a reporting feature due at the end of the sprint and a new stakeholder request compete for the same team capacity.
- Task: Protect affected customers, preserve the essential sprint commitment and set realistic expectations.
- Action: Assess urgency and impact, prioritize the incident, reduce the reporting feature to its essential scope, move the lower-impact request to the next sprint and communicate updated estimates early.
- Result: Resolve the incident that day, deliver the essential reporting feature on time and schedule the new request without creating an unrealistic commitment.

Add two follow-up questions with concise answers:

```text
How do you decide which task should come first?
How do you communicate when a deadline is at risk?
```

- [ ] **Step 4: Add speaking practice, quiz, exercise and navigation**

Section `05` must prompt the learner separately for Situation, Task, Action and Result, emphasizing the decision criteria and stakeholder communication. Section `06` must contain four multiple-choice questions that verify:

- `reprioritize` means changing priorities when circumstances change.
- A task's impact and urgency should guide the decision.
- `Could we reduce the scope?` is more professional than an unsupported refusal.
- Risks should be communicated early with options and updated estimates.

Add a 60-to-90-second final speaking exercise using the main interview question, the existing completion button and this previous-day navigation contract:

```html
<button id="completeLessonButton" class="complete-lesson-button" type="button">
    <span>○</span>
    علامت‌گذاری درس به‌عنوان تکمیل‌شده
</button>

<div class="lesson-navigation">
    <button class="navigation-button previous" type="button" data-navigation-id="6">
        <div>
            <small>درس قبلی</small>
            <strong>روز ششم: رهبری تیم و منتورینگ</strong>
        </div>
        <span>←</span>
    </button>
</div>
```

Do not add an audio element or any `.mp3` reference.

- [ ] **Step 5: Run the focused acceptance test**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\day-7-lesson.ps1
```

Expected: FAIL only because the day-seven menu item and forward navigation from day six have not been added.

- [ ] **Step 6: Commit the lesson fragment**

```powershell
git add days/day-7.html
git commit -m "feat: add day 7 priorities lesson content"
```

---

### Task 3: Connect the Menu and Adjacent-Day Navigation

**Files:**
- Modify: `index.html`
- Modify: `days/day-6.html`
- Test: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: The existing `.lesson-menu-item` contract and navigation click handling in `script.js`.
- Produces: Menu loading for lesson ID `7`, forward navigation from day six and backward navigation from day seven.

- [ ] **Step 1: Add the day-seven menu item**

After the day-six entry in `index.html`, add:

```html
<button class="lesson-menu-item" type="button" data-lesson-id="7" data-file="days/day-7.html"
    data-title="روز هفتم">
    <span class="lesson-number">۷</span>

    <span class="lesson-menu-content">
        <strong>روز هفتم</strong>
        <small>مدیریت مهلت و اولویت‌ها</small>
    </span>

    <span class="lesson-status">✓</span>
</button>
```

- [ ] **Step 2: Add forward navigation from day six**

Preserve the existing previous button inside the final `lesson-navigation` block of `days/day-6.html`, then add:

```html
<button class="navigation-button next" type="button" data-navigation-id="7">
    <div>
        <small>درس بعدی</small>
        <strong>روز هفتم: مدیریت مهلت تحویل و اولویت‌ها</strong>
    </div>
    <span>→</span>
</button>
```

- [ ] **Step 3: Run all lesson acceptance tests**

Run:

```powershell
Get-ChildItem .\tests\day-*-lesson.ps1 | Sort-Object Name | ForEach-Object {
    powershell -ExecutionPolicy Bypass -File $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "Failed: $($_.Name)" }
}
```

Expected: The day-four, day-five and day-seven scripts print their success messages and all exit with code `0`.

- [ ] **Step 4: Run repository consistency checks**

Run:

```powershell
git diff --check
rg -n '\.mp3' days/day-7.html
```

Expected: `git diff --check` exits with code `0`; `rg` produces no matches and exits with code `1`.

- [ ] **Step 5: Verify the lesson in a local browser**

Serve the repository over HTTP, open `index.html?day=7`, and verify:

- روز هفتم loads with all six sections and no broken asset control.
- The breadcrumb and active menu item show روز هفتم.
- Quiz and completion interactions initialize without console errors.
- Previous navigation opens day six and day-six next navigation returns to day seven.
- The progress calculation includes all seven menu entries.

- [ ] **Step 6: Commit the integration**

```powershell
git add index.html days/day-6.html
git commit -m "feat: connect day 7 lesson navigation"
```

---

### Task 4: Final Regression and Content Review

**Files:**
- Verify: `days/day-7.html`
- Verify: `days/day-6.html`
- Verify: `index.html`
- Verify: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: The completed day-seven lesson and integration.
- Produces: A verified clean worktree with all automated acceptance checks passing.

- [ ] **Step 1: Check required and forbidden content**

Run:

```powershell
rg -n '\.mp3' days/day-7.html
```

Expected: No output and exit code `1`, confirming that the lesson does not reference an unavailable audio asset.

- [ ] **Step 2: Run the complete automated verification**

Run:

```powershell
Get-ChildItem .\tests\day-*-lesson.ps1 | Sort-Object Name | ForEach-Object {
    powershell -ExecutionPolicy Bypass -File $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "Failed: $($_.Name)" }
}
git diff --check
git status --short
```

Expected: All acceptance tests pass, `git diff --check` succeeds and `git status --short` is empty after the three implementation commits.
