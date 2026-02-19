import { useEffect, useRef, useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// CINEMATIC REGISTER INTRO — 6.8s sequence
// Phase 0→1s : Deep graphite + volumetric glow
// Phase 1→2s : Floating gold micro-particles
// Phase 2→3s : Dimensional grid forms
// Phase 3→4s : "Initialize Account Creation" text
// Phase 4→5s : Scanning light sweep
// Phase 5→6s : Depth blur transition begins
// Phase 6→6.8s: Step 1 emerging from depth
// ─────────────────────────────────────────────────────────────

const GOLD       = "#c9a84c";
const GOLD_LIGHT = "#e8c97a";
const TOTAL_MS   = 6800;

function generateParticles(count = 42) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: 10 + Math.random() * 80,
    size: 1.2 + Math.random() * 2.4,
    delay: 0.8 + Math.random() * 1.4,
    dur: 2.8 + Math.random() * 2.2,
    drift: (Math.random() - 0.5) * 120,
    rise: -(80 + Math.random() * 300),
    opacity: 0.3 + Math.random() * 0.6,
  }));
}

function generateGridLines() {
  const lines = [];
  // Horizontal lines
  for (let i = 0; i < 7; i++) {
    const y = 10 + i * 14;
    lines.push({ type: "h", y, delay: 1.8 + i * 0.08, dur: 1.2 });
  }
  // Vertical lines
  for (let i = 0; i < 9; i++) {
    const x = 5 + i * 12;
    lines.push({ type: "v", x, delay: 2.0 + i * 0.06, dur: 1.0 });
  }
  return lines;
}

export function RegisterCinematicIntro({ onComplete }) {
  const [phase,    setPhase]    = useState(0); // 0–6
  const [exiting,  setExiting]  = useState(false);
  const particles  = useMemo(() => generateParticles(42), []);
  const gridLines  = useMemo(() => generateGridLines(), []);
  const timerRef   = useRef(null);

  useEffect(() => {
    const phases = [
      { at: 0,    next: 1 },   // 0: bg glow
      { at: 900,  next: 2 },   // 1: particles
      { at: 1800, next: 3 },   // 2: grid
      { at: 2800, next: 4 },   // 3: init text
      { at: 3800, next: 5 },   // 4: scan line
      { at: 4900, next: 6 },   // 5: depth blur
      { at: 5800, next: 7 },   // 6: exit
    ];

    let idx = 0;
    const tick = () => {
      if (idx >= phases.length) return;
      const { at, next } = phases[idx];
      timerRef.current = setTimeout(() => {
        if (next === 7) {
          setExiting(true);
          setTimeout(() => onComplete(), 900);
        } else {
          setPhase(next);
        }
        idx++;
        tick();
      }, idx === 0 ? 0 : phases[idx].at - phases[idx - 1].at);
    };
    tick();

    // Simpler approach: just use absolute timers
    const timers = [
      setTimeout(() => setPhase(1), 900),
      setTimeout(() => setPhase(2), 1800),
      setTimeout(() => setPhase(3), 2800),
      setTimeout(() => setPhase(4), 3800),
      setTimeout(() => setPhase(5), 4900),
      setTimeout(() => setPhase(6), 5800),
      setTimeout(() => setExiting(true), 5900),
      setTimeout(() => onComplete(), 6800),
    ];

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      aria-label="System initializing"
      role="status"
      aria-live="polite"
      style={{
        position:        "fixed",
        inset:           0,
        zIndex:          9999,
        background:      "#06060d",
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        overflow:        "hidden",
        animation:       exiting ? "rg-introFadeOut 0.9s var(--rg-ease-out) forwards" : "none",
        transformOrigin: "center center",
      }}
    >
      {/* ── Layer 0: Volumetric deep glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:   "absolute",
          left:       "50%",
          top:        "50%",
          width:      "900px",
          height:     "900px",
          borderRadius: "50%",
          transform:  "translate(-50%,-50%)",
          background: `radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(201,168,76,0.18) 0%,
            rgba(201,168,76,0.06) 35%,
            rgba(40,30,120,0.12) 60%,
            transparent 75%)`,
          filter:     "blur(60px)",
          opacity:    phase >= 0 ? 1 : 0,
          transition: "opacity 1.2s var(--rg-ease-luxury)",
          animation:  "rg-bgPulse 8s ease-in-out infinite",
        }}
      />

      {/* Corner accent lines */}
      {phase >= 0 && [
        { top:28, left:28,  width:60, height:1  },
        { top:28, left:28,  width:1,  height:60 },
        { top:28, right:28, width:60, height:1  },
        { top:28, right:28, width:1,  height:60 },
        { bottom:28, left:28,  width:60, height:1 },
        { bottom:28, left:28,  width:1,  height:60 },
        { bottom:28, right:28, width:60, height:1 },
        { bottom:28, right:28, width:1,  height:60 },
      ].map((style, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:   "absolute",
            background: `rgba(201,168,76,${i < 2 ? 0.5 : 0.3})`,
            ...style,
            opacity:    0,
            animation:  `rg-fadeIn 0.6s ${0.1 + i * 0.05}s var(--rg-ease-luxury) forwards`,
          }}
        />
      ))}

      {/* ── Layer 1: Micro-particles ── */}
      {phase >= 1 && particles.map((p) => (
        <div
          key={p.id}
          aria-hidden="true"
          style={{
            position:     "absolute",
            bottom:       "15%",
            left:         `${p.x}%`,
            width:        p.size,
            height:       p.size,
            borderRadius: "50%",
            background:   p.id % 3 === 0 ? GOLD : p.id % 3 === 1 ? GOLD_LIGHT : "rgba(255,255,255,0.6)",
            boxShadow:    `0 0 ${p.size * 3}px ${GOLD}88`,
            "--px":       `${p.drift}px`,
            "--py":       `${p.rise}px`,
            animation:    `rg-particleFloat ${p.dur}s ${p.delay}s var(--rg-ease-out) forwards`,
            opacity:      0,
          }}
        />
      ))}

      {/* ── Layer 2: Dimensional grid ── */}
      {phase >= 2 && (
        <svg
          aria-hidden="true"
          style={{
            position:    "absolute",
            inset:       0,
            width:       "100%",
            height:      "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="rg-gridGlow">
              <feGaussianBlur stdDeviation="0.08" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {gridLines.map((l, i) =>
            l.type === "h" ? (
              <line
                key={i}
                x1="0" y1={l.y} x2="100" y2={l.y}
                stroke={GOLD}
                strokeWidth="0.04"
                strokeOpacity="0.28"
                filter="url(#rg-gridGlow)"
                style={{
                  strokeDasharray: 200,
                  animation: `rg-gridDraw ${l.dur}s ${l.delay}s var(--rg-ease-luxury) forwards`,
                  opacity: 0,
                }}
              />
            ) : (
              <line
                key={i}
                x1={l.x} y1="0" x2={l.x} y2="100"
                stroke={GOLD}
                strokeWidth="0.04"
                strokeOpacity="0.18"
                style={{
                  strokeDasharray: 200,
                  animation: `rg-gridDraw ${l.dur}s ${l.delay}s var(--rg-ease-luxury) forwards`,
                  opacity: 0,
                }}
              />
            )
          )}
          {/* Grid intersection dots */}
          {phase >= 2 && [
            [25,30],[50,30],[75,30],
            [25,50],[50,50],[75,50],
            [25,70],[50,70],[75,70],
          ].map(([x, y], i) => (
            <circle
              key={i} cx={x} cy={y} r="0.4"
              fill={GOLD} fillOpacity="0.5"
              style={{
                animation: `rg-fadeIn 0.4s ${2.4 + i * 0.06}s forwards`,
                opacity: 0,
              }}
            />
          ))}
        </svg>
      )}

      {/* ── Center content ── */}
      <div
        style={{
          position:   "relative",
          zIndex:     2,
          textAlign:  "center",
          display:    "flex",
          flexDirection: "column",
          alignItems: "center",
          gap:        20,
        }}
      >
        {/* System mark */}
        {phase >= 0 && (
          <div
            aria-hidden="true"
            style={{
              width:        56,
              height:       56,
              position:     "relative",
              opacity:      0,
              animation:    "rg-fadeIn 0.8s 0.2s var(--rg-ease-luxury) forwards",
            }}
          >
            <svg viewBox="0 0 56 56" fill="none" style={{ width:"100%", height:"100%" }}>
              <rect x="3" y="3" width="50" height="50" rx="8"
                stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5"
                strokeDasharray="200"
                style={{ animation:"rg-gridDraw 1.2s 0.3s var(--rg-ease-luxury) forwards", opacity:0 }}
              />
              <polygon points="28,10 46,38 10,38" fill="none"
                stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.7"
                strokeDasharray="120"
                style={{ animation:"rg-gridDraw 1.0s 0.6s var(--rg-ease-luxury) forwards", opacity:0 }}
              />
              <circle cx="28" cy="28" r="5" fill="none"
                stroke={GOLD} strokeWidth="1" strokeOpacity="0.9"
                strokeDasharray="40"
                style={{ animation:"rg-gridDraw 0.8s 0.9s var(--rg-ease-luxury) forwards", opacity:0 }}
              />
              <circle cx="28" cy="28" r="2" fill={GOLD} fillOpacity="0.9"
                style={{ animation:"rg-fadeIn 0.4s 1.2s forwards", opacity:0 }}
              />
            </svg>
          </div>
        )}

        {/* ── Phase 3: Initialize text ── */}
        {phase >= 3 && (
          <div style={{ position:"relative" }}>
            <div
              className="rg-font-mono"
              style={{
                fontSize:      11,
                letterSpacing: "0.28em",
                color:         GOLD,
                textTransform: "uppercase",
                opacity:       0,
                animation:     "rg-initText 0.8s 0s var(--rg-ease-luxury) forwards",
                marginBottom:  8,
              }}
            >
              Initialize Account Creation
            </div>
            <div
              className="rg-font-mono"
              style={{
                fontSize:      9,
                letterSpacing: "0.22em",
                color:         "rgba(201,168,76,0.55)",
                textTransform: "uppercase",
                opacity:       0,
                animation:     "rg-subText 0.6s 0.4s var(--rg-ease-luxury) forwards",
              }}
            >
              Aurum · Secure Onboarding Protocol
            </div>
          </div>
        )}

        {/* Loading dots */}
        {phase >= 3 && (
          <div
            style={{
              display:  "flex",
              gap:      7,
              opacity:  0,
              animation:"rg-fadeIn 0.5s 0.6s forwards",
            }}
          >
            {[0,1,2].map((i) => (
              <div
                key={i}
                style={{
                  width:        5,
                  height:       5,
                  borderRadius: "50%",
                  background:   GOLD,
                  animation:    `rg-introDotPulse 1.1s ${i * 0.22}s ease-in-out infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Layer 4: Scanning light sweep ── */}
      {phase >= 4 && (
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            left:       0,
            right:      0,
            height:     2,
            background: `linear-gradient(to right,transparent,${GOLD}99,${GOLD_LIGHT},${GOLD}99,transparent)`,
            boxShadow:  `0 0 20px 4px ${GOLD}44`,
            animation:  "rg-scanLine 1.0s 0s var(--rg-ease-out) forwards",
            top:        0,
          }}
        />
      )}

      {/* ── Phase 5: Depth blur vignette ── */}
      {phase >= 5 && (
        <div
          aria-hidden="true"
          style={{
            position:        "absolute",
            inset:           0,
            background:      "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(6,6,13,0.85) 100%)",
            opacity:         0,
            animation:       "rg-fadeIn 1.0s 0s var(--rg-ease-luxury) forwards",
            pointerEvents:   "none",
          }}
        />
      )}
    </div>
  );
}
