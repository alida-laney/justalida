# Claude Code Context for justalida.com

## Site Overview

**Domain**: justalida.com (GitHub Pages, custom domain via CNAME)
**Purpose**: Personal creative website — Alida's poems, essays, and offerings.
**Architecture**: Jekyll static site. No frameworks, no build tools beyond Jekyll. Plain CSS + vanilla JS.

**Current era — "An Autumn Stroll"** (launched Nov 2026): the homepage is a directed, cinematic sidescroll — a bundled figure on an evening walk through an autumn, Pittsburgh-flavored city. Scroll down → the world parallax-scrolls left, the sky falls from day → dusk → night, lights come on, leaves drift, and the city dissolves into a pastel drawing at the end.

**Previous era — "The Atlas"** (cartography): fully preserved and browsable at `/atlas/`, reached gently through the `/wander/` doorway. Nothing was deleted.

---

## Site Structure

### The new era (front door)
| Path | File | Notes |
|---|---|---|
| `/` | `index.html` | The walk. Self-contained page (own `<head>`, links walk.css/js). |
| `/read/` | `read.md` | "Fallow Land" poem. Uses `era` layout. |
| `/wander/` | `wander.md` | "Traveling back in time" doorway → links to `/atlas/`. `era` layout. |
| `/connect/` | `connect.md` | Contact form (Formspree `mnjnawrn`, request types, Venmo). `era` layout. |

The walk's only navigation is the arrival card's **read · wander · connect** links. Era pages link back via "← back to the walk" → `/#arrival`.

### The Atlas archive (preserved)
- `/atlas/` — `atlas.md`, the old cartography home (was the previous `index.md`).
- `/seas/`, `/farmlands/`, `/roads/`, `/skies/` — unchanged, still live.
- `_layouts/landing.html` nav "meet" → `/atlas/` so the archive is self-contained. "connect" → the (new) `/connect/`.

---

## The Walk — how it works (`index.html` + `walk.scss` + `walk.js`)

**Structure**: a `position: fixed` `.stage` (the scene) behind a scrolling `.track` of full-height `.station` sections (the content cards). `walk.js` maps scroll progress `p` (0→1) to CSS variables and layer transforms.

**Scene layers** (back → front), each a parallax `.layer` with `data-speed`:
`sky` (day/dusk/night cross-fade) · `texture` (pastel drawing, above sky, fades in only at the very end) · `stars` · hills · skyline · bridge (Three Sisters) · river · mid (Victorian building + trees) · **walker** (z between near & fg) · near (grass, lampposts, bench) · **fg** (foreground ginkgo + maple — figure passes *behind* these) · mist (pastel bands).

- **Parallax**: each layer sized by *height* (`height:100%; width:auto`), scene width = intrinsic. `walk.js` sets `translateX = -p * (scrollWidth - innerWidth) * data-speed`.
- **Leaves**: shed from per-tree `.emitter` points (ginkgo fans / maple palmate), positioned by `walk.js` from the SVG render geometry so they stay on their tree at any size.
- **`#arrival`**: the back-link from era pages lands at the walk's end. `walk.js` captures the intent once, strips the hash (so reloads start at top), and jumps to the bottom.
- **`history.scrollRestoration = "manual"`** so reloads start at the top.

### ⚠️ iOS Safari/Chrome gotchas (hard-won — do not reintroduce)
These caused smearing / voids / clipping on iOS and were deliberately removed:
- **No `mix-blend-mode`** anywhere in the scene (forced full-scene re-blend each frame → smear).
- **No `will-change: transform` or 3D transforms on `.layer`** (huge SVGs exceed iOS texture limits → vertical smear). Use plain 2D `translateX`.
- **No `backdrop-filter`** on cards; keep heavy `filter: blur()` modest.
- **`.stage` uses `height: 100lvh`** (largest viewport) so you can't scroll into a void below the fixed scene.
- Overscroll bounce is left enabled (pull-to-refresh works); page bg is night-dark `#0a0f1c` so the bounce blends into the night arrival.

---

## Era pages (`_layouts/era.html` + `era.scss`)

Shared "rest-stop" style for read/wander/connect: a cream card on a dusk gradient **blended over the actual pastel drawing** (`assets/art/new-era/pastel-waves-web.jpg`, a ~328KB resized copy of `pastel-waves.jpg`). Faint stars. Warm terracotta accents. Form styles live here too.

---

## Content Collections (used by the Atlas archive + future work)

- **Poems** — `_poems/filename.md` (layout `poem`). Line breaks use two trailing spaces. Pre-2026 poems have `published: 2025-12-31`.
- **Prose** — `_prose/filename.md` (layout `post`).
- **Fields** (curated collections) — `_fields/name.md` (layout `field`), referenced on Farmlands. Slug match via `where_exp` on `p.path contains work.slug`.
- Poem/post prev-next uses `?context=` (seas = chronological, or a field slug).

---

## Design systems

### New era (walk + era pages)
Dusk→night sky; pastel drawing palette (gold, blue, pink, red, lavender, teal). Figure: coat `#19362a`, burgundy beanie `#732036`, brown boots. Era accent terracotta `#a0542c`. Palatino serif throughout.

### Atlas era (archive) — defined in `assets/css/main.scss`
Cream `#f8f5f0`, charcoal `#4a4a4a`, soft pastels; topographic contour background; legend symbols (`.accent-triangle/-square/-star/-water/-target/-compass` × color classes). Leave as-is to keep the archive intact.

---

## Development & Deployment

```bash
./dev.sh                 # or: bundle exec jekyll serve --drafts --livereload
bundle exec jekyll build
```
`_config.yml` changes require a full server restart.

- **`main` auto-deploys** to justalida.com via `.github/workflows/jekyll.yml`.
- Inspiration images for this era live in `assets/art/new-era/` (full-size originals kept for reference; only `pastel-waves-web.jpg` is used on the site).

---

## Guiding Principles

- **Collaborate as co-curator** — Alida directs by feel/mood and shares inspiration images; intuit and run with it, build in isolated trials, be honest about rough spots.
- **Preservation matters** — never delete a past era; archive it browsably.
- **No jarring interactions** — smooth, gentle transitions; announce big shifts (e.g. the `/wander/` time-travel doorway).
- **Lightweight** — Jekyll, plain CSS/JS, no frameworks.
- **Test on real mobile** — iOS rendering differs from desktop; verify on device.
