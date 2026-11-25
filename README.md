# Krish Taliyan — Portfolio

Personal portfolio built with **React 19 + Vite + Tailwind CSS**, deployed to GitHub Pages at
**https://krishtaliyan.github.io/KrishTaliyan-Portfolio/**.

## Highlights

- Interactive particle-constellation hero that reacts to the cursor, typewriter role line, animated stat counters
- **Interactive terminal** — visitors can type `help`, `whoami`, `skills`, `projects`, `contact`, `resume`, `goto projects`…
- Skills marquee + spotlight cards, experience timeline, filterable project grid with 3D tilt cards
- Certificate lightbox, copy-to-clipboard contact details, and a contact form that opens the visitor's email app
- Active-section navbar with scroll progress bar, mobile menu, reduced-motion support

## Editing content

All text, links, projects and certificates live in **`src/data.js`** — edit that file, no component changes needed.
Images and the resume PDF live in `public/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173/KrishTaliyan-Portfolio/
npm run build      # production build into dist/
npm run preview    # serve the production build
```

## Deploying to GitHub Pages

Deployment is automatic via `.github/workflows/deploy.yml`: every push to `main` builds the site and publishes `dist/`.

One-time setup in the GitHub repo: **Settings → Pages → Build and deployment → Source: _GitHub Actions_**.

> The `base` in `vite.config.js` must match the repository name (`/KrishTaliyan-Portfolio/`). If the repo is renamed, update it.
