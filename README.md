# Tachyon Village — GitHub Pages website

A static promotional and installation website for **Tachyon Village**, built with HTML/CSS/vanilla JavaScript. It requires no build pipeline, npm dependencies or backend.

## Preview locally

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this folder and visit `http://localhost:8000`.

## Publish with GitHub Pages (fastest way)

1. Create a repository for the public site, e.g. `tachyon-website`, or use the `docs/` folder of the existing application repository. **Never publish any private API keys, customer data, local cadence files, or private scripts.**
2. Upload the contents of this folder, keeping `index.html`, `config.js`, `styles.css`, `app.js`, `.nojekyll`, and `assets/` together at the publishing root. For an existing app repository, put all these files under `docs/` instead.
3. Go to **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Select the appropriate branch (typically `main`), then `/ (root)` or `/docs` depending on where you uploaded the site. Save.
5. GitHub will supply your Pages URL, typically `https://YOUR-USERNAME.github.io/tachyon-website/`.

Official guide: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Connect downloads to GitHub Releases

Edit `config.js` after you have created and tested public release builds:

```js
window.TACHYON_SITE = {
  repositoryUrl: "https://github.com/YOUR-USERNAME/YOUR-APP-REPO",
  releasesUrl: "https://github.com/YOUR-USERNAME/YOUR-APP-REPO/releases",
  downloads: {
    mac: "https://github.com/YOUR-USERNAME/YOUR-APP-REPO/releases/latest/download/Tachyon-macOS.dmg",
    windows: "https://github.com/YOUR-USERNAME/YOUR-APP-REPO/releases/latest/download/Tachyon-Windows-Setup.exe",
    linux: "https://github.com/YOUR-USERNAME/YOUR-APP-REPO/releases/latest/download/Tachyon-Linux.AppImage"
  },
  releaseLabel: "V1.0 AVAILABLE"
};
```

**IMPORTANT:** The above filenames are illustrative ONLY. Use the exact filenames of *your* uploaded GitHub Release assets. Do not enable a button until the platform's installer has actually been published and verified. Until configured, the website clearly displays **Download coming soon**.

GitHub documents `/releases/latest/download/asset-name` for release assets: https://docs.github.com/en/repositories/releasing-projects-on-github/linking-to-releases

## Branding / screenshots

- `assets/orb.svg` is a custom vector interpretation of the Tachyon Wave Orb mascot, with a physics-inspired luminous wave.
- `assets/screen-*.webp` are *concept previews*, not assertions of current production UI.
- The site has parallax-style landscape layers, ambient twinkling particles, gentle floating orb animation, and reduced-motion support.
- Screenshots should be reviewed carefully before publishing: screenshots or previews containing real company/customer/contact names should be replaced with **sanitised demo data**. Never publish real contact names, email addresses, phone numbers, client information, or campaign data without appropriate authorisation.

## Before launch checklist

- [ ] Confirm product naming (`Tachyon` / `Tachy-on Village`) and final marketing copy.
- [ ] Replace any screenshot with sensitive or unapproved information with a sanitised demo screenshot.
- [ ] Confirm that advertised features and supported operating systems match the actual release.
- [ ] Verify downloads on each supported platform and configure `config.js` with exact release URLs.
- [ ] Add code-signing / security installation guidance appropriate to the actual binaries.
- [ ] Check mobile layout, keyboard navigation, reduced-motion settings, and external links.
- [ ] Verify the live GitHub Pages URL and release downloads after deployment.

## Scope

This is a **website**, not the desktop application's backend. It cannot import Cognism data or embed an authenticated Chrome session; those features belong in Tachyon's desktop implementation.
