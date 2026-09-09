# Polish Moves — H1 Holiday Season Spotlight Band

Five techniques behind the night-scene band above the fold.

---

## 01 · Two-depth parallax snowfall

A **back layer** of 24 small (2–4 px), slow flakes and a **front layer** of 16
larger (4–7 px), faster flakes. Both layers animate `transform` and `opacity`
only, so the browser compositor keeps them off the main thread. The two depths
read as real parallax — near flakes race past while far flakes drift slowly,
giving the scene volume without a single raster image.

---

## 02 · Four-second candle flicker with glow halo

Eleven window candles sit along the village roofline. Each runs a 4-second
`opacity` flicker keyframe with a staggered `animation-delay` ramped by index,
so no two candles sync up. Each candle is a tiny rounded bar with a layered
`box-shadow` — a tight 8 px warm-amber core plus a diffuse 18 px halo — that
reads as a real flame glow rather than a flat dot.

---

## 03 · Catenary string lights with organic twinkle

Eighteen bulbs sit on a **true catenary curve** (`y = baseY + amplitude · 4t(1−t)`)
so the wire reads as sagging under real weight, not as a flat line or a pure
parabola. Bulbs alternate warm amber and soft white. Each bulb's twinkle is a
2.8 s opacity keyframe with a delay ramped by index (`i · 0.37 s`), producing an
organic wave that never looks mechanical.

---

## 04 · Scrim-layered content holding AA contrast

Three stacked gradients form the scrim between the busy night scene and the
text:

1. A **top veil** that darkens the sky behind the season label and headline.
2. A **mid wash** that stays transparent through the middle so the scene shows
   through, then darkens toward the bottom.
3. A **bottom fade** that blends into the silhouette ground.

Together they hold the headline, lede, and event-card text above **AA contrast**
(WCAG 1.4.3) without painting a flat dark rectangle over the artwork.

---

## 05 · Theme cross-fade across the entire band

Every colour lives in a CSS custom property, and every colour-bearing property
carries a **400 ms transition** (`color`, `background-color`, `border-color`,
`fill`, `stroke`, `box-shadow`). Flipping light ↔ dark via the masthead toggle
cross-fades the whole band — sky, silhouettes, candles, cards, and the polish
section below — instead of snapping. The transition list is shared via the
`--transition-color` token so a single edit changes every surface.

---

## Snowfall performance note

The band renders **40 particles total** (24 back + 16 front). Each flake is a
single `<span>` animated by a CSS keyframe on `transform: translate3d()` and
`opacity` only — the two properties the compositor can cheaply promote to its
own layer. No `requestAnimationFrame` loop, no per-frame layout, no JavaScript
in the hot path. `will-change: transform, opacity` hints the compositor to keep
the layers ready. On `prefers-reduced-motion: reduce` every flake's animation is
stripped and the particles become static, low-opacity dots — the scene keeps its
texture without any motion.
