---
layout: landing
title: Generate File
permalink: /generate-file/
sitemap: false
---

<h1>Generate File</h1>

<div id="loading" class="intro-box" style="font-style:normal; text-align:center;">Loading tags...</div>

<div id="ui" style="display:none;">

  <div class="content-section" style="margin-bottom:1.5rem;">

    <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:1.25rem;">
      <div style="flex:2; min-width:180px;">
        <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">Title</label>
        <input type="text" id="title" placeholder="Poem title" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); box-sizing:border-box;">
      </div>
      <div style="flex:1; min-width:120px;">
        <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">Layout</label>
        <select id="layout" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); cursor:pointer; box-sizing:border-box;">
          <option value="poem">poem</option>
          <option value="post">post</option>
        </select>
      </div>
    </div>

    <div style="display:flex; gap:1rem; flex-wrap:wrap; margin-bottom:1.25rem; align-items:flex-end;">
      <div style="flex:1; min-width:140px;">
        <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">Date written</label>
        <input type="date" id="date" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); box-sizing:border-box;">
      </div>
      <div style="flex:1; min-width:140px;">
        <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">
          <input type="checkbox" id="published-check" style="margin-right:0.35rem; cursor:pointer;">
          Published date <span style="font-style:italic; color:#aaa;">(if different)</span>
        </label>
        <input type="date" id="published" disabled style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#f5f5f5; color:#aaa; box-sizing:border-box; cursor:not-allowed;">
      </div>
      <div style="flex:0 0 auto;">
        <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">
          <input type="checkbox" id="order-check" style="margin-right:0.35rem; cursor:pointer;">
          Order
        </label>
        <input type="number" id="order" disabled min="1" placeholder="—" style="width:5rem; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#f5f5f5; color:#aaa; box-sizing:border-box; cursor:not-allowed;">
      </div>
    </div>

    <hr style="border:none; border-top:1px solid var(--light-gray); margin:1.25rem 0;">

    <div style="margin-bottom:1.25rem;">
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.5rem;">
        <span style="font-size:0.85rem; color:var(--charcoal);">Tags</span>
        <span id="tag-count" style="font-style:italic; color:var(--soft-blue); font-size:0.8rem;"></span>
      </div>
      <input type="text" id="tag-search" placeholder="Type to find or add a tag…" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); box-sizing:border-box; margin-bottom:0.5rem;">
      <div id="selected-chips" style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.4rem;"></div>
      <details id="tag-details">
        <summary style="cursor:pointer; list-style:none; font-size:0.8rem; color:#aaa; font-style:italic; padding:0.2rem 0; user-select:none;">browse all tags</summary>
        <div id="tag-pills" style="display:flex; flex-wrap:wrap; gap:0.4rem; padding-top:0.5rem;"></div>
      </details>
    </div>

    <hr style="border:none; border-top:1px solid var(--light-gray); margin:1.25rem 0;">

    <div style="margin-bottom:1.25rem;">
      <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">Excerpt</label>
      <input type="text" id="excerpt" placeholder="A short quote or first line…" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); box-sizing:border-box;">
    </div>

    <div style="margin-bottom:1.25rem;">
      <label style="display:block; font-size:0.85rem; color:var(--charcoal); margin-bottom:0.4rem;">
        <input type="checkbox" id="dedication-check" style="margin-right:0.35rem; cursor:pointer;">
        Dedication
      </label>
      <input type="text" id="dedication" disabled placeholder="for someone" style="width:100%; font-family:inherit; font-size:0.875rem; padding:0.4rem 0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#f5f5f5; color:#aaa; box-sizing:border-box; cursor:not-allowed;">
    </div>

    <hr style="border:none; border-top:1px solid var(--light-gray); margin:1.25rem 0;">

    <div>
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:0.4rem;">
        <label style="font-size:0.85rem; color:var(--charcoal);">Content</label>
        <span style="font-size:0.75rem; font-style:italic; color:#aaa;">two trailing spaces added automatically per line</span>
      </div>
      <textarea id="content" placeholder="Paste your poem here…" style="width:100%; height:220px; font-family:monospace; font-size:0.85rem; padding:0.75rem; border:1px solid var(--light-gray); border-radius:4px; background:#fff; color:var(--charcoal); box-sizing:border-box; resize:vertical; line-height:1.6;"></textarea>
    </div>

  </div>

  <div id="output-section" style="display:none;">
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
      <span id="filename-hint" style="font-family:monospace; font-size:0.8rem; color:var(--soft-blue);"></span>
      <button id="copy-btn" class="filter-btn">copy</button>
    </div>
    <textarea id="output" readonly style="width:100%; height:52vh; font-family:monospace; font-size:0.8rem; background:#fff; border:1px solid var(--light-gray); border-radius:4px; padding:1rem; box-sizing:border-box; resize:vertical; color:var(--charcoal); line-height:1.6;"></textarea>
  </div>

</div>

<script>
(async function () {
  const loading = document.getElementById('loading');
  const ui = document.getElementById('ui');
  const tagPills = document.getElementById('tag-pills');
  const tagCount = document.getElementById('tag-count');
  const tagSearch = document.getElementById('tag-search');
  const selectedChips = document.getElementById('selected-chips');
  const tagDetails = document.getElementById('tag-details');
  const outputSection = document.getElementById('output-section');
  const outputEl = document.getElementById('output');
  const filenameHint = document.getElementById('filename-hint');

  const titleInput = document.getElementById('title');
  const layoutSelect = document.getElementById('layout');
  const dateInput = document.getElementById('date');
  const publishedCheck = document.getElementById('published-check');
  const publishedInput = document.getElementById('published');
  const orderCheck = document.getElementById('order-check');
  const orderInput = document.getElementById('order');
  const excerptInput = document.getElementById('excerpt');
  const dedicationCheck = document.getElementById('dedication-check');
  const dedicationInput = document.getElementById('dedication');
  const contentInput = document.getElementById('content');

  // Default date to today in EST/EDT
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(new Date());
  dateInput.value = today;

  // Load tags from all-works.json
  let existingTags = [];
  try {
    const res = await fetch('/all-works.json');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    const tagSet = new Set();
    data.works.filter(w => !w.hidden).forEach(w => (w.tags || []).forEach(t => tagSet.add(t)));
    existingTags = [...tagSet].sort();
  } catch (e) {
    loading.textContent = 'Could not load tags: ' + e.message;
    return;
  }

  function makeChip(tag) {
    const chip = document.createElement('span');
    chip.dataset.tag = tag;
    chip.style.cssText = 'display:inline-flex; align-items:center; gap:0.3rem; font-size:0.8rem; padding:0.2rem 0.55rem 0.2rem 0.7rem; background:var(--soft-blue); color:#fff; border-radius:12px;';
    const label = document.createTextNode(tag);
    const x = document.createElement('button');
    x.textContent = '×';
    x.style.cssText = 'background:none; border:none; color:#fff; cursor:pointer; padding:0; font-size:1rem; line-height:1; opacity:0.75;';
    x.addEventListener('click', function () {
      const pill = tagPills.querySelector(`[data-tag="${CSS.escape(tag)}"]`);
      if (pill) pill.classList.remove('active');
      chip.remove();
      updateTagCount();
      generate();
    });
    chip.appendChild(label);
    chip.appendChild(x);
    return chip;
  }

  // Build tag pills
  function makePill(tag, selected) {
    const btn = document.createElement('button');
    btn.className = 'filter-btn' + (selected ? ' active' : '');
    btn.dataset.tag = tag;
    btn.textContent = tag;
    btn.addEventListener('click', function () {
      this.classList.toggle('active');
      if (this.classList.contains('active')) {
        if (!selectedChips.querySelector(`[data-tag="${CSS.escape(tag)}"]`)) {
          selectedChips.appendChild(makeChip(tag));
        }
      } else {
        const chip = selectedChips.querySelector(`[data-tag="${CSS.escape(tag)}"]`);
        if (chip) chip.remove();
      }
      filterPills(tagSearch.value);
      updateTagCount();
      generate();
    });
    return btn;
  }

  existingTags.forEach(tag => tagPills.appendChild(makePill(tag, false)));

  function updateTagCount() {
    const n = selectedChips.querySelectorAll('[data-tag]').length;
    tagCount.textContent = n > 0 ? n + ' selected' : '';
  }

  function getSelectedTags() {
    return [...tagPills.querySelectorAll('.filter-btn.active')].map(b => b.dataset.tag);
  }

  function filterPills(query) {
    const q = query.toLowerCase();
    tagPills.querySelectorAll('.filter-btn').forEach(btn => {
      btn.style.display = (!q || btn.dataset.tag.includes(q)) ? '' : 'none';
    });
    if (q) tagDetails.open = true;
  }

  tagSearch.addEventListener('input', function () {
    filterPills(this.value);
  });

  tagSearch.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    e.preventDefault();
    const raw = this.value.trim().toLowerCase().replace(/\s+/g, '-');
    if (!raw) return;
    const exact = tagPills.querySelector(`[data-tag="${CSS.escape(raw)}"]`);
    if (exact) {
      if (!exact.classList.contains('active')) {
        exact.classList.add('active');
        selectedChips.appendChild(makeChip(raw));
      }
    } else {
      const pill = makePill(raw, true);
      tagPills.appendChild(pill);
      selectedChips.appendChild(makeChip(raw));
    }
    this.value = '';
    filterPills('');
    updateTagCount();
    generate();
  });

  // Optional field toggles
  function wireToggle(checkbox, input) {
    checkbox.addEventListener('change', function () {
      input.disabled = !this.checked;
      input.style.background = this.checked ? '#fff' : '#f5f5f5';
      input.style.color = this.checked ? 'var(--charcoal)' : '#aaa';
      input.style.cursor = this.checked ? 'text' : 'not-allowed';
      if (this.checked) input.focus();
      generate();
    });
    input.addEventListener('input', generate);
  }

  wireToggle(publishedCheck, publishedInput);
  wireToggle(dedicationCheck, dedicationInput);

  orderCheck.addEventListener('change', function () {
    orderInput.disabled = !this.checked;
    orderInput.style.background = this.checked ? '#fff' : '#f5f5f5';
    orderInput.style.color = this.checked ? 'var(--charcoal)' : '#aaa';
    orderInput.style.cursor = this.checked ? 'text' : 'not-allowed';
    if (this.checked) orderInput.focus();
    generate();
  });
  orderInput.addEventListener('input', generate);

  // Wire all main inputs
  [titleInput, layoutSelect, dateInput, excerptInput, contentInput].forEach(el =>
    el.addEventListener('input', generate)
  );

  loading.style.display = 'none';
  ui.style.display = '';
  generate();

  function slugify(str) {
    return str.toLowerCase()
      .replace(/['"]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function generate() {
    const title = titleInput.value.trim();
    const layout = layoutSelect.value;
    const date = dateInput.value;
    const published = publishedCheck.checked ? publishedInput.value : null;
    const order = orderCheck.checked && orderInput.value ? parseInt(orderInput.value) : null;
    const tags = getSelectedTags();
    const excerpt = excerptInput.value.trim();
    const dedication = dedicationCheck.checked ? dedicationInput.value.trim() : null;
    const content = contentInput.value;

    // Build frontmatter
    let fm = '---\n';
    if (title) fm += `title: "${title.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
    fm += `layout: ${layout}\n`;
    if (date) fm += `date: ${date}\n`;
    if (published) fm += `published: ${published}\n`;
    if (tags.length > 0) fm += `tags: [${tags.join(', ')}]\n`;
    if (excerpt) fm += `excerpt: "${excerpt.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
    if (dedication) fm += `dedication: "${dedication.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
    if (order !== null) fm += `order: ${order}\n`;
    fm += '---';

    // Process content: add two trailing spaces to each non-empty line
    const processedContent = content
      .split('\n')
      .map(line => line.trimEnd())
      .map(line => line.length > 0 ? line + '  ' : '')
      .join('\n');

    outputEl.value = fm + '\n\n' + processedContent;

    // Filename suggestion
    const slug = slugify(title || 'untitled');
    if (layout === 'post' && date) {
      filenameHint.textContent = `_posts/${date}-${slug}.md`;
    } else {
      filenameHint.textContent = `_poems/${slug}.md`;
    }

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
