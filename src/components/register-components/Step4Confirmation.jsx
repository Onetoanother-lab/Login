import { useState } from "react";
import { RegisterButton, RegisterBackButton } from "./RegisterButton";
import { StepHeader } from "./Step1Credentials";
import { ShieldCheck } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// STEP 4 — CONFIRMATION
// Summary review + terms checkbox + final submit
// ─────────────────────────────────────────────────────────────

const ROLE_LABELS = {
  owner:      "Establishment Owner",
  manager:    "General Manager",
  sommelier:  "Sommelier / Curator",
  chef:       "Executive Chef",
};

function ConfirmRow({ label, value, t, delay }) {
  return (
    <div
      style={{
        display:         "flex",
        justifyContent:  "space-between",
        alignItems:      "flex-start",
        padding:         "11px 0",
        borderBottom:    `1px solid ${t.border}`,
        opacity:         0,
        animation:       `rg-confirmRow 0.4s ${delay}ms var(--rg-ease-luxury) forwards`,
        gap:             12,
      }}
    >
      <span
        className="rg-font-mono"
        style={{
          fontSize:      9.5,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         t.textMuted,
          whiteSpace:    "nowrap",
          flexShrink:    0,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize:   13,
          color:      t.textPrimary,
          fontFamily: "'DM Sans',sans-serif",
          textAlign:  "right",
          wordBreak:  "break-all",
        }}
      >
        {value || <span style={{ color:t.textMuted, fontStyle:"italic" }}>—</span>}
      </span>
    </div>
  );
}

function maskEmail(email) {
  if (!email) return "";
  const [user, domain] = email.split("@");
  const masked = user.slice(0,2) + "•".repeat(Math.max(0, user.length - 2));
  return `${masked}@${domain}`;
}

export function Step4Confirmation({ t, data, onBack, onSubmit, isLoading, ready }) {
  const [agreed,      setAgreed]      = useState(false);
  const [agreeTouched,setAgreeTouched]= useState(false);
  const [termsHovered,setTermsHovered]= useState(false);

  const activeNotifs = Object.entries(data.notifications || {})
    .filter(([, v]) => v)
    .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1))
    .join(", ");

  const handleSubmit = () => {
    setAgreeTouched(true);
    if (!agreed) return;
    onSubmit();
  };

  return (
    <div
      style={{
        display:       "flex",
        flexDirection: "column",
        height:        "100%",
        paddingTop:    8,
      }}
    >
      <StepHeader
        t={t} ready={ready}
        eyebrow="Final Review"
        title="Confirm Your Details"
        subtitle="Review before completing account creation"
      />

      {/* Summary card */}
      <div
        style={{
          flex:        1,
          overflowY:   "auto",
          paddingBottom:8,
        }}
      >
        <div
          style={{
            borderRadius: 12,
            border:       `1.5px solid ${t.border}`,
            background:   "rgba(255,255,255,0.02)",
            padding:      "4px 18px",
            marginBottom: 20,
            opacity:      ready ? 1 : 0,
            transition:   "opacity 0.5s 0.1s var(--rg-ease-luxury)",
          }}
        >
          <ConfirmRow label="Email"        value={maskEmail(data.email)}           t={t} delay={80}  />
          <ConfirmRow label="Full Name"    value={data.fullName}                   t={t} delay={140} />
          {data.displayName && (
            <ConfirmRow label="Display Name" value={data.displayName}             t={t} delay={180} />
          )}
          <ConfirmRow label="Role"         value={ROLE_LABELS[data.role]}          t={t} delay={220} />
          <ConfirmRow label="Region"       value={data.region}                    t={t} delay={280} />
          <ConfirmRow label="Language"     value={data.language?.toUpperCase()}   t={t} delay={340} />
          <ConfirmRow
            label="Notifications"
            value={activeNotifs || "None selected"}
            t={t} delay={400}
          />
        </div>

        {/* Terms checkbox */}
        <div
          style={{
            opacity:   ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(8px)",
            transition:"opacity 0.5s 0.46s var(--rg-ease-luxury), transform 0.5s 0.46s var(--rg-ease-luxury)",
            marginBottom: 16,
          }}
        >
          <label
            style={{
              display:     "flex",
              alignItems:  "flex-start",
              gap:         11,
              cursor:      "pointer",
              userSelect:  "none",
            }}
          >
            {/* Checkbox */}
            <div style={{ position:"relative", width:18, height:18, flexShrink:0, marginTop:1 }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => { setAgreed(e.target.checked); setAgreeTouched(true); }}
                className="rg-focus-ring"
                style={{ position:"absolute", opacity:0, width:18, height:18, cursor:"pointer", margin:0 }}
              />
              <div
                aria-hidden="true"
                style={{
                  width:        18,
                  height:       18,
                  border:       `1.5px solid ${
                    agreeTouched && !agreed ? t.borderError
                    : agreed ? t.gold : t.border}`,
                  borderRadius: 4,
                  background:   agreed ? t.gold : "transparent",
                  display:      "flex",
                  alignItems:   "center",
                  justifyContent:"center",
                  transition:   "all 0.18s var(--rg-ease-luxury)",
                  boxShadow:    agreed ? `0 0 8px ${t.gold}55` : "none",
                }}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path
                      d="M1 4L3.8 7L9 1"
                      stroke="#07070c"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="20"
                      style={{ animation:"rg-checkDraw 0.25s var(--rg-ease-luxury) both" }}
                    />
                  </svg>
                )}
              </div>
            </div>

            <span
              style={{
                fontSize:  12.5,
                color:     t.textSecondary,
                fontFamily:"'DM Sans',sans-serif",
                lineHeight:1.5,
              }}
            >
              I agree to the{" "}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                onMouseEnter={() => setTermsHovered(true)}
                onMouseLeave={() => setTermsHovered(false)}
                style={{
                  background:  "none",
                  border:      "none",
                  cursor:      "pointer",
                  color:       termsHovered ? t.goldLight : t.gold,
                  fontFamily:  "'DM Sans',sans-serif",
                  fontSize:    12.5,
                  padding:     0,
                  borderBottom:`1px solid ${termsHovered ? t.goldLight + "60" : t.gold + "44"}`,
                  transition:  "all 0.18s var(--rg-ease-luxury)",
                }}
              >
                Terms of Service
              </button>
              {" "}and{" "}
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                style={{
                  background:  "none",
                  border:      "none",
                  cursor:      "pointer",
                  color:       t.gold,
                  fontFamily:  "'DM Sans',sans-serif",
                  fontSize:    12.5,
                  padding:     0,
                  borderBottom:`1px solid ${t.gold + "44"}`,
                }}
              >
                Privacy Policy
              </button>
              {" "}of Aurum
            </span>
          </label>

          {agreeTouched && !agreed && (
            <div
              style={{
                fontSize:  11,
                color:     t.error,
                marginTop: 6,
                fontFamily:"'DM Sans',sans-serif",
                paddingLeft: 29,
                animation: "rg-fadeIn 0.2s var(--rg-ease-out)",
              }}
            >
              You must agree to the terms to proceed
            </div>
          )}
        </div>

        {/* Security note */}
        <div
          style={{
            display:     "flex",
            alignItems:  "center",
            gap:         8,
            padding:     "10px 14px",
            borderRadius:8,
            background:  "rgba(255,255,255,0.02)",
            border:      `1px solid ${t.border}`,
            opacity:     ready ? 0.6 : 0,
            transition:  "opacity 0.5s 0.54s var(--rg-ease-luxury)",
          }}
        >
          <ShieldCheck size={13} color={t.gold} strokeWidth={1.5} />
          <span
            className="rg-font-mono"
            style={{ fontSize:9.5, letterSpacing:"0.14em", color:t.textMuted, textTransform:"uppercase" }}
          >
            256-bit encrypted · Aurum Security Protocol
          </span>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:12 }}>
        <RegisterButton
          t={t}
          onClick={handleSubmit}
          label="Create My Account"
          loadingLabel="Creating Account"
          isLoading={isLoading}
          disabled={isLoading}
          animDelay={560}
          ready={ready}
        />
        <RegisterBackButton
          t={t}
          onClick={onBack}
          label="Edit Details"
          animDelay={620}
          ready={ready}
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
