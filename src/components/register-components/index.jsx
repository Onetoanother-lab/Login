import { useState, useCallback, useRef } from "react";
import { Link }                         from "react-router-dom";

import { THEMES }                       from "../login-components/tokens";
import { REGISTER_CSS }                 from "./RegisterGlobalCss";
import { useGlobalStyles, useIsMobile } from "./hooks";

import { RegisterCinematicIntro }        from "./RegisterCinematicIntro";
import { RegisterBackground }            from "./RegisterBackground";
import { DepthStageManager, useDepthTransition } from "./DepthStageManager";
import { ProgressIndicator }             from "./ProgressIndicator";
import { Step1Credentials }              from "./Step1Credentials";
import { Step2Identity }                 from "./Step2Identity";
import { Step3Region }                   from "./Step3Region";
import { Step4Confirmation }             from "./Step4Confirmation";
import { RegisterSuccessScreen }         from "./RegisterSuccessScreen";

// ─────────────────────────────────────────────────────────────
// REGISTER PAGE — Cinematic multi-step registration
// ─────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
  // Step 1
  email:    "",
  password: "",
  confirm:  "",
  // Step 2
  fullName:    "",
  displayName: "",
  role:        "",
  // Step 3
  region:        "",
  language:      "en",
  notifications: { reservations:true, analytics:false, recommendations:true, security:true },
};

export default function Register() {
  useGlobalStyles(REGISTER_CSS);

  // ── State ──────────────────────────────────────────────────
  const [introVisible, setIntroVisible] = useState(true);
  const [ready,        setReady]        = useState(false);
  const [formData,     setFormData]     = useState(DEFAULT_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);

  // ── Theme (always dark for register) ──────────────────────
  const t      = THEMES.dark;
  const isDark = true;

  // ── Responsive ────────────────────────────────────────────
  const isMobile = useIsMobile(768);

  // ── Depth transition engine ────────────────────────────────
  const {
    currentStep,
    nextStep,
    direction,
    transitioning,
    goForward,
    goBackward,
  } = useDepthTransition(4); // 4 steps

  // ── Helpers ────────────────────────────────────────────────
  const updateData = useCallback((patch) => {
    setFormData((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleIntroComplete = () => {
    setIntroVisible(false);
    // Small delay to let intro fade complete, then animate in
    setTimeout(() => setReady(true), 150);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate async account creation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2200);
  };

  // ── Step definitions for DepthStageManager ─────────────────
  const stepComponents = [
    {
      key: "credentials",
      component: (
        <Step1Credentials
          t={t}
          data={formData}
          onUpdate={updateData}
          onNext={goForward}
          ready={ready && currentStep === 0}
        />
      ),
    },
    {
      key: "identity",
      component: (
        <Step2Identity
          t={t}
          data={formData}
          onUpdate={updateData}
          onNext={goForward}
          onBack={goBackward}
          ready={ready && currentStep === 1}
        />
      ),
    },
    {
      key: "region",
      component: (
        <Step3Region
          t={t}
          data={formData}
          onUpdate={updateData}
          onNext={goForward}
          onBack={goBackward}
          ready={ready && currentStep === 2}
        />
      ),
    },
    {
      key: "confirmation",
      component: (
        <Step4Confirmation
          t={t}
          data={formData}
          onBack={goBackward}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          ready={ready && currentStep === 3}
        />
      ),
    },
  ];

  // ── Helpers: layout values ─────────────────────────────────
  const cardMaxW   = isMobile ? "100%" : "440px";
  const cardPad    = isMobile ? "28px 20px" : "44px 40px";
  const sidePad    = isMobile ? "16px" : "48px 40px";

  return (
    <>
      {/* ── Cinematic intro (inside Register page, no routing) ── */}
      {introVisible && (
        <RegisterCinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* ── Page shell ─────────────────────────────────────── */}
      <div
        style={{
          minHeight:     "100vh",
          background:    t.bg,
          display:       "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems:    "stretch",
          fontFamily:    "'DM Sans',system-ui,sans-serif",
          WebkitFontSmoothing:"antialiased",
          position:      "relative",
          overflow:      "hidden",
        }}
      >
        {/* ── Ambient background ─────────────────────────── */}
        <RegisterBackground t={t} />

        {/* ── Left panel (desktop) ─────────────────────── */}
        {!isMobile && (
          <LeftInfoPanel t={t} ready={ready} currentStep={currentStep} />
        )}

        {/* ── Right panel — main form area ─────────────── */}
        <div
          style={{
            flex:           1,
            display:        "flex",
            flexDirection:  "column",
            alignItems:     "center",
            justifyContent: "center",
            padding:        sidePad,
            position:       "relative",
            zIndex:         1,
            overflowY:      "auto",
            overflowX:      "hidden",
          }}
        >
          {/* Mobile top header */}
          {isMobile && (
            <MobileHeader t={t} ready={ready} />
          )}

          {/* Card wrapper */}
          <div
            style={{
              width:        "100%",
              maxWidth:     cardMaxW,
              position:     "relative",
            }}
          >
            {/* Card */}
            <div
              style={{
                borderRadius:  16,
                background:    t.bgCard,
                border:        `1px solid ${t.border}`,
                boxShadow:     t.shadowCard,
                backdropFilter:"blur(24px)",
                padding:       cardPad,
                position:      "relative",
                overflow:      "hidden",
                display:       "flex",
                flexDirection: "column",
                minHeight:     isMobile ? "auto" : 560,
                opacity:       ready ? 1 : 0,
                transform:     ready ? "translateZ(0) scale(1)" : "translateZ(60px) scale(1.02)",
                transition:    "opacity 0.7s var(--rg-ease-luxury), transform 0.7s var(--rg-ease-luxury)",
              }}
            >
              {/* Card top gold line */}
              <div
                aria-hidden="true"
                style={{
                  position:        "absolute",
                  top:             0,
                  left:            "10%",
                  right:           "10%",
                  height:          1,
                  background:      `linear-gradient(to right,transparent,${t.gold}55,transparent)`,
                  borderRadius:    "0 0 4px 4px",
                }}
              />

              {/* Success screen overlays everything */}
              {isSuccess ? (
                <RegisterSuccessScreen t={t} data={formData} />
              ) : (
                <>
                  {/* Progress indicator */}
                  <ProgressIndicator
                    currentStep={currentStep}
                    t={t}
                    ready={ready}
                  />

                  {/* Depth stage — 3D layer transitions */}
                  <div
                    style={{
                      flex:        1,
                      position:    "relative",
                      // Perspective container for 3D depth
                      perspective: "1400px",
                      perspectiveOrigin:"50% 42%",
                    }}
                  >
                    <DepthStageManager
                      steps={stepComponents}
                      currentStep={currentStep}
                      nextStep={nextStep}
                      direction={direction}
                      transitioning={transitioning}
                    />
                  </div>
                </>
              )}

              {/* Card bottom gold line */}
              <div
                aria-hidden="true"
                style={{
                  position:        "absolute",
                  bottom:          0,
                  left:            "20%",
                  right:           "20%",
                  height:          1,
                  background:      `linear-gradient(to right,transparent,${t.gold}22,transparent)`,
                }}
              />
            </div>

            {/* Sign in link */}
            {!isSuccess && (
              <div
                style={{
                  textAlign:   "center",
                  marginTop:   20,
                  opacity:     ready ? 1 : 0,
                  transition:  "opacity 0.6s 0.5s var(--rg-ease-luxury)",
                }}
              >
                <span
                  style={{
                    fontSize:  12.5,
                    color:     t.textMuted,
                    fontFamily:"'DM Sans',sans-serif",
                  }}
                >
                  Already a member?{" "}
                </span>
                <Link
                  to="/"
                  style={{
                    fontSize:      12.5,
                    color:         t.gold,
                    textDecoration:"none",
                    fontWeight:    500,
                    borderBottom:  `1px solid ${t.gold}44`,
                    paddingBottom: 1,
                    fontFamily:    "'DM Sans',sans-serif",
                    transition:    "all 0.18s var(--rg-ease-luxury)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = t.goldLight;
                    e.currentTarget.style.borderBottomColor = t.goldLight + "55";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = t.gold;
                    e.currentTarget.style.borderBottomColor = t.gold + "44";
                  }}
                >
                  Sign in to Aurum
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// LEFT INFO PANEL (desktop only)
// ─────────────────────────────────────────────────────────────
function LeftInfoPanel({ t, ready, currentStep }) {
  const STEP_COPY = [
    {
      headline:"Your Digital \nInvitation",
      body:"Secure credentials form the foundation of your Aurum identity. We use industry-leading encryption to protect every layer of your access.",
    },
    {
      headline:"Define Your \nPresence",
      body:"Your role within Aurum shapes the tools, insights, and recommendations you'll receive. Be precise — this is your system signature.",
    },
    {
      headline:"Your Global \nContext",
      body:"Aurum operates across markets, time zones, and cultures. Localizing your environment ensures every interaction is precisely calibrated.",
    },
    {
      headline:"Final \nInitialization",
      body:"One last review before your account becomes live. Aurum maintains immutable security logs of all access events from this moment forward.",
    },
  ];

  const copy = STEP_COPY[currentStep] || STEP_COPY[0];

  return (
    <div
      style={{
        flex:          "0 0 42%",
        maxWidth:      "520px",
        position:      "relative",
        display:       "flex",
        flexDirection: "column",
        justifyContent:"space-between",
        padding:       "56px 52px",
        overflow:      "hidden",
        zIndex:        1,
      }}
    >
      {/* Logo */}
      <div
        style={{
          opacity:   ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(-10px)",
          transition:"opacity 0.7s 0.1s var(--rg-ease-luxury), transform 0.7s 0.1s var(--rg-ease-luxury)",
        }}
      >
        <div
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        12,
            marginBottom:8,
          }}
        >
          <div
            style={{
              width:        36,
              height:       36,
              borderRadius: 8,
              border:       `1px solid ${t.gold}55`,
              background:   t.goldDim,
              display:      "flex",
              alignItems:   "center",
              justifyContent:"center",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" style={{ width:16, height:16 }}>
              <polygon points="12,3 21,18 3,18" fill="none" stroke={t.gold} strokeWidth="1.5" strokeLinejoin="round"/>
              <circle cx="12" cy="13" r="3" fill="none" stroke={t.gold} strokeWidth="1.2"/>
            </svg>
          </div>
          <span
            className="rg-font-display"
            style={{ fontSize:22, fontWeight:400, color:t.textPrimary, letterSpacing:"0.04em" }}
          >
            Aurum
          </span>
        </div>
        <div
          style={{
            height:     1,
            background: `linear-gradient(to right,${t.gold}44,transparent)`,
            marginBottom:0,
          }}
        />
      </div>

      {/* Dynamic copy */}
      <div
        key={currentStep}
        style={{
          opacity:   ready ? 1 : 0,
          animation: ready ? "rg-fadeUp 0.6s var(--rg-ease-luxury) both" : "none",
        }}
      >
        <p
          className="rg-font-mono"
          style={{
            fontSize:      9.5,
            letterSpacing: "0.22em",
            color:         t.gold,
            textTransform: "uppercase",
            marginBottom:  18,
          }}
        >
          {`Step ${currentStep + 1} of 4`}
        </p>
        <h1
          className="rg-font-display"
          style={{
            fontSize:      42,
            fontWeight:    300,
            color:         t.textPrimary,
            lineHeight:    1.12,
            letterSpacing: "-0.02em",
            marginBottom:  20,
            whiteSpace:    "pre-line",
          }}
        >
          {copy.headline}
        </h1>
        <p
          style={{
            fontSize:  14,
            color:     t.textSecondary,
            lineHeight:1.7,
            fontFamily:"'DM Sans',sans-serif",
            maxWidth:  340,
          }}
        >
          {copy.body}
        </p>
      </div>

      {/* Bottom decorative element */}
      <div
        style={{
          opacity:   ready ? 0.4 : 0,
          transition:"opacity 0.8s 0.6s var(--rg-ease-luxury)",
        }}
      >
        <svg viewBox="0 0 200 60" fill="none" style={{ width:"100%", maxWidth:240 }}>
          <line x1="0" y1="30" x2="200" y2="30" stroke={t.gold} strokeWidth="0.3" strokeOpacity="0.5"/>
          {[0,40,80,120,160,200].map((x, i) => (
            <circle key={i} cx={x} cy="30" r="2" fill="none" stroke={t.gold} strokeWidth="0.6" strokeOpacity="0.6"/>
          ))}
          <circle cx="100" cy="30" r="6" fill="none" stroke={t.gold} strokeWidth="0.8" strokeOpacity="0.8"/>
          <circle cx="100" cy="30" r="2" fill={t.gold} fillOpacity="0.7"/>
        </svg>
        <p
          className="rg-font-mono"
          style={{
            fontSize:      8.5,
            letterSpacing: "0.2em",
            color:         t.textMuted,
            textTransform: "uppercase",
            marginTop:     12,
          }}
        >
          Aurum · Luxury System Access
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MOBILE HEADER
// ─────────────────────────────────────────────────────────────
function MobileHeader({ t, ready }) {
  return (
    <div
      style={{
        width:       "100%",
        maxWidth:    440,
        display:     "flex",
        alignItems:  "center",
        justifyContent:"center",
        gap:         10,
        paddingTop:  20,
        paddingBottom:24,
        opacity:     ready ? 1 : 0,
        transition:  "opacity 0.6s 0.1s var(--rg-ease-luxury)",
      }}
    >
      <div
        style={{
          width:        28,
          height:       28,
          borderRadius: 6,
          border:       `1px solid ${t.gold}55`,
          background:   t.goldDim,
          display:      "flex",
          alignItems:   "center",
          justifyContent:"center",
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" style={{ width:13, height:13 }}>
          <polygon points="12,3 21,18 3,18" fill="none" stroke={t.gold} strokeWidth="1.8" strokeLinejoin="round"/>
          <circle cx="12" cy="13" r="3" fill="none" stroke={t.gold} strokeWidth="1.4"/>
        </svg>
      </div>
      <span
        className="rg-font-display"
        style={{ fontSize:18, fontWeight:400, color:t.textPrimary, letterSpacing:"0.04em" }}
      >
        Aurum
      </span>
    </div>
  );
}
