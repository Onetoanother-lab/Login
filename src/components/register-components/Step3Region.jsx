import { useState } from "react";
import { RegisterInputField }              from "./RegisterInputField";
import { RegisterButton, RegisterBackButton } from "./RegisterButton";
import { StepHeader }                     from "./Step1Credentials";

// ─────────────────────────────────────────────────────────────
// STEP 3 — REGION & PREFERENCES
// Fields: Country/Region, Language, Timezone, Notifications
// ─────────────────────────────────────────────────────────────

const REGIONS = [
  "United States", "United Kingdom", "France", "Italy", "Japan",
  "Australia", "Canada", "Germany", "Spain", "UAE", "Singapore", "Other",
];

const LANGUAGES = [
  { value: "en",    label: "English"    },
  { value: "fr",    label: "Français"   },
  { value: "de",    label: "Deutsch"    },
  { value: "es",    label: "Español"    },
  { value: "it",    label: "Italiano"   },
  { value: "ja",    label: "日本語"      },
  { value: "ar",    label: "العربية"    },
];

const NOTIFICATION_PREFS = [
  { key:"reservations",  label:"Reservation Updates",    icon:"📅" },
  { key:"analytics",     label:"Weekly Analytics",       icon:"📊" },
  { key:"recommendations",label:"AI Recommendations",   icon:"✨" },
  { key:"security",      label:"Security Alerts",        icon:"🔒" },
];

function SelectField({ id, label, value, onChange, options, t, animDelay, ready }) {
  const [focused, setFocused] = useState(false);

  return (
    <div
      style={{
        position:   "relative",
        marginBottom: 16,
        opacity:    ready ? 1 : 0,
        transform:  ready ? "translateY(0)" : "translateY(10px)",
        transition: `opacity 0.5s ${animDelay}ms var(--rg-ease-luxury),
                     transform 0.5s ${animDelay}ms var(--rg-ease-luxury)`,
      }}
    >
      <div
        className="rg-font-mono"
        style={{
          fontSize:      9.5,
          letterSpacing: "0.14em",
          color:         focused ? t.gold : t.textMuted,
          textTransform: "uppercase",
          marginBottom:  6,
          transition:    "color 0.2s var(--rg-ease-luxury)",
        }}
      >
        {label}
      </div>
      <div
        style={{
          position:     "relative",
          borderRadius: 10,
          border:       `1.5px solid ${focused ? t.borderFocus : t.border}`,
          background:   focused ? t.bgInputFocus : t.bgInput,
          boxShadow:    focused ? `0 0 0 2.5px ${t.borderFocus}28, 0 6px 24px rgba(0,0,0,0.18)` : "none",
          transition:   "all 0.2s var(--rg-ease-luxury)",
          transform:    focused ? "translateY(-1px)" : "none",
        }}
      >
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="rg-focus-ring"
          style={{
            width:        "100%",
            padding:      "14px 40px 14px 16px",
            background:   "transparent",
            border:       "none",
            outline:      "none",
            color:        t.textPrimary,
            fontSize:     14,
            fontFamily:   "'DM Sans',sans-serif",
            cursor:       "pointer",
            appearance:   "none",
          }}
        >
          {options.map((opt) => (
            <option
              key={typeof opt === "string" ? opt : opt.value}
              value={typeof opt === "string" ? opt : opt.value}
              style={{ background: "#1a1520", color: t.textPrimary }}
            >
              {typeof opt === "string" ? opt : opt.label}
            </option>
          ))}
        </select>
        {/* Chevron */}
        <svg
          aria-hidden="true"
          viewBox="0 0 12 7"
          fill="none"
          style={{
            position:  "absolute",
            right:     14,
            top:       "50%",
            transform: "translateY(-50%)",
            width:     12,
            height:    7,
            pointerEvents: "none",
          }}
        >
          <path
            d="M1 1l5 5 5-5"
            stroke={focused ? t.gold : t.textMuted}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export function Step3Region({ t, data, onUpdate, onNext, onBack, ready }) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const toggleNotif = (key) => {
    const current = data.notifications || {};
    onUpdate({ notifications: { ...current, [key]: !current[key] } });
  };

  const handleNext = () => {
    const e = {};
    if (!data.region) e.region = "Please select your region";
    setErrors(e);
    setTouched({ region: true });
    if (!Object.values(e).some(Boolean)) onNext();
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
        eyebrow="Your Region"
        title="Set Your Preferences"
        subtitle="Personalize your Aurum environment"
      />

      <div style={{ flex:1, overflowY:"auto" }}>
        {/* Region */}
        <SelectField
          id="reg-region"
          label="Region"
          value={data.region || ""}
          onChange={(v) => { onUpdate({ region: v }); setErrors((e) => ({ ...e, region:"" })); }}
          options={["", ...REGIONS]}
          t={t}
          animDelay={80}
          ready={ready}
        />
        {touched.region && errors.region && (
          <div style={{ fontSize:11, color:t.error, marginTop:-10, marginBottom:12, fontFamily:"'DM Sans',sans-serif" }}>
            {errors.region}
          </div>
        )}

        {/* Language */}
        <SelectField
          id="reg-language"
          label="Preferred Language"
          value={data.language || "en"}
          onChange={(v) => onUpdate({ language: v })}
          options={LANGUAGES}
          t={t}
          animDelay={160}
          ready={ready}
        />

        {/* Notification Preferences */}
        <div
          style={{
            opacity:   ready ? 1 : 0,
            transform: ready ? "translateY(0)" : "translateY(10px)",
            transition:"opacity 0.5s 0.24s var(--rg-ease-luxury), transform 0.5s 0.24s var(--rg-ease-luxury)",
          }}
        >
          <div
            className="rg-font-mono"
            style={{
              fontSize:      9.5,
              letterSpacing: "0.18em",
              color:         t.textMuted,
              textTransform: "uppercase",
              marginBottom:  10,
            }}
          >
            Notifications
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:4 }}>
            {NOTIFICATION_PREFS.map((pref, i) => {
              const enabled = data.notifications?.[pref.key] ?? (pref.key === "security");
              return (
                <div
                  key={pref.key}
                  style={{
                    opacity:   ready ? 1 : 0,
                    transition:`opacity 0.5s ${0.28 + i * 0.06}s var(--rg-ease-luxury)`,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => toggleNotif(pref.key)}
                    className="rg-focus-ring"
                    aria-pressed={enabled}
                    style={{
                      display:        "flex",
                      alignItems:     "center",
                      justifyContent: "space-between",
                      width:          "100%",
                      padding:        "12px 14px",
                      borderRadius:   10,
                      border:         `1.5px solid ${enabled ? t.gold + "44" : t.border}`,
                      background:     enabled ? t.goldDim : "rgba(255,255,255,0.02)",
                      cursor:         "pointer",
                      transition:     "all 0.22s var(--rg-ease-luxury)",
                    }}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <span style={{ fontSize:14 }}>{pref.icon}</span>
                      <span
                        style={{
                          fontSize:  12.5,
                          color:     enabled ? t.textPrimary : t.textSecondary,
                          fontFamily:"'DM Sans',sans-serif",
                          transition:"color 0.22s var(--rg-ease-luxury)",
                        }}
                      >
                        {pref.label}
                      </span>
                    </div>

                    {/* Toggle track */}
                    <div
                      style={{
                        width:        34,
                        height:       18,
                        borderRadius: 9,
                        background:   enabled
                          ? `linear-gradient(to right,${t.gold},${t.goldLight})`
                          : "rgba(255,255,255,0.1)",
                        position:     "relative",
                        transition:   "background 0.25s var(--rg-ease-luxury)",
                        flexShrink:   0,
                        boxShadow:    enabled ? `0 0 8px ${t.gold}55` : "none",
                      }}
                    >
                      <div
                        style={{
                          width:        14,
                          height:       14,
                          borderRadius: "50%",
                          background:   enabled ? "#07070c" : "rgba(255,255,255,0.4)",
                          position:     "absolute",
                          top:          2,
                          left:         enabled ? 18 : 2,
                          transition:   "left 0.22s var(--rg-ease-luxury), background 0.22s var(--rg-ease-luxury)",
                        }}
                      />
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:10, paddingTop:16 }}>
        <RegisterButton
          t={t}
          onClick={handleNext}
          label="Review & Confirm"
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
