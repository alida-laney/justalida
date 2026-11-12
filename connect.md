---
layout: era
title: Connect
permalink: /connect/
---

<p class="eyebrow">connect</p>

<h1>Reach Out</h1>

<p><em>Trust the call.</em></p>

<form action="https://formspree.io/f/mnjnawrn" method="POST" class="connect-form">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email</label>
    <input type="email" id="email" name="_replyto" required>
  </div>

  <div class="form-group">
    <label for="request-type">Request Type</label>
    <select id="request-type" name="request_type" required>
      <option value="">Select a request type</option>
      <option value="Collaboration">Collaboration Request</option>
      <option value="Thoughts and Feedback">Thoughts & Feedback</option>
    </select>
  </div>

  <div id="description"></div>

  <div class="form-group">
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <button type="submit">Reach Out</button>
</form>

<script>
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type) {
    document.getElementById('request-type').value = type;
  }

  const descriptions = {
    "Collaboration": "Please describe the nature of the project or interest, including why you are reaching out to me specifically.",
    "Thoughts and Feedback": "Your time, energy, and language are appreciated. I will respond reciprocally, as I have time."
  }

  document.getElementById('description').innerHTML = descriptions[type] || '';

  document.getElementById('request-type').addEventListener('change', function() {
    document.getElementById('description').innerHTML = descriptions[this.value] || '';
  });
</script>
