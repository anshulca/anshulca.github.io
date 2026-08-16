# Product & Technical Architecture

## Design Principles
Calm · Premium · Indian · Spiritual · Modern · Personal · Beautiful · Fast.
Spiritual motifs (mala, mandala, lotus, paper) are subtle details — discovered, not forced.

## Stack (no build step, zero dependencies)
- **HTML** — static, semantic, SEO-ready pages.
- **CSS** — design token system via custom properties (`css/tokens.css`) + base/layout/components/pages.
- **Vanilla JS** — `site.config.js` (single source of truth), `ui.js` (interaction primitives),
  `core.js` (global chrome — header/footer/nav injection, theme, PWA register).
No frameworks, no runtime libraries. Everything native.

## Folder Structure
```
Naam Jap/
├─ index.html            Home
├─ 404.html
├─ about/index.html      About Me
├─ platform/index.html   About the Platform
├─ privacy/index.html
├─ terms/index.html
├─ disclaimer/index.html
├─ jap/index.html        Section hub (scaffold)
├─ lekh/index.html       Section hub (scaffold)
├─ sadhana/index.html    Section hub (scaffold)
├─ mantra/index.html     Section hub (scaffold)
├─ journey/index.html    Section hub (scaffold)
├─ tools/index.html      Section hub (scaffold)
├─ css/
│  ├─ tokens.css         Design tokens (colour, type, space, radius, shadow, motion)
│  ├─ base.css           Reset, typography, utilities, accessibility
│  ├─ layout.css         Header, footer, nav, sections, grid, site-frame
│  ├─ components.css     Reusable UI primitives
│  └─ pages.css          Home / About / Platform / Legal styling
├─ js/
│  ├─ site.config.js     BRANDING + CONTENT single source
│  ├─ ui.js              Modal, BottomSheet, Toast, Confirm, Tabs, Segmented, Tooltip, Reveal
│  └─ core.js            Injects global chrome from config; theme; PWA register
├─ assets/
│  ├─ favicon.svg
│  ├─ logo.svg
│  └─ og-image.svg
├─ manifest.webmanifest
├─ sw.js                 Minimal service worker (PWA-ready, offline shell)
├─ robots.txt
├─ sitemap.xml
├─ SITEMAP.md
├─ ARCHITECTURE.md
├─ DESIGN_SYSTEM.md
└─ README.md
```

## Rendering / Non-duplication
Global chrome (header, desktop nav, mobile nav, footer) is rendered **once** by `core.js`
from `site.config.js`. Pages contain only their `<main>` content, so branding is never
hard-coded per page. `data-chrome` attributes mark injection points:
- `site-header`, `site-footer`, `mobile-drawer`, `toast-root`, `modal-root`.

## Privacy & Data (Stage N design)
- All user data is kept in **localStorage** under one namespaced key (e.g. `naamjap:data:v1`)
  via a thin `store` layer (added with features in the next stage).
- No backend introduced. A clear, single `store` boundary means data can be migrated to an
  account / cloud-sync layer later without touching feature code.

## PWA-readiness
- `manifest.webmanifest` + theme-colour + apple-touch meta.
- `sw.js` caches the app shell (offline-first ready). Registered in `core.js` behind feature detect.
- Offline is a natural fit: local-first persistence + cached static shell.

## Future-ready (not built now, but not blocked)
Login/account, cloud sync, multi-device, backup/export, offline mode, notifications/reminders,
audio mantras, festival modes, personal sankalp, advanced statistics.
These sit behind the config + store boundaries defined above.

## Performance
- Zero JS/CSS libraries. SVG for all icons/illustrations. Lazy `loading="lazy"` for below-fold media.
- System + one variable font pairing; `font-display: swap`; fallback stacks so offline never breaks.
- Animations are CSS/native only; `prefers-reduced-motion` honoured globally.
- Assets are self-contained except optional Google Fonts (graceful failure).

## Accessibility
Keyboard navigation, visible focus rings, ARIA roles on chrome & interactive primitives,
semantic landmarks, readable contrast, screen-reader-friendly labels, reduced-motion support.