# design-system-research — Project Knowledge Wiki

**Domain**: Design system research for the บ้านเช่าทุ่งทอง back-office prototype: tokens, component conventions, and the rationale behind them
**Created**: 2026-11-14
**Schema version**: project-knowledge v1
**Repository**: `..` (the `my-app-2` repo this wiki sits in), remote https://github.com/newnewstyle/advance-ai-design-system

## Purpose and evidence

Preserve requirements, architectural rationale, domain meanings, non-obvious constraints, and pointers that save investigation. Keep discoverable implementation details in code, configuration, and executable examples; link to them from the wiki.

- `raw/` holds immutable captures of meetings, design docs, PR discussions, and other sources. A capture records what was said at that time.
- `wiki/` holds derived, LLM-maintained knowledge. A summary never outranks its evidence.
- `AGENTS.md` defines this wiki's conventions. Read it for wiki work; load relevant pages on demand.

Use requirements and accepted decisions for intent; inspect current code/configuration for implemented behavior and tests or execution for supporting evidence. A mismatch is a finding to investigate, not permission to rewrite intent. Label proposals, observations, and inferred conclusions distinctly. Record an inferred decision as proposed until acceptance is evidenced.

## Page types

Create a page when it answers a distinct, reusable question; prefer linking to existing authoritative project documents over copying them.

| Type | Directory | Purpose |
|------|-----------|---------|
| Source | `wiki/sources/` | Concise source summary with provenance |
| Decision | `wiki/decisions/` | Context, choice, alternatives, consequences |
| Concept | `wiki/concepts/` | Domain terms, business rules, product meanings |
| System | `wiki/systems/` | Purpose, boundaries, non-obvious constraints, code navigation |
| Incident | `wiki/incidents/` | Failure context, evidence, lessons, resolution |
| Topic | `wiki/topics/` | Reusable synthesis across systems or sources |
| Person | `wiki/people/` | Relevant roles or ownership context when a dedicated page helps |

## Naming and frontmatter

Use lowercase hyphenated names; date-prefix decisions and incidents. Wikilinks such as `[[design-tokens]]` resolve by unique basename across the wiki; use relative Markdown links for code and external artifacts.

Required page frontmatter:

```yaml
---
type: <source|decision|concept|system|incident|topic|person>
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: []
---
```

Additional fields by type:
- Source: `raw` relative path; original `url` and capture date when available. For a repository file, see "Repository sources" below.
- Decision: `status` (`proposed`, `accepted`, `superseded`, `deprecated`); acceptance evidence and deciders when known.
- System: `status` (`active`, `deprecated`, `historical`).
- Incident: `status` (`ongoing`, `resolved`); severity if established.

`updated` means an edit occurred. If a retained claim describes current implementation, record its verification beside the claim or in an Evidence section: repository, relevant paths/symbols, revision, check date, and what was actually inspected or run. Identify a dirty working tree or use a content hash when a commit does not identify the evidence. Use `unverified` when evidence is unavailable; never manufacture verification metadata. Refresh claims when relevant evidence changes or the task depends on their currency.

Tags in use: `tokens`, `theming`, `typography`, `components`, `conventions`, `color`.

## Templates

Use only sections with useful content. Link to an existing ADR, requirement, or runbook when it already carries the needed knowledge.

### Decision

```markdown
# <Decision title>

## Context
<problem and constraints>

## Decision
<choice, status, and evidence of acceptance; distinguish intent from implementation>

## Alternatives and rationale
<options considered and why this choice was made>

## Consequences
<tradeoffs and constraints future changes must respect>

## Evidence and history
<source links with dates; supersedes/superseded-by links when applicable>
```

### System

```markdown
# <System name>

> <Purpose and boundary in a short paragraph.>

## Domain and constraints
<business meanings and non-obvious constraints, linked to requirements or decisions>

## Where to look
- <code path and symbol> — <what question it answers>
- <configuration/test/script path> — <what it establishes or verifies>

## Decisions and lessons
<links to relevant ADRs or incidents>

## Evidence
<only for retained implementation claims: claim, repository/revision or hash,
paths/symbols, checked date, method, and limitations>
```

### Incident

```markdown
# <Incident title>

## Impact and timeline
<observed impact and relevant timestamps>

## Cause and evidence
<verified cause; label hypotheses and link investigation evidence>

## Resolution and lessons
<what changed, why it worked, and constraints future work should preserve>

## Follow-ups
<link to the task tracker or relevant decision; avoid a duplicate task list>
```

## Workflows

### Ingest and capture

For source ingestion, follow the skill's ingest workflow. Cite the session decision or source artifact; direct code observations cite paths and revision. Capture externally sourced material in `raw/` when needed for durable provenance; avoid copying the repository into `raw/`.

**Repository sources.** A file from the host repo (e.g. `AGENTS.md`, `src/app/globals.css`) is pinned by git revision instead of being copied into `raw/`: the commit is the immutable capture. Its source page sets `raw: repo:<path>@<short-sha>` and links the file relatively. To see the file as captured, run `git show <sha>:<path>` from the repo root.

Keep one canonical page per explanation and link to it. Routine code changes need a wiki update only when retained knowledge or navigation changes. Preserve historical decisions; record explicit supersession. Correct demonstrable summary errors with evidence and flag unresolved contradictions for a decision.

Update `index.md` when catalog entries change. Append one concise dated log entry per meaningful write operation. Keep read-only queries read-only unless query logging is explicitly configured.

### Query

Use ADRs for why, requirements for intended behavior, and the current repository for implementation questions. System pages route investigation. Cite underlying evidence when verifying a claim and label synthesis as interpretation. If repository/source access is unavailable, state that the account is unverified or historical.

### Lint and pruning

Check provenance, link validity, evidence currency, duplicate explanations, and unresolved contradictions. Compare relevant code/source changes with retained claims; page age alone does not prove staleness. An unrelated repository commit does not require rewriting the wiki.

Keep concise complete pages; page length and link counts are not quality targets. Merge redundant explanations into a canonical page, preserve unique evidence and historical rationale, and repair incoming links when pruning is authorized. Flag missing evidence rather than creating an ADR or claiming verification merely to satisfy a template.

Domain-specific lint check: for every token claim, compare against `src/app/globals.css` at HEAD; a token's light value, dark value, and `@theme inline` mapping must all still match what the wiki states.
