import { useState, useId } from "react";
import { AlertCircle, Eye, EyeOff } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// REGISTER INPUT FIELD — Gold edge glow, elevation on focus,
// placeholder morph, error shake + controlled red accent
// ─────────────────────────────────────────────────────────────

export function RegisterInputField({
  id,
  label,
  type     = "text",
  value,
  onChange,
  onBlur,
  error,
  hasError,
  t,
  autoComplete,
  animDelay = 0,
  ready     = true,
  suffix,
  hint,
  maxLength,
}) {
  const [focused,  setFocused]  = useState(false);
  const [showPwd,  setShowPwd]  = useState(false);
  const uid = useId();
  const inputId  = id  || uid;
  const errorId  = `${inputId}-error`;
  const hintId   = `${inputId}-hint`;

  const inputType = type === "password" && showPwd ? "text" : type;
  const hasValue  = value && value.length > 0;

  const containerStyle = {
    position:  "relative",
    marginBottom: 16,
    opacity:   ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(10px)",
    transition: `opacity 0.5s ${animDelay}ms var(--rg-ease-luxury),
                 transform 0.5s ${animDelay}ms var(--rg-ease-luxury)`,
    animation: hasError ? "rg-inputError 0.35s var(--rg-ease-out)" : "none",
  };

  const labelStyle = {
    display:       "block",
    fontSize:      focused || hasValue ? 10 : 12,
    letterSpacing: focused || hasValue ? "0.14em" : "0.06em",
    color: hasError
      ? t.error
      : focused
      ? t.gold
      : t.textMuted,
    textTransform: "uppercase",
    fontFamily:    "'DM Mono',monospace",
    marginBottom:  focused || hasValue ? 5 : 0,
    position:      "absolute",
    top:           focused || hasValue ? -18 : "50%",
    left:          0,
    transform:     focused || hasValue ? "none" : "translateY(-50%)",
    pointerEvents: "none",
    transition:    `all 0.2s var(--rg-ease-luxury)`,
    whiteSpace:    "nowrap",
    fontWeight:    500,
  };

  const wrapStyle = {
    position:     "relative",
    borderRadius: 10,
    border:       `1.5px solid ${
      hasError
        ? t.borderError
        : focused
        ? t.borderFocus
        : t.border
    }`,
    background:   focused ? t.bgInputFocus : t.bgInput,
    transition:   `border-color 0.2s var(--rg-ease-luxury),
                   background   0.2s var(--rg-ease-luxury),
                   box-shadow   0.2s var(--rg-ease-luxury),
                   transform    0.15s var(--rg-ease-luxury)`,
    boxShadow: hasError
      ? `0 0 0 3px ${t.borderError}22`
      : focused
      ? `0 0 0 2.5px ${t.borderFocus}28, 0 6px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(201,168,76,0.06)`
      : "0 2px 8px rgba(0,0,0,0.1)",
    transform:    focused ? "translateY(-1px)" : "translateY(0)",
  };

  return (
    <div style={containerStyle}>
      <div style={{ position:"relative", paddingTop: 20 }}>
        <label
          htmlFor={inputId}
          style={labelStyle}
        >
          {label}
        </label>

        <div style={wrapStyle}>
          <input
            id={inputId}
            type={inputType}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              setFocused(false);
              onBlur && onBlur(e);
            }}
            autoComplete={autoComplete}
            maxLength={maxLength}
            aria-invalid={hasError}
            aria-describedby={[hasError && errorId, hint && hintId].filter(Boolean).join(" ") || undefined}
            className="rg-focus-ring"
            style={{
              width:         "100%",
              padding:       suffix ? "14px 44px 14px 16px" : "14px 16px",
              background:    "transparent",
              border:        "none",
              outline:       "none",
              color:         t.textPrimary,
              fontSize:      14,
              fontFamily:    "'DM Sans',sans-serif",
              caretColor:    t.gold,
              letterSpacing: "0.01em",
            }}
          />

          {/* Password toggle */}
          {type === "password" && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPwd((v) => !v)}
              aria-label={showPwd ? "Hide password" : "Show password"}
              style={{
                position:   "absolute",
                right:      12,
                top:        "50%",
                transform:  "translateY(-50%)",
                background: "none",
                border:     "none",
                cursor:     "pointer",
                color:      focused ? t.gold : t.textMuted,
                padding:    4,
                display:    "flex",
                alignItems: "center",
                transition: "color 0.18s var(--rg-ease-luxury)",
              }}
            >
              {showPwd
                ? <EyeOff size={15} strokeWidth={1.6} />
                : <Eye    size={15} strokeWidth={1.6} />}
            </button>
          )}

          {/* Custom suffix (non-password) */}
          {suffix && type !== "password" && (
            <div
              style={{
                position:   "absolute",
                right:      12,
                top:        "50%",
                transform:  "translateY(-50%)",
              }}
            >
              {suffix}
            </div>
          )}

          {/* Gold focus edge accent */}
          {focused && (
            <div
              aria-hidden="true"
              style={{
                position:     "absolute",
                bottom:       -1,
                left:         "10%",
                right:        "10%",
                height:       1.5,
                background:   `linear-gradient(to right,transparent,${t.gold},transparent)`,
                borderRadius: "0 0 8px 8px",
                animation:    "rg-goldGlow 2s ease-in-out infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Hint text */}
      {hint && !hasError && (
        <p
          id={hintId}
          style={{
            fontSize:  10.5,
            color:     t.textMuted,
            marginTop: 5,
            fontFamily:"'DM Sans',sans-serif",
            letterSpacing:"0.02em",
          }}
        >
          {hint}
        </p>
      )}

      {/* Error text */}
      {hasError && error && (
        <div
          id={errorId}
          role="alert"
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        5,
            marginTop:  5,
            color:      t.error,
            fontSize:   11,
            fontFamily: "'DM Sans',sans-serif",
            animation:  "rg-fadeIn 0.2s var(--rg-ease-out)",
          }}
        >
          <AlertCircle size={11} strokeWidth={2} />
          {error}
        </div>
      )}
    </div>
  );
}
