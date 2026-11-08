# CubyCloud Content and SEO

> **Purpose:** Record implemented homepage copy, terminology, and metadata rules.
> **Language:** English.
> **Current site:** React, TypeScript, and Vite. Astro, React Islands, and Starlight are approved targets, not implemented.

## Voice and source priority

Use concise, direct, product-led English. Explain actual file workflows before infrastructure. Prefer precise verbs and product terms; avoid generic SaaS claims, comparisons, and unsupported promises.

For homepage copy, current source and captured runtime outrank historical drafts. Preserve wording, capitalization, punctuation, line breaks that affect composition, labels, FAQ text, navigation, disclaimers, and accessible names during migration. Changing copy requires separate approval.

The sections and motion are described in `PAGES.md` and `MOTION.md`. Prototype scenarios and simulation limits belong to `PROTOTYPE.md`. This file records copy and SEO; it does not duplicate those contracts.

## Implemented homepage copy

Text below matches inspected React source, not a proposed replacement or independently captured browser result.

### Hero

- Kicker: `WELCOME TO YOUR SPACE`
- H1: `YOUR FILES. YOUR SPACE.`
- Overline: `FILES BELONG WITH YOU.`
- Copy: `Your files don’t need another bloated platform.`
- Supporting copy: `Meet CubyCrate, a focused, self-hosted file drive for organizing, accessing, and sharing files on infrastructure you control.`
- Actions: `GET STARTED`; `VIEW ON GITHUB`
- Footer line: `YOUR FILES. YOUR SERVER. YOUR RULES.`

### Files

- H2: `OPEN A FOLDER. GET ON WITH YOUR WORK.`
- Copy: `Give files a place to live. Browse folders, upload documents, and handle everyday file tasks from a familiar browser-based drive.`

### Sharing

- H2: `PICK A FILE. SHARE IT YOUR WAY.`
- Copy: `Share with registered users using Viewer or Editor access, or create a public link with optional password protection.`

### Storage

- H2: `LOCAL DISKS. S3 STORAGE. YOUR CALL.`
- Copy: `Choose local filesystem storage or connect S3-compatible object storage. Manage files through the same CubyCrate drive experience.`

### Supporting highlights

- `SEE BEFORE YOU OPEN.` Preview supported images, video, PDFs, and text files in the browser.
- `PICK UP WHERE YOU LEFT OFF.` Resume supported uploads to My Storage instead of starting over.
- `KEEP WHAT MATTERS CLOSE.` Star important files. Restore items moved to Trash.
- `RUN THE SPACE.` Administrators manage storage nodes, user quotas, and system settings.

### Self-hosting and source

- H2: `RUN YOUR DRIVE. NOT ANOTHER STACK.`
- Copy: `CubyCrate packages its Go backend and embedded web interface in a single container. SQLite stores application data without a separate database server.`
- Open Source H2: `NO BLACK BOX. READ THE CODE.`
- Copy: `CubyCrate's source is available on GitHub. Inspect how it works, review its license, and make it yours.`

### FAQ and Get Started

The FAQ copy is implemented as follows:

- `What do I need to run CubyCrate?` Docker, a supported host architecture, persistent storage, and a way to configure network access. Follow the installation guide for the published image and current Compose settings.
- `Can I use local disks and S3-compatible storage?` Yes. Administrators can configure local filesystem or S3-compatible storage. These are storage choices, not automatic replication.
- `How can I share files?` Share My Storage items with registered users as Viewer or Editor, or create public links with optional password protection.
- `Does Organization have separate team permissions?` No. Organization is one shared tree for authenticated users, without separate team spaces or granular group permissions.
- `What license does CubyCrate use?` CubyCrate is distributed under GNU AGPL version 3. Review the product repository license for its terms.

- FAQ H2: `BEFORE YOU MAKE IT YOURS.`
- Get Started H2: `YOUR FILES. YOUR RULES. START HERE.`
- Get Started copy: `Install the published CubyCrate image with Docker Compose and create your first administrator.`
- CTA: `INSTALL CUBYCRATE`

`src/config.ts` directs installation traffic to `/docs/getting-started/installation/`.

## Product vocabulary

Use implemented names and distinctions consistently:

- **My Storage:** personal file area; resumable upload claim applies only to supported workflows.
- **Organization:** one shared tree for authenticated users, not independent team or group workspaces.
- **Viewer** and **Editor:** registered-user sharing access levels.
- **Public link:** may use optional password protection.
- **Local filesystem** and **S3-compatible storage:** available storage choices, not automatic replication or synchronization.
- **Starred**, **Trash**, and **storage nodes:** use these labels as shown in product UI.

The marketing demos use synthetic data and illustrate workflows. Never imply that interactions send invitations, create live public links, access a real account, or persist files. See `PROTOTYPE.md` for scenario-level limits.

## Installation and technical content

The documentation content strategy is **prototype-first**. Write useful article structure and explanations, but distinguish verified instructions from draft examples. Check the product repository before publishing commands or operational details.

Do not invent container image names or tags, commands, environment variables, ports, volume mounts, configuration paths, CLI flags, credentials, authentication prerequisites, or platform support.
Identify unavailable instructions clearly as draft material; polished layout must not imply they are production-ready.

The approved documentation direction is English, task-oriented content for installers, users, and administrators. Keep paragraphs short, headings descriptive, steps ordered, code accurate, and warnings practical. Search labels and success messages must match implemented behavior. Do not claim full-text search if implementation only searches titles or headings.

## SEO and metadata

Current homepage title: `CubyCrate | Simple Self-Hosted File Drive`.

Current description: `CubyCrate is an open-source, self-hosted file drive for teams. Organize and share files using local or S3-compatible storage on your own server.`

Current HTML also uses this title and description for Open Graph metadata, plus `og:type=website`. Preserve existing metadata unless an approved replacement is implemented.

For new or revised pages, use one meaningful H1, ordered headings, descriptive title and description, accurate image alt text, and working internal links. Add a canonical URL only after verifying the production domain. Add an Open Graph image only after its asset exists at a valid public URL.

## Claims and review

Verify product statements against current product source, tests, documentation, and license. Do not claim native synchronization, real-time co-editing, version history, AI, automatic replication or failover, granular Organization permissions, end-to-end encryption, security certification, performance superiority, or guaranteed installation times without direct evidence.
Do not invent statistics, customer logos, reviews, testimonials, or integrations. Product claims and legal terms must reflect the current product version. For existing copy, verified website source is authoritative; historical copy proposals are references only.
