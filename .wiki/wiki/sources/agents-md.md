---
type: source
created: 2026-11-14
updated: 2026-11-14
raw: repo:AGENTS.md@7130589
tags: [conventions, tokens, components, typography]
---

# AGENTS.md (project guide)

> The repo's agent instruction file ([`../../../AGENTS.md`](../../../AGENTS.md); `CLAUDE.md` only imports it). It sets the project's purpose (a frontend-only prototype: a design system plus a landlord back office), the stack, the build phases, Thai-locale rules, and the design-system rules every `src/components/ui/` component follows. Lines 1–9 are a block that `next dev` rewrites; the project's own guidance starts at line 11.

## Key takeaways

Statements of the source (requirements and stated rationale, as of `7130589`):

- **Tokens are the source of truth.** Colors, `--radius`, sidebar and chart values live as oklch variables in `src/app/globals.css`; change the look via tokens first, component CSS second. (section "Design system rules")
- **Three-place rule.** A new token needs its light value in `:root`, its dark value in `[data-theme="dark"]`, and a `--color-<name>` mapping in `@theme inline`; missing one breaks the utility or one theme. Canonical explanation: [[design-tokens]].
- **Dark mode is an attribute, not a class**, because CSS Modules rename class selectors. See [[2026-11-14-dark-mode-data-theme-attribute]].
- **Radius scale is derived** from the single `--radius` with `calc()`; change the base, not each step.
- **One font family**: IBM Plex Sans Thai (400–700) as `--font-sans`; `--font-heading` maps to the same variable; headings separate from body by weight (600 vs 400). Mono is Geist Mono.
- **Status colors do not exist yet.** If added, define them as tokens and always pair color with an icon and a text label.
- **Chart tokens need work**: phase 4 requires distinct `--chart-1..5` hues; the current ones are "all near-grey".
- **Semantic classes only**: use `bg-primary`, `text-muted-foreground`, etc., never raw palette colors or hex.
- Component file conventions (folder + CSS Module, `@layer components`, `data-*` variants) are rules for `ui/` code; this wiki links to them rather than restating them.

## Notes

- `components.json` base color is `stone` (stated in the source; not checked here).
- The source states rules, not their current implementation; implementation claims drawn from it are verified on [[design-tokens]].

## Related

- [[design-tokens]]
- [[globals-css]]
- [[2026-11-14-dark-mode-data-theme-attribute]]
