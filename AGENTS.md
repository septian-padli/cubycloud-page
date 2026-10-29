# CubyCloud Website & Design Workspace — Agent Guidelines

> **Scope:** `cubycloud-page/` and its subdirectories. Mandatory instructions for OMP, Codex, and other agents working on CubyCloud website design.
> **Current authorization:** Documentation, FigCraft design, and prototyping only. These guidelines do not authorize website or product implementation.
> **Role:** Agent Orchestrator & Guardrails. Detailed design and execution requirements remain in their owning documents.

## 1. Project Identity and Operating Decisions

- CubyCloud is an open-source, lightweight, self-hosted file drive for personal and organization use; the website targets primarily small teams and organizations.
- Deliver an expressive marketing homepage and a clear Starlight-style documentation experience, with realistic desktop and mobile prototypes.
- Six approved agent rules: **Agent Orchestrator & Guardrails; Bounded Milestone Autonomy; Tiered Context Loading; Scenario-Driven Quality Gates; Controlled & Reversible Changes; Evidence-Based Milestone Handoff**.
- Treat `AGENTS.md` as the entry point, not a replacement for `BRIEF.md` through `DECISIONS.md`. Do not create additional governance documents without a user request.

## 2. Phase Boundary and Prohibited Operations

- Design preparation and FigCraft work are allowed **within the currently authorized design milestone**.
- **Prohibited without separate development authorization:** package installation, app/framework scaffolding, source-code implementation, web builds, backend mocks, local web servers, hosting configuration, CI/CD setup, and deployment.
- Do not create application files or configuration such as `.astro`, `.tsx`, `.jsx`, `.svelte`, application `.ts/.js`, `package.json`, `astro.config.*`, or deployment configs.
- Planned Astro, React, shadcn/ui, Tailwind, GSAP, Starlight, and Cloudflare technologies are **future implementation ideas**, not permission to use them now.
- Use the FigCraft desktop application/MCP and verified CLI for design tasks when authorized; such use is not website implementation.
- If asked to start coding prematurely, explain the separate authorization gate and continue only with permitted documentation/design work.

## 3. Repository Boundaries, Security, and Git

- **`../cubycloud` is strictly read-only:** inspect public docs, relevant code and tests to validate product claims; never create, edit, stage, commit, delete, or reconfigure anything in that repository.
- **`cubycloud-page/` is the only writable project workspace:** limit changes to approved Markdown, `.figcraft` design, review evidence, and static design assets/exports.
- Never access, print, transfer, or commit secrets, `.env*` values, tokens, private keys, credentials, or private customer information.
- Prefer synthetic demo content and sanitized visuals; do not export private data from the real product.
- Git inspection (`status`, `diff`, non-destructive history) is allowed. No `commit`, `push`, `rebase`, `reset --hard`, destructive cleanup, branch deletion, or force operations without explicit authorization.
- Preserve human edits and approved design artifacts. Never overwrite unknown local changes to enforce generic boilerplate.

## 4. Tiered Context Loading and Document Authority

1. At session/task start, read this file and consult `DECISIONS.md` for approved rules, open choices, superseded instructions, and milestone authorization.
2. Identify the active task and load the owning document(s) plus their immediate dependencies; avoid rereading all documents for each small change.
3. Check `DECISIONS.md` for explicitly approved overrides, then follow the relevant domain authority below.
4. For a substantive contradiction, register/propose an **Open** conflict and request the user's decision; do not silently rewrite an approved rule.
5. If a supporting file is missing or out of date, report the gap; never manufacture its contents or pretend a source was verified.

| Domain / task | Authoritative document(s) |
| --- | --- |
| Product, audience, positioning, claims, CTAs | `BRIEF.md` |
| Visual direction, palette, typography, composition, accessibility | `DESIGN.md` |
| Sitemap, chapters, section order, documentation IA | `PAGES.md` |
| Headlines, body copy, FAQ, metadata, labels | `CONTENT.md` |
| Scroll, transitions, choreography, reduced-motion behavior | `MOTION.md` |
| Clickable flows, interaction states, scenario acceptance | `PROTOTYPE.md` |
| FigCraft MCP/CLI discovery, file structure, save/export, recovery | `FIGCRAFT.md` |
| Decision status, approved overrides, conflicts, approval gates | `DECISIONS.md` |

- Example context bundles: **Hero** → `BRIEF`, `PAGES`, `CONTENT`, `DESIGN`; **animation** → `MOTION`, `DESIGN`, `PROTOTYPE`; **MCP** → `FIGCRAFT` plus task owner; **sign-off** → `DECISIONS`, `PROTOTYPE`, `FIGCRAFT`.
- **Reconciliation before final sign-off:** include the already-agreed Practical FAQ in `PAGES.md` and honor `MOTION.md`'s no-pinning/no-snap rule over older permissive `DESIGN.md` wording.

## 5. Bounded Milestone Autonomy

- Work only on the user's **currently authorized** milestone. Within that scope, autonomously plan tasks, use verified tools, fix minor defects, and perform self-review.
- **M1 Foundation:** Design tokens, reusable components, display-font exploration, desktop/mobile hero and initial review.
- **M2 Homepage:** Complete responsive hero, four chapters (Files, Sharing, Storage, Self-Hosting), supporting highlights, Open Source, FAQ, Get Started, footer.
- **M3 Documentation:** Responsive Starlight-style docs home, article, sidebar/search, callouts, code blocks and mobile navigation templates.
- **M4 Prototype & QA:** Clickable Files/Sharing/Storage demos, realistic UI states, docs and CTA flows, advanced-motion storyboards, PT-01–PT-12 review.
- At the end of each milestone: save and validate artifacts, assemble evidence, report defects/blockers, **request explicit user approval**, and **stop** before the next milestone.
- A milestone approval authorizes proceeding to the next **design** milestone only. Do not infer final design approval or permission to code.
- New strategic decisions, conflicting rules, or material scope changes require proposal and explicit user approval under `DECISIONS.md`.

## 6. FigCraft MCP and Design Construction

- Maintain **one canonical native master**: `design/cubycloud-page.figcraft`; organize it into named pages/frames, not multiple competing masters.
- **Verify before operating:** check app/CLI availability, current MCP registry, connection, supported schemas, document and node IDs. Historical endpoint names/port `7979` in `FIGCRAFT.md` are not a live connectivity guarantee.
- Prefer **desktop-connected MCP**; use headless CLI only after support and output validation are verified.
- Use native editable layers, text, vectors, reusable UI components, and semantic names; permit custom editable editorial compositions. Never substitute a flattened UI image for an editable design.
- Use shared tokens, layout constraints, component variants, interactions, and batch edits **only when currently supported**; inspect the result instead of assuming atomicity or correctness.
- Follow `DESIGN.md`: **Creative Editorial** marketing with controlled brand colors and permitted depth/gradients; **Montserrat** for body/UI/docs and a separately **unapproved marketing display font**.
- Do **not** revive the legacy 100% flat/no-shadow rule or force Montserrat onto all display headings.
- Desktop baseline **1440 px**, mobile **390 px**, plus narrow-mobile (down to 320 px) and intermediate checks. Mobile is a deliberate recomposition with touch alternatives.
- Preserve native fluid scrolling; no forced snapping, section pinning, hover-only essential actions, or scroll traps.
- Motion beyond verified FigCraft capability must be documented as editable storyboard states and explicit implementation-only behavior, not presented as a working prototype.

## 7. Product Truth and Content Guardrails

- Validate product claims against the actual read-only repository before showing them as current capabilities; source code and current docs outrank marketing guesses.
- Supported narrative, subject to verification: Go/Echo backend, SQLite WAL, local filesystem and optional S3-compatible storage, basic file management/preview, internal Viewer/Editor sharing, public/password-protected links, and self-hosted deployment.
- **Organization is one globally shared tree for authenticated users**, not granular group-based roles or independent team workspaces.
- Do not invent native mobile/desktop sync, AI functions, version history, real-time office collaboration, automatic replication, benchmarks, live integrations, or security certifications.
- Describe local/S3 switches and share links in demos as **simulations**, not working storage connections or backend actions.
- Verify license representation against current repo text; use **AGPL-3.0-or-later** where supported, not an unqualified promise about licensing or legal compliance.
- Verify installation-doc route and external links before final CTA approval; an illustrative placeholder must remain identified as such.

## 8. Scenario-Driven Quality Gates

- Use `PROTOTYPE.md` as the acceptance source; do not duplicate or silently waive its **PT-01–PT-12** tests.
- Review both desktop and mobile: typography, palette, contrast (WCAG 2.2 AA target), alignment, clipping, safe areas, touch targets, keyboard/focus, and reduced motion.
- Validate layer editability, hierarchy, variant states, responsive navigation, factual copy, link targets, and the three product demos.
- Record each applicable scenario with device, `PASS / FAIL / BLOCKED / N/A`, observable evidence, defect, and retest result.
- A screenshot proves appearance, not the click flow. A storyboard proves intended choreography, **not** an executed animation.
- Repair defects inside the authorized milestone, then retest. Report unsupported interactions and untestable behavior honestly; never fabricate a pass.
- Do not mark a milestone ready for approval while critical routes, product truth, accessibility, or essential content have unresolved blockers.

## 9. Controlled and Reversible Changes

1. Inspect existing file content, current design hierarchy, Git status, and unstaged changes before edits.
2. Define task scope; modify only directly related files and design frames. Never overwrite approved work without an authorized revision.
3. Create a verified backup/checkpoint before risky FigCraft/CLI operations or broad cross-file edits.
4. Make small, traceable changes; save native design, inspect render and affected nodes, validate diffs and exports.
5. On errors: stop unsafe writes, inspect state, restore only from verified checkpoints without discarding user edits, or escalate with `BLOCKED` evidence.
6. Retain milestone screenshots and review notes under `design/exports/` per `FIGCRAFT.md`; link decision changes rather than creating unofficial parallel standards.

## 10. Evidence-Based Reporting and Approval Gates

- **Task report (concise):** actions taken, files/frames changed, validation observed, issues, and next in-scope action.
- **Milestone handoff:** canonical `.figcraft` path/version, desktop/mobile exports, scenario results, screenshots/flow proof, defects and retests, limitations, decisions pending, explicit approval request.
- State **what was actually inspected or tested**. Do not claim live MCP checks, screenshots, backend verification, or approvals without evidence.
- **Gate 1: Milestone M1–M4 review:** user approves each milestone before progressing to the next design milestone.
- **Gate 2: Final design sign-off:** user explicitly approves the consolidated design and prototype evidence after M4.
- **Gate 3: Development authorization:** user gives a **separate explicit instruction to begin coding** after final design approval.
- Neither completed documentation, agent self-review, `PASS` entries, successful saves, nor final design sign-off **automatically authorizes implementation**.
- Finish reports with remaining blockers and the next permitted task; stop at approval gates instead of taking unauthorized follow-on actions.
