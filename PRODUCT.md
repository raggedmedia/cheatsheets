# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
One user: Drew, a developer, glancing at a page on a second screen while writing JavaScript. The job is to find a method, signature or behaviour fast and get back to the editor.

## Product Purpose
Visual cheatsheets for core JavaScript concepts, primitives, browser APIs and git. Each page shows how a thing behaves (inputs, outputs, mutation, return values) with diagrams and code, not prose. Success means the answer is found in seconds without reading paragraphs.

## Positioning
Visual over textual. Pages diagram behaviour (arrays in, arrays out, mutates or not) instead of restating MDN.

## Operating Context
Used beside an editor, often at half-screen width or on a second monitor. Lookup, not linear reading. Content is considered deprecated; it is kept as is, and only the design changes.

## Capabilities and Constraints
- Astro 5 static site with Tailwind 4 (Vite plugin) and the typography plugin.
- Shared layout `src/layouts/VisualLayout.astro`, global nav `src/components/visual-js/GlobalNav.astro`, and reusable components in `src/components/visual-js/`.
- Pages prefixed with `_` are drafts and not routed.
- Content, copy and page structure stay. Supabase and Auth0 clients in `src/lib/` are unused by the visual pages.

## Brand Commitments
- The Gideon skull (`public/gideon-skull.svg`) is the site's mark and must be kept.

## Evidence on Hand
Existing page content only. No testimonials, users or metrics; none should be invented.

## Product Principles
1. Seconds to answer: scanability beats explanation.
2. Show behaviour, do not describe it.
3. Code is the primary content; it must be legible at a glance.
4. One person's tool: no marketing, no onboarding.
