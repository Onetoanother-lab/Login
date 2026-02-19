// ─────────────────────────────────────────────────────────────
// GLOBAL CSS — injected once via useGlobalStyles hook
// ─────────────────────────────────────────────────────────────

export const GLOBAL_CSS = `
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

