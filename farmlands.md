---
layout: landing
title: Farmlands
---

<h1>Farmlands</h1>

<p class="subtitle">Fenced in regions of work.</p>

<p>
  <span class="accent-square green"></span>
  <span class="accent-square green"></span>
  <span class="accent-square green"></span>
</p>

{% assign sorted_fields = site.fields | sort: 'order' | default: "" %}

<div class="seas-grid">
  {% for field in sorted_fields %}
    {% assign symbol_class = "accent-" | append: field.symbol %}
    <a href="{{ field.url | relative_url }}" class="card-link">
      <div class="content-section">
        <p class="field-title">
          <span class="{{ symbol_class }} {{ field.color }}"></span>
          {{ field.title }}
          <span class="{{ symbol_class }} {{ field.color }}"></span>
        </p>
        {% if field.description %}
        <p class="seas-excerpt">{{ field.description }}</p>
        {% endif %}
        <p class="field-count">{{ field.works.size }} {% if field.works.size == 1 %}work{% else %}works{% endif %}</p>
      </div>
    </a>
  {% endfor %}
</div>

<p>
  <span class="accent-square green"></span>
  <span class="accent-square green"></span>
  <span class="accent-square green"></span>
</p>
