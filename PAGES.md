# PAGES.md — CubyCloud Website Structure

> **Status:** Approved information architecture; individual copy, artwork, and motion require separate approval.
> **Purpose:** Define the marketing sitemap, page/section responsibilities, navigation, documentation hierarchy, and required FigCraft screens.
> **Read with:** `BRIEF.md` (positioning and claims), `DESIGN.md` (visual system), `CONTENT.md` (copy), `MOTION.md` (animation), `PROTOTYPE.md` (interactions), `FIGCRAFT.md` (workflow).

## 1. Confirmed Decisions

| Dimension | Decision |
| --- | --- |
| Website scope | **Single Landing Page + Docs** |
| Homepage narrative | **Product-First Storytelling** |
| Feature coverage | **Core Features + Supporting Highlights** |
| Documentation | **Complete User & Administrator Docs** |
| Homepage navigation | **Immersive Chapter Navigation** |
| Mobile experience | **Mobile-Native Storytelling** |

## 2. Site Map and Route Contract

```text
/                              Marketing homepage (all marketing content)
  #files                       Chapter 01: File Management
  #sharing                     Chapter 02: File Sharing
  #storage                     Chapter 03: Local + S3 Storage
  #self-hosting                Chapter 04: Self-Hosting & Open Source
  #get-started                 Final conversion section
/docs/                         Branded Starlight documentation home
/docs/getting-started/         Introduction, requirements, installation, first run
/docs/deployment/              Hosting, HTTPS, upgrades, backups, operations
/docs/user-guide/              File management and everyday workflows
/docs/sharing/                 Internal/public sharing and Organization drive
/docs/administration/          Storage nodes, quotas, users, system settings
/docs/troubleshooting/         Common problems, diagnostics, FAQ
/docs/reference/               Architecture, security guidance, API/OpenAPI
```

- The `/docs/` branches are planned content groups, **not** a claim that every article or route exists yet; finalize individual Starlight slugs with the actual documentation content.
- **No separate** Features, Pricing, Download, About, Changelog, or Community marketing pages in this scope.
- Product GitHub is an **external destination**: https://github.com/septian-padli/cubycloud.
- Launch in English; prepare layouts for future Indonesian translation without displaying an inactive language selector.

## 3. Homepage Content Map (Top to Bottom)

| Order / region | Visitor objective | Content and design responsibility | Action |
| --- | --- | --- | --- |
| 00 · Hero & product preview | Understand the product immediately | Bold positioning, real file-drive UI preview, brand tagline, accessible orientation to the page | **Get Started**, View on GitHub |
| 01 · File Management `#files` | See how a team manages files | Immersive, credible explorer demonstration: folders, uploads, organization, everyday file actions | Explore workflow / jump ahead |
| 02 · File Sharing `#sharing` | Understand collaboration and sharing | Internal Viewer/Editor sharing, public links with optional password, and accurately described shared Organization drive | Sharing docs |
| 03 · Local + S3 Storage `#storage` | Understand the key differentiator | Diagram connecting one file-drive experience to local filesystem and optional S3-compatible storage; distinct but consistent visuals | Storage docs |
| 03b · Supporting feature highlights | Discover useful breadth without feature overload | Compact grid or staged showcase: previews, resumable uploads, search/starred/trash, administrator essentials (verify each) | Relevant docs links |
| 04 · Self-Hosting `#self-hosting` | Trust the deployment model | Single-container Go + embedded web UI + SQLite; browser-based first setup; operator-controlled hosting, honest operational requirements | Installation / architecture docs |
| 04b · Open source & trust | Validate credibility | GitHub source, AGPL license, verified architecture and product screenshots; no fictitious testimonials or unmeasured benchmarks | View on GitHub |
| 04c · Practical FAQ `#faq` | Clarify essentials before installing | Five practical questions (requirements, storage, sharing, organization access, license); accessible accordion | Relevant docs / FAQ |
| 05 · Get Started `#get-started` | Take the next step | Clear install proposition, concise prerequisite overview, unmissable documentation CTA | **Get Started** |
| Footer | Find reliable destinations | Documentation, GitHub, license, security and contribution references where verified | Navigate to resource |

- The sequence is **product → core capability → supporting value → storage flexibility → self-hosting proof → install**, not a long infrastructure-first pitch.
- Chapters **01–04** are the main immersive navigation stops; hero, highlight sub-sections, final CTA, and footer are supporting regions rather than competing chapter entries.
- The hero, three core showcases, and final CTA deserve the most visual attention. Supporting highlights must stay scannable.
- Product screenshots and interactions must reflect actual CubyCloud behavior. The Organization drive is a shared tree for authenticated users; **do not depict granular team/group permissions**.
- Every chapter must make sense as a static section when animation is disabled or skipped.

## 4. Navigation and Conversion

### Desktop: Immersive Chapter Navigation

- Provide a persistent, discoverable way to navigate chapters: numbered labels **01 Files / 02 Sharing / 03 Storage / 04 Self-Hosting**, current chapter state, and reading progress.
- Chapter transitions may be expressive, but normal scroll, keyboard movement, and direct anchor navigation must remain functional.
- Ensure direct access to **Get Started** and **Docs** regardless of scroll position; GitHub is secondary.
- Support browser back/forward, reloadable anchor URLs, clear focus states, and sensible scroll offset for sticky UI.
- Do not trap visitors in a chapter, force them to finish an animation, or replace basic navigation with gestures alone.

### CTA Rules

- **Primary:** `Get Started` → the canonical Starlight installation article (proposed `/docs/getting-started/installation/`; confirm when published).
- **Secondary:** `View on GitHub` → https://github.com/septian-padli/cubycloud.
- Contextual CTAs may lead to relevant docs sections, but must never compete visually with the primary installation action.
- Do not add a demo, pricing, signup, or download CTA unless a matching real destination is available and approved.

## 5. Mobile-Native Storytelling

- Design mobile as its **own composition and pacing**, retaining the same product facts, section order, and CTA hierarchy.
- Rebuild wide desktop scenes as stacked, swipe/tap-friendly cards, cropped-but-accurate product details, and legible storage diagrams.
- Replace desktop chapter controls with a compact **chapter indicator + tap-to-jump menu**; keep a visible path to Docs and Get Started.
- Use native vertical scrolling. Do not make horizontal swiping, hover, cursor motion, or scroll pinning necessary to understand content.
- Give each main chapter a recognizable opening and completion state without forcing full-screen panels on short devices.
- Keep interactive elements touch-accessible, maintain safe areas, prevent horizontal overflow, and validate narrow screens down to **320 px**.
- Provide reduced-motion and lightweight-device alternatives with all content and actions still available.

## 6. Starlight Documentation Hierarchy

```text
Getting Started
  Overview · Requirements · Installation · First-Run Setup & Recovery
Deployment & Operations
  Docker Compose · Networking / Reverse Proxy / HTTPS · Upgrade · Backup & Restore
User Guide
  File Explorer & Folders · Upload & Download · Previews · Search / Starred / Trash
Sharing & Organization
  Internal Sharing (Viewer/Editor) · Public Links · Organization Drive & Access Model
Storage & Administration
  Local Storage · S3-Compatible Storage · Storage Nodes · Quotas · Users & Settings
Troubleshooting
  Common Errors · Health & Diagnostics · FAQ
Reference
  Architecture · Security & Limitations · API / OpenAPI
```

- Organize the sidebar by **reader task** (install, use, share, administer, troubleshoot), not by internal source-code modules.
- Documentation homepage: explain the product briefly and offer prominent pathways for first-time installers, everyday users, and administrators.
- Documentation article template: left sidebar, readable main content, on-page table of contents, breadcrumbs where helpful, search, code-copy, previous/next navigation, and contextual callouts.
- Keep docs navigation conventional and accessible, including mobile menu and long-page reading states; **no immersive scroll story inside documentation**.
- Each article should cite or translate verified material from the main repo; distinguish implemented behavior from planned PRD features.
- External developer/contribution resources may link to the source repository rather than becoming separate marketing pages.

## 7. Required FigCraft Screens and States

| Design group | Minimum deliverables |
| --- | --- |
| Desktop marketing (1440 px) | Full homepage; hero; chapters 01–04; supporting highlights; final CTA; chapter-navigation states; menu/overlay states |
| Mobile marketing (390 px) | Re-composed full homepage; compact chapter navigation; tap-to-jump menu; key product/showcase states; mobile CTAs |
| Desktop Starlight | Documentation home; installation article with code; regular feature guide; architecture/reference article; sidebar/search states |
| Mobile Starlight | Documentation home; long article; menu open/closed; search; code overflow/copy and callout states |
| Cross-cutting | Light/dark treatments, keyboard focus, reduced-motion storyboard, long-copy resilience, responsive constraints |

- Check intermediate/tablet layouts and 320 px screens even if the primary editable frames are 1440 px and 390 px.
- Use native, editable FigCraft frames/components/variants, not flattened images; use actual or verified product visuals.
- Prototype links, menus, tab changes, basic navigation, and key scene-to-scene states where FigCraft supports them.
- **Prototype limitation:** Continuous GSAP-style scroll scrubbing, real pinned timelines, cursor physics, and complex morphing may not be faithfully executable in FigCraft. Represent them as named keyframes, storyboards, and notes for `MOTION.md` / `PROTOTYPE.md`; never label a static transition as a working production effect.
- Export and review both desktop and mobile proof frames before treating the information architecture as visually validated.

## 8. Ownership and Boundaries

- `PAGES.md` owns **what pages/sections exist, their sequence, navigation, and destination relationships**.
- `CONTENT.md` owns final headlines, body copy, labels, FAQ content, and SEO text.
- `DESIGN.md` owns colors, typography, layout rules, responsiveness, and accessibility standards.
- `MOTION.md` and `PROTOTYPE.md` own precise animation triggers, interaction mapping, and prototype acceptance criteria.
- **Design phase only:** Do not scaffold or implement Astro, React, Tailwind, GSAP, Starlight, or deployment from this document.
