# CONTENT.md — CubyCloud Website Copy & SEO
> **Status:** Proposed launch copy, aligned with six approved content decisions; verify product facts and destinations before publication.
> **Applies to:** The single English marketing homepage and entry points to branded Starlight documentation.
> **Read with:** `BRIEF.md` (claims/positioning), `PAGES.md` (section order), `DESIGN.md` (presentation), `MOTION.md` and `PROTOTYPE.md` (behavior).

## 1. Editorial Direction
- **Hero:** Anti-Complexity. Challenge unnecessary software complexity without unverified competitor comparisons.
- **Feature storytelling:** Interactive Product Narrative. Invite visitors to follow real product actions.
- **Technical depth:** Progressive Technical Disclosure. Benefit first; implementation details later.
- **Trust:** Open-Source Transparency. Show real source, license, documentation, and contribution paths.
- **FAQ:** Practical FAQ before the final conversion section.
- **SEO priority:** Self-Hosted File Drive. Lead with a clear product category even when the hero is provocative.
- **Voice:** Bold, direct, human-readable, factually precise; use international English. Indonesian localization is future work.

## 2. Global Copy Rules
- Use short headlines and concise supporting sentences; every bold claim needs a factual explanation.
- Prefer active verbs: **open, organize, share, choose, run, explore**. Avoid generic SaaS superlatives.
- Speak to small teams and organizations; explain technical terms when first introduced.
- Do not describe an unimplemented feature as available, or a planned documentation URL as live.
- Real screenshots and demonstrations must match product behavior; illustrations must not mimic fabricated UI.
- Preserve the brand tagline **“Your files. Your server. Your rules.”** as a supporting identity line.
- Actual product labels such as **My Storage** and **Organization** should match the current UI release.

## 3. Homepage Copy (Approved Section Order)
### 00 · Hero + Product Preview
- **Eyebrow:** `CUBYCLOUD / SELF-HOSTED FILE DRIVE`
- **H1:** **Your files don't need another bloated platform.**
- **Lead:** Meet CubyCloud, a focused, self-hosted file drive for organizing, accessing, and sharing files on infrastructure you control.
- **Supporting line:** Keep it familiar for your team. Choose local disks or optional S3-compatible storage behind the scenes.
- **Brand signature:** Your files. Your server. Your rules.
- **Primary CTA:** `Get Started` (installation guide).
- **Secondary CTA:** `View on GitHub` (source repository).
- **Preview caption:** `A familiar file drive, running on your server.`
- **Scroll cue:** `Explore the drive` / accessible alternative: `Jump to features`.
- **Image alt text pattern:** Describe only the verified interface and visible content, e.g. `CubyCloud file explorer displaying folders and files`.

### 01 · File Management (`#files`)
- **Eyebrow:** `01 / FILES`
- **H2:** **Open a folder. Get on with your work.**
- **Lead:** Give files a place to live. Browse folders, upload documents, and handle everyday file tasks from a familiar browser-based drive.
- **Scene cue 1:** `Find your place.` — Navigate folders in My Storage.
- **Scene cue 2:** `Bring your files in.` — Upload files using the browser.
- **Scene cue 3:** `Keep things moving.` — Rename, move, duplicate, or restore files.
- **Contextual CTA:** `Explore file management` → User Guide.

### 02 · File Sharing (`#sharing`)
- **Eyebrow:** `02 / SHARING`
- **H2:** **Pick a file. Share it your way.**
- **Lead:** Share with registered users using Viewer or Editor access, or create a public link with optional password protection.
- **Scene cue 1:** `Choose who can open it.` — Internal Viewer/Editor sharing.
- **Scene cue 2:** `Make a link.` — Public file and folder links.
- **Truthful note:** `Organization is a common drive shared by all signed-in users, not a system of separate team workspaces.`
- **Contextual CTA:** `Explore sharing` → Sharing & Organization docs.

### 03 · Local + S3 Storage (`#storage`)
- **Eyebrow:** `03 / STORAGE`
- **H2:** **Local disks. S3 storage. Your call.**
- **Lead:** Choose local filesystem storage or connect S3-compatible object storage. Manage files through the same CubyCloud drive experience.
- **Scene cue 1:** `Start local.` — Store files on disks managed by your server.
- **Scene cue 2:** `Connect S3.` — Configure optional S3-compatible storage.
- **Detail line:** `Storage placement and available capacity are configured by the administrator.`
- **Contextual CTA:** `See storage options` → Storage & Administration docs.
- **Do not imply:** Automatic replication, cross-provider sync, or guaranteed redundancy.

### 03b · Supporting Feature Highlights
- **H2:** **The useful details. Without the detours.**
- **Intro:** The everyday tools you expect, without turning file storage into an entire office suite.
- **Card: File Previews:** `Check supported images, videos, PDFs, and text files right in the browser.`
- **Card: Resumable Uploads:** `Resume supported uploads to My Storage instead of starting over.`
- **Card: Starred & Trash:** `Keep important files close and restore items moved to Trash.`
- **Card: Admin Controls:** `Manage storage nodes, quotas, and system settings from the admin interface.`
- **Contextual CTA:** `Read the user guide` → User Guide.

### 04 · Self-Hosting (`#self-hosting`)
- **Eyebrow:** `04 / SELF-HOSTING`
- **H2:** **Run your drive. Not another stack.**
- **Lead:** CubyCloud packages its Go backend and embedded web interface in a single container. SQLite stores application data without a separate database server.
- **Supporting line:** Set up your first administrator in the browser, then choose where files should live.
- **Operational note:** `You manage the server, network access, HTTPS, storage, and backups.`
- **Contextual CTA:** `See installation requirements` → Getting Started.

### 04b · Open Source & Trust
- **Eyebrow:** `BUILT IN THE OPEN`
- **H2:** **No black box. Read the code.**
- **Lead:** CubyCloud's source is available on GitHub under the GNU Affero General Public License (AGPL-3.0-or-later).
- **Supporting line:** Inspect how it works, review the documentation, and contribute through the project repository.
- **Trust links:** `Source Code` · `License` · `Security Policy` · `Contributing` (only link confirmed destinations).
- **Primary action here:** `View on GitHub`.
- **Evidence policy:** No fabricated testimonials, customer logos, adoption figures, security certifications, or performance benchmarks.

### 04c · Practical FAQ (`#faq`)
- **H2:** **A few questions before you make it yours.**
- **Q: What do I need to run CubyCloud?**
  **A:** A supported server or host that can run the published container, persistent storage, and the ability to configure network access. Check the installation guide for current requirements.
- **Q: Can I use local disks and S3-compatible storage?**
  **A:** Yes. CubyCloud supports local filesystem storage and optional S3-compatible storage configured by an administrator.
- **Q: How can I share files?**
  **A:** Share with registered users using Viewer or Editor permissions, or create public links with optional passwords.
- **Q: Does the Organization drive support separate team permissions?**
  **A:** Not currently. It is a shared tree with full access for all authenticated users; it is not group-based workspace access control.
- **Q: Is CubyCloud open source?**
  **A:** Yes. The source repository is publicly available, and the project is licensed under AGPL-3.0-or-later. See the repository for the license and contribution details.
- **FAQ follow-up:** `More questions? Read the documentation.` → Documentation home.

### 05 · Get Started (`#get-started`)
- **H2:** **Your files. Your rules. Start here.**
- **Lead:** Ready for a simpler place to manage files? Follow the installation guide to set up CubyCloud on your own infrastructure.
- **Primary CTA:** `Get Started` → verified, canonical Starlight installation article.
- **Secondary CTA:** `Browse Documentation` → `/docs/`.
- **Reassurance:** `Requirements, setup steps, and operational guidance are in the docs.`
- **Avoid:** Claims such as `Install in 60 seconds` or `No configuration required` without current evidence.

### Footer
- **Signature:** `CubyCloud. Your files. Your server. Your rules.`
- **Links:** `Documentation` · `GitHub` · `License` · `Security` · `Contributing` (verify links before launch).
- **Footer note:** `Open-source, self-hosted file management.`

## 4. Navigation, CTA, and Microcopy
- **Chapter names:** `01 Files` · `02 Sharing` · `03 Storage` · `04 Self-Hosting`.
- **Progress label:** `Exploring CubyCloud` / `Chapter 02 of 04` (match actual chapter state).
- **Navigation affordances:** `Jump to chapter` · `Skip to Get Started` · `Back to top`.
- **Global links:** `Documentation` · `View on GitHub` · primary `Get Started`.
- **Mobile navigation:** `Explore chapters` · `Close menu` · `Get Started`; never require hover or scroll effects to reveal core content.
- **Feedback labels:** `Copied` · `Open documentation` · `External link` (only for actions that actually work).
- **Documentation entry headline:** `Make CubyCloud yours.`
- **Documentation entry intro:** `Install, use, share, and manage your self-hosted file drive, with guides for everyday users and administrators.`
- **Documentation pathways:** `Install CubyCloud` · `Manage Files` · `Share Files` · `Configure Storage` · `Troubleshoot` · `API & Architecture`.

## 5. SEO & Social Metadata (Homepage)
- **SEO title:** `CubyCloud | Simple Self-Hosted File Drive`
- **Meta description:** `CubyCloud is an open-source, self-hosted file drive for teams. Organize and share files using local or S3-compatible storage on your own server.`
- **Primary search phrase:** `self-hosted file drive`.
- **Secondary search phrases:** `open-source file drive`, `self-hosted file sharing`, `self-hosted cloud storage`, `local and S3 storage`, `team file management`.
- **Open Graph title:** `CubyCloud — Your Files. Your Server. Your Rules.`
- **Open Graph description:** Reuse the factual homepage meta description; create a real branded preview, not a fictional product screen.
- **Search intent:** Installation guidance and practical file sharing for teams considering self-hosted storage.
- **SEO implementation notes:** One visible H1; descriptive H2s, meaningful alt text, canonical URL when domain is confirmed, and distinct metadata for `/docs/`. Treat search phrases as writing guidance, not a keyword-stuffed meta tag.

## 6. Verification, Links, and Document Sync
- **Product facts:** Recheck `../cubycloud/README.md`, current application behavior, `LICENSE`, release artifacts, and relevant docs before publishing. PRD targets are not implemented-feature evidence.
- **Permission boundary:** Do not depict role-based organizational groups or isolated team workspaces; only claim the supported sharing model.
- **Security boundary:** Self-hosting does not mean end-to-end encryption, automatic protection, or maintenance-free operation.
- **Performance boundary:** No unmeasured RAM, container-size, speed, capacity, scalability, setup-time, or competitor superiority claims.
- **No future features:** Never imply native sync clients, version history, AI features, real-time office collaboration, or automatic storage replication without verification.
- **Links:** `Get Started` must resolve to the *real* published installation article (candidate in `PAGES.md`: `/docs/getting-started/installation/`, not yet confirmed). GitHub: https://github.com/septian-padli/cubycloud.
- **Required PAGES.md alignment:** Insert `04c · Practical FAQ (#faq)` after `04b · Open Source & Trust` and before `05 · Get Started` as a supporting region; add `#faq` to the sitemap if used. It is **not** an immersive chapter 05.
- **Current phase:** Design and FigCraft prototyping only. This file approves content direction, not application, website, Starlight, or deployment implementation.
