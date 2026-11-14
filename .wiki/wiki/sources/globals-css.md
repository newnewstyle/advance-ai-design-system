---
type: source
created: 2026-11-14
updated: 2026-11-14
raw: repo:src/app/globals.css@7130589
tags: [tokens, theming, color, typography]
---

# src/app/globals.css (token definitions)

> The single stylesheet that defines every design token ([`../../../src/app/globals.css`](../../../src/app/globals.css), 145 lines at `7130589`). It imports Tailwind, `tw-animate-css` and `shadcn/tailwind.css`, declares the `dark` custom variant on `[data-theme="dark"]`, defines light values in `:root` and dark values in `[data-theme="dark"]`, maps them to Tailwind in `@theme inline`, and sets a small `@layer base`.

## Key takeaways

Observations of the file at `7130589` (line numbers refer to that revision):

- **Color tokens (light + dark, L10–41 / L45–75):** `background`, `foreground`, `card(-foreground)`, `popover(-foreground)`, `primary(-foreground)`, `secondary(-foreground)`, `muted(-foreground)`, `accent(-foreground)`, `destructive`, `border`, `input`, `ring`, `chart-1..5`, and eight `sidebar-*` tokens. No `destructive-foreground`, no status (success / warning) tokens.
- **Every color token is defined in both themes and mapped in `@theme inline`** (L83–113): the three-place rule holds for all of them at this revision.
- **`--radius: 0.625rem`** (L33) drives `--radius-sm` … `--radius-4xl` via `calc()` (L114–120).
- **Fonts in `@theme inline`** (L80–82): `--font-sans: var(--font-sans)`, `--font-heading: var(--font-sans)`, `--font-mono: var(--font-mono)`.
- **Base layer** (L123–145): every element gets `border-border outline-ring/50`; `body` gets background/foreground; `html` gets `font-sans`; `h1–h6` get `font-heading` (family only, no weight); `table` gets `tabular-nums`.

## Notes

The value-level findings (identical tokens, self-referencing font names, near-grey charts) are analysed on the canonical page [[design-tokens]] under "Known issues".

## Related

- [[design-tokens]]
- [[agents-md]]
- [[2026-11-14-dark-mode-data-theme-attribute]]
