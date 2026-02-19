import { useState } from "react";

// ─────────────────────────────────────────────────────────────
// ROLE CARD — Animated border, glow pulse, depth activation
// ─────────────────────────────────────────────────────────────

export function RoleCard({ role, isSelected, onSelect, t, animDelay = 0, ready = true }) {
  const [hovered, setHovered] = useState(false);

  const active = isSelected || hovered;

  return (
    <button
      type="button"
      onClick={() => onSelect(role.value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-pressed={isSelected}
      aria-label={`Select role: ${role.label}`}
      className="rg-focus-ring"
      style={{
        position:        "relative",
        display:         "flex",
        flexDirection:   "column",
        alignItems:      "flex-start",
        gap:             10,
        padding:         "18px 16px",
        borderRadius:    12,
        border:          `1.5px solid ${
          isSelected
            ? t.gold
            : hovered
            ? t.gold + "55"
            : t.border
        }`,
        background:      isSelected
          ? t.goldDim
          : hovered
          ? "rgba(255,255,255,0.04)"
          : "rgba(255,255,255,0.02)",
        cursor:          "pointer",
        textAlign:       "left",
        width:           "100%",
        overflow:        "hidden",
        transition:      `
          border-color 0.25s var(--rg-ease-luxury),
          background   0.25s var(--rg-ease-luxury),
          transform    0.2s  var(--rg-ease-luxury),
          box-shadow   0.25s var(--rg-ease-luxury)
        `,
        transform:       isSelected
          ? "translateZ(4px) scale(1.01)"
          : hovered
          ? "translateZ(2px) scale(1.005)"
          : "translateZ(0) scale(1)",
        boxShadow:       isSelected
          ? `0 0 0 1px ${t.gold}44, 0 8px 32px ${t.gold}22, inset 0 1px 0 rgba(201,168,76,0.15)`
          : hovered
          ? `0 4px 20px rgba(0,0,0,0.18)`
          : "none",
        animation:       isSelected ? "rg-roleGlow 2.5s ease-in-out infinite" : "none",
        opacity:         ready ? 1 : 0,
        // Custom fade-in handled by parent container
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize:  22,
          lineHeight:1,
          filter:    isSelected ? "none" : "grayscale(0.4) opacity(0.7)",
          transition:"filter 0.25s var(--rg-ease-luxury)",
        }}
      >
        {role.icon}
      </div>

      {/* Label */}
      <div>
        <div
          style={{
            fontSize:      13,
            fontWeight:    500,
            color:         isSelected ? t.gold : hovered ? t.textPrimary : t.textSecondary,
            fontFamily:    "'DM Sans',sans-serif",
            letterSpacing: "0.02em",
            marginBottom:  3,
            transition:    "color 0.25s var(--rg-ease-luxury)",
          }}
        >
          {role.label}
        </div>
        <div
          style={{
            fontSize:  10.5,
            color:     isSelected ? t.gold + "99" : t.textMuted,
            fontFamily:"'DM Sans',sans-serif",
            lineHeight:1.4,
            transition:"color 0.25s var(--rg-ease-luxury)",
          }}
        >
          {role.description}
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div
          style={{
            position:     "absolute",
            top:          10,
            right:        12,
            width:        18,
            height:       18,
            borderRadius: "50%",
            background:   `linear-gradient(135deg,${t.gold},${t.goldLight})`,
            display:      "flex",
            alignItems:   "center",
            justifyContent:"center",
            animation:    "rg-fadeIn 0.25s var(--rg-ease-luxury)",
            boxShadow:    `0 0 10px ${t.gold}66`,
          }}
        >
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path
              d="M1 3.5L3.2 5.8L8 1"
              stroke="#07070c"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="20"
              style={{ animation:"rg-checkDraw 0.28s var(--rg-ease-luxury) both" }}
            />
          </svg>
        </div>
      )}

      {/* Depth shimmer on hover */}
      {active && (
        <div
          aria-hidden="true"
          style={{
            position:   "absolute",
            inset:      0,
            background: `linear-gradient(135deg,${t.gold}08 0%,transparent 60%)`,
            pointerEvents:"none",
            borderRadius:12,
          }}
        />
      )}
    </button>
  );
}
