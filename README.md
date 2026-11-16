# Estavia Risk & Security Solutions Ltd — Landing Page

A fast, responsive single-page website for Estavia. Plain HTML/CSS/JS — no build step, no dependencies.

## Project structure

```
estavia/
├── index.html          # All page content
├── css/
│   └── style.css       # Navy + gold theme styles
├── js/
│   └── script.js       # Mobile menu, operations carousel, scroll animations, quote form
├── assets/
│   ├── logo.jpg        # Original shield logo with checkerboard background
│   ├── logo-transparent.png # Logo copy with checkerboard removed
│   ├── hero.jpg        # Hero background (port security guard)
│   ├── guarding.jpg    # Gallery image
│   ├── cctv.jpg        # Gallery image
│   ├── port.jpg        # Gallery image
│   ├── control-room.jpg# Gallery image
│   ├── cargo.jpg       # Cargo escort image
│   ├── training.jpeg   # Training gallery image
└── README.md
```

## Run locally

Just open `index.html` in a browser — or better, use VS Code's
**Live Server** extension (right-click `index.html` → "Open with Live Server").

## Host on GitHub Pages

1. Create a new repository on GitHub, e.g. `estavia-website`
   (make it **Public** for free Pages hosting).
2. In VS Code, open the `estavia` folder:
   ```bash
   git init
   git add .
   git commit -m "Initial Estavia landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/estavia-website.git
   git push -u origin main
   ```
3. On GitHub, open the repo → **Settings** → **Pages**.
4. Under "Build and deployment" choose **Deploy from a branch**, pick the `main`
   branch and `/ (root)` folder, then **Save**.
5. Wait a minute — your site goes live at:
   `https://YOUR-USERNAME.github.io/estavia-website/`

## Customising

- **Colors**: edit the CSS variables at the top of `css/style.css`
  (`--gold`, `--navy-*`).
- **Contact details**: search `index.html` for the phone numbers / email.
- **Quote form**: the form opens WhatsApp (254750856829) with a pre-filled
  message. Change the number in `js/script.js` to switch numbers, or replace
  the submit handler with a form service (Formspree, etc.).

## Notes

The images currently in `assets/` are used directly by the site.
