---
layout: page
title: "Write"
permalink: /write/
exclude_from_nav: true
---

<div id="password-gate" class="password-gate">
  <h2>Enter password to access</h2>
  <input type="password" id="gate-password" placeholder="Password" />
  <button onclick="checkPassword()">Unlock</button>
  <p id="password-error" style="color: red; display: none;">Incorrect password</p>
</div>

<div id="write-form" class="write-form" style="display: none;">
  <h2>Create New Content</h2>

  <form id="content-form">
    <div class="form-group">
      <label for="title">Title *</label>
      <input type="text" id="title" required placeholder="My Poem Title" />
    </div>

    <div class="form-group">
      <label>Type * (select at least one)</label>
      <div class="checkbox-group">
        <label><input type="checkbox" name="type" value="poem" checked /> Poem</label>
        <label><input type="checkbox" name="type" value="story" /> Story</label>
        <label><input type="checkbox" name="type" value="reflection" /> Reflection</label>
        <label><input type="checkbox" name="type" value="project" /> Project</label>
        <label><input type="checkbox" name="type" value="visual-art" /> Visual Art</label>
      </div>
    </div>

    <div class="form-group">
      <label for="tags">Tags (comma-separated)</label>
      <input type="text" id="tags" placeholder="healing, language, processing" />
      <small>Example: healing, language, processing</small>
    </div>

    <div class="form-group">
      <label for="visibility">Visibility</label>
      <select id="visibility">
        <option value="public">Public (appears in creations page)</option>
        <option value="unlisted" selected>Unlisted (accessible by URL only)</option>
        <option value="discoverable">Discoverable (for subtle linking)</option>
      </select>
    </div>

    <div class="form-group">
      <label for="excerpt">Excerpt (optional)</label>
      <input type="text" id="excerpt" placeholder="A brief description of this piece" />
    </div>

    <div class="form-group">
      <label for="content">Content *</label>
      <textarea id="content" required rows="15" placeholder="Write your poem, story, or reflection here..."></textarea>
      <small>For poems: Add two spaces at the end of each line for line breaks</small>
    </div>

    <div class="form-actions">
      <button type="button" onclick="previewContent()" class="btn-secondary">Preview Markdown</button>
      <button type="button" onclick="submitContent()" class="btn-primary">Publish to GitHub</button>
    </div>
  </form>

  <div id="preview" class="preview" style="display: none;">
    <h3>Generated Markdown</h3>
    <pre id="preview-content"></pre>
    <button onclick="copyToClipboard()" class="btn-secondary">Copy to Clipboard</button>
  </div>

  <div id="status" class="status"></div>
</div>

<style>
.password-gate {
  max-width: 400px;
  margin: 4em auto;
  padding: 2em;
  background: #f8f8f8;
  border-radius: 8px;
  text-align: center;
}

.password-gate input {
  width: 100%;
  padding: 0.75em;
  margin: 1em 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.password-gate button {
  width: 100%;
  padding: 0.75em;
  background: #2a7ae4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
}

.password-gate button:hover {
  background: #1a5ac4;
}

.write-form {
  max-width: 700px;
  margin: 2em auto;
}

.form-group {
  margin-bottom: 1.5em;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5em;
  color: #333;
}

.form-group input[type="text"],
.form-group input[type="password"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75em;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
  font-family: inherit;
}

.form-group textarea {
  font-family: 'Courier New', monospace;
  line-height: 1.6;
}

.form-group small {
  display: block;
  margin-top: 0.3em;
  color: #666;
  font-size: 0.85em;
}

.checkbox-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.checkbox-group label {
  display: flex;
  align-items: center;
  gap: 0.3em;
  font-weight: normal;
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 1em;
  margin-top: 2em;
}

.btn-primary,
.btn-secondary {
  flex: 1;
  padding: 0.75em 1.5em;
  border: none;
  border-radius: 4px;
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s ease;
}

.btn-primary {
  background: #2a7ae4;
  color: white;
}

.btn-primary:hover {
  background: #1a5ac4;
}

.btn-secondary {
  background: #666;
  color: white;
}

.btn-secondary:hover {
  background: #555;
}

.preview {
  margin-top: 2em;
  padding: 1.5em;
  background: #f8f8f8;
  border-radius: 8px;
}

.preview pre {
  background: white;
  padding: 1em;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.9em;
  line-height: 1.4;
}

.status {
  margin-top: 1em;
  padding: 1em;
  border-radius: 4px;
  display: none;
}

.status.success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
  display: block;
}

.status.error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  display: block;
}

@media (max-width: 768px) {
  .form-actions {
    flex-direction: column;
  }

  .checkbox-group {
    flex-direction: column;
    gap: 0.5em;
  }
}
</style>

<script>
// This should be set as an environment variable in production
// For now, you'll set it when deploying
const WRITE_PASSWORD = 'CHANGE_ME_IN_PRODUCTION';

function checkPassword() {
  const input = document.getElementById('gate-password').value;
  const error = document.getElementById('password-error');

  // In production, this should call your serverless function to validate
  if (input === WRITE_PASSWORD || input.length > 0) { // Temporary: any password works for testing
    document.getElementById('password-gate').style.display = 'none';
    document.getElementById('write-form').style.display = 'block';
    error.style.display = 'none';
  } else {
    error.style.display = 'block';
  }
}

function generateContentId() {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `${timestamp}-${random}`;
}

function generateFilename(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getFormData() {
  const title = document.getElementById('title').value;
  const types = Array.from(document.querySelectorAll('input[name="type"]:checked'))
    .map(cb => cb.value);
  const tagsInput = document.getElementById('tags').value;
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()) : [];
  const visibility = document.getElementById('visibility').value;
  const excerpt = document.getElementById('excerpt').value;
  const content = document.getElementById('content').value;
  const contentId = generateContentId();
  const filename = generateFilename(title);
  const date = new Date().toISOString().split('T')[0];

  return {
    title,
    types,
    tags,
    visibility,
    excerpt,
    content,
    contentId,
    filename,
    date
  };
}

function generateMarkdown(data) {
  const typesStr = data.types.length > 1
    ? `[${data.types.join(', ')}]`
    : data.types[0];

  const tagsStr = data.tags.length > 0
    ? `[${data.tags.join(', ')}]`
    : '[]';

  return `---
title: "${data.title}"
type: ${typesStr}
layout: content
date: ${data.date}
tags: ${tagsStr}
excerpt: "${data.excerpt}"
content_id: "${data.contentId}"
companions: []
visibility: ${data.visibility}
---

${data.content}

---

${data.tags.map(t => '#' + t).join(' ')}
`;
}

function previewContent() {
  const data = getFormData();
  const markdown = generateMarkdown(data);

  document.getElementById('preview-content').textContent = markdown;
  document.getElementById('preview').style.display = 'block';

  // Scroll to preview
  document.getElementById('preview').scrollIntoView({ behavior: 'smooth' });
}

function copyToClipboard() {
  const markdown = document.getElementById('preview-content').textContent;
  navigator.clipboard.writeText(markdown).then(() => {
    alert('Markdown copied to clipboard!');
  });
}

async function submitContent() {
  const data = getFormData();
  const markdown = generateMarkdown(data);
  const status = document.getElementById('status');

  // Validation
  if (!data.title) {
    status.className = 'status error';
    status.textContent = 'Please enter a title';
    return;
  }

  if (data.types.length === 0) {
    status.className = 'status error';
    status.textContent = 'Please select at least one content type';
    return;
  }

  if (!data.content) {
    status.className = 'status error';
    status.textContent = 'Please enter some content';
    return;
  }

  status.className = 'status';
  status.textContent = 'Publishing...';
  status.style.display = 'block';

  try {
    // TODO: Call serverless function here
    // For now, just show the markdown
    const response = await fetch('/api/publish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filename: `${data.filename}.md`,
        content: markdown,
        password: document.getElementById('gate-password').value
      })
    });

    if (response.ok) {
      status.className = 'status success';
      status.textContent = `✓ Published! Your content will appear at /${data.filename}/ in 1-2 minutes after the site rebuilds.`;

      // Clear form
      document.getElementById('content-form').reset();
      document.getElementById('preview').style.display = 'none';
    } else {
      throw new Error('Publish failed');
    }
  } catch (error) {
    // For now, show preview since we don't have the serverless function yet
    status.className = 'status error';
    status.textContent = 'Serverless function not yet configured. Use Preview and copy the markdown for now.';
    previewContent();
  }
}

// Allow Enter in password field
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('gate-password');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        checkPassword();
      }
    });
  }
});
</script>
