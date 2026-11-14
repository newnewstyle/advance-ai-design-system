# design-system-research — Log

Append-only record of meaningful wiki writes. Read-only queries appear only when query logging is configured. Each entry starts with `## [YYYY-MM-DD] <op> | <title>`:

```bash
rg '^## \[' wiki/log.md | tail -10        # last 10 entries
rg '^## \[.* ingest' wiki/log.md          # all ingests
```

---

## [2026-11-14] setup | design-system-research
- Created wiki scaffold from llm-wiki skill at `.wiki/` inside the `my-app-2` repo
- Schema: project-knowledge
- Domain: design system research for the บ้านเช่าทุ่งทอง back office
- Schema addition: "Repository sources" pins repo files by git revision instead of copying them into `raw/`

## [2026-11-14] ingest | AGENTS.md and src/app/globals.css
- Source: `repo:AGENTS.md@7130589`, `repo:src/app/globals.css@7130589` (pinned by revision, not copied to `raw/`)
- Created: [[agents-md]], [[globals-css]], [[design-tokens]], [[2026-11-14-dark-mode-data-theme-attribute]]
- Updated: none (first ingest)
- Contradictions: 1 flagged on [[design-tokens]]: heading weight 600 ([[agents-md]]) vs `CardTitle` weight 500 (code)
- Open questions: is `--sidebar-primary` meant to differ from `--primary`? Rename next/font variables to end the `--font-sans` self-reference?
