---
type: decision
status: accepted
created: 2026-11-14
updated: 2026-11-14
tags: [theming, conventions]
---

# Dark mode keys off `data-theme="dark"`, not a `.dark` class

## Context

Components style themselves in CSS Modules with `@apply dark:…`. CSS Modules rename every class selector in a module, so a `.dark` class selector produced by Tailwind's default variant would become something like `.xYz_dark` and stop matching the real `.dark` class on `<html>`, with no error (stated rationale, [[agents-md]] "Design system rules").

## Decision

Accepted. Dark mode is the `data-theme="dark"` attribute on `<html>`. Attribute selectors survive CSS Modules renaming. Acceptance evidence: written as a rule in [[agents-md]] ("Don't switch it back") and implemented at `7130589`:

- `@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));` with an explanatory comment — [`globals.css`](../../../src/app/globals.css) L5–7 (observation).
- next-themes configured with `attribute="data-theme"` — [`theme-provider.tsx`](../../../src/components/theme-provider.tsx) L12 (observation).
- Dark token values sit under `[data-theme="dark"]` — see [[design-tokens]].

## Alternatives and rationale

- `.dark` class (Tailwind / shadcn default): rejected because it silently breaks inside CSS Modules (stated, [[agents-md]]).

## Consequences

- Every new dark token value goes under `[data-theme="dark"]`, never `.dark` (three-place rule, [[design-tokens]]).
- Third-party CSS that expects a `.dark` class on `<html>` will not see dark mode (inference; no such dependency observed).
- The global `d` hotkey in `theme-provider.tsx` toggles the attribute (stated, [[agents-md]]; key check observed at L50).

## Evidence and history

- [[agents-md]] at `7130589`; implementation first appears in commit `5dabd4c` (2026-11-14, "phase 1 app shell, CSS-module design system").
