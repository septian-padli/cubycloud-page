# MIGRATION_CONTRACT.md

Scope: Preserve-first migration of this website from React/Vite to Astro, React
Islands, and Starlight. The target is approved; implementation still requires
explicit development authorization. See [`AGENTS.md`](AGENTS.md) for permissions
and [`DECISIONS.md`](DECISIONS.md) for status. This contract does not authorize
merge or deployment.

## Objective and boundaries

Change the framework, not the experience. Preserve the latest owner-approved
React/Vite baseline, including layout, copy, typography, colors, 3D scene, GSAP
choreography, chapter navigation, demos, responsive behavior, keyboard/touch
access, and reduced motion. Do not redesign, invent product claims, remove
behavior, or modify the read-only `../cubycloud` product repository. Report
conflicts and obtain approval before visible or behavioral changes.

In scope after authorization: Astro and React integration, Starlight `/docs/`,
routes, isolated docs styles, metadata/assets, configuration, and regression
testing. Keep pnpm. Avoid adding unrelated frameworks or dependencies without
demonstrated need.
Use current user instructions and explicit approval first, then this contract and
observed runtime evidence. `DECISIONS.md` records approved, open, and superseded
choices; domain documents govern their subjects. Old design artifacts do not
override current behavior. Log unresolved conflicts and pause affected work
rather than guess.

## Scope exclusions

Do not change the product application, add backend integration, redesign
marketing, rewrite copy, invent features, or expand homepage chapters. Do not
replace procedural 3D or timelines with static imagery, simplify demos, or
introduce a new UI/styling framework without a demonstrated requirement and
approval. Migration preparation is not authorization to begin implementation.

## Rendering strategy

Begin with the existing landing experience as one cohesive React Island. Its
cross-section GSAP timelines and DOM-position dependencies make premature
splitting risky. A client-only island is acceptable for initial parity, but
record its SEO, prerendered HTML, JavaScript, and perceived-loading trade-offs.
Consider Astro-native or smaller hydrated sections only after parity, with
independent regression evidence.

Use Starlight's native sidebar, table of contents, search, code rendering,
Markdown/MDX, and accessibility features. Customize branding selectively; isolate
documentation CSS from marketing styles.

## Documentation routes

Initial substantive articles:

- `/docs/`: introduction.
- `/docs/getting-started/installation/`: installation.
- `/docs/user-guide/file-management/`: file management.

Provide responsive navigation, article-first root, accessible search, code blocks,
light/dark/system appearance, and working links. Follow [PAGES.md](PAGES.md) for
IA and [PROTOTYPE.md](PROTOTYPE.md) for DOC scenarios. The marketing CTA destination
remains open in [DECISIONS.md](DECISIONS.md); do not invent commands or link to
unavailable articles.

## Baseline and preservation

Before framework changes, record source branch and commit, working-tree changes,
package versions, existing build result, desktop/mobile screenshots, motion and
interaction evidence, and known defects. Baseline must represent the latest
owner-approved state; uncertainty blocks certification. Preserve human changes
and distinguish pre-existing defects from regressions.

Treat captured runtime behavior as authority over old mockups. Required homepage
preservation includes Hero and Storage Core, all four chapters and supporting
sections, file-token continuity, chapter navigation, Files/Sharing/Storage demos,
FAQ, CTA, footer, and existing destinations. No static replacements for
functional or animated content without approval.

## Supervised Orca task DAG

One coordinator owns the Run, task DAG, integration, and acceptance. Use scoped
OMP workers in isolated Git worktrees; each task names dependencies, file
ownership, and evidence. Keep implementation concurrency to two by default and
give shared configuration one owner at a time. Verify current Orca/OMP skill and
CLI help before use; do not assume flags or model identifiers. Worker completion
is not acceptance.

1. **Baseline:** audit source and capture evidence; gate: baseline certified.
2. **Foundation:** configure Astro/React and route without losing assets/styles;
   gate: build and homepage load.
3. **Landing:** preserve React, GSAP, Three.js, and interactions; gate: applicable
   parity scenarios pass.
4. **Docs:** integrate Starlight, articles, branding, routes, and search; gate:
   DOC scenarios pass. Run alongside landing only after shared architecture and
   ownership are fixed.
5. **Integration:** resolve routing/style conflicts and test combined production
   output; gate: integrated app works.
6. **Independent QA:** reviewer not responsible for implementation checks visual,
   motion, functional, docs, and accessibility evidence; gate: no critical
   regression.
7. **Repairs and handoff:** fix failures, rerun affected and dependent gates,
   document limits and rollback, prepare reviewable branch/PR. Coordinator must
   not self-approve failed criteria.

Each worker inspects its assigned worktree and reports changed files, checks, browser evidence, and blockers. Preserve unrelated user changes.

Diagnose before retries; allow at most two repair attempts before re-diagnosis.
Never bypass a failed gate, expand scope silently, or delete functionality to
pass tests. Report PASS, FAIL, BLOCKED, or NOT TESTED accurately.

## Acceptance gates

Use actual browser evidence and `PROTOTYPE.md` PT, MR, and DOC scenarios. A
successful build or screenshot alone cannot prove parity.

- **Build/runtime:** install only during the authorized run, typecheck, production
  build and preview; verify direct URLs, assets/fonts, and no new critical errors.
- **Visual and motion:** compare matching viewports and browser state; observe
  forward/reverse scroll, resize, reduced motion, and lifecycle. Apply
  [PROTOTYPE.md](PROTOTYPE.md) and [MOTION.md](MOTION.md), not a build-only
  substitute.
- **Function and accessibility:** exercise chapters, demos, FAQ, CTAs, dialogs,
  keyboard, touch, and mobile navigation against recorded baseline.
- **Docs:** verify three initial direct URLs, article UI, full-text search, sidebar,
  TOC, theme persistence, mobile navigation, code, and valid links.
- **SEO/metadata:** preserve homepage metadata; inspect prerendered content,
  headings, asset URLs, canonical/OG metadata, search indexing, and any client-only
  compromise.

No unapproved differences are accepted as creative changes. Report exceptions for
owner approval; never convert missing evidence into PASS.

Independent QA records [PT, MR, and DOC scenarios](PROTOTYPE.md) with browser evidence; missing access blocks the gate. Record baseline defects separately. Worker summaries cannot certify integration.

## Evidence and rollback

Keep baseline/migrated screenshots, motion and interaction evidence, reports, and test results outside the production bundle.
Preserve the source commit and use reversible task changes.
For a serious regression, stop integration, preserve evidence, record the failed task, and restore the last verified checkpoint without discarding unrelated human changes.
Avoid destructive rollback.

## Handoff and release boundary

Provide a branch/PR, architecture and changed-file summary, dependency changes, route list, build/typecheck and browser evidence, known issues, SEO/rendering compromises, and rollback reference.
Independent QA results must be explicit. Final acceptance means ready for owner review only.
List remaining differences and each gate's `PASS`, `FAIL`, `BLOCKED`, or `NOT TESTED` status.
Merge to `main` and production deployment each require separate owner approval; neither happens automatically.
