---
layout: page
title: Explore by Theme
permalink: /themes/
---

# Navigate by Theme

*Discover connections across different types of content—poems, stories, reflections, and posts—organized by the themes that weave through them.*

---

## How This Works

Each piece of content on this site is tagged with themes that capture its essence. Click any theme below to see all content that explores that territory, whether it's expressed through poetry, personal narrative, philosophical reflection, or technical project.

---

<div class="themes-container">
  <div class="theme-cloud">
    {% assign all_tags = site.posts | concat: site.poems | concat: site.stories | concat: site.reflections | map: 'tags' | compact | flatten | uniq | sort %}
    
    {% for tag in all_tags %}
      {% assign tag_posts = site.posts | where: 'tags', tag %}
      {% assign tag_poems = site.poems | where: 'tags', tag %}  
      {% assign tag_stories = site.stories | where: 'tags', tag %}
      {% assign tag_reflections = site.reflections | where: 'tags', tag %}
      {% assign tag_count = tag_posts.size | plus: tag_poems.size | plus: tag_stories.size | plus: tag_reflections.size %}
      
      <a href="{{ '/themes/' | append: tag | slugify | append: '/' | relative_url }}" 
         class="theme-tag" 
         data-count="{{ tag_count }}">
        #{{ tag }} ({{ tag_count }})
      </a>
    {% endfor %}
  </div>
</div>

---

## Featured Themes

*As content grows, certain themes will emerge as particularly rich territories for exploration.*

### Coming Soon
- **Healing & Trauma** - The journey from surviving to thriving
- **Science & Spirit** - Where evidence meets intuition  
- **Loneliness & Connection** - The paradox of being seen
- **Joy After Pain** - Finding aliveness in unexpected places
- **Creative Expression** - Art as medicine and communication

---

## Content Types

Browse by the type of content that resonates with you:

- **[Stories](/stories/)** - Personal narratives and experiences
- **[Reflections](/reflections/)** - Philosophical explorations  
- **[Creative](/creative/)** - Poetry, art, and performances
- **[Projects](/projects/)** - Technical work and experiments

---

*The theme system will grow organically as content is added. Each piece finds its own authentic tags rather than forcing predetermined categories.*

<style>
.themes-container {
  margin: 2em 0;
  padding: 2em;
  background: #f8f8f8;
  border-radius: 8px;
}

.theme-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  justify-content: center;
}

.theme-tag {
  display: inline-block;
  padding: 0.5em 1em;
  background: white;
  color: #333;
  text-decoration: none;
  border-radius: 20px;
  border: 1px solid #ddd;
  transition: all 0.3s ease;
  font-weight: 500;
}

.theme-tag:hover {
  background: #2a7ae4;
  color: white;
  border-color: #2a7ae4;
  text-decoration: none;
  transform: translateY(-2px);
}

.theme-tag[data-count="1"] { font-size: 0.9em; }
.theme-tag[data-count="2"], 
.theme-tag[data-count="3"] { font-size: 1em; }
.theme-tag[data-count="4"], 
.theme-tag[data-count="5"] { font-size: 1.1em; }
.theme-tag[data-count^="6"], 
.theme-tag[data-count^="7"], 
.theme-tag[data-count^="8"], 
.theme-tag[data-count^="9"] { font-size: 1.2em; font-weight: 600; }
</style>