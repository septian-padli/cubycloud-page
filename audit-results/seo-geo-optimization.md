# CubyCrate — One-Shot SEO & GEO Optimization Audit Report

**Date:** 2026-11-08  
**Website Repository:** `septian-padli/cubycloud-page`  
**Product Repository (Read-Only):** `septian-padli/cubycrate`  
**Canonical Domain:** `https://cubycrate.com`  
**Architecture:** Astro 7 SSG, React Islands, Starlight Documentation, Cloudflare Workers  
**Branch:** `feat/seo-geo-optimization`  
**Baseline Commit SHA:** `5b079587a80b587a81093ee9eb4bc2a452ef3493` (`5b07958`)  
**Overall Status:** **PASS**

---

## 1. Baseline Reference & Git Integrity

- **Baseline Commit:** `5b07958` ("Merge pull request #7 from septian-padli/docs/simplify-compose-install")
- **Target Branch:** `feat/seo-geo-optimization`
- **Isolation & Safety:**
  - Branch was cut cleanly from baseline commit.
  - Sibling product repository `../cubycrate` was accessed in strictly read-only mode (zero files modified, staged, or committed).
  - Pre-existing local working tree state (`deleted: design/cubycloud-page.figcraft`, `deleted: design/ui-design.figcraft`) was preserved without modification or force actions.
  - Zero destructive Git operations executed; no remote push, merge, or production deployment performed.

---

## 2. Initial SEO & GEO Findings (Discovery)

Before implementation, a parallel read-only discovery was executed by Scout A (Technical SEO) and Scout B (Content, GEO & Documentation). The baseline exhibited the following core defects:

1. **Schema.org Validation Bug:**
   - `src/pages/index.astro:51` had `"operatingSystem": "Linux, Docker"`. Docker is a container virtualization runtime, not an operating system. This polluted Schema.org structured data and confused AI engine entity extraction.
   - `tests/static-output.test.mjs:31` locked in this exact bug with `assert.match(content, /"operatingSystem":\s*"Linux,\s*Docker"/)`.
2. **Missing GEO & Rich-Result Structured Data:**
   - `SoftwareApplication` lacked authoritative technical fields required by generative search systems (Perplexity, ChatGPT, Claude, Gemini): `softwareVersion`, `downloadUrl`, `codeRepository`, `sameAs`, `storageRequirements`, and `memoryRequirements`.
3. **Open Graph & Discovery Gaps:**
   - Homepage `<head>` lacked `<meta property="og:site_name" content="CubyCrate" />` and `<meta property="og:locale" content="en_US" />`.
   - Homepage lacked autodiscovery link tag for the sitemap (`<link rel="sitemap" href="/sitemap-index.xml" />`).
4. **404 Soft-Indexing Hazard:**
   - `src/content/docs/404.md` generated a static `dist/404.html` with a canonical URL tag but without `<meta name="robots" content="noindex, nofollow" />`, risking search engine indexation of error responses.
5. **Outdated Homepage Footer:**
   - Footer displayed obsolete design-phase placeholder: `<span>AN INDEPENDENT LANDING PAGE EXPERIMENT</span>`.
6. **Documentation Coverage & Entity Depth:**
   - The documentation contained only 7 basic overview articles.
   - High-value architectural topics that operators search for were missing: single-container architecture tradeoffs, local disk vs S3 object storage mechanics, and production Docker deployment & backup hardening.
   - Formal project attribution (`/docs/about/`) and verified release history (`/docs/changelog/`) were absent.
7. **Technical Documentation Discrepancy:**
   - `src/content/docs/docs/getting-started/configuration.mdx` incorrectly claimed `/health` and `/api/health` had different scopes (listener ping vs deep DB check). Source analysis of `../cubycrate/apps/backend/cmd/server/main.go` confirmed both endpoints share identical deep verification logic.

---

## 3. Changes Implemented & Rationale

### A. Homepage & Technical SEO (`src/pages/index.astro`)
- **Schema.org Correction:** Changed `operatingSystem` to `"Linux"`.
- **Software Requirements Specification:** Added exact requirement: `"Docker Engine >= 24.0, Docker Compose >= 2.20"`.
- **Entity Enrichment:** Injected `"softwareVersion": "v0.0.1-alpha.2"`, `"downloadUrl": "https://github.com/septian-padli/cubycrate/pkgs/container/cubycrate"`, `"codeRepository": "https://github.com/septian-padli/cubycrate"`, `"sameAs": ["https://github.com/septian-padli/cubycrate"]`, `"storageRequirements": "Local filesystem storage or S3-compatible object storage"`, and `"memoryRequirements": "30-50 MB RAM baseline idle footprint"`.
- **Social Graph & Sitemap Discovery:** Added `og:site_name`, `og:locale`, and `<link rel="sitemap" href="/sitemap-index.xml" />`.
- **Rule Compliance:** Preserved title, canonical URL, and description; explicitly omitted `FAQPage` schema per instructions.

### B. Visual Identity & Hero Preservation (`src/components/HeroExperience.tsx`)
- **Non-Negotiable Invariant:** Preserved hero H1 verbatim: `YOUR FILES.<br /><em>YOUR SPACE.</em>`.
- **Layout & Motion Preservation:** All GSAP ScrollTrigger configurations, canvas aura classes, Three.js coordinates, and responsive styling remain completely unchanged.
- **Supporting Copy Optimization:** Enhanced supporting copy with factual, product-led technical entities (Go backend, embedded Svelte 5 web interface, SQLite WAL engine, single Alpine container <150 MB, local disks or S3-compatible buckets).

### C. Homepage Core Sections (`src/components/Sections.tsx`)
- **Files Section:** Clarified folder workflows, browser streaming, and resumable TUS chunked uploads directly to the server.
- **Storage Section:** Specified local NVMe/SATA host storage and S3-compatible storage (AWS S3, MinIO, Cloudflare R2) with zero automatic replication lock-in.
- **Self-Hosting Section:** Clarified Go 1.25 API, embedded SvelteKit frontend, single Alpine container under 150 MB, SQLite WAL mode, zero external DB dependencies.
- **Supporting Highlights:** Updated file preview highlight to include audio, code, PDF, image, and video formats.
- **FAQ Updates:** Updated answers across all 5 questions to provide concrete, verified technical answers (Docker 24+, Compose 2.20+, architectures linux/amd64 and linux/arm64, persistent `/app/data` volume; independent storage choices without replication; Viewer/Editor registered sharing and password-protected public links; single shared Organization tree; AGPLv3 Section 13 network copyleft). Exactly 5 questions preserved.
- **Footer Replacement:** Replaced `"AN INDEPENDENT LANDING PAGE EXPERIMENT"` with `"OPEN-SOURCE SELF-HOSTED FILE DRIVE · RELEASED UNDER AGPL-3.0"`. Added direct links to `/docs/` and `/docs/about/`.

### D. 404 Bot Protection (`src/content/docs/404.md`)
- Added `head` frontmatter with `<meta name="robots" content="noindex, nofollow" />` ensuring search engines do not index 404 pages.

### E. Three New Starlight Technical Guides (`src/content/docs/docs/guides/`)
1. **`self-hosted-file-storage.mdx` (`/docs/guides/self-hosted-file-storage/`):**
   - Answers: *Why choose a focused, single-container self-hosted file drive over monolithic suites (Nextcloud/ownCloud) or proprietary cloud storage (Google Drive/Dropbox), and how does CubyCrate operate without external database servers or microservices?*
   - Includes architectural comparison matrix, Go + SvelteKit 5 + SQLite WAL runtime model, workspace paradigm (My Storage vs Organization), data sovereignty guarantees under AGPL-3.0, and operational requirements.
2. **`local-vs-s3-storage.mdx` (`/docs/guides/local-vs-s3-storage/`):**
   - Answers: *How do local filesystem storage and S3-compatible object storage differ in CubyCrate, how do browser upload paths work for each, and how does the live node detach migration engine operate?*
   - Details POSIX vs S3 drivers, TUS chunking protocol vs direct presigned transfers (distinguishing single PUT for < 100 MiB from presigned multipart for >= 100 MiB with 16 MiB parts up to 10,000 parts), AES-256-GCM envelope encryption for S3 credentials, server bandwidth isolation (direct individual downloads bypass server, batch/folder ZIP downloads route through server), asynchronous node migration pipeline, and orphan file reconciliation safeguards.
3. **`docker-deployment-checklist.mdx` (`/docs/guides/docker-deployment-checklist/`):**
   - Answers: *What is the definitive production checklist for deploying, securing, reverse-proxying, and maintaining CubyCrate with Docker Compose on Linux amd64 and arm64 servers?*
   - Covers host and Docker prerequisites, production Compose configuration, named volume persistence invariant (`cubycrate_data:/app/data`), hazard warning against `docker compose down -v`, reverse proxy TLS termination with unbuffered SSE (`/api/v1/events`), `/health` probe semantics (`db.PingContext` + storage node checks), automated cold volume backup script, secondary mount backup precautions, and zero-downtime upgrades.

### F. Project Identity & Governance Pages (`src/content/docs/docs/`)
1. **`about.mdx` (`/docs/about/`):**
   - Defines official project identity, maintainer Septian Padli, technology stack (Go 1.25, Svelte 5, SQLite WAL via `glebarez/go-sqlite`, Tailwind CSS 4, Alpine Linux), AGPL-3.0 Section 13 network copyleft rules, and clear boundary definitions (what CubyCrate is and is not).
2. **`changelog.mdx` (`/docs/changelog/`):**
   - Documents verified release history for `v0.0.1-alpha.2` (first official CubyCrate release) and `v0.0.1-alpha.1` (historical pre-release under CubyCloud), including the clean break architecture notice.

### G. Shared Navigation & Configuration (`astro.config.mjs`)
- Integrated all 5 new articles into the Starlight documentation sidebar under `Guides` and `Project` groups.
- Added `og:site_name: "CubyCrate"` to documentation `<head>`.

### H. Configuration Article Accuracy (`src/content/docs/docs/getting-started/configuration.mdx`)
- Corrected description of `/health` and `/api/health` to reflect identical deep connectivity verification returning HTTP 503 if database or storage nodes fail.

### I. Test Suite Modernization (`tests/static-output.test.mjs`)
- Updated Schema assertion to test `operatingSystem: "Linux"` and full `softwareRequirements: "Docker Engine >= 24.0, Docker Compose >= 2.20"`.
- Added assertion verifying `dist/404.html` contains `<meta name="robots" content="noindex, nofollow" />`.
- Expanded documentation route validation from 7 to 12 pages with canonical tag verification.

---

## 4. Product Evidence & Factual Boundaries

All content and technical claims were audited and validated against the read-only sibling repository `../cubycrate`:

| Product Claim | Source Verification in `../cubycrate` | Implementation Status |
| :--- | :--- | :--- |
| **Runtime Architecture** | Dockerfile multi-stage build; Go 1.25 backend, embedded Svelte 5 frontend, Alpine 3.21 runtime image (<150 MB, 30-50 MB idle RAM). | Verified & Documented |
| **Container & Arch** | GHCR image `ghcr.io/septian-padli/cubycrate:v0.0.1-alpha.2` on `linux/amd64` and `linux/arm64`. | Verified & Documented |
| **Database & Engine** | `glebarez/go-sqlite` pure-Go driver; SQLite WAL mode (`PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;`). Zero external DB dependencies. | Verified & Documented |
| **S3 Upload Flow** | `apps/backend/internal/modules/mystorage/multipart.go:18-28`: Single presigned PUT for `< 100 MiB`; direct presigned multipart for `>= 100 MiB` (16 MiB default parts up to 10,000 parts). | Verified & Documented |
| **S3 Security** | `internal/storage/cloud.go`: AES-256-GCM envelope encryption applied specifically to access and secret keys using 256-bit `master.key`. Bucket names and endpoints stored as plain fields. | Verified & Documented |
| **S3 Bandwidth** | Direct individual file downloads bypass server via presigned URLs; batch and folder ZIP downloads stream through the backend server. | Verified & Documented |
| **Healthchecks** | `apps/backend/cmd/server/main.go:192-202`: `/health` and `/api/health` execute identical handler calling `db.PingContext` and `storage.AllConfiguredNodesAvailable`. | Verified & Documented |
| **Storage Portability** | Blobs stored under `cubycrate/{instance_id}/{node_id}/blobs/{blob_id}`; zero proprietary database blob lock-in. | Verified & Documented |
| **Workspaces** | `My Storage` (personal per-user quota) and `Organization` (single shared tree, shared physical capacity, zero separate team partitions or group RBAC). | Verified & Documented |
| **License & Governance** | `LICENSE`: GNU Affero General Public License v3 (AGPL-3.0-or-later) with Section 13 network copyleft requirement. | Verified & Documented |

---

## 5. Added Routes & URLs

The following 5 new canonical routes were added to the site and verified in build artifacts:

1. `https://cubycrate.com/docs/guides/self-hosted-file-storage/`
2. `https://cubycrate.com/docs/guides/local-vs-s3-storage/`
3. `https://cubycrate.com/docs/guides/docker-deployment-checklist/`
4. `https://cubycrate.com/docs/about/`
5. `https://cubycrate.com/docs/changelog/`

All 5 routes are prerendered as static HTML, included in `dist/sitemap-0.xml`, indexed by Pagefind search, and referenced in the Starlight navigation sidebar.

---

## 6. Validation Results & Quality Gates

| Quality Gate | Command | Result | Notes |
| :--- | :--- | :--- | :--- |
| **Astro Diagnostic Check** | `pnpm check` | **PASS** | 0 errors, 0 warnings, 0 hints across 31 files. |
| **Vitest Test Suite** | `pnpm test` | **PASS** | 17 passed, 0 failed, 0 skipped (128 ms). |
| **Static Build & Pagefind** | `pnpm build` | **PASS** | 14 static HTML pages built in 1.68s. Pagefind indexed 14 HTML files. |
| **Cloudflare Worker Deploy Dry-Run** | `pnpm exec wrangler deploy --dry-run` | **PASS** | 127 static assets inspected and bound to `env.ASSETS` without configuration errors. |
| **Sitemap Verification** | Node sitemap inspection script | **PASS** | `dist/sitemap-0.xml` contains all 13 canonical URLs; excludes `404.html`. |
| **Robots Policy** | Direct inspection of `dist/robots.txt` | **PASS** | User-agent: *, Allow: /, references `https://cubycrate.com/sitemap-index.xml`. |
| **404 Robots Tag** | Direct inspection of `dist/404.html` | **PASS** | Contains `<meta name="robots" content="noindex, nofollow" />`. |
| **Schema Validation** | Inspect `dist/index.html` JSON-LD | **PASS** | Valid `SoftwareApplication` schema with `operatingSystem: "Linux"`, accurate requirements, and zero `FAQPage` schema. |
| **UI & Motion Integrity** | Source & AST inspection | **PASS** | Hero H1 `YOUR FILES. YOUR SPACE.` verbatim, GSAP triggers intact, no visual component changes. |

---

## 7. Independent Review Findings & Resolutions

An independent review was performed across the full branch diff using dedicated reviewer subagents. All identified issues were analyzed against the read-only product source and resolved:

1. **Finding:** S3 credential encryption claim was overbroad (claimed bucket names and endpoints were encrypted).
   - **Resolution:** Updated `local-vs-s3-storage.mdx` to state that AES-256-GCM envelope encryption specifically protects access keys and secret keys, while bucket names and endpoints remain plain configuration fields.
2. **Finding:** Docker deployment checklist implied all data resides in `cubycrate_data`, ignoring secondary host mounts and external S3 buckets.
   - **Resolution:** Added caution aside in `docker-deployment-checklist.mdx` explaining that secondary host mounts and S3 buckets reside outside `cubycrate_data` and require separate backup procedures as detailed in the Backup & Disaster Recovery Guide.
3. **Finding:** S3 file size guidance labeled "up to 5 GB" without noting the single-PUT threshold.
   - **Resolution:** Cross-referenced `../cubycrate/apps/backend/internal/modules/mystorage/multipart.go:18-28`. Updated `local-vs-s3-storage.mdx` to distinguish single presigned PUT for `< 100 MiB` from direct presigned multipart transfers for `>= 100 MiB` (16 MiB parts up to 10,000 parts, scaling to multi-gigabyte uploads).
4. **Finding:** Download bandwidth comparison claimed zero server transfer for all S3 downloads.
   - **Resolution:** Restricted zero-server-transfer claim to direct individual file downloads; documented that batch and folder ZIP downloads stream through the backend server.
5. **Finding:** Healthcheck description claimed read/write testing in SQLite.
   - **Resolution:** Corrected description to specify database connectivity verification via `db.PingContext`.
6. **Finding:** Test assertion accepted any `softwareRequirements` string starting with `Docker`.
   - **Resolution:** Tightened regex in `tests/static-output.test.mjs` to exact string `"Docker Engine >= 24.0, Docker Compose >= 2.20"`.

**Final Verification Review Result:** **PASS** (Zero remaining findings).

---

## 8. Remaining Issues or Blockers

- **Zero blockers.** All success criteria and non-negotiable boundaries have been satisfied.
- No further code modifications are required for this optimization.

---

## 9. Production Verification Checklist (Post-Deploy)

When the repository owner reviews and merges this feature branch, perform the following live verification checks:

- [ ] Verify `https://cubycrate.com/` returns HTTP 200 with `<link rel="canonical" href="https://cubycrate.com/" />`.
- [ ] Inspect Google Rich Results Test on `https://cubycrate.com/` to confirm valid `SoftwareApplication` and `WebSite` JSON-LD without errors or warnings.
- [ ] Verify `https://cubycrate.com/robots.txt` points to `https://cubycrate.com/sitemap-index.xml`.
- [ ] Verify `https://cubycrate.com/sitemap-index.xml` links to `https://cubycrate.com/sitemap-0.xml` and all 13 canonical URLs return HTTP 200.
- [ ] Verify `https://cubycrate.com/404` returns `<meta name="robots" content="noindex, nofollow" />`.
- [ ] Test the Starlight Pagefind search bar in docs for queries like `s3 storage`, `docker checklist`, `tus uploads`, and `backup`.
- [ ] Test on mobile (viewport <= 480px) and desktop (viewport >= 1200px) to confirm zero visual layout shifts or animation regressions.

---

## 10. Google Search Console Follow-Up Actions

After deployment to production:

1. **Submit Sitemap:** In Google Search Console, submit `https://cubycrate.com/sitemap-index.xml` under Sitemaps.
2. **URL Inspection & Indexing Request:**
   - Request indexing for `https://cubycrate.com/`.
   - Request indexing for each new guide:
     - `https://cubycrate.com/docs/guides/self-hosted-file-storage/`
     - `https://cubycrate.com/docs/guides/local-vs-s3-storage/`
     - `https://cubycrate.com/docs/guides/docker-deployment-checklist/`
     - `https://cubycrate.com/docs/about/`
     - `https://cubycrate.com/docs/changelog/`
3. **Structured Data Validation:** Check the Enhancements tab for `SoftwareApplication` entity recognition.
4. **Crawl Monitoring:** Verify that `404` errors are properly flagged as excluded with `noindex` and do not trigger soft 404 warnings.
