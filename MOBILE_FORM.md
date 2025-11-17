# Mobile Content Creation Form

A simple, mobile-friendly form for creating content on the go.

## How It Works

1. **Access**: Go to `/write/` on your site
2. **Password**: Enter your password to unlock the form
3. **Fill out**: Add title, type, tags, visibility, and content
4. **Generate**: Click "Generate Markdown"
5. **Copy**: Copy the generated markdown to clipboard
6. **Publish**: Paste into GitHub (instructions provided in the form)

## Features

- Password-protected access
- Mobile-responsive design
- Auto-generates filenames and content IDs
- Supports all content types (poem, story, reflection, project, visual-art)
- Visibility options (public, unlisted, discoverable)
- One-click copy to clipboard
- Works great on phone!

## Usage from Mobile

### Quick Workflow

1. Bookmark `/write/` on your phone
2. When inspiration strikes, open the bookmark
3. Enter password → fill out form → generate markdown
4. Tap "Copy to Clipboard"
5. Follow the link to GitHub or open GitHub mobile app
6. Create new file in `_content/` directory
7. Paste the markdown and commit!

### GitHub Mobile App

The easiest way to publish from your phone:

1. Open GitHub mobile app
2. Go to your justalida repo
3. Navigate to `_content/` folder
4. Tap "+" → "Create new file"
5. Name it (e.g., `my-poem.md`)
6. Paste the markdown from the form
7. Commit directly to main branch
8. Done! Site rebuilds in 1-2 minutes

### GitHub Website (Mobile Browser)

If you don't have the app:

1. After copying markdown, tap the GitHub link in the form
2. Sign in to GitHub
3. It will open the "create new file" page
4. Paste the markdown
5. Scroll down and commit

## Setting Your Password

The password is set in the JavaScript at the top of `write.md`:

```javascript
const WRITE_PASSWORD = 'CHANGE_ME_IN_PRODUCTION';
```

Change this to your desired password. It's client-side only, so it provides basic protection but isn't super secure. That's okay since the worst someone could do is generate markdown - they still can't publish to your repo without your GitHub credentials.

## Tips

- **Line breaks in poems**: Add two spaces at the end of each line
- **Start with "unlisted"**: Create new content as unlisted first, then change to public later
- **Use common tags**: Build up a consistent set of tags (e.g., healing, processing, language)
- **Preview first**: Always preview to make sure the formatting looks right

## Troubleshooting

### "Failed to copy"

Some browsers don't support clipboard API. Just manually select and copy the markdown from the preview box.

### Content doesn't appear after publishing

Wait 2-3 minutes for GitHub Pages to rebuild. Check your commits at https://github.com/alida-laney/justalida/commits/main to verify the file was created.

---

Happy creating! 📝✨
