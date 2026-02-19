import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS
// ─────────────────────────────────────────────────────────────

const THEMES = {
  dark: {
    id: "dark", label: "Luxury Dark",
    bg: "#07070c",
    bgCard: "rgba(255,255,255,0.028)",
    bgInput: "rgba(255,255,255,0.038)",
    bgInputFocus: "rgba(255,255,255,0.068)",
    border: "rgba(255,255,255,0.072)",
    borderFocus: "rgba(201,168,76,0.72)",
    borderError: "rgba(220,100,100,0.72)",
    gold: "#c9a84c", goldLight: "#e8c97a",
    goldDim: "rgba(201,168,76,0.12)", goldGlow: "rgba(201,168,76,0.22)",
    textPrimary: "#f5f0e8",
    textSecondary: "rgba(245,240,232,0.56)",
    textMuted: "rgba(245,240,232,0.32)",
    error: "#e07070", errorBg: "rgba(220,100,100,0.08)",
    success: "#6bcca0", successBg: "rgba(107,204,160,0.08)",
    shadowCard: "0 48px 120px rgba(0,0,0,0.5), 0 16px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(201,168,76,0.1)",
    shadowGold: "0 0 0 3px rgba(201,168,76,0.18), 0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(201,168,76,0.1)",
    shadowBtn: "0 8px 32px rgba(201,168,76,0.28), 0 2px 8px rgba(201,168,76,0.14)",
    shadowBtnHover: "0 20px 60px rgba(201,168,76,0.55), 0 6px 20px rgba(201,168,76,0.32)",
    orb1: "rgba(201,168,76,0.18)", orb2: "rgba(60,40,180,0.2)",
    nebula1: "rgba(201,168,76,0.07)", nebula2: "rgba(80,40,200,0.09)",
    aurora1: "rgba(201,168,76,0.04)", aurora2: "rgba(100,60,220,0.05)",
    checkFill: "#07070c", panelBase: "#05050e",
  },
  light: {
    id: "light", label: "Premium Light",
    bg: "#f8f5f0",
    bgCard: "rgba(255,255,255,0.75)",
    bgInput: "rgba(255,255,255,0.72)",
    bgInputFocus: "#ffffff",
    border: "rgba(0,0,0,0.10)",
    borderFocus: "rgba(160,120,40,0.75)",
    borderError: "rgba(192,80,80,0.72)",
    gold: "#a07828", goldLight: "#c49a40",
    goldDim: "rgba(160,120,40,0.10)", goldGlow: "rgba(160,120,40,0.18)",
    textPrimary: "#1a1612",
    textSecondary: "rgba(26,22,18,0.58)",
    textMuted: "rgba(26,22,18,0.36)",
    error: "#c05050", errorBg: "rgba(192,80,80,0.06)",
    success: "#2a8a60", successBg: "rgba(42,138,96,0.07)",
    shadowCard: "0 32px 80px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
    shadowGold: "0 0 0 3px rgba(160,120,40,0.14), 0 8px 24px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
    shadowBtn: "0 8px 28px rgba(160,120,40,0.22), 0 2px 8px rgba(160,120,40,0.12)",
    shadowBtnHover: "0 18px 50px rgba(160,120,40,0.38), 0 6px 18px rgba(160,120,40,0.22)",
    orb1: "rgba(160,120,40,0.15)", orb2: "rgba(100,80,200,0.07)",
    nebula1: "rgba(160,120,40,0.06)", nebula2: "rgba(80,60,180,0.05)",
    aurora1: "rgba(160,120,40,0.04)", aurora2: "rgba(80,60,160,0.04)",
    checkFill: "#ffffff", panelBase: "#e8e2d6",
  },
  contrast: {
    id: "contrast", label: "High Contrast",
    bg: "#000000",
    bgCard: "rgba(255,255,255,0.04)",
    bgInput: "rgba(255,255,255,0.06)",
    bgInputFocus: "rgba(255,255,255,0.12)",
    border: "rgba(255,255,255,0.3)",
    borderFocus: "#ffdd44", borderError: "#ff8080",
    gold: "#ffdd44", goldLight: "#ffe977",
    goldDim: "rgba(255,221,68,0.15)", goldGlow: "rgba(255,221,68,0.28)",
    textPrimary: "#ffffff",
    textSecondary: "rgba(255,255,255,0.82)",
    textMuted: "rgba(255,255,255,0.55)",
    error: "#ff8080", errorBg: "rgba(255,128,128,0.1)",
    success: "#80ffbb", successBg: "rgba(128,255,187,0.1)",
    shadowCard: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,221,68,0.15)",
    shadowGold: "0 0 0 3px rgba(255,221,68,0.3), 0 8px 24px rgba(0,0,0,0.3)",
    shadowBtn: "0 8px 28px rgba(255,221,68,0.32)",
    shadowBtnHover: "0 18px 50px rgba(255,221,68,0.5), 0 6px 18px rgba(255,221,68,0.3)",
    orb1: "rgba(255,221,68,0.14)", orb2: "rgba(120,100,255,0.1)",
    nebula1: "rgba(255,221,68,0.06)", nebula2: "rgba(120,100,255,0.07)",
    aurora1: "rgba(255,221,68,0.03)", aurora2: "rgba(120,100,255,0.04)",
    checkFill: "#000000", panelBase: "#000000",
  },
};

// ─────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono:wght@300;400&display=swap');

  :root {
    --motion-micro:    180ms;
    --motion-fast:     220ms;
    --motion-medium:   350ms;
    --motion-entrance: 700ms;
    --ease-luxury:    cubic-bezier(0.16, 1, 0.3, 1);
    --ease-out:       cubic-bezier(0.0, 0.0, 0.2, 1);
    --ease-spring-sm: cubic-bezier(0.34, 1.2, 0.64, 1);
  }

  @keyframes au-fadeUp   { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes au-fadeIn   { from { opacity:0; } to { opacity:1; } }
  @keyframes au-shimmer  { 0% { transform:translateX(-160%) skewX(-18deg); } 100% { transform:translateX(320%) skewX(-18deg); } }
  @keyframes au-shake    { 0%,100%{transform:translateX(0);} 20%{transform:translateX(-7px);} 40%{transform:translateX(5px);} 60%{transform:translateX(-4px);} 80%{transform:translateX(2px);} }
  @keyframes au-checkDraw{ from{stroke-dashoffset:80;} to{stroke-dashoffset:0;} }
  @keyframes au-pulseDot { 0%,100%{opacity:.85;transform:scale(.95);} 50%{opacity:.35;transform:scale(1.05);} }
  @keyframes au-orbFloat { 0%,100%{transform:translate(0,0) scale(1);} 38%{transform:translate(44px,-58px) scale(1.12);} 70%{transform:translate(-32px,30px) scale(.9);} }
  @keyframes au-orbFloat2{ 0%,100%{transform:translate(0,0) scale(1.05);} 45%{transform:translate(-52px,42px) scale(.88);} }
  @keyframes au-orbFloat3{ 0%,100%{transform:translate(0,0) scale(1);} 55%{transform:translate(38px,52px) scale(1.08);} }
  @keyframes au-traceRect{ from{stroke-dashoffset:1800;opacity:.2;} to{stroke-dashoffset:0;opacity:.45;} }
  @keyframes au-spin     { to{transform:rotate(360deg);} }
  @keyframes au-spinR    { to{transform:rotate(-360deg);} }
  @keyframes au-scaleIn  { from{opacity:0;transform:scale(.88) translateY(18px);} to{opacity:1;transform:scale(1) translateY(0);} }
  @keyframes au-ripple   { 0%{transform:translate(-50%,-50%) scale(0);opacity:.65;} 100%{transform:translate(-50%,-50%) scale(4.5);opacity:0;} }
  @keyframes au-checkBounce { 0%{transform:scale(.5);opacity:0;} 55%{transform:scale(1.08);opacity:1;} 75%{transform:scale(.95);} 100%{transform:scale(1);opacity:1;} }
  @keyframes au-confetti { 0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1;} 100%{transform:translate(var(--cx),var(--cy)) rotate(var(--cr)) scale(.1);opacity:0;} }
  @keyframes au-progressFill { 0%{width:0%;} 25%{width:35%;} 60%{width:62%;} 85%{width:82%;} 100%{width:96%;} }
  @keyframes au-drawLine { from{transform:scaleX(0);opacity:0;} to{transform:scaleX(1);opacity:1;} }
  @keyframes au-logoReveal { from{opacity:0;letter-spacing:.55em;filter:blur(5px);} to{opacity:1;letter-spacing:.08em;filter:blur(0);} }
  @keyframes au-mandalaSpin  { to{transform:rotate(360deg);}  }
  @keyframes au-mandalaSpinR { to{transform:rotate(-360deg);} }
  @keyframes au-starTwinkle  { 0%,100%{opacity:var(--star-base,.3);transform:scale(1);} 50%{opacity:1;transform:scale(1.9);} }
  @keyframes au-shoot1 { 0%{transform:translate(0,0) scaleX(1);opacity:0;} 4%{opacity:.85;} 100%{transform:translate(260px,110px) scaleX(.05);opacity:0;} }
  @keyframes au-shoot2 { 0%{transform:translate(0,0) scaleX(1);opacity:0;} 4%{opacity:.7;}  100%{transform:translate(-180px,140px) scaleX(.05);opacity:0;} }
  @keyframes au-shoot3 { 0%{transform:translate(0,0) scaleX(1);opacity:0;} 4%{opacity:.9;}  100%{transform:translate(320px,80px) scaleX(.05);opacity:0;} }
  @keyframes au-aurora1 { 0%,100%{opacity:.55;transform:translateX(0) scaleY(1);} 50%{opacity:.85;transform:translateX(12px) scaleY(1.06);} }
  @keyframes au-aurora2 { 0%,100%{opacity:.4;transform:translateX(0) scaleY(1);}  60%{opacity:.72;transform:translateX(-10px) scaleY(1.04);} }
  @keyframes au-nebulaBreath { 0%,100%{opacity:.7;transform:scale(1);} 50%{opacity:1;transform:scale(1.04);} }
  @keyframes au-coreGlow     { 0%,100%{opacity:.55;} 50%{opacity:.92;} }

  /* ── Right-panel cinematic additions ── */
  @keyframes rp-bokeh1 {
    0%,100% { transform:translate(0px,0px)   scale(1);    }
    25%     { transform:translate(22px,-38px) scale(1.12); }
    60%     { transform:translate(-18px,28px) scale(.9);   }
  }
  @keyframes rp-bokeh2 {
    0%,100% { transform:translate(0px,0px)    scale(1.04); }
    33%     { transform:translate(-30px,-20px) scale(.84);  }
    70%     { transform:translate(25px,42px)   scale(1.16); }
  }
  @keyframes rp-bokeh3 {
    0%,100% { transform:translate(0px,0px)   scale(1);    }
    42%     { transform:translate(36px,-25px) scale(1.08); }
    80%     { transform:translate(-12px,18px) scale(.93);  }
  }
  @keyframes rp-bokeh4 {
    0%,100% { transform:translate(0px,0px)    scale(1);    }
    50%     { transform:translate(-28px,-44px) scale(1.18); }
  }
  @keyframes rp-particleWander {
    0%,100% { transform:translateY(0) translateX(0); opacity:0; }
    10%     { opacity:var(--p-op,.3); }
    50%     { transform:translateY(var(--p-vy,-60px)) translateX(var(--p-vx,12px)); opacity:var(--p-op,.3); }
    90%     { opacity:0; }
  }
  @keyframes rp-scanGlide {
    0%   { transform:translateY(-8%); opacity:0; }
    4%   { opacity:.55; }
    96%  { opacity:.35; }
    100% { transform:translateY(108%); opacity:0; }
  }
  @keyframes rp-pulseRing {
    0%   { transform:translate(-50%,-50%) scale(.94); opacity:.28; }
    65%  { transform:translate(-50%,-50%) scale(1.26); opacity:0;   }
    100% { opacity:0; }
  }
  @keyframes rp-pulseRing2 {
    0%   { transform:translate(-50%,-50%) scale(.94); opacity:.16; }
    65%  { transform:translate(-50%,-50%) scale(1.52); opacity:0;   }
    100% { opacity:0; }
  }
  @keyframes rp-cornerGlow {
    0%,100% { opacity:.22; } 50% { opacity:.48; }
  }
  @keyframes rp-gridPulse {
    0%,100% { opacity:1; } 50% { opacity:.55; }
  }
  @keyframes rp-cardAura {
    0%,100% { opacity:.22; transform:scale(1);    }
    50%     { opacity:.38; transform:scale(1.035); }
  }
  @keyframes rp-inputSweep {
    0%   { transform:translateX(-120%) skewX(-14deg); opacity:0; }
    15%  { opacity:.6; }
    100% { transform:translateX(240%)  skewX(-14deg); opacity:0; }
  }
  @keyframes rp-idlePulse {
    0%,100% { box-shadow:0 8px 32px rgba(201,168,76,.18), 0 2px 8px rgba(201,168,76,.09); }
    50%     { box-shadow:0 10px 48px rgba(201,168,76,.32), 0 2px 12px rgba(201,168,76,.16), 0 0 0 5px rgba(201,168,76,.04); }
  }
  @keyframes rp-orbitDot {
    0%   { transform:rotate(0deg)   translateX(9px) rotate(0deg); }
    100% { transform:rotate(360deg) translateX(9px) rotate(-360deg); }
  }
  @keyframes rp-orbitDot2 {
    0%   { transform:rotate(120deg) translateX(9px) rotate(-120deg); }
    100% { transform:rotate(480deg) translateX(9px) rotate(-480deg); }
  }
  @keyframes rp-orbitDot3 {
    0%   { transform:rotate(240deg) translateX(9px) rotate(-240deg); }
    100% { transform:rotate(600deg) translateX(9px) rotate(-600deg); }
  }
  @keyframes rp-cardShimmer2 {
    0%   { transform:translateX(-200%) skewX(-22deg); opacity:0; }
    50%  { opacity:.35; }
    100% { transform:translateX(320%)  skewX(-22deg); opacity:0; }
  }
  /* ── NEW keyframes ── */
  @keyframes rp-geoFloat1 {
    0%,100% { transform:translate(0,0) rotate(0deg);   opacity:.18; }
    40%     { transform:translate(8px,-14px) rotate(22deg); opacity:.28; }
    70%     { transform:translate(-6px,10px) rotate(-8deg); opacity:.14; }
  }
  @keyframes rp-geoFloat2 {
    0%,100% { transform:translate(0,0) rotate(45deg); opacity:.14; }
    55%     { transform:translate(-10px,18px) rotate(80deg); opacity:.24; }
  }
  @keyframes rp-dataFlow {
    0%   { stroke-dashoffset:200; opacity:0; }
    8%   { opacity:.45; }
    88%  { opacity:.45; }
    100% { stroke-dashoffset:-200; opacity:0; }
  }
  @keyframes rp-dataNode {
    0%,100% { r:1.4; opacity:.28; }
    50%     { r:2.2; opacity:.55; }
  }
  @keyframes rp-secRing {
    0%   { transform:scale(.85); opacity:0; }
    25%  { opacity:.7; }
    100% { transform:scale(1.6); opacity:0; }
  }
  @keyframes rp-secDot {
    0%,100% { opacity:.5;  } 50% { opacity:1; }
  }
  @keyframes rp-spotBreath {
    0%,100% { opacity:.07; transform:scale(1); }
    50%     { opacity:.14; transform:scale(1.06); }
  }
  @keyframes rp-noiseShift {
    0%,100% { transform:translate(0,0); }
    25%     { transform:translate(-2px,1px); }
    50%     { transform:translate(2px,-1px); }
    75%     { transform:translate(-1px,-2px); }
  }

  .au-root { font-family:'DM Sans',system-ui,sans-serif; -webkit-font-smoothing:antialiased; -moz-osx-font-smoothing:grayscale; }
  .au-root * { box-sizing:border-box; margin:0; padding:0; }
  .au-font-display { font-family:'Cormorant Garamond',Georgia,serif; }
  .au-font-mono    { font-family:'DM Mono',monospace; }

  input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus {
    -webkit-text-fill-color:inherit;
    -webkit-box-shadow:0 0 0 1000px transparent inset;
    transition:background-color 9999s ease 0s;
  }
  input { caret-color:var(--au-gold,#c9a84c); }

  .au-focus-ring:focus-visible {
    outline:2px solid var(--au-gold,#c9a84c);
    outline-offset:3px; border-radius:4px;
  }
  .au-skip-link {
    position:absolute; top:-100%; left:16px; z-index:9999;
    padding:8px 16px; background:var(--au-gold,#c9a84c); color:#07070c;
    font-size:13px; font-weight:600; border-radius:0 0 8px 8px;
    text-decoration:none; transition:top 120ms;
  }
  .au-skip-link:focus { top:0; }

  /* ══════════════════════════════════════════
     LAYOUT — 4 breakpoints
     xs   < 480px   (small phone)
     sm   < 768px   (phone / tablet portrait)
     md   769–1024  (tablet landscape)
     lg   1025+     (desktop default)
     xl   1440+     (wide)
     ══════════════════════════════════════════ */

  /* ── Desktop default (lg) ── */
  .au-shell { min-height:100vh; display:flex; align-items:stretch; transition:background 450ms var(--ease-luxury),opacity 200ms; }
  .au-left  { flex:0 0 44%; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:56px 52px; }
  .au-right { flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:48px 40px; position:relative; overflow-y:auto; overflow-x:hidden; }
  .au-card  { width:100%; max-width:408px; }
  .au-theme-pos { position:absolute; top:28px; right:28px; z-index:10; }
  .au-clock-pos { position:absolute; bottom:20px; right:28px; }
  .au-mobile-bg     { display:none; }
  .au-mobile-header { display:none; }

  /* ── XL screens (1440px+) ── */
  @media (min-width:1440px) {
    .au-left  { flex:0 0 46%; padding:64px 60px; }
    .au-right { padding:64px 56px; }
    .au-card  { max-width:440px; }
  }

  /* ── Tablet landscape (769–1024px) ── */
  @media (min-width:769px) and (max-width:1024px) {
    .au-left  { flex:0 0 40%; padding:40px 36px; }
    .au-right { padding:32px 20px; }
    .au-card  { max-width:380px; }
    .au-card-inner { padding:32px 28px !important; }
    .au-card-heading { font-size:29px !important; }
    .au-theme-pos { top:18px; right:18px; }
  }

  /* ── Phone / tablet portrait (≤768px) ── */
  @media (max-width:768px) {
    .au-shell { flex-direction:column; position:relative; }
    .au-left  { display:none; }
    .au-right { flex:1; padding:0 20px 56px; min-height:100vh; align-items:center; justify-content:flex-start; padding-top:88px; background:transparent !important; overflow-x:hidden; }
    .au-card  { max-width:100%; position:relative; z-index:2; }
    .au-theme-pos { top:14px; right:14px; z-index:200; }
    .au-clock-pos { display:none; }
    .au-mobile-bg { display:block; position:fixed; inset:0; z-index:0; pointer-events:none; }
    .au-mobile-header {
      display:flex; align-items:center; gap:12px;
      position:fixed; top:0; left:0; right:0; z-index:100;
      padding:12px 20px;
      backdrop-filter:blur(24px);
      border-bottom:1px solid rgba(201,168,76,0.12);
    }
    .au-card-inner { padding:28px 20px !important; }
    .au-card-heading { font-size:26px !important; }
    /* No pulse rings on mobile — perf */
    .rp-pulse-ring { display:none !important; }
    /* No geometric layer on mobile */
    .rp-geometry   { display:none !important; }
    /* No data streams on mobile */
    .rp-datastream { display:none !important; }
  }

  /* ── Small phone (≤480px) ── */
  @media (max-width:480px) {
    .au-right { padding-left:12px; padding-right:12px; }
    .au-card-inner { padding:22px 16px !important; }
    .au-card-heading { font-size:24px !important; }
  }

  /* ── Right-panel UI primitives ── */
  .rp-grid {
    position:absolute; inset:0; pointer-events:none;
    animation: rp-gridPulse 10s ease-in-out infinite;
  }
  .rp-card-corner {
    position:absolute; width:18px; height:18px; pointer-events:none; z-index:4;
    animation: rp-cornerGlow 5s ease-in-out infinite;
  }
  .rp-card-corner.tl { top:-1px; left:-1px;   border-top:1.5px solid; border-left:1.5px solid;   border-radius:5px 0 0 0; }
  .rp-card-corner.tr { top:-1px; right:-1px;   border-top:1.5px solid; border-right:1.5px solid;  border-radius:0 5px 0 0; }
  .rp-card-corner.bl { bottom:-1px; left:-1px; border-bottom:1.5px solid; border-left:1.5px solid; border-radius:0 0 0 5px; }
  .rp-card-corner.br { bottom:-1px; right:-1px; border-bottom:1.5px solid; border-right:1.5px solid; border-radius:0 0 5px 0; }

  /* ── Panel-level corner marks ── */
  .rp-panel-corner {
    position:absolute; width:28px; height:28px; pointer-events:none; z-index:2;
    animation: rp-cornerGlow 7s ease-in-out infinite;
  }
  .rp-panel-corner.tl { top:20px; left:20px;   border-top:1px solid; border-left:1px solid; }
  .rp-panel-corner.tr { top:20px; right:20px;   border-top:1px solid; border-right:1px solid; }
  .rp-panel-corner.bl { bottom:20px; left:20px; border-bottom:1px solid; border-left:1px solid; }
  .rp-panel-corner.br { bottom:20px; right:20px; border-bottom:1px solid; border-right:1px solid; }

  .rp-geometry   {} /* hook class for media-query hide */
  .rp-datastream {} /* hook class for media-query hide */
  .rp-pulse-ring {} /* hook class for media-query hide */

  /* Conic gradient border ring on card */
  @property --rp-border-angle {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  @keyframes rp-borderSpin {
    to { --rp-border-angle: 360deg; }
  }
  .rp-conic-border {
    position:absolute; inset:-1.5px; border-radius:21px; padding:1.5px; z-index:0;
    background: conic-gradient(
      from var(--rp-border-angle),
      transparent 0%,
      transparent 30%,
      rgba(201,168,76,.55) 46%,
      rgba(232,201,122,.85) 50%,
      rgba(201,168,76,.55) 54%,
      transparent 70%,
      transparent 100%
    );
    animation: rp-borderSpin 8s linear infinite;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events:none;
  }

  @media (prefers-reduced-motion:reduce) {
    *,*::before,*::after { animation-duration:.01ms !important; animation-iteration-count:1 !important; transition-duration:.01ms !important; }
    .rp-conic-border { animation:none; }
  }

  /* ══════════════════════════════════════════════════════
     CINEMATIC INTRO — 15-second luxury preloader v3
     ══════════════════════════════════════════════════════ */

  /* ── Overlay lifecycle ── */
  @keyframes ci-bgReveal    { 0%{opacity:0;} 100%{opacity:1;} }
  @keyframes ci-overlayExit {
    0%   { opacity:1; transform:scale(1);     filter:blur(0px) brightness(1); }
    25%  { opacity:1; transform:scale(1.004); filter:blur(0px) brightness(3.2); }
    55%  { opacity:1; transform:scale(1.02);  filter:blur(3px) brightness(1.8); }
    100% { opacity:0; transform:scale(1.07);  filter:blur(22px) brightness(0.2); }
  }

  /* ── Particles ── */
  @keyframes ci-ember {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    6%   { opacity:var(--ci-op,.6); }
    50%  { transform:translate(var(--ci-wx,4px), calc(var(--ci-ry,-180px) * .5)) scale(.7); opacity:var(--ci-op,.6); }
    90%  { opacity:0; }
    100% { transform:translate(var(--ci-wx2,-6px), var(--ci-ry,-180px)) scale(.15); opacity:0; }
  }
  @keyframes ci-debris {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    8%   { opacity:var(--ci-op,.4); }
    85%  { opacity:var(--ci-op,.4); }
    100% { transform:translate(var(--ci-tx,0px),var(--ci-ty,-120px)) scale(.1); opacity:0; }
  }

  /* ── SVG geometry ── */
  @keyframes ci-ringDraw  { from{stroke-dashoffset:var(--ci-perim,2200);opacity:0;} 12%{opacity:var(--ci-rop,.2);} to{stroke-dashoffset:0;opacity:var(--ci-rop,.2);} }
  @keyframes ci-spokeDraw { from{stroke-dashoffset:320;opacity:0;} to{stroke-dashoffset:0;opacity:var(--ci-sop,.22);} }
  @keyframes ci-tickIn    { from{opacity:0;transform:scaleY(0) translateY(2px);} to{opacity:var(--ci-top,.2);transform:scaleY(1) translateY(0);} }
  @keyframes ci-diamondIn { from{opacity:0;transform:scale(0) rotate(-45deg);} to{opacity:.55;transform:scale(1) rotate(0deg);} }

  /* ── Crest ── */
  @keyframes ci-crestDraw {
    from { stroke-dashoffset:220; opacity:0; filter:drop-shadow(0 0 0px rgba(201,168,76,0)); }
    30%  { opacity:1; }
    to   { stroke-dashoffset:0;   opacity:1; filter:drop-shadow(0 0 22px rgba(201,168,76,.9)); }
  }
  @keyframes ci-crestGlow {
    0%,100% { filter:drop-shadow(0 0 8px rgba(201,168,76,.5)) drop-shadow(0 0 20px rgba(201,168,76,.2)); }
    50%     { filter:drop-shadow(0 0 28px rgba(201,168,76,1)) drop-shadow(0 0 60px rgba(201,168,76,.45)) drop-shadow(0 0 100px rgba(201,168,76,.2)); }
  }
  @keyframes ci-coreExpand { 0%{r:0;opacity:0;} 40%{r:18;opacity:.35;} 100%{r:55;opacity:0;} }
  @keyframes ci-corePulse  { 0%,100%{r:5;opacity:.7;} 50%{r:9;opacity:1;} }

  /* ── Light rays ── */
  @keyframes ci-ray {
    0%   { opacity:0; transform:rotate(var(--ci-deg,0deg)) scaleY(0); }
    18%  { opacity:var(--ci-rayop,.08); transform:rotate(var(--ci-deg,0deg)) scaleY(1); }
    72%  { opacity:var(--ci-rayop,.08); }
    100% { opacity:0; }
  }
  @keyframes ci-raySpin { to { transform:rotate(360deg); } }

  /* ── Halo ── */
  @keyframes ci-halo { 0%{transform:scale(.3);opacity:0;} 12%{opacity:.28;} 100%{transform:scale(2.2);opacity:0;} }

  /* ── Text reveals ── */
  @keyframes ci-letterDrop {
    0%   { opacity:0; transform:translateY(-60px) rotateX(60deg) scale(.6); filter:blur(8px); }
    55%  { opacity:1; transform:translateY(6px)   rotateX(-4deg) scale(1.04); filter:blur(0); }
    75%  { transform:translateY(-3px) scale(.99); }
    100% { opacity:1; transform:translateY(0)     rotateX(0deg) scale(1); filter:blur(0); }
  }
  @keyframes ci-ruleGrow { from{transform:scaleX(0);opacity:0;} to{transform:scaleX(1);opacity:1;} }
  @keyframes ci-tagWipe  { from{clip-path:inset(0 100% 0 0);opacity:0;} to{clip-path:inset(0 0% 0 0);opacity:1;} }
  @keyframes ci-statPop  { 0%{opacity:0;transform:translateY(14px) scale(.85);} 60%{opacity:1;transform:translateY(-4px) scale(1.06);} 100%{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes ci-starPop  { 0%{opacity:0;transform:scale(0) rotate(-30deg);} 55%{transform:scale(1.3) rotate(5deg);opacity:1;} 80%{transform:scale(.92) rotate(-2deg);} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
  @keyframes ci-accoladeIn { from{opacity:0;transform:translateX(-24px) skewX(4deg);} to{opacity:1;transform:translateX(0) skewX(0deg);} }
  @keyframes ci-quoteReveal { from{opacity:0;letter-spacing:.5em;filter:blur(6px);} to{opacity:1;letter-spacing:.05em;filter:blur(0);} }
  @keyframes ci-timelineDot { 0%{transform:scale(0) rotate(-90deg);opacity:0;} 60%{transform:scale(1.4) rotate(10deg);opacity:1;} 100%{transform:scale(1) rotate(0deg);opacity:1;} }
  @keyframes ci-textGlow {
    0%,100% { text-shadow:0 0 20px rgba(201,168,76,.3),0 0 60px rgba(201,168,76,.1); }
    50%     { text-shadow:0 0 40px rgba(201,168,76,.7),0 0 90px rgba(201,168,76,.3),0 0 140px rgba(201,168,76,.12); }
  }

  /* ── Act IV: accolade slide + quote + timeline ── */
  @keyframes ci-accoladeIn {
    from { opacity:0; transform:translateX(-24px) skewX(4deg); }
    to   { opacity:1; transform:translateX(0) skewX(0deg); }
  }
  @keyframes ci-quoteReveal {
    from { opacity:0; letter-spacing:.5em; filter:blur(6px); }
    to   { opacity:1; letter-spacing:.05em; filter:blur(0); }
  }
  @keyframes ci-timelineDot {
    0%   { transform:scale(0) rotate(-90deg); opacity:0; }
    60%  { transform:scale(1.4) rotate(10deg); opacity:1; }
    100% { transform:scale(1) rotate(0deg); opacity:1; }
  }
  @keyframes ci-accoladeGlow {
    0%,100% { box-shadow:0 0 0 1px rgba(201,168,76,.12); }
    50%     { box-shadow:0 0 0 1px rgba(201,168,76,.28), 0 4px 24px rgba(201,168,76,.08); }
  }
  @keyframes ci-dividerExpand {
    from { transform:scaleX(0); opacity:0; }
    to   { transform:scaleX(1); opacity:.35; }
  }

  /* ── Shimmer sweeps ── */
  @keyframes ci-shimmer1 { from{transform:translateX(-260%) skewX(-20deg);opacity:0;} 12%{opacity:.8;} 88%{opacity:.6;} to{transform:translateX(520%) skewX(-20deg);opacity:0;} }
  @keyframes ci-shimmer2 { from{transform:translateX(-200%) skewX(-14deg);opacity:0;} 12%{opacity:.45;} 88%{opacity:.35;} to{transform:translateX(400%) skewX(-14deg);opacity:0;} }
  @keyframes ci-shimmer3 { from{transform:translateX(-240%) skewX(-18deg);opacity:0;} 10%{opacity:.65;} 90%{opacity:.5;} to{transform:translateX(480%) skewX(-18deg);opacity:0;} }
  @keyframes ci-shimmer3 { from{transform:translateX(-240%) skewX(-18deg);opacity:0;} 10%{opacity:.65;} 90%{opacity:.5;} to{transform:translateX(480%) skewX(-18deg);opacity:0;} }

  /* ── Scan lines (3 passes) ── */
  @keyframes ci-scan1 { from{top:-2px;opacity:0;} 3%{opacity:.6;} 94%{opacity:.35;} to{top:calc(100% + 2px);opacity:0;} }
  @keyframes ci-scan2 { from{top:-2px;opacity:0;} 3%{opacity:.4;} 94%{opacity:.2;}  to{top:calc(100% + 2px);opacity:0;} }
  @keyframes ci-scan3 { from{top:-2px;opacity:0;} 3%{opacity:.55;} 94%{opacity:.3;} to{top:calc(100% + 2px);opacity:0;} }
  @keyframes ci-scan3 { from{top:-2px;opacity:0;} 3%{opacity:.55;} 94%{opacity:.3;} to{top:calc(100% + 2px);opacity:0;} }

  /* ── Panels ── */
  @keyframes ci-panelIn  { from{opacity:0;transform:scaleY(0);} to{opacity:1;transform:scaleY(1);} }
  @keyframes ci-panelFade{ 0%,100%{opacity:.18;} 50%{opacity:.32;} }

  /* ── Progress / HUD ── */
  @keyframes ci-progress {
    0%{width:0%;} 4%{width:3%;} 12%{width:16%;} 25%{width:34%;}
    42%{width:52%;} 60%{width:68%;} 78%{width:84%;} 92%{width:95%;} 100%{width:100%;}
  }
  @keyframes ci-progressGlow {
    0%,100%{box-shadow:0 0 6px rgba(201,168,76,.5);}
    50%    {box-shadow:0 0 18px rgba(201,168,76,1),0 0 36px rgba(201,168,76,.4),0 0 60px rgba(201,168,76,.15);}
  }
  @keyframes ci-dotBlink { 0%,100%{opacity:.35;transform:scale(.8);} 50%{opacity:1;transform:scale(1.2);} }
  @keyframes ci-hudFade  { from{opacity:0;} to{opacity:1;} }

  /* ── Corners ── */
  @keyframes ci-cornerSlide {
    from{opacity:0;transform:scale(.4) translate(var(--ci-cx,8px),var(--ci-cy,8px));}
    to  {opacity:.75;transform:scale(1) translate(0,0);}
  }
  @keyframes ci-cornerPulse { 0%,100%{opacity:.4;} 50%{opacity:.8;} }

  /* ── Rotations ── */
  @keyframes ci-spinCW  { to{transform:rotate( 360deg);} }
  @keyframes ci-spinCCW { to{transform:rotate(-360deg);} }

  /* ── Ambient ── */
  @keyframes ci-bokeh {
    0%,100%{transform:translate(0,0) scale(1);}
    33%{transform:translate(var(--ci-bx1,30px),var(--ci-by1,-40px)) scale(var(--ci-bs1,1.1));}
    70%{transform:translate(var(--ci-bx2,-20px),var(--ci-by2,30px)) scale(var(--ci-bs2,.9));}
  }
  @keyframes ci-nebula  { 0%,100%{opacity:.65;transform:scale(1);} 50%{opacity:1;transform:scale(1.07);} }
  @keyframes ci-aurora  { 0%,100%{opacity:.55;transform:translateX(0) skewX(0deg) scaleY(1);} 50%{opacity:.9;transform:translateX(20px) skewX(-2deg) scaleY(1.05);} }
  @keyframes ci-aurora2 { 0%,100%{opacity:.4;transform:translateX(0) skewX(0deg);} 50%{opacity:.7;transform:translateX(-15px) skewX(1.5deg);} }

  /* ── Golden flash ── */
  @keyframes ci-flash { 0%{opacity:0;} 35%{opacity:.9;} 100%{opacity:0;} }

  /* ══════════════════════════════════════════════════════════════
     5-PHASE CINEMATIC INTRO — ENHANCED ANIMATION SYSTEM v4
     ══════════════════════════════════════════════════════════════ */

  @keyframes ci-goldSweep {
    0%   { transform:translateX(-120%) skewX(-22deg); opacity:0; }
    6%   { opacity:.85; }
    92%  { opacity:.65; }
    100% { transform:translateX(260%) skewX(-22deg); opacity:0; }
  }
  @keyframes ci-goldSweepFat {
    0%   { transform:translateX(-80%) skewX(-18deg); opacity:0; }
    8%   { opacity:.45; }
    90%  { opacity:.25; }
    100% { transform:translateX(220%) skewX(-18deg); opacity:0; }
  }
  @keyframes ci-logoGlowBreathe {
    0%,100% { filter:drop-shadow(0 0 8px rgba(201,168,76,.45)) drop-shadow(0 0 22px rgba(201,168,76,.18)); transform:scale(1); }
    50%     { filter:drop-shadow(0 0 28px rgba(201,168,76,1)) drop-shadow(0 0 70px rgba(201,168,76,.48)) drop-shadow(0 0 110px rgba(201,168,76,.2)); transform:scale(1.012); }
  }
  @keyframes ci-logoGlowIntense {
    0%,100% { filter:drop-shadow(0 0 18px rgba(201,168,76,.7)) drop-shadow(0 0 45px rgba(201,168,76,.35)); transform:scale(1); }
    50%     { filter:drop-shadow(0 0 48px rgba(201,168,76,1)) drop-shadow(0 0 100px rgba(201,168,76,.6)) drop-shadow(0 0 160px rgba(201,168,76,.28)); transform:scale(1.022); }
  }
  @keyframes ci-fgParticle {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    5%   { opacity:var(--ci-fop,.7); }
    48%  { transform:translate(var(--ci-fwx,3px), calc(var(--ci-fry,-90px) * .5)) scale(.8); opacity:var(--ci-fop,.7); }
    88%  { opacity:0; }
    100% { transform:translate(var(--ci-fwx2,-4px), var(--ci-fry,-90px)) scale(.12); opacity:0; }
  }
  @keyframes ci-bgParticle {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    8%   { opacity:var(--ci-bop,.22); }
    50%  { transform:translate(var(--ci-bwx,8px), calc(var(--ci-bry,-140px) * .5)) scale(.65); opacity:var(--ci-bop,.22); }
    90%  { opacity:0; }
    100% { transform:translate(var(--ci-bwx2,-6px), var(--ci-bry,-140px)) scale(.1); opacity:0; }
  }
  @keyframes ci-depthZoom1 { from{transform:scale(.965) translateZ(0);} to{transform:scale(1.0) translateZ(0);} }
  @keyframes ci-depthZoom2 { 0%{transform:scale(1.0);} 50%{transform:scale(1.008);} 100%{transform:scale(1.0);} }
  @keyframes ci-depthZoom4 { 0%{transform:scale(1.0);} 50%{transform:scale(1.022);} 100%{transform:scale(1.0);} }
  @keyframes ci-counterIn  { 0%{opacity:0;transform:translateY(22px) scale(.8);} 60%{opacity:1;transform:translateY(-4px) scale(1.08);} 100%{opacity:1;transform:translateY(0) scale(1);} }
  @keyframes ci-counterGlow{ 0%,100%{text-shadow:0 0 12px rgba(201,168,76,.4);} 50%{text-shadow:0 0 28px rgba(201,168,76,1),0 0 60px rgba(201,168,76,.4);} }
  @keyframes ci-emphasisScale{ 0%,100%{transform:scale(1);} 50%{transform:scale(1.018);} }
  @keyframes ci-dissolve    { 0%{opacity:1;filter:blur(0px);} 100%{opacity:0;filter:blur(6px);} }
  @keyframes ci-bgDarken    { 0%{background-color:transparent;} 100%{background-color:rgba(0,0,0,.6);} }
  @keyframes ci-flare       { 0%{opacity:0;transform:translate(-50%,-50%) scale(0);} 14%{opacity:.85;} 100%{opacity:0;transform:translate(-50%,-50%) scale(3.2);} }
  @keyframes ci-accentLine  { 0%{transform:scaleX(0);opacity:0;} 25%{opacity:.6;} 75%{opacity:.45;} 100%{transform:scaleX(1);opacity:0;} }
  @keyframes ci-particleIntensify { from{opacity:.45;} to{opacity:1;} }

  /* ════════════════════════════════════════════════════════════════
     LOGIN PAGE — rich ambient animation system
     ════════════════════════════════════════════════════════════════ */

  /* ── Ambient dust particles (right panel background) ── */
  @keyframes lp-dustRise {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    8%   { opacity:var(--lp-op,.3); }
    50%  { transform:translate(var(--lp-vx,10px),var(--lp-vy,-100px)) scale(.65); opacity:var(--lp-op,.3); }
    90%  { opacity:0; }
    100% { transform:translate(var(--lp-vx2,-8px),var(--lp-vy2,-180px)) scale(.15); opacity:0; }
  }
  @keyframes lp-dustDrift {
    0%,100%{ transform:translateY(0) translateX(0); opacity:0; }
    10%    { opacity:var(--lp-op,.18); }
    50%    { transform:translateY(var(--lp-vy,-55px)) translateX(var(--lp-vx,22px)); opacity:var(--lp-op,.18); }
    90%    { opacity:0; }
  }

  /* ── Floating card halo rings ── */
  @keyframes lp-haloExpand {
    0%  { transform:translate(-50%,-50%) scale(.92); opacity:.16; }
    70% { opacity:0; transform:translate(-50%,-50%) scale(1.38); }
    100%{ opacity:0; }
  }
  @keyframes lp-haloExpand2 {
    0%  { transform:translate(-50%,-50%) scale(.92); opacity:.09; }
    70% { opacity:0; transform:translate(-50%,-50%) scale(1.6); }
    100%{ opacity:0; }
  }

  /* ── Floating ornament diamonds ── */
  @keyframes lp-float1 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(-9px);} }
  @keyframes lp-float2 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(7px);} }
  @keyframes lp-float3 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(-5px);} }
  @keyframes lp-diamondGlow { 0%,100%{box-shadow:0 0 8px rgba(201,168,76,.3);} 50%{box-shadow:0 0 18px rgba(201,168,76,.7), 0 0 32px rgba(201,168,76,.25);} }

  /* ── Card entrance (dramatic) ── */
  @keyframes lp-cardIn {
    from { opacity:0; transform:perspective(1200px) rotateX(14deg) translateY(40px) scale(.92); filter:blur(8px); }
    55%  { filter:blur(0); }
    75%  { transform:perspective(1200px) rotateX(-2deg) translateY(-4px) scale(1.01); }
    to   { opacity:1; transform:perspective(1200px) rotateX(0deg) translateY(0) scale(1); filter:blur(0); }
  }

  /* ── Left panel hero text ── */
  @keyframes lp-headIn  { from{opacity:0;transform:translateY(18px) skewY(-1.5deg);filter:blur(3px);} to{opacity:1;transform:translateY(0) skewY(0);filter:blur(0);} }
  @keyframes lp-lineIn  { from{transform:scaleX(0);opacity:0;} to{transform:scaleX(1);opacity:1;} }
  @keyframes lp-badgeIn { from{opacity:0;transform:translateY(12px) scale(.94);} to{opacity:1;transform:translateY(0) scale(1);} }

  /* ── Input field micro-animations ── */
  @keyframes lp-inputSweep {
    from { transform:translateX(-130%) skewX(-16deg); opacity:0; }
    15%  { opacity:.55; }
    to   { transform:translateX(260%)  skewX(-16deg); opacity:0; }
  }
  @keyframes lp-inputHalo {
    0%   { transform:translate(-50%,-50%) scale(.9); opacity:.22; }
    100% { transform:translate(-50%,-50%) scale(1.22); opacity:0; }
  }
  @keyframes lp-underlineGrow {
    from { transform:scaleX(0); }
    to   { transform:scaleX(1); }
  }
  @keyframes lp-labelUp {
    from { opacity:0; transform:translateY(4px) scale(.94); }
    to   { opacity:1; transform:translateY(0) scale(1); }
  }
  @keyframes lp-inputGlowPulse {
    0%,100% { box-shadow:0 0 0 1.5px rgba(201,168,76,.55),0 8px 32px rgba(0,0,0,.2),inset 0 1px 0 rgba(201,168,76,.08); }
    50%     { box-shadow:0 0 0 2.5px rgba(201,168,76,.3),0 8px 40px rgba(0,0,0,.24),0 0 28px rgba(201,168,76,.12),inset 0 1px 0 rgba(201,168,76,.16); }
  }

  /* ── Form divider grow ── */
  @keyframes lp-dividerIn { from{transform:scaleX(0) translateY(-50%);opacity:0;} to{transform:scaleX(1) translateY(-50%);opacity:1;} }
  @keyframes lp-dividerDot { 0%,100%{transform:scale(1) rotate(45deg);opacity:.4;} 50%{transform:scale(1.7) rotate(45deg);opacity:.9;} }

  /* ── Submit button energy ── */
  @keyframes lp-btnBreath {
    0%,100%{ box-shadow:0 8px 32px rgba(201,168,76,.28),0 2px 8px rgba(201,168,76,.14); }
    50%    { box-shadow:0 14px 48px rgba(201,168,76,.42),0 4px 14px rgba(201,168,76,.22),0 0 0 5px rgba(201,168,76,.05); }
  }
  @keyframes lp-btnOrbit {
    0%   { transform:rotate(0deg)   translateX(var(--lp-r,32px)) rotate(0deg); }
    100% { transform:rotate(360deg) translateX(var(--lp-r,32px)) rotate(-360deg); }
  }
  @keyframes lp-btnGlint { from{transform:translateX(-260%) skewX(-20deg);opacity:0;} 10%{opacity:.6;} 90%{opacity:.4;} to{transform:translateX(520%) skewX(-20deg);opacity:0;} }

  /* ── Security badge ── */
  @keyframes lp-secBadgeSpin { to{transform:rotate(360deg);} }
  @keyframes lp-secBadgePulse{ 0%,100%{opacity:.5;transform:scale(1);} 50%{opacity:.9;transform:scale(1.1);} }
  @keyframes lp-secRing { 0%{transform:scale(.8);opacity:0;} 20%{opacity:.45;} 100%{transform:scale(1.6);opacity:0;} }

  /* ── Card shimmer sweep ── */
  @keyframes lp-cardShimmer {
    0%   { transform:translateX(-120%) skewX(-22deg); opacity:0; }
    50%  { opacity:.3; }
    100% { transform:translateX(240%)  skewX(-22deg); opacity:0; }
  }

  /* ── Background diagonal streaks (right panel) ── */
  @keyframes lp-bgStreak {
    0%   { transform:translateY(-100%) translateX(0) rotate(var(--lp-sr,38deg)); opacity:0; }
    4%   { opacity:var(--lp-sop,.025); }
    96%  { opacity:var(--lp-sop,.025); }
    100% { transform:translateY(220%) translateX(0) rotate(var(--lp-sr,38deg)); opacity:0; }
  }

  /* ── Stats pop on left panel ── */
  @keyframes lp-statIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }

  /* ── Micro-dots on card perimeter ── */
  @keyframes lp-microDot { 0%,100%{opacity:.2;transform:scale(.8);} 50%{opacity:.7;transform:scale(1.4);} }

  /* ── Checkbox spring ── */
  @keyframes lp-checkSpring { 0%{transform:scale(.4);} 55%{transform:scale(1.15);} 80%{transform:scale(.92);} 100%{transform:scale(1);} }

  /* ── Link hover underline ── */
  @keyframes lp-linkLine { from{transform:scaleX(0);transform-origin:left;} to{transform:scaleX(1);transform-origin:left;} }

  /* ════════════════════════════════════════════════════════════════
     LOGIN PAGE — rich ambient animation system
     ════════════════════════════════════════════════════════════════ */

  /* ── Ambient dust particles ── */
  @keyframes lp-dustRise {
    0%   { transform:translate(0,0) scale(1); opacity:0; }
    8%   { opacity:var(--lp-op,.3); }
    50%  { transform:translate(var(--lp-vx,10px),var(--lp-vy,-100px)) scale(.65); opacity:var(--lp-op,.3); }
    90%  { opacity:0; }
    100% { transform:translate(var(--lp-vx2,-8px),var(--lp-vy2,-180px)) scale(.15); opacity:0; }
  }
  /* ── Card halo rings ── */
  @keyframes lp-haloExpand  { 0%{transform:translate(-50%,-50%) scale(.92);opacity:.16;} 70%{opacity:0;transform:translate(-50%,-50%) scale(1.38);} 100%{opacity:0;} }
  @keyframes lp-haloExpand2 { 0%{transform:translate(-50%,-50%) scale(.92);opacity:.09;} 70%{opacity:0;transform:translate(-50%,-50%) scale(1.6);}  100%{opacity:0;} }
  /* ── Floating diamonds ── */
  @keyframes lp-float1 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(-9px);} }
  @keyframes lp-float2 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(7px);} }
  @keyframes lp-float3 { 0%,100%{transform:rotate(45deg) translateY(0);} 50%{transform:rotate(45deg) translateY(-5px);} }
  @keyframes lp-diamondPulse { 0%,100%{box-shadow:0 0 8px rgba(201,168,76,.3);} 50%{box-shadow:0 0 18px rgba(201,168,76,.7),0 0 32px rgba(201,168,76,.25);} }
  /* ── Input micro ── */
  @keyframes lp-inputSweep { from{transform:translateX(-130%) skewX(-16deg);opacity:0;} 15%{opacity:.55;} to{transform:translateX(260%) skewX(-16deg);opacity:0;} }
  @keyframes lp-inputHalo  { 0%{transform:translate(-50%,-50%) scale(.9);opacity:.22;} 100%{transform:translate(-50%,-50%) scale(1.22);opacity:0;} }
  @keyframes lp-inputGlowPulse {
    0%,100%{box-shadow:0 0 0 1.5px rgba(201,168,76,.55),0 8px 32px rgba(0,0,0,.2),inset 0 1px 0 rgba(201,168,76,.08);}
    50%    {box-shadow:0 0 0 2.5px rgba(201,168,76,.3),0 8px 40px rgba(0,0,0,.24),0 0 28px rgba(201,168,76,.12),inset 0 1px 0 rgba(201,168,76,.16);}
  }
  /* ── Form divider ── */
  @keyframes lp-dividerIn  { from{transform:scaleX(0) translateY(-50%);opacity:0;} to{transform:scaleX(1) translateY(-50%);opacity:1;} }
  @keyframes lp-dividerDot { 0%,100%{transform:scale(1) rotate(45deg);opacity:.4;} 50%{transform:scale(1.7) rotate(45deg);opacity:.9;} }
  /* ── Submit button ── */
  @keyframes lp-btnBreath { 0%,100%{box-shadow:0 8px 32px rgba(201,168,76,.28),0 2px 8px rgba(201,168,76,.14);} 50%{box-shadow:0 14px 48px rgba(201,168,76,.42),0 4px 14px rgba(201,168,76,.22),0 0 0 5px rgba(201,168,76,.05);} }
  @keyframes lp-btnOrbit  { 0%{transform:rotate(0deg) translateX(var(--lp-r,32px)) rotate(0deg);} 100%{transform:rotate(360deg) translateX(var(--lp-r,32px)) rotate(-360deg);} }
  @keyframes lp-btnGlint  { from{transform:translateX(-260%) skewX(-20deg);opacity:0;} 10%{opacity:.6;} 90%{opacity:.4;} to{transform:translateX(520%) skewX(-20deg);opacity:0;} }
  /* ── Security badge ── */
  @keyframes lp-secSpin  { to{transform:rotate(360deg);} }
  @keyframes lp-secPulse { 0%,100%{opacity:.5;transform:scale(1);} 50%{opacity:.9;transform:scale(1.1);} }
  @keyframes lp-secRing  { 0%{transform:scale(.8);opacity:0;} 20%{opacity:.45;} 100%{transform:scale(1.6);opacity:0;} }
  /* ── Card entrance ── */
  @keyframes lp-cardIn { from{opacity:0;transform:perspective(1200px) rotateX(12deg) translateY(36px) scale(.93);filter:blur(7px);} 55%{filter:blur(0);} 78%{transform:perspective(1200px) rotateX(-2deg) translateY(-3px) scale(1.01);} to{opacity:1;transform:perspective(1200px) rotateX(0) translateY(0) scale(1);filter:blur(0);} }
  /* ── Left-panel hero text ── */
  @keyframes lp-headIn { from{opacity:0;transform:translateY(16px) skewY(-1.5deg);filter:blur(3px);} to{opacity:1;transform:translateY(0) skewY(0);filter:blur(0);} }
  @keyframes lp-lineIn  { from{transform:scaleX(0);opacity:0;} to{transform:scaleX(1);opacity:1;} }
  /* ── BG streaks ── */
  @keyframes lp-bgStreak { 0%{transform:translateY(-100%) rotate(var(--lp-sr,38deg));opacity:0;} 4%{opacity:var(--lp-sop,.022);} 96%{opacity:var(--lp-sop,.022);} 100%{transform:translateY(220%) rotate(var(--lp-sr,38deg));opacity:0;} }
  /* ── Stats pop ── */
  @keyframes lp-statIn { from{opacity:0;transform:translateY(10px);} to{opacity:1;transform:translateY(0);} }
  /* ── Checkbox spring ── */
  @keyframes lp-checkSpring { 0%{transform:scale(.4);} 55%{transform:scale(1.15);} 80%{transform:scale(.92);} 100%{transform:scale(1);} }
  /* ── Micro-orbs (right panel) ── */
  @keyframes lp-microOrb { 0%,100%{transform:translate(0,0) scale(1);opacity:.08;} 33%{transform:translate(var(--lp-mx,20px),var(--lp-my,-30px)) scale(1.14);opacity:.14;} 66%{transform:translate(var(--lp-mx2,-14px),var(--lp-my2,18px)) scale(.88);opacity:.06;} }
`;


// ─────────────────────────────────────────────────────────────
// STAR DATA — 120 stars, fully deterministic
// ─────────────────────────────────────────────────────────────

const STARS = Array.from({ length: 120 }, (_, i) => {
  const s1 = (i * 2654435761) >>> 0;
  const s2 = (i * 1013904223) >>> 0;
  const s3 = (i * 1664525)    >>> 0;
  const s4 = (i * 6364136223) >>> 0;
  return {
    x:    (s1 % 10000) / 100,
    y:    (s2 % 10000) / 100,
    size: 0.06 + (s3 % 100) / 450,
    base: 0.08 + (s1 % 100) / 240,
    dur:  2.2  + (s2 % 100) / 24,
    del:  (s3 % 100) / 18,
    big:  (s4 % 10) === 0,
  };
});

const CONSTELLATION_LINES = STARS.slice(0, 90).reduce((acc, s, i) => {
  STARS.slice(0, 90).forEach((t2, j) => {
    if (j <= i) return;
    const d = Math.hypot(s.x - t2.x, s.y - t2.y);
    if (d < 11 && acc.length < 55) acc.push([i, j, Math.max(0, (11 - d) / 11 * 0.09)]);
  });
  return acc;
}, []);


// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// CINEMATIC INTRO — v3 data (15 seconds, deterministic)
// ─────────────────────────────────────────────────────────────

const lcg = (seed, n) => {
  let s = seed >>> 0;
  return Array.from({ length: n }, () => { s = (1664525 * s + 1013904223) >>> 0; return s / 0xFFFFFFFF; });
};

const EMBERS = Array.from({ length: 90 }, (_, i) => {
  const [rx, ry, rw, ro, rd, rdl, rwx, rwx2] = lcg(i * 7919 + 3571, 8);
  return {
    left:   `${(rx * 94 + 3).toFixed(1)}%`,
    bottom: `${(ry * 22).toFixed(1)}%`,
    sz:    (0.9 + rw * 2.2).toFixed(1),
    op:    (0.2 + ro * 0.55).toFixed(2),
    ry:    `-${(90 + rd * 280).toFixed(0)}px`,
    dl:    (rdl * 6.0).toFixed(2),
    dr:    (3.5 + rw * 5.0).toFixed(2),
    wx:    `${((rwx - 0.5) * 28).toFixed(1)}px`,
    wx2:   `${((rwx2 - 0.5) * 20).toFixed(1)}px`,
    gold:  i % 7 === 0,
  };
});

const DEBRIS = Array.from({ length: 50 }, (_, i) => {
  const a = (i / 50) * 2 * Math.PI;
  const [rd, ro, rsz, rdl, rdr] = lcg(i * 2654435761 + 1013904223, 5);
  const dist = 90 + rd * 200;
  return {
    tx: `${Math.round(Math.cos(a) * dist)}px`,
    ty: `${Math.round(Math.sin(a) * dist)}px`,
    op: (0.2 + ro * 0.5).toFixed(2),
    sz: (1.0 + rsz * 2.5).toFixed(1),
    dl: (rdl * 1.5).toFixed(2),
    dr: (3.0 + rdr * 3.5).toFixed(2),
    gold: i % 4 !== 0,
  };
});

const RAYS = Array.from({ length: 18 }, (_, i) => ({
  deg: `${(i / 18) * 360}deg`,
  op:  (0.035 + (i % 4) * 0.018).toFixed(3),
  dl:  `${(2.2 + i * 0.07).toFixed(2)}s`,
  h:   `${52 + (i % 3) * 8}vh`,
}));

const M_RINGS = [
  { r:340, sd:"",     rop:.15, sw:.65, dl:"0.25s", dur:"2.2s" },
  { r:290, sd:"8 14", rop:.11, sw:.38, dl:"0.45s", dur:"2.0s" },
  { r:235, sd:"",     rop:.20, sw:.60, dl:"0.65s", dur:"1.8s" },
  { r:178, sd:"4 10", rop:.14, sw:.40, dl:"0.85s", dur:"1.5s" },
  { r:128, sd:"",     rop:.26, sw:.55, dl:"1.05s", dur:"1.2s" },
  { r: 80, sd:"2 6",  rop:.20, sw:.40, dl:"1.20s", dur:"1.0s" },
].map(r => ({ ...r, perim: Math.round(2 * Math.PI * r.r) }));

const M_TICKS = Array.from({ length: 128 }, (_, i) => {
  const a = (i / 128) * 2 * Math.PI, R = 340;
  const isMaj = i % 16 === 0, isMed = i % 8 === 0, isMin = i % 4 === 0;
  const len = isMaj ? 22 : isMed ? 13 : isMin ? 7 : 4;
  return {
    x1: 400 + Math.cos(a) * R, y1: 400 + Math.sin(a) * R,
    x2: 400 + Math.cos(a) * (R - len), y2: 400 + Math.sin(a) * (R - len),
    dl: `${(0.25 + i * 0.005).toFixed(3)}s`,
    op: isMaj ? .32 : isMed ? .20 : isMin ? .12 : .07,
    sw: isMaj ? 1.4 : isMed ? .75 : isMin ? .45 : .28,
  };
});

const M_SPOKES = Array.from({ length: 32 }, (_, i) => {
  const a = (i / 32) * 2 * Math.PI, major = i % 4 === 0;
  return {
    x1: 400 + Math.cos(a) * 48,  y1: 400 + Math.sin(a) * 48,
    x2: 400 + Math.cos(a) * 340, y2: 400 + Math.sin(a) * 340,
    op: (major ? .28 : .12).toFixed(2), sw: major ? .55 : .28,
    dl: `${(1.0 + i * 0.035).toFixed(3)}s`,
  };
});

const M_DIAMONDS = [0,30,60,90,120,150,180,210,240,270,300,330].map((deg, i) => {
  const a = deg * Math.PI / 180;
  const R = deg % 90 === 0 ? 340 : deg % 60 === 0 ? 290 : 235;
  const sz = deg % 90 === 0 ? 6 : deg % 60 === 0 ? 4 : 2.5;
  return { cx: 400 + Math.cos(a) * R, cy: 400 + Math.sin(a) * R, sz, deg, dl: `${(1.3 + i * 0.07).toFixed(2)}s` };
});

const HALOS = [
  { delay:"1.6s", dur:"3.2s", color:"rgba(201,168,76,.22)" },
  { delay:"2.6s", dur:"3.2s", color:"rgba(201,168,76,.14)" },
  { delay:"3.8s", dur:"3.2s", color:"rgba(201,168,76,.08)" },
];

const LETTERS  = ["A","U","R","U","M"].map((ch, i) => ({ ch, dl: `${(3.0 + i * 0.12).toFixed(2)}s` }));
const STATS    = [{ num:"18+", label:"Years" }, { num:"3\u2605", label:"Michelin" }, { num:"40+", label:"Venues" }];
const ACCOLADES = [
  { icon:"\u2605", label:"James Beard Foundation",        sub:"Outstanding Restaurant \u00b7 2019 & 2022" },
  { icon:"\u25c6", label:"S.Pellegrino World\u2019s 50 Best", sub:"Ranked #12 Globally" },
  { icon:"\u25c9", label:"Wine Spectator Grand Award",     sub:"14 Consecutive Years" },
];
const TIMELINE = [
  { year:"2014", event:"Founded" }, { year:"2016", event:"1st Star" },
  { year:"2018", event:"Top 50" }, { year:"2020", event:"3 Stars" }, { year:"2024", event:"40 Venues" },
];

// ─────────────────────────────────────────────────────────────
// CINEMATIC INTRO COMPONENT — v4 (15 seconds / 5 phases)
// Phase 1 (0–3s)    Atmosphere    particles, parallax, logo emerging
// Phase 2 (3–6s)    Brand Reveal  logo sharpens, typography stagger, sweep
// Phase 3 (6–9s)    Prestige      animated counters, accent lines, flares
// Phase 4 (9–12s)   Elevation     crescendo, depth zoom, particles intensify
// Phase 5 (12–15s)  Transition    dissolve, darken, flash, exit
// ─────────────────────────────────────────────────────────────

/* ── Deterministic particle data ── */
const lcgN = (seed, n, lo=0, hi=1) => {
  let s = seed >>> 0;
  return Array.from({length:n}, () => { s = (1664525 * s + 1013904223) >>> 0; return lo + (s / 0xFFFFFFFF) * (hi - lo); });
};

const FG_PARTICLES = Array.from({length:50}, (_,i) => {
  const [rx,ry,rsz,rop,rdl,rdr,rwx,rwx2,rry] = lcgN(i*9311+4127, 9);
  return {
    left: `${(rx * 92 + 4).toFixed(1)}%`,
    bottom: `${(ry * 35).toFixed(1)}%`,
    sz: (1.4 + rsz * 2.8).toFixed(1),
    op: (0.35 + rop * 0.6).toFixed(2),
    ry: `-${(60 + rry * 200).toFixed(0)}px`,
    dl: (rdl * 5.5).toFixed(2),
    dr: (2.8 + rdr * 4.2).toFixed(2),
    wx: `${((rwx - 0.5) * 22).toFixed(1)}px`,
    wx2: `${((rwx2 - 0.5) * 16).toFixed(1)}px`,
    gold: i % 5 === 0,
  };
});

const BG_PARTICLES = Array.from({length:70}, (_,i) => {
  const [rx,ry,rsz,rop,rdl,rdr,rwx,rwx2,rry] = lcgN(i*3571+1193, 9);
  return {
    left: `${(rx * 96 + 2).toFixed(1)}%`,
    bottom: `${(ry * 55).toFixed(1)}%`,
    sz: (0.5 + rsz * 1.4).toFixed(1),
    op: (0.08 + rop * 0.22).toFixed(2),
    ry: `-${(80 + rry * 260).toFixed(0)}px`,
    dl: (rdl * 8.0).toFixed(2),
    dr: (5.0 + rdr * 7.0).toFixed(2),
    wx: `${((rwx - 0.5) * 36).toFixed(1)}px`,
    wx2: `${((rwx2 - 0.5) * 28).toFixed(1)}px`,
  };
});

/* Micro-flare positions for phase 3 */
const FLARES = [
  {x:"22%",y:"38%",dl:"6.2s",sz:60,dur:.55},
  {x:"78%",y:"55%",dl:"7.1s",sz:40,dur:.45},
  {x:"50%",y:"28%",dl:"7.8s",sz:80,dur:.6},
  {x:"34%",y:"72%",dl:"8.5s",sz:35,dur:.4},
  {x:"64%",y:"18%",dl:"9.0s",sz:50,dur:.5},
];

const CinematicIntro = ({ gold = "#c9a84c", goldLight = "#e8c97a", onComplete }) => {
  const prefersReduced = typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [cinematicPhase, setCinematicPhase] = useState(1);
  const [exitPhase, setExitPhase] = useState("enter");
  const [flashOn, setFlashOn] = useState(false);
  const G = gold, GL = goldLight;

  useEffect(() => {
    if (prefersReduced) { onComplete?.(); return; }
    // Phase advancement timers — every 3s a new phase begins
    const p2 = setTimeout(() => setCinematicPhase(2), 3000);
    const p3 = setTimeout(() => setCinematicPhase(3), 6000);
    const p4 = setTimeout(() => setCinematicPhase(4), 9000);
    const p5 = setTimeout(() => setCinematicPhase(5), 12000);
    // Exit sequence
    const tf = setTimeout(() => setFlashOn(true),    13500);
    const te = setTimeout(() => setExitPhase("exit"),13800);
    const tc = setTimeout(() => onComplete?.(),       15300);
    return () => { [p2,p3,p4,p5,tf,te,tc].forEach(clearTimeout); };
  }, [onComplete, prefersReduced]);

  if (prefersReduced) return null;

  /* Phase-driven values */
  const isPhase = (n) => cinematicPhase >= n;
  const logoAnim = cinematicPhase >= 4
    ? "ci-logoGlowIntense 2.2s ease-in-out infinite"
    : "ci-logoGlowBreathe 3.5s ease-in-out infinite";
  const particleOpacityMult = cinematicPhase >= 4 ? 1.0 : cinematicPhase >= 3 ? 0.75 : 0.5;
  const contentZoomAnim = cinematicPhase === 1
    ? "ci-depthZoom1 3.0s cubic-bezier(0.16,1,0.3,1) both"
    : cinematicPhase === 4
    ? "ci-depthZoom4 3.0s ease-in-out both"
    : "ci-depthZoom2 3.0s ease-in-out infinite";

  return (
    <div role="status" aria-label="Loading Aurum Restaurant Group" aria-live="polite"
      style={{
        position:"fixed", inset:0, zIndex:9999, overflow:"hidden", background:"#06060f",
        display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
        animation: exitPhase === "exit"
          ? "ci-overlayExit 1.4s cubic-bezier(0.16,1,0.3,1) both"
          : "ci-bgReveal 0.55s ease both",
        willChange:"opacity,transform,filter",
      }}
    >
      {/* Film grain */}
      <div aria-hidden="true" style={{ position:"absolute", inset:"-80px", pointerEvents:"none", opacity:.07,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.76' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
        backgroundSize:"180px", mixBlendMode:"screen" }}/>

      {/* Deep-space base */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, pointerEvents:"none",
        background:`radial-gradient(ellipse 85% 60% at 15% 8%,rgba(201,168,76,.14) 0%,transparent 50%),
          radial-gradient(ellipse 70% 80% at 88% 94%,rgba(45,25,170,.20) 0%,transparent 55%),
          radial-gradient(ellipse 45% 45% at 55% 45%,rgba(10,6,28,.92) 0%,transparent 78%),
          linear-gradient(168deg,#03030b 0%,#07051a 28%,#06040f 60%,#020208 100%)` }}/>

      {/* Nebula clouds */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
        style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
        <defs>
          <filter id="ci-nb1"><feGaussianBlur stdDeviation="8"/></filter>
          <filter id="ci-nb2"><feGaussianBlur stdDeviation="13"/></filter>
        </defs>
        {[{cx:14,cy:18,rx:28,ry:22,fill:"rgba(201,168,76,.08)",f:"ci-nb2",dur:"22s",dl:"0s"},
          {cx:84,cy:80,rx:32,ry:26,fill:"rgba(45,25,170,.10)",f:"ci-nb2",dur:"28s",dl:"6s"},
          {cx:90,cy:28,rx:18,ry:22,fill:"rgba(201,168,76,.06)",f:"ci-nb1",dur:"17s",dl:"10s"},
          {cx:12,cy:70,rx:20,ry:16,fill:"rgba(45,25,170,.08)",f:"ci-nb1",dur:"21s",dl:"3s"},
          {cx:52,cy:55,rx:12,ry:12,fill:"rgba(201,168,76,.05)",f:"ci-nb1",dur:"32s",dl:"15s"},
        ].map((e,i)=>(
          <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry} fill={e.fill}
            filter={`url(#${e.f})`} style={{animation:`ci-nebula ${e.dur} ${e.dl} ease-in-out infinite`}}/>
        ))}
      </svg>

      {/* Aurora bands */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        <div style={{position:"absolute",left:"-25%",right:"-25%",top:"8%",height:"18%",
          background:`linear-gradient(180deg,transparent 0%,rgba(201,168,76,.05) 28%,rgba(201,168,76,.09) 50%,rgba(201,168,76,.05) 72%,transparent 100%)`,
          transform:"rotate(-1.5deg)",animation:"ci-aurora 30s ease-in-out infinite"}}/>
        <div style={{position:"absolute",left:"-25%",right:"-25%",bottom:"14%",height:"14%",
          background:`linear-gradient(180deg,transparent 0%,rgba(45,25,170,.06) 38%,rgba(45,25,170,.10) 55%,rgba(45,25,170,.06) 72%,transparent 100%)`,
          transform:"rotate(1deg)",animation:"ci-aurora2 38s 8s ease-in-out infinite"}}/>
      </div>

      {/* Bokeh orbs */}
      {[
        {w:700,h:700,top:"-260px",left:"-200px",c:`rgba(201,168,76,.15)`,bx1:"-35px",by1:"-55px",bs1:1.15,bx2:"28px",by2:"40px",bs2:.88,dur:"24s"},
        {w:550,h:550,bottom:"-200px",right:"-160px",c:`rgba(45,25,170,.18)`,bx1:"40px",by1:"-30px",bs1:.82,bx2:"-25px",by2:"50px",bs2:1.22,dur:"32s"},
        {w:380,h:380,top:"28%",right:"3%",c:`rgba(201,168,76,.09)`,bx1:"-28px",by1:"20px",bs1:1.1,bx2:"20px",by2:"-35px",bs2:.92,dur:"19s",dl:"4s"},
        {w:260,h:260,top:"10%",left:"8%",c:`rgba(120,70,220,.07)`,bx1:"22px",by1:"-18px",bs1:1.08,bx2:"-15px",by2:"22px",bs2:.95,dur:"27s",dl:"7s"},
      ].map((b,i)=>(
        <div key={i} aria-hidden="true" style={{
          position:"absolute",width:b.w,height:b.h,borderRadius:"50%",
          top:b.top,left:b.left,bottom:b.bottom,right:b.right,
          background:`radial-gradient(circle,${b.c} 0%,transparent 62%)`,
          "--ci-bx1":b.bx1,"--ci-by1":b.by1,"--ci-bs1":b.bs1,
          "--ci-bx2":b.bx2,"--ci-by2":b.by2,"--ci-bs2":b.bs2,
          animation:`ci-bokeh ${b.dur} ${b.dl||"0s"} ease-in-out infinite`,
          willChange:"transform",
        }}/>
      ))}

      {/* Scanlines */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",
        backgroundImage:`repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.06) 2px,rgba(0,0,0,.06) 3px)`}}/>

      {/* ══ PHASE-DRIVEN LAYER SYSTEM ══ */}

      {/* BG Particle Layer — slow, dim, always present */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:1,
        opacity: cinematicPhase >= 4 ? 1 : cinematicPhase >= 3 ? 0.8 : 0.5,
        transition:"opacity 2s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {BG_PARTICLES.map((p,i)=>(
          <div key={i} style={{
            position:"absolute", left:p.left, bottom:p.bottom,
            width:`${p.sz}px`, height:`${p.sz}px`, borderRadius:"50%",
            background:`radial-gradient(circle, ${G}${i%8===0?"cc":"77"} 0%, transparent 70%)`,
            "--ci-bop":`${(parseFloat(p.op)*particleOpacityMult).toFixed(2)}`,
            "--ci-bry":p.ry, "--ci-bwx":p.wx, "--ci-bwx2":p.wx2,
            animation:`ci-bgParticle ${p.dr}s ${p.dl}s cubic-bezier(0.16,1,0.3,1) infinite`,
            willChange:"transform,opacity",
          }}/>
        ))}
      </div>

      {/* FG Particle Layer — appears phase 2+, intensifies each phase */}
      {isPhase(2) && (
        <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:2,
          opacity: cinematicPhase >= 4 ? 1 : cinematicPhase >= 3 ? 0.8 : 0.6,
          transition:"opacity 2s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {FG_PARTICLES.map((p,i)=>(
            <div key={i} style={{
              position:"absolute", left:p.left, bottom:p.bottom,
              width:`${p.sz}px`, height:`${p.sz}px`, borderRadius:"50%",
              background:p.gold
                ? `radial-gradient(circle, ${GL} 0%, ${G} 40%, transparent 75%)`
                : `radial-gradient(circle, ${G}ee 0%, ${G}55 50%, transparent 75%)`,
              boxShadow: p.gold ? `0 0 ${parseFloat(p.sz)*2}px ${G}88` : "none",
              "--ci-fop":`${(parseFloat(p.op)*particleOpacityMult).toFixed(2)}`,
              "--ci-fry":p.ry, "--ci-fwx":p.wx, "--ci-fwx2":p.wx2,
              animation:`ci-fgParticle ${p.dr}s ${p.dl}s cubic-bezier(0.16,1,0.3,1) infinite`,
              willChange:"transform,opacity",
            }}/>
          ))}
        </div>
      )}

      {/* Gold light sweep — Phase 2 fires first, Phase 3 & 4 add more */}
      <div aria-hidden="true" style={{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",zIndex:3,overflow:"hidden"}}>
        {/* Sweep 1 — Phase 2 */}
        <div style={{position:"absolute",top:0,left:"-60%",width:"35%",height:"100%",
          background:`linear-gradient(105deg, transparent, ${G}22, ${GL}44, ${G}22, transparent)`,
          animation:"ci-goldSweep 1.8s 3.2s cubic-bezier(0.16,1,0.3,1) both",
          willChange:"transform,opacity"
        }}/>
        {/* Wide backdrop sweep — Phase 2 */}
        <div style={{position:"absolute",top:0,left:"-80%",width:"55%",height:"100%",
          background:`linear-gradient(105deg, transparent, ${G}0a, ${G}18, ${G}0a, transparent)`,
          animation:"ci-goldSweepFat 2.4s 3.5s cubic-bezier(0.16,1,0.3,1) both",
          willChange:"transform,opacity"
        }}/>
        {/* Sweep 2 — Phase 3 */}
        {isPhase(3) && (
          <div style={{position:"absolute",top:0,left:"-60%",width:"30%",height:"100%",
            background:`linear-gradient(108deg, transparent, ${G}28, ${GL}55, ${G}28, transparent)`,
            animation:"ci-goldSweep 1.5s 0.3s cubic-bezier(0.16,1,0.3,1) both",
            willChange:"transform,opacity"
          }}/>
        )}
        {/* Sweep 3 — Phase 4 crescendo */}
        {isPhase(4) && (
          <div style={{position:"absolute",top:0,left:"-60%",width:"40%",height:"100%",
            background:`linear-gradient(105deg, transparent, ${G}35, ${GL}70, ${G}35, transparent)`,
            animation:"ci-goldSweep 1.2s 0.2s cubic-bezier(0.16,1,0.3,1) both",
            willChange:"transform,opacity"
          }}/>
        )}
      </div>

      {/* Phase 3 — Micro light flares */}
      {isPhase(3) && (
        <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",zIndex:3}}>
          {FLARES.map((f,i)=>(
            <div key={i} style={{
              position:"absolute", left:f.x, top:f.y,
              width:f.sz, height:f.sz, borderRadius:"50%",
              background:`radial-gradient(circle, ${GL}cc 0%, ${G}66 30%, transparent 70%)`,
              animation:`ci-flare ${f.dur}s ${f.dl} cubic-bezier(0.16,1,0.3,1) both`,
              willChange:"transform,opacity",
            }}/>
          ))}
          {/* Phase 3 accent lines */}
          {[{dl:"6.4s",top:"30%"},{dl:"7.2s",top:"55%"},{dl:"7.9s",top:"72%"}].map((l,i)=>(
            <div key={i} aria-hidden="true" style={{
              position:"absolute",left:0,right:0,top:l.top,height:1,transformOrigin:"left",
              background:`linear-gradient(to right, transparent, ${G}44 20%, ${G}66 50%, ${G}44 80%, transparent)`,
              animation:`ci-accentLine 1.8s ${l.dl} cubic-bezier(0.16,1,0.3,1) both`,
            }}/>
          ))}
        </div>
      )}

      {/* Phase 5 — background darkening veil */}
      {isPhase(5) && (
        <div aria-hidden="true" style={{
          position:"absolute",inset:0,pointerEvents:"none",zIndex:4,
          animation:"ci-bgDarken 2.5s cubic-bezier(0.16,1,0.3,1) both",
        }}/>
      )}

      {/* Scan #1 */}
      <div aria-hidden="true" style={{position:"absolute",left:0,right:0,height:2,top:0,pointerEvents:"none",zIndex:5,
        background:`linear-gradient(to right,transparent,${G}55 15%,${GL}99 50%,${G}55 85%,transparent)`,
        boxShadow:`0 0 16px ${G}55,0 0 40px ${G}22`,animation:"ci-scan1 7s 0.5s linear both"}}/>
      {/* Scan #2 */}
      <div aria-hidden="true" style={{position:"absolute",left:0,right:0,height:1,top:0,pointerEvents:"none",zIndex:5,
        background:`linear-gradient(to right,transparent,${G}44 20%,${GL}77 50%,${G}44 80%,transparent)`,
        boxShadow:`0 0 10px ${G}44`,animation:"ci-scan2 6s 7.0s linear both"}}/>
      {/* Scan #3 */}
      <div aria-hidden="true" style={{position:"absolute",left:0,right:0,height:1.5,top:0,pointerEvents:"none",zIndex:5,
        background:`linear-gradient(to right,transparent,${G}66 18%,${GL}99 50%,${G}66 82%,transparent)`,
        boxShadow:`0 0 12px ${G}55`,animation:"ci-scan3 5s 11.5s linear both"}}/>

      {/* Architectural side panels */}
      {[
        { side:"left",  lineX:72, lineX2:64, textX:36, label:"AURUM \u00b7 MMXIV", dl:"0.4s" },
        { side:"right", lineX:8,  lineX2:16, textX:44, label:"\u2605\u2605\u2605 MICHELIN", dl:"0.6s" },
      ].map((p,i)=>(
        <div key={i} aria-hidden="true" style={{
          position:"absolute",[p.side]:0,top:0,bottom:0,width:"clamp(48px,6vw,80px)",
          pointerEvents:"none",transformOrigin:"top center",zIndex:5,
          animation:`ci-panelIn 1.2s ${p.dl} cubic-bezier(0.16,1,0.3,1) both, ci-panelFade 5s ${parseFloat(p.dl)+1.2}s ease-in-out infinite`,
        }}>
          <svg width="100%" height="100%" viewBox="0 0 80 100" preserveAspectRatio="none">
            <line x1={p.lineX} y1="0" x2={p.lineX} y2="100" stroke={G} strokeWidth="0.5" strokeOpacity=".25"/>
            <line x1={p.lineX2} y1="0" x2={p.lineX2} y2="100" stroke={G} strokeWidth="0.25" strokeOpacity=".12"/>
            {Array.from({length:18},(_,j)=>(
              <line key={j} x1={p.lineX2} y1={`${5.5*j+2}%`} x2={p.lineX} y2={`${5.5*j+2}%`}
                stroke={G} strokeWidth="0.4" strokeOpacity={j%3===0?.3:.14}/>
            ))}
            <text x={p.textX} y="50%" textAnchor="middle" dominantBaseline="middle"
              fill={G} fillOpacity=".18" fontSize="7" fontFamily="'DM Mono',monospace"
              letterSpacing="3" writingMode="vertical-rl" textRendering="geometricPrecision">{p.label}</text>
          </svg>
        </div>
      ))}

      {/* Corner accents */}
      {[
        {top:"20px",left:"20px",bt:"top",bl:"left",cx:"6px",cy:"6px"},
        {top:"20px",right:"20px",bt:"top",bl:"right",cx:"-6px",cy:"6px"},
        {bottom:"20px",left:"20px",bt:"bottom",bl:"left",cx:"6px",cy:"-6px"},
        {bottom:"20px",right:"20px",bt:"bottom",bl:"right",cx:"-6px",cy:"-6px"},
      ].map((c,i)=>(
        <div key={i} aria-hidden="true" style={{
          position:"absolute",...c,width:40,height:40,
          borderStyle:"solid",borderColor:`${G}70`,borderWidth:0,
          [`border${c.bt.charAt(0).toUpperCase()+c.bt.slice(1)}Width`]:"1.5px",
          [`border${c.bl.charAt(0).toUpperCase()+c.bl.slice(1)}Width`]:"1.5px",
          "--ci-cx":c.cx,"--ci-cy":c.cy,opacity:0,
          animation:`ci-cornerSlide 0.7s ${(0.3+i*0.1).toFixed(1)}s cubic-bezier(0.34,1.2,0.64,1) both, ci-cornerPulse 3.5s ${(1.8+i*0.4).toFixed(1)}s ease-in-out infinite`,
        }}>
          <div style={{position:"absolute",...(c.bt==="top"?{bottom:4}:{top:4}),...(c.bl==="left"?{right:4}:{left:4}),width:4,height:4,background:G,opacity:.6,transform:"rotate(45deg)"}}/>
        </div>
      ))}

      {/* Rising embers */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden"}}>
        {EMBERS.map((e,i)=>(
          <div key={i} style={{
            position:"absolute",left:e.left,bottom:e.bottom,
            width:`${e.sz}px`,height:`${e.sz}px`,borderRadius:"50%",
            background: e.gold
              ? `radial-gradient(circle,${GL} 0%,${G} 60%,transparent 100%)`
              : `radial-gradient(circle,rgba(255,220,140,.9) 0%,rgba(201,168,76,.7) 50%,transparent 100%)`,
            boxShadow:`0 0 ${parseFloat(e.sz)*2.5}px ${e.gold?GL:G}88`,
            "--ci-op":e.op,"--ci-ry":e.ry,"--ci-wx":e.wx,"--ci-wx2":e.wx2,
            animation:`ci-ember ${e.dr}s ${e.dl}s cubic-bezier(0.33,0,0.66,1) infinite`,
            willChange:"transform,opacity",
          }}/>
        ))}
      </div>

      {/* Astronomical mandala */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",pointerEvents:"none"}}>
        <svg viewBox="0 0 800 800" style={{width:"min(96vw,96vh)",height:"min(96vw,96vh)",overflow:"visible"}}>
          <defs>
            <radialGradient id="ci-glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={G} stopOpacity=".40"/><stop offset="55%" stopColor={G} stopOpacity=".08"/><stop offset="100%" stopColor={G} stopOpacity="0"/>
            </radialGradient>
            <radialGradient id="ci-glow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={GL} stopOpacity=".55"/><stop offset="60%" stopColor={G} stopOpacity=".12"/><stop offset="100%" stopColor={G} stopOpacity="0"/>
            </radialGradient>
            <filter id="ci-gfBlur"><feGaussianBlur stdDeviation="3"/></filter>
          </defs>
          <circle cx="400" cy="400" r="260" fill="url(#ci-glow1)"/>
          <circle cx="400" cy="400" r="100" fill="url(#ci-glow2)" style={{animation:"ci-nebula 4.5s ease-in-out infinite"}}/>
          <g style={{transformOrigin:"400px 400px",animation:"ci-spinCW 110s linear infinite",willChange:"transform"}}>
            {M_RINGS.map((ring,i)=>(
              <circle key={i} cx="400" cy="400" r={ring.r} fill="none" stroke={G} strokeWidth={ring.sw}
                strokeDasharray={ring.sd ? ring.sd : `${ring.perim} ${ring.perim}`} strokeDashoffset={ring.perim}
                style={{"--ci-perim":ring.perim,"--ci-rop":ring.rop,animation:`ci-ringDraw ${ring.dur} ${ring.dl} cubic-bezier(0.16,1,0.3,1) both`}}/>
            ))}
            {M_TICKS.map((tk,i)=>(
              <line key={i} x1={tk.x1} y1={tk.y1} x2={tk.x2} y2={tk.y2} stroke={G} strokeWidth={tk.sw} strokeLinecap="round"
                style={{transformOrigin:"400px 400px",opacity:0,"--ci-top":tk.op,animation:`ci-tickIn 0.45s ${tk.dl} cubic-bezier(0.16,1,0.3,1) both`}}/>
            ))}
            {M_DIAMONDS.map((d,i)=>(
              <g key={i} transform={`translate(${d.cx},${d.cy}) rotate(${d.deg+45})`}
                style={{opacity:0,animation:`ci-diamondIn 0.55s ${d.dl} cubic-bezier(0.34,1.2,0.64,1) both`}}>
                <rect x={-d.sz} y={-d.sz} width={d.sz*2} height={d.sz*2} fill="none" stroke={G} strokeWidth="0.9" strokeOpacity=".55"/>
                {d.sz > 4 && <rect x={-d.sz*.5} y={-d.sz*.5} width={d.sz} height={d.sz} fill={G} fillOpacity=".14"/>}
              </g>
            ))}
          </g>
          <g style={{transformOrigin:"400px 400px",animation:"ci-spinCCW 70s linear infinite",willChange:"transform"}}>
            {M_SPOKES.map((sp,i)=>(
              <line key={i} x1={sp.x1} y1={sp.y1} x2={sp.x2} y2={sp.y2} stroke={G} strokeWidth={sp.sw}
                strokeDasharray="320 320" strokeDashoffset="320"
                style={{"--ci-sop":sp.op,animation:`ci-spokeDraw 1.4s ${sp.dl} cubic-bezier(0.16,1,0.3,1) both`}}/>
            ))}
            <polygon points={Array.from({length:6},(_,i)=>{const a=(i/6)*2*Math.PI;return `${400+Math.cos(a)*155},${400+Math.sin(a)*155}`;}).join(" ")} fill="none" stroke={G} strokeWidth=".45" strokeOpacity=".14"/>
            <polygon points={Array.from({length:6},(_,i)=>{const a=(i/6)*2*Math.PI+Math.PI/6;return `${400+Math.cos(a)*155},${400+Math.sin(a)*155}`;}).join(" ")} fill="none" stroke={G} strokeWidth=".45" strokeOpacity=".12"/>
            <polygon points={Array.from({length:8},(_,i)=>{const a=(i/8)*2*Math.PI;return `${400+Math.cos(a)*230},${400+Math.sin(a)*230}`;}).join(" ")} fill="none" stroke={G} strokeWidth=".4" strokeOpacity=".10"/>
            {Array.from({length:8},(_,i)=>{const a=(i/8)*2*Math.PI;return(
              <circle key={i} cx={400+Math.cos(a)*230} cy={400+Math.sin(a)*230} r="1.8" fill={G} fillOpacity=".4"
                style={{animation:`ci-nebula ${3+i*.3}s ${i*.2}s ease-in-out infinite`}}/>
            );})}
          </g>
          <g style={{transformOrigin:"400px 400px",animation:"ci-spinCW 180s linear infinite",willChange:"transform"}}>
            <circle cx="400" cy="400" r="305" fill="none" stroke={G} strokeWidth=".3" strokeOpacity=".08" strokeDasharray="12 20"/>
          </g>
          {HALOS.map((h,i)=>(
            <circle key={i} cx="400" cy="400" r="90" fill="none" stroke={h.color} strokeWidth="1"
              style={{transformOrigin:"400px 400px",animation:`ci-halo ${h.dur} ${h.delay} cubic-bezier(0.16,1,0.3,1) infinite`}}/>
          ))}
          <g style={{animation:"ci-crestGlow 2.8s 2.2s ease-in-out infinite"}}>
            <polygon points="400,348 414,376 445,378 424,399 431,430 400,414 369,430 376,399 355,378 386,376"
              fill="none" stroke={G} strokeWidth="1.6" strokeLinejoin="round"
              strokeDasharray="220 220" strokeDashoffset="220"
              style={{animation:"ci-crestDraw 1.3s 1.8s cubic-bezier(0.16,1,0.3,1) both"}}/>
            <polygon points="400,362 409,380 430,382 415,396 419,417 400,406 381,417 385,396 370,382 391,380"
              fill="none" stroke={GL} strokeWidth=".6" strokeLinejoin="round" strokeOpacity=".5"
              strokeDasharray="180 180" strokeDashoffset="180"
              style={{animation:"ci-crestDraw 1.1s 2.1s cubic-bezier(0.16,1,0.3,1) both"}}/>
            <circle cx="400" cy="400" r="0" fill={G} fillOpacity="0" filter="url(#ci-gfBlur)"
              style={{animation:"ci-coreExpand 1.8s 1.9s cubic-bezier(0.16,1,0.3,1) both"}}/>
            <circle cx="400" cy="400" r="5" fill={GL} fillOpacity="0"
              style={{animation:"ci-corePulse 2.2s 2.0s ease-in-out infinite"}}/>
          </g>
        </svg>
      </div>

      {/* Light rays */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",animation:"ci-raySpin 40s 2.2s linear infinite",pointerEvents:"none"}}>
        {RAYS.map((ray,i)=>(
          <div key={i} style={{
            position:"absolute",width:"1.5px",height:ray.h,transformOrigin:"50% 0%",transform:`rotate(${ray.deg})`,
            background:`linear-gradient(to bottom,${G}00 0%,${G}${Math.round(parseFloat(ray.op)*255).toString(16).padStart(2,"0")} 25%,${G}22 70%,${G}00 100%)`,
            "--ci-deg":ray.deg,"--ci-rayop":ray.op,
            animation:`ci-ray 5.5s ${ray.dl} cubic-bezier(0.16,1,0.3,1) both`,willChange:"opacity,transform",
          }}/>
        ))}
      </div>

      {/* Orbital debris */}
      <div aria-hidden="true" style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"}}>
        {DEBRIS.map((d,i)=>(
          <div key={i} style={{
            position:"absolute",width:`${d.sz}px`,height:`${d.sz}px`,
            marginLeft:`-${parseFloat(d.sz)/2}px`,marginTop:`-${parseFloat(d.sz)/2}px`,borderRadius:"50%",
            background:d.gold?`radial-gradient(circle,${GL} 0%,${G} 70%,transparent 100%)`:`rgba(201,168,76,0.6)`,
            boxShadow:`0 0 ${parseFloat(d.sz)*3}px ${G}66`,
            "--ci-tx":d.tx,"--ci-ty":d.ty,"--ci-op":d.op,
            animation:`ci-debris ${d.dr}s ${d.dl}s cubic-bezier(0.16,1,0.3,1) infinite`,willChange:"transform,opacity",
          }}/>
        ))}
      </div>

      {/* ══ MAIN TEXT BLOCK — phase-aware depth zoom wrapper ══ */}
      <div style={{position:"relative",zIndex:6,textAlign:"center",pointerEvents:"none",display:"flex",flexDirection:"column",alignItems:"center",perspective:"900px",maxWidth:"clamp(300px,58vw,620px)",
        animation: contentZoomAnim,
        willChange:"transform",
      }}>

        {/* Pre-title ornament */}
        <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16,opacity:0,animation:"ci-panelIn 0.7s 2.7s cubic-bezier(0.16,1,0.3,1) both"}}>
          <div style={{width:40,height:".5px",background:`linear-gradient(to left,${G}88,transparent)`,animation:"ci-ruleGrow 0.8s 2.7s cubic-bezier(0.16,1,0.3,1) both",transformOrigin:"right"}}/>
          <div style={{width:5,height:5,background:G,transform:"rotate(45deg)",boxShadow:`0 0 8px ${G}88`}}/>
          <span style={{fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:"0.38em",color:G,textTransform:"uppercase",opacity:0,animation:"ci-hudFade 0.6s 2.9s ease both"}}>Est. MMXIV</span>
          <div style={{width:5,height:5,background:G,transform:"rotate(45deg)",boxShadow:`0 0 8px ${G}88`}}/>
          <div style={{width:40,height:".5px",background:`linear-gradient(to right,${G}88,transparent)`,animation:"ci-ruleGrow 0.8s 2.7s cubic-bezier(0.16,1,0.3,1) both",transformOrigin:"left"}}/>
        </div>

        {/* AURUM letters — glow breathing evolves by phase */}
        <div style={{display:"flex",gap:"0.04em",lineHeight:1,position:"relative",marginBottom:2}}>
          {LETTERS.map((l,i)=>(
            <span key={i} style={{
              fontFamily:"'Cormorant Garamond',Georgia,serif",
              fontSize:"clamp(60px,9vw,108px)",fontWeight:300,color:G,
              letterSpacing:"0.08em",display:"inline-block",
              opacity:0,
              animation:`ci-letterDrop 1.0s ${l.dl} cubic-bezier(0.34,1.2,0.64,1) both`,
              willChange:"transform,opacity,filter",
            }}>{l.ch}</span>
          ))}
          {/* Phase 4: emphasis scale pulse on logo text */}
          {isPhase(4) && (
            <div style={{position:"absolute",inset:0,pointerEvents:"none",animation:"ci-emphasisScale 2.4s ease-in-out infinite"}}/>
          )}
          {/* Triple shimmer: 3.8s, 5.5s, 11.0s */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",borderRadius:2}}>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(105deg,transparent 15%,${GL}60 45%,rgba(255,240,180,.88) 50%,${GL}60 55%,transparent 85%)`,animation:"ci-shimmer1 1.0s 3.8s cubic-bezier(0.16,1,0.3,1) both",willChange:"transform"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(105deg,transparent 20%,${GL}40 50%,transparent 80%)`,animation:"ci-shimmer2 1.2s 5.5s cubic-bezier(0.16,1,0.3,1) both",willChange:"transform"}}/>
            <div style={{position:"absolute",inset:0,background:`linear-gradient(105deg,transparent 18%,${GL}55 48%,rgba(255,246,200,.75) 50%,${GL}55 52%,transparent 82%)`,animation:"ci-shimmer3 1.0s 11.0s cubic-bezier(0.16,1,0.3,1) both",willChange:"transform"}}/>
          </div>
          {/* Phase-evolving logo glow */}
          <div style={{position:"absolute",inset:0,pointerEvents:"none",display:"flex",gap:"0.04em",letterSpacing:"0.08em",fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(60px,9vw,108px)",fontWeight:300,color:"transparent",filter:`blur(${cinematicPhase>=4?"18px":"12px"})`,opacity:cinematicPhase>=4?.65:.42,
            animation: logoAnim,
            willChange:"filter,transform,opacity",
            transition:"opacity 2s cubic-bezier(0.16,1,0.3,1), filter 2s cubic-bezier(0.16,1,0.3,1)",
          }}>
            {["A","U","R","U","M"].map((ch,i)=><span key={i} style={{color:G}}>{ch}</span>)}
          </div>
        </div>

        {/* Ornamental rules */}
        <div style={{display:"flex",alignItems:"center",gap:12,width:"clamp(200px,40vw,440px)",marginTop:8,marginBottom:14,opacity:0,animation:"ci-panelIn 0.6s 3.6s cubic-bezier(0.16,1,0.3,1) both"}}>
          <div style={{flex:1,height:".5px",background:`linear-gradient(to left,${G}66,transparent)`,transformOrigin:"right",animation:"ci-ruleGrow 0.9s 3.6s cubic-bezier(0.16,1,0.3,1) both"}}/>
          <svg width="12" height="12" viewBox="0 0 12 12" style={{flexShrink:0}}>
            <rect x="2" y="2" width="8" height="8" transform="rotate(45,6,6)" fill="none" stroke={G} strokeWidth="1" strokeOpacity=".8"/>
            <circle cx="6" cy="6" r="1.5" fill={G} fillOpacity=".9"/>
          </svg>
          <div style={{flex:1,height:".5px",background:`linear-gradient(to right,${G}66,transparent)`,transformOrigin:"left",animation:"ci-ruleGrow 0.9s 3.6s cubic-bezier(0.16,1,0.3,1) both"}}/>
        </div>

        <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,letterSpacing:"0.45em",textTransform:"uppercase",color:G,marginBottom:14,opacity:0,animation:"ci-tagWipe 0.9s 4.0s cubic-bezier(0.16,1,0.3,1) both"}}>Restaurant Group</div>
        <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(14px,2vw,18px)",fontStyle:"italic",fontWeight:300,color:`rgba(245,240,232,0.44)`,letterSpacing:"0.05em",marginBottom:20,opacity:0,animation:"ci-tagWipe 1.1s 4.4s cubic-bezier(0.16,1,0.3,1) both"}}>Where every moment is crafted</div>

        {/* Stars */}
        <div style={{display:"flex",gap:14,marginBottom:20}}>
          {["\u2605","\u2605","\u2605"].map((s,i)=>(
            <span key={i} style={{fontSize:18,color:G,opacity:0,textShadow:`0 0 12px ${G}99`,animation:`ci-starPop 0.7s ${(4.8+i*0.15).toFixed(2)}s cubic-bezier(0.34,1.2,0.64,1) both`}}>{s}</span>
          ))}
        </div>

        {/* Phase 3 — Animated prestige counters */}
        <div style={{display:"flex",alignItems:"stretch",gap:0,borderTop:`1px solid ${G}22`,borderBottom:`1px solid ${G}22`,paddingTop:14,paddingBottom:14,marginBottom:20,width:"100%"}}>
          {STATS.map((st,i)=>(
            <div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1,borderRight:i<STATS.length-1?`1px solid ${G}22`:"none",opacity:0,
              animation:`ci-counterIn 0.65s ${(5.0+i*0.12).toFixed(2)}s cubic-bezier(0.34,1.2,0.64,1) both`,
            }}>
              <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(20px,3vw,28px)",fontWeight:500,color:G,lineHeight:1,
                animation: isPhase(3) ? `ci-counterGlow 2.8s ${i*0.4}s ease-in-out infinite` : "none",
              }}>{st.num}</div>
              <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:"0.22em",color:`rgba(245,240,232,0.4)`,textTransform:"uppercase",marginTop:5}}>{st.label}</div>
            </div>
          ))}
        </div>

        {/* ACT IV: Accolade badges (7.5s) */}
        <div style={{width:"100%",display:"flex",flexDirection:"column",gap:7,marginBottom:20}}>
          {ACCOLADES.map((a,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"9px 14px",background:`linear-gradient(135deg,rgba(201,168,76,.06),rgba(201,168,76,.02))`,borderRadius:8,border:`1px solid rgba(201,168,76,.14)`,opacity:0,animation:`ci-accoladeIn 0.7s ${(7.5+i*0.28).toFixed(2)}s cubic-bezier(0.16,1,0.3,1) both`}}>
              <div style={{width:26,height:26,borderRadius:6,flexShrink:0,background:`linear-gradient(135deg,${G}28,${G}0a)`,border:`1px solid ${G}30`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:G,textShadow:`0 0 8px ${G}`}}>{a.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:11,fontWeight:500,color:`rgba(245,240,232,.72)`,letterSpacing:".02em"}}>{a.label}</div>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8.5,color:G,opacity:.65,letterSpacing:".1em",marginTop:2}}>{a.sub}</div>
              </div>
              <div style={{width:5,height:5,borderRadius:"50%",background:G,flexShrink:0,opacity:0,animation:`ci-starPop 0.4s ${(8+i*0.28).toFixed(2)}s ease both, ci-corePulse 2.5s ${(8.5+i*0.4).toFixed(1)}s ease-in-out infinite`}}/>
            </div>
          ))}
        </div>

        {/* ACT IV: Philosophy quote (9.2s) */}
        <div style={{width:"100%",padding:"14px 18px",marginBottom:20,background:`linear-gradient(135deg,rgba(201,168,76,.04),transparent)`,borderLeft:`2px solid ${G}44`,opacity:0,animation:"ci-quoteReveal 1.4s 9.2s cubic-bezier(0.16,1,0.3,1) both"}}>
          <div style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontSize:"clamp(13px,1.8vw,17px)",fontStyle:"italic",fontWeight:300,color:`rgba(245,240,232,.38)`,letterSpacing:".05em",lineHeight:1.75}}>
            "The art of hospitality is to make guests feel at home when you wish they were."
          </div>
          <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:".25em",color:G,opacity:.5,marginTop:8,textTransform:"uppercase"}}>\u2014 Aurum Philosophy</div>
        </div>

        {/* ACT V: Legacy timeline (10.8s) */}
        <div style={{width:"100%",opacity:0,animation:"ci-hudFade 0.8s 10.8s ease both"}}>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
            <div style={{flex:1,height:".5px",background:`linear-gradient(to right,transparent,${G}44)`,transformOrigin:"left",animation:"ci-ruleGrow 0.8s 10.8s ease both"}}/>
            <span style={{fontFamily:"'DM Mono',monospace",fontSize:8,letterSpacing:".32em",color:G,opacity:.55,textTransform:"uppercase"}}>Legacy</span>
            <div style={{flex:1,height:".5px",background:`linear-gradient(to left,transparent,${G}44)`,transformOrigin:"right",animation:"ci-ruleGrow 0.8s 10.8s ease both"}}/>
          </div>
          <div style={{display:"flex",alignItems:"flex-start"}}>
            {TIMELINE.map((item,i)=>(
              <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",position:"relative"}}>
                {i > 0 && <div style={{position:"absolute",right:"50%",top:4,left:"-50%",height:".5px",background:`rgba(201,168,76,.3)`,transformOrigin:"left",animation:`ci-ruleGrow 0.4s ${(11.1+i*0.15).toFixed(2)}s ease both`}}/>}
                <div style={{width:8,height:8,borderRadius:"50%",zIndex:1,background:i===4?G:`rgba(201,168,76,.3)`,border:`1px solid ${G}66`,boxShadow:i===4?`0 0 10px ${G}`:"none",opacity:0,animation:`ci-timelineDot 0.5s ${(11.0+i*0.15).toFixed(2)}s cubic-bezier(0.34,1.2,0.64,1) both`}}/>
                <div style={{fontFamily:"'DM Mono',monospace",fontSize:8,color:G,opacity:.7,marginTop:6,letterSpacing:".1em"}}>{item.year}</div>
                <div style={{fontFamily:"'DM Sans',sans-serif",fontSize:7,color:`rgba(245,240,232,.4)`,marginTop:2,letterSpacing:".06em",textAlign:"center"}}>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* HUD / Progress */}
      <div aria-hidden="true" style={{position:"absolute",bottom:28,left:"8%",right:"8%",display:"flex",flexDirection:"column",alignItems:"center",gap:10,opacity:0,animation:"ci-hudFade 0.7s 3.6s ease both",zIndex:6}}>
        <div style={{display:"flex",alignItems:"center",gap:10,fontFamily:"'DM Mono',monospace",fontSize:9,letterSpacing:".2em",color:`${G}80`,textTransform:"uppercase"}}>
          <div style={{display:"flex",gap:5}}>{[0,1,2].map(j=><div key={j} style={{width:5,height:5,borderRadius:"50%",background:G,animation:`ci-dotBlink 1.6s ${j*0.28}s ease-in-out infinite`}}/>)}</div>
          <span>Initializing Secure Session</span>
          <div style={{display:"flex",gap:5}}>{[0,1,2].map(j=><div key={j} style={{width:5,height:5,borderRadius:"50%",background:G,animation:`ci-dotBlink 1.6s ${(2-j)*0.28}s ease-in-out infinite`}}/>)}</div>
        </div>
        <div style={{width:"100%",height:1.5,background:`rgba(201,168,76,.1)`,borderRadius:1,overflow:"hidden"}}>
          <div style={{height:"100%",background:`linear-gradient(to right,${G}88,${GL},${G}88)`,borderRadius:1,animation:"ci-progress 13.5s 0.8s cubic-bezier(0.16,1,0.3,1) both, ci-progressGlow 2s 1.5s ease-in-out infinite",willChange:"width"}}/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:16,fontFamily:"'DM Sans',sans-serif",fontSize:9,letterSpacing:".25em",color:`${G}44`,textTransform:"uppercase"}}>
          <span>Est. MMXIV</span><div style={{width:3,height:3,background:G,opacity:.3,transform:"rotate(45deg)"}}/>
          <span>Three Michelin Stars</span><div style={{width:3,height:3,background:G,opacity:.3,transform:"rotate(45deg)"}}/>
          <span>40+ Venues</span>
        </div>
      </div>

      {/* Golden flash */}
      {flashOn && (
        <div aria-hidden="true" style={{position:"absolute",inset:0,background:`radial-gradient(ellipse 60% 60% at 50% 50%,${GL} 0%,${G}cc 30%,${G}22 65%,transparent 100%)`,animation:"ci-flash 1.0s cubic-bezier(0.16,1,0.3,1) both",pointerEvents:"none",zIndex:10}}/>
      )}
    </div>
  );
};

// BACKGROUND LAYERS
// ─────────────────────────────────────────────────────────────

const AstronomicalMandala = ({ gold }) => {
  const outerR = 345, innerR = 65;
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * 2 * Math.PI;
    const isMaj = i % 8 === 0, isMed = i % 4 === 0;
    const len = isMaj ? 16 : isMed ? 9 : 4;
    return {
      cx: 400 + Math.cos(a) * outerR, cy: 400 + Math.sin(a) * outerR,
      ox: 400 + Math.cos(a) * (outerR - len), oy: 400 + Math.sin(a) * (outerR - len),
      isMaj, isMed,
    };
  });
  const radials = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * 2 * Math.PI;
    return { x1: 400 + Math.cos(a) * innerR, y1: 400 + Math.sin(a) * innerR, x2: 400 + Math.cos(a) * outerR, y2: 400 + Math.sin(a) * outerR, major: i % 3 === 0 };
  });
  const diamonds = [0,45,90,135,180,225,270,315].map(deg => {
    const a = deg * Math.PI / 180, r = deg % 90 === 0 ? outerR : 280;
    return { cx: 400 + Math.cos(a) * r, cy: 400 + Math.sin(a) * r, size: deg % 90 === 0 ? 5 : 3, deg };
  });
  const hex1 = Array.from({length:6},(_,i)=>{ const a=(i/6)*2*Math.PI; return `${400+Math.cos(a)*160},${400+Math.sin(a)*160}`; }).join(" ");
  const hex2 = Array.from({length:6},(_,i)=>{ const a=(i/6)*2*Math.PI+Math.PI/6; return `${400+Math.cos(a)*160},${400+Math.sin(a)*160}`; }).join(" ");
  const oct  = Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return `${400+Math.cos(a)*220},${400+Math.sin(a)*220}`; }).join(" ");

  return (
    <svg viewBox="0 0 800 800" aria-hidden="true" style={{ position:"absolute", width:"162%", height:"162%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", overflow:"visible" }}>
      <defs>
        <radialGradient id="mgCG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={gold} stopOpacity="0.3" />
          <stop offset="55%"  stopColor={gold} stopOpacity="0.07" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mgIG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={gold} stopOpacity="0.22" />
          <stop offset="100%" stopColor={gold} stopOpacity="0"    />
        </radialGradient>
        <filter id="mgBlur"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>

      {/* Outer rotating ring + ticks */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpin 120s linear infinite", willChange:"transform" }}>
        <circle cx="400" cy="400" r={outerR} fill="none" stroke={gold} strokeWidth=".7" strokeOpacity=".2"/>
        <circle cx="400" cy="400" r={outerR-10} fill="none" stroke={gold} strokeWidth=".3" strokeOpacity=".07" strokeDasharray="2 6"/>
        {ticks.map((tk,i)=>(
          <line key={i} x1={tk.cx} y1={tk.cy} x2={tk.ox} y2={tk.oy} stroke={gold}
            strokeWidth={tk.isMaj?1.2:tk.isMed?.6:.35}
            strokeOpacity={tk.isMaj?.38:tk.isMed?.2:.1}
          />
        ))}
        {diamonds.map((d,i)=>(
          <g key={i} transform={`translate(${d.cx},${d.cy}) rotate(${d.deg+45})`}>
            <rect x={-d.size} y={-d.size} width={d.size*2} height={d.size*2} fill="none" stroke={gold} strokeWidth={i%2===0?.9:.5} strokeOpacity={i%2===0?.5:.25}/>
          </g>
        ))}
      </g>

      {/* Inner counter-rotating geometry */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpinR 80s linear infinite", willChange:"transform" }}>
        {[280,220,160,130,90,65].map((r,i)=>(
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke={gold}
            strokeWidth={i===0||i===5?.6:.4}
            strokeOpacity={[.14,.12,.16,.1,.08,.18][i]}
            strokeDasharray={i===1?"5 9":i===3?"3 12":undefined}
          />
        ))}
        {radials.map((l,i)=>(
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={gold} strokeWidth={l.major?.5:.3} strokeOpacity={l.major?.2:.08}/>
        ))}
        <polygon points={hex1} fill="none" stroke={gold} strokeWidth=".45" strokeOpacity=".14"/>
        <polygon points={hex2} fill="none" stroke={gold} strokeWidth=".45" strokeOpacity=".14"/>
        <polygon points={oct}  fill="none" stroke={gold} strokeWidth=".4"  strokeOpacity=".11"/>
        {/* Intersection dots */}
        {Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return <circle key={i} cx={400+Math.cos(a)*220} cy={400+Math.sin(a)*220} r="1.6" fill={gold} fillOpacity=".35"/>; })}
      </g>

      {/* Tertiary slow mid-ring */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpin 58s linear infinite", willChange:"transform" }}>
        <circle cx="400" cy="400" r="305" fill="none" stroke={gold} strokeWidth=".35" strokeOpacity=".09" strokeDasharray="8 16"/>
        {Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return <circle key={i} cx={400+Math.cos(a)*305} cy={400+Math.sin(a)*305} r="2" fill="none" stroke={gold} strokeWidth=".6" strokeOpacity=".3"/>; })}
      </g>

      {/* Glow fills */}
      <circle cx="400" cy="400" r="210" fill="url(#mgCG)"/>
      <circle cx="400" cy="400" r="72"  fill="url(#mgIG)"/>
      {/* Pulsing core */}
      <circle cx="400" cy="400" r="6.5" fill="none" stroke={gold} strokeWidth="1.2" strokeOpacity=".5" filter="url(#mgBlur)"/>
      <circle cx="400" cy="400" r="4"   fill="none" stroke={gold} strokeWidth=".8"  strokeOpacity=".7"/>
      <circle cx="400" cy="400" r="1.8" fill={gold} fillOpacity=".9" style={{ animation:"au-coreGlow 3s ease-in-out infinite" }}/>
    </svg>
  );
};

const StarField = ({ gold }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
  >
    {CONSTELLATION_LINES.map(([a,b,op],i)=>(
      <line key={i} x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y} stroke={gold} strokeWidth=".07" strokeOpacity={op}/>
    ))}
    {STARS.map((s,i)=>(
      <circle key={i} cx={s.x} cy={s.y} r={s.big?s.size*1.9:s.size} fill={gold}
        style={{ "--star-base":s.base, opacity:s.base, animation:`au-starTwinkle ${s.dur}s ${s.del}s ease-in-out infinite` }}
      />
    ))}
    {/* 3 shooting stars */}
    <line x1="12" y1="6"  x2="20" y2="9"  stroke={gold} strokeWidth=".22" strokeOpacity=".7" strokeLinecap="round" style={{ animation:"au-shoot1 14s 2s ease-out infinite" }}/>
    <line x1="70" y1="18" x2="76" y2="21" stroke={gold} strokeWidth=".16" strokeOpacity=".55" strokeLinecap="round" style={{ animation:"au-shoot2 19s 8s ease-out infinite" }}/>
    <line x1="45" y1="4"  x2="52" y2="7"  stroke={gold} strokeWidth=".19" strokeOpacity=".65" strokeLinecap="round" style={{ animation:"au-shoot3 22s 14s ease-out infinite" }}/>
  </svg>
);

const NebulaLayer = ({ t, isDark }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:isDark?1:.6 }}
  >
    <defs>
      <filter id="nb1"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="nb2"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    <ellipse cx="22" cy="22" rx="28" ry="22" fill={t.nebula1} filter="url(#nb2)" style={{ animation:"au-nebulaBreath 18s ease-in-out infinite" }}/>
    <ellipse cx="78" cy="80" rx="32" ry="25" fill={t.nebula2} filter="url(#nb2)" style={{ animation:"au-nebulaBreath 24s 4s ease-in-out infinite" }}/>
    <ellipse cx="85" cy="38" rx="14" ry="18" fill={t.nebula1} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 16s 8s ease-in-out infinite" }}/>
    <ellipse cx="15" cy="65" rx="18" ry="14" fill={t.nebula2} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 20s 2s ease-in-out infinite" }}/>
    <ellipse cx="52" cy="52" rx="10" ry="10" fill={t.nebula1} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 28s 12s ease-in-out infinite" }}/>
  </svg>
);

const AuroraBands = ({ t }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", top:"10%", height:"20%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora1} 30%, ${t.aurora2} 55%, ${t.aurora1} 72%, transparent 100%)`,
      transform:"rotate(-2deg)", animation:"au-aurora1 28s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", bottom:"16%", height:"15%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora2} 35%, ${t.aurora1} 62%, transparent 100%)`,
      transform:"rotate(1.5deg)", animation:"au-aurora2 34s 6s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", top:"52%", height:"10%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora1} 50%, transparent 100%)`,
      transform:"rotate(-1deg)", animation:"au-aurora1 22s 14s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
  </div>
);

/** 11-plane cinematic background */
const PanelBackground = ({ t, isDark }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>

    {/* P1 — Deep base gradient */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? `radial-gradient(ellipse 90% 65% at 18% 12%, rgba(201,168,76,.16) 0%, transparent 52%),
           radial-gradient(ellipse 70% 80% at 88% 95%, rgba(55,35,180,.2)   0%, transparent 58%),
           radial-gradient(ellipse 55% 55% at 60% 50%, rgba(8,5,22,.88)     0%, transparent 85%),
           linear-gradient(172deg, #05050e 0%, #090714 28%, #070511 58%, #040309 100%)`
        : `radial-gradient(ellipse 90% 65% at 18% 12%, rgba(160,120,40,.14) 0%, transparent 52%),
           radial-gradient(ellipse 70% 80% at 88% 95%, rgba(90,70,200,.08)  0%, transparent 58%),
           linear-gradient(172deg, #e4ddd0 0%, #d9d0c0 28%, #e0d8cc 58%, #eae3d8 100%)`,
    }}/>

    {/* P2 — Nebula colour clouds */}
    <NebulaLayer t={t} isDark={isDark}/>

    {/* P3 — Aurora bands */}
    <AuroraBands t={t}/>

    {/* P4 — Mandala (hero) */}
    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:isDark?1:.65 }}>
      <AstronomicalMandala gold={t.gold}/>
    </div>

    {/* P5 — Star field */}
    <div style={{ position:"absolute", inset:0, opacity:isDark?1:.28 }}>
      <StarField gold={t.gold}/>
    </div>

    {/* P6 — Warm gold orb top-left */}
    <div style={{ position:"absolute", width:750, height:750, borderRadius:"50%", top:"-300px", left:"-220px", background:`radial-gradient(circle, ${t.orb1} 0%, transparent 60%)`, animation:"au-orbFloat 28s ease-in-out infinite", willChange:"transform" }}/>

    {/* P7 — Cool deep-space orb bottom-right */}
    <div style={{ position:"absolute", width:560, height:560, borderRadius:"50%", bottom:"-200px", right:"-140px", background:`radial-gradient(circle, ${t.orb2} 0%, transparent 62%)`, animation:"au-orbFloat2 38s ease-in-out infinite", willChange:"transform" }}/>

    {/* P8 — Mid accent orb */}
    <div style={{ position:"absolute", width:340, height:340, borderRadius:"50%", top:"35%", right:"5%", background:`radial-gradient(circle, ${t.nebula2} 0%, transparent 65%)`, animation:"au-orbFloat3 46s ease-in-out infinite", willChange:"transform" }}/>

    {/* P9 — Cinematic vignette */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? "radial-gradient(ellipse 68% 78% at 38% 44%, transparent 28%, rgba(3,2,8,.72) 68%, rgba(1,0,4,.96) 100%)"
        : "radial-gradient(ellipse 68% 78% at 38% 44%, transparent 28%, rgba(90,80,60,.25) 68%, rgba(70,58,40,.52) 100%)",
    }}/>

    {/* P10 — Dense film grain */}
    <div style={{
      position:"absolute", inset:"-80px", opacity:isDark?.065:.045,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundSize:"200px", mixBlendMode:isDark?"screen":"multiply", pointerEvents:"none",
    }}/>

    {/* P11 — Scanlines */}
    <div style={{
      position:"absolute", inset:0,
      backgroundImage:`repeating-linear-gradient(0deg, transparent, transparent 3px, ${isDark?"rgba(0,0,0,.07)":"rgba(0,0,0,.028)"} 3px, ${isDark?"rgba(0,0,0,.07)":"rgba(0,0,0,.028)"} 4px)`,
      pointerEvents:"none",
    }}/>

    {/* Seam dissolve into right panel */}
    <div style={{
      position:"absolute", right:0, top:0, bottom:0, width:"40%",
      background: isDark ? "linear-gradient(to right, transparent, rgba(3,2,8,.62))" : "linear-gradient(to right, transparent, rgba(220,214,200,.58))",
    }}/>
  </div>
);

// ─────────────────────────────────────────────────────────────
// RIGHT PANEL — CINEMATIC BACKGROUND SYSTEM
// ─────────────────────────────────────────────────────────────

/* ── Deterministic data ── */

/** 10 bokeh spheres — dimmed opacity set on render */
const BOKEH = Array.from({ length: 10 }, (_, i) => {
  const s1 = (i * 1664525 + 1013904223) >>> 0;
  const s2 = (i * 2654435761)           >>> 0;
  const s3 = (i * 1812433253)           >>> 0;
  return {
    x:    (s1 % 10000) / 100,
    y:    (s2 % 10000) / 100,
    size: 90 + (s3 % 180),
    dur:  26 + (s1 % 28),
    del:  (s2 % 16),
    anim: ["rp-bokeh1","rp-bokeh2","rp-bokeh3","rp-bokeh4"][i % 4],
    layer: i % 3,
  };
});

/** 20 ascending particles */
const PARTICLES = Array.from({ length: 20 }, (_, i) => {
  const s1 = (i * 1013904223) >>> 0;
  const s2 = (i * 6364136223) >>> 0;
  const s3 = (i * 1664525)    >>> 0;
  const dx = ((s1 % 300) - 150) / 10;
  const dy = -35 - (s2 % 45);
  return {
    x:   (s1 % 10000) / 100,
    y:   (s2 % 10000) / 100,
    size: 0.7 + (s3 % 80) / 65,
    dur:  5 + (s1 % 55) / 10,
    del:  (s2 % 80) / 10,
    op:   0.12 + (s3 % 80) / 320,
    dx,
    dy,
  };
});

/** Wireframe geometry elements floating behind card */
const GEO_ELEMENTS = [
  { type:"diamond", x:8,  y:14, size:32, dur:18, del:0,  anim:"rp-geoFloat1" },
  { type:"diamond", x:88, y:22, size:20, dur:24, del:5,  anim:"rp-geoFloat2" },
  { type:"cross",   x:14, y:68, size:14, dur:20, del:8,  anim:"rp-geoFloat1" },
  { type:"diamond", x:82, y:75, size:26, dur:30, del:3,  anim:"rp-geoFloat2" },
  { type:"cross",   x:50, y:8,  size:10, dur:22, del:12, anim:"rp-geoFloat1" },
  { type:"diamond", x:92, y:50, size:16, dur:28, del:7,  anim:"rp-geoFloat2" },
  { type:"cross",   x:6,  y:40, size:12, dur:19, del:15, anim:"rp-geoFloat1" },
];

/** Data stream vertical lines */
const DATA_STREAMS = Array.from({ length: 6 }, (_, i) => {
  const s = (i * 1664525 + 22695477) >>> 0;
  return {
    x:   10 + (s % 80),
    dur: 6 + (i * 2.4),
    del: i * 1.8,
    len: 60 + (s % 80),
  };
});

/* ── Hook: mouse parallax ── */
function useMouseParallax(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref?.current || window;
    let raf;
    const onMove = e => {
      raf && cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const bounds = ref?.current?.getBoundingClientRect?.() || { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
        const rx = ((e.clientX - bounds.left) / bounds.width  - 0.5) * 2;
        const ry = ((e.clientY - bounds.top)  / bounds.height - 0.5) * 2;
        setPos({ x: rx, y: ry });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); raf && cancelAnimationFrame(raf); };
  }, []);
  return pos;
}

/* ── Sub-components ── */

const RightPanelBokeh = ({ t, isDark }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    {BOKEH.map((b, i) => {
      const baseColor = b.layer === 0 ? t.gold : b.layer === 1 ? t.orb2 : t.nebula1;
      const opacity   = isDark ? [0.07, 0.05, 0.04][b.layer] : [0.05, 0.035, 0.025][b.layer];
      return (
        <div key={i} style={{
          position:"absolute", left:`${b.x}%`, top:`${b.y}%`,
          width:b.size, height:b.size, borderRadius:"50%",
          background:`radial-gradient(circle, ${baseColor} 0%, transparent 70%)`,
          opacity, filter:`blur(${16 + b.layer * 8}px)`,
          animation:`${b.anim} ${b.dur}s ${b.del}s ease-in-out infinite`,
          willChange:"transform", transform:"translate(-50%,-50%)",
        }}/>
      );
    })}
  </div>
);

const RightPanelParticles = ({ t }) => (
  <svg aria-hidden="true" style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"hidden", pointerEvents:"none" }}>
    {PARTICLES.map((p, i) => (
      <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.size} fill={t.gold}
        style={{
          "--p-op":`${p.op}`, "--p-vy":`${p.dy}px`, "--p-vx":`${p.dx}px`,
          opacity:0, animation:`rp-particleWander ${p.dur}s ${p.del}s ease-in-out infinite`,
          willChange:"transform,opacity",
        }}
      />
    ))}
  </svg>
);

const RightPanelScanLine = ({ t, isDark }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    <div style={{
      position:"absolute", left:0, right:0, height:"1px",
      background:`linear-gradient(90deg,transparent 0%,${t.gold}18 20%,${t.goldLight}30 50%,${t.gold}18 80%,transparent 100%)`,
      boxShadow:`0 0 8px 1px ${t.gold}14`,
      animation:"rp-scanGlide 14s 4s cubic-bezier(0.4,0,0.6,1) infinite",
      willChange:"transform,opacity", opacity: isDark ? 1 : 0.5,
    }}/>
  </div>
);

/** Floating wireframe diamonds and crosshairs */
const RightPanelGeometry = ({ t, isDark }) => (
  <svg aria-hidden="true" className="rp-geometry"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"visible", pointerEvents:"none" }}
    viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
  >
    {GEO_ELEMENTS.map((g, i) => {
      const op = isDark ? 0.22 : 0.12;
      const stroke = t.gold;
      if (g.type === "diamond") {
        const hs = g.size / 2 / 100 * 100; /* % units */
        const pts = `${g.x},${g.y - hs/1.8} ${g.x + hs/1.4},${g.y} ${g.x},${g.y + hs/1.8} ${g.x - hs/1.4},${g.y}`;
        return (
          <polygon key={i} points={pts} fill="none" stroke={stroke} strokeWidth=".3"
            strokeOpacity={op} style={{ animation:`${g.anim} ${g.dur}s ${g.del}s ease-in-out infinite` }}
          />
        );
      }
      const s = g.size / 2 / 100 * 100;
      return (
        <g key={i} style={{ animation:`${g.anim} ${g.dur}s ${g.del}s ease-in-out infinite` }}>
          <line x1={g.x - s/1.5} y1={g.y} x2={g.x + s/1.5} y2={g.y} stroke={stroke} strokeWidth=".25" strokeOpacity={op}/>
          <line x1={g.x} y1={g.y - s/1.5} x2={g.x} y2={g.y + s/1.5} stroke={stroke} strokeWidth=".25" strokeOpacity={op}/>
          <circle cx={g.x} cy={g.y} r={s/4} fill="none" stroke={stroke} strokeWidth=".2" strokeOpacity={op * 0.6}/>
        </g>
      );
    })}
  </svg>
);

/** Flowing vertical data-line streams */
const RightPanelDataStreams = ({ t, isDark }) => (
  <svg aria-hidden="true" className="rp-datastream"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", overflow:"hidden", pointerEvents:"none" }}
    viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice"
  >
    {DATA_STREAMS.map((ds, i) => (
      <g key={i}>
        {/* Track */}
        <line x1={ds.x} y1="0" x2={ds.x} y2="100"
          stroke={t.gold} strokeWidth=".08" strokeOpacity={isDark ? 0.06 : 0.03}/>
        {/* Flowing segment */}
        <line x1={ds.x} y1="0" x2={ds.x} y2="100"
          stroke={t.gold} strokeWidth=".18"
          strokeDasharray={`${ds.len / 100 * 100} 200`}
          strokeOpacity={isDark ? 0.28 : 0.14}
          style={{ animation:`rp-dataFlow ${ds.dur}s ${ds.del}s linear infinite`, willChange:"stroke-dashoffset,opacity" }}
        />
        {/* Node dots at 25%, 50%, 75% */}
        {[25,50,75].map((pct, j) => (
          <circle key={j} cx={ds.x} cy={pct} r="0.55" fill={t.gold}
            fillOpacity={isDark ? 0.22 : 0.1}
            style={{ animation:`rp-dataNode ${ds.dur * 0.6}s ${ds.del + j * 0.8}s ease-in-out infinite` }}
          />
        ))}
      </g>
    ))}
  </svg>
);

/** Security lock badge — sits at very bottom of card */
const SecurityBadge = ({ t, isDark }) => (
  <div aria-hidden="true" style={{
    display:"flex", alignItems:"center", justifyContent:"center", gap:8,
    marginTop:20, opacity: isDark ? 0.38 : 0.28,
  }}>
    {/* Animated ping ring + lock */}
    <div style={{ position:"relative", width:14, height:14, flexShrink:0 }}>
      <div style={{
        position:"absolute", inset:0, borderRadius:"50%",
        border:`1px solid ${t.gold}`,
        animation:"rp-secRing 2.4s 0.5s ease-out infinite",
        willChange:"transform,opacity",
      }}/>
      <div style={{
        position:"absolute", inset:"3px", borderRadius:"50%",
        background:t.gold, opacity:0.55,
        animation:"rp-secDot 2.4s ease-in-out infinite",
      }}/>
    </div>
    <span style={{ fontSize:9, letterSpacing:"0.22em", textTransform:"uppercase", color:t.textMuted, fontFamily:"'DM Mono',monospace" }}>
      256-bit encrypted
    </span>
    <svg width="9" height="11" viewBox="0 0 9 11" fill="none" aria-hidden="true">
      <rect x=".8" y="4.5" width="7.4" height="6" rx="1.2" fill={t.gold} fillOpacity=".45"/>
      <path d="M2.2 4.5V3a2.3 2.3 0 1 1 4.6 0v1.5" stroke={t.gold} strokeWidth=".9" strokeOpacity=".6" fill="none"/>
      <circle cx="4.5" cy="7.4" r=".9" fill={t.gold} fillOpacity=".7"/>
    </svg>
  </div>
);

/** Card ambient aura bloom */
const CardAura = ({ t, isDark, mx, my }) => {
  const ox = (mx || 0) * 18;
  const oy = (my || 0) * 18;
  return (
    <div aria-hidden="true" style={{
      position:"absolute", left:"50%", top:"50%",
      width:"480px", height:"480px", borderRadius:"50%",
      transform:`translate(calc(-50% + ${ox}px), calc(-50% + ${oy}px))`,
      background:`radial-gradient(circle, ${t.goldGlow} 0%, ${t.goldDim} 30%, transparent 68%)`,
      filter:"blur(40px)",
      animation:"rp-cardAura 8s ease-in-out infinite",
      willChange:"transform,opacity",
      opacity: isDark ? 0.9 : 0.55,
      pointerEvents:"none", zIndex:0,
      transition:"transform 0.8s cubic-bezier(0.16,1,0.3,1)",
    }}/>
  );
};

/** Ambient spotlight that follows mouse — very subtle */
const AmbientSpotlight = ({ t, isDark, mx, my }) => {
  const lx = 50 + (mx || 0) * 28;
  const ly = 50 + (my || 0) * 28;
  return (
    <div aria-hidden="true" style={{
      position:"absolute", inset:0, pointerEvents:"none",
      background:`radial-gradient(ellipse 55% 45% at ${lx}% ${ly}%, ${t.goldDim} 0%, transparent 65%)`,
      animation:"rp-spotBreath 10s ease-in-out infinite",
      opacity: isDark ? 1 : 0.5,
      transition:"background 0.6s cubic-bezier(0.16,1,0.3,1)",
    }}/>
  );
};

/** Full orchestrator */
const RightPanelBackground = ({ t, isDark, mx, my }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>

    {/* L1 — Dark base field */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? `radial-gradient(ellipse 85% 55% at 50% 0%,   rgba(201,168,76,.06) 0%, transparent 55%),
           radial-gradient(ellipse 55% 65% at 88% 95%,  rgba(55,35,180,.07)  0%, transparent 55%),
           radial-gradient(ellipse 40% 38% at 12% 60%,  rgba(201,168,76,.04) 0%, transparent 58%)`
        : `radial-gradient(ellipse 80% 55% at 50% 0%,   rgba(160,120,40,.055) 0%, transparent 55%),
           radial-gradient(ellipse 50% 55% at 85% 90%,  rgba(90,70,200,.03)  0%, transparent 55%)`,
    }}/>

    {/* L2 — Grid mesh — very faint */}
    <div className="rp-grid" style={{
      backgroundImage:`
        linear-gradient(${t.gold}0d 1px, transparent 1px),
        linear-gradient(90deg, ${t.gold}0d 1px, transparent 1px)`,
      backgroundSize:"56px 56px",
    }}/>

    {/* L3 — Floating geometric wireframes */}
    <RightPanelGeometry t={t} isDark={isDark}/>

    {/* L4 — Data streams */}
    <RightPanelDataStreams t={t} isDark={isDark}/>

    {/* L5 — Bokeh spheres */}
    <RightPanelBokeh t={t} isDark={isDark}/>

    {/* L6 — Micro-particles */}
    <RightPanelParticles t={t}/>

    {/* L7 — Mouse-reactive ambient spotlight */}
    <AmbientSpotlight t={t} isDark={isDark} mx={mx} my={my}/>

    {/* L8 — Horizontal scan line */}
    <RightPanelScanLine t={t} isDark={isDark}/>

    {/* L9 — Card aura bloom (mouse-reactive) */}
    <CardAura t={t} isDark={isDark} mx={mx} my={my}/>

    {/* L10 — Film grain */}
    <div style={{
      position:"absolute", inset:"-80px",
      opacity: isDark ? 0.032 : 0.018,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundSize:"200px", mixBlendMode: isDark?"screen":"multiply",
    }}/>

    {/* L11 — Edge vignette */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? "radial-gradient(ellipse 72% 78% at 50% 50%, transparent 30%, rgba(3,2,8,.48) 75%, rgba(2,1,6,.78) 100%)"
        : "radial-gradient(ellipse 72% 78% at 50% 50%, transparent 30%, rgba(190,182,168,.2) 75%, rgba(168,158,140,.38) 100%)",
    }}/>

    {/* L12 — Panel-level corner marks */}
    {["tl","tr","bl","br"].map((c,i) => (
      <div key={c} className={`rp-panel-corner ${c}`}
        style={{ borderColor:`${t.gold}30`, animationDelay:`${i*1.2}s` }}
      />
    ))}
  </div>
);
// ─────────────────────────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────────────────────────

function useGlobalStyles(css) {
  useEffect(() => {
    const id = "aurum-login-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, []);
}

function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString(navigator.language, { hour:"2-digit", minute:"2-digit", timeZoneName:"short" });
    setTime(fmt());
    const iv = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(iv);
  }, []);
  return time;
}

function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= bp : false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const h = e => setMobile(e.matches);
    mq.addEventListener("change", h);
    setMobile(mq.matches);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return mobile;
}

function useRipple(color) {
  const [ripples, setRipples] = useState([]);
  const fire = useCallback(e => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(rs => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples(rs => rs.filter(ri => ri.id !== id)), 900);
  }, []);
  const Ripples = () => (
    <>{ripples.map(rp => <span key={rp.id} aria-hidden="true" style={{ position:"absolute", left:rp.x, top:rp.y, width:12, height:12, borderRadius:"50%", background:color, pointerEvents:"none", animation:"au-ripple .85s var(--ease-out) forwards" }}/>)}</>
  );
  return { fire, Ripples };
}

// ─────────────────────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────────────────────

const LeftPanel = ({ t, ready, themeKey }) => {
  const isDark = themeKey !== "light";
  const D = delay => ready ? { opacity:1, animation:`au-fadeUp var(--motion-entrance) ${delay}ms var(--ease-luxury) both` } : { opacity:0 };
  return (
    <div role="complementary" aria-label="Aurum brand story" className="au-left" style={{ background:isDark?"#05050e":"#e8e2d6" }}>
      <PanelBackground t={t} isDark={isDark}/>

      {/* Glowing seam */}
      <div aria-hidden="true" style={{ position:"absolute", right:0, top:0, bottom:0, width:1, background:`linear-gradient(to bottom, transparent 0%, ${t.gold}22 12%, ${t.gold}75 38%, ${t.gold}75 62%, ${t.gold}22 88%, transparent 100%)`, boxShadow:`3px 0 22px ${t.gold}15` }}/>

      {/* Corner brackets */}
      {[{top:"20px",left:"20px",bT:true,bL:true},{top:"20px",right:"20px",bT:true,bR:true},{bottom:"20px",left:"20px",bB:true,bL:true},{bottom:"20px",right:"20px",bB:true,bR:true}].map((c,i)=>(
        <div key={i} aria-hidden="true" style={{ position:"absolute", top:c.top, bottom:c.bottom, left:c.left, right:c.right, width:24, height:24, zIndex:2, borderTop:c.bT?`1px solid ${t.gold}45`:"none", borderBottom:c.bB?`1px solid ${t.gold}45`:"none", borderLeft:c.bL?`1px solid ${t.gold}45`:"none", borderRight:c.bR?`1px solid ${t.gold}45`:"none", ...D(280+i*70) }}/>
      ))}

      {/* Logo */}
      <div style={{ position:"relative", zIndex:2, ...D(80) }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:18, animation:ready?"au-logoReveal 1.4s var(--ease-luxury) both":"none" }}>
          <div style={{ width:48, height:48, borderRadius:11, flexShrink:0, border:`1px solid ${t.gold}44`, background:`linear-gradient(135deg,${t.gold}22,${t.gold}06)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><polygon points="11,2 13.5,8.5 20.5,9 15.5,13.5 17,20.5 11,17 5,20.5 6.5,13.5 1.5,9 8.5,8.5" fill="none" stroke={t.gold} strokeWidth="1.3" strokeLinejoin="round"/></svg>
          </div>
          <div>
            <div className="au-font-display" style={{ fontSize:22, fontWeight:600, letterSpacing:"0.08em", color:t.textPrimary, lineHeight:1 }}>AURUM</div>
            <div style={{ fontSize:10, letterSpacing:"0.28em", color:t.gold, marginTop:4, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>Restaurant Group</div>
          </div>
        </div>
      </div>

      {/* Centrepiece copy */}
      <div style={{ position:"relative", zIndex:2, ...D(280) }}>
        <div style={{ height:1, marginBottom:32, background:`linear-gradient(to right,${t.gold}78,${t.gold}15)`, transformOrigin:"left", animation:ready?"au-drawLine 1.2s .4s var(--ease-luxury) both":"none" }}/>
        <div style={{ fontSize:10, letterSpacing:"0.3em", color:t.gold, textTransform:"uppercase", marginBottom:20, fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>Est. MMXIV</div>
        <h1 className="au-font-display" style={{ fontSize:"clamp(36px,3.6vw,56px)", fontWeight:300, lineHeight:1.1, color:t.textPrimary, letterSpacing:"-0.01em", marginBottom:24 }}>
          Where Every<br/><em style={{ color:t.gold, fontStyle:"italic" }}>Moment</em><br/>Is Crafted
        </h1>
        <p style={{ fontSize:14, lineHeight:1.78, color:t.textSecondary, maxWidth:290, fontWeight:300, fontFamily:"'DM Sans',sans-serif" }}>
          An invitation to those who appreciate the art of the extraordinary table.
        </p>
        <div style={{ display:"flex", gap:32, marginTop:32, ...D(580) }}>
          {[["18+","Years"],["3★","Michelin"],["40+","Venues"]].map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div className="au-font-display" style={{ fontSize:22, fontWeight:500, color:t.gold, lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:10, color:t.textMuted, letterSpacing:"0.2em", marginTop:5, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Michelin badge */}
      <div style={{ position:"relative", zIndex:2, ...D(680) }}>
        <div style={{ padding:"14px 18px", background:"rgba(255,255,255,0.025)", border:`1px solid ${t.gold}22`, borderRadius:14, backdropFilter:"blur(16px)", display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ width:38, height:38, borderRadius:"50%", flexShrink:0, background:`conic-gradient(${t.gold}55,transparent 70%)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ width:28, height:28, borderRadius:"50%", background:isDark?"#05050e":"#e8e2d6", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><polygon points="7,1 8.5,5 13,5.5 9.5,8.5 10.5,13 7,10.5 3.5,13 4.5,8.5 1,5.5 5.5,5" fill={t.gold}/></svg>
            </div>
          </div>
          <div>
            <div style={{ fontSize:12, color:t.textPrimary, fontWeight:500, fontFamily:"'DM Sans',sans-serif" }}>Michelin Recognized</div>
            <div style={{ fontSize:11, color:t.textMuted, marginTop:2, fontFamily:"'DM Sans',sans-serif" }}>Three stars of excellence</div>
          </div>
          <div style={{ marginLeft:"auto", color:t.gold, fontSize:14, letterSpacing:2 }} aria-label="3 Michelin stars">★★★</div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// INPUT FIELD
// ─────────────────────────────────────────────────────────────

const InputField = ({ id, label, type, value, onChange, error, t, suffix, autoComplete, animDelay, ready, hasError }) => {
  const [focused, setFocused] = useState(false);
  const [wasFocused, setWasFocused] = useState(false);
  const { fire, Ripples } = useRipple(`${t.gold}28`);
  const floating = focused || value.length > 0;
  const showError = hasError && error;

  const handleFocus = () => { setFocused(true); setWasFocused(true); };
  const handleBlur  = () => { setFocused(false); };

  return (
    <div style={{ opacity:ready?1:0, animation:ready?`au-fadeUp var(--motion-entrance) ${animDelay}ms var(--ease-luxury) both`:"none" }}>
      <div style={{ position:"relative", animation:showError?"au-shake .42s var(--ease-out)":"none" }} onClick={fire}>
        <label htmlFor={id} style={{ position:"absolute", left:16, zIndex:2, top:floating?10:"50%", transform:floating?"none":"translateY(-50%)", fontSize:floating?10:14, letterSpacing:floating?"0.16em":"0.01em", textTransform:floating?"uppercase":"none", color:focused?t.gold:showError?t.error:t.textMuted, fontWeight:500, fontFamily:"'DM Sans',sans-serif", pointerEvents:"none", transition:`all var(--motion-fast) var(--ease-luxury)` }}>{label}</label>
        <input id={id} type={type} value={value} onChange={onChange} onFocus={handleFocus} onBlur={handleBlur} autoComplete={autoComplete} aria-invalid={showError?"true":"false"} aria-describedby={showError?`${id}-error`:undefined}
          style={{ width:"100%", height:60, paddingTop:22, paddingBottom:8, paddingLeft:16, paddingRight:suffix?56:16, background:focused?t.bgInputFocus:t.bgInput, border:`1px solid ${showError?t.borderError:focused?t.borderFocus:t.border}`, borderRadius:12, color:t.textPrimary, fontSize:14, fontFamily:"'DM Sans',sans-serif", outline:"none", transition:`all var(--motion-fast) var(--ease-luxury)`, boxShadow:focused?t.shadowGold:showError?`0 0 0 2px ${t.borderError}22`:"none", animation:focused?"lp-inputGlowPulse 2.5s ease-in-out infinite":"none", backdropFilter:"blur(12px)" }}
        />
        {/* Animated underline */}
        <div aria-hidden="true" style={{ position:"absolute", bottom:0, left:14, right:14, height:1.5, borderRadius:"0 0 1px 1px", background:`linear-gradient(90deg,${t.gold},${t.goldLight},${t.gold})`, transform:`scaleX(${focused?1:0})`, transformOrigin:"left", transition:`transform var(--motion-fast) var(--ease-luxury)` }}/>
        {/* Focus sweep shimmer — triggers each time field receives focus */}
        {focused && (
          <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:12, pointerEvents:"none" }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(105deg,transparent 25%,${t.gold}18 50%,transparent 75%)`, animation:"rp-inputSweep .7s var(--ease-luxury) forwards" }}/>
          </div>
        )}
        {/* Error state inner glow */}
        {showError && (
          <div aria-hidden="true" style={{ position:"absolute", inset:0, borderRadius:12, boxShadow:`inset 0 0 14px ${t.borderError}18`, pointerEvents:"none" }}/>
        )}
        <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", borderRadius:12, pointerEvents:"none" }}><Ripples/></div>
        {suffix && <div style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)" }}>{suffix}</div>}
      </div>
      {showError && (
        <div id={`${id}-error`} role="alert" style={{ marginTop:8, display:"flex", alignItems:"center", gap:6, animation:`au-fadeUp var(--motion-fast) var(--ease-luxury) both` }}>
          <AlertCircle size={13} color={t.error} aria-hidden="true" strokeWidth={2}/>
          <span style={{ fontSize:12, color:t.error, fontFamily:"'DM Sans',sans-serif" }}>{error}</span>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// SUCCESS SCREEN
// ─────────────────────────────────────────────────────────────

const SuccessScreen = ({ t, onReset }) => {
  const confetti = useMemo(() => {
    return Array.from({ length: 36 }, (_, i) => {
      const angle = (i / 36) * 360 + (Math.random() - 0.5) * 18;
      const dist = 60 + Math.random() * 130;
      const rad = (angle * Math.PI) / 180;

      return {
        id: i,
        cx: `${Math.cos(rad) * dist}px`,
        cy: `${Math.sin(rad) * dist}px`,
        cr: `${Math.random() * 680 - 340}deg`,
        color:
          i % 3 === 0
            ? t.gold
            : i % 3 === 1
            ? "rgba(255,255,255,0.45)"
            : t.goldLight,
        size: Math.random() * 6 + 2,
        round: Math.random() > 0.38,
        dur: 0.55 + Math.random() * 0.65,
        delay: Math.random() * 0.35
      };
    });
  }, [t.gold, t.goldLight]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Login successful"
      style={{
        textAlign: "center",
        position: "relative",
        animation:
          "lp-cardIn 1.0s .06s cubic-bezier(0.16,1,0.3,1) both"
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 10
        }}
      >
        {confetti.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              width: p.size,
              height: p.size,
              borderRadius: p.round ? "50%" : 2,
              background: p.color,
              "--cx": p.cx,
              "--cy": p.cy,
              "--cr": p.cr,
              animation: `au-confetti ${p.dur}s ${p.delay}s var(--ease-out) forwards`,
              willChange: "transform, opacity",
              transform: "translateZ(0)"
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          background: t.successBg,
          border: `1.5px solid ${t.success}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: `0 0 48px ${t.success}22, inset 0 1px 0 rgba(255,255,255,0.25)`,
          animation: "au-checkBounce .75s var(--ease-spring-sm) both",
          position: "relative",
          zIndex: 1
        }}
      >
        <svg
          width="32"
          height="26"
          viewBox="0 0 32 26"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 13L11 22L30 2"
            stroke={t.success}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="80"
            style={{
              animation:
                "au-checkDraw .65s .3s var(--ease-luxury) both"
            }}
          />
        </svg>
      </div>

      <h3
        className="au-font-display"
        style={{
          fontSize: 30,
          fontWeight: 400,
          color: t.textPrimary,
          marginBottom: 10,
          letterSpacing: "-0.01em"
        }}
      >
        Welcome to Aurum
      </h3>

      <p
        style={{
          fontSize: 14,
          color: t.textSecondary,
          lineHeight: 1.68,
          marginBottom: 28,
          fontFamily: "'DM Sans',sans-serif"
        }}
      >
        Your table is being prepared.
        <br />
        Redirecting you now.
      </p>

      <div
        style={{
          display: "flex",
          gap: 6,
          justifyContent: "center",
          marginBottom: 28
        }}
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: t.gold,
              animation: `au-pulseDot 1.2s ${i * 0.22}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <button
        onClick={onReset}
        className="au-focus-ring"
        style={{
          background: "none",
          border: `1px solid ${t.border}`,
          borderRadius: 10,
          padding: "11px 22px",
          color: t.textSecondary,
          fontSize: 12,
          letterSpacing: "0.1em",
          fontFamily: "'DM Sans',sans-serif",
          cursor: "pointer",
          transition:
            "all var(--motion-fast) var(--ease-luxury)"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = t.gold + "60";
          e.currentTarget.style.color = t.gold;
          e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = t.border;
          e.currentTarget.style.color = t.textSecondary;
          e.currentTarget.style.transform = "none";
        }}
      >
        ← Return to Login
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────
// LOGIN PAGE — ambient animation system
// ─────────────────────────────────────────────────────────────

/** 48 rising dust motes behind the login card */
const LP_DUST = Array.from({ length: 48 }, (_, i) => {
  const [rx, ry, rw, ro, rd, rdl, rvx, rvy, rvx2, rvy2] = lcg(i * 8191 + 4099, 10);
  return {
    left:   `${(rx * 92 + 4).toFixed(1)}%`,
    bottom: `${(ry * 50 + 5).toFixed(1)}%`,
    sz:  (0.8 + rw * 1.6).toFixed(1),
    op:  (0.1 + ro * 0.25).toFixed(2),
    vy:  `-${(55 + rd * 120).toFixed(0)}px`,
    vy2: `-${(90 + rd * 190).toFixed(0)}px`,
    vx:  `${((rvx - 0.5) * 28).toFixed(1)}px`,
    vx2: `${((rvx2 - 0.5) * 20).toFixed(1)}px`,
    dl:  (rdl * 12.0).toFixed(2),
    dr:  (5.0 + rw * 8.0).toFixed(2),
    gold: i % 6 === 0,
  };
});

/** 16 diagonal light streaks */
const LP_STREAKS = Array.from({ length: 16 }, (_, i) => {
  const [rx, rop, rdl, rdr] = lcg(i * 6271 + 2053, 4);
  return {
    left: `${(rx * 110 - 10).toFixed(1)}%`,
    op:   (0.012 + rop * 0.018).toFixed(3),
    dl:   (rdl * 20).toFixed(2),
    dr:   (14 + rdr * 16).toFixed(2),
    deg:  `${(36 + (i % 5) * 4).toFixed(1)}deg`,
    w:    `${(100 + rop * 200).toFixed(0)}px`,
  };
});

/** Ambient rising dust particles on the right panel */
const LoginAmbientDust = ({ t, ready }) => {
  if (!ready) return null;
  const G = t.gold, GL = t.goldLight;
  return (
    <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {LP_STREAKS.map((s,i)=>(
        <div key={i} style={{
          position:"absolute", left:s.left, top:0, bottom:0, width:s.w,
          background:`linear-gradient(${s.deg},transparent 0%,${G} 50%,transparent 100%)`,
          opacity:0, "--lp-sop":s.op, "--lp-sr":s.deg,
          animation:`lp-bgStreak ${s.dr}s ${s.dl}s ease-in-out infinite`,
          willChange:"transform,opacity",
        }}/>
      ))}
      {LP_DUST.map((d,i)=>(
        <div key={i} style={{
          position:"absolute", left:d.left, bottom:d.bottom,
          width:`${d.sz}px`, height:`${d.sz}px`, borderRadius:"50%",
          background: d.gold
            ? `radial-gradient(circle,${GL} 0%,${G} 65%,transparent 100%)`
            : `radial-gradient(circle,rgba(201,168,76,.8) 0%,rgba(201,168,76,.4) 60%,transparent 100%)`,
          boxShadow:`0 0 ${parseFloat(d.sz)*3}px ${d.gold ? G : G}66`,
          "--lp-op":d.op,"--lp-vy":d.vy,"--lp-vy2":d.vy2,"--lp-vx":d.vx,"--lp-vx2":d.vx2,
          animation:`lp-dustRise ${d.dr}s ${d.dl}s cubic-bezier(0.33,0,0.66,1) infinite`,
          willChange:"transform,opacity",
        }}/>
      ))}
      {/* Three micro-orbs */}
      {[
        {w:300,h:300,l:"10%",t:"18%",mx:"24px",my:"-38px",mx2:"-18px",my2:"28px",dur:"24s"},
        {w:220,h:220,r:"8%",b:"22%",mx:"-28px",my:"22px",mx2:"16px",my2:"-24px",dur:"30s",dl:"7s"},
        {w:180,h:180,l:"52%",t:"8%",mx:"18px",my:"-26px",mx2:"-12px",my2:"18px",dur:"20s",dl:"3s"},
      ].map((o,i)=>(
        <div key={i} style={{
          position:"absolute", width:o.w, height:o.h, borderRadius:"50%",
          left:o.l, right:o.r, top:o.t, bottom:o.b,
          background:`radial-gradient(circle,${G}0c 0%,transparent 65%)`,
          "--lp-mx":o.mx,"--lp-my":o.my,"--lp-mx2":o.mx2,"--lp-my2":o.my2,
          animation:`lp-microOrb ${o.dur} ${o.dl||"0s"} ease-in-out infinite`,
          willChange:"transform",
        }}/>
      ))}
    </div>
  );
};

/** Floating ornament diamonds around the login card */
const CardFloatDiamonds = ({ t, ready }) => {
  if (!ready) return null;
  const G = t.gold;
  const diamonds = [
    { w:9,  h:9,  top:"-22px",   left:"22%",  anm:"lp-float1 5.5s 0.2s ease-in-out infinite", dlp:"lp-diamondPulse 4s 0.4s ease-in-out infinite" },
    { w:6,  h:6,  top:"-16px",   right:"18%", anm:"lp-float2 7.0s 1.4s ease-in-out infinite", dlp:"lp-diamondPulse 5s 1.0s ease-in-out infinite" },
    { w:5,  h:5,  bottom:"-17px",left:"35%",  anm:"lp-float1 6.2s 0.8s ease-in-out infinite", dlp:"lp-diamondPulse 6s 0.2s ease-in-out infinite" },
    { w:7,  h:7,  bottom:"-19px",right:"27%", anm:"lp-float3 8.0s 2.2s ease-in-out infinite", dlp:"lp-diamondPulse 4.5s 2s ease-in-out infinite" },
    { w:4,  h:4,  top:"28%",    left:"-14px", anm:"lp-float2 5.8s 3.0s ease-in-out infinite", dlp:"lp-diamondPulse 5.5s 1.5s ease-in-out infinite" },
    { w:4,  h:4,  top:"55%",    right:"-12px",anm:"lp-float3 7.4s 0.5s ease-in-out infinite", dlp:"lp-diamondPulse 6s 0.8s ease-in-out infinite" },
  ];
  return (
    <>
      {diamonds.map((d,i)=>(
        <div key={i} aria-hidden="true" style={{
          position:"absolute",
          top:d.top, bottom:d.bottom, left:d.left, right:d.right,
          width:d.w, height:d.h, background:G, zIndex:5, pointerEvents:"none",
          animation:`${d.anm}, ${d.dlp}`,
          willChange:"transform,box-shadow",
        }}/>
      ))}
    </>
  );
};

/** Expanding halo rings around the card */
const CardHaloRings = ({ t, ready }) => {
  if (!ready) return null;
  const G = t.gold;
  return (
    <div aria-hidden="true" style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"visible", zIndex:0 }}>
      <div style={{ position:"absolute", left:"50%", top:"50%", width:"100%", height:"100%", borderRadius:22, border:`1px solid ${G}15`, animation:"lp-haloExpand  6.5s 0.8s ease-out infinite", willChange:"transform,opacity" }}/>
      <div style={{ position:"absolute", left:"50%", top:"50%", width:"100%", height:"100%", borderRadius:22, border:`1px solid ${G}0c`, animation:"lp-haloExpand2 6.5s 2.2s ease-out infinite", willChange:"transform,opacity" }}/>
      <div style={{ position:"absolute", left:"50%", top:"50%", width:"100%", height:"100%", borderRadius:22, border:`1px solid ${G}09`, animation:"lp-haloExpand  6.5s 4.0s ease-out infinite", willChange:"transform,opacity" }}/>
    </div>
  );
};

/** Animated gold divider between header and form */
const FormDivider = ({ t, delay = 0 }) => {
  const G = t.gold;
  return (
    <div aria-hidden="true" style={{ position:"relative", height:1, margin:"0 0 22px" }}>
      <div style={{
        position:"absolute", left:0, right:0, top:"50%", height:".5px",
        background:`linear-gradient(to right,transparent,${G}55 20%,${G}88 50%,${G}55 80%,transparent)`,
        transform:"scaleX(0) translateY(-50%)", transformOrigin:"center",
        animation:`lp-dividerIn 1.0s ${delay}ms cubic-bezier(0.16,1,0.3,1) both`,
      }}/>
      <div style={{
        position:"absolute", left:"50%", top:"50%",
        width:4, height:4, marginLeft:-2, marginTop:-2,
        background:G, transform:"rotate(45deg)",
        animation:`lp-dividerDot 3.5s ${delay+400}ms ease-in-out infinite`,
        boxShadow:`0 0 6px ${G}88`,
      }}/>
    </div>
  );
};

/** Submit button with orbital energy field */
const EnhancedSubmitButton = ({ t, isDark, isLoading, btnHover, setBtnHover, fireBtn, BtnRipples, ready }) => {
  const G = t.gold, GL = t.goldLight;
  const D = d => ready ? { opacity:1, animation:`au-fadeUp var(--motion-entrance) ${d}ms var(--ease-luxury) both` } : { opacity:0 };

  const orbits = [
    { r:"30px", speed:"2.2s", op:.65, sz:3,   col:G  },
    { r:"40px", speed:"3.3s", op:.42, sz:2.5, col:GL },
    { r:"24px", speed:"1.8s", op:.32, sz:2,   col:G  },
  ];

  return (
    <div style={{ ...D(600), position:"relative" }}>
      {/* Orbital dots (idle) */}
      {!isLoading && (
        <div aria-hidden="true" style={{ position:"absolute", inset:-20, pointerEvents:"none", display:"flex", alignItems:"center", justifyContent:"center" }}>
          {orbits.map((o,i)=>(
            <div key={i} style={{ position:"absolute", width:0, height:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <div style={{
                position:"absolute",
                width:`${o.sz}px`, height:`${o.sz}px`, borderRadius:"50%",
                background:o.col,
                boxShadow:`0 0 ${o.sz*3}px ${o.col}`,
                opacity: btnHover ? o.op * 1.6 : o.op * 0.4,
                "--lp-r": o.r,
                animation:`lp-btnOrbit ${o.speed} ${i * 0.6}s linear infinite`,
                transition:"opacity 0.3s ease",
                willChange:"transform",
              }}/>
            </div>
          ))}
        </div>
      )}

      {!isLoading && !btnHover && (
        <div aria-hidden="true" style={{ position:"absolute", inset:0, borderRadius:12, animation:"lp-btnBreath 4s 2.5s ease-in-out infinite", pointerEvents:"none" }}/>
      )}

      <button type="submit" disabled={isLoading} className="au-focus-ring"
        aria-label={isLoading ? "Authenticating, please wait" : "Sign in to Aurum"}
        onMouseEnter={()=>setBtnHover(true)} onMouseLeave={()=>setBtnHover(false)}
        onClick={e=>{if(!isLoading)fireBtn(e);}}
        style={{
          width:"100%", height:56,
          background: isLoading ? t.goldDim : `linear-gradient(135deg,${G} 0%,${GL} 45%,${G} 72%,${GL} 100%)`,
          backgroundSize:"280% 100%",
          backgroundPosition: btnHover && !isLoading ? "100% 0" : "0 0",
          border:"none", borderRadius:12,
          color: isDark ? "#07070c" : "#ffffff",
          fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase",
          fontFamily:"'DM Sans',sans-serif",
          cursor: isLoading ? "not-allowed" : "pointer",
          position:"relative", overflow:"hidden",
          boxShadow: isLoading ? "none" : btnHover ? t.shadowBtnHover : t.shadowBtn,
          transition:`all var(--motion-fast) var(--ease-luxury)`,
          transform: isLoading ? "none" : btnHover ? "translateY(-3px) scale(1.012)" : "none",
        }}
      >
        {!isLoading && btnHover && (
          <>
            <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 25%,rgba(255,255,255,.28) 50%,transparent 75%)", animation:"au-shimmer .65s var(--ease-luxury)", pointerEvents:"none" }}/>
            <div aria-hidden="true" style={{ position:"absolute", inset:0, background:"linear-gradient(105deg,transparent 10%,rgba(255,255,255,.12) 45%,transparent 80%)", animation:"lp-btnGlint 1.2s 0.35s var(--ease-luxury)", pointerEvents:"none" }}/>
          </>
        )}
        <BtnRipples/>
        {isLoading ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
            <div style={{ position:"relative", width:22, height:22, flexShrink:0 }}>
              <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`1.5px solid ${G}20` }}/>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:4, height:4, borderRadius:"50%", background:G, animation:"rp-orbitDot .9s linear infinite", boxShadow:`0 0 6px ${G}` }}/>
              </div>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:3, height:3, borderRadius:"50%", background:GL, animation:"rp-orbitDot2 .9s linear infinite", opacity:.75 }}/>
              </div>
              <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <div style={{ width:2.5, height:2.5, borderRadius:"50%", background:G, animation:"rp-orbitDot3 .9s linear infinite", opacity:.55 }}/>
              </div>
              <div style={{ position:"absolute", inset:"8px", borderRadius:"50%", background:`radial-gradient(circle,${G}55,transparent)`, animation:"au-coreGlow 1.2s ease-in-out infinite" }}/>
            </div>
            <span style={{ color:G, letterSpacing:"0.14em" }}>Authenticating</span>
          </div>
        ) : (
          <span style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
            Access Your Account
            <ArrowRight size={16} strokeWidth={2} style={{ transform:btnHover?"translateX(4px)":"translateX(0)", transition:`transform var(--motion-fast) var(--ease-spring-sm)` }}/>
          </span>
        )}
      </button>
    </div>
  );
};

// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function RestaurantLogin() {
  useGlobalStyles(GLOBAL_CSS);

  const [themeKey,     setThemeKey]     = useState("dark");
  const [themeOpacity, setThemeOpacity] = useState(1);
  const [email,        setEmail]        = useState("");
  const [password,     setPassword]     = useState("");
  const [showPwd,      setShowPwd]      = useState(false);
  const [rememberMe,   setRememberMe]   = useState(false);
  const [errors,       setErrors]       = useState({});
  const [touched,      setTouched]      = useState({ email:false, password:false });
  const [isLoading,    setIsLoading]    = useState(false);
  const [isSuccess,    setIsSuccess]    = useState(false);
  const [ready,        setReady]        = useState(false);
  const [introVisible, setIntroVisible] = useState(true);
  const [btnHover,     setBtnHover]     = useState(false);
  const [cardTilt,     setCardTilt]     = useState({ rx:0, ry:0 });

  const rpRef = useRef(null);
  const t        = THEMES[themeKey];
  const isDark   = themeKey !== "light";
  const isMobile = useIsMobile(768);
  const clock    = useClock();
  const mouse    = useMouseParallax(rpRef);
  const { fire: fireBtn, Ripples: BtnRipples } = useRipple(`${t.gold}55`);

  useEffect(() => { const id = setTimeout(() => setReady(true), 60); return () => clearTimeout(id); }, []);
  useEffect(() => { document.documentElement.style.setProperty("--au-gold", t.gold); }, [t.gold]);

  /* Card 3-D tilt on mouse move within right panel */
  const handleRpMouseMove = useCallback(e => {
    if (isMobile) return;
    const el = rpRef.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const rx = ((e.clientY - b.top)  / b.height - 0.5) * -5;
    const ry = ((e.clientX - b.left) / b.width  - 0.5) *  5;
    setCardTilt({ rx, ry });
  }, [isMobile]);

  const handleRpMouseLeave = useCallback(() => {
    setCardTilt({ rx:0, ry:0 });
  }, []);

  const switchTheme = useCallback(key => {
    setThemeOpacity(0);
    setTimeout(() => { setThemeKey(key); setThemeOpacity(1); }, 200);
  }, []);

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email address";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters required";
    return e;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setTouched({ email:true, password:true });
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setIsLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setIsLoading(false); setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false); setEmail(""); setPassword("");
    setErrors({}); setTouched({ email:false, password:false });
  };

  const D = delay => ready ? { opacity:1, animation:`au-fadeUp var(--motion-entrance) ${delay}ms var(--ease-luxury) both` } : { opacity:0 };

  const ThemeDots = () => (
    <div role="group" aria-label="Select color theme" className="au-theme-pos"
      style={{ display:"flex", gap:8, alignItems:"center", ...D(900) }}
    >
      {Object.values(THEMES).map(th => {
        const active = themeKey === th.id;
        return (
          <button key={th.id} onClick={() => switchTheme(th.id)} className="au-focus-ring"
            aria-label={`Switch to ${th.label} theme`} aria-pressed={active}
            style={{ width:active?32:10, height:10, borderRadius:5, border:"none", cursor:"pointer", background:active?t.gold:t.border, transition:`all 380ms var(--ease-spring-sm)`, boxShadow:active?`0 0 12px ${t.gold}65`:"none" }}
          />
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Cinematic 6-second intro preloader ── */}
      {introVisible && (
        <CinematicIntro
          gold={THEMES.dark.gold}
          goldLight={THEMES.dark.goldLight}
          onComplete={() => setIntroVisible(false)}
        />
      )}

    <div lang="en" dir="ltr" className="au-root au-shell" style={{ background:t.bg, opacity:themeOpacity }}>

      {/* Mobile: full-screen background */}
      {isMobile && (
        <div className="au-mobile-bg" aria-hidden="true">
          <PanelBackground t={t} isDark={isDark}/>
        </div>
      )}

      {/* Mobile: sticky logo + theme switcher header */}
      {isMobile && (
        <header className="au-mobile-header" style={{ background:isDark?"rgba(5,5,14,0.78)":"rgba(230,224,212,0.84)" }}>
          <div style={{ width:32, height:32, borderRadius:8, flexShrink:0, border:`1px solid ${t.gold}44`, background:`linear-gradient(135deg,${t.gold}22,${t.gold}06)`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="14" height="14" viewBox="0 0 22 22" fill="none" aria-hidden="true"><polygon points="11,2 13.5,8.5 20.5,9 15.5,13.5 17,20.5 11,17 5,20.5 6.5,13.5 1.5,9 8.5,8.5" fill="none" stroke={t.gold} strokeWidth="1.5" strokeLinejoin="round"/></svg>
          </div>
          <span className="au-font-display" style={{ fontSize:16, fontWeight:600, letterSpacing:"0.08em", color:t.textPrimary }}>AURUM</span>
          <span style={{ fontSize:9, letterSpacing:"0.2em", color:t.gold, textTransform:"uppercase", fontFamily:"'DM Sans',sans-serif" }}>Restaurant Group</span>
          <div style={{ marginLeft:"auto" }}><ThemeDots/></div>
        </header>
      )}

      {/* Desktop: left panel */}
      <LeftPanel t={t} ready={ready} themeKey={themeKey}/>

      {/* Right/main panel */}
      <div
        ref={rpRef}
        className="au-right"
        style={{ background:"transparent", position:"relative" }}
        onMouseMove={handleRpMouseMove}
        onMouseLeave={handleRpMouseLeave}
      >

        {/* ── Cinematic right-panel ambient background ── */}
        {!isMobile && (
          <RightPanelBackground t={t} isDark={isDark} mx={mouse.x} my={mouse.y}/>
        )}
        {/* ── Ambient dust particles ── */}
        {!isMobile && <LoginAmbientDust t={t} ready={ready}/>}
        {isMobile && (
          <div aria-hidden="true" style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:0 }}>
            <CardAura t={t} isDark={isDark} mx={0} my={0}/>
          </div>
        )}

        {!isMobile && <ThemeDots/>}

        {clock && !isMobile && (
          <div aria-label={`Current time: ${clock}`} className="au-clock-pos"
            style={{ fontSize:11, color:t.textMuted, fontFamily:"'DM Mono',monospace", letterSpacing:"0.08em", ...D(1200) }}
          >{clock}</div>
        )}

        {/* Login card — with mouse 3-D tilt + conic gradient border */}
        <div className="au-card" style={{
          position:"relative", zIndex:1,
          opacity: ready ? 1 : 0,
          animation: ready ? "lp-cardIn 1.0s .06s cubic-bezier(0.16,1,0.3,1) both" : "none",
          marginTop: isMobile ? 8 : 0,
          perspective: "1200px",
        }}>

          {/* Halo rings + floating diamonds */}
          {!isLoading && !isSuccess && <CardHaloRings t={t} ready={ready}/>}
          {!isLoading && !isSuccess && <CardFloatDiamonds t={t} ready={ready}/>}

          {/* Animated gold corner accents */}
          <div className="rp-card-corner tl" style={{ borderColor:`${t.gold}55` }}/>
          <div className="rp-card-corner tr" style={{ borderColor:`${t.gold}55`, animationDelay:"1.2s" }}/>
          <div className="rp-card-corner bl" style={{ borderColor:`${t.gold}55`, animationDelay:"2.4s" }}/>
          <div className="rp-card-corner br" style={{ borderColor:`${t.gold}55`, animationDelay:"1.8s" }}/>

          {/* Rotating conic gradient border */}
          {!isMobile && <div className="rp-conic-border" aria-hidden="true"/>}

          {/* SVG trace-on animation */}
          <svg aria-hidden="true" style={{ position:"absolute", inset:"-2px", width:"calc(100% + 4px)", height:"calc(100% + 4px)", pointerEvents:"none", overflow:"visible" }}>
            <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="20" ry="20" fill="none" stroke={t.gold} strokeWidth="1" strokeDasharray="1800" strokeOpacity=".45"
              style={{ animation:ready?"au-traceRect 2.5s .4s var(--ease-luxury) both":"none" }}
            />
          </svg>

          {/* Card body — with mouse-reactive 3-D tilt */}
          <div className="au-card-inner" style={{
            position:"relative", overflow:"hidden",
            background: t.bgCard,
            border:`1px solid ${t.border}`,
            borderRadius:20,
            padding:"40px 36px",
            backdropFilter:"blur(32px)",
            WebkitBackdropFilter:"blur(32px)",
            boxShadow: t.shadowCard,
            transform: isMobile ? "none" : `perspective(1200px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg) translateZ(0)`,
            transition:"transform 0.55s cubic-bezier(0.16,1,0.3,1), box-shadow 0.55s cubic-bezier(0.16,1,0.3,1)",
          }}>

            {/* Slow ambient card shimmer */}
            <div aria-hidden="true" style={{ position:"absolute", top:0, left:"-110%", width:"55%", height:"100%", background:`linear-gradient(105deg,transparent,${t.gold}04,transparent)`, animation:"au-shimmer 10s 3s ease-in-out infinite", pointerEvents:"none" }}/>
            {/* Secondary diagonal shimmer */}
            <div aria-hidden="true" style={{ position:"absolute", top:0, left:"-110%", width:"35%", height:"100%", background:`linear-gradient(118deg,transparent,${t.goldLight}03,transparent)`, animation:"rp-cardShimmer2 16s 8s ease-in-out infinite", pointerEvents:"none" }}/>

            {/* Inner top-edge luminous line */}
            <div aria-hidden="true" style={{ position:"absolute", top:0, left:"15%", right:"15%", height:"1px", background:`linear-gradient(90deg,transparent,${t.gold}38,${t.goldLight}55,${t.gold}38,transparent)`, opacity:0.5 }}/>

            {/* Mouse-parallax inner glow — subtle reactive highlight */}
            {!isMobile && (
              <div aria-hidden="true" style={{
                position:"absolute", inset:0, pointerEvents:"none", borderRadius:20,
                background:`radial-gradient(ellipse 50% 45% at ${50 + (mouse.x||0)*18}% ${50 + (mouse.y||0)*18}%, ${t.gold}0a 0%, transparent 65%)`,
                transition:"background 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}/>
            )}

            {isSuccess ? (
              <SuccessScreen t={t} onReset={handleReset}/>
            ) : (
              <>
                {/* Header */}
                <div style={{ marginBottom:28, textAlign:"center" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14, ...D(200) }}>
                    <div style={{ flex:1, height:1, background:`linear-gradient(to right,transparent,${t.gold}55)`, transformOrigin:"right", animation:ready?"au-drawLine 1s .4s var(--ease-luxury) both":"none" }}/>
                    <span style={{ fontSize:10, letterSpacing:"0.28em", color:t.gold, textTransform:"uppercase", whiteSpace:"nowrap", fontFamily:"'DM Sans',sans-serif", fontWeight:500 }}>Member Access</span>
                    <div style={{ flex:1, height:1, background:`linear-gradient(to left,transparent,${t.gold}55)`, transformOrigin:"left", animation:ready?"au-drawLine 1s .4s var(--ease-luxury) both":"none" }}/>
                  </div>
                  <h2 className="au-font-display au-card-heading" style={{ fontSize:34, fontWeight:400, color:t.textPrimary, letterSpacing:"-0.01em", lineHeight:1.12, ...D(250) }}>
                    Sign in to <em style={{ color:t.gold, fontStyle:"italic" }}>Aurum</em>
                  </h2>
                </div>

                {/* Form */}
                <form id="login-form" onSubmit={handleSubmit} noValidate aria-label="Aurum login form">
                  <FormDivider t={t} delay={300}/>
                  <div style={{ marginBottom:10 }}>
                    <InputField id="email" label="Email Address" type="email" value={email}
                      onChange={e=>{setEmail(e.target.value);setErrors(p=>({...p,email:""}));}}
                      error={errors.email} hasError={touched.email&&!!errors.email}
                      t={t} autoComplete="email" animDelay={360} ready={ready}
                    />
                  </div>
                  <div style={{ marginBottom:8 }}>
                    <InputField id="password" label="Password" type={showPwd?"text":"password"} value={password}
                      onChange={e=>{setPassword(e.target.value);setErrors(p=>({...p,password:""}));}}
                      error={errors.password} hasError={touched.password&&!!errors.password}
                      t={t} autoComplete="current-password" animDelay={440} ready={ready}
                      suffix={
                        <button type="button" onClick={()=>setShowPwd(v=>!v)} className="au-focus-ring"
                          aria-label={showPwd?"Hide password":"Show password"}
                          style={{ background:"none", border:"none", cursor:"pointer", color:t.textMuted, padding:4, display:"flex", alignItems:"center", transition:`color var(--motion-fast) var(--ease-luxury),transform var(--motion-fast) var(--ease-spring-sm)`, transform:showPwd?"scale(1.1)":"scale(1)" }}
                          onMouseEnter={e=>e.currentTarget.style.color=t.gold}
                          onMouseLeave={e=>e.currentTarget.style.color=t.textMuted}
                        >
                          {showPwd ? <EyeOff size={16} strokeWidth={1.6}/> : <Eye size={16} strokeWidth={1.6}/>}
                        </button>
                      }
                    />
                  </div>

                  {/* Remember + Forgot */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, ...D(520) }}>
                    <label style={{ display:"flex", alignItems:"center", gap:9, cursor:"pointer", userSelect:"none" }}>
                      <div style={{ position:"relative", width:18, height:18 }}>
                        <input type="checkbox" checked={rememberMe} onChange={e=>setRememberMe(e.target.checked)} className="au-focus-ring" aria-label="Remember me"
                          style={{ position:"absolute", opacity:0, width:18, height:18, cursor:"pointer", margin:0 }}
                        />
                        <div aria-hidden="true" style={{ width:18, height:18, border:`1.5px solid ${rememberMe?t.gold:t.border}`, borderRadius:4, background:rememberMe?t.gold:"transparent", display:"flex", alignItems:"center", justifyContent:"center", transition:`all var(--motion-micro) var(--ease-spring-sm)`, boxShadow:rememberMe?`0 0 8px ${t.gold}50`:"none", transform:rememberMe?"scale(1.08)":"scale(1)", pointerEvents:"none" }}>
                          {rememberMe && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke={t.checkFill} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" style={{ animation:"au-checkDraw .28s var(--ease-luxury) both" }}/></svg>}
                        </div>
                      </div>
                      <span style={{ fontSize:13, color:t.textSecondary, fontFamily:"'DM Sans',sans-serif" }}>Remember me</span>
                    </label>
                    <button
                      type="button"
                      className="au-focus-ring"
                      onClick={() => { /* navigate('/forgot-password') — wire to your route */ }}
                      style={{ fontSize:13, color:t.gold, textDecoration:"none", background:"none", border:"none", cursor:"pointer", fontFamily:"'DM Sans',sans-serif", padding:"4px 2px", borderBottom:`1px solid ${t.gold}38`, transition:`all var(--motion-fast) var(--ease-luxury)` }}
                      onMouseEnter={e=>{e.currentTarget.style.color=t.goldLight;e.currentTarget.style.borderBottomColor=t.goldLight+"60";}}
                      onMouseLeave={e=>{e.currentTarget.style.color=t.gold;e.currentTarget.style.borderBottomColor=t.gold+"38";}}
                    >Forgot password?</button>
                  </div>

                  {isLoading && (
                    <div style={{ height:2, borderRadius:1, marginBottom:8, background:t.border, overflow:"hidden" }}>
                      <div style={{ height:"100%", background:`linear-gradient(to right,${t.gold},${t.goldLight})`, animation:"au-progressFill 1.8s var(--ease-luxury) forwards", boxShadow:`0 0 8px ${t.gold}88` }}/>
                    </div>
                  )}

                  {/* CTA */}
                  <EnhancedSubmitButton
                    t={t} isDark={isDark} isLoading={isLoading}
                    btnHover={btnHover} setBtnHover={setBtnHover}
                    fireBtn={fireBtn} BtnRipples={BtnRipples} ready={ready}
                  />

                  <div style={{ textAlign:"center", marginTop:24, ...D(700) }}>
                    <span style={{ fontSize:13, color:t.textMuted, fontFamily:"'DM Sans',sans-serif" }}>Not yet a member? </span>
                    <Link
                      to="/request-access"
                      className="au-focus-ring"
                      style={{ fontSize:13, color:t.gold, textDecoration:"none", fontWeight:500, borderBottom:`1px solid ${t.gold}44`, paddingBottom:1, fontFamily:"'DM Sans',sans-serif", transition:`all var(--motion-fast) var(--ease-luxury)` }}
                      onMouseEnter={e=>{e.currentTarget.style.color=t.goldLight;e.currentTarget.style.borderBottomColor=t.goldLight+"55";}}
                      onMouseLeave={e=>{e.currentTarget.style.color=t.gold;e.currentTarget.style.borderBottomColor=t.gold+"44";}}
                    >Request an invitation</Link>
                  </div>

                  {/* Security badge */}
                  <SecurityBadge t={t} isDark={isDark}/>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}