# Krish Taliyan — Portfolio

Personal portfolio built with **React 19 + Vite + Tailwind CSS**, deployed to GitHub Pages at
**https://krishtaliyan.github.io/KrishTaliyan-Portfolio/**.

## Highlights

- **Buttery smooth scrolling** with [Lenis](https://github.com/darkroomengineering/lenis); every `#section` link glides into place
- Intro preloader (once per visit), word-by-word heading reveals, parallax hero, magnetic buttons, custom cursor
- Interactive particle-constellation hero, typewriter role line, animated stat counters
- **Interactive terminal** — visitors can type `help`, `whoami`, `skills`, `projects`, `contact`, `resume`, `goto projects`…
- Featured projects **stack and pin** as you scroll, with real screenshots of each live site
- Skills marquee that leans with scroll speed, timeline that fills as you scroll, scroll-driven "Let's work together" banner
- Certificate lightbox, copy-to-clipboard contact details, contact form that opens the visitor's email app
- Auto-hiding navbar with sliding active pill, scroll progress bar, back-to-top ring
- Respects `prefers-reduced-motion` (animations and smooth scroll switch off)

## Editing content

All text, links, projects and certificates live in **`src/data.js`** — edit that file, no component changes needed.
Images, project screenshots (`public/projects/`) and the resume PDF live in `public/`.

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
