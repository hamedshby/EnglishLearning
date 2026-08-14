$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$script = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'script.js')
$index = Get-Content -Raw -Encoding UTF8 -LiteralPath (Join-Path $root 'index.html')

@(
    'function showActiveLessonGroup(activeLessonButton)',
    'const activeGroup = activeLessonButton.closest(',
    'const isActiveGroup = controlledElement === activeGroup;',
    'toggleButton.setAttribute(',
    'controlledElement.hidden = !isActiveGroup;',
    'showActiveLessonGroup(button);'
) | ForEach-Object {
    if (-not $script.Contains($_)) {
        throw "script.js is missing active lesson group behavior: $_"
    }
}

$expandedByDefault = [regex]::Matches(
    $index,
    'class="lesson-group-toggle"[^>]*aria-expanded="true"'
).Count

if ($expandedByDefault -ne 0) {
    throw "All lesson groups must start collapsed; found $expandedByDefault expanded groups"
}

$groupMenus = [regex]::Matches(
    $index,
    '<div id="[^"]+" class="lesson-menu-items" hidden>'
).Count

if ($groupMenus -ne 3) {
    throw "All three lesson groups must start hidden; found $groupMenus"
}

Write-Output 'Active lesson group acceptance checks passed.'
