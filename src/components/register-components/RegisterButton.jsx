import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// REGISTER BUTTON — Primary CTA with depth press + loading morph
// ─────────────────────────────────────────────────────────────

export function RegisterButton({
  t,
  onClick,
  disabled  = false,
  isLoading = false,
  label     = "Continue",
  loadingLabel = "Processing",
  type      = "button",
  animDelay = 0,
  ready     = true,
  style: extraStyle,
}) {
  const [hovered,  setHovered]  = useState(false);
  const [pressing, setPressing] = useState(false);

  const G  = t.gold;
  const GL = t.goldLight;

  return (
    <div
      style={{
        opacity:   ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(8px)",
        transition:`opacity 0.5s ${animDelay}ms var(--rg-ease-luxury),
                   transform 0.5s ${animDelay}ms var(--rg-ease-luxury)`,
        ...extraStyle,
      }}
    >
      <button
        type={type}
        disabled={disabled || isLoading}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setPressing(false); }}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        className="rg-focus-ring"
        aria-busy={isLoading}
        style={{
          width:          "100%",
          padding:        "16px 28px",
          borderRadius:   12,
          border:         "none",
          cursor:         disabled ? "not-allowed" : "pointer",
          fontFamily:     "'DM Sans',sans-serif",
          fontSize:       13.5,
          fontWeight:     500,
          letterSpacing:  "0.1em",
          textTransform:  "uppercase",
          position:       "relative",
          overflow:       "hidden",

          // Gradient shifts on hover
          background:     disabled
            ? "rgba(255,255,255,0.06)"
            : hovered
            ? `linear-gradient(125deg, ${GL} 0%, ${G} 40%, #b8942d 100%)`
            : `linear-gradient(125deg, ${G} 0%, #b8942d 40%, ${GL} 100%)`,

          color:          disabled ? t.textMuted : "#07070c",

          boxShadow:      disabled
            ? "none"
            : hovered
            ? t.shadowBtnHover
            : t.shadowBtn,

          transform:      pressing
            ? "scale(0.97) translateY(1px)"
            : hovered
            ? "scale(1.015) translateY(-2px)"
            : "scale(1) translateY(0)",

          transition:     `
            background   0.3s var(--rg-ease-luxury),
            box-shadow   0.3s var(--rg-ease-luxury),
            transform    0.18s var(--rg-ease-luxury),
            color        0.3s var(--rg-ease-luxury),
            opacity      0.3s var(--rg-ease-luxury)
          `,
          opacity:        isLoading ? 0.85 : 1,

          // Continuous glow pulse when active
          animation:      !disabled && !isLoading && !hovered
            ? "rg-btnPulse 3s ease-in-out infinite"
            : "none",
        }}
      >
        {/* Shimmer overlay */}
        {!disabled && (
          <span
            aria-hidden="true"
            style={{
              position:   "absolute",
              inset:      0,
              background: "linear-gradient(to right,transparent 0%,rgba(255,255,255,0.28) 50%,transparent 100%)",
              transform:  "translateX(-100%) skewX(-18deg)",
              animation:  hovered ? "rg-btnShimmer 0.7s var(--rg-ease-out) forwards" : "none",
            }}
          />
        )}

        {/* Label content */}
        <span
          style={{
            position:   "relative",
            zIndex:     1,
            display:    "inline-flex",
            alignItems: "center",
            gap:        8,
          }}
        >
          {isLoading ? (
            <>
              <Loader2
                size={15}
                style={{ animation: "spin 1s linear infinite" }}
              />
              {loadingLabel}
            </>
          ) : (
            <>
              {label}
              <ArrowRight
                size={15}
                strokeWidth={2}
                style={{
                  transform:  hovered ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.2s var(--rg-ease-luxury)",
                }}
              />
            </>
          )}
        </span>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// GHOST BACK BUTTON — Minimal, secondary action
// ─────────────────────────────────────────────────────────────

export function RegisterBackButton({ t, onClick, label = "Back", animDelay = 0, ready = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        opacity:   ready ? 1 : 0,
        transform: ready ? "translateY(0)" : "translateY(8px)",
        transition:`opacity 0.5s ${animDelay}ms var(--rg-ease-luxury),
                   transform 0.5s ${animDelay}ms var(--rg-ease-luxury)`,
      }}
    >
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="rg-focus-ring"
        style={{
          background:    "none",
          border:        `1.5px solid ${hovered ? t.gold + "55" : t.border}`,
          borderRadius:  10,
          padding:       "12px 22px",
          color:         hovered ? t.gold : t.textSecondary,
          fontSize:      12,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily:    "'DM Sans',sans-serif",
          cursor:        "pointer",
          width:         "100%",
          transition:    "all 0.22s var(--rg-ease-luxury)",
          transform:     hovered ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        ← {label}
      </button>
    </div>
  );
}
