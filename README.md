# CubyCrate Website

Website and documentation for [CubyCrate](https://cubycrate.com) — a lightweight, open-source, self-hosted file drive for teams.

> **Repository:** `septian-padli/cubycloud-page`  
> **Product Repository (Read-Only):** [`septian-padli/cubycloud`](https://github.com/septian-padli/cubycloud)  
> **Brand Identity:** Public presentation uses **CubyCrate**. Existing runtime identifiers (`cubycloud`, `ghcr.io/septian-padli/cubycloud`, `cubycloud_data`, `cubycloud.db`) remain preserved per [`BRAND.md`](BRAND.md) for backward compatibility.

---

## Current Architecture

The website is built on **Astro 7 (SSG)** with **React Islands**, **Starlight Documentation**, and **Cloudflare Workers Static Assets**:

- **Marketing Landing Page (`/`):** Prerendered Astro template (`src/pages/index.astro`) providing full initial static HTML for SEO (H1, section headings, marketing copy, FAQ, CTA, Open Graph, Twitter Cards, and Schema.org JSON-LD structured data). Interactive surfaces (GSAP ScrollTrigger, Three.js / React Three Fiber Storage Core scene, File Explorer demo, Sharing simulation, and Storage Selector) hydrate seamlessly as a client island.
- **Documentation (`/docs/`):** Native Starlight documentation system located at `src/content/docs/docs/`, providing 7 structured technical articles, responsive navigation, dark/light theme switching, and local client search powered by Pagefind.
- **Edge Deployment & SEO Routing:** Cloudflare Worker (`worker/index.ts`) serving static assets from `dist/` with dynamic environment handling:
  - 301 permanent redirect from `www.cubycrate.com` to apex `https://cubycrate.com`.
  - Production `robots.txt` (`Allow: /` and sitemap declaration).
  - Automatic `X-Robots-Tag: noindex, nofollow, noarchive` header on staging, preview, and `*.workers.dev` deployments to prevent duplicate indexation.

---

## Development & Verification

### Prerequisites
- Node.js 20+ (recommended: Node.js 22 LTS or newer)
- pnpm 9+

### Commands

```sh
# Install dependencies
pnpm install

# Start local Astro development server
pnpm dev

# Typecheck Astro, React, and TypeScript files
pnpm check

# Build production static output & patch Pagefind
pnpm build

# Preview built production output locally
pnpm preview

# Run automated test suite (worker routing & static asset checks)
pnpm test

# Verify Cloudflare Worker static assets bundle (dry-run)
pnpm exec wrangler deploy --dry-run
```

---

## Source Map

| Path | Description |
| --- | --- |
| `src/pages/index.astro` | Astro static entrypoint with prerendered SEO metadata, structured data, and hydrated React island |
| `src/pages/robots.txt.ts` | Static/prerendered `robots.txt` endpoint generating production policy and sitemap reference |
| `src/App.tsx` | Main marketing experience and GSAP ScrollTrigger timeline context |
| `src/components/HeroExperience.tsx` | Hero progress, procedural motion, and coordinate-driven token handoff |
| `src/components/StorageCoreScene.tsx` | Three.js / React Three Fiber interactive procedural 3D core with WebGL detection |
| `src/components/NarrativeThread.tsx` | SVG coordinate-driven narrative connector between chapters |
| `src/components/FileExplorerDemo.tsx` | Synthetic interactive file explorer demo |
| `src/components/SharingDemo.tsx` | Synthetic interactive sharing and access permissions demo |
| `src/components/StorageSelectorDemo.tsx` | Synthetic interactive storage backend topology demo |
| `src/components/Sections.tsx` | Semantic marketing sections (Files, Sharing, Storage, Self-Hosting, Open Source, FAQ, CTA, Footer) |
| `src/content/docs/docs/` | Starlight Markdown/MDX documentation articles |
| `worker/index.ts` | Cloudflare Worker entrypoint for asset routing, 301 redirect, and staging `noindex` protection |
| `scripts/audit-lighthouse.mjs` | Automated 3-run median Lighthouse audit runner (desktop & mobile) |
| `scripts/generate-og-image.mjs` | Automated official 1200×630 Open Graph card generator |
| `public/logos/` | Official owner-approved CubyCrate vector logo family (WebP/SVG exports) |

---

## Documentation Routes

Starlight documentation is mounted at `/docs/` with canonical URLs:

1. `/docs/` — Introduction & Architecture Concepts
2. `/docs/getting-started/installation/` — Docker Compose Deployment & First-Time Setup
3. `/docs/getting-started/configuration/` — Reverse Proxy Configuration (Caddy & Nginx)
4. `/docs/user-guide/file-management/` — Navigation, File Actions & Uploads
5. `/docs/user-guide/sharing/` — Internal Access & Password-Protected Public Links
6. `/docs/administrator-guide/backup-restore/` — Backup & Disaster Recovery
7. `/docs/troubleshooting/` — Operational Diagnostics & Health Verification

---

## Deployment & Branch Workflow

1. **Development:** All work happens on scoped feature branches created from `main`. Direct commits to `main` are strictly forbidden.
2. **Quality Gates:** Every PR must pass `pnpm check`, `pnpm build`, `pnpm test`, and `pnpm exec wrangler deploy --dry-run`.
3. **Staging / Preview:** Preview deployments on `*.workers.dev` automatically serve `X-Robots-Tag: noindex, nofollow, noarchive` and a restrictive `robots.txt`.
4. **Production Release:** Merging to `main` and production cutover require explicit repository owner authorization.

---

## Governing Contracts

- [`AGENTS.md`](AGENTS.md) — Operational boundaries, safety rules, and context routing.
- [`BRAND.md`](BRAND.md) — Official CubyCrate brand identity contract and technical identifier protection.
- [`MIGRATION_CONTRACT.md`](MIGRATION_CONTRACT.md) — Architecture preservation requirements, invariants, and rollback procedures.
- [`DECISIONS.md`](DECISIONS.md) — Approved, open, and superseded decision register.
- [`DESIGN.md`](DESIGN.md) & [`MOTION.md`](MOTION.md) — Visual design tokens, motion tiers, and Three.js / GSAP lifecycles.
