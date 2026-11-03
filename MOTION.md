# MOTION.md — Motion Preservation Contract

## Scope and authority

This document owns current homepage motion, motion-tier behavior, and animation lifecycle requirements.
`MIGRATION_CONTRACT.md` owns migration DAG and gates; `DESIGN.md` owns visual palette; `PROTOTYPE.md` defines regression scenarios and evidence.
Starlight article motion must stay calm and separate from marketing choreography.

Current implementation is React + Vite with GSAP/ScrollTrigger and Three.js through React Three Fiber. Astro + React Islands and Starlight are targets, not implemented. Preserve current runtime behavior; do not treat proposals as evidence.

## Non-negotiable behavior

- Keep natural document scrolling. No snapping, hijacking, scroll locking, automatic chapter jumps, or required animation completion before navigation.
- Preserve current trigger points, progression, transforms, continuity, responsive behavior, and reverse scrolling. Do not replace motion with static imagery or unrelated CSS effects.
- Keep content and controls available when motion is reduced. Motion must not gate access or interaction.

## Current GSAP and ScrollTrigger behavior

`src/App.tsx` registers ScrollTrigger and creates a scoped GSAP context for heading reveals, handoff token, Files and Sharing demo entrances, Storage topology,
architecture layers/notes, and final CTA. Reduced tier skips this context; context reverts on effect cleanup.
Tier-dependent distances apply to Files, Sharing, and topology motion.

`src/components/HeroExperience.tsx` owns hero entrance and scroll-linked positioning/progress, coupled to Storage Core. Preserve that shared progress relationship and verify it from runtime behavior during migration.

`src/components/NarrativeThread.tsx` measures page-relative DOM positions and runs three token travels: Hero to the Files demo,
Files to the Sharing file, and Sharing to the Storage topology file.
It uses tier-dependent scrub, `invalidateOnRefresh`, and `ScrollTrigger.refresh()`, then kills timelines/triggers and clears token styles during cleanup.
Preserve relevant selectors, coordinate measurements, endpoints, timing, refresh behavior, and reversible progression.
The current token journey ends at Storage. There is no implemented Storage-to-Self-Hosting token leg; do not add or claim one without separate approval.

`src/components/StorageCoreScene.tsx` renders procedural Three.js geometry through React Three Fiber.
Preserve its scene, camera, materials, lighting, panel opening, token extraction, pointer response where enabled, visibility behavior, and WebGL fallback.
Scroll progress drives opening and extraction. Do not replace the Core with a still image.

## Motion tiers

`src/hooks/useMotion.ts` selects `full`, `light`, or `reduced` using user/device preferences. Preserve this tier model and test actual behavior, not just class names.

- **Full:** retain complete baseline choreography, scene details, and supported pointer response.
- **Light:** retain useful motion with the existing reduced-complexity distances and effects for appropriate touch/coarse-pointer contexts.
- **Reduced:** honor `prefers-reduced-motion`; avoid nonessential cinematic movement while preserving readable content and working controls. Current narrative tokens are omitted, and the page GSAP effect returns early.

Do not change tier-selection rules or substitute an untested tier system as a migration shortcut. Test the system preference as well as the effective selected tier; do not infer a tier from viewport size alone.

## Lifecycle and layout dependencies

- Initialize browser-only animation and DOM measurements only after browser mount and stable layout. Account for loaded fonts, images, and hydration before measuring.
- Keep shared DOM-dependent timelines together unless synchronization and parity are proven. A single coherent landing React Island is the initial compatibility strategy.
- Scope GSAP work and clean up timelines, ScrollTriggers, styles, observers, and listeners on unmount or tier change. Avoid duplicate triggers after hydration/navigation.
- Refresh measurements after relevant layout changes. Preserve coordinate systems and selectors used by cross-section effects; route wrappers or CSS changes can shift them.
- For R3F, verify canvas mount, frame updates, visibility, pointer and resize handling, responsive pixel ratio, WebGL fallback, and cleanup. Do not alter performance settings without testing.
- Verify direct loads, scroll restoration, and browser back/forward do not leave stale progress or stranded transforms.


The baseline includes independent timeline groups in `src/App.tsx`, `HeroExperience`, and `NarrativeThread`.
Migration changes to mount order or island boundaries can affect measurement timing even when selectors remain unchanged.
Keep those dependencies explicit when diagnosing drift.

Avoid mutating shared page elements outside the owning GSAP context. Cleanup must restore styles that are safe to restore without erasing unrelated inline state. Validate tier changes as lifecycle transitions, not just initial page loads.

### Lifecycle failure signals

Treat repeated callbacks, doubled triggers, token jumps after resize, lingering transforms after unmount, console errors, and an unresponsive canvas as regressions.
Distinguish browser/device limits from migration-caused behavior with matched baseline evidence.
Do not mask failures by disabling the scene or motion.

## Documentation motion

Keep documentation reading calm: subtle focus/hover transitions, disclosure, search/theme feedback, copy confirmation, and accessible anchor scrolling are appropriate.
No marketing parallax, WebGL decoration, pinning, forced transitions, or movement that obscures article reading.
Respect reduced motion. Motion feedback must not be the only indication of state.

## Evidence and acceptance

Capture baseline and migrated behavior at controlled scroll positions and matching viewports.
Include Hero progress, Storage Core opening/extraction, Hero-to-Files, Files-to-Sharing, Sharing-to-Storage, architecture motion, final CTA, reverse scroll, resize, and reduced-motion behavior.
Do not capture or expect a token leg to Self-Hosting.

A motion check requires observed runtime direction and position, reversible scroll, no unexpected jumps or duplicate triggers, native scrolling, mobile/tier behavior,
and no critical runtime error. Static screenshots alone cannot prove motion.
Use `PROTOTYPE.md` MR scenarios and attach browser, viewport, scroll position, and video/trace or other reproducible evidence.
Report unobserved behavior as NOT TESTED, not PASS.

| Area | Exercise | Required observation |
| --- | --- | --- |
| Scroll | Controlled forward and reverse travel | Timeline follows input and returns without jumps. |
| Resize | Resize across measured endpoints | Anchors remain aligned after refresh. |
| Lifecycle | Mount, unmount, revisit | No duplicate triggers, stale styles, or leaked listeners. |
| WebGL | Supported and fallback conditions | Scene works or fallback remains visible and meaningful. |
| Reduced | Enable OS reduced-motion preference | Content and controls remain usable without cinematic motion. |