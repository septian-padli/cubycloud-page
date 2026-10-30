# CubyCloud Website

Scope: Current React/Vite marketing site and planned Astro/React Islands/Starlight migration. This repository is separate from the [read-only product repository](https://github.com/septian-padli/cubycloud).

## Current state

The current source uses React 19, TypeScript, Vite 6, GSAP/ScrollTrigger,
Three.js/React Three Fiber, and custom CSS. Astro and Starlight are selected
targets, not implemented. See [`DECISIONS.md`](DECISIONS.md) for approval status
and [`MIGRATION_CONTRACT.md`](MIGRATION_CONTRACT.md) for boundaries and gates.

## Develop current site

Use Node.js compatible with installed dependencies and pnpm:

```sh
pnpm install
pnpm dev
```

Current scripts: `pnpm dev`, `pnpm build` (TypeScript check and Vite build), and
`pnpm preview`.

## Current architecture

The homepage is a React application with a Three.js Storage Core and cross-section
GSAP/ScrollTrigger narrative. Files, Sharing, and Storage demos use synthetic
data. Migration must retain their behavior; see [`MOTION.md`](MOTION.md) and
[`PROTOTYPE.md`](PROTOTYPE.md).

## Source map

| Current path | Responsibility |
| --- | --- |
| `src/main.tsx` | React root, CSS import order, and pathname dispatch |
| `src/App.tsx` | Marketing sections and cross-section GSAP context |
| `src/components/HeroExperience.tsx`, `StorageCoreScene.tsx`, `NarrativeThread.tsx` | Hero progress, procedural R3F Core, coordinate-driven token |
| `src/components/FileExplorerDemo.tsx`, `SharingDemo.tsx`, `StorageSelectorDemo.tsx` | Synthetic interactive product demonstrations |
| `src/docs/DocsApp.tsx`, `content.ts`, `Articles.tsx` | Current custom React docs prototype and article content |
| `src/config.ts` | Current homepage external destinations |

Marketing styles include `styles.css`, `responsive.css`, `cinematic.css`,
`finishing.css`, and `navbar.css`. `package.json` provides `pnpm dev`,
`pnpm build` (`tsc --noEmit && vite build`), and `pnpm preview`; run these only
within separately authorized development or verification work.

## Routes and documentation state

`src/main.tsx` renders the marketing React app at `/` and the current custom React
`DocsApp` at `/docs` or `/docs/*`. The prototype already has Introduction,
Installation, and File Management pages with extensionless paths. Its installation
article labels operational examples as drafts; its search is limited to headings
and metadata, not Starlight full-text search.

The approved Starlight target uses `/docs/`,
`/docs/getting-started/installation/`, and
`/docs/user-guide/file-management/`. Canonical trailing slashes need configuration
and direct-load verification during migration. The homepage's current final Get
Started link remains the product GitHub README until the replacement is verified
and approved for use. See [`PAGES.md`](PAGES.md) and [`DECISIONS.md`](DECISIONS.md).

## Development workflow

`src/main.tsx` imports marketing CSS in cascade order; `src/docs/docs.css` scopes
prototype documentation styling. `src/App.tsx` owns cross-section GSAP effects;
the Hero, narrative token, and Storage Core each retain coupled scroll or scene
behavior. Keep that relationship intact while planning migration.

For migration workflow and permissions, see [`AGENTS.md`](AGENTS.md) and
[`MIGRATION_CONTRACT.md`](MIGRATION_CONTRACT.md).

## Contribution boundaries

Read [`AGENTS.md`](AGENTS.md), check Git status, then consult only documents
relevant to the assigned task. Preserve human changes and keep the separate
product repository read-only. Report observed checks distinctly from untested
acceptance criteria; a successful Vite or Astro build alone does not prove visual
or motion parity.

## Reference documents

- [`PROTOTYPE.md`](PROTOTYPE.md): homepage and documentation acceptance scenarios.
- [`PAGES.md`](PAGES.md): routes and information architecture.
- [`DESIGN.md`](DESIGN.md): visual system and docs direction.
- [`MOTION.md`](MOTION.md): motion behavior.
- [`CONTENT.md`](CONTENT.md) and [`BRIEF.md`](BRIEF.md): copy and product-truth boundaries.
- [`AGENTS.md`](AGENTS.md): permissions and worker safety.

## Product and deployment boundaries

Verify claims, installation instructions, licensing, and operations against the
read-only product repository. Marketing demos use synthetic data, not live
operations. Hosting, canonical domain, release procedure, and deployment
authorization remain unverified. See [`AGENTS.md`](AGENTS.md); this README grants
no deployment permission.

## License

Do not infer this repository's license from the product repository. Verify an explicit website license file.
