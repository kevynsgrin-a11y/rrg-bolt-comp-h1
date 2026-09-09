import { useEffect, useMemo, useState } from 'react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Status = 'confirmed' | 'expected';

interface HolidayEvent {
  id: string;
  name: string;
  dateLabel: string;
  venue: string;
  timeLabel: string;
  status: Status;
  blurb: string;
}

/* ------------------------------------------------------------------ */
/*  Hooks                                                              */
/* ------------------------------------------------------------------ */

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = window.localStorage.getItem('rrg-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    window.localStorage.setItem('rrg-theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  return { theme, toggleTheme };
}

function useReducedMotion() {
  const [reduced, setReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

/* ------------------------------------------------------------------ */
/*  Icons (inline SVG, no library)                                     */
/* ------------------------------------------------------------------ */

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4.5" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <line x1="12" y1="2" x2="12" y2="4.5" />
        <line x1="12" y1="19.5" x2="12" y2="22" />
        <line x1="2" y1="12" x2="4.5" y2="12" />
        <line x1="19.5" y1="12" x2="22" y2="12" />
        <line x1="4.6" y1="4.6" x2="6.3" y2="6.3" />
        <line x1="17.7" y1="17.7" x2="19.4" y2="19.4" />
        <line x1="4.6" y1="19.4" x2="6.3" y2="17.7" />
        <line x1="17.7" y1="6.3" x2="19.4" y2="4.6" />
      </g>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h13M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <line x1="3" y1="9.5" x2="21" y2="9.5" stroke="currentColor" strokeWidth="1.8" />
      <line x1="8" y1="3" x2="8" y2="6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="3" x2="16" y2="6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21s7-6.4 7-11a7 7 0 1 0-14 0c0 4.6 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7.5V12l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <line x1="14" y1="6" x2="14" y2="18" stroke="currentColor" strokeWidth="1.8" strokeDasharray="2 2" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const HOLIDAY_EVENTS: HolidayEvent[] = [
  {
    id: 'lantern-procession',
    name: 'Lantern Procession & Tree Lighting',
    dateLabel: 'Nov 13',
    venue: 'Town Square',
    timeLabel: '6:30 PM',
    status: 'confirmed',
    blurb:
      'Hand-lit lanterns wind through the square, ending at a 40-foot tree lit all at once to open the season.',
  },
  {
    id: 'night-market',
    name: 'Festival of Lights Night Market',
    dateLabel: 'Nov 20–22',
    venue: 'Boardwalk Promenade',
    timeLabel: '5:00 PM – 11:00 PM',
    status: 'confirmed',
    blurb:
      'Three nights of food stalls, live carolers, and string-lit barges drifting along the promenade.',
  },
  {
    id: 'polar-finale',
    name: 'Polar Express Pyrotechnics Finale',
    dateLabel: 'Dec 23',
    venue: 'Lakeside Amphitheater',
    timeLabel: '9:15 PM',
    status: 'expected',
    blurb:
      'A synchronized fireworks and projection show over the lake, closing the holiday run before Christmas Eve.',
  },
];

/* ------------------------------------------------------------------ */
/*  Snowfall particles                                                 */
/* ------------------------------------------------------------------ */

interface FlakeStyle extends React.CSSProperties {
  '--x'?: string;
  '--size'?: string;
  '--delay'?: string;
  '--drift'?: string;
  '--duration'?: string;
  '--fall'?: string;
}

function buildFlakes(count: number, layer: 'back' | 'front') {
  const flakes: { id: string; style: FlakeStyle }[] = [];
  for (let i = 0; i < count; i += 1) {
    const x = Math.round(Math.random() * 100);
    const size =
      layer === 'back'
        ? 2 + Math.round(Math.random() * 2) // 2–4px
        : 4 + Math.round(Math.random() * 3); // 4–7px
    const delay = (Math.random() * 12).toFixed(2);
    const drift = (Math.random() * 60 - 30).toFixed(0);
    const duration = (layer === 'back' ? 14 : 9) + Math.random() * 6;
    const fall = layer === 'back' ? '640px' : '680px';
    flakes.push({
      id: `${layer}-${i}`,
      style: {
        left: `${x}%`,
        '--size': `${size}px`,
        '--delay': `${delay}s`,
        '--drift': `${drift}px`,
        '--duration': `${duration.toFixed(2)}s`,
        '--fall': fall,
      },
    });
  }
  return flakes;
}

/* ------------------------------------------------------------------ */
/*  Scene sub-components                                               */
/* ------------------------------------------------------------------ */

function Star() {
  return (
    <svg
      className="scene-star"
      width="34"
      height="34"
      viewBox="0 0 34 34"
      aria-hidden="true"
    >
      <path
        d="M17 2.5l4.2 10.6 11.3.9-8.6 7.4 2.6 11.1L17 27.1 6.5 32.5l2.6-11.1L.5 14l11.3-.9L17 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FerrisWheel() {
  // A silhouette Ferris wheel: outer ring, 16 spokes, 8 gondola buckets.
  const cx = 120;
  const cy = 120;
  const r = 92;
  const spokes = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return {
      x2: cx + Math.cos(angle) * r,
      y2: cy + Math.sin(angle) * r,
    };
  });
  const gondolas = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2 + Math.PI / 16;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  return (
    <svg
      className="scene-ferris"
      width="240"
      height="260"
      viewBox="0 0 240 260"
      aria-hidden="true"
    >
      {/* support legs */}
      <path
        d="M120 120 L70 250 M120 120 L170 250 M70 250 H170"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      {/* outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="currentColor" strokeWidth="2" opacity="0.55" />
      {/* hub */}
      <circle cx={cx} cy={cy} r="9" fill="currentColor" />
      {/* spokes */}
      {spokes.map((s, i) => (
        <line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={s.x2}
          y2={s.y2}
          stroke="currentColor"
          strokeWidth="2.2"
          opacity="0.85"
        />
      ))}
      {/* gondolas */}
      {gondolas.map((g, i) => (
        <rect
          key={`gondola-${i}`}
          x={g.x - 7}
          y={g.y - 4}
          width="14"
          height="10"
          rx="2.5"
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

function VillageSkyline() {
  // A silhouette village skyline: rooftops, chimneys, a church spire.
  return (
    <svg
      className="scene-skyline"
      viewBox="0 0 1200 220"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 220 V150 H70 V120 L110 120 L110 150 H170 V130 H210 V110 L250 80 L290 110 V150 H340 V120 H390 L390 95 L430 95 V150 H480 V135 H530 V110 L570 70 L612 112 V150 H670 V125 H720 V150 H780 V100 L820 100 V75 L860 55 L900 80 V150 H950 V120 H1000 V150 H1060 V130 H1110 V150 H1200 V220 Z"
        fill="currentColor"
      />
      {/* church spire */}
      <path
        d="M570 70 L570 30 L612 0 L654 30 L654 70 Z"
        fill="currentColor"
      />
      <line
        x1="612"
        y1="0"
        x2="612"
        y2="-14"
        stroke="currentColor"
        strokeWidth="3"
      />
      {/* chimneys */}
      <rect x="200" y="95" width="8" height="20" fill="currentColor" />
      <rect x="820" y="60" width="8" height="20" fill="currentColor" />
    </svg>
  );
}

function StringLights() {
  // String lights following a catenary sag along the top of the scene.
  // 18 bulb groups alternating warm amber and soft white.
  const bulbs = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17;
    // x spans 2% → 98%
    const x = 2 + t * 96;
    // catenary sag: y = baseY + amplitude * (4t(1-t))
    const y = 28 + 46 * (4 * t * (1 - t));
    const amber = i % 2 === 0;
    return { x, y, amber, i };
  });

  // build the wire path
  const wirePath = bulbs
    .map((b, idx) => `${idx === 0 ? 'M' : 'L'} ${b.x} ${b.y}`)
    .join(' ');

  return (
    <svg
      className="scene-string-lights"
      viewBox="0 0 100 90"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={wirePath}
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
        opacity="0.4"
      />
      {bulbs.map((b) => (
        <circle
          key={`bulb-${b.i}`}
          className={`string-bulb ${b.amber ? 'bulb-amber' : 'bulb-white'}`}
          cx={b.x}
          cy={b.y}
          r="1.5"
          style={{ animationDelay: `${(b.i * 0.37).toFixed(2)}s` }}
        />
      ))}
    </svg>
  );
}

function CandleRow() {
  // 11 window candles along the village roofline.
  const candles = Array.from({ length: 11 }, (_, i) => i);
  return (
    <div className="scene-candles" aria-hidden="true">
      {candles.map((i) => {
        const left = 6 + (i / 10) * 88;
        const delay = (i * 0.34).toFixed(2);
        return (
          <span
            key={`candle-${i}`}
            className="window-candle"
            style={{ left: `${left}%`, animationDelay: `${delay}s` }}
          />
        );
      })}
    </div>
  );
}

function SnowLayer({
  flakes,
  layer,
  reduced,
}: {
  flakes: { id: string; style: FlakeStyle }[];
  layer: 'back' | 'front';
  reduced: boolean;
}) {
  return (
    <div className={`snow-layer snow-${layer}`} aria-hidden="true">
      {flakes.map((f) => (
        <span
          key={f.id}
          className={`flake ${reduced ? 'flake-static' : ''}`}
          style={f.style}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event card                                                         */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  reduced,
}: {
  event: HolidayEvent;
  reduced: boolean;
}) {
  const confirmed = event.status === 'confirmed';
  return (
    <article className="event-card">
      <div className="event-card-top">
        <span
          className={`status-pill ${confirmed ? 'pill-confirmed' : 'pill-expected'}`}
        >
          <span className="status-dot" />
          {confirmed ? 'CONFIRMED' : 'EXPECTED'}
        </span>
        <span className="event-date">{event.dateLabel}</span>
      </div>

      <h3 className="event-name">{event.name}</h3>
      <p className="event-blurb">{event.blurb}</p>

      <dl className="event-meta">
        <div className="meta-row">
          <MapPinIcon />
          <dd>{event.venue}</dd>
        </div>
        <div className="meta-row">
          <ClockIcon />
          <dd>{event.timeLabel}</dd>
        </div>
      </dl>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Polish moves                                                       */
/* ------------------------------------------------------------------ */

const POLISH_MOVES: { title: string; body: string }[] = [
  {
    title: 'Two-depth parallax snowfall',
    body: 'A back layer of 24 small, slow flakes and a front layer of 16 larger, faster flakes. Both animate transform and opacity only, so the compositor keeps them off the main thread.',
  },
  {
    title: 'Four-second candle flicker',
    body: 'Eleven window candles each run a 4s opacity flicker with a radial-gradient halo, staggered by index so no two candles sync up.',
  },
  {
    title: 'Catenary string lights',
    body: 'Bulbs sit on a true catenary curve (y = a·4t(1−t)) with an organic twinkle delay ramped by index, so the wire reads as sagging under real weight.',
  },
  {
    title: 'Scrim-layered AA contrast',
    body: 'Three stacked gradients — top veil, mid wash, bottom fade — hold the headline and lede above AA contrast over the busiest parts of the night scene.',
  },
  {
    title: 'Theme cross-fade',
    body: 'Every colour lives in a CSS custom property with a 400ms transition, so flipping light↔dark cross-fades the whole band instead of snapping.',
  },
];

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const reduced = useReducedMotion();

  const backFlakes = useMemo(() => buildFlakes(24, 'back'), []);
  const frontFlakes = useMemo(() => buildFlakes(16, 'front'), []);

  return (
    <div className="app-root">
      {/* ---------- Masthead ---------- */}
      <header className="masthead">
        <a className="brand-mark" href="#top">
          <span className="brand-glyph" aria-hidden="true">◐</span>
          <span className="brand-text">Ride Ready Guide</span>
        </a>
        <button
          type="button"
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          <span className="theme-toggle-label">
            {theme === 'light' ? 'Dark' : 'Light'}
          </span>
        </button>
      </header>

      <main id="top">
        {/* ---------- Holiday band ---------- */}
        <section className="holiday-band" aria-labelledby="holiday-headline">
          {/* Night scene */}
          <div className="night-scene">
            <div className="scene-sky" />
            <Star />
            <SnowLayer flakes={backFlakes} layer="back" reduced={reduced} />
            <FerrisWheel />
            <VillageSkyline />
            <StringLights />
            <CandleRow />
            <SnowLayer flakes={frontFlakes} layer="front" reduced={reduced} />
            <div className="scene-ground" />
          </div>

          {/* Scrim for contrast */}
          <div className="scrim" />

          {/* Content */}
          <div className="band-content">
            <p className="season-label">
              <CalendarIcon />
              HOLIDAY SEASON · STARTS NOVEMBER 13
            </p>

            <h1 id="holiday-headline" className="headline">
              The park after dark, lit like a village fair.
            </h1>

            <p className="lede">
              Three nights of lantern processions, string-lit barges, and a
              fireworks finale over the lake — the full holiday run, mapped so
              you can plan the quietest paths through the crowds.
            </p>

            <div className="events-grid">
              {HOLIDAY_EVENTS.map((ev) => (
                <EventCard key={ev.id} event={ev} reduced={reduced} />
              ))}
            </div>

            <div className="cta-row">
              <a className="cta cta-primary" href="#dates">
                See all holiday dates
                <ArrowRightIcon />
              </a>
              <a className="cta cta-secondary" href="#planning">
                <TicketIcon />
                Planning guide &amp; crowd calendar
              </a>
            </div>
          </div>
        </section>

        {/* ---------- Polish moves ---------- */}
        <section className="polish-section" aria-labelledby="polish-heading">
          <div className="polish-inner">
            <h2 id="polish-heading" className="polish-heading">
              Polish moves
            </h2>
            <p className="polish-sub">
              Five techniques behind the band above.
            </p>
            <ol className="polish-grid">
              {POLISH_MOVES.map((m, i) => (
                <li key={m.title} className="polish-card">
                  <span className="polish-num">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="polish-title">{m.title}</h3>
                  <p className="polish-body">{m.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </main>
    </div>
  );
}
