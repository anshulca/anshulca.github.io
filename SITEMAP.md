# Site Map & URL Architecture

Clean, short, semantic URLs. No build step — each URL is a real static folder with `index.html`.
The canonical domain is a placeholder (`https://naamjap.in`) defined once in `js/site.config.js`.

## Primary Sections

| Section  | URL            | Status (Stage A–N)          |
|----------|----------------|-----------------------------|
| Home     | `/`            | Built                       |
| Jap      | `/jap/`        | Hub scaffold (features later) |
| Lekhan   | `/lekh/`       | Hub scaffold (features later) |
| Sadhana  | `/sadhana/`    | Hub scaffold (features later) |
| Mantra   | `/mantra/`     | Hub scaffold (features later) |
| Journey  | `/journey/`    | Hub scaffold (features later) |
| Tools    | `/tools/`      | Hub scaffold (features later) |
| About Me | `/about/`      | Built                       |
| Platform | `/platform/`   | Built                       |
| Legal    | `/privacy/`, `/terms/`, `/disclaimer/` | Built (structure) |
| 404      | `/404.html`    | Built                       |

## Detailed Hierarchy (future feature routes)

### Jap — `/jap/`
- `/jap/naam-jap/` — Naam Jap counter (daily + cumulative)
- `/jap/mala/` — Digital mala (108 beads + meru)
- `/jap/timer/` — Jap timer / rounds of 108
- `/jap/custom/` — Custom naam jap (free-form)

### Lekhan — `/lekh/`
- `/lekh/naam-lekhan/` — Write the naam, 108 per page
- `/lekh/notebook/` — Digital jap notebook (persisted pages)
- `/lekh/challenges/` — Writing challenges (e.g. 40-day)
- `/lekh/custom/` — Custom lekhan

### Sadhana — `/sadhana/`
- `/sadhana/daily/` — Daily sadhana checklist / flow
- `/sadhana/sankalp/` — Personal sankalp (resolves/projects)
- `/sadhana/target/` — Daily target setting
- `/sadhana/streak/` — Streak view
- `/sadhana/journey/` — Long-form sadhana journey

### Mantra — `/mantra/`
- `/mantra/` — Library hub (all mantras listed)
- `/mantra/ram/`, `/mantra/radha/`, `/mantra/krishna/`, `/mantra/shiv/`,
  `/mantra/hanuman/`, `/mantra/ganesh/`, `/mantra/durga/`, `/mantra/lakshmi/`,
  `/mantra/saraswati/`, `/mantra/other/`
- `/mantra/custom/` — User’s own mantra
- Mantra metadata lives in `js/site.config.js` (single source), pages are generated from it.

### Journey — `/journey/`
- Single-page dashboard: today’s progress, total jap, total malas, total naam written,
  streak, milestones, sadhana history. All client-side from local storage.

### Tools — `/tools/`
- `/tools/mala-calculator/`
- `/tools/goal-calculator/`
- `/tools/lakh-challenge/`
- `/tools/108-calculator/`
- `/tools/timer/`

## User Journey Flow
Choose Naam → Choose practice → Set target → Start Jap → Complete 108 → Mala done →
Continue next mala → Track progress → Complete daily sadhana → Build streak → Long-term journey.

Lekhan flow: Choose Naam → Open notebook → Write Naam → 108 writings → Page done →
Page-turn → Next page → Track total written.