---
type: system
status: active
created: 2026-11-14
updated: 2026-11-14
tags: [tokens, theming, color, typography]
---

# Design tokens

> The CSS custom properties that define the look of every component: colors, radius, and font families. They live only in `src/app/globals.css`; components consume them through Tailwind utilities (`bg-primary`, `rounded-lg`, `font-heading`) inside CSS Modules. This page is the canonical place for how tokens are organised and where they currently go wrong.

## Domain and constraints

- **Tokens first.** The look changes via tokens before component CSS (requirement, [[agents-md]]).
- **Three-place rule.** Every color token needs: a light value in `:root`, a dark value in `[data-theme="dark"]`, and `--color-<name>: var(--<name>)` in `@theme inline`. Missing the first two breaks one theme; missing the mapping means the utility class never exists (requirement, [[agents-md]]). At `7130589` every color token satisfies all three (observation, [[globals-css]]).
- **Dark mode keys off `data-theme`**, not a `.dark` class: see [[2026-11-14-dark-mode-data-theme-attribute]].
- **Radius is one knob.** `--radius` (0.625rem) derives `--radius-sm` (×0.6) through `--radius-4xl` (×2.6); edit the base only (requirement, [[agents-md]]; values observed in [[globals-css]]).
- **Typography.** One family (IBM Plex Sans Thai) for body and headings; headings are set apart by weight 600 vs body 400 (requirement, [[agents-md]]).
- **Status colors are a pending token family.** None exist yet; when added they follow the three-place rule, and every status shows color + icon + text label (requirement, [[agents-md]]).
- **Semantic names only** in components; raw palette colors and hex are out of bounds (requirement, [[agents-md]]).

## Token families

| Family | Tokens | Notes |
|---|---|---|
| Surface | `background`, `card`, `popover` + `-foreground` | |
| Action | `primary`, `secondary`, `accent`, `destructive` (+ `-foreground` except `destructive`) | |
| Neutral UI | `muted`, `muted-foreground`, `border`, `input`, `ring` | `muted` is the hover surface in Button/Badge |
| Chart | `chart-1` … `chart-5` | needs distinct hues for phase 4 |
| Sidebar | `sidebar`, `sidebar-foreground`, `sidebar-primary(-foreground)`, `sidebar-accent(-foreground)`, `sidebar-border`, `sidebar-ring` | |
| Radius | `--radius` → `--radius-sm … -4xl` | derived |
| Font | `--font-sans`, `--font-heading`, `--font-mono` | see Known issues 1 |

## Known issues

Labels: **observation** = read directly from code or the running app; **inference** = reasoning from observations, not tested.

1. **Font tokens reference themselves.** `@theme inline` declares `--font-sans: var(--font-sans)` and `--font-mono: var(--font-mono)`, re-using the names next/font sets on `<html>`. Tailwind emits that declaration into `:root` inside `@layer theme` (observation, browser stylesheet dump). A custom property that references itself is a cycle and computes to invalid (inference from the CSS spec). It works today only because next/font's rule is unlayered, and unlayered rules beat layered ones: `<html>` computes `--font-sans` to "IBM Plex Sans Thai" (observation). If the next/font variable class ever leaves `<html>` or lands in a layer, text silently falls back to the default font (inference). Option: give next/font a distinct variable (e.g. `--font-plex-thai`) and map `--font-sans: var(--font-plex-thai)`.
2. **Same value, different names.** `--accent` equals `--muted` in both themes, and `--sidebar-accent` equals both. In light, `--input` equals `--border` and `--card` / `--popover` equal `--background` (observation, [[globals-css]] L12–26, L55–57). These are shadcn defaults, not bugs, but two names for one value invites mixed usage for the same job (inference).
3. **Two different "primary" oranges.** `--sidebar-primary` (light `oklch(0.666 0.179 58.318)`, dark `oklch(0.769 0.188 70.08)`) is lighter and yellower than `--primary` (light `oklch(0.555 0.163 48.998)`, dark `oklch(0.473 0.137 46.201)`); in dark mode the two move in opposite directions (observation, [[globals-css]] L16, L36, L51, L70). Whether this is intended is not recorded anywhere.
4. **Chart tokens are a grey ramp shared with UI greys.** `chart-1..5` have identical values in light and dark; `chart-2` equals `muted-foreground` (light) and `chart-5` equals `muted` / `accent` (dark) (observation, [[globals-css]] L28–32, L63–67). AGENTS.md already flags this for phase 4 (requirement, [[agents-md]]).
5. **Heading weight is not enforced by tokens.**

   > [!warning] Contradiction
   > [[agents-md]] says headings use weight 600. [[globals-css]] base layer gives `h1–h6` only `font-heading` (family), and `CardTitle` applies `font-medium`, computing to weight 500 in the gallery (observation, [`Card.module.css`](../../../src/components/ui/Card/Card.module.css) `.title`, browser check). The gallery's `h1`/`h2` reach 600 only through caller `font-semibold` classes. Not yet resolved: the rule or the components need to change, which is a design decision.

## Where to look

- [`src/app/globals.css`](../../../src/app/globals.css) — every token value and mapping.
- [`src/app/layout.tsx`](../../../src/app/layout.tsx) — where next/font defines `--font-sans` / `--font-mono` on `<html>`.
- [`src/components/ui/*/*.module.css`](../../../src/components/ui) — how components consume tokens.
- [`src/components/showcase/component-gallery.tsx`](../../../src/components/showcase/component-gallery.tsx) — `/` page to see tokens in both themes (press `d`).

## Evidence

- Token values, mappings, base layer: `src/app/globals.css` at `7130589` (clean tree), read in full on 2026-11-14.
- Font cascade (issue 1) and heading weights (issue 5): checked on 2026-11-14 in the running dev server (`npm run dev`, `/`), by dumping stylesheet rules containing `--font-sans` and reading computed `--font-sans` on `<html>` and `font-weight` of `h1` and `[data-slot=card-title]`.
- `layout.tsx` font setup: `src/app/layout.tsx` at `7130589` sets `variable: "--font-sans"` (L17) and `variable: "--font-mono"` (L22) and puts both `.variable` classes on `<html>` (L42–46); read by `grep` on 2026-11-14.
