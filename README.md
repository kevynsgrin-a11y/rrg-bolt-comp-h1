# Ride Ready Guide — Holiday Spotlight Band

A standalone UI **comp** (component showcase) for a theme-park planning
publication. The band renders a full-width holiday-night scene built entirely
from CSS gradients and inline SVG, with editorial content — season label,
headline, three event cards, and two CTAs — layered over it at AA contrast.

This is the **H1** comp: the Holiday Season Spotlight Band.

---

## What's in the band

- A **night scene** drawn from pure CSS gradients and inline SVG:
  - a village-fairground skyline in silhouette (rooftops, church spire,
    chimneys)
  - a **Ferris wheel** with 16 spokes and 8 gondola buckets
  - **string lights** in warm amber and soft white along a true catenary sag
  - **two parallax snowfall layers** (24 back flakes + 16 front flakes)
  - **eleven window candles** with a 4-second flicker and glow halo
  - a **five-pointed star** high in the sky with a twinkle animation
  - a ground gradient fade at the bottom
- A **scrim** of three layered gradients holding AA contrast over the scene
- **Editorial content** over the scene:
  - season label — "HOLIDAY SEASON · STARTS NOVEMBER 13"
  - headline — "The park after dark, lit like a village fair."
  - a one-line lede about three nights of lanterns, string lights, and fireworks
  - **three event cards** with green CONFIRMED and amber EXPECTED status pills
  - two CTAs — "See all holiday dates" (primary teal) and
    "Planning guide & crowd calendar" (secondary)
- A **Polish Moves** section below the band documenting five techniques
- A **light/dark theme toggle** with `localStorage` persistence and a 400 ms
  cross-fade across every colour in the band
- Full **reduced-motion** support: snowfall becomes static dots, candle flicker
  stops, string lights hold steady, the star stops twinkling

---

## Run it

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the Vite dev server with HMR   |
| `npm run build` | Type-check and build for production  |
| `npm run lint`  | Lint with ESLint (typescript-eslint) |
| `npm run preview` | Preview the production build locally |

## Tech note

Built with **Vite + React 18 + TypeScript**. Styling is hand-written CSS
(custom properties + keyframes) — no Tailwind classes are used in the component
markup, though the Tailwind + PostCSS config is included for parity with the
parent project. All icons are inline SVG; no icon library is imported. The
entire scene is resolution-independent vector art and CSS, so it stays crisp at
any width.
