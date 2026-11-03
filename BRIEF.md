# CubyCloud Website Brief

> **Purpose:** Record product, audience, and trust facts for the website.
> **Scope:** Marketing website and public documentation.
> **Status:** The current website is React, TypeScript, and Vite. Astro, React Islands, and Starlight are approved targets, not implemented architecture.

## Product

CubyCloud is an open-source, self-hosted file drive. It gives people a browser interface for storing, organizing, accessing, previewing, and sharing files on infrastructure operated by them or their organization.

The marketing site belongs to the website repository. It is not the product application and does not provide managed hosting.

- Product: [CubyCloud](https://github.com/septian-padli/cubycloud)
- Website: this repository
- Product category: self-hosted file drive
- Positioning: Simple Self-Hosted File Drive
- Tagline: Your files. Your server. Your rules.

## Audience

### Operators

Operators install and maintain CubyCloud, configure storage, manage accounts and quotas, and handle hosting responsibilities. They need accurate installation and administration information before choosing to run it.

### Everyday users

Users browse folders, upload and download files, preview supported content, and share files through available workflows. They should not need to understand the server architecture to use the drive.

### Other evaluators

Developers, system administrators, homelab operators, privacy-conscious individuals, and small technical teams may evaluate the product. Do not suggest that CubyCloud hosts files for them.

## Product facts

- My Storage provides personal file and folder workflows.
- Organization is one shared tree available to authenticated users. It is not a collection of independent team spaces, and it does not offer granular group-based permissions.
- Sharing supports registered-user Viewer or Editor access and public links with optional passwords.
- Operators can configure local filesystem storage or S3-compatible storage. These are storage choices, not automatic replication, failover, or synchronization.
- Supported file previews, resumable uploads in supported My Storage workflows, Starred, and Trash are implemented product concepts.
- Administrators manage storage nodes, user quotas, and system settings.
- The current homepage describes a Go backend and embedded web interface in one container, with SQLite for application data. Verify product details against the current product repository before extending these claims.

## Website purpose

Help visitors understand the drive, see representative workflows, and find truthful installation information. The existing homepage uses scroll-based product storytelling and interactive simulations. Label simulations clearly; do not present them as live product instances.

Primary journey: homepage to Get Started to the product repository's installation information. Keep its current destination until a verified guide is published. Secondary journey: inspect the product source and license.

The homepage copy and section map belong to `CONTENT.md`. Information architecture belongs to `PAGES.md`; motion belongs to `MOTION.md`; prototype behavior belongs to `PROTOTYPE.md`.

## Trust and limits

Describe file workflows before implementation details. Use direct, verifiable language and state operator responsibilities plainly. Self-hosting still requires network security, updates, backups, and maintenance.

Do not claim native synchronization, real-time co-editing, version history, AI features, cross-node replication, failover,
end-to-end encryption, granular Organization permissions, benchmark results, certifications, or guaranteed one-click deployment without direct product evidence.

Verify licensing against the product repository before publishing legal statements. Never invent users, customer logos, testimonials, performance figures, or integrations.

## Ownership and sources

- `BRIEF.md`: audience, product facts, trust boundaries, shared Organization tree.
- `DESIGN.md`: visual identity and accessibility requirements.
- `CONTENT.md`: implemented copy, vocabulary, installation wording, and SEO.
- `PAGES.md`: page and navigation structure.
- `MOTION.md`: motion behavior.
- `PROTOTYPE.md`: scenario behavior and acceptance.
- `MIGRATION_CONTRACT.md`: migration restrictions.

For existing homepage behavior and copy, current website source and captured runtime take precedence over historical proposals.
For product features, consult the current product source, tests, documentation, and license.
The approved Astro, React Islands, and Starlight architecture is a target, not evidence of implementation.
