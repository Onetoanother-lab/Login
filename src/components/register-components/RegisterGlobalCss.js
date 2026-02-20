// ─────────────────────────────────────────────────────────────
// REGISTER GLOBAL CSS — Keyframes, depth system, micro-interactions (v2)
//
// CHANGES FROM v1:
//   - Unified motion tokens aligned with login globalCss.js
//   - rg-gridDraw: uses strokeDashoffset from element attribute
//     (not var(--grid-len)) — fixes SVG animation rendering bug
//   - rg-introFadeOut: replaced with opacity+transform combo
//     for smoother exit matching DepthStageManager depth feel
//   - rg-stepEnter/Exit: filter:blur removed (main-thread cost)
//   - rg-btnPulse: box-shadow only (no transform) — GPU safe
//   - All transform keyframes include translateZ(0)
// ─────────────────────────────────────────────────────────────

export const REGISTER_CSS = `
  /* ══ Motion variables (unified with login system) ══ */
  :root {
    --rg-ease-luxury:  cubic-bezier(0.16, 1, 0.3, 1);
    --rg-ease-spring:  cubic-bezier(0.34, 1.2, 0.64, 1);
    --rg-ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);
    --rg-ease-depth:   cubic-bezier(0.22, 1, 0.36, 1);

    /* Duration tokens */
    --rg-micro:        180ms;
    --rg-standard:     400ms;
    --rg-transition:   600ms;
    --rg-cinematic:    1000ms;

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
    0%,100% { opacity:0.6; transform:scale(1) translateZ(0); }
    50%     { opacity:1;   transform:scale(1.04) translateZ(0); }
  }
  @keyframes rg-glowExpand {
    from { opacity:0; transform:translate(-50%,-50%) scale(0.4) translateZ(0); }
    to   { opacity:1; transform:translate(-50%,-50%) scale(1) translateZ(0); }
  }
  @keyframes rg-particleFloat {
    0%   { transform:translateY(0) translateX(0) scale(0) translateZ(0); opacity:0; }
    10%  { opacity:1; transform:translateY(-8px) translateX(var(--px)) scale(1) translateZ(0); }
    85%  { opacity:0.7; }
    100% { transform:translateY(var(--py)) translateX(var(--px)) scale(0.4) translateZ(0); opacity:0; }
  }

  /* ── gridDraw: animate strokeDashoffset from element value → 0 ── */
  /* Elements must set strokeDashoffset="<same as strokeDasharray>" inline */
  @keyframes rg-gridDraw {
    from { stroke-dashoffset: inherit; opacity: 0; }
    to   { stroke-dashoffset: 0; opacity: 1; }
  }

  @keyframes rg-initText {
    0%   { opacity:0; transform:translateY(12px) scale(0.97) translateZ(0); letter-spacing:0.4em; }
    100% { opacity:1; transform:translateY(0) scale(1) translateZ(0); letter-spacing:0.28em; }
  }
  @keyframes rg-scanLine {
    0%   { top:-4px; opacity:0; transform:translateZ(0); }
    5%   { opacity:1; }
    95%  { opacity:1; }
    100% { top:100%; opacity:0; transform:translateZ(0); }
  }
  @keyframes rg-subText {
    from { opacity:0; transform:translateY(6px) translateZ(0); }
    to   { opacity:0.55; transform:translateY(0) translateZ(0); }
  }
  @keyframes rg-introDotPulse {
    0%,100% { transform:scale(1) translateZ(0); opacity:0.5; }
    50%     { transform:scale(1.5) translateZ(0); opacity:1; }
  }

  /* ── Smooth opacity-only exit (no harsh scale jump) ── */
  @keyframes rg-introFadeOut {
    0%   { opacity:1; transform:scale(1) translateZ(0);    }
    40%  { opacity:1; transform:scale(1.01) translateZ(0); }
    100% { opacity:0; transform:scale(1.03) translateZ(0); }
  }

  /* ══ Depth step transitions — opacity only (no blur) ══ */
  /* Blur filter removed: runs on main thread, causes jank at 60fps */
  @keyframes rg-stepEnterForward {
    from { transform:translateZ(160px) scale(1.04) ; opacity:0; }
    to   { transform:translateZ(0) scale(1)        ; opacity:1; }
  }
  @keyframes rg-stepExitForward {
    from { transform:translateZ(0) scale(1)          ; opacity:1; }
    to   { transform:translateZ(-100px) scale(0.95)  ; opacity:0; }
  }
  @keyframes rg-stepEnterBackward {
    from { transform:translateZ(-160px) scale(0.94)  ; opacity:0; }
    to   { transform:translateZ(0) scale(1)          ; opacity:1; }
  }
  @keyframes rg-stepExitBackward {
    from { transform:translateZ(0) scale(1)          ; opacity:1; }
    to   { transform:translateZ(100px) scale(1.05)   ; opacity:0; }
  }

  /* ══ Card entrance ══ */
  @keyframes rg-cardEntry {
    from { opacity:0; transform:translateZ(80px) scale(1.02) ; }
    to   { opacity:1; transform:translateZ(0) scale(1)       ; }
  }
  @keyframes rg-fadeUp {
    from { opacity:0; transform:translateY(14px) translateZ(0); }
    to   { opacity:1; transform:translateY(0) translateZ(0);    }
  }
  @keyframes rg-fadeIn {
    from { opacity:0; }
    to   { opacity:1; }
  }
  @keyframes rg-drawLine {
    from { transform:scaleX(0) translateZ(0); opacity:0; }
    to   { transform:scaleX(1) translateZ(0); opacity:1; }
  }

  /* ══ Progress indicator ══ */
  @keyframes rg-progressFill {
    from { transform:scaleX(0) translateZ(0); }
    to   { transform:scaleX(1) translateZ(0); }
  }
  @keyframes rg-stepComplete {
    0%   { box-shadow:0 0 0 0 rgba(201,168,76,0.7);   }
    70%  { box-shadow:0 0 0 12px rgba(201,168,76,0);  }
    100% { box-shadow:0 0 0 0 rgba(201,168,76,0);     }
  }
  @keyframes rg-stepPulse {
    0%,100% { box-shadow:0 0 0 2px rgba(201,168,76,0.3), 0 0 12px rgba(201,168,76,0.2);  }
    50%     { box-shadow:0 0 0 4px rgba(201,168,76,0.15), 0 0 24px rgba(201,168,76,0.35); }
  }

  /* ══ Input micro-interactions ══ */
  @keyframes rg-inputError {
    0%,100% { transform:translateX(0) translateZ(0);  }
    20%     { transform:translateX(-5px) translateZ(0); }
    40%     { transform:translateX(5px) translateZ(0);  }
    60%     { transform:translateX(-3px) translateZ(0); }
    80%     { transform:translateX(3px) translateZ(0);  }
  }
  @keyframes rg-goldGlow {
    0%,100% { box-shadow:0 0 0 2px rgba(201,168,76,0.22), 0 4px 20px rgba(201,168,76,0.1);  }
    50%     { box-shadow:0 0 0 3px rgba(201,168,76,0.35), 0 8px 32px rgba(201,168,76,0.2);  }
  }

  /* ══ Button micro-interactions ══ */
  @keyframes rg-btnShimmer {
    from { transform:translateX(-100%) skewX(-18deg) translateZ(0); }
    to   { transform:translateX(250%)  skewX(-18deg) translateZ(0); }
  }
  @keyframes rg-btnPress {
    0%,100% { transform:scale(1) translateY(0) translateZ(0);       }
    50%     { transform:scale(0.97) translateY(1px) translateZ(0);  }
  }
  /* GPU-safe pulse: box-shadow only, no transform */
  @keyframes rg-btnPulse {
    0%,100% { box-shadow:0 8px 32px rgba(201,168,76,0.28), 0 2px 8px rgba(201,168,76,0.14);  }
    50%     { box-shadow:0 14px 48px rgba(201,168,76,0.45), 0 4px 16px rgba(201,168,76,0.25); }
  }

  /* ══ Role card ══ */
  @keyframes rg-roleActive {
    from { transform:scale(1) translateZ(0);     }
    to   { transform:scale(1.02) translateZ(0);  }
  }
  @keyframes rg-roleGlow {
    0%,100% { box-shadow:0 0 0 1.5px rgba(201,168,76,0.5), 0 8px 32px rgba(201,168,76,0.15);  }
    50%     { box-shadow:0 0 0 2px rgba(201,168,76,0.7), 0 12px 48px rgba(201,168,76,0.28);   }
  }

  /* ══ Success screen ══ */
  @keyframes rg-successRipple {
    0%   { transform:scale(0.5) translateZ(0); opacity:0.9; }
    100% { transform:scale(2.5) translateZ(0); opacity:0;   }
  }
  @keyframes rg-successCheck {
    from { stroke-dashoffset:80; opacity:0; }
    to   { stroke-dashoffset:0;  opacity:1; }
  }
  @keyframes rg-successBounce {
    0%   { transform:scale(0.5) translateZ(0); opacity:0; }
    60%  { transform:scale(1.08) translateZ(0);            }
    80%  { transform:scale(0.96) translateZ(0);            }
    100% { transform:scale(1) translateZ(0);    opacity:1; }
  }

  /* ══ Background ambient ══ */
  @keyframes rg-orb1Float {
    0%,100% { transform:translate(0,0) scale(1) translateZ(0);    }
    33%     { transform:translate(6%,4%) scale(1.06) translateZ(0); }
    66%     { transform:translate(-4%,6%) scale(0.97) translateZ(0); }
  }
  @keyframes rg-orb2Float {
    0%,100% { transform:translate(0,0) scale(1) translateZ(0);     }
    40%     { transform:translate(-5%,-3%) scale(1.04) translateZ(0); }
    70%     { transform:translate(4%,-6%) scale(1.02) translateZ(0);  }
  }
  @keyframes rg-ambientParticle {
    0%   { transform:translateY(100vh) translateX(0) scale(0.5) translateZ(0); opacity:0; }
    10%  { opacity:0.8; }
    90%  { opacity:0.3; }
    100% { transform:translateY(-100px) translateX(var(--drift)) scale(1) translateZ(0); opacity:0; }
  }
  @keyframes rg-lightStreak {
    0%   { transform:translateX(-120%) skewX(-22deg) translateZ(0); opacity:0; }
    5%   { opacity:0.6; }
    95%  { opacity:0.4; }
    100% { transform:translateX(120vw) skewX(-22deg) translateZ(0); opacity:0; }
  }

  /* ══ Confirmation ══ */
  @keyframes rg-confirmRow {
    from { opacity:0; transform:translateX(-8px) translateZ(0); }
    to   { opacity:1; transform:translateX(0) translateZ(0);    }
  }
  @keyframes rg-checkDraw {
    from { stroke-dashoffset:20; }
    to   { stroke-dashoffset:0;  }
  }
  @keyframes rg-pulseDot {
    0%,100% { transform:scale(1) translateZ(0); opacity:0.6; }
    50%     { transform:scale(1.5) translateZ(0); opacity:1; }
  }

  /* ══ Utility classes ══ */
  .rg-focus-ring:focus-visible {
    outline: 2px solid var(--rg-gold);
    outline-offset: 3px;
    border-radius: 4px;
  }
  .rg-font-display { font-family:'Cormorant Garamond',Georgia,serif; }
  .rg-font-mono    { font-family:'DM Mono',monospace; }
  .rg-font-body    { font-family:'DM Sans',system-ui,sans-serif; }
`;
