# CubyCloud Design System

> **Purpose:** Preserve implemented visual identity and guide the approved documentation target.
> **Current site:** React, TypeScript, and Vite.
> **Target:** Astro, React Islands, and Starlight are approved, not implemented.

## Direction

The marketing site uses cinematic, scroll-led storytelling with earthy color, large editorial type, and a recurring file-shaped token. Preserve its current appearance during architecture migration. A migration does not authorize a redesign.

Documentation uses **Refined Editorial Tech**: quiet reading surfaces, clear navigation, compact technical metadata, and restrained CubyCloud color. It shares the brand, not the marketing site's cinematic composition.

Keep design decisions tied to hierarchy, readability, or product identity. Do not add decoration just to fill space. Page structure belongs to `PAGES.md`; motion to `MOTION.md`; demo behavior to `PROTOTYPE.md`.

## Implemented palette

Values below are present in the current website CSS. Preserve exact values when maintaining the experience.

| Role | Light / marketing value | Dark / marketing value |
| --- | --- | --- |
| Main background | `#F0EEE3` | `#0F130E` |
| Surface | `#FFFFFF` | `#182017` |
| Main text | `#283618` | `#F0EEE3` |
| Olive | `#606C38` | `#99AB5E` |
| Sand accent | `#DDA15E` | `#E1AB70` |
| Terracotta | `#BC6C25` | `#D78032` |
| Muted text | `#5A6B46` | `#9CA88F` |
| Green accent | n/a | `#ADCB8A` |

The marketing site uses gradients, layered surfaces, and shadows as part of its existing composition. Preserve them. Do not apply effects indiscriminately or introduce unrelated brand hues.

Current documentation CSS uses light tokens `#F0EEE3`, `#FFFFFF`, `#283618`, `#59644F`, `#D9DDCC`, `#E8E9DC`,
`#606C38`, `#DDA15E`, `#A6571C`, `#182017`; dark tokens `#0F130E`, `#182017`, `#F0EEE3`, `#BAC8AD`,
`#3B4935`, `#202B1E`, `#ADCB8A`, `#E1AB70`, `#0B100B`.
Treat them as current documentation component values, not a second marketing palette.

## Typography

The implemented marketing font stack loads Google Fonts and uses:

- **Barlow Condensed**, weights 600–900, for major display headings and the footer wordmark.
- **Montserrat**, weights 400–800, for body copy, interface labels, and navigation.
- **DM Mono**, weights 400–500, for chapter metadata, technical labels, and compact interface text.

This is implementation fact, not a claim of separately recorded design approval. Keep families, weights, and wrapping stable during migration.

The documentation prototype uses Montserrat for article text and headings, and DM Mono for code, breadcrumbs, navigation metadata, and compact labels. Barlow Condensed is not a default article heading face. Keep reading comfortable and code legible.

## Composition and responsive behavior

Preserve the current hero, Storage Core, four numbered chapters, file-token continuity, demonstrations, highlights, self-hosting visualization, Open Source, FAQ, Get Started, and footer. `PAGES.md` owns information architecture.

Keep normal vertical scrolling. Preserve intentional overlaps, full-bleed sections, layered 3D, and responsive chapter compositions. Do not flatten scenes or introduce scroll locking, snapping, or sticky scenes without approval.

The CSS supports layouts down to 320px. Treat desktop, tablet, and narrow mobile as distinct compositions, not one scaled layout. Keep content within the viewport, text readable, and controls usable by touch. Avoid page-level horizontal overflow.

## Accessibility

Maintain visible keyboard focus. Current marketing styles use a 2px sand outline with 4px offset; docs use a 2px accent outline with 3px offset. Preserve equivalent visibility on links, buttons, inputs, and disclosure controls.

Use semantic headings and landmarks, meaningful accessible names, and keyboard-operable controls. Do not use color alone to communicate selection or status. Check text and control contrast against actual surfaces; meet WCAG AA text contrast.

Honor `prefers-reduced-motion`. Current styles disable or shorten animation and transitions and restore visible content. Preserve this behavior in any migrated implementation. See `MOTION.md` for motion details.

## Implementation boundary

The current React/Vite rendering is the visual baseline. Keep CSS cascade and import order until equivalent appearance is demonstrated. Typography, color, dimensions, composition, mobile behavior, and effects must not drift incidentally during framework migration.

Astro, React Islands, and Starlight are approved architecture only. Do not describe them as implemented or use the target system as a reason to redesign the experience.

## Documentation layout

The documentation prototype uses a compact header, left navigation, central reading column, and right On This Page navigation on wide screens. Reflow these regions instead of forcing three columns onto narrow screens.

The header carries CubyCloud identity, a home route, search, theme selection, and GitHub.
Article components include breadcrumbs, headings and anchors, callouts, code examples, tables, steps, and previous/next links.
Prefer native Starlight components when implementing the approved target.

At mobile widths, provide a compact header, operable navigation drawer, search dialog, expandable table of contents, and horizontally scrollable code and tables. Overlays need an accessible close action, Escape behavior, and predictable focus handling.

The documentation prototype provides light, dark, and system appearance choices. Keep theme styling scoped to documentation so it cannot recolor the marketing site. Explicit selections persist across sessions; system mode follows the operating-system preference.

Use short transitions for interface feedback. Article pages remain reading surfaces: no WebGL, parallax, scroll hijacking, or cinematic scene choreography. Refer to `MOTION.md` for shared motion rules.

Colors and font families above match `src/styles.css` and `src/docs/docs.css` in the current website. These source files remain authoritative if implementation values change.
