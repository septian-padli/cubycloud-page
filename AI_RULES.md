# AI_RULES.md — CubyCloud Landing Page Experiment

This Dyad repository contains an **independent marketing landing-page experiment**. The separate `../cubycloud` product repository and the FigCraft master are read-only. This experiment does not implement the product, documentation portal, storage, accounts, or deployment.

## Stack and responsibilities

- **React 19 + TypeScript + Vite:** Render the standalone landing page; `npm run dev` and `npm run build` are the application scripts. There is no Astro or Starlight app in this experiment.
- **React Three Fiber + Three.js:** Render the procedural Storage Core only. Keep text, navigation, forms, and demos in semantic HTML.
- **GSAP + ScrollTrigger:** Drive scroll-linked object progress and editorial chapter transitions. Clean up animation contexts/triggers on unmount or motion-tier changes.
- **CSS:** Own brand tokens, responsive composition, typography, gradients, focus states, and simple transitions. No additional styling framework is needed for this experiment.
- **Lucide React:** Provide conventional interface icons. Use CSS geometry and procedural meshes for the visual artifact.
- **React hooks:** Keep synthetic demo state local. Avoid global state libraries and backend/API calls.
- **Montserrat, Barlow Condensed, DM Mono:** Body/UI, experimental display headlines, and technical labels respectively. Display typography is experimental, not a final brand approval.

## Operating rules

- Keep native vertical scrolling, working anchor links, semantic HTML, keyboard focus, and a complete reduced-motion experience. Never pin, snap, or hijack story sections.
- Keep the Storage Core a single recognizable visual thread through Hero → Files → Sharing → Storage → Self-Hosting. Match file-token geometry/color across the handoffs.
- Use only the approved earthy light/dark palettes in `DESIGN.md`; maintain readable contrast and mobile layouts down to 320px.
- All demos are synthetic, client-side illustrations with reset actions. Never imply a live upload, share, S3 connection, replication, or visitor account.
- Source product claims from `BRIEF.md` and the read-only product repository when available. Organization is a single shared tree for authenticated users, not team/group RBAC. Do not fabricate benchmarks, customer evidence, or unsupported capabilities.
- Keep external destinations centralized in `src/config.ts`. Do not invent a `/docs/` route or installation article; until verified, direct setup to the product GitHub README with honest labeling.
- `PAGES.md`, `CONTENT.md`, `MOTION.md`, and `PROTOTYPE.md` remain contextual design references. The current user request explicitly authorizes this standalone implementation, not alteration of the original product or FigCraft artifacts.
