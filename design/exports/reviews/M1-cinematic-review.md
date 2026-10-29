# M1 cinematic review — 2026-10-29

Master: `design/cubycloud-page.figcraft` (157,540 bytes after final save). Recovery checkpoint: `M1-before-cinematic-rework.figcraft` in this folder (88,623 bytes). Original tokens, components and 9 previous hero-direction frames remain in master. Candidate display font Avenir Next Condensed remains unapproved.

## Review artifacts

| State | Desktop ID / PNG | Mobile ID / PNG | Visible change |
|---|---|---|---|
| S01 | 803 / `../desktop/M1-cinematic-desktop-S01.png` | 852 / `../mobile/M1-cinematic-mobile-S01.png` | Core arrives; 1 dominant object. |
| S02 | 896 / `../desktop/M1-cinematic-desktop-S02.png` | 948 / `../mobile/M1-cinematic-mobile-S02.png` | Lit aperture and ready mark. |
| S03 | 995 / `../desktop/M1-cinematic-desktop-S03.png` | 1047 / `../mobile/M1-cinematic-mobile-S03.png` | Rotated core and perspective contour. |
| S04 | 1094 / `../desktop/M1-cinematic-desktop-S04.png` | 1145 / `../mobile/M1-cinematic-mobile-S04.png` | Core lid lifts and exposes cavity. |
| S05 | 1191 / `../desktop/M1-cinematic-desktop-S05.png` | 1246 / `../mobile/M1-cinematic-mobile-S05.png` | `welcome.txt` emerges without hiding core label. |
| S06 | 1296 / `../desktop/M1-cinematic-desktop-S06.png` | 1358 / `../mobile/M1-cinematic-mobile-S06.png` | Synthetic selected file in conceptual `My Storage` slice. |

All 12 exports have nonzero length and measured PNG dimensions: desktop 1440×900, mobile 390×900 (`sips`). The native master reopened with 12 cinematic frames, all previous frames preserved, and unsaved flag false. FigCraft `get_node` confirmed editable frames/vectors/text and stored onClick → navigate/dissolve (320ms) plus GitHub openUrl. Prototype previews opened at desktop frame 803 and mobile frame 852; `inspect_ui` showed hotspots, but a complete physical click-through was **not** exercised. Static screenshot proof is not motion proof.

## Quality and acceptance

| Scenario | Desktop | Mobile | Evidence / remaining issue |
|---|---|---|---|
| PT-01 homepage | N/A | N/A | Only M1 Hero designed; full homepage/M2 unavailable. Hero frames visually inspected. |
| PT-02 chapter jumps | BLOCKED | BLOCKED | M1 board displays chapter labels; no target chapter frames or native scroll. |
| PT-03–06 demos/states | N/A | N/A | Later milestone scope; S06 only synthetic selected-file illustration. |
| PT-07 mobile tap / 320 px | N/A | BLOCKED | 390 px rendered; core tap hotspot exists. 320 px reflow and full tap path not validated. |
| PT-08 keyboard/focus | BLOCKED | BLOCKED | Native visual focus/traversal not tested. |
| PT-09 FAQ/docs | N/A | N/A | Later milestone scope. |
| PT-10 Get Started/GitHub | BLOCKED | BLOCKED | GitHub URL configured to actual product repository. Installation docs route not published/verified, so Get Started is visible but unwired; cannot approve conversion path yet. |
| PT-11 storyboard/fallback | PASS (static design) | PASS (static design) | Six editable distinct frames each, technical timing, trigger, camera, composition and reduced-motion intent in `M1-cinematic-storyboard.md`; continuous animation remains untested. |
| PT-12 palette/copy | PASS (new hero only) | PASS (new hero only) | Product claims checked against read-only product README; brand colors match DESIGN.md. Measured contrast: cream/bg 16.11, muted/bg 7.51, olive/bg 7.45, sand/bg 9.16, dark-on-olive 7.45. Older preserved concepts were not re-approved/audited. |

## Review blockers and next permitted action

- **M1 approval blocked:** Get Started destination unverified, so primary CTA cannot be certified usable. Existing approved plan requires published installation documentation. Resolve only by verifying its real destination when available, not a fabricated link.
- **Additional coverage pending:** 320 px and intermediate responsive reflow, keyboard/focus and end-to-end click behavior need testing before their scenarios pass.
- **Motion intentionally not live:** fluid scroll, continuous pointer tilt, ambient light, extraction morph and reduced-motion switching remain future frontend behavior. FigCraft contains static keyframes and configured 320ms click/tap dissolves, not the full cinematic animation.
- Request user review of the visual direction and storyboard at M1 gate; do not proceed to M2 or coding until separately authorized.
