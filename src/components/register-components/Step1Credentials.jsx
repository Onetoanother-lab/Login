import { useState, useCallback } from "react";
import { RegisterInputField } from "./RegisterInputField";
import { RegisterButton }     from "./RegisterButton";

// ─────────────────────────────────────────────────────────────
// STEP 1 — ACCOUNT CREDENTIALS
// Fields: Email, Password, Confirm Password
// ─────────────────────────────────────────────────────────────

function validateEmail(v) {
  if (!v) return "Email address is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
  return "";
}

function validatePassword(v) {
  if (!v) return "Password is required";
  if (v.length < 8) return "Minimum 8 characters required";
  if (!/[A-Z]/.test(v)) return "Include at least one uppercase letter";
  if (!/[0-9]/.test(v)) return "Include at least one number";
  return "";
}

function getPasswordStrength(v) {
  if (!v) return 0;
  let score = 0;
  if (v.length >= 8)  score++;
  if (v.length >= 12) score++;
  if (/[A-Z]/.test(v)) score++;
  if (/[0-9]/.test(v)) score++;
  if (/[^A-Za-z0-9]/.test(v)) score++;
  return score; // 0–5
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong", "Excellent"];
const STRENGTH_COLORS = ["", "#e07070", "#e0a040", "#a0c040", "#60cc80", "#40d8a0"];

export function Step1Credentials({ t, data, onUpdate, onNext, ready }) {
  const [touched, setTouched] = useState({ email:false, password:false, confirm:false });
  const [errors,  setErrors]  = useState({});

  const validate = useCallback(() => {
    const e = {};
    e.email    = validateEmail(data.email);
    e.password = validatePassword(data.password);
    if (!data.confirm)           e.confirm = "Please confirm your password";
    else if (data.confirm !== data.password) e.confirm = "Passwords do not match";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }, [data]);

  const handleNext = () => {
    setTouched({ email:true, password:true, confirm:true });
    if (validate()) onNext();
  };

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    if (field === "email")    setErrors((e) => ({ ...e, email: validateEmail(data.email) }));
    if (field === "password") setErrors((e) => ({ ...e, password: validatePassword(data.password) }));
    if (field === "confirm")  setErrors((e) => ({
      ...e,
      confirm: !data.confirm ? "Please confirm your password"
        : data.confirm !== data.password ? "Passwords do not match" : "",
    }));
  };

  const pwdStrength = getPasswordStrength(data.password);

  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        gap:           0,
        height:        "100%",
        paddingTop:    8,
      }}
    >
      {/* Step header */}
      <StepHeader
        t={t} ready={ready}
        eyebrow="Account Setup"
        title="Create Your Credentials"
        subtitle="Your gateway to the Aurum ecosystem"
      />

      <div style={{ flex:1 }}>
        <RegisterInputField
          id="reg-email"
          label="Email Address"
          type="email"
          value={data.email}
          onChange={(e) => { onUpdate({ email: e.target.value }); setErrors((err) => ({ ...err, email:"" })); }}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          hasError={touched.email && !!errors.email}
          t={t}
          autoComplete="email"
          animDelay={100}
          ready={ready}
        />

        <RegisterInputField
          id="reg-password"
          label="Password"
          type="password"
          value={data.password}
          onChange={(e) => { onUpdate({ password: e.target.value }); setErrors((err) => ({ ...err, password:"" })); }}
          onBlur={() => handleBlur("password")}
          error={errors.password}
          hasError={touched.password && !!errors.password}
          t={t}
          autoComplete="new-password"
          animDelay={180}
          ready={ready}
        />

        {/* Password strength bar */}
        {data.password && (
          <div
            style={{
              marginTop:    -8,
              marginBottom: 16,
              opacity:       0,
              animation:     "rg-fadeUp 0.4s 0s var(--rg-ease-luxury) forwards",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 3,
                marginBottom: 4,
              }}
            >
              {[1,2,3,4,5].map((s) => (
                <div
                  key={s}
                  style={{
                    flex:        1,
                    height:      2.5,
                    borderRadius:2,
                    background:  pwdStrength >= s
                      ? STRENGTH_COLORS[pwdStrength]
                      : "rgba(255,255,255,0.08)",
                    transition:  "background 0.3s var(--rg-ease-luxury)",
                    boxShadow:   pwdStrength >= s
                      ? `0 0 6px ${STRENGTH_COLORS[pwdStrength]}88`
                      : "none",
                  }}
                />
              ))}
            </div>
            <span
              style={{
                fontSize:  10,
                color:     STRENGTH_COLORS[pwdStrength] || t.textMuted,
                fontFamily:"'DM Mono',monospace",
                letterSpacing:"0.1em",
                transition:"color 0.3s var(--rg-ease-luxury)",
              }}
            >
              {STRENGTH_LABELS[pwdStrength]}
            </span>
          </div>
        )}

        <RegisterInputField
          id="reg-confirm"
          label="Confirm Password"
          type="password"
          value={data.confirm}
          onChange={(e) => { onUpdate({ confirm: e.target.value }); setErrors((err) => ({ ...err, confirm:"" })); }}
          onBlur={() => handleBlur("confirm")}
          error={errors.confirm}
          hasError={touched.confirm && !!errors.confirm}
          t={t}
          autoComplete="new-password"
          animDelay={260}
          ready={ready}
        />
      </div>

      <RegisterButton
        t={t}
        onClick={handleNext}
        label="Continue to Identity"
        animDelay={340}
        ready={ready}
        style={{ marginTop: 8 }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared step header component
// ─────────────────────────────────────────────────────────────
export function StepHeader({ t, eyebrow, title, subtitle, ready }) {
  return (
    <div
      style={{
        marginBottom: 28,
        opacity:      ready ? 1 : 0,
        transform:    ready ? "translateY(0)" : "translateY(10px)",
        transition:   "opacity 0.5s var(--rg-ease-luxury), transform 0.5s var(--rg-ease-luxury)",
      }}
    >
      {/* Eyebrow */}
      <div
        style={{
          display:       "flex",
          alignItems:    "center",
          gap:           10,
          marginBottom:  12,
        }}
      >
        <div
          style={{
            height:     1,
            flex:       0,
            width:      28,
            background: t.gold,
            opacity:    0.6,
          }}
        />
        <span
          className="rg-font-mono"
          style={{
            fontSize:      9.5,
            letterSpacing: "0.22em",
            color:         t.gold,
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </span>
      </div>

      {/* Title */}
      <h2
        className="rg-font-display"
        style={{
          fontSize:      28,
          fontWeight:    400,
          color:         t.textPrimary,
          letterSpacing: "-0.01em",
          lineHeight:    1.15,
          marginBottom:  6,
          fontStyle:     "normal",
        }}
      >
        {title.split(" ").map((word, i, arr) =>
          i === arr.length - 1
            ? <em key={i} style={{ fontStyle:"italic", color:t.gold }}>{" "}{word}</em>
            : <span key={i}>{i > 0 ? " " : ""}{word}</span>
        )}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p
          style={{
            fontSize:  12.5,
            color:     t.textMuted,
            fontFamily:"'DM Sans',sans-serif",
            lineHeight:1.5,
            letterSpacing:"0.02em",
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
