---
layout: landing
title: Work
---

<h1>Work</h1>

<p class="subtitle">~ Poems & Art ~</p>

<p>
  <span class="accent-dot purple"></span>
  <span class="accent-dot pink"></span>
  <span class="accent-dot blue"></span>
  <span class="accent-dot yellow"></span>
</p>

<div class="work-grid">
  {% assign sorted_poems = site.poems | sort: 'date' %}
  {% for poem in sorted_poems %}
  <div class="work-item poem-item">
    <h3><a href="{{ poem.url | relative_url }}">{{ poem.title }}</a></h3>
    <p class="poem-date-small">{{ poem.date | date: "%B %-d, %Y" }}</p>
    {% if poem.excerpt %}
    <p class="excerpt">{{ poem.excerpt }}</p>
    {% endif %}
  </div>
  {% endfor %}

  {% assign sorted_art = site.art | sort: 'date' %}
  {% for artwork in sorted_art %}
  <div class="work-item art-item">
    {% if artwork.image %}
    <a href="{{ artwork.image | relative_url }}">
      <img src="{{ artwork.image | relative_url }}" alt="{{ artwork.title }}">
    </a>
    {% endif %}
    <h3>{{ artwork.title }}</h3>
    <p class="poem-date-small">{{ artwork.date | date: "%B %-d, %Y" }}</p>
    {% if artwork.excerpt %}
    <p class="excerpt">{{ artwork.excerpt }}</p>
    {% endif %}
  </div>
  {% endfor %}
</div>
