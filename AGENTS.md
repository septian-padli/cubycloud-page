# CubyCloud Website Agent Instructions

Scope: operational rules for agents working in `cubycloud-page`.
Read this file first; load only task-relevant domain documents afterward.

## Authority and state

- Current implementation: React 19, TypeScript, Vite, custom CSS, GSAP/ScrollTrigger, Three.js/React Three Fiber, and a custom React documentation prototype.
- Approved target, not yet implemented: Astro, React Islands, Starlight at `/docs/`, Markdown/MDX, and Starlight-integrated search.
- Documentation-only requests authorize Markdown changes only. They do not authorize installs, scaffolding, source edits, servers, builds, deployment, or product changes.
- A later explicit owner instruction to start migration authorizes scoped website development. Architecture approval or this document alone does not start that work.
- A migration run changes the framework, not the existing marketing experience.
  See [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) for invariants and acceptance gates.
- Actual source and verified running behavior define the current homepage baseline.
  Historical FigCraft proposals are not implementation evidence.

## Repository and data safety

- This website repository is writable only within the active task's authorization.
- The sibling `../cubycloud` product repository is strictly read-only. Never modify,
  stage, commit, delete, reconfigure, or push its files.
- Never read, print, transfer, or commit secrets, `.env*` values, credentials,
  private keys, or customer data.
- Use synthetic data in marketing demonstrations; never present them as live uploads, sharing, accounts, or storage connections.
- Verify product claims against the read-only product repository;
  [BRIEF.md](BRIEF.md) owns factual constraints.
- Inspect branch, commit, worktree, and pending changes before editing.
  Preserve unknown local work, including deletions.
- Avoid destructive Git operations, force pushes, direct changes to `main`, and
  automatic merge or deployment. These require separate owner authorization.
- Do not commit, push, or create application files in a documentation-only task.

## Evidence and conflict handling

- Record whether a statement is `Current implementation`, `Approved target`, `Planned`, `Implemented`, `Verified`, or `Blocked`.
- Verify claims about current behavior from source, then confirm in a browser when
  claiming runtime behavior.
- Current React documentation pages are a prototype; they are not Starlight,
  full-text search, or published Markdown/MDX.
- Check the actual product source before publishing setup commands, license terms,
  permissions, storage guarantees, or security claims.
- Keep the existing installation CTA destination until the new route is accurate, reachable, and separately approved for use.
- Do not turn a missing test, pending review, or unavailable browser into a `PASS`.
- If approval and runtime disagree, identify which rule applies to the current task and escalate a substantive change.
- Never fix documentation conflicts by altering application behavior during documentation-only work.

## Context routing

| Need | Owner |
| --- | --- |
| Setup, current scripts and architecture | [README.md](README.md) |
| Migration DAG, preservation, gates, rollback | [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) |
| Approved, superseded, or open choices | [DECISIONS.md](DECISIONS.md) |
| Product facts and positioning | [BRIEF.md](BRIEF.md) |
| Palette, fonts, responsive and docs styling | [DESIGN.md](DESIGN.md) |
| Existing copy, editorial rules, metadata | [CONTENT.md](CONTENT.md) |
| Sections, routes, docs navigation | [PAGES.md](PAGES.md) |
| GSAP/Three.js and motion lifecycle | [MOTION.md](MOTION.md) |
| Scenarios and evidence | [PROTOTYPE.md](PROTOTYPE.md) |

Read [DECISIONS.md](DECISIONS.md) before interpreting historical rules. If the
source, an approved decision, and a document conflict, report the material
discrepancy; do not silently choose a redesign or invent approval.

Historical `AI_RULES.md` describes the original standalone landing experiment.
Its useful rules belong in the owners above; it must not override newer
implementation evidence or migration decisions. `FIGCRAFT.md` remains historical
design-tool guidance, not coding instruction.

## Scoped migration execution, when separately started

1. Establish a cleanly attributable baseline, including source commit, working-tree
   state, runtime captures, and known defects.
2. Use supervised Orca orchestration with OMP workers. Verify the installed CLI,
   worker model, and supported flags at run time.
3. Assign dependencies, acceptance criteria, and exclusive file ownership. Use
   isolated Git worktrees; limit implementation concurrency to two workers by default.
4. Keep shared configuration under one editor. Integrate reviewed work only after
   worker evidence, then run independent QA on the combined result.
5. Use preserve-first architecture. A cohesive landing React island is acceptable
   until splitting preserves cross-section animation and DOM-coordinate dependencies.
6. Prefer native Starlight features over duplicate custom docs infrastructure.
   Keep marketing CSS and docs styles isolated.
7. Run relevant build, type, browser, accessibility, mobile, and regression checks.
   [PROTOTYPE.md](PROTOTYPE.md) owns detailed scenarios.
8. Investigate failed checks before retrying. Never remove a feature, relax a gate,
   or mark an untested scenario passed to finish a task.
9. Keep changes reversible and reviewable. Do not automatically merge to `main`
   or deploy.

These steps describe a future authorized run, not permission to execute it now.
The task DAG and rollback procedure live only in [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md).

Before modifying shared files, agree the editor and dependency order. Preserve
human changes in the main checkout; worktree isolation does not license overwriting
local uncommitted work. Record the baseline SHA for comparisons and keep rollback
steps tied to a known, reviewable commit rather than a destructive reset.


## Worker report

For each assigned slice, report changed files, baseline reference, tests actually
run, observable results (`PASS`, `FAIL`, `BLOCKED`, or `NOT TESTED`), remaining
differences, and blockers. A worker completion message is not coordinator
acceptance. Screenshots do not prove click flows or animation; a successful build
does not prove visual parity.

Escalate any required visible change, unverified product statement, inaccessible
test surface, or conflicting approved rule. Present a reviewable branch and
evidence to the owner; await separate approval for merge and deployment.

If a task is blocked, state the missing prerequisite and evidence gathered. The
coordinator must not bypass a failed worker gate or silently shrink its acceptance
criteria. Future implementation work ends at owner review, not at automatic release.
