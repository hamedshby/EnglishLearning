# Situational Restaurant Conversation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an independently collapsible «مکالمه‌های موقعیتی» sidebar group containing a complete text-only restaurant food-ordering lesson.

**Architecture:** Extend the existing static sidebar with a second group and reuse the current numeric lesson loading, URL, completion, and navigation mechanisms with lesson ID `9`. Generalize the group-toggle JavaScript so each button controls its own lesson container, while keeping lesson content in a focused `days/day-9.html` file.

**Tech Stack:** Static HTML, CSS, and vanilla JavaScript

## Global Constraints

- Do not create a git commit.
- Do not run automated or manual tests.
- Do not add audio files or audio controls.
- Keep the existing interview lessons and their content unchanged.
- Keep both groups keyboard-accessible and independently collapsible.
- Preserve desktop, mobile, and dark-theme compatibility through existing styles.

---

### Task 1: Add the situational conversation group

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Existing `.lesson-group-toggle`, `.lesson-menu-items`, and `.lesson-menu-item` markup conventions.
- Produces: `#situationalConversationToggle`, controlling `#situationalConversationLessons`, and a lesson button with `data-lesson-id="9"` and `data-file="days/day-9.html"`.

- [ ] **Step 1: Add the second collapsible group after the interview lesson container**

Add a button labeled «مکالمه‌های موقعیتی» with `aria-expanded="true"` and `aria-controls="situationalConversationLessons"`. Add its controlled `.lesson-menu-items` container immediately afterward.

- [ ] **Step 2: Add the restaurant lesson item**

Inside the new container, add a `.lesson-menu-item` with numeric label `۹`, title «مکالمه در رستوران», subtitle «سفارش غذا», `data-title="مکالمه در رستوران"`, and `data-file="days/day-9.html"`.

### Task 2: Support multiple independent collapsible groups

**Files:**
- Modify: `script.js`

**Interfaces:**
- Consumes: Every `.lesson-group-toggle` element and each button's `aria-controls` target ID.
- Produces: A click handler per group that toggles only its own `aria-expanded` state and controlled container's `hidden` property.

- [ ] **Step 1: Replace single-group element references**

Replace `lessonGroupToggle` and `jobInterviewLessons` constants with a `lessonGroupToggles` array created from `document.querySelectorAll(".lesson-group-toggle")`.

- [ ] **Step 2: Generalize the toggle function**

Define `toggleLessonGroup(toggleButton)` to read `toggleButton.getAttribute("aria-controls")`, find that element, invert `aria-expanded`, and assign the prior expanded state to the container's `hidden` property. Return safely if the controlled element is missing.

- [ ] **Step 3: Register an independent listener for each group**

Iterate over `lessonGroupToggles` and call `toggleLessonGroup(toggleButton)` from each button's click listener. Keep the delegated lesson-item click handler unchanged.

### Task 3: Create the restaurant ordering lesson

**Files:**
- Create: `days/day-9.html`

**Interfaces:**
- Consumes: Existing content classes including `.lesson-hero`, `.lesson-section`, `.section-header`, `.question-box`, `.answer-example`, `.complete-lesson-button`, and `.lesson-navigation`.
- Produces: Static lesson markup loaded by `loadLesson`, `#completeLessonButton`, and a previous navigation control with `data-navigation-id="8"`.

- [ ] **Step 1: Add the lesson introduction**

Create a lesson hero labeled «مکالمه‌های موقعیتی» with the heading «سفارش غذا در رستوران» and a short Persian introduction explaining the learning objective.

- [ ] **Step 2: Add restaurant vocabulary**

Add a numbered section containing practical terms such as `menu`, `starter`, `main course`, `side dish`, `beverage`, `order`, `recommend`, `bill/check`, `tip`, and `reservation`, each paired with a clear Persian meaning.

- [ ] **Step 3: Add useful ordering sentences**

Add a left-to-right section covering arrival and seating, requesting a menu, asking for recommendations, ordering food and drinks, requesting changes politely, and asking for the bill. Pair each English sentence with a Persian explanation or translation.

- [ ] **Step 4: Add the complete customer–waiter conversation**

Write a natural text-only dialogue from greeting and seating through ordering a starter, main course, and drink, checking on the meal, and requesting the bill. Clearly label `Waiter` and `Customer`; do not add `<audio>` markup.

- [ ] **Step 5: Add language notes**

Explain polite patterns including `I'd like...`, `Could I have...?`, `What do you recommend?`, `Does this come with...?`, and `Could we have the bill, please?` with concise Persian guidance.

- [ ] **Step 6: Add comprehension and speaking questions**

Add questions about what the customer ordered and what the waiter recommended, followed by open-ended prompts asking the learner to place their own order and request a substitution politely.

- [ ] **Step 7: Add completion and navigation controls**

Append `#completeLessonButton` using the existing wording and a single previous navigation button targeting lesson `8`, labeled «روز هشتم: سه سؤال و پاسخ مصاحبه».

### Task 4: Review the change without test execution

**Files:**
- Review: `index.html`
- Review: `script.js`
- Review: `days/day-9.html`

**Interfaces:**
- Consumes: Completed changes from Tasks 1–3.
- Produces: No additional interface; this is a source review only.

- [ ] **Step 1: Inspect source consistency**

Read the three changed files and confirm lesson ID `9`, `days/day-9.html`, toggle IDs, `aria-controls`, navigation ID `8`, Persian labels, and the absence of audio markup are consistent. Do not launch the site or run any test command.

- [ ] **Step 2: Inspect the working tree**

Use `git status --short` only to report modified and untracked files. Do not stage or commit them.
