# PAGES.md — Routes and Information Architecture

## Scope and authority

This document owns homepage anchors, public routes, documentation information architecture, and navigation behavior. `MIGRATION_CONTRACT.md` owns the migration DAG, gates, and rollback.
`DESIGN.md` owns palette and visual direction. `MOTION.md` owns animation behavior; `PROTOTYPE.md` owns regression scenarios.

The current site is React + TypeScript + Vite. `src/main.tsx` routes `/docs` and every `/docs/*` path to the custom React `DocsApp`; all other paths render the homepage.
Starlight is the approved target, not the current implementation. Do not describe target routes or Starlight behaviors as already implemented.

## Homepage routes and anchors

- `/` is the existing marketing homepage. Preserve its sections, order, destinations, and responsive behavior.
- Preserve existing anchors: `#top`, `#files`, `#sharing`, `#storage`, `#self-hosting`, `#faq`, and `#get-started`. Verify each anchor against rendered baseline before migration; retain its location and function.
- The four numbered chapters are Files, Sharing, Storage, and Self-Hosting. Hero, Highlights, Open Source, FAQ, Get Started, and Footer remain supporting sections.
- Keep current chapter wayfinding, active chapter state, scroll progress, native anchor behavior, mobile navigation, wordmark, and GitHub destination.
- Do not replace the checked navbar as a side effect of framework migration. A separately approved Hybrid Editorial Navbar applies only if it is already in the agreed baseline or separately authorized.
- Preserve the current Get Started destination to the product GitHub README. Point GitHub to `https://github.com/septian-padli/cubycloud`. Change the primary CTA to Installation only after instructions are verified, route works, and destination change is authorized.

## Documentation target routes

The approved Starlight target is article-first: `/docs/` opens Introduction directly, never a promotional hub. Initial routes only:

| Route | Initial article |
| --- | --- |
| `/docs/` | Introduction |
| `/docs/getting-started/installation/` | Installation |
| `/docs/user-guide/file-management/` | File Management |

Use canonical trailing-slash behavior configured by Astro/Starlight. Direct loads, internal links, and canonicalization must agree. Until Starlight migration lands, these are target routes; current React prototype routing is not proof the target works.

## Documentation navigation

Use task-oriented categories: Getting Started (Introduction, Installation), User Guide (File Management), Administrator Guide, Deployment, and Reference.
Only the three listed initial articles are published and linked. Do not create clickable future destinations or dead links.
Future material may appear only as visibly noninteractive “Coming soon” text, not as a route promise.

Design for both audiences: newcomers need a clear Introduction-to-Installation path; existing users need direct task-oriented access to File Management and future guide categories.
Keep category labels and article titles distinct and scannable. Do not imply unfinished categories contain published guidance.
For the dual audience, keep Installation discoverable without forcing existing users through onboarding.
Let task labels describe user goals, and keep product terms consistent with the homepage and verified product vocabulary.

On desktop, ensure active item and disclosure state remain visible while navigating long lists. On small screens, opening a menu must preserve the reader's location and provide a clear way back to the article.

Search and TOC are complementary: search discovers published articles; TOC moves within the current article. Neither may point to unavailable future content.

Keep default links functional without JavaScript where the framework permits. Hash links must retain useful behavior when opened directly or shared.

Prefer Starlight-native sidebar, breadcrumbs, previous/next links, heading anchors, and TOC.
Sidebar highlights the current article and exposes its category. Category disclosure must be operable and must not hide the current route.
Keep side navigation independently usable on desktop, but avoid trapping readers in an independently scrolling region on narrow screens.

TOC represents real headings, follows scroll position, and navigates to stable anchors. Hash changes and direct hash loads land at the intended heading.
Search finds only published articles and leads to valid article or heading destinations, including a useful no-results state.
Do not preserve the current prototype's limited title/heading search as the target full-text-search contract.

## Adaptive documentation chrome

Use compact documentation navbar distinct in structure from marketing navigation. Include CubyCloud identity, a working route home, search, theme selection, and GitHub link. Do not duplicate marketing chapter links in the docs navbar.

Desktop layout supports sticky header, left navigation, readable article column, and right On This Page navigation.
Keep reading content dominant; side regions must not obscure article content or each other.
Sticky elements need coordinated offsets and must not cover target headings.

At mobile widths use compact header, accessible navigation drawer, responsive search, expandable/compact TOC, and usable code/table overflow.
Drawer opens, closes, returns focus, supports keyboard operation, and does not leave page content blocked after dismissal.
Avoid importing homepage cinematic storytelling into articles.

Documentation supports light, dark, and system appearance. Explicit choice persists; system follows OS. Scope theme styles away from marketing pages. Follow palette and typography in `DESIGN.md`; do not establish a separate visual convention here.

## Content and acceptance

Use product terminology and verified facts only. Do not invent installation commands, configuration values, controls, or features. Mark unverified operational guidance as draft; no draft instruction should appear executable or production-ready.

Keep code samples, media, links, tables, and callouts usable on keyboard and touch. Use semantic headings and stable IDs. Do not add a future link merely to fill a category or previous/next slot.
Keep sidebar order aligned with article sequence. Previous/next controls may connect only published routes and must not manufacture a route to fill an empty slot. GitHub and home links must retain their verified destinations.

When homepage and documentation share global CSS or assets, scope docs-specific rules to the docs shell. Navigation or theme changes for documentation must not alter marketing anchors, layout, or theme state.
Maintain a clear return path from docs to homepage. Do not substitute a docs logo link with a prototype-only pathname or a marketing CTA to an unpublished article.

The three initial routes define the full migration content scope for this register. Add further article routes only through an approved scope update and source-verified content.

Check homepage anchors and destinations against the baseline. Test each initial documentation route by direct load and internal navigation.
Confirm sidebar/category state, breadcrumbs, previous/next links, TOC/hash/scroll-spy, search results and empty state, theme persistence, mobile navigation, and no future dead links.
Confirm canonical URLs resolve consistently.

Use reference widths 1440, 768, 390, and 320 px. Check no unintended horizontal page overflow, readable long-form content, working sticky offsets, and accessible controls. See `PROTOTYPE.md` for scenario IDs, severity, and evidence requirements.