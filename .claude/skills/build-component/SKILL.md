---
name: build-component
description: Add or change one design-system component in src/components/ui, reusing what exists, then verify it in the app.
disable-model-invocation: true
argument-hint: "<component or change, e.g. 'outline size for Badge'>"
---

# Build component

Request: $ARGUMENTS

The rules live in `AGENTS.md`; this skill points at them rather than restating them. Before step 1, read these sections in full:

- **Design system rules** and **Component conventions**: folder + CSS Module pattern, tokens, `@layer components`, `data-*` variants, dark mode.
- **Commands**: the shadcn conversion recipe, when the request starts from `npx shadcn@latest add`.
- **Language and locale**: Thai copy, `th-TH` formatting, `tabular-nums`.

`Card` and `Badge` in `src/components/ui/` are the reference implementations. Read both before writing code: `Card` shows compound parts, a `data-size` driving a CSS variable, and `:global()` for consumer classes; `Badge` shows `useRender` + `mergeProps` with `state` becoming `data-slot` / `data-variant`.

## Steps

### 1. Inventory

Survey what already exists for the request: the folders in `src/components/ui/`, the tokens in `src/app/globals.css`, and the demos in `src/components/showcase/component-gallery.tsx`.

Done when you can name every existing component and semantic token the change will use, and each token the change needs is either confirmed in all three places (`:root`, `[data-theme="dark"]`, `@theme inline`) or listed as missing.

### 2. Confirm the contract

Reuse first: compose existing components and extend them with a variant, size, or `className` before creating a new folder. Then write down, in chat:

- the props: names, exported union types, defaults;
- the `data-slot` name for every rendered part;
- the visible examples the gallery demo will show, with their Thai labels.

Done when that list is written and either the request already pins every item or the user has confirmed it. Ask when the request leaves the props open.

### 3. Make one small change

Build exactly the contract from step 2: one component, or one variant or size of an existing one. The diff covers that component's `.tsx`, `.module.css`, `index.ts`, and its gallery demo, plus `globals.css` when step 1 listed a missing token. Record anything else you notice as a gap for step 5.

Done when `git status` shows only those files changed.

### 4. Check the app

Run each check and note its result:

1. `npm run typecheck` exits 0.
2. `npm run lint` exits 0.
3. Start the `dev` preview from `.claude/launch.json`, open `/`, and find the new demo.
4. The demo renders every example from step 2, in light and in dark theme (press `d`, or `resize_window` with `colorScheme`).
5. Tabbing to an interactive part shows the focus ring.
6. The console shows no new errors.
7. A screenshot of the demo as proof.

Done when every check above is observed passing, or marked "not run" with the reason.

### 5. Report

Reply with four parts:

- **Change**: what was built, in one or two sentences.
- **Files**: each file touched.
- **Checks**: every check from step 4 as passed, failed (with output), or not run (with reason).
- **Gaps**: what was noticed and left, such as missing tokens, other variants, app pages still using the old markup, or status colors lacking an icon + label.

Done when all seven checks from step 4 appear with a state and the gaps list is present, even if it reads "none".
