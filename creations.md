---
layout: page
title: Creations
permalink: /creations/
nav_order: 2
---

# My Creations

*Everything I make—poetry, stories, visual art, technical projects, and reflections—organized by the themes that connect them.*

---

## Filter My Creations

Find exactly what you're looking for—filter by theme, media type, or both to discover connections across poetry, projects, art, and reflections.

<div class="filter-container">
  <div class="filter-row">
    <div class="filter-group">
      <label for="theme-filter">Theme:</label>
      <select id="theme-filter" class="filter-dropdown">
        <option value="">All Themes</option>
        {% assign all_public = site.posts | concat: site.content | where_exp: "item", "item.visibility == 'public' or item.visibility == nil or item.visibility == ''" %}
        {% assign all_tags = all_public | map: 'tags' | compact | flatten | uniq | sort %}
        {% for tag in all_tags %}
          {% assign tag_items = all_public | where: 'tags', tag %}
          {% assign tag_count = tag_items.size %}
          <option value="{{ tag | slugify }}">{{ tag | capitalize }} ({{ tag_count }})</option>
        {% endfor %}
      </select>
    </div>

    <div class="filter-group">
      <label for="type-filter">Content Type:</label>
      <select id="type-filter" class="filter-dropdown">
        <option value="">All Types</option>
        {% assign all_types = all_public | map: 'type' | compact | flatten | uniq | sort %}
        {% for type in all_types %}
          {% assign type_count = all_public | where_exp: "item", "item.type contains type" | size %}
          <option value="{{ type | slugify }}">{{ type | capitalize }} ({{ type_count }})</option>
        {% endfor %}
        {% assign public_posts = site.posts | where_exp: "item", "item.visibility == 'public' or item.visibility == nil or item.visibility == ''" %}
        <option value="blog-post">Blog Post ({{ public_posts.size }})</option>
      </select>
    </div>


    <button id="clear-filters" class="clear-button">Clear All</button>
  </div>
</div>

---

## Latest Creations

{% assign all_creations = site.posts | concat: site.content | sort: 'date' | reverse %}
{% assign public_creations = all_creations | where_exp: "item", "item.visibility == 'public' or item.visibility == nil or item.visibility == ''" %}
<div class="creations-list">
  {% for item in public_creations limit: 10 %}
  <article class="creation-item" 
           data-tags="{% for tag in item.tags %}{{ tag | slugify }} {% endfor %}"
           data-type="{% if item.type.size > 0 %}{% for type in item.type %}{{ type | slugify }} {% endfor %}{% else %}blog-post{% endif %}">
    <header class="creation-header">
      <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
      <div class="creation-meta">
        {{ item.date | date: "%B %Y" }}
        {% if item.type.size > 0 %}
          • <span class="creation-type">{{ item.type | join: ", " | capitalize }}</span>
        {% endif %}
      </div>
    </header>
    {% if item.excerpt %}
      <p class="creation-excerpt">{{ item.excerpt }}</p>
    {% endif %}
    <div class="creation-tags">
      {% for tag in item.tags %}
        <span class="mini-tag" data-tag="{{ tag | slugify }}">#{{ tag }}</span>
      {% endfor %}
    </div>
  </article>
  {% endfor %}
</div>

---

## Featured Themes

*As content grows, certain themes will emerge as particularly rich territories for exploration.*

### Coming Soon
- **Healing & Trauma** - The journey from surviving to thriving
- **Science & Spirit** - Where evidence meets intuition  
- **Technical Projects** - Apps, tools, and experiments
- **Creative Expression** - Poetry, art, and performances
- **Loneliness & Connection** - The paradox of being seen

---

*The theme system will grow organically as content is added. Each piece finds its own authentic tags rather than forcing predetermined categories.*

<div id="filter-info" style="display: none; margin: 1em 0; padding: 1em; background: #e8f4f8; border-radius: 5px; font-style: italic;">
  <span id="filter-text"></span>
</div>

<style>
/* Filter Controls */
.filter-container {
  margin: 2em 0;
  padding: 1.5em;
  background: #f8f8f8;
  border-radius: 8px;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
  min-width: 180px;
}

.filter-group label {
  font-weight: 500;
  margin-bottom: 0.3em;
  color: #333;
  font-size: 0.9em;
}

.filter-dropdown {
  padding: 0.5em;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.9em;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.filter-dropdown:focus {
  outline: none;
  border-color: #2a7ae4;
}

.clear-button {
  padding: 0.5em 1em;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background 0.2s ease;
  height: fit-content;
}

.clear-button:hover {
  background: #2a7ae4;
}

@media (max-width: 768px) {
  .filter-row {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filter-group {
    min-width: 100%;
  }
}

/* Creations list styling */
.creations-list {
  margin: 2em 0;
}

.creation-item {
  margin: 2em 0;
  padding: 1.5em;
  background: #fdfdfd;
  border-left: 3px solid #e8e8e8;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.creation-item.hidden {
  display: none;
}

.creation-item:hover {
  border-left-color: #2a7ae4;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.creation-header h3 {
  margin: 0 0 0.5em 0;
  font-size: 1.3em;
}

.creation-header h3 a {
  color: #333;
  text-decoration: none;
}

.creation-header h3 a:hover {
  color: #2a7ae4;
}

.creation-meta {
  color: #666;
  font-size: 0.9em;
  margin-bottom: 1em;
}

.creation-type {
  font-weight: 500;
  text-transform: capitalize;
}

.creation-excerpt {
  color: #555;
  font-style: italic;
  margin: 0.5em 0 1em 0;
}

.creation-tags {
  margin-top: 1em;
}

.mini-tag {
  display: inline-block;
  padding: 0.2em 0.5em;
  background: #f0f0f0;
  color: #666;
  font-size: 0.8em;
  margin-right: 0.5em;
  margin-bottom: 0.3em;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mini-tag:hover {
  background: #2a7ae4;
  color: white;
}
</style>

<script>
let currentFilters = {
  theme: '',
  type: ''
};

document.addEventListener('DOMContentLoaded', function() {
  const themeFilter = document.getElementById('theme-filter');
  const typeFilter = document.getElementById('type-filter');
  const clearButton = document.getElementById('clear-filters');
  
  // Add event listeners to both dropdowns
  themeFilter.addEventListener('change', () => {
    currentFilters.theme = themeFilter.value;
    applyFilters();
  });
  
  typeFilter.addEventListener('change', () => {
    currentFilters.type = typeFilter.value;
    applyFilters();
  });
  
  clearButton.addEventListener('click', clearAllFilters);
  
  // Add click handlers to mini-tags for quick filtering
  document.querySelectorAll('.mini-tag').forEach(tag => {
    tag.addEventListener('click', function() {
      const filterTag = this.getAttribute('data-tag');
      themeFilter.value = filterTag;
      currentFilters.theme = filterTag;
      applyFilters();
      
      // Filter applied - no need to scroll
    });
  });
});

function applyFilters() {
  const creations = document.querySelectorAll('.creation-item');
  const filterInfo = document.getElementById('filter-info');
  const filterText = document.getElementById('filter-text');
  
  let visibleCount = 0;
  let filterDescription = [];
  
  creations.forEach(creation => {
    let shouldShow = true;
    
    // Check theme filter
    if (currentFilters.theme) {
      const creationTags = creation.getAttribute('data-tags').split(' ');
      if (!creationTags.includes(currentFilters.theme)) {
        shouldShow = false;
      }
    }
    
    // Check type filter
    if (currentFilters.type && shouldShow) {
      const creationTypes = creation.getAttribute('data-type').split(' ');
      if (!creationTypes.includes(currentFilters.type)) {
        shouldShow = false;
      }
    }
    
    
    // Show or hide the creation
    if (shouldShow) {
      creation.classList.remove('hidden');
      visibleCount++;
    } else {
      creation.classList.add('hidden');
    }
  });
  
  // Build filter description
  if (currentFilters.theme) {
    const themeOption = document.querySelector(`#theme-filter option[value="${currentFilters.theme}"]`);
    filterDescription.push(`theme: ${themeOption ? themeOption.textContent.split('(')[0].trim() : currentFilters.theme}`);
  }
  
  if (currentFilters.type) {
    const typeOption = document.querySelector(`#type-filter option[value="${currentFilters.type}"]`);
    filterDescription.push(`type: ${typeOption ? typeOption.textContent.split('(')[0].trim() : currentFilters.type}`);
  }
  
  
  // Show/hide filter info
  if (filterDescription.length > 0) {
    filterText.textContent = `Showing ${visibleCount} items filtered by ${filterDescription.join(', ')}`;
    filterInfo.style.display = 'block';
  } else {
    filterInfo.style.display = 'none';
  }
  
  // Filters applied - let user stay where they are
}

function clearAllFilters() {
  // Reset both dropdowns
  document.getElementById('theme-filter').value = '';
  document.getElementById('type-filter').value = '';
  
  // Reset filter state
  currentFilters = { theme: '', type: '' };
  
  // Show all creations
  document.querySelectorAll('.creation-item').forEach(creation => {
    creation.classList.remove('hidden');
  });
  
  // Hide filter info
  document.getElementById('filter-info').style.display = 'none';
}
</script>