import { useMemo } from "react";

// ─────────────────────────────────────────────────────────────
// SUCCESS SCREEN — Confetti, check draw, redirect pulse
// ─────────────────────────────────────────────────────────────

export const SuccessScreen = ({ t, onReset }) => {
  const confetti = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * 360 + (Math.random() - 0.5) * 18;
      const dist = 60 + Math.random() * 130;
      const rad = (angle * Math.PI) / 180;

      return {
        id: i,
        cx: `${Math.cos(rad) * dist}px`,
        cy: `${Math.sin(rad) * dist}px`,
        cr: `${Math.random() * 680 - 340}deg`,
        color:
          i % 3 === 0
            ? t.gold
            : i % 3 === 1
            ? "rgba(255,255,255,0.45)"
            : t.goldLight,
        size: Math.random() * 6 + 2,
        round: Math.random() > 0.38,
        dur: 0.55 + Math.random() * 0.65,
        delay: Math.random() * 0.35
      };
    });
  }, [t.gold, t.goldLight]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Login successful"
      style={{
        textAlign: "center",
        position: "relative",
        animation:
          "lp-cardIn 1.0s .06s cubic-bezier(0.16,1,0.3,1) both"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10
        }}
      >
        {confetti.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.round ? "50%" : 2,
              background: p.color,
              "--cx": p.cx,
              "--cy": p.cy,
              "--cr": p.cr,
              animation: `au-confetti ${p.dur}s ${p.delay}s var(--ease-out) forwards`,
              willChange: "transform, opacity",
              transform: "translateZ(0)"
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: t.successBg,
          border: `1.5px solid ${t.success}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: `0 0 48px ${t.success}22, inset 0 1px 0 rgba(255,255,255,0.25)`,
          animation: "au-checkBounce .75s var(--ease-spring-sm) both",
          position: "relative",
          zIndex: 1
        }}
      >
        <svg
          width="32"
          height="26"
          viewBox="0 0 32 26"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 13L11 22L30 2"
            stroke={t.success}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            style={{
              animation:
                "au-checkDraw .65s .3s var(--ease-luxury) both"
            }}
          />
        </svg>
      </div>

      <h3
        className="au-font-display"
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: t.textPrimary,
          marginBottom: 10,
          letterSpacing: "-0.01em"
        }}
      >
        Welcome to Aurum
      </h3>

      <p
        style={{
          fontSize: 14,
          color: t.textSecondary,
          lineHeight: 1.68,
          marginBottom: 28,
          fontFamily: "'DM Sans',sans-serif"
        }}
      >
        Your table is being prepared.
        <br />
        Redirecting you now.
      </p>

      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          marginBottom: 28
        }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: t.gold,
              animation: `au-pulseDot 1.2s ${i * 0.22}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <button
        onClick={onReset}
        className="au-focus-ring"
        style={{
          background: "none",
          border: `1px solid ${t.border}`,
          borderRadius: 10,
          padding: "11px 22px",
          color: t.textSecondary,
          fontSize: 12,
          letterSpacing: "0.1em",
          fontFamily: "'DM Sans',sans-serif",
          cursor: "pointer",
          transition:
            "all var(--motion-fast) var(--ease-luxury)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = t.gold + "60";
          e.currentTarget.style.color = t.gold;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = t.border;
          e.currentTarget.style.color = t.textSecondary;
          e.currentTarget.style.transform = "none";
        }}
      >
        ← Return to Login
      </button>
    </div>
  );
};
