// ─────────────────────────────────────────────────────────────
// REGISTER GLOBAL CSS — Keyframes, depth system, micro-interactions
// ─────────────────────────────────────────────────────────────

export const REGISTER_CSS = `
  /* ══ Motion variables ══ */
  :root {
    --rg-ease-luxury:  cubic-bezier(0.16,1,0.3,1);
    --rg-ease-spring:  cubic-bezier(0.34,1.56,0.64,1);
    --rg-ease-out:     cubic-bezier(0.0,0.0,0.2,1);
    --rg-ease-depth:   cubic-bezier(0.22,1,0.36,1);
    --rg-micro:        180ms;
    --rg-standard:     400ms;
    --rg-transition:   600ms;
    --rg-cinematic:    900ms;
    --rg-gold:         #c9a84c;
    --rg-gold-light:   #e8c97a;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }

  /* ══ Intro keyframes ══ */
  @keyframes rg-bgPulse {
    0%,100% { opacity:0.6; transform:scale(1); }
    50%     { opacity:1;   transform:scale(1.04); }
  }
  @keyframes rg-glowExpand {
    from { opacity:0; transform:translate(-50%,-50%) scale(0.4); }
    to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
  }
  @keyframes rg-particleFloat {
    0%   { transform:translateY(0) translateX(0) scale(0); opacity:0; }
    10%  { opacity:1; transform:translateY(-8px) translateX(var(--px)) scale(1); }
    85%  { opacity:0.7; }
    100% { transform:translateY(var(--py)) translateX(var(--px)) scale(0.4); opacity:0; }
  }
  @keyframes rg-gridDraw {
    from { stroke-dashoffset: var(--grid-len, 800); opacity:0; }
    to   { stroke-dashoffset: 0; opacity:1; }
  }
  @keyframes rg-gridFadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes rg-initText {
    0%   { opacity:0; transform:translateY(12px) scale(0.97); letter-spacing:0.4em; }
    100% { opacity:1; transform:translateY(0) scale(1); letter-spacing:0.28em; }
  }
  @keyframes rg-scanLine {
    0%   { top:-4px; opacity:0; }
    5%   { opacity:1; }
    95%  { opacity:1; }
    100% { top:100%; opacity:0; }
  }
  @keyframes rg-subText {
    from { opacity:0; transform:translateY(6px); }
    to   { opacity:0.55; transform:translateY(0); }
  }
  @keyframes rg-introDotPulse {
    0%,100% { transform:scale(1); opacity:0.5; }
    50%     { transform:scale(1.5); opacity:1; }
  }
  @keyframes rg-introFadeOut {
    from { opacity:1; }
    to   { opacity:0; }
  }
  @keyframes rg-introDepthExit {
    from { transform:translateZ(0) scale(1); filter:blur(0px); }
    to   { transform:translateZ(-120px) scale(0.92); filter:blur(8px); }
  }

  /* ══ Depth step transitions ══ */
  @keyframes rg-stepEnterForward {
    from { transform:translateZ(160px) scale(1.04); opacity:0; filter:blur(6px); }
    to   { transform:translateZ(0) scale(1); opacity:1; filter:blur(0px); }
  }
  @keyframes rg-stepExitForward {
    from { transform:translateZ(0) scale(1); opacity:1; filter:blur(0px); }
    to   { transform:translateZ(-100px) scale(0.95); opacity:0; filter:blur(4px); }
  }
  @keyframes rg-stepEnterBackward {
    from { transform:translateZ(-160px) scale(0.94); opacity:0; filter:blur(6px); }
    to   { transform:translateZ(0) scale(1); opacity:1; filter:blur(0px); }
  }
  @keyframes rg-stepExitBackward {
    from { transform:translateZ(0) scale(1); opacity:1; filter:blur(0px); }
    to   { transform:translateZ(100px) scale(1.05); opacity:0; filter:blur(4px); }
  }

  /* ══ Card entrance ══ */
  @keyframes rg-cardEntry {
    from { opacity:0; transform:translateZ(80px) scale(1.02); filter:blur(4px); }
    to   { opacity:1; transform:translateZ(0) scale(1); filter:blur(0px); }
  }
  @keyframes rg-fadeUp {
    from { opacity:0; transform:translateY(14px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes rg-fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes rg-drawLine {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:1; }
  }

  /* ══ Progress indicator ══ */
  @keyframes rg-progressFill {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes rg-stepComplete {
    0%   { box-shadow:0 0 0 0 rgba(201,168,76,0.7); }
    70%  { box-shadow:0 0 0 12px rgba(201,168,76,0); }
    100% { box-shadow:0 0 0 0 rgba(201,168,76,0); }
  }
  @keyframes rg-stepPulse {
    0%,100% { box-shadow:0 0 0 2px rgba(201,168,76,0.3), 0 0 12px rgba(201,168,76,0.2); }
    50%     { box-shadow:0 0 0 4px rgba(201,168,76,0.15), 0 0 24px rgba(201,168,76,0.35); }
  }

  /* ══ Input micro-interactions ══ */
  @keyframes rg-inputError {
    0%,100% { transform:translateX(0); }
    20%     { transform:translateX(-5px); }
    40%     { transform:translateX(5px); }
    60%     { transform:translateX(-3px); }
    80%     { transform:translateX(3px); }
  }
  @keyframes rg-goldGlow {
    0%,100% { box-shadow:0 0 0 2px rgba(201,168,76,0.22), 0 4px 20px rgba(201,168,76,0.1); }
    50%     { box-shadow:0 0 0 3px rgba(201,168,76,0.35), 0 8px 32px rgba(201,168,76,0.2); }
  }

  /* ══ Button micro-interactions ══ */
  @keyframes rg-btnShimmer {
    from { transform:translateX(-100%) skewX(-18deg); }
    to   { transform:translateX(250%) skewX(-18deg); }
  }
  @keyframes rg-btnPress {
    0%,100% { transform:scale(1) translateY(0); }
    50%     { transform:scale(0.97) translateY(1px); }
  }
  @keyframes rg-btnPulse {
    0%,100% { box-shadow: 0 8px 32px rgba(201,168,76,0.28), 0 2px 8px rgba(201,168,76,0.14); }
    50%     { box-shadow: 0 14px 48px rgba(201,168,76,0.45), 0 4px 16px rgba(201,168,76,0.25); }
  }

  /* ══ Role card ══ */
  @keyframes rg-roleActive {
    from { transform:scale(1); }
    to   { transform:scale(1.02); }
  }
  @keyframes rg-roleGlow {
    0%,100% { box-shadow:0 0 0 1.5px rgba(201,168,76,0.5), 0 8px 32px rgba(201,168,76,0.15); }
    50%     { box-shadow:0 0 0 2px rgba(201,168,76,0.7), 0 12px 48px rgba(201,168,76,0.28); }
  }

  /* ══ Success screen ══ */
  @keyframes rg-successRipple {
    0%   { transform:scale(0.5); opacity:0.9; }
    100% { transform:scale(2.5); opacity:0; }
  }
  @keyframes rg-successCheck {
    from { stroke-dashoffset:80; opacity:0; }
    to   { stroke-dashoffset:0; opacity:1; }
  }
  @keyframes rg-successBounce {
    0%  { transform:scale(0.5); opacity:0; }
    60% { transform:scale(1.08); }
    80% { transform:scale(0.96); }
    100%{ transform:scale(1); opacity:1; }
  }

  /* ══ Background ambient ══ */
  @keyframes rg-orb1Float {
    0%,100% { transform:translate(0,0) scale(1); }
    33%     { transform:translate(6%,4%) scale(1.06); }
    66%     { transform:translate(-4%,6%) scale(0.97); }
  }
  @keyframes rg-orb2Float {
    0%,100% { transform:translate(0,0) scale(1); }
    40%     { transform:translate(-5%,-3%) scale(1.04); }
    70%     { transform:translate(4%,-6%) scale(1.02); }
  }
  @keyframes rg-ambientParticle {
    0%   { transform:translateY(100vh) translateX(0) scale(0.5); opacity:0; }
    10%  { opacity:0.8; }
    90%  { opacity:0.3; }
    100% { transform:translateY(-100px) translateX(var(--drift)) scale(1); opacity:0; }
  }
  @keyframes rg-lightStreak {
    0%   { transform:translateX(-120%) skewX(-22deg); opacity:0; }
    5%   { opacity:0.6; }
    95%  { opacity:0.4; }
    100% { transform:translateX(120vw) skewX(-22deg); opacity:0; }
  }

  /* ══ Confirmation ══ */
  @keyframes rg-confirmRow {
    from { opacity:0; transform:translateX(-8px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes rg-checkDraw {
    from { stroke-dashoffset:20; }
    to   { stroke-dashoffset:0; }
  }
  @keyframes rg-pulseDot {
    0%,100% { transform:scale(1); opacity:0.6; }
    50%     { transform:scale(1.5); opacity:1; }
  }

  /* ══ Utility ══ */
  .rg-focus-ring:focus-visible {
    outline:2px solid var(--rg-gold);
    outline-offset:3px;
    border-radius:4px;
  }
  .rg-font-display { font-family:'Cormorant Garamond',Georgia,serif; }
  .rg-font-mono    { font-family:'DM Mono',monospace; }
  .rg-font-body    { font-family:'DM Sans',system-ui,sans-serif; }
`;
