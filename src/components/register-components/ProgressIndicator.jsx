// ─────────────────────────────────────────────────────────────
// PROGRESS INDICATOR — Gold thin line + glowing step numbers
// ─────────────────────────────────────────────────────────────

const STEPS = [
  { label: "Credentials" },
  { label: "Identity"    },
  { label: "Preferences" },
  { label: "Confirm"     },
];

export function ProgressIndicator({ currentStep, t, ready }) {
  const progress = currentStep / (STEPS.length - 1);

  return (
    <div
      role="navigation"
      aria-label="Registration progress"
      style={{
        padding:    "0 0 28px",
        opacity:    ready ? 1 : 0,
        transform:  ready ? "translateY(0)" : "translateY(-8px)",
        transition: "opacity 0.6s 0.2s var(--rg-ease-luxury), transform 0.6s 0.2s var(--rg-ease-luxury)",
      }}
    >
      {/* Step numbers row */}
      <div
        style={{
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          marginBottom:    10,
          position:        "relative",
        }}
      >
        {STEPS.map((step, idx) => {
          const isDone    = idx < currentStep;
          const isCurrent = idx === currentStep;
          const isFuture  = idx > currentStep;

          return (
            <div
              key={idx}
              aria-current={isCurrent ? "step" : undefined}
              style={{
                display:    "flex",
                flexDirection: "column",
                alignItems: "center",
                gap:        6,
                flex:       idx < STEPS.length - 1 ? 1 : 0,
                position:   "relative",
                zIndex:     1,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width:        28,
                  height:       28,
                  borderRadius: "50%",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent: "center",
                  position:     "relative",
                  background:   isDone
                    ? `linear-gradient(135deg, ${t.gold}, ${t.goldLight})`
                    : isCurrent
                    ? "transparent"
                    : "rgba(255,255,255,0.04)",
                  border:       isCurrent
                    ? `1.5px solid ${t.gold}`
                    : isDone
                    ? "none"
                    : `1.5px solid rgba(255,255,255,0.12)`,
                  boxShadow:    isCurrent
                    ? `0 0 0 3px ${t.goldDim}, 0 0 16px ${t.gold}44`
                    : isDone
                    ? `0 0 12px ${t.gold}55`
                    : "none",
                  transition:   "all 0.5s var(--rg-ease-luxury)",
                  animation:    isCurrent ? "rg-stepPulse 2.5s ease-in-out infinite" : "none",
                }}
              >
                {isDone ? (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path
                      d="M1 5L4.5 8.5L11 1"
                      stroke={t.checkFill || "#07070c"}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="20"
                      style={{ animation: "rg-checkDraw 0.35s var(--rg-ease-luxury) both" }}
                    />
                  </svg>
                ) : (
                  <span
                    className="rg-font-mono"
                    style={{
                      fontSize:   10,
                      fontWeight: 600,
                      color:      isCurrent ? t.gold : "rgba(255,255,255,0.25)",
                      lineHeight: 1,
                      transition: "color 0.4s var(--rg-ease-luxury)",
                    }}
                  >
                    {idx + 1}
                  </span>
                )}

                {/* Complete pulse ring */}
                {isDone && (
                  <div
                    aria-hidden="true"
                    style={{
                      position:    "absolute",
                      inset:       -3,
                      borderRadius:"50%",
                      border:      `1px solid ${t.gold}`,
                      animation:   "rg-stepComplete 0.8s var(--rg-ease-out) both",
                    }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className="rg-font-mono"
                style={{
                  fontSize:      8.5,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color:         isCurrent
                    ? t.gold
                    : isDone
                    ? t.textSecondary
                    : "rgba(255,255,255,0.2)",
                  transition:    "color 0.4s var(--rg-ease-luxury)",
                  whiteSpace:    "nowrap",
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Gold progress track */}
      <div
        style={{
          position:    "relative",
          height:      1.5,
          borderRadius:1,
          background:  "rgba(255,255,255,0.06)",
          overflow:    "hidden",
          marginTop:   -48,
          marginLeft:  14,
          marginRight: 14,
        }}
      >
        {/* Filled bar */}
        <div
          style={{
            position:    "absolute",
            left:        0,
            top:         0,
            height:      "100%",
            width:       `${progress * 100}%`,
            background:  `linear-gradient(to right, ${t.gold}, ${t.goldLight})`,
            boxShadow:   `0 0 8px ${t.gold}88, 0 0 2px ${t.gold}`,
            borderRadius:1,
            transition:  `width ${620}ms cubic-bezier(0.22,1,0.36,1)`,
          }}
        />
        {/* Shimmer */}
        <div
          style={{
            position:   "absolute",
            inset:      0,
            background: "linear-gradient(to right,transparent 0%,rgba(255,255,255,0.35) 50%,transparent 100%)",
            animation:  "rg-btnShimmer 3s 1s linear infinite",
            willChange: "transform",
            opacity:    progress > 0 ? 1 : 0,
          }}
        />
      </div>
    </div>
  );
}
