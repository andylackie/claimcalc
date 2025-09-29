# Employment Law Quiz - CDN Deployment

Automated deployment to Cloudflare Pages for the employment law discrimination assessment quiz.

## 🚀 Quick Start

1. **Create GitHub Repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/employment-quiz-cdn.git
   git push -u origin main
   ```

2. **Set up Cloudflare Pages**
   - Go to Cloudflare Dashboard → Pages
   - Connect to GitHub repository
   - Project name: `claimquiz`
   - Build command: `npm run build`
   - Build output directory: `.`

3. **Add Secrets to GitHub**
   - Go to repository Settings → Secrets and variables → Actions
   - Add:
     - `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token
     - `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare Account ID

## 📁 File Structure

```
├── webflow-quiz.min.js          # Current quiz bundle
├── webflow-quiz.v1.0.0.min.js   # Versioned file (auto-generated)
├── _headers                      # Cloudflare caching headers
├── _redirects                    # Fallback routing
├── package.json                  # Dependencies and scripts
├── build.js                      # Build script
└── .github/workflows/deploy.yml  # Auto-deployment
```

## 🔄 Deployment Flow

1. **Update Quiz Code**: Edit `webflow-quiz.min.js`
2. **Version Bump**: `npm run version:patch` (or `version:minor`)
3. **Auto-Deploy**: Push to GitHub → Cloudflare Pages auto-deploys
4. **Update Webflow**: Change script src to new version

## 📝 Webflow Integration

```html
<div id="employment-quiz"></div>
<link rel="preconnect" href="https://claimquiz.pages.dev">
<script src="https://claimquiz.pages.dev/webflow-quiz.v1.0.0.min.js" defer></script>
```

## 🎯 Benefits

- **Fast**: Cloudflare's global CDN + immutable caching
- **Secure**: No manual uploads, auditable Git history
- **Reliable**: Auto-deploys on every push
- **Versioned**: Safe rollbacks, cache busting
- **Scalable**: Handles traffic spikes automatically

## 🔧 Commands

```bash
npm run version:patch    # 1.0.0 → 1.0.1
npm run version:minor    # 1.0.0 → 1.1.0
npm run build           # Manual build
```

## 📊 Performance

- **Cache**: 1 year immutable caching
- **CDN**: 200+ global locations
- **Compression**: Automatic gzip/brotli
- **Security**: XSS protection, content type validation

## 🔄 Update Process

1. Edit `webflow-quiz.min.js`
2. Run `npm run version:patch`
3. Commit and push: `git add . && git commit -m "Update quiz" && git push`
4. Cloudflare auto-deploys to `claimquiz.pages.dev`
5. Update Webflow script src to new version

## 🛠️ Troubleshooting

- **Build fails**: Check Node.js version (18+)
- **Deploy fails**: Verify API token permissions
- **Cache issues**: Use new version number
- **404 errors**: Check file paths in _redirects