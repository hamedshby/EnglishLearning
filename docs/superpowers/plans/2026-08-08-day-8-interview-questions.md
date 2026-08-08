# Day 8 Interview Questions Implementation Plan

> **For agentic workers:** Implement inline in the current workspace.

**Goal:** Add day eight containing exactly the user's three interview questions and answers.

**Architecture:** Create one lesson fragment using the existing lesson classes, register it in the sidebar, and connect day seven and day eight through the existing `data-navigation-id` behavior. No shared CSS or JavaScript changes are required.

**Tech Stack:** HTML, existing vanilla JavaScript navigation, existing CSS.

## Global Constraints

- Do not add educational content beyond the supplied questions and answers.
- Do not add audio, vocabulary, quizzes, tips, or exercises.
- Do not run tests.
- Do not create a commit.

---

### Task 1: Create the day-eight page

**Files:**
- Create: `days/day-8.html`

- [ ] Add a day-eight hero and three numbered sections.
- [ ] Place each supplied question and its complete answer in left-to-right English containers.
- [ ] Add the existing lesson-completion button and previous-day navigation.

### Task 2: Register day eight and connect navigation

**Files:**
- Modify: `index.html`
- Modify: `days/day-7.html`

- [ ] Add the day-eight menu item with lesson ID `8` and file `days/day-8.html`.
- [ ] Add a next-day button to day seven targeting navigation ID `8`.

### Task 3: Static review

**Files:**
- Review: `days/day-8.html`
- Review: `index.html`
- Review: `days/day-7.html`

- [ ] Inspect the diff for exact content, valid IDs, correct paths, and unintended changes without running tests.
