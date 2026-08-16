# Design System — Naam Jap

The single source of truth for the visual language is `css/tokens.css` (CSS custom
properties). Every token below is a variable there; components reference those
variables, never raw values.

## Colour
| Token | Light | Dark | Use |
|---|---|---|---|
| `--bg` | `#f6f3ec` (paper ivory) | `#15120e` | page background |
| `--surface` | `#fffdf9` | `#1e1a15` | cards |
| `--surface-raised` | `#ffffff` | `#262117` | overlays / drawer / inputs |
| `--surface-sunken` | `#efece2` | `#120f0b` | wells, progress track |
| `--ink` | `#2b2620` | `#f1ece2` | primary text |
| `--ink-muted` | `#6d675c` | `#b4ad9c` | secondary text |
| `--ink-faint` | `#98917f` | `#7d7668` | captions / tertiary |
| `--line` / `--line-strong` | `#e7e0d0` / `#d6cdb8` | `#322c22` / `#463e30` | borders |
| `--primary` | `#33405f` | `#b6bfdd` | links / emphasis (ink indigo) |
| `--accent` | `#b5852f` (muted gold) | `#d0a24d` | the mala accent, CTAs |
| `--accent-soft` | `#efe4cb` | `#332a17` | tinted washes/fills |
| `--success / warning / error` | sages & ochres | lightened | feedback states |

Philosophy: **no garish saffron**. A warm paper base, a calm ink-indigo, and a
sober muted-gold used sparingly as the "mala gold".

## Typography
- **Display / headings:** Fraunces (premium serif with soul) → fallback Georgia.
- **Body / UI:** Inter → fallback system sans.
- **Devanagari:** Tiro Devanagari Hindi for mantra/naam; Noto Sans Devanagari fallback.
- Scales via `clamp()` (fluid): hero `--text-3xl` up to `4.6rem`, down to `--text-xs`.
- Tabular numerals `.num` for counters/stats; tight display tracking.

## Spacing
Base 4px scale (`--space-1..10`). Page gutters `clamp(1.1rem→2.5rem)`, max content
1160px, reading width 68ch. Generous `--section-gap` for calm rhythm.

## Radius
Cards `18–22px`, buttons/inputs `999px` (pill) & `12px`, modals `30px`, sheets
rounded top. Beads are circular (implied).

## Elevation (soft, warm shadows)
`--shadow-xs … --shadow-pop`. Soft, low-opacity, warm-tinted. Dark theme deepens them.

## Motion
Durations `150 / 260 / 520ms` with a gentle `cubic-bezier` ease-out and a
slight spring for taps. `prefers-reduced-motion` collapses everything to 1ms.
- Hover: colour/inset + 3px lift on link cards.
- Tap: `translateY(1px)`.
- Counter feedback: `bump` scale keyframe.
- Page turn: transform-origin left (in-prep).
- Reveal-on-scroll: 18px rise + fade via IntersectionObserver.

## Components (in `css/components.css`)
Buttons (primary / ink / ghost / soft / sizes), chips, cards (link / tint / ink),
progress bar, circular ring, mala beads, counter, streak pill, milestone, modal,
bottom sheet, confirm dialog, toast, tooltip, tabs, segmented control, inputs,
stepper, date, empty/loading/error states, notebook page sheets, timer, audio ctl.

## Principles
Calm · Premium · Indian · Spiritual · Modern · Personal.
Motifs (mala, mandala, paper) are subtle and optional — discovered, never forced.