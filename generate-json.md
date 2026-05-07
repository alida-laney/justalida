---
layout: landing
title: Generate JSON
permalink: /generate-json/
sitemap: false
---

<h1>Generate JSON</h1>

<div id="loading" class="intro-box" style="font-style:normal; text-align:center;">Loading data...</div>

<div id="ui" style="display:none;">

  <div class="content-section">

    <div style="margin-bottom:1.25rem;">
      <p style="margin:0 0 0.5rem; font-size:0.85rem; color:var(--charcoal);">Page</p>
      <div id="page-btns">
        <button class="filter-btn active" data-page="seas">Open Seas</button>
        <button class="filter-btn" data-page="farmlands">Farmlands</button>
      </div>
    </div>

    <div id="seas-ui">

      <details id="tag-details" style="margin-bottom:1rem;">
        <summary style="cursor:pointer; list-style:none; display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.25rem;">
          <span style="font-size:0.85rem; color:var(--charcoal);">Tags</span>
          <span id="tag-summary" style="font-style:italic; color:var(--soft-blue); font-size:0.8rem;"></span>
        </summary>
        <div id="tag-pills" style="display:flex; flex-wrap:wrap; gap:0.4rem; padding-top:0.35rem;"></div>
      </details>

      <div>
        <p style="margin:0 0 0.5rem; font-size:0.85rem; color:var(--charcoal);">Date range <span style="font-style:italic; color:#aaa; font-weight:normal;">(YYYY or YYYY-MM-DD, inclusive)</span></p>
        <div style="display:flex; align-items:center; gap:0.6rem;">
          <input type="text" id="date-from" placeholder="from" style="font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); width:10rem;">
          <span style="color:#aaa; font-size:0.85rem;">to</span>
          <input type="text" id="date-to" placeholder="to" style="font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); width:10rem;">
        </div>
      </div>

    </div>

    <div id="farmlands-ui" style="display:none;">
      <p style="margin:0 0 0.5rem; font-size:0.85rem; color:var(--charcoal);">Field</p>
      <select id="field-select" style="font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); cursor:pointer;"></select>
    </div>

  </div>

  <div id="output-section" style="display:none; margin-top:1.5rem;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
      <span id="output-label" style="color:var(--charcoal); font-size:0.9rem; font-style:italic;"></span>
      <button id="copy-btn" class="filter-btn">copy</button>
    </div>
    <textarea id="output" readonly style="width:100%; height:62vh; font-family:monospace; font-size:0.75rem; background:#fff; border:1px solid var(--light-gray); border-radius:4px; padding:1rem; box-sizing:border-box; resize:vertical; color:var(--charcoal);"></textarea>
  </div>

</div>

<script>
(async function () {
  const loading = document.getElementById('loading');
  const ui = document.getElementById('ui');
  const outputSection = document.getElementById('output-section');
  const outputEl = document.getElementById('output');
  const outputLabel = document.getElementById('output-label');
  const seasUi = document.getElementById('seas-ui');
  const farmlandsUi = document.getElementById('farmlands-ui');
  const tagPills = document.getElementById('tag-pills');
  const tagSummary = document.getElementById('tag-summary');
  const dateFrom = document.getElementById('date-from');
  const dateTo = document.getElementById('date-to');
  const fieldSelect = document.getElementById('field-select');

  let data, currentPage = 'seas', dateTimer;

  try {
    const res = await fetch('/all-works.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    data = await res.json();
  } catch (e) {
    loading.textContent = 'Error loading data: ' + e.message;
    return;
  }

  const visibleWorks = data.works.filter(w => !w.hidden);

  // Build tag pills
  const tags = new Set();
  visibleWorks.forEach(w => (w.tags || []).forEach(t => tags.add(t)));
  [...tags].sort().forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.dataset.tag = tag;
    btn.textContent = tag;
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      updateTagSummary();
      generate();
    });
    tagPills.appendChild(btn);
  });

  function updateTagSummary() {
    const active = [...tagPills.querySelectorAll('.filter-btn.active')].map(b => b.dataset.tag);
    tagSummary.textContent = active.join(', ');
  }

  // Date inputs with debounce
  function onDateInput() {
    clearTimeout(dateTimer);
    dateTimer = setTimeout(generate, 400);
  }
  dateFrom.addEventListener('input', onDateInput);
  dateTo.addEventListener('input', onDateInput);

  // Build field options
  data.fields.forEach(field => {
    const opt = document.createElement('option');
    opt.value = field.slug;
    opt.textContent = field.title;
    fieldSelect.appendChild(opt);
  });
  fieldSelect.addEventListener('change', generate);

  // Page toggle
  document.getElementById('page-btns').addEventListener('click', function (e) {
    const btn = e.target.closest('[data-page]');
    if (!btn) return;
    document.querySelectorAll('#page-btns .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentPage = btn.dataset.page;
    seasUi.style.display = currentPage === 'seas' ? '' : 'none';
    farmlandsUi.style.display = currentPage === 'farmlands' ? '' : 'none';
    generate();
  });

  // Normalize a date input: bare year → full date boundary
  function normalizeDate(val, isEnd) {
    if (!val) return null;
    val = val.trim();
    if (/^\d{4}$/.test(val)) return val + (isEnd ? '-12-31' : '-01-01');
    return val;
  }

  // Pre-select from URL params
  const params = new URLSearchParams(location.search);
  const urlPage = params.get('page');
  const urlFilters = params.get('filter') ? params.get('filter').split(',') : [];
  const urlField = params.get('field');
  const urlFrom = params.get('from');
  const urlTo = params.get('to');

  if (urlPage === 'farmlands') {
    document.querySelector('[data-page="seas"]').classList.remove('active');
    document.querySelector('[data-page="farmlands"]').classList.add('active');
    currentPage = 'farmlands';
    seasUi.style.display = 'none';
    farmlandsUi.style.display = '';
    if (urlField) fieldSelect.value = urlField;
  } else {
    urlFilters.forEach(tag => {
      const pill = tagPills.querySelector(`[data-tag="${CSS.escape(tag)}"]`);
      if (pill) pill.classList.add('active');
    });
    updateTagSummary();
    if (urlFrom) dateFrom.value = urlFrom;
    if (urlTo) dateTo.value = urlTo;
  }

  loading.style.display = 'none';
  ui.style.display = '';

  if (urlPage) generate();

  function generate() {
    let result, label;

    if (currentPage === 'farmlands') {
      const fieldData = data.fields.find(f => f.slug === fieldSelect.value);
      if (!fieldData) return;
      const works = fieldData.works
        .map(fw => data.works.find(w => w.slug === fw.slug && w.collection === fw.collection))
        .filter(Boolean);
      result = { field: fieldData.slug, title: fieldData.title, description: fieldData.description, works };
      label = works.length + ' works in "' + fieldData.title + '"';

      const url = new URL(location.href);
      url.searchParams.set('page', 'farmlands');
      url.searchParams.set('field', fieldSelect.value);
      url.searchParams.delete('filter');
      url.searchParams.delete('from');
      url.searchParams.delete('to');
      history.replaceState(null, '', url);

    } else {
      const activeTags = [...tagPills.querySelectorAll('.filter-btn.active')].map(b => b.dataset.tag);
      const fromDate = normalizeDate(dateFrom.value, false);
      const toDate = normalizeDate(dateTo.value, true);

      let works = visibleWorks.slice();
      if (activeTags.length > 0) works = works.filter(w => activeTags.some(tag => (w.tags || []).includes(tag)));
      if (fromDate) works = works.filter(w => w.date >= fromDate);
      if (toDate) works = works.filter(w => w.date <= toDate);

      result = {
        page: 'seas',
        filter: activeTags.length > 0 ? activeTags : null,
        from: fromDate || null,
        to: toDate || null,
        count: works.length,
        works
      };

      const parts = [];
      if (activeTags.length > 0) parts.push('tagged: ' + activeTags.join(', '));
      if (fromDate || toDate) parts.push((fromDate || '…') + ' → ' + (toDate || '…'));
      label = works.length + ' works' + (parts.length > 0 ? ' · ' + parts.join(' · ') : ', all');

      const url = new URL(location.href);
      url.searchParams.set('page', 'seas');
      if (activeTags.length > 0) url.searchParams.set('filter', activeTags.join(','));
      else url.searchParams.delete('filter');
      if (dateFrom.value.trim()) url.searchParams.set('from', dateFrom.value.trim());
      else url.searchParams.delete('from');
      if (dateTo.value.trim()) url.searchParams.set('to', dateTo.value.trim());
      else url.searchParams.delete('to');
      url.searchParams.delete('field');
      history.replaceState(null, '', url);
    }

    outputEl.value = JSON.stringify(result, null, 2);
    outputLabel.textContent = label;
    outputSection.style.display = '';
  }

  document.getElementById('copy-btn').addEventListener('click', function () {
    navigator.clipboard.writeText(outputEl.value).then(() => {
      this.textContent = 'copied!';
      setTimeout(() => this.textContent = 'copy', 1500);
    });
  });
})();
</script>
