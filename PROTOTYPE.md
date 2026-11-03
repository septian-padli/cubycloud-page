# PROTOTYPE.md — UX Regression and Acceptance Scenarios

## Scope

This register owns scenario identifiers, required results, severity, and evidence format.
`MIGRATION_CONTRACT.md` owns migration phases and gates; `PAGES.md` owns route/IA requirements; `MOTION.md` owns motion behavior.
Preserve PT-01–PT-12 identifiers and intent for traceability.
Current baseline is React/Vite; Astro, React Islands, and Starlight remain migration targets.

A build does not prove parity. A still image does not prove working interaction or motion. Compare against the latest owner-approved baseline and report pre-existing defects separately from regressions.

## PT scenarios: preserve identifiers and intent

| ID | Scenario | Required result |
| --- | --- | --- |
| PT-01 | Open homepage on desktop/mobile | Correct sections, content, layout, no clipping. |
| PT-02 | Navigate numbered chapters | Correct anchors, progress, active states, native scrolling. |
| PT-03 | Use Files demo | Browse, select, preview, close, reset. |
| PT-04 | Use Sharing demo | Internal/Public, Viewer/Editor, optional password, close/reset. |
| PT-05 | Use Storage demo | Local/S3 selection, explanation, back/reset. |
| PT-06 | Trigger relevant UI states | Empty, error, disabled, and success states behave correctly. |
| PT-07 | Use mobile navigation and demos | Touch support, safe areas, no overflow. |
| PT-08 | Use keyboard and focus navigation | Logical and visible focus; Escape closes relevant UI. |
| PT-09 | Use FAQ and navigate to documentation | FAQ interaction and working documentation routes. |
| PT-10 | Follow Get Started and GitHub links | Correct existing or approved destinations. |
| PT-11 | Verify motion and reduced-motion alternatives | Runtime motion, fallback, and reversibility; storyboard is supplemental only. |
| PT-12 | Audit design and content | Palette, typography, product truth, and language remain consistent. |

## Migration and documentation scenarios

| ID | Scenario | Required result |
| --- | --- | --- |
| MR-01 | Directly load `/` | Homepage renders. |
| MR-02 | Compare Hero visual baseline | No unapproved layout or typography regression. |
| MR-03 | Test Storage Core | WebGL scene and fallback work. |
| MR-04 | Scroll Hero forward/backward | Stable progress and reversible animation. |
| MR-05 | Test narrative token journey | Existing Hero→Files→Sharing→Storage transitions align; no assumed Self-Hosting leg. |
| MR-06 | Resize during animation | No stranded or mispositioned elements. |
| MR-07 | Reload while scrolled | Correct state after layout initialization. |
| MR-08 | Navigate away and back | No duplicate triggers or stale listeners. |
| MR-09 | Test reduced motion | Nonessential motion is reduced; content and controls remain available. |
| MR-10 | Compare mobile layout | No new clipping, overflow, or lost controls. |
| MR-11 | Test built website | Correct assets, routes, and runtime behavior. |
| MR-12 | Review architecture | Astro/Starlight integration avoids unnecessary framework duplication. |
| DOC-01 | Open `/docs/` | Introduction article appears directly. |
| DOC-02 | Open Installation URL | Correct article and metadata. |
| DOC-03 | Open File Management URL | Correct article and metadata. |
| DOC-04 | Navigate sidebar | Correct active article and category. |
| DOC-05 | Use On This Page | Correct heading anchors and scroll position. |
| DOC-06 | Search published content | Search works and has useful no-results state. |
| DOC-07 | Select search result | Correct article or heading destination. |
| DOC-08 | Switch Light/Dark/System | Correct appearance and persisted preference. |
| DOC-09 | Use mobile navigation | Drawer works and focus is managed. |
| DOC-10 | Use code blocks | Highlighting, overflow, and copy behavior work. |
| DOC-11 | Use links and pagination | No broken available-article routes or future dead links. |
| DOC-12 | Refresh direct article URL | Article loads without client-side routing failure. |

These DOC scenarios describe Starlight target acceptance, not current implementation status. Current `/docs` paths render the React `DocsApp` prototype via `src/main.tsx`.

Capture current baseline scenarios before migration. Run migrated scenarios on the integrated target; this register defines acceptance, not permission to accept a partial worker branch.

For migration comparisons, use the same source content, browser settings, reduced-motion preference, and device conditions. If an environment cannot reproduce GPU output deterministically, record that limitation and inspect behavior with runtime traces or video.

Report each status independently. A passing homepage build cannot stand in for DOC scenarios, and a passing documentation route cannot stand in for homepage motion or responsive checks.

## Reporting threshold

Do not call a scenario passed because its control is visible or its route is linked.
Exercise the result: open route directly, operate the control, observe destination/state, and retain evidence.
If the expected result cannot be observed, use BLOCKED or NOT TESTED and explain why.

For defect reports, name affected scenario IDs, observed baseline and migrated results, severity, reproduction steps, and evidence location. Retest only affected scenarios plus dependent flows; link original and retest evidence.

Retain the original PT identifier when an observed behavior differs from historical design intent. Record the mismatch as a baseline defect rather than quietly changing the expected scenario.

## Visual regression

Capture matched screenshots for Hero, Files, Sharing, Storage, Highlights, Self-Hosting, Open Source, FAQ, Get Started, Footer,
key mobile layouts, and meaningful open/selected states.
Compare font family/weight, wrapping, alignment, spacing, borders, shadows, colors, 3D placement, and responsive composition.
Do not mask the entire Hero or 3D scene. Set image-difference tolerance for GPU/font noise without hiding meaningful defects.

Compare both entry and meaningful state variants: open navigation, expanded FAQ, selected demo state, preview/dialog,
and documented error/empty state where present.
Keep screenshot crop, zoom, font readiness, viewport, and scroll position consistent.
Treat visual thresholds as signals for review, not automatic proof of parity.

## Functional, accessibility, and stability evidence

Exercise demo browse/back/select/preview/close/reset flows; unavailable preview and empty folder; internal/public sharing, Viewer/Editor,
optional password, validation, simulated result; Local/S3 selection and reset; FAQ, chapter links, CTA, and mobile menu.
Check semantic landmarks, heading order, accessible names, keyboard operation, visible focus, dialog focus, Escape, contrast,
reduced motion, touch, and no keyboard traps.
Check console errors, exceptions, missing assets, repeated animation initialization, listener leaks, WebGL errors, and hydration/layout shifts.

Use viewports 1440×900, 768×1024, 390×844, and 320px width.
Match browser, zoom, font readiness, and scroll position where comparing. Test supported browsers where practical.
Test direct URL entry, refresh, internal navigation, and back/forward.
Preserve simulation disclosures; no scenario authorizes live backend actions.

At 320px, inspect article tables and code horizontally without causing page-level overflow. At 390px, exercise drawers and search by touch and keyboard, including focus return.

For documentation, verify search against article body content rather than only titles or heading keywords. Test theme persistence after reload and System after changing the OS preference.

For the homepage, compare scroll-driven token positions at matched progress points, then reverse direction. Inspect the WebGL fallback with a controlled unsupported-context condition instead of assuming it appears.

## Severity

- **Blocker:** homepage or critical route fails; Storage Core or major motion missing; primary demo broken; unapproved significant redesign; fabricated product capability/instructions; critical accessibility regression. Do not approve with unresolved blockers.
- **Major:** significant visual difference, responsive failure, incorrect TOC/search navigation, motion jump/duplicate trigger, important interaction regression. Resolve or obtain explicit owner acceptance.
- **Minor:** small cosmetic inconsistency, noncritical spacing difference, or minor feedback issue.

Record severity per defect; never downgrade impact merely to pass a gate. Record pre-existing issues separately and do not attribute them to migration without evidence.

## Evidence record

For each scenario, record ID, browser/version, exact viewport, baseline, migrated observation, status (`PASS`, `FAIL`, `BLOCKED`, `NOT TESTED`),
evidence link (screenshot, trace, video, log, or test output), defect severity, and retest result.
A PASS requires concrete observed evidence for that scenario. Keep generated artifacts outside production bundles and link them in handoff.
Motion needs controlled forward and reverse runtime interaction; screenshots alone are insufficient.
Do not invent measurements or claim unobserved results.


If a scenario cannot run because an environment or device is unavailable, record `BLOCKED` with the missing prerequisite. `NOT TESTED` means no attempt was made; neither state counts as acceptance.
