# justalida.com

A Jekyll-based website hosted on GitHub Pages at [justalida.com](https://justalida.com).

## Development

### Prerequisites

- Ruby 3.1+
- Bundler

### Local Development

1. Install dependencies:
   ```bash
   bundle install
   ```

2. Start the development server:
   ```bash
   ./dev.sh
   ```
   
   Or manually:
   ```bash
   bundle exec jekyll serve --drafts --livereload
   ```

3. Open [http://localhost:4000](http://localhost:4000) in your browser

The site will automatically reload when you make changes to your files.

### Creating Content

- Add blog posts to the `_posts/` directory
- Follow Jekyll's naming convention: `YYYY-MM-DD-title.md`
- Use front matter to set title, date, and other metadata

### Custom Styles

Custom SCSS can be added to `assets/css/main.scss`.

## Deployment

The site automatically deploys to [justalida.com](https://justalida.com) when changes are pushed to the `main` branch via GitHub Actions.

### DNS Configuration

Make sure your domain's DNS is configured to point to GitHub Pages:
- Add a CNAME record pointing `justalida.com` to `[username].github.io`
- Or use A records pointing to GitHub Pages IPs if using an apex domain
