# CubyCloud Website Decision Register

Scope: approved, superseded, and unresolved website decisions. A selected target is not an implemented or verified feature.

## Lifecycle and authority

`Approved` means the owner selected a direction; `Superseded` retains the former rule and names its successor; `Open` requires a decision.
`—` means no approval date was recorded. Do not infer approval from code, timestamps, agent reports, or FigCraft files.
A new strategic change needs explicit owner approval and an updated record.
Current source and captured browser behavior establish implementation facts; [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) governs migration execution.

## Approved historical decisions

These records preserve design-stage choices, not claims that FigCraft milestones or Starlight passed review.

| ID | Selected direction | Status | Date | Boundary / owner |
| --- | --- | --- | --- | --- |
| BR-01 | Simple Self-Hosted File Drive for small teams and organizations | Approved | — | [BRIEF.md](BRIEF.md) |
| BR-02 | Local filesystem and optional S3-compatible storage | Approved | — | No implied replication or sync; [BRIEF.md](BRIEF.md) |
| BR-03 | Get Started should lead to verified installation instructions; GitHub secondary | Approved | — | Current GitHub README destination remains until a truthful guide is ready; [PAGES.md](PAGES.md) |
| BR-04 | English first; Indonesian localization was considered later | Approved | — | Current docs target is English only; [CONTENT.md](CONTENT.md) |
| BR-05 | Honest claims; Organization is one shared tree | Approved | — | No group RBAC claim; [BRIEF.md](BRIEF.md) |
| VIS-01 | Creative Editorial marketing with restrained earthy depth | Approved | — | Existing CSS/render is migration baseline; [DESIGN.md](DESIGN.md) |
| VIS-02 | Montserrat UI/body with separate marketing display treatment | Approved | — | Historical font choice was open; implemented Barlow Condensed must be preserved; [DESIGN.md](DESIGN.md) |
| VIS-03 | Branded, readable Starlight documentation | Approved | — | Target, not the present custom React docs; [DESIGN.md](DESIGN.md) |
| IA-01 | One marketing homepage and `/docs/` | Approved | — | No extra marketing pages; [PAGES.md](PAGES.md) |
| IA-02 | Four chapters: Files, Sharing, Storage, Self-Hosting | Approved | — | FAQ is supporting content; [PAGES.md](PAGES.md) |
| IA-03 | Chapter navigation and deliberate mobile composition | Approved | — | Preserve actual runtime rather than proposed navbar; [PAGES.md](PAGES.md) |
| COPY-01 | Anti-Complexity, interactive narrative, progressive technical detail | Approved | — | Implemented copy wins over earlier proposals; [CONTENT.md](CONTENT.md) |
| COPY-02 | Open-source transparency and practical FAQ before Get Started | Approved | — | [CONTENT.md](CONTENT.md) |
| MOT-01 | Native fluid scroll; no pinning, snap, or hijack | Approved | — | [MOTION.md](MOTION.md) |
| MOT-02 | Editorial/product motion with Full, Light, Reduced alternatives | Approved | — | Preserve actual GSAP/Three behavior; [MOTION.md](MOTION.md) |
| PRO-01 | Tiered Hybrid FigCraft Prototype | Approved | — | Historical design scope, not runtime evidence; [FIGCRAFT.md](FIGCRAFT.md) |
| PRO-02 | Files, Sharing, Local/S3 illustrative demos | Approved | — | Synthetic, no live operations; [PROTOTYPE.md](PROTOTYPE.md) |
| PRO-03 | Desktop/mobile documentation templates | Approved | — | Migration target must be accessible; [DESIGN.md](DESIGN.md) |
| PRO-04 | PT-01–PT-12 scenario review | Approved | — | Runtime migration requires new evidence; [PROTOTYPE.md](PROTOTYPE.md) |
| FC-01 | Single editable FigCraft master | Approved | — | Historical design workflow; [FIGCRAFT.md](FIGCRAFT.md) |
| FC-02 | Desktop MCP first; tested CLI fallback | Approved | — | Verify tools at point of use; [FIGCRAFT.md](FIGCRAFT.md) |
| FC-03 | Reusable components plus freeform editable scenes | Approved | — | Design artifact policy; [FIGCRAFT.md](FIGCRAFT.md) |
| FC-04 | M1–M4 milestone-based design reviews | Approved | — | Historical design-stage plan, not migration DAG; [FIGCRAFT.md](FIGCRAFT.md) |
| FC-05 | Native master, snapshots, desktop/mobile exports | Approved | — | Design evidence only; [FIGCRAFT.md](FIGCRAFT.md) |
| FC-06 | Capability-aware fallback and safe recovery | Approved | — | Storyboard is not executed motion; [FIGCRAFT.md](FIGCRAFT.md) |
| GOV-01 | Lifecycle register with stable IDs and rationale | Approved | — | This document |
| GOV-02 | Proposal before strategic overrides; explicit owner decision | Approved | — | This document |
| GOV-03 | Separate design and development approvals in historical FigCraft process | Approved | — | Historical gate; later migration permission follows explicit owner run under [AGENTS.md](AGENTS.md) |

## Approved migration and documentation direction

The current owner instruction approves this target and documentation consolidation. It authorizes documentation work now, not migration code in this task. No approval date is inferred from file history.

| ID | Decision | Status | Date | Owner |
| --- | --- | --- | --- | --- |
| MIG-01 | Preserve current homepage UI, copy, motion, demos, and access; use preserve-first Astro + React Islands | Approved | — | [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) |
| MIG-02 | Initially keep cohesive React landing island where cross-section dependencies need it | Approved | — | [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) |
| MIG-03 | Supervised Orca/OMP worktrees, scoped tasks, independent gates, no automatic merge or deployment | Approved | — | [MIGRATION_CONTRACT.md](MIGRATION_CONTRACT.md) |
| DOC-01 | Starlight at `/docs/`, Article First, initial Introduction/Installation/File Management | Approved | — | [PAGES.md](PAGES.md) |
| DOC-02 | Refined Editorial Tech, adaptive navbar, dual-audience sidebar, smart TOC, accessible mobile | Approved | — | [DESIGN.md](DESIGN.md), [PAGES.md](PAGES.md) |
| DOC-03 | English-only docs, Light/Dark/System persisted preference, native Starlight search/components | Approved | — | [CONTENT.md](CONTENT.md), [PAGES.md](PAGES.md) |
| DOC-04 | Prototype-first articles; do not fabricate installation commands or operational facts | Approved | — | [CONTENT.md](CONTENT.md) |

## Open decisions and evidence gaps

| ID | State | Issue / required action |
| --- | --- | --- |
| OPEN-01 | Open | Historical final brand approval of Barlow Condensed is unrecorded. Preserve its implemented appearance during migration; seek approval only before changing it. |
| OPEN-02 | Open | Final switch of marketing Get Started from product GitHub README to `/docs/getting-started/installation/`: verify article, published route, and owner-approved destination change. Target route itself is approved by DOC-01. |
| OPEN-03 | Open | Historical M1–M4 reviews and final FigCraft design sign-off are not recorded here. Do not claim they occurred; these design-stage gates do not negate later explicit website work. |
| OPEN-04 | Open | Pre-existing working-tree deletions of design masters need owner review. This documentation task must not infer asset duplication or discard unrelated local work. |

## Superseded rules

| ID | Former rule | Successor / reason | Date |
| --- | --- | --- | --- |
| OLD-VIS-01 | FigCraft flat-only/no-shadow prescription | VIS-01; current brand permits restrained depth | — |
| OLD-TYP-01 | Montserrat on every hero/display title | VIS-02; separate display treatment, with Barlow Condensed implemented | — |
| OLD-DOC-01 | Installation slug was only a proposal | DOC-01; target `/docs/getting-started/installation/` selected, publication not verified | — |
| OLD-GOV-01 | Design-only hard stop prevented any later website code until FigCraft sign-off | MIG-03 and [AGENTS.md](AGENTS.md); later explicit migration run controls development. Historical approvals remain unverified | — |

Older permissive pinned-section language yields to MOT-01. Earlier proposed homepage copy and navbar do not override rendered React behavior.
Neither the present custom React documentation prototype nor historical storyboards count as implemented Starlight or verified animation parity.

## Decision updates

Record a concrete source and impact, propose an `Open` entry, obtain explicit owner approval, then update affected domain documents and mark replaced records `Superseded`.
Retest affected behavior under [PROTOTYPE.md](PROTOTYPE.md). `Implemented` and `Verified` describe evidence, not decision statuses.
A migration handoff is reviewable; it is never automatic authorization to merge into `main` or deploy.
