// ─────────────────────────────────────────────────────────────
// STATIC DATA CONSTANTS — v5 (10-second optimized)
// Used by: CinematicIntro, StarField, background layers, right panel
// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// STAR DATA — 120 stars, fully deterministic
// ─────────────────────────────────────────────────────────────

export const STARS = Array.from({ length: 120 }, (_, i) => {
  const s1 = (i * 2654435761) >>> 0;
  const s2 = (i * 1013904223) >>> 0;
  const s3 = (i * 1664525)    >>> 0;
  const s4 = (i * 6364136223) >>> 0;
  return {
    x:    (s1 % 10000) / 100,
    y:    (s2 % 10000) / 100,
    size: 0.06 + (s3 % 100) / 450,
    base: 0.08 + (s1 % 100) / 240,
    dur:  2.2  + (s2 % 100) / 24,
    del:  (s3 % 100) / 18,
    big:  (s4 % 10) === 0,
  };
});

export const CONSTELLATION_LINES = STARS.slice(0, 90).reduce((acc, s, i) => {
  STARS.slice(0, 90).forEach((t2, j) => {
    if (j <= i) return;
    const d = Math.hypot(s.x - t2.x, s.y - t2.y);
    if (d < 11 && acc.length < 55) acc.push([i, j, Math.max(0, (11 - d) / 11 * 0.09)]);
  });
  return acc;
}, []);


// ─────────────────────────────────────────────────────────────
// CINEMATIC INTRO — v5 data (10 seconds, deterministic)
// Phase 1: 0–2s   | Phase 2: 2–4s | Phase 3: 4–6s
// Phase 4: 6–8s   | Phase 5: 8–10s (exit)
// ─────────────────────────────────────────────────────────────

export const lcg = (seed, n) => {
  let s = seed >>> 0;
  return Array.from({ length: n }, () => { s = (1664525 * s + 1013904223) >>> 0; return s / 0xFFFFFFFF; });
};

export const EMBERS = Array.from({ length: 90 }, (_, i) => {
  const [rx, ry, rw, ro, rd, rdl, rwx, rwx2] = lcg(i * 7919 + 3571, 8);
  return {
    left:   `${(rx * 94 + 3).toFixed(1)}%`,
    bottom: `${(ry * 22).toFixed(1)}%`,
    sz:    (0.9 + rw * 2.2).toFixed(1),
    op:    (0.2 + ro * 0.55).toFixed(2),
    ry:    `-${(90 + rd * 280).toFixed(0)}px`,
    dl:    (rdl * 6.0).toFixed(2),
    dr:    (3.5 + rw * 5.0).toFixed(2),
    wx:    `${((rwx - 0.5) * 28).toFixed(1)}px`,
    wx2:   `${((rwx2 - 0.5) * 20).toFixed(1)}px`,
    gold:  i % 7 === 0,
  };
});

export const DEBRIS = Array.from({ length: 50 }, (_, i) => {
  const a = (i / 50) * 2 * Math.PI;
  const [rd, ro, rsz, rdl, rdr] = lcg(i * 2654435761 + 1013904223, 5);
  const dist = 90 + rd * 200;
  return {
    tx: `${Math.round(Math.cos(a) * dist)}px`,
    ty: `${Math.round(Math.sin(a) * dist)}px`,
    op: (0.2 + ro * 0.5).toFixed(2),
    sz: (1.0 + rsz * 2.5).toFixed(1),
    dl: (rdl * 1.5).toFixed(2),
    dr: (3.0 + rdr * 3.5).toFixed(2),
    gold: i % 4 !== 0,
  };
});

export const RAYS = Array.from({ length: 18 }, (_, i) => ({
  deg: `${(i / 18) * 360}deg`,
  op:  (0.035 + (i % 4) * 0.018).toFixed(3),
  dl:  `${(2.0 + i * 0.07).toFixed(2)}s`,
  h:   `${52 + (i % 3) * 8}vh`,
}));

export const M_RINGS = [
  { r:340, sd:"",     rop:.15, sw:.65, dl:"0.20s", dur:"2.0s" },
  { r:290, sd:"8 14", rop:.11, sw:.38, dl:"0.38s", dur:"1.8s" },
  { r:235, sd:"",     rop:.20, sw:.60, dl:"0.55s", dur:"1.6s" },
  { r:178, sd:"4 10", rop:.14, sw:.40, dl:"0.72s", dur:"1.4s" },
  { r:128, sd:"",     rop:.26, sw:.55, dl:"0.88s", dur:"1.1s" },
  { r: 80, sd:"2 6",  rop:.20, sw:.40, dl:"1.00s", dur:"0.9s" },
].map(r => ({ ...r, perim: Math.round(2 * Math.PI * r.r) }));

export const M_TICKS = Array.from({ length: 128 }, (_, i) => {
  const a = (i / 128) * 2 * Math.PI, R = 340;
  const isMaj = i % 16 === 0, isMed = i % 8 === 0, isMin = i % 4 === 0;
  const len = isMaj ? 22 : isMed ? 13 : isMin ? 7 : 4;
  return {
    x1: 400 + Math.cos(a) * R, y1: 400 + Math.sin(a) * R,
    x2: 400 + Math.cos(a) * (R - len), y2: 400 + Math.sin(a) * (R - len),
    dl: `${(0.20 + i * 0.004).toFixed(3)}s`,
    op: isMaj ? .32 : isMed ? .20 : isMin ? .12 : .07,
    sw: isMaj ? 1.4 : isMed ? .75 : isMin ? .45 : .28,
  };
});

export const M_SPOKES = Array.from({ length: 32 }, (_, i) => {
  const a = (i / 32) * 2 * Math.PI, major = i % 4 === 0;
  return {
    x1: 400 + Math.cos(a) * 48,  y1: 400 + Math.sin(a) * 48,
    x2: 400 + Math.cos(a) * 340, y2: 400 + Math.sin(a) * 340,
    op: (major ? .28 : .12).toFixed(2), sw: major ? .55 : .28,
    dl: `${(0.9 + i * 0.030).toFixed(3)}s`,
  };
});

export const M_DIAMONDS = [0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
  const a = deg * Math.PI / 180;
  const R = deg % 90 === 0 ? 340 : deg % 60 === 0 ? 290 : 235;
  const sz = deg % 90 === 0 ? 6 : deg % 60 === 0 ? 4 : 2.5;
  return { cx: 400 + Math.cos(a) * R, cy: 400 + Math.sin(a) * R, sz, deg, dl: `${(1.1 + i * 0.06).toFixed(2)}s` };
});

export const HALOS = [
  { delay:"1.4s", dur:"3.0s", color:"rgba(201,168,76,.22)" },
  { delay:"2.2s", dur:"3.0s", color:"rgba(201,168,76,.14)" },
  { delay:"3.2s", dur:"3.0s", color:"rgba(201,168,76,.08)" },
];

// ── OPTIMIZED: Letters appear at 1.8s (Phase 2 starts at 2s)
// Stagger 0.10s between each letter for crisp reveal
export const LETTERS  = ["A","U","R","U","M"].map((ch, i) => ({ ch, dl: `${(1.80 + i * 0.10).toFixed(2)}s` }));

export const STATS    = [{ num:"18+", label:"Years" }, { num:"3\u2605", label:"Michelin" }, { num:"40+", label:"Venues" }];

export const ACCOLADES = [
  { icon:"\u2605", label:"James Beard Foundation",        sub:"Outstanding Restaurant \u00b7 2019 & 2022" },
  { icon:"\u25c6", label:"S.Pellegrino World\u2019s 50 Best", sub:"Ranked #12 Globally" },
  { icon:"\u25c9", label:"Wine Spectator Grand Award",     sub:"14 Consecutive Years" },
];

// Timeline removed from 10s intro (was at 10.8s — unreachable)
export const TIMELINE = [
  { year:"2014", event:"Founded" }, { year:"2016", event:"1st Star" },
  { year:"2018", event:"Top 50" }, { year:"2020", event:"3 Stars" }, { year:"2024", event:"40 Venues" },
];

// ─────────────────────────────────────────────────────────────
// CINEMATIC INTRO COMPONENT — v5 (10 seconds / 5 phases)
// Phase 1 (0–2s)    Atmosphere    particles, parallax, logo emerging
// Phase 2 (2–4s)    Brand Reveal  logo sharpens, typography stagger, sweep
// Phase 3 (4–6s)    Prestige      animated counters, accent lines, flares
// Phase 4 (6–8s)    Elevation     crescendo, accolades, philosophy quote
// Phase 5 (8–10s)   Transition    dissolve, darken, flash, exit
// ─────────────────────────────────────────────────────────────

export const lcgN = (seed, n, lo=0, hi=1) => {
  let s = seed >>> 0;
  return Array.from({length:n}, () => { s = (1664525 * s + 1013904223) >>> 0; return lo + (s / 0xFFFFFFFF) * (hi - lo); });
};

export const FG_PARTICLES = Array.from({length:50}, (_,i) => {
  const [rx,ry,rsz,rop,rdl,rdr,rwx,rwx2,rry] = lcgN(i*9311+4127, 9);
  return {
    left: `${(rx * 92 + 4).toFixed(1)}%`,
    bottom: `${(ry * 35).toFixed(1)}%`,
    sz: (1.4 + rsz * 2.8).toFixed(1),
    op: (0.35 + rop * 0.6).toFixed(2),
    ry: `-${(60 + rry * 200).toFixed(0)}px`,
    dl: (rdl * 5.5).toFixed(2),
    dr: (2.8 + rdr * 4.2).toFixed(2),
    wx: `${((rwx - 0.5) * 22).toFixed(1)}px`,
    wx2: `${((rwx2 - 0.5) * 16).toFixed(1)}px`,
    gold: i % 5 === 0,
  };
});

export const BG_PARTICLES = Array.from({length:70}, (_,i) => {
  const [rx,ry,rsz,rop,rdl,rdr,rwx,rwx2,rry] = lcgN(i*3571+1193, 9);
  return {
    left: `${(rx * 96 + 2).toFixed(1)}%`,
    bottom: `${(ry * 55).toFixed(1)}%`,
    sz: (0.5 + rsz * 1.4).toFixed(1),
    op: (0.08 + rop * 0.22).toFixed(2),
    ry: `-${(80 + rry * 260).toFixed(0)}px`,
    dl: (rdl * 8.0).toFixed(2),
    dr: (5.0 + rdr * 7.0).toFixed(2),
    wx: `${((rwx - 0.5) * 36).toFixed(1)}px`,
    wx2: `${((rwx2 - 0.5) * 28).toFixed(1)}px`,
  };
});

// ── Micro-flare positions — timed for Phase 3 (fires at 4s)
export const FLARES = [
  {x:"22%",y:"38%",dl:"4.3s",sz:60,dur:.55},
  {x:"78%",y:"55%",dl:"4.8s",sz:40,dur:.45},
  {x:"50%",y:"28%",dl:"5.2s",sz:80,dur:.60},
  {x:"34%",y:"72%",dl:"5.7s",sz:35,dur:.40},
  {x:"64%",y:"18%",dl:"6.0s",sz:50,dur:.50},
];

export const BOKEH = Array.from({ length: 10 }, (_, i) => {
  const s1 = (i * 1664525 + 1013904223) >>> 0;
  const s2 = (i * 2654435761)           >>> 0;
  const s3 = (i * 1812433253)           >>> 0;
  return {
    x:    (s1 % 10000) / 100,
    y:    (s2 % 10000) / 100,
    size: 90 + (s3 % 180),
    dur:  26 + (s1 % 28),
    del:  (s2 % 16),
    anim: ["rp-bokeh1","rp-bokeh2","rp-bokeh3","rp-bokeh4"][i % 4],
    layer: i % 3,
  };
});

export const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const s1 = (i * 1013904223) >>> 0;
  const s2 = (i * 6364136223) >>> 0;
  const s3 = (i * 1664525)    >>> 0;
  const dx = ((s1 % 300) - 150) / 10;
  const dy = -35 - (s2 % 45);
  return {
    x:   (s1 % 10000) / 100,
    y:   (s2 % 10000) / 100,
    size: 0.7 + (s3 % 80) / 65,
    dur:  5 + (s1 % 55) / 10,
    del:  (s2 % 80) / 10,
    op:   0.12 + (s3 % 80) / 320,
    dx,
    dy,
  };
});

export const GEO_ELEMENTS = [
  { type:"diamond", x:8,  y:14, size:32, dur:18, del:0,  anim:"rp-geoFloat1" },
  { type:"diamond", x:88, y:22, size:20, dur:24, del:5,  anim:"rp-geoFloat2" },
  { type:"cross",   x:14, y:68, size:14, dur:20, del:8,  anim:"rp-geoFloat1" },
  { type:"diamond", x:82, y:75, size:26, dur:30, del:3,  anim:"rp-geoFloat2" },
  { type:"cross",   x:50, y:8,  size:10, dur:22, del:12, anim:"rp-geoFloat1" },
  { type:"diamond", x:92, y:50, size:16, dur:28, del:7,  anim:"rp-geoFloat2" },
  { type:"cross",   x:6,  y:40, size:12, dur:19, del:15, anim:"rp-geoFloat1" },
];

export const DATA_STREAMS = Array.from({ length: 6 }, (_, i) => {
  const s = (i * 1664525 + 22695477) >>> 0;
  return {
    x:   10 + (s % 80),
    dur: 6 + (i * 2.4),
    del: i * 1.8,
    len: 60 + (s % 80),
  };
});

export const LP_DUST = Array.from({ length: 48 }, (_, i) => {
  const [rx, ry, rw, ro, rd, rdl, rvx, rvy, rvx2, rvy2] = lcg(i * 8191 + 4099, 10);
  return {
    left:   `${(rx * 92 + 4).toFixed(1)}%`,
    bottom: `${(ry * 50 + 5).toFixed(1)}%`,
    sz:  (0.8 + rw * 1.6).toFixed(1),
    op:  (0.1 + ro * 0.25).toFixed(2),
    vy:  `-${(55 + rd * 120).toFixed(0)}px`,
    vy2: `-${(90 + rd * 190).toFixed(0)}px`,
    vx:  `${((rvx - 0.5) * 28).toFixed(1)}px`,
    vx2: `${((rvx2 - 0.5) * 20).toFixed(1)}px`,
    dl:  (rdl * 12.0).toFixed(2),
    dr:  (5.0 + rw * 8.0).toFixed(2),
    gold: i % 6 === 0,
  };
});

export const LP_STREAKS = Array.from({ length: 16 }, (_, i) => {
  const [rx, rop, rdl, rdr] = lcg(i * 6271 + 2053, 4);
  return {
    left: `${(rx * 110 - 10).toFixed(1)}%`,
    op:   (0.012 + rop * 0.018).toFixed(3),
    dl:   (rdl * 20).toFixed(2),
    dr:   (14 + rdr * 16).toFixed(2),
    deg:  `${(36 + (i % 5) * 4).toFixed(1)}deg`,
    w:    `${(100 + rop * 200).toFixed(0)}px`,
  };
});
