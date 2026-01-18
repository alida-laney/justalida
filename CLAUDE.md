# Claude Code Context for justalida.com

## Site Overview

**Domain**: justalida.com (GitHub Pages with custom domain)
**Purpose**: Personal website showcasing Alida's creative work, projects, and healing journey
**Architecture**: Jekyll-based static site

## Current Site Structure

### Navigation
- **Home** (`/home/`) - Short introduction to the site
- **Work** (`/work/`) - Main page of the site, shows work chronologically (oldest -> newest)
- **Contact** (`/contact/`) - Form to send me an email

### Key Features

#### 1. Tagging & Theme System
- Each piece tagged with themes (language, healing, technical-projects, etc.)
- Could be used later to create a filtering system on the work page

#### 2. Layouts
- Currently only utilizing the 'poem' layout
- Visual art to be added later

## Content Structure

### Front Matter Format
```yaml
---
title: "TITLE"
layout: poem
date: 2026-01-18
order: 3
tags: [tag1, tag2, tag3]
excerpt: "A little quote :)"
---
```

### File Locations
- **Poems**: `_poems_/filename.md`
- **Visual Art**: `_art_/art_file.md`
- **Static pages**: Root directory (index.md, work.md, contact.md)

## Technical Notes

### Development Environment
- **Local dev**: `./dev.sh` or `bundle exec jekyll serve --drafts --livereload`
- **Build**: `bundle exec jekyll build`

### Key Files
- **Config**: `_config.yml` - Jekyll configuration, collections setup
- **Main filter page**: `creations.md` - Contains all filtering HTML/CSS/JS
- **Content layout**: `_layouts/content.html` - Unified layout for all content types
- **Tag pages**: `_layouts/tag_page.html` - Individual theme pages

### Deployment
- **Main branch**: Auto-deploys to justalida.com via GitHub Actions
- **Custom domain**: CNAME file points to justalida.com
- **Workflow**: `.github/workflows/jekyll.yml`

### User Experience
- **No jarring interactions** - smooth, stays-in-place
- **Mobile-friendly** - responsive design throughout
- **Performance** - lightweight, fast loading

### Future Vision
- **Text editor UI** - Direct content creation through web interface  
- **Performance calendar** - Integration with live events
- **Services offerings** - Professional services based on human conenction

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
1. Create file in `_poems/filename.md`
2. Add proper front matter with `type`, `tags`, `content_id`
3. Write content with line breaks (`  ` at end of lines for poems)
4. Build and test locally
5. Content appears automatically in `/work/`

## Notes for Future Sessions
- Alida values authentic, vulnerable communication balanced with technical rigor
- The site serves both creative expression and professional technical work
- Focus on user experience - smooth, non-jarring interactions
