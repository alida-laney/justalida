# Mobile Content Creation Form - Deployment Guide

This guide walks you through setting up the mobile-friendly content creation form that publishes directly to your GitHub repository.

## What You've Built

- **Form page**: `/write/` - Password-protected form for creating content from mobile
- **Serverless function**: Netlify function that uses GitHub API to create files
- **Auto-deployment**: When you submit the form, it creates a file and triggers a rebuild

## Setup Steps

### 1. Create GitHub Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name like "justalida-mobile-form"
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again)

### 2. Deploy to Netlify

#### Option A: Import from GitHub (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub and select your `justalida` repository
4. Configure build settings:
   - **Build command**: `bundle exec jekyll build`
   - **Publish directory**: `_site`
   - **Branch**: `main` (or whatever branch you want to deploy from)
5. Click "Deploy site"

#### Option B: Netlify CLI

```bash
npm install -g netlify-cli
cd /path/to/justalida
netlify init
# Follow prompts to connect to your repo
```

### 3. Configure Environment Variables

In Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add these variables:

   | Variable | Value | Example |
   |----------|-------|---------|
   | `GITHUB_TOKEN` | Your personal access token from step 1 | `ghp_xxxxxxxxxxxx` |
   | `WRITE_PASSWORD` | Password for /write/ form (choose your own) | `MySecurePassword123!` |
   | `GITHUB_REPO` | Your repository in format `owner/repo` | `alida-laney/justalida` |
   | `GITHUB_BRANCH` | Branch to commit to | `main` |

3. Click "Save"

### 4. Redeploy Site

After adding environment variables:
1. Go to **Deploys** tab
2. Click "Trigger deploy" → "Deploy site"
3. Wait for build to complete

### 5. Test the Form

1. Visit `https://your-site.netlify.app/write/` (or your custom domain)
2. Enter your password (the one you set in `WRITE_PASSWORD`)
3. Fill out the form with test content
4. Click "Publish to GitHub"
5. Wait 1-2 minutes for GitHub Pages to rebuild
6. Check if your content appears!

## Using the Form

### From Mobile

1. Bookmark `/write/` on your phone
2. When inspiration strikes:
   - Open the bookmark
   - Enter password
   - Fill in title and content
   - Choose visibility (public/unlisted/discoverable)
   - Hit publish!

### Visibility Options

- **Public**: Appears in /creations/ page, sitemaps, feeds
- **Unlisted**: Accessible by URL but hidden from listings (great for drafts!)
- **Discoverable**: Hidden but can be subtly linked from other content

### Tips for Mobile Writing

- **Poem line breaks**: Add two spaces at the end of each line
- **Quick tags**: Use common tags like `healing, processing, language`
- **Save as unlisted first**: You can always edit the visibility later in GitHub
- **Preview before publishing**: Use the Preview button to see the markdown

## Troubleshooting

### "Serverless function not yet configured"

- Check that environment variables are set in Netlify dashboard
- Redeploy the site after adding variables
- Check function logs in Netlify: **Functions** tab → **publish** → **Function log**

### "Invalid password"

- Double-check `WRITE_PASSWORD` environment variable
- Remember: password is case-sensitive

### "File already exists"

- Choose a different title (filename is auto-generated from title)
- Or edit/delete the existing file in GitHub first

### Content doesn't appear after publishing

- Wait 2-3 minutes for GitHub Pages to rebuild
- Check the commit in GitHub: https://github.com/alida-laney/justalida/commits/main
- Verify the file was created in `_content/` directory

## Security Notes

- ⚠️ **Password is client-side only** - Anyone can view the source and see the password check is in JavaScript
- ✅ **GitHub token is secure** - It's only in Netlify environment variables, never exposed to client
- ✅ **Password is validated server-side** - The serverless function checks it again
- 💡 **For better security**: Consider adding rate limiting or IP whitelist in Netlify

## Future Improvements

- Add auto-save to localStorage (in case you lose connection)
- Rich text editor with preview
- Upload images for visual-art type
- Edit existing content (not just create new)
- Companion piece selector

## Cost

With Netlify Free tier:
- ✅ Serverless functions: 125,000 requests/month (way more than you'll use)
- ✅ Build minutes: 300/month
- ✅ Bandwidth: 100GB/month

You'll stay well within free limits writing poems from your phone!

---

Questions? Issues? Check the function logs in Netlify or commit history in GitHub.
