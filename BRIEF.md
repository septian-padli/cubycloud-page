# BRIEF.md — CubyCloud Website Product Brief

> **Status:** Approved strategic direction; copy and page structure remain subject to review.
> **Purpose:** Guide the official CubyCloud marketing website, Starlight documentation, and FigCraft design work.
> **Scope:** Product positioning and communication, not UI specifications or implementation instructions.
> **Companion documents:** `DESIGN.md`, `PAGES.md`, `CONTENT.md`, `MOTION.md`, `PROTOTYPE.md`, `FIGCRAFT.md`, `DECISIONS.md`.

## 1. Product Identity

- **Product:** CubyCloud.
- **Category:** Open-source, self-hosted file drive.
- **Positioning:** **Simple Self-Hosted File Drive**.
- **Tagline:** **Your files. Your server. Your rules.**
- **Core promise:** A straightforward place for small teams to organize, access, and share files on infrastructure they control.
- **Open-source license:** AGPL-3.0-or-later, as stated in the product repository; verify current license text before publication.
- **Product repository:** https://github.com/septian-padli/cubycloud
- **Website workspace:** `cubycloud-page`, separate from the main application.

## 2. Audience and Problem

### Primary audience: Small Teams & Organizations

- Small teams and organizations that want a shared, browser-based file drive operated on their own server.
- **Technical decision-maker:** The person responsible for installation, storage configuration, maintenance, and access.
- **Everyday user:** A colleague who needs familiar file organization, browsing, uploads, downloads, and sharing without learning infrastructure concepts.
- Treat self-hosting knowledge as an installation requirement; do not imply CubyCloud is a managed cloud service.

### Secondary audience

- Homelab operators, developers, system administrators, and privacy-conscious individuals.
- Include their technical concerns without allowing infrastructure jargon to dominate the homepage.

### Problems to address

- File storage and sharing can become unnecessarily complicated for a small team.
- Teams want familiar file-drive workflows while retaining control over where data is stored.
- Managing local disks and optional object storage through separate interfaces adds friction.
- These are positioning hypotheses, not quantified customer research findings.

## 3. Value Proposition and Differentiation

**Primary value: Simple Team File Management**

- Present CubyCloud first as an approachable way to store, organize, access, and share team files.
- Lead with the experience, not framework names, database details, or deployment commands.

**Primary differentiator: Flexible Local + S3 Storage**

- Explain that CubyCloud supports local filesystem storage and optional S3-compatible object storage.
- Show the storage flexibility through truthful product visuals and clear diagrams.
- Do not imply automatic replication, cross-provider migration, file synchronization, or redundancy unless verified.

**Supporting value pillars**

1. **Self-hosted ownership:** Run the file drive on infrastructure controlled by its operator.
2. **Focused experience:** File management, previews, sharing, and practical administration rather than an all-purpose productivity suite.
3. **Simpler runtime architecture:** Go server with embedded SvelteKit frontend and SQLite; no separate database server is required for the standard deployment.

## 4. Product Proof Points

Use verified application behavior as evidence, subject to rechecking the current release:

| Area | Grounded capability | Safe presentation |
| --- | --- | --- |
| Personal files | My Storage, folders, uploads, file actions, trash, starred items | Show actual file-drive UI |
| Shared files | Organization shared drive and internal Viewer/Editor sharing | Explain the current access model accurately |
| External sharing | Public links with optional password protection | Demonstrate a real share flow |
| Storage options | Local nodes plus optional S3-compatible storage | Show an accurate storage architecture diagram |
| File experience | Browser previews and resumable My Storage uploads | Use real screenshots and supported workflows |
| Administration | Storage nodes, user quotas, system settings, usage | Present genuine administrator views |
| Deployment | Single-container packaging and browser-based initial setup | Link to tested installation instructions |

**Important permission boundary:** The current Organization drive is a common shared tree for authenticated users, not isolated team workspaces with group-based permissions. Never imply fine-grained organizational roles, enterprise governance, or per-team access control.

## 5. Website Objectives and Calls to Action

**Primary goal:** Help a qualified visitor start installing CubyCloud on their own infrastructure.

- **Primary CTA:** `Get Started` → official Starlight installation guide.
- **Secondary CTA:** `View on GitHub` → product source repository.
- **Supporting paths:** Explore features, understand storage choices, read architecture/requirements, and consult documentation.
- Do not feature `Try Live Demo` as a primary action unless a working public demo exists.
- Track meaningful outcomes later: installation-guide visits, GitHub clicks, and completion of the getting-started journey where measurable.
- Do not invent conversion rates, download counts, testimonials, adoption figures, or customer logos.

## 6. Messaging and Brand Voice

**Voice: Bold & Disruptive.**

- Be assertive, concise, memorable, and product-led.
- Challenge unnecessary complexity, not users or competitors personally.
- Favor short, high-impact headlines supported by precise explanatory copy.
- Use direct verbs and specific benefits; avoid vague SaaS clichés and empty superlatives.
- Be provocative in framing but conservative in factual claims.
- Never state that CubyCloud is faster, lighter, safer, easier, or better than a named competitor without comparable evidence.
- **Messaging hierarchy:** simple team file drive → local/S3 flexibility → ownership and operational simplicity → technical proof.
- Preserve the tagline; final hero headline and all section-level copy belong in `CONTENT.md`.

## 7. Language and Reach

- **Launch language:** English for the marketing website and documentation.
- **Future localization:** Indonesian, after the English experience is approved.
- Use plain international English; explain necessary self-hosting terms clearly.
- Design navigation, CTAs, layouts, and documentation structures so translated strings can expand.
- Do not display a functioning Indonesian language switcher until translated content actually exists.

## 8. Product Claims and Trust Rules

- **Source of truth:** Confirm important claims against the current CubyCloud README, implementation, tests, release artifacts, and docs; the PRD describes requirements, not proof of delivery.
- **No unsupported performance claims:** RAM usage, container size, speed, resource efficiency, scalability, and setup time require reproducible measurements and appropriate context before being promoted.
- **No security exaggeration:** Self-hosting does not equal end-to-end encryption, automatic privacy, or protection against operator misconfiguration.
- **No invented capabilities:** Do not advertise file version history, native desktop/mobile sync, real-time office co-editing, advanced team/group permissions, or AI features without verified delivery.
- **No fictional UI:** Marketing illustrations can be conceptual, but product screenshots, dialogs, settings, and flows must accurately depict the application.
- **No false launch status:** Validate current images, download paths, release versions, and installation instructions before publishing CTAs.
- **Open-source transparency:** Link to the actual license, security policy, contribution guide, and source code when available.

## 9. Design and Delivery Boundaries

- **Visual source of truth:** `DESIGN.md` (Creative Editorial, strict CubyCloud brand palette, expressive display typography, immersive layout).
- **Marketing motion:** Fully Interactive & Experimental, with reduced-motion, touch, and lower-power alternatives; detailed behavior belongs in `MOTION.md`.
- **Documentation:** Branded Starlight, optimized for readability and navigation rather than immersive effects.
- **Design workflow:** FigCraft desktop-first, then mobile; use editable native components and prototype supported interactions.
- **Current phase:** UI/UX design and prototyping only. Do not initialize Astro, React, shadcn/ui, GSAP, Starlight, backend, or hosting until implementation is authorized.
- **Future planned stack:** Astro + React islands + customized shadcn/ui + Tailwind CSS 4 + GSAP + Starlight, statically hosted.
- **Out of scope for this brief:** Final sitemap, exact marketing copy, motion timelines, prototype wiring, and code architecture; define them in their dedicated documents.

## 10. Source References

- Product overview and features: `../cubycloud/README.md`
- Product requirements and limitations: `../cubycloud/docs/prd.md`
- Technical architecture: `../cubycloud/docs/architecture.md`
- Product design language: `../cubycloud/apps/frontend/DESIGN.md`
- Current license: `../cubycloud/LICENSE`
- Website-specific visual decisions: `DESIGN.md`
