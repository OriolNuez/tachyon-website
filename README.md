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

## Downloads and install commands

The app is published as **releases of this repository**: <https://github.com/OriolNuez/tachyon-website/releases>. Each release carries six files, built in the app repository with `npm run release`:

| File | Used by |
|---|---|
| `Tachy-on-Village-mac-arm64.zip` | Apple silicon Macs |
| `Tachy-on-Village-mac-x64.zip` | Intel Macs |
| `Tachy-on-Village-Setup-windows-x64.exe` | Windows |
| `install.sh` / `install.ps1` | the one-line install commands |
| `SHA256SUMS.txt` | checksums the install commands verify |

`index.html` links to them through `https://github.com/OriolNuez/tachyon-website/releases/latest/download/<file>`, so a new release updates the site and the install commands without editing the page. Keep the file names the same in every release. If the version or the download sizes change, update `releaseLabel` in `config.js` and the sizes in `index.html`.

The install commands shown on the page:

```sh
curl -fsSL https://github.com/OriolNuez/tachyon-website/releases/latest/download/install.sh | bash   # macOS Terminal
```

```powershell
irm https://github.com/OriolNuez/tachyon-website/releases/latest/download/install.ps1 | iex          # Windows PowerShell
```

## Branding / screenshots

- `assets/event-horizon.png` is the app's own pixel-art bar (480x270, scaled with crisp pixels), and `assets/tachyon.png` is Tachyon from the app's sprite.
- `assets/step-*.webp` are real screenshots of the app taken by its automated tests, which use only invented data.
- The only motion is Tachyon's opening line typing out, and it's skipped when reduced motion is on.
- Screenshots should be reviewed carefully before publishing: screenshots or previews containing real company/customer/contact names should be replaced with **sanitised demo data**. Never publish real contact names, email addresses, phone numbers, client information, or campaign data without appropriate authorisation.

## Before launch checklist

- [ ] Confirm product naming (`Tachyon` / `Tachy-on Village`) and final marketing copy.
- [ ] Replace any screenshot with sensitive or unapproved information with a sanitised demo screenshot.
- [ ] Confirm that advertised features and supported operating systems match the actual release.
- [x] Downloads published as release assets and linked with exact file names; install guidance for unsigned builds is on the page.
- [ ] Test the Windows installer on a Windows computer.
- [ ] Check mobile layout, keyboard navigation, reduced-motion settings, and external links.
- [ ] Verify the live GitHub Pages URL and release downloads after deployment.

## Scope

This is a **website**, not the desktop application's backend. It cannot import Cognism data or embed an authenticated Chrome session; those features belong in Tachyon's desktop implementation.
