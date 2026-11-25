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
- Brand name is **บ้านเช่าทุ่งทอง**. Use `site` from `src/lib/site.ts` for the name/tagline, never hard-code it.
- **One font for everything: IBM Plex Sans Thai** (weights 400–700), loaded with `next/font/google` in `src/app/layout.tsx` as `--font-plex-thai`. `@theme inline` maps both `--font-sans` and `--font-heading` to it (the next/font variable must keep a different name from the token, or the token references itself), so `font-heading` still works; separate headings from body by weight (headings 600, body 400), not by family. Chosen for readability in a data-heavy back office; IBM Plex Sans Thai Looped is the fallback idea if users find it hard to read.
- Tables get `tabular-nums` from the base layer so money columns align; add it to other numeric displays (KPIs, amounts) too.
- Mono: Geist Mono (`--font-geist-mono`, mapped to the `--font-mono` token).

## Commands

```bash
npm run dev        # next dev (also re-syncs the managed block in AGENTS.md)
npm run build      # next build
npm run lint       # eslint (flat config: eslint-config-next core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
npm run format     # prettier --write on all .ts/.tsx (sorts Tailwind classes)
npm run storybook  # Storybook dev server on http://127.0.0.1:6006 (binds 127.0.0.1, not localhost)
npm run build-storybook  # static build into storybook-static/ (gitignored, eslint-ignored)
```

No test runner is configured. Verify changes with `typecheck`, `lint`, and by viewing the page in the dev server (or the component in Storybook).

Adding a shadcn component: `npx shadcn@latest add <name>` drops a lowercase `src/components/ui/<name>.tsx` full of Tailwind classes. Convert it to the folder + CSS Module pattern below, delete the lowercase file, and import from `@/components/ui/<Name>`. The CLI can't see the PascalCase folders, so if a new component depends on an existing one (e.g. `button`) it will re-create that file too; delete the duplicate and point imports at the existing folder. Never use `--overwrite`.

## Stack (versions matter)

- **Next.js 16 App Router + React 19** — APIs differ from older training data; check `node_modules/next/dist/docs/` before using framework APIs.
- **Tailwind CSS v4**, CSS-first: no `tailwind.config`. Theme lives in `src/app/globals.css` (`@import "tailwindcss"`, `@theme`, `@custom-variant dark`).
- **shadcn/ui, style `base-nova`, built on Base UI (`@base-ui/react`), not Radix.** Composition uses the `render` prop, not `asChild`:
  `<DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>`.
  Components expose `data-slot="..."` attributes used for cross-component styling.
- `cn` comes from the `cn` npm package (re-exported by `@/lib/utils`), not a local clsx + tailwind-merge helper.
- Icons: `lucide-react`. Toasts: `sonner` (`<Toaster />` is mounted in the root layout). Theming: `next-themes` with `attribute="data-theme"` (see dark mode below).
- Path alias `@/*` → `src/*`.

## Architecture

- `src/app/layout.tsx` — root shell: fonts, `ThemeProvider`, `AuthProvider`, `TooltipProvider`, `Toaster`.
- Route groups: `src/app/(auth)/` (login, register; wrapped in `<GuestOnly>`) and `src/app/(dashboard)/` (wrapped in `<RequireAuth>` + `SidebarProvider` + `AppSidebar`). `/` is the public component gallery (see below). New app pages go in `(dashboard)/` and start with `<PageHeader>`.
- Pages are server components that export `metadata` and render a client component from `src/components/<area>/` (forms, anything using `useAuth`).
- Sidebar menu comes from `src/components/app-shell/nav-items.ts`; items whose `phase` > `CURRENT_PHASE` render disabled with "เร็วๆ นี้". Bump `CURRENT_PHASE` when a phase ships (it also drives the roadmap card on `/dashboard`).
- `src/components/theme-provider.tsx` — wraps next-themes and adds a global **`d` hotkey to toggle dark mode** (ignored while typing in inputs).
- `/` (`src/app/page.tsx` → `src/components/showcase/component-gallery.tsx`) — public gallery of every design-system component, grouped by section. When you add or change a `ui/` component, add or update its demo here **and** its Storybook story. `/playground` is the older template demo and is superseded.
- **Storybook** (`@storybook/nextjs-vite` 10, Vite builder): config in `.storybook/`. `preview.tsx` imports `globals.css`, loads the same `next/font` fonts and puts their variables on `<html>` (so portalled dialogs/menus get the font), wraps stories in `TooltipProvider` + `Toaster`, and adds a light/dark toolbar switch that sets `data-theme` on `<html>`, the same mechanism as the app. Telemetry is disabled in `main.ts`. A component's usage docs are shown at the top of its Docs page: `usageDoc(md, spec)` from `src/lib/usage-doc.ts` renders the spec rules, then the `.md` (imported with `?raw`; see `Button.stories.tsx`).
- `src/hooks/use-mobile.ts` — used by the `Sidebar` component for responsive behavior.

### Design system rules

- **Read the component's docs first.** Before using a component, or changing anything in its folder, read what exists of: `<Name>.spec.ts` (usage and decision rules: when to use, when not to, deliberate choices; the single source for them) and `<Name>.md` (props, tokens, example). Button, Badge, Dialog and Tabs have both (plus `<Name>.types.ts`); other components have none yet. Write or rewrite them with the `/usage-doc <Name>` skill.
- **Docs and stories change together.** Whenever you change a component's `<Name>.md` or `<Name>.spec.ts`, update `<Name>.stories.tsx` in the same change, and the reverse:
  - every variant, size, prop and state the docs list has a story or a control, and nothing the stories show is missing from the docs;
  - the example in part 6 is copied from a story; if that story changes, update the example;
  - the `## Import and usage` section matches what the folder's `index.ts` exports;
  - the one-time app setup shown on every Docs page lives only in `src/components/ui/SETUP.md`; update it when the setup in `src/app/layout.tsx` changes;
  - the stories keep the Docs wiring (`usageDoc(usage, spec)`), so the Docs page shows the current text.

  Open the component's Docs page in Storybook to confirm before you finish.
- **`src/components/ui/` is owned source**, one PascalCase folder per component: `Button/Button.tsx` (markup), `Button/Button.types.ts` (prop types, re-exported by the `.tsx`), `Button/Button.module.css` (all styling), `Button/index.ts` (re-export), `Button/Button.stories.tsx` (Storybook: `title: "Components/<Name>"`, `tags: ["autodocs"]`, a `Playground` story whose `argTypes` expose the semantic props, plus one story per variant/state, Thai example content), and the usage docs `Button/Button.spec.ts` + `Button/Button.md` (above). Tests will be `Button.test.tsx` (no runner yet; when Vitest is added, limit it to `*.test.tsx` so `.spec.ts` rule files are not run as tests). Import as `@/components/ui/Button`. Restyle by editing the `.module.css`.
- **Tokens in `src/app/globals.css` are the source of truth** (oklch CSS variables: colors, `--radius`, sidebar, chart). Change the look via tokens first, component CSS second.
- **Adding a token touches three places:** the light value in `:root`, the dark value in `[data-theme="dark"]`, and the Tailwind mapping in `@theme inline` (`--color-<name>: var(--<name>)`). Miss one and the utility class either doesn't exist or breaks in one theme.
- **Radius scale** (`--radius-sm` … `--radius-4xl`) is derived from the single `--radius` with `calc()` in `@theme inline`. Change the base, not each step.
- **Dark mode is the `data-theme="dark"` attribute on `<html>`, not a `.dark` class** (`@custom-variant dark` in `globals.css`, `attribute="data-theme"` in `theme-provider.tsx`). CSS Modules rename every class selector, so a `.dark` class would become `.xYz_dark` inside `@apply dark:…` and silently stop matching. Don't switch it back.
- Use semantic token classes (`bg-primary`, `text-muted-foreground`, `border-border`, `ring-ring/50`) rather than raw Tailwind palette colors or hex values, so both themes work.
- Status colors are the tokens `--success`, `--warning` and `--destructive`. Which status gets which color is set in `src/components/ui/Badge/Badge.md`. Never convey status by color alone: pair it with an icon and a text label.
- `components.json` base color is `stone`; menus use `default-translucent` / `subtle` accent.

### Component conventions (when adding or customizing `src/components/ui/`)

**TSX holds no Tailwind classes.** Each part renders `className={cn(styles.part, className)}`; the caller's `className` is the override hook.

**CSS Module recipe** (copy from `Button/Button.module.css`):

```css
@reference "../../../app/globals.css";   /* gives @apply the theme + custom variants */

@layer components {                       /* REQUIRED: lets className utilities win */
  .button { @apply inline-flex h-8 rounded-lg …; }
  .button[data-variant="outline"] { @apply border-border bg-background …; }
  .button[data-size="sm"] { @apply h-7 …; }
}
```

- **Always wrap rules in `@layer components`.** Utilities live in the later `utilities` layer, so `<Button className="h-12 rounded-full">` overrides the module whatever its specificity. Unlayered module CSS would beat every utility. (A utility only exists if it appears somewhere in the source; Tailwind doesn't generate unused classes.)
- **Variants and sizes are semantic props mapped to `data-*` attributes**, not classes: the TSX sets `data-variant={variant}` / `data-size={size}` (or `useRender` `state: { slot, variant, size }`), and the CSS selects `.button[data-variant="…"]`. Export the union types (`ButtonVariant`, `ButtonSize`, `ButtonProps`). No `cva`, no `*Variants` helpers.
- **Never `@apply` Tailwind's `group-*` / `peer-*` variants or the `group`/`peer` marker classes in a module.** Their `.group`/`.peer` selectors get renamed and break. Write the relationship as plain CSS with local classes or data attributes instead:
  - parent state → `.root[data-collapsible="icon"] .menuButton { … }`
  - sibling state → `.menuButton[data-size="lg"] ~ .menuBadge { … }`
  - other component's state → `[data-slot="tabs-list"][data-variant="line"] .trigger { … }`
  
  Attribute-based variants (`data-open:`, `has-data-[…]:`, `in-data-[…]:`, `aria-*:`, `dark:`, `[&_svg]:`) are fine inside `@apply`.
- To react to a **global** class a consumer adds (e.g. `border-b`), use `:global(.border-b)` (see `Card.module.css`).
- When a component restyles **another** component it renders (Sidebar → Input/Separator), raise specificity with the data-slot it passes: `.input[data-slot="sidebar-input"]`. Equal-specificity rules from two modules otherwise depend on CSS load order.
- Every rendered part sets `data-slot="<component>-<part>"`. Plain function components, no `forwardRef`; type props as `React.ComponentProps<"div">` or the Base UI part's props, and spread `...props` onto the root.
- Polymorphism uses Base UI's `render` prop / `useRender` + `mergeProps`, never `asChild` or Radix `Slot`.
- When restyling, keep the existing `focus-visible:` ring and `aria-invalid:` styles; they carry the keyboard-focus and form-error states.
- Feature components outside `ui/` (e.g. `src/components/auth/`) may still use Tailwind classes directly; the CSS Module rule is for the design-system components.

### Mock auth & data

- No API calls. Seed data lives in `src/lib/mock/` (demo login `demo@baanchao.test` / `demo1234`, in `users.ts`).
- `src/lib/auth/store.ts` keeps users and the session in `localStorage` (`baanchao:*` keys) and exposes async actions with a fake delay. `<AuthProvider>` reads it via `useSyncExternalStore`; status is `"loading"` on the server and before hydration, so never branch on the user during SSR. Components use `useAuth()`.
- Guards in `src/components/auth/route-guards.tsx` redirect client-side: guests → `/login?next=<path>`; signed-in users on `/login` or `/register` → `next` or `/dashboard`.
- Validation helpers with Thai messages are in `src/lib/auth/validation.ts`. Use `FormField` / `PasswordField` (`src/components/auth/form-field.tsx`) for labelled inputs with errors.

## Gotchas

- `.prettierrc`'s `tailwindStylesheet` must point at `src/app/globals.css`; update it if the stylesheet moves, or class sorting stops recognizing custom theme values.
- Prettier style: no semicolons, double quotes, trailing commas `es5`, 80 cols, LF line endings.
