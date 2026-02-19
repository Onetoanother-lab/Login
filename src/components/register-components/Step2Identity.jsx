import { useState, useCallback } from "react";
import { RegisterInputField }   from "./RegisterInputField";
import { RegisterButton, RegisterBackButton } from "./RegisterButton";
import { RoleCard }             from "./RoleCard";
import { StepHeader }           from "./Step1Credentials";

// ─────────────────────────────────────────────────────────────
// STEP 2 — IDENTITY & ROLE
// Fields: Full Name, Display Name, Role Selection
// ─────────────────────────────────────────────────────────────

const ROLES = [
  {
    value:       "owner",
    label:       "Establishment Owner",
    description: "Manage venues, menus, and operations",
    icon:        "🏛️",
  },
  {
    value:       "manager",
    label:       "General Manager",
    description: "Oversee teams, reservations, and analytics",
    icon:        "⚡",
  },
  {
    value:       "sommelier",
    label:       "Sommelier / Curator",
    description: "Wine programs, cellar management, pairings",
    icon:        "🍷",
  },
  {
    value:       "chef",
    label:       "Executive Chef",
    description: "Kitchen leadership, menu design, suppliers",
    icon:        "👨‍🍳",
  },
];

export function Step2Identity({ t, data, onUpdate, onNext, onBack, ready }) {
  const [touched, setTouched] = useState({ fullName:false, displayName:false, role:false });
  const [errors,  setErrors]  = useState({});

  const validate = useCallback(() => {
    const e = {};
    if (!data.fullName?.trim()) e.fullName = "Full name is required";
    if (!data.role)             e.role     = "Please select your role";
    setErrors(e);
    return !Object.values(e).some(Boolean);
  }, [data]);

  const handleNext = () => {
    setTouched({ fullName:true, displayName:true, role:true });
    if (validate()) onNext();
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
        eyebrow="Your Identity"
        title="Who Are You?"
        subtitle="Let us personalize your Aurum experience"
      />

      <div style={{ flex:1, overflowY:"auto" }}>
        {/* Full name */}
        <RegisterInputField
          id="reg-fullname"
          label="Full Name"
          type="text"
          value={data.fullName || ""}
          onChange={(e) => { onUpdate({ fullName: e.target.value }); setErrors((err) => ({ ...err, fullName:"" })); }}
          onBlur={() => {
            setTouched((t) => ({ ...t, fullName:true }));
            setErrors((e) => ({ ...e, fullName: !data.fullName?.trim() ? "Full name is required" : "" }));
          }}
          error={errors.fullName}
          hasError={touched.fullName && !!errors.fullName}
          t={t}
          autoComplete="name"
          animDelay={80}
          ready={ready}
          maxLength={60}
        />

        {/* Display name */}
        <RegisterInputField
          id="reg-displayname"
          label="Display Name (optional)"
          type="text"
          value={data.displayName || ""}
          onChange={(e) => onUpdate({ displayName: e.target.value })}
          t={t}
          autoComplete="nickname"
          animDelay={160}
          ready={ready}
          hint="How others will see you in Aurum"
          maxLength={30}
        />

        {/* Role selection */}
        <div
          style={{
            opacity:   ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition:"opacity 0.5s 0.24s var(--rg-ease-luxury), transform 0.5s 0.24s var(--rg-ease-luxury)",
            marginBottom: 4,
          }}
        >
          <div
            className="rg-font-mono"
            style={{
              fontSize:      9.5,
              letterSpacing: "0.18em",
              color:         touched.role && errors.role ? t.error : t.textMuted,
              textTransform: "uppercase",
              marginBottom:  10,
            }}
          >
            Select Role
          </div>

          {/* Error for role */}
          {touched.role && errors.role && (
            <div
              style={{
                fontSize:  11,
                color:     t.error,
                marginBottom: 8,
                fontFamily:"'DM Sans',sans-serif",
                animation: "rg-fadeIn 0.2s var(--rg-ease-out)",
              }}
            >
              {errors.role}
            </div>
          )}

          <div
            style={{
              display:               "grid",
              gridTemplateColumns:   "1fr 1fr",
              gap:                   10,
            }}
          >
            {ROLES.map((role, i) => (
              <div
                key={role.value}
                style={{
                  opacity:   ready ? 1 : 0,
                  transform: ready ? "translateY(0)" : "translateY(12px)",
                  transition:`opacity 0.5s ${0.28 + i * 0.07}s var(--rg-ease-luxury),
                             transform 0.5s ${0.28 + i * 0.07}s var(--rg-ease-luxury)`,
                }}
              >
                <RoleCard
                  role={role}
                  isSelected={data.role === role.value}
                  onSelect={(v) => {
                    onUpdate({ role: v });
                    setErrors((e) => ({ ...e, role:"" }));
                    setTouched((t) => ({ ...t, role:true }));
                  }}
                  t={t}
                  ready={ready}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:16 }}>
        <RegisterButton
          t={t}
          onClick={handleNext}
          label="Continue to Region"
          animDelay={460}
          ready={ready}
        />
        <RegisterBackButton
          t={t}
          onClick={onBack}
          animDelay={520}
          ready={ready}
        />
      </div>
    </div>
  );
}
