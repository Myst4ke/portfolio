# Florian Posez - Portfolio

Vite + React portfolio. 5 pages (Home, Skills, Experience, Case study, Contact) navigated via React state. FR/EN i18n, dark mode, scroll-driven animations, interactive architecture/lineage diagrams, mailto contact form.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serves dist/ locally
```

## Deploy to GitHub Pages

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds with `VITE_BASE=/<repo-name>/` and publishes `dist/` to GitHub Pages.

In repo settings → Pages, set the source to **GitHub Actions**.

## Where things live

- `index.html` - entry HTML, theme-init script, fonts, OG/Twitter meta
- `src/main.jsx` - React mount
- `src/App.jsx` - page state + providers
- `src/i18n.jsx` - all FR/EN strings, theme provider, `EXPERIENCE_PERIODS` and `computeExperienceMonths()`
- `src/components.jsx` - Header, Footer, Logo, primitives
- `src/scroll-fx.jsx` - scroll hooks, Reveal, CountUp, DonutChart, BarChart, DataPrintLive, HBar, PageScrollBar
- `src/diagrams.jsx` - ArchitectureDiagram (Olaqin SI before/after), MigrationTimeline, LineageGraph (Fabric medallion)
- `src/page-home.jsx`, `page-skills-exp.jsx`, `page-case-contact.jsx` - pages
- `public/` - favicon.svg, og-image.svg, CV PDFs (drop yours here as `cv-florian-posez-fr.pdf` / `cv-florian-posez-en.pdf`)

## Dynamic experience counter

The first home stat ("Mois sur le terrain") is computed from `EXPERIENCE_PERIODS` in `src/i18n.jsx`. To extend or adjust, edit that array - the counter updates on every page render with no further changes needed.

## To replace before going live

- `og:url` in `index.html` once the live URL is known (currently set to `myst4ke.github.io/portfolio`)
- CV PDFs in `public/` (`cv-florian-posez-fr.pdf`, `cv-florian-posez-en.pdf`)
- Testimonials in `src/i18n.jsx` (`home.testimonials`) - currently three TODO placeholders, to be replaced with real quotes from recommendation letters / supervisors
