---
layout: landing
title: Work
---

<h1>Work</h1>

<p class="subtitle">~ Poems & Art ~</p>

<div class="work-grid">
  {% for poem in site.poems %}
  <div class="work-item poem-item">
    <h3><a href="{{ poem.url | relative_url }}">{{ poem.title }}</a></h3>
    {% if poem.excerpt %}
    <p class="excerpt">{{ poem.excerpt }}</p>
    {% endif %}
  </div>
  {% endfor %}

  <!-- To add art, create files in the 'art' folder and they'll appear here -->
  <!-- Example:
  <div class="work-item art-item">
    <a href="/path/to/full-size-image.jpg">
      <img src="/path/to/image.jpg" alt="Art Title">
    </a>
    <h3>Art Title</h3>
  </div>
  -->
</div>
