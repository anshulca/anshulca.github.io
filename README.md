# Naam Jap

**Pause. Remember. Repeat.**

A calm, premium digital companion for the practice of Naam Jap, Naam Lekhan,
mantra jap and daily sadhana. Modern, minimal, private by design.

## Stack
Native HTML + CSS (design tokens) + vanilla JS. **No build step, zero
dependencies.** No Node needed — works out of the box when served over HTTP.

## Run locally
This is a static site. Serve the folder over HTTP (so root-relative `/` links and
the service worker work):

```bash
# from the project folder, any of these:
python -m http.server 8080
npx serve .        # if you have npx
# or VS Code "Live Server"
```
Then open `http://localhost:8080/`.
(Opening files directly via `file://` will break root-relative links and CSS.)

## Structure
```
/                 Home
/about/           About Me (content from config)
/platform/        About the Platform (content from config)
/privacy/ terms/ disclaimer/   Legal (structure)
/jap/ /lekh/ /sadhana/ /mantra/ /journey/ /tools/   Section hubs (scaffold)
404.html
css/  tokens · base · layout · components · pages
js/   site.config.js  ← SINGLE SOURCE OF TRUTH (branding + content)
      ui.js           ← primitives: modal, toast, tabs, reveal…
      core.js         ← global header/footer/nav, theme, PWA
assets/             logo.svg · favicon.svg · og-image.svg (placeholders)
manifest.webmanifest · sw.js · robots.txt · sitemap.xml
SITEMAP.md · ARCHITECTURE.md · DESIGN_SYSTEM.md
```

## Branding & content — one place
Edit **`js/site.config.js`** to change: brand name, Devanagari mark, tagline,
logo/favicon, nav, footer columns, social links, About Me and About the Platform
copy. Global header, drawer and footer are rendered from it by `core.js` — never
hard-coded per page.

Placeholder brand assets live in `assets/` (`logo.svg`, `favicon.svg`,
`og-image.svg`). Swap them to rebrand (keep the filenames to avoid edits).

## Where things stand (Stage A–N — foundation only)
Done: architecture & sitemap, design system, branding config, global header /
mobile nav / footer, responsive foundation, Home, About Me, About Platform,
Privacy/Terms/Disclaimer structures, SEO meta + JSON-LD, PWA scaffolding
(manifest + service worker), dark mode, reduced-motion, section hub placeholders.

NOT built yet (next stage): Naam Jap counter, digital mala, lekhan notebook,
sadhana, sankalp, streak, calculators, mantra library functionality.

## Notes
- Data/consistency: later features persist to **localStorage** under one key
  (`naamjap:data:v1`) so migration to an account system stays easy.
- The canonical URL `https://naamjap.in` is a placeholder — update it in
  `site.config.js` (and the SEO metas / sitemap) when a real domain is chosen.
- Fonts load from Google Fonts with system fallbacks; the site works offline via
  the service worker shell even if fonts can't load.