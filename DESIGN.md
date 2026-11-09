---
name: Visual cheatsheets
description: A printed reference chart for JavaScript, browser APIs and git, read beside the editor.
colors:
  ground: "#f3f4f1"
  ink: "#17191e"
  rule: "#d3d6cf"
  muted-ink: "oklch(0.47 0.008 250)"
  paper-shade: "oklch(0.8 0.01 95)"
  cell: "oklch(0.955 0.008 250)"
  cell-rule: "oklch(0.78 0.008 250)"
  node-fill: "oklch(0.975 0.008 250)"
  group-primitives: "oklch(0.78 0.15 80)"
  group-core: "oklch(0.52 0.17 262)"
  group-browser: "oklch(0.5 0.12 158)"
  group-git: "oklch(0.52 0.17 38)"
  mutates: "oklch(0.52 0.17 32)"
  immutable: "oklch(0.47 0.12 158)"
  mutates-tint: "oklch(0.96 0.02 32)"
  immutable-tint: "oklch(0.96 0.02 158)"
  info-tint: "oklch(0.96 0.02 262)"
  tip-tint: "oklch(0.96 0.02 85)"
  flow-input: "oklch(0.6 0.16 262)"
  flow-process: "oklch(0.6 0.16 302)"
  flow-output: "oklch(0.6 0.16 158)"
  process-ink: "oklch(0.42 0.14 302)"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "3rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title-code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.333
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    lineHeight: 1.556
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\""
  body-sm:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.375
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.429
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.333
    letterSpacing: "0.025em"
rounded:
  none: "0px"
  xs: "1px"
  sm: "2px"
  lg: "3px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "14": "56px"
components:
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "3px 8px"
  nav-link-active-primitives:
    backgroundColor: "{colors.group-primitives}"
    textColor: "{colors.ink}"
    padding: "3px 8px"
  nav-link-active-core:
    backgroundColor: "{colors.group-core}"
    textColor: "{colors.ground}"
    padding: "3px 8px"
  index-band-core:
    backgroundColor: "{colors.group-core}"
    textColor: "{colors.ground}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
  index-topic:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: "10px 12px"
  badge-mutates:
    backgroundColor: "{colors.mutates}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  badge-immutable:
    backgroundColor: "{colors.immutable}"
    textColor: "{colors.ground}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "2px 8px"
  note-info:
    backgroundColor: "{colors.info-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  note-tip:
    backgroundColor: "{colors.tip-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.none}"
    padding: "10px 12px"
  note-mutates:
    backgroundColor: "{colors.mutates-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: "10px 12px"
  note-immutable:
    backgroundColor: "{colors.immutable-tint}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    padding: "10px 12px"
  array-cell:
    backgroundColor: "{colors.cell}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px 12px"
    width: "40px"
  diagram-node:
    backgroundColor: "{colors.node-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "8px"
    width: "140px"
---

# Design System: Visual cheatsheets

## Overview

**Creative North Star: "The laminated reference chart"**

The site reads like a chart pinned beside a workbench. A cool off-white ground, near-black ink and four flat category colours do the wayfinding. Rules do the structure. Diagrams carry the behaviour. Nothing floats, nothing glows, and nothing is decorated for its own sake.

Density is high on purpose. The reader is mid-task on a second screen, so every page is a lookup surface: a left rail of topics grouped by colour, a right rail of methods, and a centre column of rule-separated method entries with a small diagram each. Colour is reserved for meaning: which group a page belongs to, whether a method mutates, and which part of a flow is input, process or output.

The user kept the chart look and layout but rejected the periodic-element metaphor: no symbol tiles, no atomic numbers. The dark navy card stack with rainbow emoji headings that preceded this world is the confirmed anti-reference.

**Key Characteristics:**
- Flat category fills on a cool off-white ground.
- 1px rules divide, 3px ink bars head sections, a 6px group-colour bar closes each page title.
- Square corners on every built component.
- Archivo for all text, JetBrains Mono for code only.
- Mutation is coded twice: colour plus a filled or open dot.

## Colors

A quiet neutral chart with four saturated category flats and a paired vermilion and viridian for mutation.

### Primary
- **Saffron** (group-primitives): Primitives group. Index band, nav swatch, active nav fill, the page title bar on primitives pages, and text selection. The only group colour light enough to carry ink text.
- **Cobalt** (group-core): Core concepts group, in the same places. Also the global focus ring.
- **Viridian** (group-browser): Browser APIs group.
- **Vermilion** (group-git): Git group.

### Secondary
- **Mutation vermilion** (mutates): Fill of the 'Mutates' badge and the filled dot in mutation notes.
- **Return viridian** (immutable): Fill of the 'Immutable' badge and the open dot in immutable notes.
- **Mutation tint** (mutates-tint) and **Return tint** (immutable-tint): Backgrounds of the matching mutation notes.

### Tertiary
- **Flow blue, violet and green** (flow-input, flow-process, flow-output): 2px borders on diagram nodes for input, process and output. **Violet ink** (process-ink) sets the short description inside a process node.
- **Info tint** (info-tint) and **Tip tint** (tip-tint): Backgrounds of info and tip notes.

### Neutral
- **Chart ground** (ground): Page background everywhere. Text colour on dark group fills and badges.
- **Ink** (ink): All primary text, section-title bars, the index header bar.
- **Hairline** (rule): Every 1px divider: rails, method sections, index lists.
- **Muted ink** (muted-ink): Signatures, uppercase labels, rail headings, array indices.
- **Paper shade** (paper-shade): Hover fill at 30% opacity on nav and index links.
- **Cell** (cell), **Cell rule** (cell-rule), **Node fill** (node-fill): Array cells, their 3px underline, and diagram node interiors.

### Named Rules
**The Inverted Ramp Rule.** Every Tailwind hue ramp is remapped to the chart palette and inverted for a light ground: steps 50 to 400 are ink-dark, 500 is the full hue, 600 to 950 are tints. `white` is ink and `black` is a paper shade. Write new markup against these meanings; `text-white` renders ink, not white.

**The Colour Means Something Rule.** Group colours mark group membership, mutation colours mark mutation, flow colours mark flow roles. A colour never appears as decoration. The two system exceptions are saffron selection and the cobalt focus ring.

**The Never Colour Alone Rule.** Mutation always pairs colour with a glyph: a filled dot for mutates, an open dot for immutable, drawn as inline SVG.

## Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui)
**Body Font:** Archivo (with ui-sans-serif, system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace), code only

**Character:** One sturdy grotesque at three weights (400, 600, 800) does all the talking, tight and heavy at the top, plain in the body. Mono is the content, so it gets the method names at title size.

### Hierarchy
- **Display** (800, 3.75rem, 1): Index page title only.
- **Page title** (800, 3rem from 640px, 2.25rem below, 1): Topic page title, balanced wrap.
- **Headline** (800, 1.875rem, 1.2): Section titles, sitting on a 3px ink bar.
- **Title code** (Mono 600, 1.5rem, 1.333): Method names.
- **Title** (800, 1.125rem): Category names in the index bands.
- **Body** (400, 1rem, 1.5, tabular figures): Index topics. Method descriptions sit at 15px, capped at 70ch.
- **Body small** (400, 0.875rem, 1.375): Notes, nav links, rails.
- **Code** (Mono 400, 0.875rem): Signatures in muted ink, inline code.
- **Label** (600, 0.75rem, 0.025em, uppercase): Rail headings, nav group names, subsection headings, badge text, diagram node captions.

### Named Rules
**The Mono Is Code Rule.** JetBrains Mono sets code, method names, signatures and array values. It never sets prose, labels or navigation.

**The 12px Floor Rule.** Nothing renders below 0.75rem. The theme lifts legacy 9 to 11px label classes to 0.75rem in one place.

## Layout

Topic pages use a three-column grid capped at 1680px: a 220px topic rail, a fluid centre, and a 220px on-this-page rail from 1280px. Between 768px and 1279px the topic rail narrows to 200px and the on-this-page list moves under it. Below 768px both rails hide and a back link to the index replaces them. Rails are sticky, full-height and scroll independently, each separated from the centre by a 1px rule.

The centre column pads 16px on mobile and 32px from 640px. Method entries stack as rule-separated sections (20px above, 28px below). From 1536px each entry splits into a 240px heading column and a fluid diagram column. Section titles open with 56px of space above.

The index is a chart key at 1200px max: one column, two from 640px, four from 1024px, each a solid colour band over a hairline-bordered topic list.

Diagram flows run left to right as input, arrow, process, arrow, output, and wrap rather than scroll at narrow widths.

## Elevation & Depth

The system is flat. There are no shadows anywhere. Depth comes from tint: notes and diagram wells sit on pale tinted fills, array cells and return values carry a 3px underline like a printed tab, and diagram nodes are outlined in their flow colour. Hover is a 30% paper-shade fill, not a lift.

### Named Rules
**The Three Weights Rule.** Structure is drawn with three rule weights only: 1px hairline to divide, 3px ink to head a section or the index, 6px group colour to close a page title.

## Shapes

Every built component is square. The theme caps the sized Tailwind radius classes (xs to xl) at 1 to 3px so legacy page markup stays near-square. Silhouettes are rectangles and bars; the only round forms are the mutation dots.

## Components

### Navigation
Plain, dense, colour-keyed.
- **Brand:** The Gideon skull mark at 28px beside 'Visual cheatsheets' in 800 uppercase at 13px.
- **Groups:** A 10px square swatch in the group colour, then the group name as a label in muted ink.
- **Links:** Body small in ink, 3px by 8px padding, no underline. Hover adds the paper-shade fill.
- **Active:** Filled with the group colour, text in ink on saffron and ground on the others, weight 600, `aria-current="page"`.
- **Mobile:** Rails hide; a back link to the index sits above the title.

### Index band
A solid group-colour band naming the category in Title type, padded 8px by 12px, over a list of topics each padded 10px by 12px and divided by hairlines.

### Method entry
The signature component. A hairline on top, the method name in Title code, a mutation badge beside it, the signature in muted Code, a 15px description, then the diagram.
- **Badge:** Square, label type in ground on mutation vermilion or return viridian, with the filled or open dot.

### Notes
Square tinted wells padded 10px by 12px, Body small in ink. Info uses info tint, tips use tip tint, mutation notes use the matching mutation tint and lead with the dot. Leading emoji in slotted content is stripped at render.

### Diagram parts
- **Node:** At least 140px wide, node-fill interior, 2px border in its flow colour, a label caption above.
- **Arrow:** A 48px, 2px line with a CSS triangle head, optional caption above.
- **Array cell:** Mono 600 value in a cell-fill box at least 40px wide with a 3px cell-rule underline and its index above in muted mono. Added, removed and transformed cells switch to green, red and orange tints with full-hue underlines; removed values strike through.
- **Return value:** A cell-fill box with the 3px underline, the value in mono and its type in muted sans beneath.

### Section and subsection titles
Section titles are Headline type on a 3px ink bar. Subsection titles are Label type in muted ink; when a method entry follows a section title directly, its top hairline is suppressed so the bar is not doubled.

### Known constraint: legacy page markup
Page files under `src/pages/visual/` still carry the old dark-theme utility classes (`bg-gray-800`, `text-yellow-400`, `bg-black/30`, bare `rounded`, 10px labels). The theme layer repaints them through the Inverted Ramp Rule, the radius cap on sized classes and the 12px floor. That markup is not part of this system; do not copy its classes into new components.

## Do's and Don'ts

### Do:
- **Do** take colour from the theme tokens (`ground`, `ink`, `rule`, `group-*`, `mutates`, `immutable`) and read every ramp step through the Inverted Ramp Rule.
- **Do** mark a new topic with its group colour in exactly the existing places: nav swatch, active fill, index band, 6px title bar.
- **Do** pair mutation colour with the filled or open dot.
- **Do** keep components square and flat, separated by 1px hairlines.
- **Do** strip leading emoji from any slotted or rendered rail content.

### Don't:
- **Don't** add shadows, glows or lifted cards.
- **Don't** nest cards; a note or diagram well sits directly in the method entry.
- **Don't** use the periodic-element motif: no symbol tiles, no atomic numbers.
- **Don't** return to dark navy card stacks or emoji headings.
- **Don't** set prose or labels in JetBrains Mono.
- **Don't** set text below 0.75rem.
