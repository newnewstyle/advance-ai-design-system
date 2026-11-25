---
name: usage-doc
description: Write or rewrite the usage docs (`<Name>.spec.ts` + `<Name>.md`) for one design-system component in src/components/ui.
disable-model-invocation: true
argument-hint: "<Component folder name, e.g. Input>"
---

# Usage doc

Component: $ARGUMENTS

The usage docs are the **context layer** for one component: what designers and AI agents read before they use it. Write them in Thai, beside the component, in two files with one job each (no rule written twice):

- `<Name>.spec.ts`: the rules. Purpose, when to use, when not to use, deliberate decisions with their reason, open TODOs. Typed as `ComponentSpec` (`src/lib/component-spec.ts`).
- `<Name>.md`: the manual. Props and variants, tokens used, one example. A pointer line at the top says the rules live in the spec.

`src/components/ui/Button/` is the reference for both files and for the stories wiring; match its shape and tone.

Component code (`.tsx`, `.module.css`) stays untouched. If the props types still live in `<Name>.tsx`, move them to `<Name>.types.ts` and re-export them from the `.tsx` (as Button does); callers' imports must not change.

## 1. Read

Read the component's `<Name>.tsx` (its props), `<Name>.stories.tsx`, `<Name>.module.css`, and the tokens it uses in `src/app/globals.css`. Then find every real usage: `grep -rn "<Name\b" src --include=*.tsx`. If a `<Name>.md` exists in the older all-in-one format, its parts 1–3 become the spec.

Done when you can name every prop and value that exists, every token the CSS reads, and where the app uses the component today.

## 2. Write

**Spec** (`<Name>.spec.ts`, `export const <name>Spec = { … } satisfies ComponentSpec`):

- `purpose`: one line.
- `whenToUse`: situations from real usage, each with the variant/size to pick.
- `whenNotToUse`: cases where something else fits, and what to use instead.
- `decisions`: deliberate choices and why, so nobody undoes them by accident.
- `todos`: anything you are unsure about or still undecided. A guess written as fact is worse than a TODO.

**Manual** (`<Name>.md`): `# <Name>`, a one-line intro, the pointer to the spec, then

- **`## Import and usage`**: numbered steps with code. The import line from `@/components/ui/<Name>` (never the `.tsx` file), every part the folder's `index.ts` exports that a caller needs, a minimal usage snippet, and the type import if callers need one. The Docs page always shows this section first, preceded by the shared one-time setup from `src/components/ui/SETUP.md` (do not repeat that setup in the component doc).

then

4. **Props and variants**: only ones that exist, described by how they look and behave.
5. **Tokens used**: token name, light value, dark value, what it colors.
6. **Example**: one example, copied from a story; name the story.

In both files, **keep** what a person types when using the component: props and their values, attributes the caller adds (`data-icon`, `aria-label`), composition such as `render` + `nativeButton={false}`, token names and values, contrast ratios. **Leave out** what the component does internally: type definitions, the export list (the import section names only what a caller imports), `data-slot` / `data-variant` the component sets itself, CSS class names and utilities, `@theme inline`. Describe sizes in plain words ("สูง 24px ตัวเล็ก"), not class names.

Done when both files exist, no rule appears in both, and every claim traces to code you read in step 1.

## 3. Check

- Every prop, value and token in the docs exists in the code; nothing that exists is missing from part 4.
- No implementation detail from the leave-out list remains.
- The docs show on the Storybook Docs page: `<Name>.stories.tsx` imports `usage from "./<Name>.md?raw"` and the spec, and sets `parameters: { docs: { description: { component: usageDoc(usage, <name>Spec) } } }` on `meta`. Stories may change only to add this wiring and the stories the docs need (next check).
- The stories match the docs (AGENTS.md "Docs and stories change together"): every variant, size, prop and state in part 4 has a story or control, and the part-6 example is copied from a story.
- `npm run typecheck` and `npm run lint` pass; `npx prettier --write` on the new files. Open the Docs page in Storybook and confirm "Import and usage" shows first.

Done when all five hold. Report the TODOs you wrote, so the user can decide them (the `grilling` skill fits).
