---
layout: landing
title: Open Seas
page_class: seas-page
---

<h1>Open Seas</h1>

<p class="subtitle">All the work, chronologically.</p>

<p>
  <span class="accent-water blue"></span>
  <span class="accent-water blue"></span>
  <span class="accent-water blue"></span>
</p>

{% assign all_items = site.poems | concat: site.prose | sort: 'order' | sort: 'date' %}

{% assign all_tags = "" | split: "" %}
{% for item in all_items %}
  {% for tag in item.tags %}
    {% unless all_tags contains tag %}
      {% assign all_tags = all_tags | push: tag %}
    {% endunless %}
  {% endfor %}
{% endfor %}
{% assign all_tags = all_tags | sort %}

{% if all_tags.size > 0 %}
<div class="seas-filters">
  <button class="filter-btn active" data-tag="all">all</button>
  <button class="filter-btn" id="recent-btn">most recent</button>
  <span class="seas-filter-divider">|</span>
  <button class="filter-btn" id="tag-toggle">tags ▴</button>
</div>
<div id="tag-filters" style="margin-top:0.5rem; display:block;">
  {% for tag in all_tags %}
  <button class="filter-btn" data-tag="{{ tag }}">{{ tag }}</button>
  {% endfor %}
</div>
{% endif %}

<div class="seas-grid" id="seas-grid">
  {% for item in all_items %}
    {% if item.hidden %}{% continue %}{% endif %}
    {% assign item_tags = item.tags | join: " " %}
    {% if item.layout == 'poem' or item.collection == 'poems' %}
      {% assign item_type = "poem" %}
    {% else %}
      {% assign item_type = "prose" %}
    {% endif %}
    <div class="seas-item" data-tags="{{ item_tags }}" data-date="{{ item.date | date: '%Y-%m-%d' }}" data-order="{{ item.order | default: 0 }}">
      <span class="seas-type">{{ item_type }}</span>
      <h3><a href="{{ item.url | relative_url }}">{{ item.title }}</a></h3>
      <p class="seas-date">{{ item.date | date: "%B %-d, %Y" }}</p>
      {% assign display_excerpt = item.description | default: item.excerpt %}
      {% if display_excerpt and display_excerpt != "" %}
      <p class="seas-excerpt">{{ display_excerpt }}</p>
      {% endif %}
      {% if item.tags.size > 0 %}
      <p class="seas-tags">{% for tag in item.tags %}<span class="seas-tag">{{ tag }}</span>{% endfor %}</p>
      {% endif %}
    </div>
  {% endfor %}
</div>

<p id="seas-empty" style="display:none; text-align:center; color:#888; font-style:italic;">No work found for this tag.</p>

<p>
  <span class="accent-water blue"></span>
  <span class="accent-water blue"></span>
  <span class="accent-water blue"></span>
</p>

<script>
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.seas-item');
  const empty = document.getElementById('seas-empty');
  const tagToggle = document.getElementById('tag-toggle');
  const tagFilters = document.getElementById('tag-filters');

  function updateTagToggle() {
    if (!tagToggle) return;
    const activeCount = tagFilters.querySelectorAll('.filter-btn.active').length;
    const isOpen = tagFilters.style.display !== 'none';
    if (activeCount > 0 && !isOpen) {
      tagToggle.textContent = 'tags (' + activeCount + ') ▾';
    } else {
      tagToggle.textContent = isOpen ? 'tags ▴' : 'tags ▾';
    }
  }

  if (tagToggle) {
    tagToggle.addEventListener('click', function () {
      const isOpen = tagFilters.style.display !== 'none';
      tagFilters.style.display = isOpen ? 'none' : '';
      updateTagToggle();
    });
  }

  document.getElementById('recent-btn').addEventListener('click', function () {
    btns.forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    updateTagToggle();

    let mostRecent = null;
    items.forEach(function (item) {
      if (!mostRecent) { mostRecent = item; return; }
      const d1 = item.dataset.date, d0 = mostRecent.dataset.date;
      if (d1 > d0 || (d1 === d0 && parseInt(item.dataset.order) > parseInt(mostRecent.dataset.order))) {
        mostRecent = item;
      }
    });

    items.forEach(item => item.style.display = item === mostRecent ? '' : 'none');
    empty.style.display = 'none';
  });

  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      if (!this.dataset.tag) return;

      if (this.dataset.tag === 'all') {
        btns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        items.forEach(item => item.style.display = '');
        empty.style.display = 'none';
        updateTagToggle();
        return;
      }

      // Multi-select: toggle this tag, deactivate all/recent
      document.querySelector('[data-tag="all"]').classList.remove('active');
      document.getElementById('recent-btn').classList.remove('active');
      this.classList.toggle('active');

      const activeTags = [...document.querySelectorAll('#tag-filters .filter-btn.active')].map(b => b.dataset.tag);

      if (activeTags.length === 0) {
        document.querySelector('[data-tag="all"]').classList.add('active');
        items.forEach(item => item.style.display = '');
        empty.style.display = 'none';
      } else {
        let visible = 0;
        items.forEach(item => {
          const tags = item.dataset.tags.split(' ');
          const show = activeTags.some(tag => tags.includes(tag));
          item.style.display = show ? '' : 'none';
          if (show) visible++;
        });
        empty.style.display = visible === 0 ? '' : 'none';
      }

      updateTagToggle();
    });
  });
</script>
