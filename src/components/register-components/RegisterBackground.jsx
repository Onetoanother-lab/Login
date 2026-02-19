import { useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// REGISTER BACKGROUND — 3-layer ambient system
// Layer 1: Animated radial gradient orbs
// Layer 2: Slow floating particles
// Layer 3: Occasional light streaks
// ─────────────────────────────────────────────────────────────

function generateAmbientParticles(count = 18) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 1.5 + Math.random() * 2,
    delay: Math.random() * 12,
    dur: 10 + Math.random() * 14,
    drift: `${(Math.random() - 0.5) * 160}px`,
    opacity: 0.2 + Math.random() * 0.4,
    color: i % 4 === 0 ? "#c9a84c" : i % 4 === 1 ? "#e8c97a" : "rgba(255,255,255,0.6)" ,
  }));
}

function generateStreaks(count = 3) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: 15 + i * 28,
    delay: 4 + i * 7,
    dur: 2.8 + i * 0.4,
    opacity: 0.06 + i * 0.02,
  }));
}

export function RegisterBackground({ t }) {
  const particles = useMemo(() => generateAmbientParticles(18), []);
  const streaks   = useMemo(() => generateStreaks(3), []);

  return (
    <div
      aria-hidden="true"
      style={{
        position:    "fixed",
        inset:       0,
        zIndex:      0,
        pointerEvents: "none",
        overflow:    "hidden",
      }}
    >
      {/* ── Layer 1: Radial gradient orbs ── */}
      <div
        style={{
          position:   "absolute",
          top:        "-20%",
          right:      "-10%",
          width:      "70vw",
          height:     "70vw",
          maxWidth:   "900px",
          maxHeight:  "900px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center,
            ${t.orb1} 0%,
            rgba(80,40,200,0.08) 45%,
            transparent 70%)`,
          filter:     "blur(80px)",
          animation:  "rg-orb1Float 18s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      <div
        style={{
          position:   "absolute",
          bottom:     "-15%",
          left:       "-10%",
          width:      "60vw",
          height:     "60vw",
          maxWidth:   "800px",
          maxHeight:  "800px",
          borderRadius: "50%",
          background: `radial-gradient(ellipse at center,
            rgba(60,30,180,0.14) 0%,
            ${t.nebula1} 35%,
            transparent 65%)`,
          filter:     "blur(70px)",
          animation:  "rg-orb2Float 22s ease-in-out infinite",
          willChange: "transform",
        }}
      />
      {/* Center soft glow */}
      <div
        style={{
          position:   "absolute",
          left:       "50%",
          top:        "50%",
          width:      "500px",
          height:     "500px",
          borderRadius: "50%",
          transform:  "translate(-50%,-50%)",
          background: `radial-gradient(ellipse at center,
            ${t.goldDim} 0%,
            transparent 65%)`,
          filter:     "blur(50px)",
          opacity:    0.6,
        }}
      />

      {/* ── Layer 2: Floating ambient particles ── */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position:    "absolute",
            bottom:      "-10px",
            left:        `${p.x}%`,
            width:       p.size,
            height:      p.size,
            borderRadius:"50%",
            background:  p.color,
            boxShadow:   `0 0 ${p.size * 4}px ${p.color}`,
            opacity:     0,
            "--drift":   p.drift,
            animation:   `rg-ambientParticle ${p.dur}s ${p.delay}s linear infinite`,
            willChange:  "transform,opacity",
          }}
        />
      ))}

      {/* ── Layer 3: Occasional light streaks ── */}
      {streaks.map((s) => (
        <div
          key={s.id}
          style={{
            position:   "absolute",
            top:        `${s.top}%`,
            left:       0,
            right:      0,
            height:     1,
            background: `linear-gradient(to right,transparent,${t.gold}44,${t.goldLight}66,${t.gold}44,transparent)`,
            opacity:    0,
            animation:  `rg-lightStreak ${s.dur}s ${s.delay}s linear infinite`,
            willChange: "transform,opacity",
          }}
        />
      ))}

      {/* Subtle noise vignette */}
      <div
        style={{
          position:   "absolute",
          inset:      0,
          background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(6,6,13,0.55) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
