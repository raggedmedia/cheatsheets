# Button Zoo Roadmap

## Technical Architecture Decision

### Current Stack
- Astro for routing, pages, static content
- Vanilla JS for interactivity
- Tailwind CSS for styling

### Future Stack (Phase 2+)
- Keep Astro as the foundation
- Add **Preact** (3KB) via Astro Islands for complex interactive features
- Stay lightweight, only use framework where needed

---

## Recommended Path Forward

### Step 1: Link Styler (Stay Vanilla) - Next
- Copy `btn-styler.astro` → `link-styler.astro`
- Remove: padding controls, border width, active/disabled states
- Keep: colors (default, hover), text decoration, underline offset
- Add: underline style, text transform

### colour setter?
### spacing scale setter?

### Step 2: IndexedDB + Basic Zoo (Stay Vanilla)
- Install Dexie.js for easy IndexedDB
- Add "Save to Zoo" button in stylers
- Build zoo grid page (simple cards)
- Test with 5-10 buttons

### Step 3: Supabase + Auth (Still Vanilla)
- Set up Supabase project
- Add login/signup modals (vanilla JS or headless UI)
- Sync IndexedDB → Supabase on login
- Add public/private toggle

### Step 4: Evaluate Framework Need
- If you're happy with vanilla → keep going!
- If you're drowning in DOM manipulation → add Preact
- Only convert the complex parts

### Step 5: Visual Editor (Preact)
- Build as new Astro page with Preact island
- Use dnd-kit for drag and drop
- State management with Zustand
- Connects to existing zoo/styles

---

## Supabase Free Tier Limits

**Free Forever (No Credit Card Required):**
- 🗄️ **500 MB database** (plenty for thousands of button styles)
- 📦 **1 GB file storage**
- 🔐 **50,000 monthly active users**
- 📡 **2 GB bandwidth/month**
- ⚡ **500 MB edge function invocations**
- 🔄 **Realtime** (500 concurrent connections)

**What triggers paid:**
- Going over those limits
- Adding more projects (2 free)
- Custom domains
- Point-in-time recovery
- Daily backups (free tier = 7 days)

**Verdict:** Won't hit limits for a LONG time (thousands of active users needed).

---

## Implementation Timeline

### Week 1-2: Link Styler + Local Zoo
- [ ] Build Link Styler page
- [ ] Install and configure Dexie.js
- [ ] Create IndexedDB schema for button/link styles
- [ ] Add "Save to Zoo" functionality
- [ ] Build basic zoo grid display
- [ ] Add edit/delete/duplicate for zoo items

### Week 3: Cloud Integration
- [ ] Create Supabase project
- [ ] Set up database schema (button_styles table)
- [ ] Configure row-level security
- [ ] Add Supabase client to project
- [ ] Implement basic auth UI (signup/login)
- [ ] Sync IndexedDB to Supabase on login

### Week 4: Public Zoo & Sharing
- [ ] Add public/private toggle
- [ ] Build public zoo page
- [ ] Add search/filter functionality
- [ ] Implement clone/fork feature
- [ ] Add share links

### Week 5+: Visual Editor (Preact Phase)
- [ ] Install Preact integration
- [ ] Build drag-and-drop canvas
- [ ] Component palette
- [ ] Property panel
- [ ] Connect to zoo styles
- [ ] Export functionality

---

## Philosophy: Start Vanilla, Migrate When It Hurts

You'll **KNOW** when vanilla JS becomes painful (usually around "I'm writing the same `getElementById` + `addEventListener` combo for the 50th time").

The beauty of Astro: you can add Preact to ONE page without affecting the others.

---

## Data Structure: Button Style Object

```javascript
{
  id: "primary-cta",
  name: "Primary CTA",
  description: "Main call-to-action button",
  type: "button", // or "link"
  styles: {
    // Default state
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    bgColor: "--color-blue-500",
    borderColor: "--color-blue-700",
    textColor: "--color-white",
    borderWidth: "var(--spacing-2)",
    borderRadius: "var(--spacing-4)",

    // Hover state
    hoverBgColor: "--color-green-500",
    hoverBorderColor: "--color-green-700",
    hoverTextColor: "--color-white",

    // Active state (buttons only)
    activeBgColor: "--color-green-700",
    activeBorderColor: "--color-green-900",
    activeTextColor: "--color-white",

    // Disabled state (buttons only)
    disabledBgColor: "--color-gray-300",
    disabledBorderColor: "--color-gray-400",
    disabledTextColor: "--color-gray-500"
  },
  tags: ["primary", "cta", "blue"],
  is_public: false,
  created_at: "2025-10-21T...",
  updated_at: "2025-10-21T..."
}
```

---

## Supabase Database Schema

```sql
-- Button Styles table
CREATE TABLE button_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'button' or 'link'

  -- Style properties (JSON)
  styles JSONB NOT NULL,

  -- Metadata
  is_public BOOLEAN DEFAULT false,
  tags TEXT[],
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_id ON button_styles(user_id);
CREATE INDEX idx_public ON button_styles(is_public) WHERE is_public = true;
CREATE INDEX idx_tags ON button_styles USING GIN(tags);
CREATE INDEX idx_type ON button_styles(type);

-- Row Level Security (RLS)
ALTER TABLE button_styles ENABLE ROW LEVEL SECURITY;

-- Users can read their own buttons
CREATE POLICY "Users can view own buttons"
  ON button_styles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can read public buttons
CREATE POLICY "Anyone can view public buttons"
  ON button_styles FOR SELECT
  USING (is_public = true);

-- Users can insert their own buttons
CREATE POLICY "Users can create own buttons"
  ON button_styles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own buttons
CREATE POLICY "Users can update own buttons"
  ON button_styles FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own buttons
CREATE POLICY "Users can delete own buttons"
  ON button_styles FOR DELETE
  USING (auth.uid() = user_id);
```

---

## Future Features (Social Phase)

- ❤️ Like/favorite buttons
- 👁️ View counts
- 🔍 Search by tags, colors, name
- 📋 Collections/folders
- 🔗 Share links (`/zoo/button/abc123`)
- 🎨 Generate variations
- 💬 Comments
- 🏆 Trending/popular buttons
- 👤 User profiles
- 🔄 Version history
- 🎭 Templates/presets
- 📤 Export as CSS/React/Vue/Svelte components
