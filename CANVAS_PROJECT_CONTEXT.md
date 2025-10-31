# Canvas - Visual Page Builder Project

## Project Vision

Building a **visual HTML page builder** that uses the actual browser engine for layout (not simulating like Figma). The tool lets designers build real websites visually while generating clean, semantic HTML with Tailwind classes.

### Unique Value Proposition
- **Figma's simplicity** + **Browser's reality** + **Open/exportable**
- No translation layer - it IS the code
- True responsive testing (just resize browser)
- Framework-agnostic (works anywhere HTML/Tailwind works)

## Current Status (v0.01)

✅ **Shipped Features:**
- Drag & drop elements (section, div, header, footer, h1, p, a)
- Properties panel (layout, padding, background, border-radius, text)
- Nested drag & drop (containers accept drops)
- State persistence (localStorage with auto-save)
- HTML export with Tailwind CDN
- Element selection and deletion

📁 **Main File:** `/src/pages/canvas.astro`

## Technical Architecture

### **Tech Stack**
- **Framework:** Vanilla JavaScript + TypeScript (Astro for page rendering)
- **Styling:** Tailwind CSS (as design system for MVP)
- **State:** JSON serialization to localStorage
- **No UI framework** - keeping it simple for MVP

### **Key Design Decisions**

#### 1. **Tailwind as Design System (for now)**
- Using Tailwind's preset values (p-4, bg-blue-500, etc.)
- No custom design system editor for MVP
- Arbitrary values supported later if needed (p-[18px], bg-[#FF6B35])
- Export format: Tailwind classes (not inline styles)

#### 2. **State Management**
```typescript
interface CanvasState {
  version: string;
  elements: Element[];
}

interface Element {
  id: string;
  tag: string;
  classes: string[];  // Tailwind classes as array
  textContent?: string;
  children: Element[];
  attributes?: Record<string, string>;
}
```

- Auto-saves to localStorage (1 second debounce)
- JSON format allows future DB migration
- Can import/export as files

#### 3. **No Frameworks (Yet)**
- Vanilla JS is fine for 100-500 elements
- Event delegation prevents performance issues
- Only consider React/Vue if:
  - Real-time collaboration needed
  - Complex state sync becomes painful
  - Spending more time on DOM manipulation than features

#### 4. **Element Model (Simplified like Figma)**
- **Containers:** section, div, header, footer (layout elements)
- **Text:** h1, p, a (content elements)
- That's it for MVP - keep it simple!

### **Architecture Patterns**

```typescript
// Element Factory - creates new elements with defaults
function createElement(elementType: string): HTMLElement

// State Manager - serialize/deserialize
class StateManager {
  save(state: CanvasState)
  load(): CanvasState | null
  serializeElement(element: HTMLElement): Element
  deserializeElement(data: Element): HTMLElement
  captureState(): CanvasState
  restoreState(state: CanvasState)
}

// Event Handlers
function setupDroppable(element: HTMLElement)  // Drag & drop
function makeSelectable(element: HTMLElement)  // Click to select
function updatePropertiesPanel(element: HTMLElement)  // Sync UI
```

## Learning Approach (70% Guided / 30% Independent)

### **Approach 1: Guided Implementation (70%)**
For new features:
1. Drew describes what to build
2. AI provides architecture + skeleton code with TODOs
3. Drew implements the logic
4. AI reviews and explains improvements

### **Approach 3: Independent First (30%)**
For exploratory work:
1. Drew attempts implementation first
2. Gets stuck, shows code to AI
3. AI helps debug and explains
4. Drew fixes and continues

### **Goal:** Understand every line of code, even if AI helped write it

## MVP Roadmap

### **Phase 1: Foundation (COMPLETE ✅)**
- [x] Drag & drop elements
- [x] Basic properties panel
- [x] State persistence
- [x] HTML export
- [x] Nested containers

### **Phase 2: UX Polish (Next)**
- [ ] Delete key support
- [ ] Cmd/Ctrl+S to save
- [ ] Better drag ghost preview
- [ ] Toast notifications
- [ ] Duplicate element button

### **Phase 3: Essential Features**
- [ ] Undo/Redo (array of states)
- [ ] More text styles (h2, span, etc.)
- [ ] Margin controls
- [ ] Width/height controls
- [ ] Custom color picker

### **Phase 4: Advanced (Future)**
- [ ] Multiple pages (iframe-based)
- [ ] Component library (save/reuse components)
- [ ] Responsive breakpoint preview
- [ ] Export to frameworks (React, Vue, Astro)

## Constraints & Philosophy

### **Time Constraint**
- ~1 hour per day after work
- Must ship incremental progress
- No over-engineering

### **Learning Goals**
- Build JavaScript skills through doing
- Understand patterns, not just copy code
- Focus on fundamentals (DOM, events, state)

### **Feature Philosophy**
- **Ship ugly, polish later**
- Validate with real use before adding features
- Build the Office Directory example to test workflow
- Fix top 3 UX annoyances before adding new features

## What NOT to Do

❌ Add 20 features before using it
❌ Build design system editor (Tailwind is fine)
❌ Switch to React (vanilla JS is fine)
❌ Add real-time collaboration (way too early)
❌ Support every HTML element (stick to core set)
❌ Custom positioning (block flow is enough for now)

## Quick Reference

### **File Structure**
```
src/pages/canvas.astro          # Main page
src/styles/styles.css            # Global styles (Tailwind + custom)
```

### **Key Functions to Know**
- `createElement()` - Factory for new elements
- `setupDroppable()` - Makes element accept drops
- `makeSelectable()` - Makes element clickable
- `selectElement()` - Shows properties panel
- `updatePropertiesPanel()` - Syncs panel with element
- `autoSave()` - Debounced save to localStorage

### **Key Classes**
- `droppable-container` - Can accept nested drops
- `selected` - Currently selected element
- `drag-over` - Visual feedback during drag
- `palette-item` - Draggable items in sidebar

### **Data Attributes**
- `data-element-id` - Unique ID for each element (UUID)
- `data-element-type` - Type of element to create (section, div, h1, etc.)
- `data-drag-type` - Always "element" for now
- `data-show-for` - Which elements show this property field

## Example Workflow (Office Directory)

Goal: Replicate this design to validate the tool
1. Drag section to canvas
2. Set padding to p-16
3. Drag h1, edit text to "Office directory"
4. Drag div below, set layout to Grid 2 Columns
5. Drag divs into each grid cell
6. Build out card structure (icon + text)

## Future Considerations

### **When to Add Framework**
Signals you need React/Vue:
- Manual DOM updates in 5+ places
- Real-time collaboration
- Complex undo/redo with time-travel
- Spending 50%+ time on DOM manipulation

### **When to Add Design System Editor**
- Multiple users requesting custom colors
- Need brand-specific spacing scales
- Tailwind presets feel too limiting

### **When to Add Multiple Pages**
- Users building full websites (not just sections)
- Need to test navigation flows
- Component reuse across pages becomes important

## Common Patterns

### **Adding a New Property**
1. Add dropdown/input to properties panel HTML
2. Add `data-show-for` attribute if element-specific
3. Wire up event listener
4. Remove old classes, add new classes
5. Call `autoSave()`

### **Adding a New Element Type**
1. Add to palette HTML with `data-element-type`
2. Add case to `createElement()` switch
3. Define default Tailwind classes
4. Add to containerTags array if droppable

### **Debugging State Issues**
1. Check browser console for state logs
2. Inspect localStorage: `localStorage.getItem('canvas-state')`
3. Clear state: `localStorage.removeItem('canvas-state')`
4. Check element has `data-element-id` attribute

## Performance Notes

**Current limits (before slowdown):**
- Elements per page: 500+
- Total pages: 50+
- Undo/redo history: 100+ states

**Optimization tricks used:**
- Event delegation (one listener on canvas)
- Debounced auto-save (1 second)
- stopPropagation() to prevent bubble
- DocumentFragment for batch DOM updates (future)

## Questions to Ask AI

**Good questions:**
- "How would I implement [feature X]? Can you give me the architecture?"
- "Here's my attempt at [feature]. What's wrong and why?"
- "What's the pattern for [common task]?"
- "How do I debug [specific issue]?"

**Bad questions:**
- "Build me [entire feature]"
- "Add [feature] without explaining"
- "What should I build next?" (You decide, not AI)

## Success Metrics

**You're learning if:**
- ✅ Can explain WHY code works
- ✅ Can modify AI code without breaking it
- ✅ Can build similar features independently
- ✅ Recognize patterns between features

**You're NOT learning if:**
- ❌ Copy-paste without understanding
- ❌ Can't explain what functions do
- ❌ Always asking AI to add features
- ❌ Only refining UI, never touching logic

## Next Session Checklist

When starting a new session with AI:
1. Share this file: "Here's my project context: [paste/attach file]"
2. State current goal: "I want to add [feature]"
3. Specify approach: "Use guided implementation" or "Let me try first"
4. Ask questions: "What pattern should I use?"

## Resources & References

- **Tailwind Docs:** https://tailwindcss.com/docs
- **MDN Drag & Drop:** https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API
- **localStorage API:** https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

---

**Last Updated:** 31 October 2025
**Version:** v0.01
**Status:** MVP shipped, ready for iteration
**Next Goal:** Build Office Directory example + fix top 3 UX issues
---
# Drew's future notes

## POC Improvements
- need to be able to reset canvas.
- ~~need to be able to tell which item is selected (figma blue border)~~ was already there, style tag wasn't set to global so some didn't work.
- ~~text should be inline editable~~ done.
- need to be able to delete items
- need to be able to move items once on canvas
- need to be able to duplicate items on canvas
- need extra heading options
- need to able to set typography options for headings and p tags
 - text size
 - weights
 - line height
 - letter spacing
 - margin
 - padding? (already have it)
- add image placeholder
- add button
- divs get automatic p-4 on build, should be zero or should be set via properties (currently says none)
- need to be able to add new items to end of canvs (as in once you add a section, drag a new one below it)
- need to call out the difference between section and div. Section for top level page only? Div for anything within a section?

### future headaches
- how do we handle breakpoints?
- set formatting options within a paragraph or heading or link
- add OL and UL lists

# Add new patterns you discover
## Pattern: Handling Multi-Select
[Your notes here]

# Update roadmap
- [x] Undo/Redo implemented
- [ ] Next thing...

# Update learnings
### Lesson: Event Bubbling
[What you learned]
