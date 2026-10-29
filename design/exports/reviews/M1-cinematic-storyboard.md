# M1 — Cinematic storage-core storyboard

Status: review draft. Conceptual storage object, not product UI. Frames are editable FigCraft keyframes. Native tap/click advances dissolve between states; continuous camera, ambient light and scroll effects are implementation-only.

## Frame-to-frame contract

| State | Desktop frame | Mobile frame | Camera, geometry, typography, trigger, timing and adaptations |
|---|---:|---:|---|
| S01 · Arrival | 803 | 852 | Fixed 24° yaw / 20° elevation; single closed modular cabinet above its ground shadow. Oversized `YOUR FILES. / YOUR SERVER.` sits left, not behind object. On first paint, headline settles over 350–600 ms ease-out; content and CTAs remain visible throughout. Mobile camera uses the same diagonal silhouette at 55% scale, stacked beneath headline. Reduced motion shows this exact still frame immediately. |
| S02 · Idle | 896 | 948 | Fixed S01 camera and headline; one narrow sand optical sweep follows the cabinet aperture and a small status mark appears on its face. After 900 ms idle, sweep over 2.8 s ease-in-out and pause offscreen; it conveys physical depth, not actual storage activity. Mobile settles once without looping. Reduced motion keeps one fixed illuminated edge and no status animation. |
| S03 · Perspective | 995 | 1047 | Cabinet rotates about its own center, tracing a thin alternative silhouette while headline and CTAs remain stationary. Fine pointer proposes yaw ±6° and pitch ±3° with 160–220 ms eased response and 240 ms return; this continuous transform is implementation-only. Mobile shows one fixed −4° camera pose; tap advances to the next still, never requires hover. Reduced motion uses S01’s fixed viewpoint and keeps every control reachable. |
| S04 · Expansion | 1094 | 1145 | Camera remains on cabinet; its polygonal top lifts to expose a dark aperture and stacked directory plates. Heading switches to `OPEN THE / STRUCTURE.` at a safe distance left or above the core. On natural viewport entry, lid displacement tracks progress without a fixed duration, scroll lock, snap or pin. Mobile compresses perceived lift to roughly 28 px. Reduced motion immediately displays the exposed-cavity still when it enters view. |
| S05 · Extraction | 1191 | 1246 | Camera begins aligning with the file plane; one cream `welcome.txt` sheet lifts from the aperture, in front of the cabinet but beneath clear headline space. `FIND THE / ONE FILE.` replaces earlier heading. Scroll progression proposes 500–700 ms ease-out visual travel, interruptible and reversible; no actual file access occurs. Mobile uses short vertical travel instead of wide flight. Reduced motion shows the already-visible token in its final position. |
| S06 · Files handoff | 1296 | 1358 | File plane meets a compact `My Storage` selection embedded in the cabinet’s front face; selected `welcome.txt` row uses the genuine product label but synthetic content. Heading becomes `OPEN A / FOLDER.`; a natural `#files` chapter entry would complete the handoff over 500–900 ms ease-in-out. Mobile crosses from token to integrated selection without pointer or a floating dashboard. Reduced motion shows the selected row instantly. No M2 chapter screen or working anchor is implied. |

## Narrative continuation (M2 map only, no M2 frames)

- **01 Files:** S06 file token matches the selected `welcome.txt` row in `My Storage`; viewer can open folders and inspect supported files.
- **02 Sharing:** preserve token shape into file-focused sharing context. Internal Viewer/Editor and public link with optional password remain separate paths; no group RBAC or live action.
- **03 Storage:** abstract selected file into a diagram of local disk or optional S3-compatible storage. Choice is configuration, not replication, migration or transfer.
- **04 Self-Hosting:** core becomes an ownership diagram: one container with Go API, embedded SvelteKit UI, SQLite WAL and operator-managed storage. Infrastructure/HTTPS/backups remain the operator’s responsibility.

## Controls and limitations

- FigCraft native: click/tap storage core to advance each keyframe with 320ms dissolve; GitHub buttons link to verified repository. The Get Started route remains unlinked until published docs route verification; visible label indicates intended destination, not a working link.
- Future frontend only: continuous pointer tilt, looping ambient light, viewport-driven lid lift, shared-element travel, reduced-motion switching, native document scrolling and responsive interpolation. Every keyframe is static design evidence, not animation proof.
- Native scroll is never intercepted or pinned. All text and chapter controls stay readable without motion. For reduced motion: render the corresponding final still state, skip transforms, and retain labels/anchors.
- Fonts: Avenir Next Condensed is an M1 display exploration, **not approved** for the marketing font token; Montserrat remains body/UI.
- Color: approved dark forest/cream/olive/sand palette. Synthetic names `welcome.txt`, `Project Notes`. No fabricated benchmark, memory claim, automatic switch or backend write.

## Pending QA

See review index for screenshot evidence and applicable PT scenario results. Narrow 320px and real link behavior remain later responsive/prototype validation; storyboard still does not prove them.
