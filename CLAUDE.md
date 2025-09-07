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
visibility: public  # For future riddle system
---
```

### File Locations
- **Main content**: `_content/filename.md`
- **Blog posts**: `_posts/` (traditional Jekyll posts)
- **Static pages**: Root directory (about.md, creations.md, misc.md)

## Current Todos

### Active
1. **Design riddle/puzzle system for unlocking deeper content** - Create a way to hide certain content behind riddles/puzzles that reward dedicated exploration

### Completed Recently
- ✅ Unified content backend with type-based filtering
- ✅ Dynamic creations page with dropdown filters  
- ✅ Simplified Theme + Content Type filtering (removed redundant media field)
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
1. Create file in `_content/filename.md`
2. Add proper front matter with `type`, `tags`, `content_id`
3. Write content with line breaks (`  ` at end of lines for poems)
4. Build and test locally
5. Content appears automatically in `/creations/` with filtering

## Notes for Future Sessions
- Alida values authentic, vulnerable communication balanced with technical rigor
- The site serves both creative expression and professional technical work
- Focus on user experience - smooth, non-jarring interactions
- Content should be discoverable through themes rather than rigid hierarchies
- Always test filtering functionality after content changes