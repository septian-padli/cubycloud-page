# DECISIONS.md — CubyCloud Website Decision Lifecycle Register

> **Scope:** `cubycloud-page` marketing site, Starlight documentation, FigCraft design, and prototype planning.
> **Status:** Strategic directions and governance rules approved; artwork, tests, milestone approvals, and development authorization remain separate.
> **Boundary:** `../cubycloud` is read-only product evidence. Do not change application code, scaffold the website, or deploy anything from this register.

## 1. Decision Governance

- **Chosen model:** Decision Lifecycle Register; record **key strategic decisions and meaningful overrides**, not a duplicate of every source document.
- **Statuses:** `Approved` (explicitly chosen), `Open` (proposal or unresolved choice), `Superseded` (previously valid rule replaced by an approved decision).
- **Required record fields:** stable ID, concise decision/title, status, decision date, brief rationale, and source-document reference. `—` in the date column means **date not recorded**, not today's date.
- **Authority:** Agents can identify issues, propose alternatives, and register `Open` entries; **only explicit user approval** can change a proposal to `Approved` or mark an old decision `Superseded`.
- **No inferred approval:** File timestamps, polished designs, passing tool calls, agent consensus, and missing objections are not user sign-off. Cite an actual user instruction/decision reference when available; never fabricate evidence.
- **Scope boundary:** Design decisions approve design direction only. **Final design sign-off and permission to start development are distinct approvals.**

## 2. Source-of-Truth Domains

| Domain | Primary authority | Responsibility |
| --- | --- | --- |
| Product facts and availability | `../cubycloud/README.md`, implementation, tests, release/docs | Verify shipped behavior; a PRD is not delivery proof |
| Positioning and claims | `BRIEF.md` | Audience, value, CTAs, truth boundaries |
| Visual identity and accessibility | Website `DESIGN.md` | Palette, typography, layout, design rules; **not** the product app's `DESIGN.md` |
| Pages and navigation | `PAGES.md` | Site map, four chapters, docs architecture and destinations |
| Copy and SEO | `CONTENT.md` | Draft wording, FAQ, metadata and microcopy |
| Animation behavior | `MOTION.md` | Scroll rules, motion tiers, choreography and fallbacks |
| Prototype acceptance | `PROTOTYPE.md` | Interactive flows, state matrix, test IDs, evidence and QA |
| FigCraft operations | `FIGCRAFT.md` | MCP preflight, master file, design workflow, exports and recovery |
| Approval status and overrides | **This register** | Effective decisions and explicit lifecycle; does not replace domain specifications |

- **Conflict precedence:** Confirm explicit user-approved override → follow the relevant domain authority → if still substantively contradictory, log an `Open` conflict and request a decision before changing the affected rule.
- A newer edit date alone never establishes precedence. Continue only unrelated, non-blocked design tasks while awaiting resolution.

## 3. Approved Strategic Baseline

The rows below summarize **explicitly selected planning directions**; their `Approved` status does **not** mean an implemented product, tested prototype, published copy, or approved final design. Historical selection dates were not preserved here.

| ID | Decision / effective rule | Status | Date | Why / boundary | Source |
| --- | --- | --- | --- | --- | --- |
| BR-01 | **Simple Self-Hosted File Drive** for small teams and organizations | Approved | — | Lead with approachable file management, not infrastructure jargon | `BRIEF.md` |
| BR-02 | **Local filesystem + optional S3-compatible storage** as differentiator | Approved | — | No implied replication, migration, or sync | `BRIEF.md` |
| BR-03 | **Get Started → verified installation docs**; GitHub secondary | Approved | — | Installation is the conversion goal; no fictitious live demo | `BRIEF.md` |
| BR-04 | English first; future Indonesian localization | Approved | — | Do not show an unusable language toggle | `BRIEF.md` |
| BR-05 | Honest product claims; Organization is **one shared tree** | Approved | — | No fabricated group RBAC, benchmarks, AI, sync or versions | `BRIEF.md` |
| VIS-01 | **Creative Editorial**, immersive compositions and strict earthy brand palette | Approved | — | Distinctive marketing; palette and accessibility remain controlled | `DESIGN.md` |
| VIS-02 | Montserrat for UI/body/docs; separate marketing display font **to be selected** | Approved | — | Font pairing approved, specific display family not yet chosen | `DESIGN.md` |
| VIS-03 | Branded, readable Starlight experience | Approved | — | Preserve conventional search/sidebar/code accessibility | `DESIGN.md` |
| IA-01 | **Single marketing homepage + `/docs/`**; no extra marketing pages | Approved | — | Concentrate the experience and its documentation | `PAGES.md` |
| IA-02 | Four chapters **Files / Sharing / Storage / Self-Hosting** | Approved | — | FAQ, highlights, open source and CTA are supporting regions | `PAGES.md`, `CONTENT.md` |
| IA-03 | Immersive chapter navigation; mobile-native re-composition | Approved | — | Normal scroll, direct links, keyboard and touch remain usable | `PAGES.md` |
| COPY-01 | Anti-Complexity hero; interactive product narrative; progressive technical detail | Approved | — | Bold but verifiable; **specific launch copy remains proposed** | `CONTENT.md` |
| COPY-02 | Open-source transparency, practical FAQ, self-hosted file-drive SEO | Approved | — | FAQ is before Get Started, not chapter 05 | `CONTENT.md` |
| MOT-01 | Fluid scroll storytelling with **no pinning, forced snapping or scroll hijack** | Approved | — | Native scrolling and accessible navigation take priority | `MOTION.md` |
| MOT-02 | Product + editorial motion, hybrid interactivity, shared-element transitions | Approved | — | Adaptive rhythm and Full/Light/Reduced alternatives | `MOTION.md` |
| PRO-01 | **Tiered Hybrid Prototype**: high-fidelity + critical clickable flows + storyboard | Approved | — | Do not portray storyboard as an executed interaction | `PROTOTYPE.md` |
| PRO-02 | Three demos: Files, Sharing, Local/S3; realistic relevant states | Approved | — | Illustrative, not live writes, sharing or S3 connections | `PROTOTYPE.md` |
| PRO-03 | Core docs templates; interactive desktop **and** mobile | Approved | — | Preserve touch behavior and readable documentation | `PROTOTYPE.md` |
| PRO-04 | **Scenario-Based Acceptance Gate** using PT-01–PT-12 | Approved | — | Recorded evidence and explicit user sign-off required | `PROTOTYPE.md` |
| FC-01 | **Single Master Design** `design/cubycloud-page.figcraft` | Approved | — | Editable native frames, not flattened screenshots | `FIGCRAFT.md` |
| FC-02 | **Verified Hybrid Workflow**: desktop MCP first, tested CLI fallback | Approved | — | Discover live tools; historical endpoints are not guaranteed | `FIGCRAFT.md` |
| FC-03 | **Hybrid Component Architecture** | Approved | — | Reusable UI foundations + freeform editable editorial scenes | `FIGCRAFT.md` |
| FC-04 | **Milestone-Based Design Workflow** M1–M4 | Approved | — | Review each milestone before proceeding | `FIGCRAFT.md` |
| FC-05 | **Structured Design Evidence** | Approved | — | Master, snapshots, desktop/mobile exports, review references | `FIGCRAFT.md` |
| FC-06 | **Capability-Aware Fallback & Safe Recovery** | Approved | — | Checkpoint, inspect, rollback or honest storyboard/blocker | `FIGCRAFT.md` |
| GOV-01 | Lifecycle register + key decisions/overrides + standard records | Approved | — | Compact history with ID, date, rationale and source | `DECISIONS.md` |
| GOV-02 | Proposal first, explicit user approval; domain authority and escalation | Approved | — | No silent self-approval or conflict guessing | `DECISIONS.md` |
| GOV-03 | **Separate Design & Development Gates** | Approved | — | Final visual approval never automatically authorizes coding | `DECISIONS.md`, `PROTOTYPE.md` |

## 4. Open Decisions and Unverified Work

| ID | Pending matter | Status | Date | Reason / next action | Source |
| --- | --- | --- | --- | --- | --- |
| OPEN-01 | Select the specific **marketing display font** | Open | — | Explore candidate pairings in M1 FigCraft; request user approval | `DESIGN.md`, `FIGCRAFT.md` |
| OPEN-02 | Lock the actual canonical **installation-doc slug/destination** | Open | — | `/docs/getting-started/installation/` is only proposed; verify actual docs before approval | `PAGES.md`, `PROTOTYPE.md` |

**Completed reconciliation:** The agreed **Practical FAQ** has been reconciled into `PAGES.md` (region 04c `#faq`) outside the four numbered chapters. `DESIGN.md`'s earlier pinned-section wording has been aligned with the approved **no-pinning / fluid scroll** motion rule (`MOT-01`). All public claims, license links, release-specific screenshots, installation paths and current FigCraft MCP capabilities are verified at the point of use.

## 5. Superseded Rules and Overrides

| ID | Former rule / status | Effective replacement | Date | Rationale and source |
| --- | --- | --- | --- | --- |
| OLD-VIS-01 | **Superseded:** legacy FigCraft instruction forbade all marketing shadows/depth | `VIS-01` and current website `DESIGN.md` allow restrained palette-based depth | — | Legacy `FIGCRAFT.md` flat-only rule applied too broadly |
| OLD-TYP-01 | **Superseded:** legacy FigCraft prescribed Montserrat for every hero/display title | `VIS-02`: Montserrat + an as-yet-unselected display font | — | Current website `DESIGN.md` separates display typography |

- Superseded records remain readable; do not delete their history. A new override needs explicit approval, a successor ID, and updates to the owning source document.
- **Specific approved motion behavior prevails:** `MOT-01` prohibits pinning even where older `DESIGN.md` language listed it as a possibility. Do not invent a new motion decision to resolve that documented specificity.

## 6. Change Control Procedure

1. **Detect:** Identify a changed requirement, mismatch, outdated fact, unavailable capability, or user-requested revision; cite its source.
2. **Propose:** Add an `Open` record containing ID, proposed rule, date if known, rationale, affected domain, alternatives/impact when useful; preserve existing `Approved` rules.
3. **Decide:** Ask the user for explicit approval or rejection. Record the actual decision reference when available; do not manufacture a timestamp, quote or artifact.
4. **Apply:** Update the entry to `Approved`; mark replaced entries `Superseded` only when the replacement is expressly approved. Align affected source documents.
5. **Revalidate:** Re-render impacted desktop/mobile scenes, revisit relevant `PROTOTYPE.md` PT tests, and attach evidence to the FigCraft review index.
6. **Escalate:** If approval or tool capability is missing, mark the relevant work `Open`/`BLOCKED`; never silently proceed with a guessed decision.

## 7. Milestone, Design and Development Gates

| Gate | Required for exit | Current recorded approval |
| --- | --- | --- |
| **M1 · Foundation** | Tokens, components, hero, display-font choice; visual evidence and user review | **Not recorded** |
| **M2 · Homepage** | Desktop/mobile chapters, supporting FAQ, CTAs, product-truth review | **Not recorded** |
| **M3 · Starlight Docs** | Docs templates, readable responsive navigation, verified link intents | **Not recorded** |
| **M4 · Prototype & QA** | PT-01–PT-12 evidence, defect retests, motion storyboards and limitations | **Not recorded** |
| **Final Design Sign-Off** | User explicitly approves the consolidated FigCraft master and acceptance evidence | **Not granted in this register** |
| **Development Authorization** | **Separate explicit user instruction to begin coding** after design approval | **Not granted** |

- `Not recorded` means no approval evidence is available **in this register**, not proof that no design work has occurred.
- Milestone acceptance allows progression **to the next design milestone only**. It is never a development permission.
- A completed prototype, MCP success, clean screenshot, or agent-written `PASS` is insufficient for final user sign-off.
- **Hard stop:** No website scaffolding, application modifications, Astro/React/Tailwind/GSAP/Starlight code, hosting setup, or deployment until the separate **Development Authorization** gate is explicitly granted.
