# FIGCRAFT.md — CubyCloud MCP Integration & Operational Guide

> **Revision of the existing FigCraft operational guide**, not a new design specification.
> **Scope:** `cubycloud-page` design/prototype work only; the sibling `../cubycloud` application is read-only.
> **Authority:** `DESIGN.md` (visuals), `BRIEF.md` (truth/positioning), `PAGES.md` (structure), `CONTENT.md` (copy), `MOTION.md` (motion), `PROTOTYPE.md` (acceptance), `DECISIONS.md` (approvals).
> **Hard stop:** No Astro/React/Tailwind/GSAP/Starlight scaffolding, implementation, deployment, or application changes without separate explicit authorization.

## 1. Approved Operating Decisions

1. **Single Master Design:** One editable native `.figcraft` file, internally organized by pages and named frames.
2. **Verified Hybrid Workflow:** Prefer connected desktop MCP; use tested headless CLI as fallback, not by assumption.
3. **Hybrid Component Architecture:** Reusable UI foundations plus editable custom editorial scenes.
4. **Milestone-Based Design Workflow:** Review and revise each milestone before advancing.
5. **Structured Design Evidence:** Native master, milestone snapshots, exports, review log, and test references.
6. **Capability-Aware Fallback & Safe Recovery:** Inspect, checkpoint, validate changes, then restore or storyboard unsupported behavior.

## 2. MCP Connection and Session Discovery

- **Previously documented host setup:** `~/.omp/agent/mcp.json`, server `figcraft`, command `/Users/septianpadli/.local/bin/figcraft-cli`, args `["mcp", "--attach", "7979"]`.
- **Previously documented desktop launch:** `figcraft --control 7979`; agent should confirm actual executable/flags with local `--help`, not assume the invocation is unchanged.
- **Previously documented CLI fallback:** `figcraft-cli run script.json --in design/cubycloud-page.figcraft --out design/cubycloud-page.figcraft`.
- Port `7979` and `xd://mcp__figcraft_*` endpoints were **historical session observations**; the original guide reported a refused connection. **Current connectivity is unknown until rechecked.**
- **Preflight each session:** locate binary → inspect CLI help/version → check app/control socket → discover registered MCP tools and schemas → inspect active document → verify a safe read operation.
- Do not treat a command listed below as available until exposed by the *current* MCP registry and validated with its actual schema.
- Never silently create a fresh document because attach/open fails; diagnose the connection and preserve the existing master.

## 3. Historical MCP Command Reference (Verify Before Use)

The endpoint names and engine commands below come from the uploaded guide, **not a live verification in this revision**. Some clients expose an `xd://` prefix.

| MCP endpoint suffix (`mcp__figcraft_*`) | Engine command | Original payload / purpose |
| --- | --- | --- |
| `inspect_document` | `document.inspect` | `{allPages?, depth?}`; inspect pages/tree |
| `get_node` | `node.get` | `{id, depth?}`; inspect a layer |
| `inspect_ui` | `ui.inspect` | `{}`; inspect viewport/UI |
| `select` | `select.set` | `{ids:number[]}`; select nodes |
| `create_node` | `node.create` | `{type,name?,parent?,x?,y?,width?,height?,text?,path?,props?}` |
| `set_properties` | `node.set` | `{ids:number[],props:{fills?,strokes?,layout?,cornerRadius?,sizingH?,sizingV?,interactions?}}` |
| `type_text` | `text.type` | `{id?,text}`; edit text |
| `batch` | `command.batch` | `{label?,commands:[{command,params}]}`; grouped mutations |
| `screenshot` | `canvas.screenshot` | `{ids?,page?}`; visual render |
| `export` | `export` | `{ids?,format?,scale?,path?}`; PNG/SVG/etc. |
| `save_file` | `file.save` | `{path?}`; save native design |
| `open_file` | `file.open` | `{path}`; open native design |

- Recorded `node.create` types: `frame`, `text`, `vector`, `rectangle`, `ellipse`, `component`; verify accepted types, constraints, and nesting.
- The original guide listed `onClick/onHover/onDrag`, `navigate/overlay/back`, `instant/dissolve/smartAnimate`, duration and easing. **Reinspect supported interaction fields before wiring prototypes.**
- If `command.batch` is supported, prefer small labeled groups; its documented single-undo behavior is not a substitute for a file checkpoint.

## 4. Single Master Document and Naming

- **Canonical design:** `design/cubycloud-page.figcraft` (relative to `cubycloud-page/`). Create only after design work is authorized; retain native editability.
- **Logical pages:** `01 / Tokens & Components`, `02 / Home Desktop`, `03 / Home Mobile`, `04 / Docs Desktop`, `05 / Docs Mobile`, `06 / Prototype Flows`, `07 / Motion Storyboards`, `08 / Review`.
- **Naming:** `Desktop / Home / Hero`; `Mobile / Home / Files`; `Docs / Article / Installation`; `Component / CTA / Primary`; `Demo / Sharing / Success`; `Motion / Files-to-Sharing / Start`.
- **Variants:** `State=Default|Hover|Focus|Open|Disabled|Error`, `Device=Desktop|Mobile`, `Theme=Light|Dark` where relevant and supported.
- Name functional sublayers semantically (`Heading`, `FileCard`, `ActionRow`, `DialogBody`), never anonymous `Frame 142`/`Rectangle 12`.
- Keep approved states distinguishable from drafts; never overwrite approved frames as a side effect of unrelated batch edits.
- **Rule:** Real app screenshots are factual reference assets, not flattened substitutes for editable marketing sections; use synthetic demo data only.

## 5. Component Architecture and Website Design Tokens

- **Reusable:** button/CTA, nav and chapter indicator, tabs, cards, file tiles, dialog, form, FAQ accordion, docs header/sidebar/search, callout, code block.
- **Freeform:** hero compositions, spatial file-token journey, layered editorial scenes, and expressive chapter imagery; remain native editable layers.
- Prefer shared styles, tokens, autolayout/constraints, and instances **when current FigCraft capabilities allow**; otherwise document manually linked equivalents.
- **Palette (light):** cream `#F0EEE3`; white `#FFFFFF`; olive `#606C38`; forest `#283618`; sand `#DDA15E`; terracotta `#BC6C25`.
- **Palette (dark):** background `#0F130E`; surface `#182017`; olive `#99AB5E`; forest accent `#ADCB8A`; sand `#E1AB70`; terracotta `#D78032`.
- **Text:** light main/muted `#283618`/`#5A6B46`; dark main/muted `#F0EEE3`/`#9CA88F`; functional danger `#EC003F`/`#FF3366` only.
- Colors, gradients, overlays, and restrained shadows **must use `DESIGN.md` rules**; previous “100% flat/no shadows” requirement applied to the product dashboard, not this website.
- **Typography:** Montserrat for body, navigation, UI, and docs; marketing display font **not yet selected**, to be explored and approved in FigCraft. Never hard-code Montserrat as the only hero font.
- **Baseline frames:** desktop 1440 px, mobile 390 px; inspect intermediate/tablet and down to 320 px. Mobile is a separate composition, not merely resized desktop.
- Use 8 px spacing with 4 px subdivisions; preserve readable line length, visible keyboard focus, accessible contrast, and practical touch targets.
- Docs retain readable Starlight-style navigation, table of contents, search, callouts and code; do not import marketing parallax into reading areas.

## 6. Milestones and Review Workflow

| Milestone | Design work | Review evidence / exit requirement |
| --- | --- | --- |
| **M1 Foundation** | Tokens, components, display-font exploration, desktop/mobile hero | Rendered variants, contrast, brand and copy review |
| **M2 Homepage** | Hero through four chapters; highlights, Open Source, FAQ, CTA, responsive | Desktop/mobile exports, chapter states, product-truth review |
| **M3 Documentation** | Docs home, article template, sidebar, search, callouts/code, mobile navigation | Desktop/mobile docs layouts and key state inspection |
| **M4 Prototype & QA** | Files/Sharing/Storage demos, chapter navigation, docs links, motion storyboards | Scenario register from `PROTOTYPE.md`, defect retests, final handoff |

- Loop each milestone: **inspect → checkpoint → design → screenshot/render → inspect layers/contrast/overflow → correct → export → review**.
- Get feedback/approval for the current milestone before starting the next; unresolved changes go in `DECISIONS.md` or the review log.
- Synchronize `PAGES.md` with the agreed **Practical FAQ** region before final sign-off; FAQ is supporting content, not a fifth numbered chapter.
- Milestone approval permits **design continuation only**, never code implementation.

## 7. Prototyping and Motion Limits

- Prototype **only** actions proven native: navigation, menu/overlay, dialogs, tabs/selection, three illustrative demos, FAQ, Docs/CTA links.
- Keep flows editable and truthful: **Files** browse/select/preview; **Sharing** Viewer/Editor or password-optional public link; **Storage** local vs optional S3 explanation.
- Do not depict Organization as team-level RBAC or pretend a live upload, share, S3 connection, migration, or replication happened.
- Preserve **normal fluid scrolling**, four jumpable chapters, active/progress states, and keyboard/touch navigation; no forced scroll snapping/pinning.
- For unsupported continuous scroll, pointer physics, shared-element morphing, or dynamic GSAP effects, provide **Start → Active → Transition → End** storyboard frames plus trigger, easing, fallback, and truth notes.
- Follow `MOTION.md` timing/rhythm and **Full / Light / Reduced** variants; complex effects never block content or interaction.
- A storyboard is **not** a working animation. An illustrative state is **not** a tested control.

## 8. Saving, Exporting, and Structured Evidence

- Save/checkpoint before risky changes and after each verified milestone; confirm the saved `.figcraft` can be reopened.
- **Exports:** `design/exports/desktop/` and `design/exports/mobile/`; include milestone and screen identifiers, e.g. `M2-home-files-desktop.png`.
- Preserve milestone snapshots separately from the one canonical master; snapshots are recovery artifacts, not competing current masters.
- Maintain `design/exports/reviews/` with an index: `milestone | date | master version | frame IDs | export paths | review status | issues | decision`.
- Reference `PROTOTYPE.md` test IDs with device, `PASS/FAIL/BLOCKED/N/A`, observable proof, issue owner, and retest result.
- Screenshots validate visual state only. Do not mark navigation or motion `PASS` without observed supported interactions.

## 9. Visual QA and Safe Recovery

- After meaningful edits, render affected desktop/mobile frames; inspect cropping, overflow, text wrapping, spacing, contrast (WCAG 2.2 AA target), focus, and content truth.
- Inspect node hierarchy for editability, sensible grouping, instance/reference integrity, and unexpected duplicate layers.
- On socket refusal: verify app launch, `--control` support, host/port, and MCP attach; do not repeatedly run destructive writes.
- On batch failure: capture error, re-inspect IDs/parents, compare with checkpoint, then retry only the validated subset.
- On clipped text: verify text auto-resize/hug sizing **if supported**; on unexpected color: inspect token mapping and color profile before assuming an sRGB fix.
- If CLI fallback is supported, work against a checkpoint/copy first, reopen/render the result, and promote it to master only after validation.
- If both methods fail or needed prototype behavior is unsupported, record `BLOCKED` with evidence; use storyboard where appropriate, never fabricate success.

## 10. Final Design Sign-Off

- Provide editable master, desktop/mobile exports, evidence index, known blockers, reviewed state list, and `PROTOTYPE.md` acceptance results.
- Verify consistency against `BRIEF.md`, `DESIGN.md`, `PAGES.md`, `CONTENT.md`, and `MOTION.md` and confirm real documentation destinations.
- **Only the user's explicit design sign-off closes this phase.** Agent self-review or successful MCP saves/exports cannot authorize coding.
- **Development requires a separate explicit instruction**, even after design approval.
