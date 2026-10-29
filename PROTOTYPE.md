# PROTOTYPE.md — CubyCloud Website Prototype & Acceptance Contract

> **Status:** Approved prototype scope; test results and design sign-off are pending.
> **Phase:** FigCraft design and prototyping only. No website or application implementation is authorized.
> **Read with:** `BRIEF.md` (product truth), `PAGES.md` (routes/sections), `CONTENT.md` (copy), `DESIGN.md` (visual system), `MOTION.md` (motion), `FIGCRAFT.md` (verified tool workflow).

## 1. Approved Decisions

| Dimension | Final decision |
| --- | --- |
| Fidelity | **Tiered Hybrid Prototype** |
| Product demonstrations | **Three Core Product Demos**: Files, Sharing, Storage |
| States | **Realistic Interaction States**, scoped to meaningful behavior |
| Documentation | **Core Documentation Templates** |
| Responsive coverage | **Desktop + Mobile Interactive** |
| Release gate | **Scenario-Based Acceptance Gate**, with explicit user sign-off |

## 2. Fidelity Levels and Deliverables

| Tier | Required evidence | What it proves |
| --- | --- | --- |
| **T1: Visual** | Editable high-fidelity desktop/mobile screens, named components, variants, and exported frames | Visual composition, copy, responsive design |
| **T2: Interactive** | Wired FigCraft-supported navigation, menus, tabs, dialogs, demo steps, feedback, and reset | Click/tap state transitions and user flows |
| **T3: Storyboard** | Numbered start/active/transition/end frames, trigger and fallback annotations | Intended motion, **not** working GSAP or continuous physics |

- Include the full homepage, the four numbered chapter anchors, supporting highlights, Open Source, **Practical FAQ**, final CTA, and footer.
- Maintain one reusable component library for CTAs, nav, chapter indicator, file card, dialogs, form controls, tabs, accordions, docs sidebar/search, and code blocks.
- Frames must remain native and editable; screenshots of the real CubyCloud app may be embedded as factual references, not redrawn as fictitious capabilities.
- Use synthetic sample filenames and storage data. No private files, passwords, API keys, live S3 credentials, or production backend calls.
- Every nonfunctional control is explicitly marked **storyboard / illustrative / not implemented**, or given an honest disabled state; never disguise an inert control as tested.
- Organize deliverables by `Design System / Desktop Home / Mobile Home / Desktop Docs / Mobile Docs / Prototype Flows / Motion Storyboards / Review`.

## 3. Screens, Breakpoints, and Navigation

| Group | Required screens / variants |
| --- | --- |
| **Desktop marketing (1440 px)** | Complete homepage, hero, chapters 01–04, sub-sections/FAQ, selected chapter/progress, menu/overlays, final CTA |
| **Mobile marketing (390 px)** | Re-composed homepage, compact indicator, tap-to-jump menu, three touch demos, FAQ, docs/CTA paths |
| **Docs desktop** | `/docs/` home, standard article with long content, install/code article, sidebar, search, table of contents |
| **Docs mobile** | Docs home/article, menu open/closed, search states, readable callouts and scrollable code blocks |
| **Cross-cutting** | Light/dark where applicable, keyboard focus, reduced/static scenes, empty/error/feedback examples |

- Validate responsive constraints at intermediate/tablet widths and **320 px** narrow mobile; only 1440/390 px are mandatory primary design frames.
- Keep the four real chapters `#files`, `#sharing`, `#storage`, `#self-hosting`; FAQ (`#faq`) and `#get-started` are supporting destinations, not chapter 05.
- Chapter navigation exposes active chapter, progress, direct jump, and a stable way to skip to Docs/Get Started.
- Navigation must remain possible by ordinary scroll, tap, keyboard, and direct anchors; **no forced snapping, pinning, scroll trap, or hover-only controls**.
- Test `Get Started` toward the **verified** installation article; `/docs/getting-started/installation/` is a proposed route, not assumed to be published.
- `View on GitHub` targets `https://github.com/septian-padli/cubycloud`; don't replace it with a fake community page.

## 4. Interactive Product Demo Contracts

### Demo A — File Management (`01 Files`)

- **Path:** Explorer default → open a folder → select a file → preview or supported action → feedback → reset.
- **States:** Folder/file selected, preview open/closed, no selection, empty folder, relevant unavailable/error state, reset.
- **Acceptance:** Breadcrumb/context updates, selection is visible, preview and close return predictably, reset restores initial dataset.
- **Truth:** Demo mirrors supported My Storage actions; a marketing animation is not evidence of real upload, save, or background sync.

### Demo B — Sharing (`02 Sharing`)

- **Path:** Selected file → choose `Internal` OR `Public link` → adjust supported options → simulated result → reset.
- **States:** Viewer/Editor selection; public-link creation and optional password; disabled/validation state; success/feedback.
- **Acceptance:** Branch choice updates only relevant controls; modal can close, keyboard focus is recoverable, reset removes fake link state.
- **Truth:** Internal Viewer/Editor and optional password-protected public links are supported; **Organization is one shared tree for authenticated users**, not team/group RBAC.
- **Do not:** Generate a working public URL or imply the visitor's files were shared.

### Demo C — Local + S3 Storage (`03 Storage`)

- **Path:** Storage overview → select `Local` or `S3-compatible` → inspect configuration explanation → back/reset.
- **States:** Both selections, relevant explanatory panel, optional illustrative field validation, error/unavailable explanation.
- **Acceptance:** The two options are distinguishable and reversible; the diagram accurately distinguishes local disk from object storage.
- **Truth:** Present a conceptual configuration, **not** a live connection test, migration, replication, sync, or storage-write success.

## 5. Realistic State Matrix

| Component / scene | Must show and link where relevant |
| --- | --- |
| Navigation/CTA | Default, hover (fine pointer), focus-visible, active, disabled only when justified, destination |
| Chapter indicator | Current, previous/next, progress, expanded/collapsed menu, anchor selection |
| File UI | Default, hover/focus, selected, folder open, preview open/closed, empty, recoverable error |
| Sharing dialog | Closed/open, internal/public branch, selected permission, validation, illustrative success, dismiss/reset |
| Storage selector | Local/S3 selected, explanatory details, unavailable/error, back/reset |
| FAQ | Collapsed/expanded, keyboard focus, accessible answer content |
| Docs | Sidebar/search closed/open, active article, keyboard focus, code-copy feedback, code overflow |

- Test only **applicable** states, not every Cartesian combination; document omitted states as `N/A` with a reason.
- Error, loading, or success may be illustrated through static states if native FigCraft behavior is unavailable; label these honestly.
- All demos include a clear `Reset demo` and a path to continue without completing the demonstration.

## 6. Starlight Documentation Prototype

- Build reusable **documentation home** and **article** templates, plus representative code-heavy installation and guide pages; **not** every documentation article.
- Include header, sidebar hierarchy, search affordance, table of contents, callouts, link states, code blocks/copy, pagination where relevant, and mobile menu.
- Wire Docs home ↔ representative article, search/menu presentation, and navigation controls wherever FigCraft supports actual interaction.
- If true search or code-copy is unsupported, use named storyboard states and document the untested behavior; don't claim a working search index.
- Keep documentation conventional and readable. No immersive parallax, cursor physics, or chapter morphing inside articles.
- Follow `PAGES.md` documentation categories without claiming each planned page or route is already published.

## 7. Motion Storyboards and Fallbacks

- Use **normal fluid vertical scrolling**; product UI choreography combines with restrained layered depth and kinetic editorial type.
- Define shared file token transitions: **Files → Sharing → conceptual Storage diagram**; preserve recognizable geometry while clearly labeling metaphor vs real UI.
- Each complex motion has `Start → Trigger/Active → Transition → End`, source/target frame IDs, expected outcome, timing/easing or scroll relationship, and interrupt/reverse behavior.
- Respect `MOTION.md` starting durations: micro 120–220 ms; UI 200–400 ms; morph 500–900 ms; scroll-linked motion follows progress rather than a fixed timer.
- Pointer-reactive treatments are optional fine-pointer decoration; keyboard/touch equivalents are mandatory for meaningful actions.
- Supply **Full / Light / Reduced** variants: lightweight touch-native movement on mobile; no essential information depends on animation, parallax, hover, or a shared-element journey.
- If FigCraft cannot run continuous scroll scrubbing, real morphs, or pointer physics, create **named keyframes and annotations** rather than a counterfeit executable prototype.

## 8. Scenario-Based Acceptance Checklist

| ID | Scenario / action | Expected evidence and pass condition |
| --- | --- | --- |
| **PT-01** | Open homepage at desktop/mobile | All sections readable, correct order/copy, true product visuals, no clipping/overflow |
| **PT-02** | Jump to each numbered chapter and back | Correct anchors, indicator/progress, no trapped scroll, Docs and CTA reachable |
| **PT-03** | Open Files demo; browse, select, preview, reset | Correct states/labels; reset returns default on mouse and touch |
| **PT-04** | Switch Sharing internal/public options; close/reset | Viewer/Editor and optional password appear in correct branches; no fictitious RBAC |
| **PT-05** | Switch Local/S3 options; back/reset | Explanations update; no implied connection, transfer, or replication |
| **PT-06** | Trigger empty, error, disabled, success states | Relevant feedback distinguishable, recoverable, and labeled simulated as applicable |
| **PT-07** | Use chapter menu and demo controls on mobile | Tap works without hover, controls fit safe areas, no horizontal overflow at 320 px |
| **PT-08** | Use keyboard/focus navigation | Visible focus, logical traversal, close/escape where supported; no keyboard trap |
| **PT-09** | Open FAQ and navigate to docs | Answers available without motion; Docs home/article/menu/search templates reviewable |
| **PT-10** | Follow Get Started and GitHub paths | Correct actual destination or explicit not-published note; never dead-end silently |
| **PT-11** | Review motion storyboard and static fallback | Every intended advanced effect has frames, trigger, mobile/reduced equivalent, truthful status |
| **PT-12** | Audit visual system and copy | Brand palette, typography, product proof, language, and Organization rights match source documents |

- Each test gets a **Desktop** and **Mobile** result where relevant: `PASS / FAIL / BLOCKED / N/A`, with notes and a proof-frame or prototype link.
- **PASS** requires directly observable working FigCraft interaction or inspected visual evidence. `Storyboard approved` does **not** mean animation tested.
- Keep a separate **not-testable-in-FigCraft** list for behaviors reserved for implementation QA; do not silently waive accessibility or functionality requirements.
- Track defects by impact: **Blocker** = broken critical route/flow, false capability, missing essential content, or inaccessible key action; **Major** = substantive state/responsive issue; **Minor** = polish.

## 9. Review Evidence and Explicit Sign-Off Gate

- Store editable design location, version/date, desktop/mobile exports, scene/frame IDs, demo flow links, and storyboard links in the review handoff.
- Maintain a compact acceptance register: `Test ID | Device | Result | Evidence | Issue/Owner | Retest`; link decisions/changes in `DECISIONS.md`.
- Validate `DESIGN.md`, `BRIEF.md`, `PAGES.md`, `CONTENT.md`, `MOTION.md` consistency; **sync Practical FAQ into `PAGES.md` before final sign-off**.
- Before approval, resolve all blockers, retest corrected flows, and explicitly identify untestable FigCraft interactions and future implementation checks.
- Approval requires the user's **explicit** sign-off after reviewing evidence. Agent self-review, exports, or a successful MCP call **do not** count as approval.
- **Hard stop:** No Astro, React, Tailwind, GSAP, Starlight, backend, hosting setup, deployment, or code implementation until the user authorizes development separately.
