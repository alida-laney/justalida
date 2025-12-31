# How to Add Content to Your Site

## Adding Poems

1. Create a new file in the `_poems/` folder
2. Name it something like `my-poem-title.md`
3. Add front matter and content:

```yaml
---
title: "Your Poem Title"
layout: poem
date: 2025-01-15
tags: [tag1, tag2, tag3]
excerpt: "First line or teaser for the poem"
---

Your poem content here.
Add two spaces at the end of each line
for line breaks in your poem.

You can use blank lines for stanzas.
```

4. Save the file and commit/push to see it appear on your Work page

## Adding Art

1. Upload your image to `assets/art/`
2. Create a new file in the `_art/` folder (like `_art/my-artwork.md`)
3. Add front matter and content:

```yaml
---
title: "Your Art Title"
layout: landing
date: 2025-01-15
image: /assets/art/your-image.jpg
excerpt: "Optional description of the piece"
---

Optional: You can add more text about the piece here if you want.
```

4. Save the file and commit/push - it will automatically appear on your Work page!

Note: See `_art/example.md` for a working example (you can delete this file)

## Setting Up the Contact Form

Your contact form uses Formspree. To activate it:

1. Go to https://formspree.io and create a free account
2. Create a new form and get your form ID
3. Edit `contact.md` and replace `YOUR_FORM_ID` with your actual form ID
4. Save and push - your contact form will now work!

## Publishing Changes

After adding content:

```bash
git add .
git commit -m "Add new poem/art"
git push origin claude/basic-landing-page-DsSy4
```

Then merge to your main branch to publish to justalida.com
