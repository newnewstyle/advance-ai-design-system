---
name: usage-doc
description: Write or rewrite the usage doc (`<Name>.md`) for one design-system component in src/components/ui.
disable-model-invocation: true
argument-hint: "<Component folder name, e.g. Input>"
---

# Usage doc

Component: $ARGUMENTS

A usage doc is the **context layer** for one component: the file designers and AI agents read before they use it. Write it for that reader, in Thai, beside the component: `src/components/ui/<Name>/<Name>.md`. `src/components/ui/Badge/Badge.md` is the reference; match its shape and tone.

Change docs only. Component code (`.tsx`, `.module.css`, stories) stays untouched.

## 1. Read

Read the component's `<Name>.tsx` (its props), `<Name>.stories.tsx`, `<Name>.module.css`, and the tokens it uses in `src/app/globals.css`. Then find every real usage: `grep -rn "<Name\b" src --include=*.tsx`.

Done when you can name every prop and value that exists, every token the CSS reads, and where the app uses the component today.

## 2. Write the six parts

1. **Purpose**: one line.
2. **When to use**: situations from real usage, each with the variant/size to pick.
3. **When not to use**: what to use instead, and the reasons behind past decisions.
4. **Props and variants**: only ones that exist in the code, described by how they look and behave.
5. **Tokens used**: token name, light value, dark value, what it colors.
6. **Example**: one example, copied from a story; name the story.

**Keep** what a person types when using the component: props and their values, attributes the caller adds (`data-icon`, `aria-label`), composition such as `render` + `nativeButton={false}`, token names and values, contrast ratios.

**Leave out** what the component does internally: type definitions, exports, `data-slot` / `data-variant` the component sets itself, CSS class names and utilities, `@theme inline`. Describe sizes in plain words ("สูง 24px ตัวเล็ก"), not class names.

Mark anything you are unsure about, or any choice still undecided, as a `TODO:` line in part 3 for the team. A guess written as fact is worse than a TODO.

Done when all six parts exist and every claim traces to code you read in step 1.

## 3. Check

- Every prop, value and token in the doc exists in the code; nothing that exists is missing from part 4.
- No implementation detail from the leave-out list remains.
- Run `npx prettier --write` on the doc.

Done when all three hold. Report the TODOs you wrote, so the user can decide them (the `grilling` skill fits).
