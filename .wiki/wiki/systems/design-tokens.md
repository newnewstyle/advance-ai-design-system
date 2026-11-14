---
type: system
status: active
created: 2026-11-14
updated: 2026-11-14
tags: [tokens, theming, color, typography, components]
---

# Design tokens

> The CSS custom properties that define the look of every component: colors, radius, and font families. They live only in `src/app/globals.css`; components consume them through Tailwind utilities (`bg-primary`, `rounded-lg`, `font-heading`) inside CSS Modules. This page is the canonical place for how tokens are organised and where they currently go wrong.

## Domain and constraints

- **Tokens first.** The look changes via tokens before component CSS (requirement, [[agents-md]]).
- **Three-place rule.** Every color token needs: a light value in `:root`, a dark value in `[data-theme="dark"]`, and `--color-<name>: var(--<name>)` in `@theme inline`. Missing the first two breaks one theme; missing the mapping means the utility class never exists (requirement, [[agents-md]]). At `7130589` every color token satisfies all three (observation, [[globals-css]]).
- **Dark mode keys off `data-theme`**, not a `.dark` class: see [[2026-11-14-dark-mode-data-theme-attribute]].
- **Radius is one knob.** `--radius` (0.625rem) derives `--radius-sm` (×0.6) through `--radius-4xl` (×2.6); edit the base only (requirement, [[agents-md]]; values observed in [[globals-css]]).
- **Typography.** One family (IBM Plex Sans Thai) for body and headings; headings are set apart by weight 600 vs body 400 (requirement, [[agents-md]]). Enforced by the base layer for `h1–h6` and by each component's `.title` class (Known issues 5).
- **Status colors are a pending token family.** None exist yet; when added they follow the three-place rule, and every status shows color + icon + text label (requirement, [[agents-md]]).
- **Semantic names only** in components; raw palette colors and hex are out of bounds (requirement, [[agents-md]]).

## Token families

| Family | Tokens | Notes |
|---|---|---|
| Surface | `background`, `card`, `popover` + `-foreground` | |
| Action | `primary`, `secondary`, `accent`, `destructive` (+ `-foreground` except `destructive`) | |
| Neutral UI | `muted`, `muted-foreground`, `border`, `input`, `ring` | `muted` is the hover surface in Button/Badge |
| Chart | `chart-1` … `chart-5` | needs distinct hues for phase 4 |
| Sidebar | `sidebar`, `sidebar-foreground`, `sidebar-primary(-foreground)`, `sidebar-accent(-foreground)`, `sidebar-border`, `sidebar-ring` | `sidebar-primary(-foreground)` alias `primary(-foreground)` (Known issues 3) |
| Radius | `--radius` → `--radius-sm … -4xl` | derived |
| Font | `--font-sans`, `--font-heading`, `--font-mono` | see Known issues 1 |

## Known issues

Labels: **observation** = read directly from code or the running app; **inference** = reasoning from observations, not tested.

1. **Font tokens reference themselves.** `@theme inline` declares `--font-sans: var(--font-sans)` and `--font-mono: var(--font-mono)`, re-using the names next/font sets on `<html>`. Tailwind emits that declaration into `:root` inside `@layer theme` (observation, browser stylesheet dump). A custom property that references itself is a cycle and computes to invalid (inference from the CSS spec). It works today only because next/font's rule is unlayered, and unlayered rules beat layered ones: `<html>` computes `--font-sans` to "IBM Plex Sans Thai" (observation). If the next/font variable class ever leaves `<html>` or lands in a layer, text silently falls back to the default font (inference). Option: give next/font a distinct variable (e.g. `--font-plex-thai`) and map `--font-sans: var(--font-plex-thai)`.
2. **Same value, different names.** `--accent` equals `--muted` in both themes, and `--sidebar-accent` equals both. In light, `--input` equals `--border` and `--card` / `--popover` equal `--background` (observation, [[globals-css]] L12–26, L55–57). These are shadcn defaults, not bugs, but two names for one value invites mixed usage for the same job (inference).
3. **Two different "primary" oranges — resolved 2026-11-14.** At `7130589`, `--sidebar-primary` (light `oklch(0.666 0.179 58.318)`, dark `oklch(0.769 0.188 70.08)`) was lighter and yellower than `--primary` (light `oklch(0.555 0.163 48.998)`, dark `oklch(0.473 0.137 46.201)`), and in dark mode the two moved in opposite directions (observation, [[globals-css]] L16, L36, L51, L70). The user chose one brand orange ("follow the rules", session 2026-11-14): `--sidebar-primary: var(--primary)` and `--sidebar-primary-foreground: var(--primary-foreground)` in both `:root` and `[data-theme="dark"]`. The sidebar now follows any change to `--primary`. Its only consumer is the brand mark in [`app-sidebar.tsx`](../../../src/components/app-shell/app-sidebar.tsx) L56.
4. **Chart tokens are a grey ramp shared with UI greys.** `chart-1..5` have identical values in light and dark; `chart-2` equals `muted-foreground` (light) and `chart-5` equals `muted` / `accent` (dark) (observation, [[globals-css]] L28–32, L63–67). AGENTS.md already flags this for phase 4 (requirement, [[agents-md]]).
5. **Heading weight not enforced — resolved 2026-11-14.** At `7130589`, [[agents-md]] required weight 600 for headings, but the [[globals-css]] base layer gave `h1–h6` only `font-heading` (family). `CardTitle` used `font-medium`, which computed to 500, and so did `DialogTitle`, `AlertDialogTitle` and `SheetTitle`. The gallery's `h1`/`h2` reached 600 only through caller classes (observation, browser check). The user chose to follow the rule (session 2026-11-14). The base layer now applies `font-heading font-semibold` to `h1–h6`, and the four `.title` classes use `font-semibold`. Callers can still override with a utility, because base and component layers rank below utilities; the superseded `/playground` pages do this with `font-medium`.

## Where to look

- [`src/app/globals.css`](../../../src/app/globals.css) — every token value and mapping.
- [`src/app/layout.tsx`](../../../src/app/layout.tsx) — where next/font defines `--font-sans` / `--font-mono` on `<html>`.
- [`src/components/ui/*/*.module.css`](../../../src/components/ui) — how components consume tokens.
- [`src/components/showcase/component-gallery.tsx`](../../../src/components/showcase/component-gallery.tsx) — `/` page to see tokens in both themes (press `d`).

## Evidence

- Token values, mappings, base layer: `src/app/globals.css` at `7130589` (clean tree), read in full on 2026-11-14.
- Font cascade (issue 1) and heading weights (issue 5): checked on 2026-11-14 in the running dev server (`npm run dev`, `/`), by dumping stylesheet rules containing `--font-sans` and reading computed `--font-sans` on `<html>` and `font-weight` of `h1` and `[data-slot=card-title]`.
- Resolutions of issues 3 and 5: working tree on top of `aa6bcf8` (uncommitted at check time), checked 2026-11-14. Files: `src/app/globals.css` L36–37, L70–71, base `h1–h6`; `.title` in `AlertDialog`, `Card`, `Dialog` and `Sheet` `.module.css`. Method: `tsc` and `eslint` exit 0. In the dev server, the computed `--sidebar-primary` / `-foreground` equal `--primary` / `-foreground` in both themes; `h1`, `h2` and `[data-slot=card-title]` compute to weight 600 and body to 400 on `/` and `/dashboard`; the sidebar brand mark's background equals the `--primary` color; no console errors.
- `layout.tsx` font setup: `src/app/layout.tsx` at `7130589` sets `variable: "--font-sans"` (L17) and `variable: "--font-mono"` (L22) and puts both `.variable` classes on `<html>` (L42–46); read by `grep` on 2026-11-14.
