# CubyCloud Website & UI/UX Design Workspace

Official UI/UX design specifications, marketing assets, and future documentation workspace for **CubyCloud** (`../cubycloud`), a self-hosted cloud storage and file management platform.

---

## Project Overview

`cubycloud-page` is a dedicated workspace for designing and prototyping the official CubyCloud marketing website, documentation portal, and interactive product presentations.

- **Source Product Repository:** `../cubycloud` (read-only reference)
- **Role:** Marketing website design, UI/UX specification, interactive FigCraft prototyping, and technical documentation authoring.
- **Relationship:** Decoupled from the core Go/SvelteKit application repository to enable iterative design, copywriting, and marketing development without impacting core backend and drive stability.

---

## Current Project Phase

**PHASE 0: UI/UX Design & Prototype Preparation**

- **Status:** Scaffolding & specification only.
- **Implementation Gate:** No frontend source code, framework initialization, package installations, or build scripts are permitted in this phase.
- **Design Gate:** No `.figcraft` binary files or mock graphics have been committed yet; canvas creation begins only after design specification sign-off.

---

## Planned Technology Stack

The future marketing and documentation website is planned to use the following architecture (to be initialized only upon user authorization in a future phase):

| Layer | Planned Technology | Role / Purpose | Status |
| :--- | :--- | :--- | :--- |
| **Framework** | **Astro** (Content-driven SSG) | Ultra-fast static rendering, zero client-side JS by default | *Planned* |
| **UI Components** | **React Islands** + **shadcn/ui** | Interactive interactive widgets, dialogs, and navigation | *Planned* |
| **Styling** | **Tailwind CSS v4** | Consistent utility-first layout implementing the Flat Earthy design system | *Planned* |
| **Animation** | **GSAP + ScrollTrigger** | High-performance interactive scroll animations and timeline transitions | *Planned* |
| **Documentation** | **Starlight** (Astro integration) | Structured Markdown/MDX documentation with search and sidebar navigation | *Planned* |
| **Deployment** | **Static Hosting (Cloudflare Pages)** | Global edge deployment, fast asset delivery, zero maintenance | *Planned* |

*Note: None of the above libraries or packages are installed at this time.*

---

## Repository Structure

```text
cubycloud-page/
├── README.md                      # Workspace overview, status, and planned stack (this file)
├── AGENTS.md                      # Operational rules and execution constraints for AI agents
├── FIGCRAFT.md                    # FigCraft MCP operational guide, tool references, and workflows
├── DESIGN.md                      # Frontend Design System source of truth (colors, typography, components)
├── BRIEF.md                       # Product positioning, target audience, and marketing objectives
├── PAGES.md                       # Information architecture, sitemap, wireframe layout specs
├── CONTENT.md                     # Marketing copywriting, feature messaging, and microcopy
├── MOTION.md                      # Motion guidelines, scroll choreographies, GSAP transition specs
├── PROTOTYPE.md                   # Interactive prototype specs, user flows, and state transitions
├── DECISIONS.md                   # Architectural and UI/UX design decision record
│
├── design/                        # Native design files and exports
│   └── exports/                   # Static visual renders from FigCraft
│       ├── desktop/               # Desktop viewport screen exports (1440px)
│       └── mobile/                # Mobile viewport screen exports (390px)
│
├── assets/                        # Static media assets
│   ├── brand/                     # Official logos, favicons, vector marks, and lockups
│   └── product/                   # High-fidelity screenshots and interface captures
│
└── references/                    # Benchmark documentation and inspiration
    ├── visual-references.md       # Visual styling benchmarks, moodboards, and UI references
    └── motion-references.md       # Animation timing references, easing curves, and interaction ideas
```

---

## Design Workflow

All design and development progress strictly follows this phased sequence:

```
[1. Discovery] ──> [2. Design Specs] ──> [3. Desktop Wireframes] ──> [4. Desktop Hi-Fi]
                                                                            │
[7. Mobile Proto] <── [6. Mobile Adaptation] <── [5. Desktop Prototype & Motion]
       │
       v
[8. Docs UI Design] ──> [9. Stakeholder Approval] ──> [10. Frontend Implementation]
```

1. **Repository Discovery:** Inspect core product features, architecture, and existing design tokens from `../cubycloud`. *(Complete)*
2. **Design Specifications:** Define page briefs, content strategy, motion rules, and information architecture across Markdown specs. *(In Progress)*
3. **Desktop Wireframes:** Construct structural page layouts and content hierarchy in native FigCraft frames.
4. **Desktop High-Fidelity Screens:** Apply the Flat Earthy palette, Montserrat typography, and flat component surfaces.
5. **Desktop Animation & Prototype:** Wire interactive component states and click-through flows.
6. **Mobile Adaptation:** Reflow desktop layouts to mobile viewports (390px width) with thumb-friendly touch targets.
7. **Mobile Prototype:** Connect mobile menu overlays, drawer states, and responsive navigation flows.
8. **Documentation UI Design:** Craft Starlight layout themes, search modals, and syntax highlighting surfaces.
9. **Design Approval:** Conduct comprehensive visual, contrast, and accessibility review.
10. **Frontend Implementation:** Scaffold Astro + React + Tailwind + GSAP project upon explicit user authorization.

---

## Sources of Truth

- **Core Product Source:** `../cubycloud` (read-only authority on product behavior, architecture, and implemented features).
- **Visual Design System:** `cubycloud-page/DESIGN.md` (authoritative tokens for colors, typography, border styling, and buttons).
- **Operational Directives:** `cubycloud-page/AGENTS.md` (strict boundaries and protocol for AI/developer agents).
- **Design Tooling Reference:** `cubycloud-page/FIGCRAFT.md` (MCP tool mapping and design file management).

---

## Current Status

- Workspace scaffolded with standard directory hierarchy.
- Foundational operational specifications (`README.md`, `AGENTS.md`, `FIGCRAFT.md`) generated from validated local discovery.
- Design placeholder specifications initialized for upcoming phases.
- Zero code dependencies installed; zero fake assets committed.
