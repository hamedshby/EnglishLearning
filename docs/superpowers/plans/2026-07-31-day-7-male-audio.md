# Day 7 Male Audio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a complete male-voice MP3 set for day seven and connect every generated file to the matching lesson content.

**Architecture:** Extend the existing PowerShell acceptance test with an exact audio manifest, synthesize approved English lesson text with `Microsoft David Desktop`, and convert each WAV to an MP3 matching the existing lesson assets. Add standard HTML audio controls directly after the content each recording speaks.

**Tech Stack:** Windows `System.Speech`, Microsoft David Desktop, FFmpeg, HTML5 audio, PowerShell acceptance tests

## Global Constraints

- Work directly on `main`, as explicitly requested by the user.
- Use `Microsoft David Desktop` with normal speaking rate and volume 100.
- Create mono MP3 files at 16 kHz and 128 kbps to match the existing audio assets.
- Generate exactly 12 files under `audio/07/`: one vocabulary track, six phrase tracks, four STAR tracks and one speaking track.
- Reuse the existing `.lesson-audio` markup and do not modify shared CSS or JavaScript.
- Every HTML audio reference must resolve to an existing non-empty file.
- Do not add recordings for Persian translations or quiz answers.

---

### Task 1: Define the Day 7 Audio Contract

**Files:**
- Modify: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: Audio references from `days/day-7.html` and binary assets under `audio/07/`.
- Produces: A failing test until all 12 expected audio references and files exist; a zero exit code once the manifest is complete.

- [ ] **Step 1: Replace the no-audio assertion with an exact manifest**

Add this manifest after the lesson vocabulary checks:

```powershell
$expectedAudio = @(
    'audio/07/Words.mp3',
    'audio/07/S01.mp3',
    'audio/07/S02.mp3',
    'audio/07/S03.mp3',
    'audio/07/S04.mp3',
    'audio/07/S05.mp3',
    'audio/07/S06.mp3',
    'audio/07/q01.mp3',
    'audio/07/q02.mp3',
    'audio/07/q03.mp3',
    'audio/07/q04.mp3',
    'audio/07/sp01.mp3'
)

$audioSources = [regex]::Matches(
    $day7,
    '<source\s+src="\./(?<src>audio/07/[^"]+\.mp3)"'
)
$actualAudio = @($audioSources | ForEach-Object { $_.Groups['src'].Value })

if ($actualAudio.Count -ne $expectedAudio.Count) {
    throw "day-7.html must reference exactly $($expectedAudio.Count) audio files"
}

$expectedAudio | ForEach-Object {
    if ($_ -notin $actualAudio) {
        throw "day-7.html is missing audio reference: $_"
    }

    $audioPath = Join-Path $root $_

    if (-not (Test-Path -LiteralPath $audioPath)) {
        throw "day-7.html references missing audio: $_"
    }

    if ((Get-Item -LiteralPath $audioPath).Length -eq 0) {
        throw "day-7.html references empty audio: $_"
    }
}
```

Remove the previous assertion that rejects every `.mp3` reference.

- [ ] **Step 2: Run the focused test and verify RED**

Run:

```powershell
powershell -ExecutionPolicy Bypass -File .\tests\day-7-lesson.ps1
```

Expected: FAIL with `day-7.html must reference exactly 12 audio files`.

---

### Task 2: Generate the Male MP3 Assets

**Files:**
- Create: `audio/07/Words.mp3`
- Create: `audio/07/S01.mp3` through `audio/07/S06.mp3`
- Create: `audio/07/q01.mp3` through `audio/07/q04.mp3`
- Create: `audio/07/sp01.mp3`

**Interfaces:**
- Consumes: The exact English strings listed below.
- Produces: Twelve non-empty mono MP3 files encoded at 16 kHz and 128 kbps.

- [ ] **Step 1: Define the exact speech manifest**

Use these filename-to-text pairs:

```text
Words.mp3 = Priority. The production issue became our highest priority. Deadline. The reporting feature had a fixed deadline. Scope. We reduced the scope to the essential requirements. Estimate. I shared an updated estimate after reviewing the incident. Blocker. The payment failure was a blocker for affected customers. Urgent. The incident was urgent because customers could not complete payments. Impact. We evaluated the customer impact before changing priorities. Trade-off. The trade-off was postponing a lower-impact request. Stakeholder. I explained the capacity constraint to the stakeholder. Reprioritize. We reprioritized the sprint when the production issue appeared.
S01.mp3 = I prioritized the production issue because it affected all customers.
S02.mp3 = Given the deadline, I suggested reducing the scope.
S03.mp3 = I communicated the risk to the stakeholders early.
S04.mp3 = We agreed to postpone the lower-impact work.
S05.mp3 = To stay on track, we focused on the essential requirements.
S06.mp3 = I reviewed the priorities again when new information became available.
q01.mp3 = Situation. Near the end of a sprint, we discovered a production issue that prevented some customers from completing payments. At the same time, a reporting feature was due by the end of the sprint, and a stakeholder submitted a new urgent request for the same team.
q02.mp3 = Task. I needed to protect the affected customers, preserve the essential sprint commitment, and set realistic expectations without overloading the team.
q03.mp3 = Action. I assessed each item based on urgency and impact. We prioritized the production incident, reduced the reporting feature to its essential scope, and moved the lower-impact request to the next sprint. I communicated the risk to the stakeholders early and shared updated estimates and options.
q04.mp3 = Result. We resolved the payment incident that day and delivered the essential reporting feature on time. The stakeholder agreed to schedule the new request for the next sprint, so we avoided an unrealistic commitment while keeping the plan transparent.
sp01.mp3 = We had a customer-facing incident while two planned tasks were approaching their deadlines. I ranked the work by urgency and impact, assigned part of the team to the incident, and proposed a smaller scope for the most valuable planned task. We communicated the change early, resolved the incident, and still delivered the essential feature on time.
```

- [ ] **Step 2: Synthesize WAV files and convert them to MP3**

Create `audio/07/` if necessary. For every manifest entry, use `System.Speech.Synthesis.SpeechSynthesizer`, select `Microsoft David Desktop`, set `Rate = 0` and `Volume = 100`, write a temporary WAV, then run:

```powershell
ffmpeg -hide_banner -loglevel error -y -i $wavPath -ac 1 -ar 16000 -b:a 128k $mp3Path
```

Delete only the task-owned temporary WAV directory after all conversions succeed.

- [ ] **Step 3: Verify the binary format**

Run:

```powershell
Get-ChildItem .\audio\07\*.mp3 | Sort-Object Name | ForEach-Object {
    ffprobe -v error -show_entries stream=codec_name,sample_rate,channels,bit_rate `
        -of default=noprint_wrappers=1 $_.FullName
}
```

Expected for every file: `codec_name=mp3`, `sample_rate=16000`, `channels=1`, `bit_rate=128000`.

---

### Task 3: Connect Audio Controls to Day 7

**Files:**
- Modify: `days/day-7.html`
- Modify: `docs/superpowers/specs/2026-07-31-day-7-priorities-deadlines-design.md`
- Test: `tests/day-7-lesson.ps1`

**Interfaces:**
- Consumes: The 12 files in `audio/07/`.
- Produces: One vocabulary player, six phrase players, four STAR players and one speaking player in the lesson page.

- [ ] **Step 1: Add the vocabulary and phrase players**

After the vocabulary table add a `.lesson-audio` block sourcing `./audio/07/Words.mp3`. After each of the six English/Persian sentence cards in section `02`, add a matching block sourcing `S01.mp3` through `S06.mp3` in order:

```html
<div class="lesson-audio">
    <audio controls loop preload="none">
        <source src="./audio/07/S01.mp3" type="audio/mpeg">
        مرورگر شما از پخش صدا پشتیبانی نمی‌کند.
    </audio>
</div>
```

- [ ] **Step 2: Add STAR and speaking players**

Inside the main STAR answer, add `q01.mp3`, `q02.mp3`, `q03.mp3` and `q04.mp3` immediately after their corresponding paragraphs. Add `sp01.mp3` immediately after the speaking example in section `05`. Use the same `.lesson-audio` markup and `preload="none"`.

- [ ] **Step 3: Update the design record**

Replace the former no-audio scope with the approved male-voice manifest: Microsoft David, 12 MP3 files, and controls for vocabulary, practical phrases, STAR and speaking. Retain quiz translations and follow-up answers as text-only content.

- [ ] **Step 4: Run all acceptance tests**

Run:

```powershell
Get-ChildItem .\tests\day-*-lesson.ps1 | Sort-Object Name | ForEach-Object {
    powershell -ExecutionPolicy Bypass -File $_.FullName
    if ($LASTEXITCODE -ne 0) { throw "Failed: $($_.Name)" }
}
git diff --check
```

Expected: All three lesson acceptance tests pass and `git diff --check` exits with code `0`.

- [ ] **Step 5: Commit the audio feature**

```powershell
git add audio/07 days/day-7.html tests/day-7-lesson.ps1 `
    docs/superpowers/specs/2026-07-31-day-7-priorities-deadlines-design.md `
    docs/superpowers/plans/2026-07-31-day-7-male-audio.md
git commit -m "feat: add male audio for day 7"
```
