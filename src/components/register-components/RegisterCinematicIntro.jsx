import { useEffect, useRef, useState, useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// CINEMATIC REGISTER INTRO — 6.8s sequence (FIXED v2)
//
// BUGS FIXED:
//   1. Double-timer: removed tick() function that was conflicting
//      with the explicit setTimeout array causing 2× speed.
//   2. SVG strokeDasharray: gridLines now use var(--grid-len)
//      matching the CSS keyframe rg-gridDraw expectation.
//   3. Phase 5→6 abrupt overlap: staggered exit sequence with
//      proper vignette/fade layering.
//
// Phase 0 (0s)    : Deep graphite + volumetric glow
// Phase 1 (0.9s)  : Floating gold micro-particles
// Phase 2 (1.8s)  : Dimensional grid forms
// Phase 3 (2.8s)  : "Initialize Account Creation" text
// Phase 4 (3.8s)  : Scanning light sweep
// Phase 5 (4.9s)  : Depth blur vignette begins
// Phase 6 (5.8s)  : Soft exit blur
// Complete (6.8s)  : onComplete fires
// ─────────────────────────────────────────────────────────────

const GOLD       = "#c9a84c";
const GOLD_LIGHT = "#e8c97a";

function generateParticles(count = 42) {
  // Deterministic seeded random for SSR consistency
  const lcg = (seed) => { let s = seed >>> 0; return () => { s = (1664525 * s + 1013904223) >>> 0; return s / 0xFFFFFFFF; }; };
  return Array.from({ length: count }, (_, i) => {
    const rand = lcg(i * 7919 + 3571);
    return {
      id:      i,
      x:       10 + rand() * 80,
      size:    1.2 + rand() * 2.4,
      delay:   0.8 + rand() * 1.4,
      dur:     2.8 + rand() * 2.2,
      drift:   (rand() - 0.5) * 120,
      rise:    -(80 + rand() * 300),
      opacity: 0.3 + rand() * 0.6,
    };
  });
}

function generateGridLines() {
  const lines = [];
  // Horizontal — 7 lines
  for (let i = 0; i < 7; i++) {
    lines.push({ type: "h", y: 10 + i * 14, delay: 1.8 + i * 0.08, dur: 1.2, len: 200 });
  }
  // Vertical — 9 lines
  for (let i = 0; i < 9; i++) {
    lines.push({ type: "v", x: 5 + i * 12, delay: 2.0 + i * 0.06, dur: 1.0, len: 200 });
  }
  return lines;
}

export function RegisterCinematicIntro({ onComplete }) {
  const [phase,   setPhase]   = useState(0);
  const [exiting, setExiting] = useState(false);
  const timersRef = useRef([]);

  const particles  = useMemo(() => generateParticles(42), []);
  const gridLines  = useMemo(() => generateGridLines(), []);

  useEffect(() => {
    // ── SINGLE authoritative timer array — no tick() duplication ──
    const schedule = [
      [  900, () => setPhase(1)                         ],
      [ 1800, () => setPhase(2)                         ],
      [ 2800, () => setPhase(3)                         ],
      [ 3800, () => setPhase(4)                         ],
      [ 4900, () => setPhase(5)                         ],
      // Phase 5→6 gap widened to 1200ms to eliminate vignette+fade overlap
      [ 6100, () => setPhase(6)                         ],
      [ 6200, () => setExiting(true)                    ],
      [ 6800, () => onComplete?.()                      ],
    ];

    timersRef.current = schedule.map(([ms, fn]) => setTimeout(fn, ms));

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        // Exit: fade + depth push — no harsh jump
        opacity:         exiting ? 0 : 1,
        transform:       exiting ? "scale(1.03) translateZ(-40px)" : "scale(1) translateZ(0)",
        filter:          exiting ? "blur(4px)" : "blur(0px)",
        transition:      exiting
          ? "opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1), filter 0.5s cubic-bezier(0.22,1,0.36,1)"
          : "none",
        willChange:      "opacity, transform, filter",
      }}
    >
      {/* ── Layer 0: Volumetric deep glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:     "absolute",
          left:         "50%",
          top:          "50%",
          width:        "900px",
          height:       "900px",
          borderRadius: "50%",
          transform:    "translate(-50%,-50%) translateZ(0)",
          background:   `radial-gradient(ellipse 55% 45% at 50% 50%,
            rgba(201,168,76,0.18) 0%,
            rgba(201,168,76,0.06) 35%,
            rgba(40,30,120,0.12) 60%,
            transparent 75%)`,
          filter:       "blur(60px)",
          animation:    "rg-bgPulse 8s ease-in-out infinite",
          willChange:   "transform, opacity",
        }}
      />

      {/* Corner accent lines — GPU-only (opacity transition) */}
      {[
        { top:28,     left:28,  width:60, height:1  },
        { top:28,     left:28,  width:1,  height:60 },
        { top:28,     right:28, width:60, height:1  },
        { top:28,     right:28, width:1,  height:60 },
        { bottom:28,  left:28,  width:60, height:1  },
        { bottom:28,  left:28,  width:1,  height:60 },
        { bottom:28,  right:28, width:60, height:1  },
        { bottom:28,  right:28, width:1,  height:60 },
      ].map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          style={{
            position:   "absolute",
            background: `rgba(201,168,76,${i < 4 ? 0.5 : 0.28})`,
            ...s,
            opacity:    0,
            animation:  `rg-fadeIn 0.6s ${0.1 + i * 0.05}s var(--rg-ease-luxury) forwards`,
            willChange: "opacity",
          }}
        />
      ))}

      {/* ── Layer 1: Micro-particles (phase 1+) ── */}
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
            // CSS custom properties for keyframe use
            "--px":       `${p.drift}px`,
            "--py":       `${p.rise}px`,
            animation:    `rg-particleFloat ${p.dur}s ${p.delay}s var(--rg-ease-out) forwards`,
            opacity:      0,
            willChange:   "transform, opacity",
          }}
        />
      ))}

      {/* ── Layer 2: Dimensional grid (phase 2+) ── */}
      {phase >= 2 && (
        <svg
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            width:         "100%",
            height:        "100%",
            pointerEvents: "none",
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="rg-gridGlow">
              <feGaussianBlur stdDeviation="0.06" result="blur"/>
              <feMerge>
                <feMergeNode in="blur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
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
                  // ── FIX: Use numeric strokeDasharray matching var(--grid-len,200)
                  strokeDasharray:  l.len,
                  strokeDashoffset: l.len,
                  animation: `rg-gridDraw ${l.dur}s ${l.delay}s var(--rg-ease-luxury) forwards`,
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
                  strokeDasharray:  l.len,
                  strokeDashoffset: l.len,
                  animation: `rg-gridDraw ${l.dur}s ${l.delay}s var(--rg-ease-luxury) forwards`,
                }}
              />
            )
          )}

          {/* Grid intersection dots */}
          {[
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
          position:      "relative",
          zIndex:        2,
          textAlign:     "center",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           20,
        }}
      >
        {/* System mark — always visible from phase 0 */}
        <div
          aria-hidden="true"
          style={{
            width:     56,
            height:    56,
            position:  "relative",
            opacity:   0,
            animation: "rg-fadeIn 0.8s 0.2s var(--rg-ease-luxury) forwards",
            willChange:"opacity",
          }}
        >
          <svg viewBox="0 0 56 56" fill="none" style={{ width:"100%", height:"100%" }}>
            <rect
              x="3" y="3" width="50" height="50" rx="8"
              stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.5"
              strokeDasharray="200" strokeDashoffset="200"
              style={{ animation:"rg-gridDraw 1.2s 0.3s var(--rg-ease-luxury) forwards" }}
            />
            <polygon
              points="28,10 46,38 10,38" fill="none"
              stroke={GOLD} strokeWidth="0.9" strokeOpacity="0.7"
              strokeDasharray="120" strokeDashoffset="120"
              style={{ animation:"rg-gridDraw 1.0s 0.6s var(--rg-ease-luxury) forwards" }}
            />
            <circle
              cx="28" cy="28" r="5" fill="none"
              stroke={GOLD} strokeWidth="1" strokeOpacity="0.9"
              strokeDasharray="40" strokeDashoffset="40"
              style={{ animation:"rg-gridDraw 0.8s 0.9s var(--rg-ease-luxury) forwards" }}
            />
            <circle
              cx="28" cy="28" r="2" fill={GOLD} fillOpacity="0.9"
              style={{ animation:"rg-fadeIn 0.4s 1.2s forwards", opacity: 0 }}
            />
          </svg>
        </div>

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
              display:   "flex",
              gap:       7,
              opacity:   0,
              animation: "rg-fadeIn 0.5s 0.6s forwards",
            }}
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width:        5,
                  height:       5,
                  borderRadius: "50%",
                  background:   GOLD,
                  animation:    `rg-introDotPulse 1.1s ${i * 0.22}s ease-in-out infinite`,
                  willChange:   "transform, opacity",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Layer 4: Scanning light sweep (phase 4+) ── */}
      {phase >= 4 && (
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            left:       0,
            right:      0,
            height:     2,
            top:        0,
            background: `linear-gradient(to right,transparent,${GOLD}99,${GOLD_LIGHT},${GOLD}99,transparent)`,
            boxShadow:  `0 0 20px 4px ${GOLD}44`,
            animation:  "rg-scanLine 1.2s 0s cubic-bezier(0.22,1,0.36,1) forwards",
            willChange: "transform",
          }}
        />
      )}

      {/* ── Phase 5: Depth blur vignette — wider gap before exit ── */}
      {phase >= 5 && (
        <div
          aria-hidden="true"
          style={{
            position:      "absolute",
            inset:         0,
            background:    "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, rgba(6,6,13,0.85) 100%)",
            opacity:       0,
            // Slower fade so it doesn't double-darken with the exit transition
            animation:     "rg-fadeIn 1.2s 0s var(--rg-ease-luxury) forwards",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}
