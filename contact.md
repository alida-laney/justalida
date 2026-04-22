---
layout: landing
title: Contact
---

<h1>Reach Out</h1>

<p class="subtitle">Trust your pull.</p>

<p>
  <span class="accent-triangle pink"></span>
  <span class="accent-water blue"></span>
  <span class="accent-star yellow"></span>
  <span class="accent-square purple"></span>
</p>

<div class="content-section contact-section">
  <form action="https://formspree.io/f/mnjnawrn" method="POST" class="contact-form">
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" id="name" name="name" required>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" id="email" name="_replyto" required>
    </div>

    <div class="form-group">
      <label for="name">Request Type</label>
      <select id="request-type" name="request_type" required>
        <option value="">Select a request type</option>
        <option value="Tarot/Oracle">Tarot/Oracle Request</option>
        <option value="Intuitive Creation">Intuitive Creation Request</option>
        <option value="Consultation">Consultation Request</option>
        <option value="Collaboration">Collaboration Request</option>
        <option value="Comments and Feedback">Comments & Feedback</option>
      </select>
    </div>

    <div id="description">
    </div>

    <div class="form-group">
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="6" required></textarea>
    </div>

    <button type="submit">Send Message</button>
  </form>
</div>

<script>
  const params = new URLSearchParams(window.location.search);
  const type = params.get('type');
  if (type) {
    document.getElementById('request-type').value = type;
  }


  const descriptions = {
    "Tarot/Oracle": "Expect a photo of cards pulled & a written description of the energy felt - emailed within 72 hours of payment ($20, sent <a href='https://venmo.com/justalida'>here</a>). Include a question, a vibe, or a dream in the message box below.",
    "Intuitive Creation": "Expect a poem, a painting, or, perhaps, both - shipped within 14 days of payment ($50, sent <a href='https://venmo.com/justalida'>here</a>). Include a question, a vibe, or a dream in the message box below, as well as an address for shipping.",
    "Consultation": "Make sure you have read the expectations (TODO: ADD LINK) and feel aligned with the rigor of the work. Include a paragraph on why you are interested in this relationship, as well as days and times in the next 14 days where you would be available for a 15-20 minute phone consultation. I will reply within 72 hours to confirm or propose an appointment and will request a phone number at that time.",
    "Collaboration": "Please describe the nature of the project or interest, including why you are reaching out to me specifically.",
    "Comments and Feedback": "Your time, energy, and thoughts are appreciated. I will respond reciprocally, as I have time."
  }

  document.getElementById('description').innerHTML = descriptions[type] || '';

  document.getElementById('request-type').addEventListener('change', function() {
    document.getElementById('description').innerHTML = descriptions[this.value] || '';
  });
</script>

