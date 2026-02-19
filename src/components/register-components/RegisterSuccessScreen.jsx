import { useMemo } from "react";
import { Link } from "react-router-dom";

// ─────────────────────────────────────────────────────────────
// REGISTER SUCCESS SCREEN — Glow ripple + account activated
// ─────────────────────────────────────────────────────────────

function generateRipples() {
  return [0,1,2].map((i) => ({
    id: i,
    delay: i * 0.42,
    dur:   1.6 + i * 0.3,
  }));
}

function generateParticles() {
  return Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360;
    const dist  = 50 + Math.random() * 100;
    const rad   = (angle * Math.PI) / 180;
    return {
      id:    i,
      cx:    `${Math.cos(rad) * dist}px`,
      cy:    `${Math.sin(rad) * dist}px`,
      cr:    `${Math.random() * 680 - 340}deg`,
      color: i % 3 === 0 ? "#c9a84c" : i % 3 === 1 ? "rgba(255,255,255,0.5)" : "#e8c97a",
      size:  Math.random() * 5 + 2,
      round: Math.random() > 0.4,
      dur:   0.6 + Math.random() * 0.5,
      delay: Math.random() * 0.3,
    };
  });
}

export function RegisterSuccessScreen({ t, data }) {
  const ripples   = useMemo(() => generateRipples(), []);
  const particles = useMemo(() => generateParticles(), []);

  const displayName = data?.displayName || data?.fullName?.split(" ")[0] || "Member";

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Account creation successful"
      style={{
        textAlign:  "center",
        position:   "relative",
        display:    "flex",
        flexDirection:"column",
        alignItems: "center",
        padding:    "32px 0 24px",
        animation:  "rg-cardEntry 0.9s 0.1s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      {/* Confetti burst */}
      <div
        aria-hidden="true"
        style={{
          position:    "absolute",
          top:         "18%",
          left:        "50%",
          transform:   "translateX(-50%)",
          pointerEvents:"none",
          zIndex:      10,
        }}
      >
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position:     "absolute",
              width:        p.size,
              height:       p.size,
              borderRadius: p.round ? "50%" : "2px",
              background:   p.color,
              "--cx":       p.cx,
              "--cy":       p.cy,
              "--cr":       p.cr,
              animation:    `au-confetti ${p.dur}s ${p.delay}s cubic-bezier(0,0,0.2,1) forwards`,
              willChange:   "transform,opacity",
            }}
          />
        ))}
      </div>

      {/* Success mark */}
      <div
        style={{
          position:     "relative",
          width:        88,
          height:       88,
          marginBottom: 28,
        }}
      >
        {/* Ripple rings */}
        {ripples.map((r) => (
          <div
            key={r.id}
            aria-hidden="true"
            style={{
              position:    "absolute",
              inset:       0,
              borderRadius:"50%",
              border:      `1.5px solid ${t.gold}`,
              animation:   `rg-successRipple ${r.dur}s ${r.delay}s ease-out infinite`,
              willChange:  "transform,opacity",
            }}
          />
        ))}

        {/* Check circle */}
        <div
          style={{
            width:         88,
            height:        88,
            borderRadius:  "50%",
            background:    t.goldDim,
            border:        `1.5px solid ${t.gold}66`,
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            boxShadow:     `0 0 48px ${t.gold}33, inset 0 1px 0 rgba(255,255,255,0.18)`,
            animation:     "rg-successBounce 0.8s var(--rg-ease-spring) both",
            position:      "relative",
            zIndex:        1,
          }}
        >
          <svg width="34" height="28" viewBox="0 0 34 28" fill="none" aria-hidden="true">
            <path
              d="M2 14L12 24L32 2"
              stroke={t.gold}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80"
              style={{ animation:"rg-successCheck 0.65s 0.35s var(--rg-ease-luxury) both" }}
            />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h2
        className="rg-font-display"
        style={{
          fontSize:      32,
          fontWeight:    400,
          color:         t.textPrimary,
          letterSpacing: "-0.01em",
          lineHeight:    1.15,
          marginBottom:  8,
          opacity:       0,
          animation:     "rg-fadeUp 0.6s 0.6s var(--rg-ease-luxury) forwards",
        }}
      >
        Welcome,{" "}
        <em style={{ fontStyle:"italic", color:t.gold }}>{displayName}</em>
      </h2>

      <p
        style={{
          fontSize:   13.5,
          color:      t.textSecondary,
          lineHeight: 1.6,
          marginBottom:28,
          maxWidth:   280,
          fontFamily: "'DM Sans',sans-serif",
          opacity:    0,
          animation:  "rg-fadeUp 0.6s 0.75s var(--rg-ease-luxury) forwards",
        }}
      >
        Your Aurum account has been activated.
        <br />
        A system tier has been assigned to your profile.
      </p>

      {/* Status dots */}
      <div
        style={{
          display:    "flex",
          gap:        7,
          marginBottom:28,
          opacity:    0,
          animation:  "rg-fadeIn 0.5s 0.9s forwards",
        }}
        aria-hidden="true"
      >
        {[0,1,2].map((i) => (
          <div
            key={i}
            style={{
              width:        6,
              height:       6,
              borderRadius: "50%",
              background:   t.gold,
              animation:    `rg-pulseDot 1.2s ${i * 0.22}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Monospace system line */}
      <div
        className="rg-font-mono"
        style={{
          fontSize:      9,
          letterSpacing: "0.22em",
          color:         t.textMuted,
          textTransform: "uppercase",
          marginBottom:  28,
          opacity:       0,
          animation:     "rg-fadeIn 0.5s 1.0s forwards",
        }}
      >
        Account Status: Active · Protocol: Secure
      </div>

      {/* CTA */}
      <Link
        to="/"
        style={{
          display:        "inline-flex",
          alignItems:     "center",
          gap:            8,
          padding:        "14px 28px",
          borderRadius:   10,
          background:     `linear-gradient(125deg,${t.gold},${t.goldLight})`,
          color:          "#07070c",
          fontSize:       13,
          fontWeight:     500,
          letterSpacing:  "0.1em",
          textTransform:  "uppercase",
          textDecoration: "none",
          fontFamily:     "'DM Sans',sans-serif",
          boxShadow:      t.shadowBtn,
          transition:     "all 0.3s var(--rg-ease-luxury)",
          opacity:        0,
          animation:      "rg-fadeUp 0.6s 1.1s var(--rg-ease-luxury) forwards",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = t.shadowBtnHover;
          e.currentTarget.style.transform = "translateY(-2px) scale(1.015)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = t.shadowBtn;
          e.currentTarget.style.transform = "none";
        }}
      >
        Enter Aurum →
      </Link>
    </div>
  );
}
