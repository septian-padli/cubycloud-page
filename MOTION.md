# MOTION.md — CubyCloud Website Motion & Interaction Specification

> **Status:** Approved motion direction; scene behavior is a design specification, not an implemented animation.
> **Scope:** Single marketing homepage, chapter navigation, interactive product storytelling, and restrained Starlight feedback.
> **Read with:** `BRIEF.md` (truth/positioning), `PAGES.md` (structure), `CONTENT.md` (copy), `DESIGN.md` (visual system), `PROTOTYPE.md` (state/flow acceptance), `FIGCRAFT.md` (tool workflow).

## 1. Six Approved Decisions

| Dimension | Decision | Non-negotiable interpretation |
| --- | --- | --- |
| Scrolling | **Fluid Scroll Storytelling** | Native continuous vertical scrolling; no pinning, forced snapping, or scroll hijacking. |
| Visual language | **Hybrid Product + Experimental Motion** | Realistic product UI choreography combined with editorial type, depth, and abstract brand elements. |
| Interactivity | **Hybrid Interactive Experience** | Scroll scenes, clickable product demos, and optional pointer-reactive decoration. |
| Transitions | **Shared-Element Morphing** | Where meaningful, a recognizable visual object links consecutive chapters. |
| Pace | **Adaptive Motion Rhythm** | Fast controls, deliberate UI changes, expressive morphs; scroll-linked motion follows scroll progress. |
| Adaptation | **Progressive Motion Enhancement** | Scale effects to user preferences, input capabilities, and device performance; never gate content behind motion. |

## 2. Motion Principles

- **Explain before embellishing:** Animation must reveal file management, sharing, storage flexibility, or self-hosting.
- **Movement has meaning:** Spatial continuity should clarify relationships between screens and concepts, not imply unavailable functionality.
- **Product first:** Keep genuine UI labels, workflows, and permissions intact; abstract objects are metaphors, never fake product screenshots.
- **Editorial character:** Strong type entrances, layered compositions, palette-derived gradients, and soft dimensional movement are allowed by `DESIGN.md`.
- **Restraint matters:** Animate a small number of focal elements per viewport; avoid perpetual motion and simultaneous competing effects.
- **Never delay action:** Content, chapter jump links, Docs, and `Get Started` stay readable, reachable, and usable throughout transitions.
- **Natural scroll:** Wheel, trackpad, touch, keyboard, anchor links, and browser history retain their expected behavior.

## 3. Scroll and Chapter Behavior

- Use the normal document flow; every content region has intrinsic height, and sticky UI may track progress without pinning story sections.
- Reveal text/visuals when entering the viewport; reverse or settle predictably when scrolling backward; do not replay distracting entrances on every tiny movement.
- Progress-linked parallax or transforms may respond continuously to scroll, but must never stall scrolling or block reading.
- Four navigation chapters: `01 Files` (`#files`), `02 Sharing` (`#sharing`), `03 Storage` (`#storage`), `04 Self-Hosting` (`#self-hosting`).
- Hero, supporting highlights, open-source proof, FAQ, and final CTA are supporting regions, not additional numbered chapters.
- Update active chapter and progress from actual visible regions; never report a chapter complete merely because an animation timeline ended.
- Direct anchor visits, `Jump to chapter`, `Skip to Get Started`, and `Back to top` must reach stable content positions with sensible sticky-header offsets.
- Chapter indicators may animate, but links remain clickable during transitions and the document never imposes full-page scroll snapping.
- If scroll animation is unsupported or disabled, the same headings, visuals, information, and links appear without hidden content.

## 4. Choreography by Homepage Region

| Region | Narrative movement | Entry, action, and exit requirements |
| --- | --- | --- |
| **00 Hero** | Kinetic anti-complexity headline; genuine CubyCloud explorer preview gains subtle depth. | First paint is readable; restrained stagger; `Get Started` and GitHub visible immediately; scroll cue points to `#files`. |
| **01 File Management** | Product preview opens a folder, highlights a file, then shows a supported file action. | Click/tap scene steps; preserve accurate My Storage UI; selected file becomes the optional shared transition object. |
| **02 File Sharing** | Selected file becomes a sharing-focused visual; demonstrate internal access and public link alternatives. | Viewer/Editor and optional password appear accurately; do not show fictional group permissions or actual live sharing. |
| **03 Local + S3 Storage** | Shared file metaphor enters a truthful diagram of local and optional S3-compatible storage. | Convey configuration choices, not a copy/sync/replication claim; distinguish an explanatory diagram from product UI. |
| **03b Highlights** | Concise staggered reveal of previews, supported resumable uploads, starred/trash, and administration. | Scannable grid; no long multi-step animations or forced reading sequence. |
| **04 Self-Hosting** | Interface compresses into an infrastructure illustration: one application, embedded UI, SQLite, storage. | Reveal architecture progressively without implying zero operational responsibilities or unverified performance. |
| **04b Open Source** | Clear source/GitHub/license visual emphasis with modest type and link feedback. | Favor transparency and verifiable source links, not invented counters, reviews, or certifications. |
| **04c Practical FAQ** | Small accordion expand/collapse and focus transitions only. | All five practical questions stay keyboard/touch accessible; no scroll-driven answer hiding. |
| **05 Get Started + Footer** | Resolve visual movement into a calm, high-contrast final CTA. | `Get Started` leads to the real installation guide; supporting Docs and GitHub are always actionable. |
| **Starlight Docs** | Subtle button, sidebar, search, menu, tab, and code-copy feedback. | No parallax, morphing, immersive chapters, custom cursor, or ambient loops in reading content. |

## 5. Shared-Element Morphing Contract

- Use one recognizable **file card / file token** as the primary thread: explorer file → sharing context → conceptual storage diagram.
- Preserve continuity through position, scale, silhouette, and brand palette; explicitly mark transitions between **real UI** and **conceptual illustration**.
- At each chapter boundary define a source frame, destination frame, correspondence map, text-safe region, and static fallback.
- Do not morph real data into a misleading product state: file sharing does not automatically move or replicate the underlying stored file.
- Morphing must not remove content from the accessibility tree, move keyboard focus unexpectedly, or temporarily disable links.
- On small screens, reduced motion, or low capability, replace complex shared-element travel with a restrained crossfade or immediate scene change.
- The file token is decorative context; no essential information is conveyed by its path alone.

## 6. Interactive Demo and Pointer Rules

### Clickable Product Demos

- **File management:** `default explorer → open folder → select file → supported action`; include a `Reset demo` control.
- **Sharing:** `file selected → choose internal Viewer/Editor OR public link → show relevant options`; show password control only for the public-link path.
- **Storage:** `overview → local node / optional S3 node → configuration explanation`; never simulate a successful connection or transfer without a verified scenario.
- Give each demo an obvious start, selected state, meaningful feedback, reset, and a way to continue without completing the demo.
- Clearly label demonstrations as illustrative/simulated when actions do not touch a live backend; do not pretend to upload, save, or share visitor data.
- Click/tap interactions never depend on scroll reaching an exact percentage; demos keep their state until reset, navigation, or an intentional scene change.
- Match the actual product's permission model: Organization is one shared tree for authenticated users, not separate team spaces.

### Pointer-Responsive Decoration

- Allow restrained hover tilt, depth/parallax, magnetic emphasis, and subtle pointer-following layers on capable fine-pointer devices.
- Keep hit targets stable: magnetic visuals may move inside a fixed interactive target, not pull buttons away from touch, focus, or click coordinates.
- Never override normal cursor visibility, text selection, keyboard focus, or essential navigation with a custom cursor.
- Disable pointer physics on coarse pointers, reduced-motion settings, or when they reduce responsiveness; touch receives tap/press/focus equivalents.

## 7. Rhythm, Timing, and Easing

| Motion class | Starting range | Feel / use |
| --- | --- | --- |
| Micro-feedback | **120–220 ms** | Press, hover, focus-adjacent feedback; fast and unambiguous. |
| UI state transition | **200–400 ms** | Menu, accordion, preview emphasis, demo state change. |
| Shared-element morph | **500–900 ms** | One intentional cross-chapter transformation; cancellable/interruptible. |
| Editorial reveal | **350–700 ms** | Headline, image, and section entry with restrained stagger. |
| Scroll-linked movement | **Scroll-progress driven** | No fixed-duration playback; remain synchronized with normal scrolling. |

- Use a consistent ease-out family for entrances and UI feedback; use smooth ease-in-out for morphs; avoid bouncy or elastic motion on critical UI.
- Stagger only related elements, usually one headline-to-supporting-copy-to-visual sequence; do not postpone CTA availability.
- Prefer reversible transforms with stable start/end states; interruption, quick reverse scroll, and resize must not leave elements stranded.
- Treat durations as design starting points, not measured runtime promises or animation quotas.

## 8. Responsive and Accessible Motion Tiers

| Experience | Visual policy | Interaction policy |
| --- | --- | --- |
| **Full** (capable desktop + preference allows) | Scroll reveals, subtle parallax, shared-element morphs, kinetic type, modest pointer effects. | Full click demos, keyboard/touch-equivalent controls, direct chapter navigation. |
| **Light** (touch, constrained device, or simplified layout) | Shorter reveals, minimal depth, crossfades instead of complex morphs; no pointer physics. | Mobile-native stacked scenes, tap demos, compact chapter menu; native scrolling. |
| **Reduced / static** (`prefers-reduced-motion`) | No scroll-linked travel, cinematic text splitting, parallax, or nonessential ambient motion; immediate state changes or minimal fades only. | All headings, diagrams, FAQ answers, demos, links, and navigation remain available. |

- Start designs at **1440 px desktop** and **390 px mobile**; verify tablet and widths down to **320 px** as required by `DESIGN.md`.
- Mobile is a **purpose-built composition**, not desktop effects resized; avoid horizontal scroll as a required storytelling mechanism.
- Respect `prefers-reduced-motion` at load and if changed during a session; do not infer preferences solely from screen width or user-agent labels.
- Keep semantic reading order, visible focus, predictable tab order, escape/close controls, adequate touch targets, and non-motion equivalents for every cue.
- Ensure contrast, legibility, and comprehension at every keyframe; never animate essential text through unreadable colors or sustained blur.

## 9. Performance and Reliability Guardrails

- Prioritize smooth input and reading over motion fidelity; degrade effects when sustained jank or costly rendering becomes apparent.
- Prefer composited transforms/opacity for decorative motion; avoid layout-changing animation and continuous blur/filter work on large surfaces.
- Limit simultaneous layers, pointer listeners, animated masks, oversized media, and always-running scenes; pause offscreen/hidden visual activity.
- Load heavy showcase media only when needed, provide static poster imagery, and avoid making initial hero content depend on animation assets.
- Validate rapid scrolling, backtracking, resizing, reduced-motion changes, slow devices, touch scrolling, keyboard use, and tab switching.
- Do not present invented FPS, Lighthouse, bandwidth, or hardware-performance results as measured facts; establish acceptance measurements during implementation.

## 10. FigCraft Storyboards and Prototype Boundaries

- Produce **editable native components and frames**, not flattened mockups: `00 Hero`, `01 Files`, `02 Sharing`, `03 Storage`, `03b Highlights`, `04 Self-Hosting`, `04b Open Source`, `04c FAQ`, `05 Get Started`.
- For each major scene, create **Start → Active/Interaction → Transition → End** keyframes, including the shared file token's matching source/target geometry.
- Add desktop (1440 px), mobile (390 px), reduced-motion, and relevant open/selected/focus states; give chapter navigation its own current/progress/expanded variants.
- Prototype real FigCraft-supported actions (tap, links, menus, accordions, state changes) and connect the key scene states where supported.
- For unsupported continuous scroll scrubbing, pointer physics, GSAP-style morphing, or dynamic performance fallbacks, supply **numbered storyboard frames + trigger/behavior notes**; do not label these effects working.
- Record for every transition: trigger, source, destination, duration/easing or scroll relationship, interaction result, mobile fallback, reduced-motion fallback, and truth constraints.
- Export/review desktop and mobile proof frames against `DESIGN.md`, `PAGES.md`, and `CONTENT.md`; amend `PAGES.md` to include the agreed FAQ before final approval.
- **Stop after design approval.** Do not scaffold, code, deploy, or configure Astro, React, GSAP, Tailwind, Starlight, or application services from this document.
