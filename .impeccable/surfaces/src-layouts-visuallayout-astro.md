---
version: 1
slug: "src-layouts-visuallayout-astro"
primary_target: "src/layouts/VisualLayout.astro"
related_targets: ["src/pages/index.astro"]
---

# Surface: cheatsheet pages and index

Mode: Read (lookup). Scope this round: theme layer in styles.css, VisualLayout, GlobalNav, index page and the shared visual-js components. Page files stay untouched; a full page rewrite is a later round.

Audience: Drew, mid-coding, second screen. Must keep: density and the colour coding (mutates/immutable, input/process/output).

## Direction contract

THESIS: A printed reference chart: flat category colour does the wayfinding, rules do the structure, diagrams carry the behaviour. User kept the chart look and layout but rejected the periodic-element metaphor (no symbol tiles, no atomic numbers). Refuses the dark navy card stack with rainbow emoji headings.

OWN-WORLD: Laminated chart ground (cool off-white), near-black ink, flat category fills: primitives saffron, core concepts cobalt, browser APIs viridian, git vermilion. Mutates vermilion with a filled-dot glyph, returns-new viridian with an open-dot glyph. Archivo for text, JetBrains Mono for code only. Square tiles, 1px rules, no nested cards, no shadows.

STORY: Find the page from the grouped index, find the method by its rule-separated heading, read the diagram, back to the editor.

FIRST VIEWPORT: Index is a chart key: four category columns, each headed by a solid colour band, topics listed beneath. Topic pages open on a colour band naming the group above the title; nav rail left with group swatches, on-this-page rail right.

FORM: Periodic Chart minus the element motif (user steer), my list position 3 of 7. seed:855a1df82ea389f2

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
