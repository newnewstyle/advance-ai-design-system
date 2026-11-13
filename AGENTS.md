<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository. (`CLAUDE.md` only imports this file; edit project guidance here, below the managed Next.js block above — `next dev` rewrites only the content between its markers.)

## Project purpose

A frontend-only **prototype** with two goals:

1. **Design system** — customize shadcn/ui components and tokens into our own design system.
2. **Rental property back office** — a dashboard for a landlord to manage rental houses, built on that design system. Users are landlords, not tenants.

There is no backend. Auth and data are faked on the client (see below). Favor realistic-looking mock flows over production concerns. "Sending" anything (messages, uploads) is simulated: show a toast and record it in mock history; never call a real LINE/SMS/email/storage service.

### Build phases (do them in order; check which exist before starting)

1. **Foundation** — switch to Thai-capable fonts, Login / Register / Account details, mock session + route guard, app shell with `Sidebar`.
2. **Core data** — houses, tenants, leases, rent payments (list tables, detail pages, add/edit forms).
3. **Rent reminders** — pick overdue tenants, choose a template (upcoming / due / overdue) auto-filled with name, amount and due date, pick a channel (LINE / SMS / email, display only), "send", and log it to reminder history.
4. **Collection stats** — KPIs (total overdue, reminders sent, avg days from reminder to payment) and charts (collected vs overdue per month, on-time rate per tenant). Needs `npx shadcn@latest add chart` (Recharts) and distinct `--chart-1..5` hues; the current chart tokens are all near-grey.
5. **Maintenance requests** — status flow pending → in progress → done, form with house, category (plumbing, electrical, A/C…), urgency, description and photo preview (not uploaded), plus repair cost feeding the income/expense summary.

Lease, payment and maintenance statuses (vacant / occupied / lease ending / overdue, etc.) use the status-color rule below: token color + icon + text label.

### Language and locale

- **All UI copy is Thai** (`<html lang="th">`). Mock data uses Thai names, Thai addresses and phone formats.
- Money is THB. Format numbers, currency and dates with `Intl` and the `th-TH` locale (e.g. `new Intl.NumberFormat("th-TH", { style: "currency", currency: "THB" })`).
- The current fonts (Raleway, DM Sans) have no Thai glyphs; phase 1 replaces them with Thai-capable fonts from `next/font/google` (e.g. IBM Plex Sans Thai or Noto Sans Thai), keeping the `--font-sans` / `--font-heading` variable names.

## Commands

```bash
npm run dev        # next dev (also re-syncs the managed block in AGENTS.md)
npm run build      # next build
npm run lint       # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write on all .ts/.tsx (sorts Tailwind classes)
```

No test runner is configured. Verify changes with `typecheck`, `lint`, and by viewing the page in the dev server.

Add shadcn components with `npx shadcn@latest add <name>` — they land in `src/components/ui/`.

## Stack (versions matter)

- **Next.js 16 App Router + React 19** — APIs differ from older training data; check `node_modules/next/dist/docs/` before using framework APIs.
- **Tailwind CSS v4**, CSS-first: no `tailwind.config`. Theme lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme`, `@custom-variant dark`).
- **shadcn/ui, style `base-nova`, built on Base UI (`@base-ui/react`), not Radix.** Composition uses the `render` prop, not `asChild`:
  `<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>`.
  Components expose `data-slot="..."` attributes used for cross-component styling (e.g. `in-data-[slot=button-group]:`).
- `cn` comes from the `cn` npm package (re-exported by `@/lib/utils`), not a local clsx + tailwind-merge helper.
- Icons: `lucide-react`. Toasts: `sonner` (`<Toaster />` is mounted in the root layout). Theming: `next-themes` (class strategy).
- Path alias `@/*` → `src/*`.

## Architecture

- `src/app/layout.tsx` — root shell: fonts (Raleway → `--font-sans`, DM Sans → `--font-heading`, Geist Mono → `--font-mono`), `ThemeProvider`, `TooltipProvider`, `Toaster`.
- `src/components/theme-provider.tsx` — wraps next-themes and adds a global **`d` hotkey to toggle dark mode** (ignored while typing in inputs).
- `src/app/page.tsx` + `src/components/new-components-demo.tsx` — current component showcase/playground from the template; will be replaced/reorganized as dashboard routes are built.
- `src/hooks/use-mobile.ts` — used by the `sidebar` component for responsive behavior.

### Design system rules

- **`src/components/ui/` is owned source.** Restyle shadcn components by editing these files directly (cva variants, sizes, classes). Don't keep them pristine for CLI re-adds; re-running `shadcn add` on an existing component will overwrite customizations.
- **Tokens in `src/app/globals.css` are the source of truth** (oklch CSS variables: colors, `--radius`, sidebar, chart). Change the look via tokens first, component classes second.
- **Adding a token touches three places:** the light value in `:root`, the dark value in `.dark`, and the Tailwind mapping in `@theme inline` (`--color-<name>: var(--<name>)`). Miss one and the utility class either doesn't exist or breaks in one theme.
- **Radius scale** (`--radius-sm` … `--radius-4xl`) is derived from the single `--radius` with `calc()` in `@theme inline`. Change the base, not each step.
- Dark mode is the `.dark` class (variant `&:is(.dark *)`), set on `<html>` by next-themes.
- Use semantic token classes (`bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring/50`) rather than raw Tailwind palette colors or hex values, so both themes work.
- Status colors (success / warning / critical, e.g. for lease, payment and repair badges) don't exist yet. If added, define them as tokens per the rule above, and never convey status by color alone: pair it with an icon and a text label.
- `components.json` base color is `stone`; menus use `default-translucent` / `subtle` accent.

### Component conventions (when adding or customizing `src/components/ui/`)

- Plain function components, no `forwardRef` (React 19 passes `ref` as a prop). Type props as `React.ComponentProps<"div">` for plain elements, or the Base UI part's props (`DialogPrimitive.Popup.Props`, `useRender.ComponentProps<"span">`), and spread `...props` onto the root.
- Every rendered part sets `data-slot="<component>-<part>"` (with `useRender`, pass `state: { slot: "..." }` as `badge.tsx` does). Style parents and siblings off these (`in-data-[slot=button-group]:`, `has-data-[icon=inline-end]:`, `group/button`) instead of adding new className props.
- Variants and sizes go in `cva` with `VariantProps`; export the `*Variants` function next to the component.
- Polymorphism uses Base UI's `render` prop / `useRender` + `mergeProps`, never `asChild` or Radix `Slot`.
- When restyling, keep the existing `focus-visible:` ring and `aria-invalid:` styles; they carry the keyboard-focus and form-error states.

### Mock auth & data (planned convention)

- No API calls. Mock users and dashboard data live in local TS files (e.g. under `src/lib/mock/`).
- Session is faked client-side (localStorage/cookie); a route guard redirects unauthenticated users to `/login`. Login/Register/Account forms validate locally and update the mock session.

## Gotchas

- `.prettierrc`'s `tailwindStylesheet` must point at `src/app/globals.css`; update it if the stylesheet moves, or class sorting stops recognizing custom theme values.
- Prettier style: no semicolons, double quotes, trailing commas `es5`, 80 cols, LF line endings.
