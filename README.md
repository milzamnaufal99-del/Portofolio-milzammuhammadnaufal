# Portofolio-milzammuhammadnaufal

Personal portfolio website for **Milzam Muhammad Naufal** — Software Developer, IoT Engineer, and AI-Assisted Developer.

Built with HTML, CSS, and Vanilla JavaScript (no frameworks). Features a dark theme with glassmorphism styling, smooth animations, and a fully data-driven content architecture.

---

## Getting Started

Open `index.html` directly in a browser, or serve it with any static file server:

```bash
# Using Python
python3 -m http.server 8080

# Using Node.js (npx)
npx serve .
```

---

## ⚠️ Before Production Deployment

The following placeholder assets **must be replaced** before the site goes live:

### 1. OG Image (`assets/images/og-image.png`)

The current file at `assets/images/og-image.png` is an **SVG-based placeholder** (saved with a `.png` extension).  
It must be replaced with a **real 1200×630 pixel PNG screenshot** of the portfolio before deployment.

To generate the real OG image:
1. Open the deployed portfolio in a browser at full desktop width (1440px).
2. Take a screenshot of the hero section or the full above-the-fold view.
3. Crop/resize to exactly **1200×630 pixels**.
4. Save as `assets/images/og-image.png` (overwrite the placeholder).

This image appears when the portfolio URL is shared on LinkedIn, Twitter/X, Facebook, Slack, and other platforms that read Open Graph meta tags.

Alternatively, run the included helper script to generate a solid-color placeholder PNG (requires Python 3 or Node.js):

```bash
# Python 3
python3 assets/images/create_og_image.py

# Node.js
node assets/images/create_og_image.js
```

---

### 2. CV Download (`assets/` directory)

The **"Download CV"** button in the Hero section currently links to a placeholder path.  
Before deployment:
1. Export your CV as a PDF file (recommended filename: `Milzam-Muhammad-Naufal-CV.pdf`).
2. Place the PDF in the `assets/` directory.
3. Update the `href` attribute on the "Download CV" button in `index.html` to match the filename:
   ```html
   <a href="assets/Milzam-Muhammad-Naufal-CV.pdf" download class="btn btn-primary">
     Download CV
   </a>
   ```

---

## Project Structure

```
├── assets/
│   ├── css/          # Per-section and component CSS files
│   ├── js/           # JavaScript modules (renderer, animations, etc.)
│   ├── images/       # Images including og-image.png (replace before production)
│   └── icons/        # Icon assets
├── components/       # Reusable HTML component partials
├── data/             # Data layer JS files (projects, skills, certificates, etc.)
├── pages/            # Additional pages (if any)
└── index.html        # Single entry point
```

---

## Content Updates

All dynamic content is managed through the `data/` directory — no HTML or JavaScript changes needed:

| File | Content |
|------|---------|
| `data/projects.js` | Portfolio projects |
| `data/skills.js` | Technical skills |
| `data/certificates.js` | Certificates and credentials |
| `data/social-links.js` | Social and contact links |
| `data/achievements.js` | Achievement counters |
| `data/timeline.js` | Learning journey timeline |

---

## License

© 2025 Milzam Muhammad Naufal. All rights reserved.
