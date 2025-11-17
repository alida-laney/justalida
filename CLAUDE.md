# Claude Code Context for justalida.com

This file contains context and todos for working on Alida's personal website.

## Site Overview

**Domain**: justalida.com (GitHub Pages with custom domain)
**Purpose**: Personal website showcasing Alida's creative work, technical projects, and healing journey
**Architecture**: Jekyll-based static site with unified content management system

## Current Site Structure

### Navigation
- **About** (`/about/`) - Layered personal introduction
- **Creations** (`/creations/`) - Main hub with dynamic filtering (was theme exploration page)
- **Misc** (`/misc/`) - Calendar, services, contact info

### Key Features

#### 1. Unified Content Backend
- All content lives in `_content/` directory (poems, stories, projects, art, etc.)
- Uses Jekyll collections instead of separate directories
- Smart filtering by `type` field (poem, project, visual-art, story, reflection)
- Cross-content relationships via `companions` field and `content_id`

#### 2. Dynamic Filtering System
- **Location**: `/creations/` page
- **Filters**: Theme dropdown + Content Type dropdown  
- **Functionality**: Live JavaScript filtering with counts
- **UX**: No auto-scrolling, stays in place, shows filter status

#### 3. Tagging & Theme System
- Each piece tagged with themes (language, healing, technical-projects, etc.)
- Theme pages at `/themes/[tag-name]/` show all content for that theme
- Mini-tags on content items can be clicked to quick-filter

#### 4. Content Types & Layouts
- **Unified layout**: `_layouts/content.html` adapts based on `type` field
- **Poem-specific styling**: Centered, larger fonts, special formatting
- **Project styling**: Technical appearance
- **Visual-art styling**: Gallery-focused layout

#### 5. Visibility & Hidden Content System
- **Purpose**: Create protective boundaries around vulnerable work while rewarding genuine engagement
- **Tiers of visibility**:
  - `public` - Appears in creations page, sitemaps, RSS feeds (default if not specified)
  - `unlisted` - Accessible by direct URL but excluded from listings, sitemaps, and feeds
  - `discoverable` - Same as unlisted, but intentionally linked via subtle styling in public content
  - `protected` - (Future) Requires password/authentication
- **Philosophy**: Hidden in plain sight, not announced. No treasure maps or gamification.
- **Link styling**:
  - `.subtle-link` - Slightly different color, font-weight, letter-spacing with dotted underline on hover
  - `.whisper-link` - Barely larger font size (1.05em), subtle opacity change
- **Security note**: Client-side hiding provides friction for bad actors, not true security

## Content Structure

### Front Matter Format
```yaml
---
title: "Content Title"
type: [poem, project, visual-art, story, reflection]  # Can have multiple types
layout: content
date: YYYY-MM-DD
tags: [theme1, theme2, theme3]
excerpt: "Brief description"
content_id: "unique-id-001"
companions: [related-content-id-001, related-content-id-002]  # Optional
visibility: public  # Options: public (default), unlisted, discoverable, protected (future)
---
```

**Visibility Options Explained:**
- **public** or omitted - Normal content, appears everywhere
- **unlisted** - Accessible by URL but hidden from creations page, sitemaps, feeds
- **discoverable** - Like unlisted, but you'll add subtle links to it in public content
- **protected** - (Not yet implemented) Will require password/authentication

### File Locations
- **Main content**: `_content/filename.md`
- **Blog posts**: `_posts/` (traditional Jekyll posts)
- **Static pages**: Root directory (about.md, creations.md, misc.md)

## Current Todos

### Active
1. **Add password protection layer** - Implement password/authentication for `protected` visibility tier
2. **Create example hidden content** - Test the discoverable content system with real poems/reflections

### Completed Recently
- ✅ Visibility system (public, unlisted, discoverable, protected tiers)
- ✅ Subtle link styling for hidden-in-plain-sight discovery
- ✅ Sitemap/feed exclusion for non-public content
- ✅ Unified content backend with type-based filtering
- ✅ Dynamic creations page with dropdown filters
- ✅ Clean navigation structure (About, Creations, Misc)
- ✅ Companion piece relationship system
- ✅ Custom domain setup and automated deployment

## Technical Notes

### Development Environment
- **Local dev**: `./dev.sh` or `bundle exec jekyll serve --drafts --livereload`
- **Build**: `bundle exec jekyll build`
- **Branch**: Currently working in `initial_development` branch

### Key Files
- **Config**: `_config.yml` - Jekyll configuration, collections setup
- **Main filter page**: `creations.md` - Contains all filtering HTML/CSS/JS
- **Content layout**: `_layouts/content.html` - Unified layout for all content types
- **Tag pages**: `_layouts/tag_page.html` - Individual theme pages

### Deployment
- **Main branch**: Auto-deploys to justalida.com via GitHub Actions
- **Custom domain**: CNAME file points to justalida.com
- **Workflow**: `.github/workflows/jekyll.yml`

## Design Philosophy

### Content Organization
- **Theme-based discovery** over rigid categorization
- **Layered accessibility** - surface level + deeper exploration
- **Cross-media relationships** - poems can connect to visual art, projects to reflections
- **Authentic voice** - no corporate tone, personally vulnerable yet boundaried

### User Experience
- **No jarring interactions** - smooth, stays-in-place filtering
- **Reward curiosity** - hints at deeper content for dedicated explorers
- **Mobile-friendly** - responsive design throughout
- **Performance** - lightweight, fast loading

### Future Vision
- **Riddle/puzzle system** - Hide deeper content behind interactive challenges
- **Text editor UI** - Direct content creation through web interface  
- **Performance calendar** - Integration with live events
- **Services offerings** - Professional services at healing/tech intersection

## Common Commands

### Development
```bash
# Start local development server
./dev.sh

# Build site
bundle exec jekyll build

# Install dependencies  
bundle install
```

### Git Workflow
```bash
# Current branch
git checkout initial_development

# Commit changes
git add .
git commit -m "Description

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push to remote
git push origin initial_development
```

### Content Creation

**Standard content:**
1. Create file in `_content/filename.md`
2. Add proper front matter with `type`, `tags`, `content_id`
3. Set `visibility: public` or omit (defaults to public)
4. Write content with line breaks (`  ` at end of lines for poems)
5. Build and test locally
6. Content appears automatically in `/creations/` with filtering

**Hidden/discoverable content:**
1. Create file in `_content/filename.md`
2. Set `visibility: discoverable` or `visibility: unlisted`
3. Content will be excluded from creations page, sitemaps, feeds
4. For discoverable content, add subtle links in public poems/work:
   ```markdown
   Some public poem text with a <span class="subtle-link">[word]({% link _content/hidden-piece.md %})</span> that links

   Or use whisper-link for even more subtlety:
   Some text with a <span class="whisper-link">[barely]({% link _content/hidden-piece.md %})</span> noticeable link
   ```
5. Test by hovering over the subtle link - should have slight visual difference

## Notes for Future Sessions
- Alida values authentic, vulnerable communication balanced with technical rigor
- The site serves both creative expression and professional technical work
- Focus on user experience - smooth, non-jarring interactions
- Content should be discoverable through themes rather than rigid hierarchies
- Always test filtering functionality after content changes