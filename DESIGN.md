# DESIGN.md — CubyCloud Website Design System

> Source of truth for **visual identity, composition, components, motion principles, and accessibility** across the marketing website and Starlight documentation. Use with `BRIEF.md` (positioning), `PAGES.md` (structure), `CONTENT.md` (copy), `MOTION.md` (animation specifications), `PROTOTYPE.md` (flows), and `FIGCRAFT.md` (tool workflow). Do not infer product features from this file.

## 1. Direction and boundaries

- **Brand:** CubyCloud, a self-hosted file-drive product. Preserve its warm **Flat Earthy** roots while giving the website a distinctive editorial identity.
- **Marketing direction — Creative Editorial / Immersive & Experimental:** bold scale, asymmetry, fullscreen compositions, layered scenes, depth, gradients, and expressive interactions are permitted when they serve product storytelling.
- **Color direction — Strict Brand Palette:** no new brand hues; build all decorative colors, gradients, highlights, and illustrations from the approved palette and its opacity/tone variations.
- **Documentation direction — Branded Starlight:** recognizable CubyCloud styling with conventional documentation usability; no immersive or distracting reading experience.
- The app's explorer, quota, transfer, permission-badge, and Svelte-specific UI rules do **not** apply to this website. Never copy dashboard implementation paths into website design specifications.
- **Current phase:** design and prototyping in FigCraft only. Astro, React/shadcn, Tailwind, GSAP, and Starlight are planned implementation technologies, not permission to begin coding.

## 2. Color system

Carry forward the existing CubyCloud colors and their light/dark mappings. Use semantic roles, not arbitrary one-off colors.

| Token | Light | Dark | Primary role |
| --- | --- | --- | --- |
| `bg-app` | `#F0EEE3` | `#0F130E` | Page/section background |
| `surface` | `#FFFFFF` | `#182017` | Elevated content, overlays, docs panels |
| `primary` | `#606C38` | `#99AB5E` | CTAs, active elements, brand graphics |
| `primary-accent` | `#283618` | `#ADCB8A` | Display emphasis, headings, deep contrast |
| `secondary` | `#DDA15E` | `#E1AB70` | Highlights, illustrations, secondary accents |
| `secondary-accent` | `#BC6C25` | `#D78032` | Strong accents, focal points |
| `text-main` | `#283618` | `#F0EEE3` | Primary copy |
| `text-muted` | `#5A6B46` | `#9CA88F` | Supporting copy |
| `border-subtle` | `rgba(0,0,0,0.06)` | `rgba(255,255,255,0.08)` | Dividers and quiet boundaries |
| `danger` | `#EC003F` | `#FF3366` | Functional destructive/error states **only** |

- Treat the existing light/dark variants as approved colors, not as permission to invent additional hues. White, dark neutrals, alpha overlays, and gradients between approved palette values are allowed.
- Gradients, soft lighting, transparent overlays, and restrained shadows are permitted on marketing pages; avoid generic neon, rainbow effects, and glassmorphism as the default design language.
- Use olive/forest/cream as the recognizable anchors; sand and terracotta are accents, not competing primary CTA colors.
- Every palette combination must retain readable text and discernible interactive states. Provide real light **and** dark variants where a section or component supports both.

## 3. Typography

- **Body, navigation, UI, and documentation:** `Montserrat`, sans-serif; keep legibility and consistent character with the product app.
- **Marketing display headings:** a distinctive **display font + Montserrat** pairing. **Display family is not selected yet**; explore and approve it in FigCraft before locking a font asset or implementation token.
- Recommended scale (adjust within the system, not per-component whims):

| Role | Desktop | Mobile | Notes |
| --- | --- | --- | --- |
| Hero display | 64–96 px | 40–56 px | Display font, tight but legible line-height |
| Section display | 36–64 px | 28–40 px | Strong hierarchy; editorial wrapping |
| Lead | 18–24 px | 16–20 px | Comfortable paragraph measure |
| Body / docs | 16–18 px | 16 px | Montserrat, generous line-height |
| Labels / metadata | 12–14 px | 12–14 px | Never rely on microtype for essential content |

- Prefer purposeful text wrapping, variable scale, contrast, and whitespace over excessive decoration. Never sacrifice legibility for kinetic typography.
- Document heading, body, code, and navigation typography separately; code blocks use an appropriate monospace system font.

## 4. Layout and responsive composition

- **Immersive & Experimental:** design full-bleed hero/feature scenes, selective fullscreen sections with native fluid scrolling (no pinning or scroll hijacking per MOT-01), large product visuals, overlapping layers, and deliberate asymmetry.
- Preserve a coherent grid beneath the experimentation: use a consistent content container, alignment anchors, rhythm, and predictable CTA placement.
- **FigCraft starting frames:** desktop **1440 px** wide, mobile **390 px** wide; validate intermediate/tablet and narrow-mobile layouts (down to 320 px). Treat heights as content-dependent, not fixed crops.
- Use an 8 px spacing rhythm with 4 px subdivisions; define reusable spacing and grid tokens in FigCraft instead of arbitrary coordinates.
- Desktop-to-mobile is an **intentional recomposition**, not merely proportional scaling. Reorder layers, simplify complex scenes, and avoid off-screen required content.
- Use responsive constraints/auto layout for structural elements. Absolute positioning is reserved for intentional decorative/storytelling layers.
- Support safe areas, readable line lengths, keyboard navigation, touch targets, and horizontal-overflow checks.

## 5. Surface, depth, and imagery

- Cards and controls should inherit the app's simple geometry: rounded pills for prominent CTAs and modest rounded corners for panels; vary scale/shape only when editorial composition requires it.
- Layering, blur, texture, subtle shadows, and palette-based gradients may communicate depth in marketing scenes; never obscure labels or fake interactive affordances.
- **Show the real product:** screenshots, UI details, installation visuals, and storage diagrams must reflect verified CubyCloud capabilities. Do not fabricate screens, benchmarks, feature states, or promises.
- Use crisp SVG diagrams and optimized image/video assets. Brand illustrations stay within the approved palette and should explain storage, ownership, sharing, or self-hosting.
- Keep marketing visuals expressive; keep documentation screenshots factual, uncluttered, and annotated only where useful.

## 6. Components and states

- **Marketing components:** navbar, hero, primary/secondary CTA, feature showcase, tabs, cards, animated diagrams, stats/proof blocks, FAQ, footer, and optional interactive product scenes.
- **Documentation components:** header, sidebar, search, table of contents, code block, callout, tabs, cards, and mobile navigation; preserve familiar Starlight conventions.
- Design reusable primitives and variants in FigCraft: default, hover, focus-visible, active, disabled, loading, and relevant open/selected states.
- Primary CTA: strong olive/forest contrast and a clear action label. Secondary CTA: quieter surface/outline treatment. Destructive red stays functional, not promotional.
- Future shadcn/ui (React) components are a **behavior/accessibility starting point**, not a visual ceiling; design source components and tokens rather than assuming unmodified defaults.
- Hover-only cues must have keyboard-focus and touch equivalents; visible focus, semantic labels, and disabled-state clarity are mandatory.

## 7. Motion and interaction principles

- **Fully Interactive & Experimental:** cinematic scroll storytelling, staggered text, fluid unpinned compositions (per MOT-01), morphing, layered transitions, magnetic/pointer-reactive elements, and interactive product demonstrations are allowed.
- Motion should communicate hierarchy, progression, or product behavior. Never animate every element just because the library can.
- Make transitions spatially coherent: preserve visual continuity between frames, use purposeful easing, and avoid unexpected content jumps.
- Distinguish entrance, scroll-linked, hover, click, navigation, and ambient motion; specify detailed triggers, state changes, easing, and timing in `MOTION.md`.
- **FigCraft reality:** prototype native interactions/transitions where supported; express unsupported GSAP-style scrub/pinning/continuous pointer effects as named key states, storyboard frames, and implementation notes, not fake working interactions.
- On touch devices replace pointer-dependent interactions with tap/swipe or static equivalents; simplify costly scenes on mobile and reduced-power devices.
- Honor `prefers-reduced-motion`: retain information and navigation without essential movement, scroll hijacking, or long forced transitions.

## 8. Starlight documentation theme

- **Branded Documentation:** use the approved palette, Montserrat, logo, selected display accent where appropriate, custom header/sidebar/callouts, and consistent links to the marketing site.
- Preserve Starlight's expected sidebar hierarchy, on-page contents, search, code-copy usability, keyboard navigation, and mobile menu patterns.
- Prioritize readable text columns, accessible contrast, clear code highlighting, visible focus, and sensible sticky elements.
- Motion is limited to subtle feedback and simple transitions. No parallax, pinned storytelling, custom cursors, or distracting ambient loops in reading areas.
- Maintain light/dark themes and test long articles, code samples, tables, callouts, and small screens. Do not rebuild Starlight's navigation purely for cosmetic novelty.

## 9. FigCraft production conventions

- Create a **native editable design**, not a flattened marketing screenshot. Use named components, variants, variables, shared styles, auto layout, and reusable section patterns.
- Organize the file into design system, desktop marketing, mobile marketing, desktop docs, mobile docs, and prototype flows; follow `FIGCRAFT.md` for actual MCP commands and saving/export rules.
- Name screens by page, breakpoint, and state; keep approved frames immutable unless a revision is explicitly requested.
- Prototype key flows: navbar/CTA navigation, feature tabs, dialogs or overlays, responsive menu, and major scroll-story states when representable.
- Export desktop/mobile proof screenshots at milestone gates; inspect alignment, clipping, states, and continuity before marking work complete.

## 10. Accessibility, performance, and review gates

- Target **WCAG 2.2 AA** for contrast and interaction where applicable; ensure keyboard reachability, focus visibility, readable labels, and non-color-only indicators.
- Plan animations for smooth rendering: favor transform/opacity, avoid layout-thrashing effects, optimize images/video, and load nonessential interactive assets lazily during implementation.
- Review desktop **then** mobile, but validate both before approval. Check dark/light, touch, reduced motion, long copy, narrow screens, and documentation reading comfort.
- Before handoff, verify brand consistency, editorial distinctiveness, component reuse, product claim accuracy, and whether every intended interaction is either prototyped or explicitly documented as an implementation-only effect.
- This document defines design rules, not route behavior, feature scope, copy, MCP tool syntax, or production code. Use the corresponding project documents as their sources of truth.
