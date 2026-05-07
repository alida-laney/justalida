# Claude Code Context for justalida.com

## Site Overview

**Domain**: justalida.com (GitHub Pages with custom domain)
**Purpose**: Personal creative website — cartography as metaphor. Alida's poems, essays, and other work, plus professional offerings and connection.
**Architecture**: Jekyll-based static site
**Active branch**: `site-structure-revamp` (not yet merged to main)

---

## Site Structure & Navigation

Nav: **home** | **explore** (dropdown) | **contact**

The explore dropdown links to:
- **Open Seas** (`/seas/`) — all work chronologically, oldest → newest, with tag filtering
- **Farmlands** (`/farmlands/`) — curated collections ("fields")
- **Roads** (`/roads/`) — not yet built

Static pages at root: `index.md`, `seas.md`, `farmlands.md`, `roads.md`, `contact.md`, `work.md` (legacy, shows a "things are different" notice)

---

## Content Collections

### Poems — `_poems/filename.md`
```yaml
---
title: "Title"
layout: poem
date: 2026-01-18        # date written
published: 2025-12-31   # date added to site (omit if written & published same day)
tags: [tag1, tag2]
excerpt: "A short quote"
dedication: "person"    # optional
order: 3                # optional, for same-day ordering
---
```
- Poems dated before 2026-01-01 have `published: 2025-12-31` (site launch date)
- Line breaks in poems use two trailing spaces (`  `)

### Posts — `_posts/YYYY-MM-DD-title.md`
Standard Jekyll posts. Can include `tags` for filtering on Seas.

### Fields (Curated Collections) — `_fields/field-name.md`
```yaml
---
title: "Field Title"
layout: field           # auto-applied via _config.yml default
description: "One line description."
order: 1                # sort order on Farmlands page
symbol: star            # any legend symbol name (see below)
color: pink             # any palette color name (see below)
works:
  - slug: poem-filename-without-extension
    collection: poems
  - slug: post-slug
    collection: posts
---
```
- Works can appear in multiple fields
- Slug matching uses `where_exp` on `p.path contains work.slug`
- Field pages live at `/fields/field-name/`

---

## Design System

### Palette (CSS variables in `assets/css/main.scss`)
| Variable | Hex | Use |
|---|---|---|
| `--cream` | `#f8f5f0` | Page background |
| `--charcoal` | `#4a4a4a` | Body text |
| `--light-gray` | `#e8e3db` | Borders, dividers |
| `--soft-blue` | `#89c5d4` | Links, active states |
| `--soft-purple` | `#c9aed6` | Accent |
| `--soft-pink` | `#f4b8c4` | Accent |
| `--soft-yellow` | `#f9e4a0` | Accent |
| `--soft-orange` | `#f5c78e` | Accent |
| `--soft-green` | `#a8c5a0` | Accent |
| `--soft-brown` | `#c4a882` | Accent |

Color class names (apply to any symbol): `.purple` `.pink` `.blue` `.yellow` `.orange` `.green` `.brown`

### Legend Symbols
Symbols and colors are independent — mix freely: `<span class="accent-triangle pink"></span>`

| Class | Glyph | Name |
|---|---|---|
| `.accent-triangle` | ▲ | triangle |
| `.accent-square` | ■ | square |
| `.accent-star` | ★ | star |
| `.accent-water` | ≈ | water |
| `.accent-target` | ⊙ | target |
| `.accent-compass` | ✦ | compass |
| `.accent-asterisk` | ✳ | asterisk (reserved) |
| `.accent-circle` | ● | circle (reserved) |

All symbols share a subtle brown text-shadow outline via CSS.

### Key CSS Classes
- `.landing-page` — page wrapper, max-width 700px, centered
- `.content-section` — white card with shadow (used everywhere)
- `.index-section` — fixed 450px centered wrapper (index page)
- `.connect-section` — fixed 500px centered wrapper (connect page)
- `.seas-grid` — max-width 600px centered, used for work listings
- `.intro-box` — pale blue (`#f4f9fb`) italic box for verse/quotes
- `.card-link` — makes a whole `.content-section` clickable
- `.filter-btn` — pill button for Seas tag filters
- `.seas-item` — individual work card
- `.work-nav` — prev/next navigation at bottom of poem pages
- `.summary-text` / `.summary-title` / `.summary-sub` — details/summary styling (Connect page)
- `.link-item` / `.link-desc` — link with description below (Connect page)

### Background
Faint topographic contour lines on `body` via SVG `background-image`.

---

## Prev/Next Navigation (poem layout)

Works are navigable with `?context=` URL param:
- No param or `?context=seas` → chronological order (all poems + posts by date)
- `?context=field-slug` → order from that field's `works` list

Field pages automatically append `?context={{ page.slug }}` to work links. Context carries through prev/next clicks.

---

## Layouts

- `landing.html` — all pages (includes nav + contour background)
- `poem.html` — extends landing, adds prev/next nav with JS-embedded order data
- `field.html` — extends landing, renders works list from frontmatter
- `post.html` — extends default (minima), for `_posts`
- `tag_page.html` — individual theme tag pages

---

## Development

```bash
# Start local dev server (must restart for _config.yml changes)
./dev.sh
# or
bundle exec jekyll serve --drafts --livereload

# Build
bundle exec jekyll build
```

**Important**: `_config.yml` changes require a full server restart — livereload does not pick them up.

---

## Deployment

- `main` branch auto-deploys to justalida.com via GitHub Actions
- Custom domain via CNAME file
- Workflow: `.github/workflows/jekyll.yml`
- Current work is on `site-structure-revamp` branch, not yet in production

---

## Guiding Principles

- **Cartography as brand** — maps, terrain, waypoints, water as recurring metaphors
- **No jarring interactions** — smooth, stays-in-place, non-disruptive UX
- **Chronology matters** — date written is sacred; `published` field distinguishes archive additions
- **Mobile-friendly** — test on real devices for touch behavior
- **Lightweight** — no JS frameworks, no build tools beyond Jekyll
