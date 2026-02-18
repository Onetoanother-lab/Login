import { useState, useEffect, useRef, useCallback, useMemo } from "react";

const tokens = {
  motion: {
    short: "280ms",
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  radius: { sm: "6px", md: "12px", lg: "20px" },
};

const themes = {
  dark: {
    name: "Luxury Dark", bg: "#07070c", bgCard: "rgba(255,255,255,0.03)", bgInput: "rgba(255,255,255,0.04)",
    bgInputFocus: "rgba(255,255,255,0.07)", border: "rgba(255,255,255,0.08)", borderFocus: "rgba(201,168,76,0.7)",
    gold: "#c9a84c", goldLight: "#e8c97a", goldDim: "rgba(201,168,76,0.15)",
    textPrimary: "#f5f0e8", textSecondary: "rgba(245,240,232,0.55)", textMuted: "rgba(245,240,232,0.3)",
    error: "#e07070", success: "#6bcca0", successBg: "rgba(107,204,160,0.08)",
    panelLeft: "linear-gradient(145deg, #07070c 0%, #0f0c18 50%, #080b12 100%)",
    shadowGold: "0 0 60px rgba(201,168,76,0.25)", starColor: "rgba(201,168,76,",
  },
  light: {
    name: "Premium Light", bg: "#f8f5f0", bgCard: "rgba(255,255,255,0.7)", bgInput: "rgba(255,255,255,0.8)",
    bgInputFocus: "#ffffff", border: "rgba(0,0,0,0.1)", borderFocus: "rgba(160,120,40,0.8)",
    gold: "#a07828", goldLight: "#c49a40", goldDim: "rgba(160,120,40,0.12)",
    textPrimary: "#1a1612", textSecondary: "rgba(26,22,18,0.6)", textMuted: "rgba(26,22,18,0.35)",
    error: "#c05050", success: "#2a8a60", successBg: "rgba(42,138,96,0.07)",
    panelLeft: "linear-gradient(145deg, #ede8df 0%, #e4ddd2 50%, #ede5d8 100%)",
    shadowGold: "0 0 40px rgba(160,120,40,0.15)", starColor: "rgba(160,120,40,",
  },
  contrast: {
    name: "High Contrast", bg: "#000000", bgCard: "rgba(255,255,255,0.05)", bgInput: "rgba(255,255,255,0.06)",
    bgInputFocus: "rgba(255,255,255,0.1)", border: "rgba(255,255,255,0.25)", borderFocus: "#ffdd44",
    gold: "#ffdd44", goldLight: "#ffe977", goldDim: "rgba(255,221,68,0.15)",
    textPrimary: "#ffffff", textSecondary: "rgba(255,255,255,0.75)", textMuted: "rgba(255,255,255,0.5)",
    error: "#ff8080", success: "#80ffbb", successBg: "rgba(128,255,187,0.1)",
    panelLeft: "linear-gradient(145deg, #000000 0%, #050508 100%)",
    shadowGold: "0 0 40px rgba(255,221,68,0.3)", starColor: "rgba(255,221,68,",
  },
};

const roles = [
  { id: "guest", label: "Guest", icon: "✦", desc: "Reserve & Dine" },
  { id: "staff", label: "Staff", icon: "◈", desc: "Operations" },
  { id: "manager", label: "Manager", icon: "❖", desc: "Full Access" },
];

const buildCSS = () => `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  @keyframes floatOrb{0%,100%{transform:translate(0,0) scale(1);opacity:.45;}33%{transform:translate(45px,-60px) scale(1.15);opacity:.65;}66%{transform:translate(-35px,35px) scale(.88);opacity:.3;}}
  @keyframes floatOrb2{0%,100%{transform:translate(0,0) scale(1.1);opacity:.3;}40%{transform:translate(-55px,45px) scale(.85);opacity:.55;}70%{transform:translate(35px,-35px) scale(1.1);opacity:.2;}}
  @keyframes floatOrb3{0%,100%{transform:translate(0,0) scale(1);opacity:.18;}50%{transform:translate(70px,70px) scale(1.25);opacity:.38;}}
  @keyframes spinRing{to{transform:rotate(360deg);}}
  @keyframes spinRingR{to{transform:rotate(-360deg);}}
  @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
  @keyframes fadeLeft{from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
  @keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
  @keyframes scaleIn{from{opacity:0;transform:scale(.86) translateY(24px);}to{opacity:1;transform:scale(1) translateY(0);}}
  @keyframes shake{0%,100%{transform:translateX(0);}12%{transform:translateX(-10px);}25%{transform:translateX(8px);}37%{transform:translateX(-7px);}50%{transform:translateX(5px);}62%{transform:translateX(-4px);}75%{transform:translateX(3px);}87%{transform:translateX(-2px);}}
  @keyframes successBounce{0%{transform:scale(.5);opacity:0;}55%{transform:scale(1.1);opacity:1;}75%{transform:scale(.94);}100%{transform:scale(1);opacity:1;}}
  @keyframes particleDrift{0%{transform:translateY(100vh) rotate(0deg) scale(1);opacity:0;}8%{opacity:.9;}90%{opacity:.15;}100%{transform:translateY(-50px) rotate(720deg) scale(.2);opacity:0;}}
  @keyframes borderPulse{0%,100%{opacity:.35;}50%{opacity:1;}}
  @keyframes checkDraw{from{stroke-dashoffset:80;}to{stroke-dashoffset:0;}}
  @keyframes logoBlur{from{letter-spacing:.6em;opacity:0;filter:blur(6px);}to{letter-spacing:.08em;opacity:1;filter:blur(0);}}
  @keyframes letterDrop{from{opacity:0;transform:translateY(-18px) rotateX(90deg);}to{opacity:1;transform:translateY(0) rotateX(0);}}
  @keyframes shimmerSweep{0%{transform:translateX(-150%) skewX(-20deg);}100%{transform:translateX(350%) skewX(-20deg);}}
  @keyframes shimmerLoop{0%{background-position:-400px 0;}100%{background-position:400px 0;}}
  @keyframes pulseDot{0%,100%{transform:scale(.95);opacity:.8;}50%{transform:scale(1.05);opacity:.4;}}
  @keyframes scanLine{0%{transform:translateY(-10%);opacity:0;}15%{opacity:.5;}85%{opacity:.3;}100%{transform:translateY(110vh);opacity:0;}}
  @keyframes progressFill{0%{width:0%;}20%{width:30%;}50%{width:58%;}80%{width:80%;}100%{width:95%;}}
  @keyframes confettiBurst{0%{transform:translate(0,0) rotate(0deg) scale(1);opacity:1;}100%{transform:translate(var(--cx),var(--cy)) rotate(var(--cr)) scale(.1);opacity:0;}}
  @keyframes goldRipple{0%{transform:translate(-50%,-50%) scale(0);opacity:.7;}100%{transform:translate(-50%,-50%) scale(4.5);opacity:0;}}
  @keyframes drawLine{from{transform:scaleX(0);opacity:0;}to{transform:scaleX(1);opacity:1;}}
  @keyframes orbDot{from{transform:rotate(0deg) translateX(24px) rotate(0deg);}to{transform:rotate(360deg) translateX(24px) rotate(-360deg);}}
  @keyframes orbDot2{from{transform:rotate(180deg) translateX(24px) rotate(-180deg);}to{transform:rotate(540deg) translateX(24px) rotate(-540deg);}}
  @keyframes twinkle{0%,100%{opacity:var(--base-op,.3);transform:scale(1);}50%{opacity:1;transform:scale(1.9);}}
  @keyframes breatheBox{0%,100%{box-shadow:0 0 20px rgba(201,168,76,.15);}50%{box-shadow:0 0 60px rgba(201,168,76,.4),0 0 120px rgba(201,168,76,.1);}}
  @keyframes svgTrace{from{stroke-dashoffset:1600;}to{stroke-dashoffset:0;}}
  @keyframes ringExpand{0%{transform:translate(-50%,-50%) scale(.5);opacity:.8;}100%{transform:translate(-50%,-50%) scale(3.5);opacity:0;}}
  @keyframes floatY{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
  @keyframes grainShift{0%,100%{transform:translate(0,0);}20%{transform:translate(-2%,-3%);}40%{transform:translate(3%,2%);}60%{transform:translate(-1%,4%);}80%{transform:translate(2%,-2%);}}
  @keyframes typeCursor{0%,100%{opacity:1;}50%{opacity:0;}}
  @keyframes magicShimmer{0%{transform:translateX(-100%);}50%,100%{transform:translateX(220%);}}
  @keyframes badgeFloat{0%,100%{transform:translateY(0) rotate(0deg);}33%{transform:translateY(-3px) rotate(0.5deg);}66%{transform:translateY(2px) rotate(-0.3deg);}}

  .lp-root{font-family:'DM Sans',sans-serif;}
  .lp-root *{-webkit-font-smoothing:antialiased;}
  .lp-input{caret-color:var(--gold);}
  input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus{-webkit-text-fill-color:inherit;-webkit-box-shadow:0 0 0px 1000px transparent inset;transition:background-color 9999s ease 0s;}
  .role-card:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}
  .lp-btn:focus-visible,.lp-input:focus-visible{outline:none;}
  .theme-dot:focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:4px;}
  .lp-link:focus-visible{outline:2px solid var(--gold);outline-offset:4px;border-radius:3px;}
  @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.01ms !important;transition-duration:.01ms !important;}}
`;

// Constellation
const Constellation = ({ color }) => {
  const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    r: Math.random() * 0.22 + 0.06, baseOp: Math.random() * 0.55 + 0.08,
    dur: Math.random() * 4 + 2, delay: Math.random() * 5,
  })), []);
  const lines = useMemo(() => {
    const res = [];
    for (let i = 0; i < stars.length; i++)
      for (let j = i + 1; j < stars.length; j++) {
        const d = Math.hypot(stars[i].x - stars[j].x, stars[i].y - stars[j].y);
        if (d < 15) res.push({ k: `${i}-${j}`, x1: stars[i].x, y1: stars[i].y, x2: stars[j].x, y2: stars[j].y, op: (15 - d) / 15 * 0.13 });
      }
    return res;
  }, [stars]);
  return (
    <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
      {lines.map(l => <line key={l.k} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={color + l.op.toFixed(2) + ")"} strokeWidth="0.12" />)}
      {stars.map(s => <circle key={s.id} cx={s.x} cy={s.y} r={s.r} fill={color + s.baseOp.toFixed(2) + ")"} style={{ "--base-op": s.baseOp, animation: `twinkle ${s.dur}s ${s.delay}s ease-in-out infinite` }} />)}
    </svg>
  );
};

const Particles = ({ color }) => {
  const ps = useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, size: Math.random() * 3 + 0.4,
    dur: Math.random() * 20 + 10, delay: Math.random() * 22, round: Math.random() > 0.4,
  })), []);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {ps.map(p => <div key={p.id} style={{ position: "absolute", left: p.left, bottom: "-8px", width: p.size, height: p.size, borderRadius: p.round ? "50%" : "2px", background: color, animation: `particleDrift ${p.dur}s ${p.delay}s infinite linear`, willChange: "transform,opacity" }} />)}
    </div>
  );
};

const Grain = () => (
  <div style={{ position: "absolute", inset: "-80px", pointerEvents: "none", opacity: 0.024, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "160px", animation: "grainShift .9s steps(1) infinite" }} />
);

const useTypewriter = (text, speed = 48, startDelay = 1900) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0, iv;
    const t0 = setTimeout(() => {
      iv = setInterval(() => { setDisplayed(text.slice(0, ++i)); if (i >= text.length) { clearInterval(iv); setDone(true); } }, speed);
    }, startDelay);
    return () => { clearTimeout(t0); clearInterval(iv); };
  }, [text, speed, startDelay]);
  return { displayed, done };
};

const StaggeredText = ({ text, delay = 0, color, italic = false }) => (
  <span style={{ display: "inline-block", perspective: "500px" }}>
    {text.split("").map((ch, i) => (
      <span key={i} style={{ display: "inline-block", fontStyle: italic ? "italic" : "normal", color, animation: `letterDrop .55s ${delay + i * 48}ms cubic-bezier(0.34,1.56,0.64,1) both`, willChange: "transform,opacity" }}>{ch === " " ? "\u00A0" : ch}</span>
    ))}
  </span>
);

const useCursorGlow = (ref) => {
  const glowRef = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      if (glowRef.current) { glowRef.current.style.transform = `translate(${e.clientX - r.left - 160}px,${e.clientY - r.top - 160}px)`; glowRef.current.style.opacity = "1"; }
    };
    const leave = () => { if (glowRef.current) glowRef.current.style.opacity = "0"; };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, []);
  return glowRef;
};

const useTilt = (ref, strength = 4) => {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / r.height) * -strength;
      const ry = ((e.clientX - r.left - r.width / 2) / r.width) * strength;
      el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
    };
    const leave = () => { el.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) translateZ(0)"; };
    el.addEventListener("mousemove", move); el.addEventListener("mouseleave", leave);
    return () => { el.removeEventListener("mousemove", move); el.removeEventListener("mouseleave", leave); };
  }, [strength]);
};

const useRipple = (color = "rgba(201,168,76,0.45)") => {
  const [ripples, setRipples] = useState([]);
  const fire = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(rs => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples(rs => rs.filter(ri => ri.id !== id)), 800);
  };
  const Rips = () => <>{ripples.map(r => <div key={r.id} style={{ position: "absolute", left: r.x, top: r.y, width: "12px", height: "12px", borderRadius: "50%", background: color, pointerEvents: "none", animation: `goldRipple .8s cubic-bezier(0,0,.2,1) forwards` }} />)}</>;
  return { fire, Rips };
};

const Confetti = ({ gold }) => {
  const pieces = useMemo(() => Array.from({ length: 40 }, (_, i) => {
    const angle = (i / 40) * 360 + (Math.random() - .5) * 22;
    const dist = 65 + Math.random() * 140;
    const rad = angle * Math.PI / 180;
    return { id: i, cx: `${Math.cos(rad) * dist}px`, cy: `${Math.sin(rad) * dist}px`, cr: `${Math.random() * 720 - 360}deg`, color: i % 3 === 0 ? gold : i % 3 === 1 ? "rgba(255,255,255,0.5)" : gold + "aa", size: Math.random() * 7 + 2, round: Math.random() > .35, dur: .6 + Math.random() * .7, delay: Math.random() * .4 };
  }), [gold]);
  return (
    <div style={{ position: "absolute", top: "50%", left: "50%", pointerEvents: "none", zIndex: 10 }}>
      {pieces.map(p => <div key={p.id} style={{ position: "absolute", width: p.size, height: p.size, borderRadius: p.round ? "50%" : "2px", background: p.color, "--cx": p.cx, "--cy": p.cy, "--cr": p.cr, animation: `confettiBurst ${p.dur}s ${p.delay}s cubic-bezier(0,0,.2,1) forwards`, willChange: "transform,opacity" }} />)}
    </div>
  );
};

const LeftPanel = ({ t, entered }) => {
  const { displayed, done } = useTypewriter("An invitation to those who appreciate the art of the extraordinary table.", 46, 1900);
  return (
    <div style={{ flex: "0 0 43%", position: "relative", overflow: "hidden", background: t.panelLeft, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 52px" }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div style={{ position: "absolute", width: "700px", height: "700px", borderRadius: "50%", top: "-250px", left: "-200px", background: `radial-gradient(circle,${t.gold}18 0%,transparent 65%)`, animation: "floatOrb 24s ease-in-out infinite", willChange: "transform" }} />
        <div style={{ position: "absolute", width: "600px", height: "600px", borderRadius: "50%", bottom: "-200px", right: "-150px", background: `radial-gradient(circle,${t.gold}12 0%,transparent 65%)`, animation: "floatOrb2 30s ease-in-out infinite", willChange: "transform" }} />
        <div style={{ position: "absolute", width: "400px", height: "400px", borderRadius: "50%", top: "35%", right: "8%", background: `radial-gradient(circle,rgba(80,60,200,.07) 0%,transparent 65%)`, animation: "floatOrb3 38s ease-in-out infinite", willChange: "transform" }} />
      </div>
      <Constellation color={t.starColor} />
      <Particles color={t.gold + "80"} />
      <Grain />
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom,transparent,${t.gold}25 30%,${t.gold}25 70%,transparent)`, animation: "scanLine 7s ease-in-out infinite", pointerEvents: "none", zIndex: 1, willChange: "transform" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "1px", background: `linear-gradient(to bottom,transparent,${t.gold}80 30%,${t.gold}80 70%,transparent)`, animation: "borderPulse 3.5s ease-in-out infinite" }} />
      {[{ t2: "20px", l: "20px", bl: true, bt: true }, { t2: "20px", r: "20px", br: true, bt: true }, { b: "20px", l: "20px", bl: true, bb: true }, { b: "20px", r: "20px", br: true, bb: true }].map((c, i) => (
        <div key={i} style={{ position: "absolute", top: c.t2, bottom: c.b, left: c.l, right: c.r, width: "28px", height: "28px", borderLeft: c.bl ? `1.5px solid ${t.gold}55` : "none", borderRight: c.br ? `1.5px solid ${t.gold}55` : "none", borderTop: c.bt ? `1.5px solid ${t.gold}55` : "none", borderBottom: c.bb ? `1.5px solid ${t.gold}55` : "none", opacity: entered ? 1 : 0, animation: entered ? `fadeIn .5s ${.4 + i * .12}s both` : "none", zIndex: 2 }} />
      ))}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: "16px", opacity: entered ? 1 : 0, animation: entered ? `logoBlur 1.5s cubic-bezier(.16,1,.3,1) both` : "none" }}>
          <div style={{ position: "relative", width: "50px", height: "50px" }}>
            <div style={{ position: "absolute", inset: 0, borderRadius: "12px", border: `1px solid ${t.gold}50`, background: `linear-gradient(135deg,${t.gold}25,${t.gold}08)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: t.gold, animation: "breatheBox 4s ease-in-out infinite" }}>✦</div>
            <div style={{ position: "absolute", inset: "-10px", pointerEvents: "none", animation: "orbDot 5.5s linear infinite" }}><div style={{ width: "5px", height: "5px", borderRadius: "50%", background: t.gold, opacity: .75 }} /></div>
            <div style={{ position: "absolute", inset: "-10px", pointerEvents: "none", animation: "orbDot2 9s linear infinite" }}><div style={{ width: "3px", height: "3px", borderRadius: "50%", background: t.goldLight, opacity: .45 }} /></div>
          </div>
          <div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 600, letterSpacing: "0.08em", color: t.textPrimary, lineHeight: 1 }}>AURUM</div>
            <div style={{ fontSize: "9px", letterSpacing: "0.3em", color: t.gold, marginTop: "3px", textTransform: "uppercase" }}>Restaurant Group</div>
          </div>
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ height: "1px", marginBottom: "34px", background: `linear-gradient(to right,${t.gold}80,${t.gold}20)`, transformOrigin: "left", animation: entered ? `drawLine 1.3s .5s cubic-bezier(.16,1,.3,1) both` : "none" }} />
        <div style={{ fontSize: "9px", letterSpacing: "0.32em", color: t.gold, textTransform: "uppercase", marginBottom: "20px", opacity: entered ? 1 : 0, animation: entered ? `fadeLeft .6s .6s both` : "none" }}>Est. MMXIV</div>
        <h1 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(36px,3.8vw,58px)", fontWeight: 300, lineHeight: 1.12, color: t.textPrimary, letterSpacing: "-0.01em", marginBottom: "28px" }}>
          {entered && <><StaggeredText text="Where Every" delay={700} color={t.textPrimary} /><br /><StaggeredText text="Moment" delay={1100} color={t.gold} italic /><br /><StaggeredText text="Is Crafted" delay={1480} color={t.textPrimary} /></>}
        </h1>
        <p style={{ fontSize: "14px", lineHeight: 1.75, color: t.textSecondary, maxWidth: "300px", fontWeight: 300, minHeight: "50px" }}>
          {displayed}<span style={{ display: "inline-block", width: "1.5px", height: "14px", background: t.gold, marginLeft: "2px", verticalAlign: "middle", animation: done ? "none" : "typeCursor .8s ease-in-out infinite", opacity: done ? 0 : 1 }} />
        </p>
        <div style={{ display: "flex", gap: "32px", marginTop: "30px", opacity: entered ? 1 : 0, animation: entered ? `fadeUp .7s 1.7s both` : "none" }}>
          {[["18+", "Years"], ["★★★", "Michelin"], ["40+", "Locations"]].map(([n, l], i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "22px", fontWeight: 500, color: t.gold, lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: "9px", color: t.textMuted, letterSpacing: "0.22em", marginTop: "4px" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 2, opacity: entered ? 1 : 0, animation: entered ? `fadeIn .8s 2.1s both` : "none" }}>
        <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.03)", border: `1px solid ${t.gold}25`, borderRadius: tokens.radius.md, backdropFilter: "blur(12px)", display: "flex", alignItems: "center", gap: "14px", animation: "badgeFloat 7s ease-in-out infinite" }}>
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `conic-gradient(${t.gold}60,transparent 70%)`, display: "flex", alignItems: "center", justifyContent: "center", animation: "spinRing 14s linear infinite", flexShrink: 0 }}>
            <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: t.panelLeft, display: "flex", alignItems: "center", justifyContent: "center", color: t.gold, fontSize: "14px" }}>✦</div>
          </div>
          <div><div style={{ fontSize: "12px", color: t.textPrimary, fontWeight: 500 }}>Michelin Recognized</div><div style={{ fontSize: "11px", color: t.textMuted }}>Three stars of excellence</div></div>
          <div style={{ marginLeft: "auto", display: "flex", gap: "3px" }}>
            {["★", "★", "★"].map((s, i) => <span key={i} style={{ color: t.gold, fontSize: "13px", animation: `twinkle ${2 + i * .7}s ${i * .5}s ease-in-out infinite`, "--base-op": "1" }}>{s}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, type, value, onChange, error, theme: t, suffix, id, autoComplete, delay = 0, entered }) => {
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);
  const { fire, Rips } = useRipple(t.gold + "35");
  const hasVal = value.length > 0;
  return (
    <div style={{ opacity: entered ? 1 : 0, animation: entered ? `fadeUp .6s ${delay}ms cubic-bezier(.16,1,.3,1) both` : "none" }}>
      <div style={{ position: "relative", animation: error && touched ? `shake .45s cubic-bezier(.16,1,.3,1)` : "none" }} onClick={e => { fire(e); setTouched(true); }}>
        <label htmlFor={id} style={{ position: "absolute", left: "16px", top: focused || hasVal ? "9px" : "50%", transform: focused || hasVal ? "none" : "translateY(-50%)", fontSize: focused || hasVal ? "10px" : "13px", letterSpacing: focused || hasVal ? "0.14em" : "0.02em", color: focused ? t.gold : error ? t.error : t.textMuted, textTransform: focused || hasVal ? "uppercase" : "none", fontWeight: 400, transition: `all 280ms cubic-bezier(.16,1,.3,1)`, pointerEvents: "none", zIndex: 2, fontFamily: "'DM Sans',sans-serif" }}>{label}</label>
        <input id={id} type={type} value={value} onChange={e => { onChange(e); setTouched(true); }} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} autoComplete={autoComplete} className="lp-input" aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined}
          style={{ width: "100%", height: "60px", paddingTop: "22px", paddingBottom: "8px", paddingLeft: "16px", paddingRight: suffix ? "58px" : "16px", background: focused ? t.bgInputFocus : t.bgInput, border: `1px solid ${error && touched ? t.error + "80" : focused ? t.borderFocus : t.border}`, borderRadius: tokens.radius.md, color: t.textPrimary, fontSize: "14px", fontFamily: "'DM Sans',sans-serif", fontWeight: 400, outline: "none", transition: `all 280ms cubic-bezier(.16,1,.3,1)`, boxShadow: focused ? `0 0 0 3px ${t.gold}20,0 8px 28px rgba(0,0,0,.15),inset 0 1px 0 ${t.gold}12` : error && touched ? `0 0 0 2px ${t.error}18` : "none", backdropFilter: "blur(8px)" }}
        />
        <div style={{ position: "absolute", bottom: 0, left: "16px", right: "16px", height: "2px", background: `linear-gradient(to right,${t.gold},${t.goldLight},${t.gold})`, backgroundSize: "200%", transform: `scaleX(${focused ? 1 : 0})`, transformOrigin: "left", transition: `transform 280ms cubic-bezier(.16,1,.3,1)`, borderRadius: "0 0 1px 1px", animation: focused ? "shimmerLoop 1.8s linear infinite" : "none" }} />
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: tokens.radius.md, pointerEvents: "none" }}><Rips /></div>
        {suffix && <div style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)" }}>{suffix}</div>}
      </div>
      {error && touched && <div id={`${id}-error`} role="alert" style={{ marginTop: "7px", fontSize: "11px", color: t.error, display: "flex", alignItems: "center", gap: "5px", animation: `fadeUp 280ms both`, paddingLeft: "2px", letterSpacing: "0.02em" }}><span>⚠</span> {error}</div>}
    </div>
  );
};

export default function RestaurantLogin() {
  const [themeKey, setThemeKey] = useState("dark");
  const [themeFading, setThemeFading] = useState(false);
  const [selectedRole, setSelectedRole] = useState("guest");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [entered, setEntered] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const [roleHover, setRoleHover] = useState(null);

  const t = themes[themeKey];
  const rightRef = useRef(null);
  const cardRef = useRef(null);
  const cursorGlowRef = useCursorGlow(rightRef);
  useTilt(cardRef, 4);
  const { fire: fireBtn, Rips: BtnRips } = useRipple(t.gold + "55");

  useEffect(() => { const tm = setTimeout(() => setEntered(true), 80); return () => clearTimeout(tm); }, []);
  useEffect(() => {
    const upd = () => setTimeStr(new Date().toLocaleTimeString(navigator.language, { hour: "2-digit", minute: "2-digit", timeZoneName: "short" }));
    upd(); const iv = setInterval(upd, 60000); return () => clearInterval(iv);
  }, []);
  useEffect(() => {
    const id = "lp-css";
    if (!document.getElementById(id)) { const el = document.createElement("style"); el.id = id; el.textContent = buildCSS(); document.head.appendChild(el); }
  }, []);

  const switchTheme = useCallback((k) => { setThemeFading(true); setTimeout(() => { setThemeKey(k); setThemeFading(false); }, 180); }, []);
  const validate = () => {
    const e = {};
    if (!email) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Please enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters required";
    return e;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setIsLoading(true);
    await new Promise(r => setTimeout(r, 2700));
    setIsLoading(false); setIsSuccess(true);
  };

  return (
    <div className="lp-root" style={{ minHeight: "100vh", display: "flex", alignItems: "stretch", background: t.bg, transition: `background 500ms cubic-bezier(.16,1,.3,1)`, opacity: themeFading ? 0 : 1, "--gold": t.gold }}>
      <LeftPanel t={t} entered={entered} />
      <div ref={rightRef} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 40px", position: "relative", overflowY: "auto", background: `radial-gradient(ellipse at 60% 20%,${t.gold}07 0%,transparent 55%)` }}>
        <div ref={cursorGlowRef} style={{ position: "absolute", width: "320px", height: "320px", borderRadius: "50%", background: `radial-gradient(circle,${t.gold}14 0%,transparent 70%)`, pointerEvents: "none", zIndex: 0, transition: "opacity .3s", opacity: 0, willChange: "transform" }} />
        
        <div style={{ position: "absolute", top: "28px", right: "28px", display: "flex", gap: "8px", alignItems: "center", zIndex: 10, opacity: entered ? 1 : 0, animation: entered ? `fadeIn .8s .9s both` : "none" }} role="group" aria-label="Color theme">
          {Object.entries(themes).map(([k, th]) => (
            <button key={k} className="theme-dot" onClick={() => switchTheme(k)} aria-label={th.name} aria-pressed={themeKey === k} style={{ width: themeKey === k ? "34px" : "10px", height: "10px", borderRadius: "5px", border: "none", cursor: "pointer", background: themeKey === k ? t.gold : t.border, transition: `all 380ms cubic-bezier(.34,1.56,.64,1)`, boxShadow: themeKey === k ? `0 0 14px ${t.gold}70` : "none" }} />
          ))}
        </div>

        {timeStr && <div style={{ position: "absolute", bottom: "20px", right: "28px", fontSize: "11px", color: t.textMuted, fontFamily: "'DM Mono',monospace", letterSpacing: "0.08em", opacity: entered ? .65 : 0, animation: entered ? `fadeIn 1s 1.6s both` : "none" }}>{timeStr}</div>}

        <div ref={cardRef} style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1, opacity: entered ? 1 : 0, animation: entered ? `scaleIn .85s .1s cubic-bezier(.16,1,.3,1) both` : "none", transition: "transform .18s ease-out", transformStyle: "preserve-3d" }}>
          <svg style={{ position: "absolute", inset: "-2px", width: "calc(100% + 4px)", height: "calc(100% + 4px)", pointerEvents: "none", overflow: "visible" }}>
            <rect x="1" y="1" width="calc(100% - 2px)" height="calc(100% - 2px)" rx="20" ry="20" fill="none" stroke={t.gold} strokeWidth="1.5" opacity=".35" strokeDasharray="1600" style={{ animation: entered ? `svgTrace 2.8s .4s cubic-bezier(.16,1,.3,1) both` : "none" }} />
          </svg>
          <div style={{ position: "relative", overflow: "hidden", background: `linear-gradient(160deg,${t.bgCard},rgba(255,255,255,.01))`, border: `1px solid ${t.border}`, borderRadius: tokens.radius.lg, padding: "40px 36px", backdropFilter: "blur(20px)", boxShadow: `0 40px 100px rgba(0,0,0,.35),inset 0 1px 0 ${t.gold}15` }}>
            <div style={{ position: "absolute", top: 0, left: "-100%", width: "60%", height: "100%", background: `linear-gradient(105deg,transparent,${t.gold}06,transparent)`, animation: `magicShimmer 6s 2s ease-in-out infinite`, pointerEvents: "none" }} />

            {!isSuccess ? (
              <>
                <div style={{ marginBottom: "30px", textAlign: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "12px", opacity: entered ? 1 : 0, animation: entered ? `fadeUp .5s .2s both` : "none" }}>
                    <div style={{ height: "1px", flex: 1, background: `linear-gradient(to right,transparent,${t.gold}60)`, transformOrigin: "right", animation: entered ? `drawLine .9s .4s both` : "none" }} />
                    <span style={{ fontSize: "10px", letterSpacing: "0.3em", color: t.gold, textTransform: "uppercase", whiteSpace: "nowrap" }}>Welcome Back</span>
                    <div style={{ height: "1px", flex: 1, background: `linear-gradient(to left,transparent,${t.gold}60)`, transformOrigin: "left", animation: entered ? `drawLine .9s .4s both` : "none" }} />
                  </div>
                  <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "34px", fontWeight: 400, color: t.textPrimary, letterSpacing: "-0.01em", lineHeight: 1.15, opacity: entered ? 1 : 0, animation: entered ? `fadeUp .6s .25s both` : "none" }}>
                    Sign In to <em style={{ color: t.gold, fontStyle: "italic" }}>Aurum</em>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} noValidate aria-label="Login form">
                  <div style={{ marginBottom: "24px", opacity: entered ? 1 : 0, animation: entered ? `fadeUp .6s .3s both` : "none" }} role="group" aria-label="Access Level">
                    <div style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: t.textMuted, marginBottom: "10px", fontWeight: 500 }}>Access Level</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                      {roles.map(role => {
                        const active = selectedRole === role.id;
                        const hov = roleHover === role.id;
                        return (
                          <button key={role.id} type="button" className="role-card" onClick={() => setSelectedRole(role.id)} onMouseEnter={() => setRoleHover(role.id)} onMouseLeave={() => setRoleHover(null)} aria-pressed={active}
                            style={{ padding: "14px 8px", background: active ? t.goldDim : hov ? `${t.gold}09` : t.bgCard, border: `1px solid ${active ? t.gold + "60" : hov ? t.gold + "28" : t.border}`, borderRadius: tokens.radius.md, cursor: "pointer", transition: `all 280ms cubic-bezier(.34,1.56,.64,1)`, textAlign: "center", boxShadow: active ? t.shadowGold : "none", transform: active ? "translateY(-3px) scale(1.03)" : hov ? "translateY(-1px)" : "none" }}>
                            <div style={{ fontSize: "18px", color: active ? t.gold : t.textMuted, marginBottom: "5px", transition: `transform 280ms cubic-bezier(.34,1.56,.64,1),color 280ms`, transform: active ? "scale(1.25) rotate(12deg)" : hov ? "scale(1.1)" : "scale(1)", display: "block" }}>{role.icon}</div>
                            <div style={{ fontSize: "11px", fontWeight: 500, color: active ? t.textPrimary : t.textSecondary, letterSpacing: "0.04em" }}>{role.label}</div>
                            <div style={{ fontSize: "9px", color: t.textMuted, marginTop: "2px" }}>{role.desc}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <InputField id="email" label="Email Address" type="email" value={email} onChange={e => { setEmail(e.target.value); if (errors.email) setErrors(p => ({ ...p, email: "" })); }} error={errors.email} theme={t} autoComplete="email" delay={380} entered={entered} />
                  </div>
                  <div style={{ marginBottom: "8px" }}>
                    <InputField id="password" label="Password" type={showPassword ? "text" : "password"} value={password} onChange={e => { setPassword(e.target.value); if (errors.password) setErrors(p => ({ ...p, password: "" })); }} error={errors.password} theme={t} autoComplete="current-password" delay={460} entered={entered}
                      suffix={<button type="button" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? "Hide" : "Show"} style={{ background: "none", border: "none", cursor: "pointer", color: t.textMuted, fontSize: "10px", letterSpacing: "0.08em", padding: "4px", fontFamily: "'DM Sans',sans-serif", transition: `color 280ms,transform 280ms cubic-bezier(.34,1.56,.64,1)`, transform: showPassword ? "scale(1.08)" : "scale(1)" }} onMouseEnter={e => e.currentTarget.style.color = t.gold} onMouseLeave={e => e.currentTarget.style.color = t.textMuted}>{showPassword ? "HIDE" : "SHOW"}</button>}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "22px", opacity: entered ? 1 : 0, animation: entered ? `fadeIn .6s .6s both` : "none" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", userSelect: "none" }}>
                      <div role="checkbox" aria-checked={rememberMe} tabIndex={0} onClick={() => setRememberMe(v => !v)} onKeyDown={e => e.key === " " && setRememberMe(v => !v)}
                        style={{ width: "18px", height: "18px", border: `1.5px solid ${rememberMe ? t.gold : t.border}`, borderRadius: "4px", background: rememberMe ? t.gold : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: `all 280ms cubic-bezier(.34,1.56,.64,1)`, cursor: "pointer", transform: rememberMe ? "scale(1.12) rotate(3deg)" : "scale(1)", boxShadow: rememberMe ? `0 0 10px ${t.gold}55` : "none" }}>
                        {rememberMe && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.8 7L9 1" stroke={themeKey === "light" ? "#fff" : "#07070c"} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="20" style={{ animation: `checkDraw .3s cubic-bezier(.16,1,.3,1) both` }} /></svg>}
                      </div>
                      <span style={{ fontSize: "12px", color: t.textSecondary }}>Remember me</span>
                    </label>
                    <a href="#forgot" className="lp-link" onClick={e => e.preventDefault()} style={{ fontSize: "12px", color: t.gold, textDecoration: "none", borderBottom: `1px solid ${t.gold}40`, paddingBottom: "1px", transition: `all 280ms` }} onMouseEnter={e => { e.currentTarget.style.color = t.goldLight; e.currentTarget.style.letterSpacing = "0.04em"; }} onMouseLeave={e => { e.currentTarget.style.color = t.gold; e.currentTarget.style.letterSpacing = "0"; }}>Forgot password?</a>
                  </div>

                  <div style={{ opacity: entered ? 1 : 0, animation: entered ? `fadeUp .6s .68s both` : "none" }}>
                    {isLoading && <div style={{ height: "2px", borderRadius: "1px", marginBottom: "8px", background: t.border, overflow: "hidden" }}><div style={{ height: "100%", background: `linear-gradient(to right,${t.gold},${t.goldLight})`, animation: `progressFill 2.5s cubic-bezier(.16,1,.3,1) forwards`, boxShadow: `0 0 10px ${t.gold}90` }} /></div>}
                    <button type="submit" className="lp-btn" disabled={isLoading} aria-label="Sign in" onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)} onClick={e => { if (!isLoading) fireBtn(e); }}
                      style={{ width: "100%", height: "58px", background: isLoading ? t.goldDim : `linear-gradient(135deg,${t.gold} 0%,${t.goldLight} 40%,${t.gold} 70%,${t.goldLight} 100%)`, backgroundSize: "300% 100%", backgroundPosition: btnHover && !isLoading ? "100% 0" : "0 0", border: "none", borderRadius: tokens.radius.md, color: themeKey === "light" ? "#fff" : "#07070c", fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", cursor: isLoading ? "not-allowed" : "pointer", position: "relative", overflow: "hidden", boxShadow: isLoading ? "none" : btnHover ? `0 18px 55px ${t.gold}65,0 6px 20px ${t.gold}35` : `0 8px 32px ${t.gold}30,0 2px 8px ${t.gold}15`, transition: `all 280ms cubic-bezier(.16,1,.3,1)`, transform: isLoading ? "none" : btnHover ? "translateY(-3px) scale(1.015)" : "none" }}>
                      {!isLoading && btnHover && <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: `linear-gradient(105deg,transparent 35%,rgba(255,255,255,.28) 50%,transparent 65%)`, animation: `shimmerSweep .7s cubic-bezier(.16,1,.3,1)`, pointerEvents: "none" }} />}
                      <BtnRips />
                      {isLoading ? (
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                          <div style={{ position: "relative", width: "24px", height: "24px" }}>
                            <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${t.gold}30`, borderTopColor: t.gold, animation: `spinRing .65s linear infinite` }} />
                            <div style={{ position: "absolute", inset: "5px", borderRadius: "50%", border: `1.5px solid ${t.gold}18`, borderBottomColor: t.goldLight, animation: `spinRingR 1s linear infinite` }} />
                          </div>
                          <span style={{ color: t.gold, letterSpacing: "0.15em" }}>Authenticating</span>
                        </div>
                      ) : (
                        <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          Enter Aurum
                          <span style={{ fontSize: "16px", transform: btnHover ? "translateX(5px)" : "translateX(0)", transition: `transform 280ms cubic-bezier(.34,1.56,.64,1)`, display: "inline-block" }}>→</span>
                        </span>
                      )}
                    </button>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "14px", margin: "22px 0", opacity: entered ? 1 : 0, animation: entered ? `fadeIn .6s .75s both` : "none" }}>
                    <div style={{ flex: 1, height: "1px", background: t.border }} />
                    <span style={{ fontSize: "10px", color: t.textMuted, letterSpacing: "0.15em" }}>OR</span>
                    <div style={{ flex: 1, height: "1px", background: t.border }} />
                  </div>
                  <div style={{ textAlign: "center", opacity: entered ? 1 : 0, animation: entered ? `fadeIn .6s .8s both` : "none" }}>
                    <span style={{ fontSize: "13px", color: t.textMuted }}>New to Aurum? </span>
                    <a href="#signup" className="lp-link" onClick={e => e.preventDefault()} style={{ fontSize: "13px", color: t.gold, textDecoration: "none", fontWeight: 500, borderBottom: `1px solid ${t.gold}50`, paddingBottom: "1px", transition: `all 280ms` }} onMouseEnter={e => { e.currentTarget.style.color = t.goldLight; e.currentTarget.style.letterSpacing = "0.03em"; }} onMouseLeave={e => { e.currentTarget.style.color = t.gold; e.currentTarget.style.letterSpacing = "0"; }}>Request an invitation</a>
                  </div>
                </form>
              </>
            ) : (
              <div style={{ textAlign: "center", animation: `successBounce .85s cubic-bezier(.34,1.56,.64,1) both`, position: "relative" }} role="status" aria-live="polite">
                <Confetti gold={t.gold} />
                {[0, .3, .6].map((d, i) => <div key={i} style={{ position: "absolute", top: "72px", left: "50%", width: "84px", height: "84px", borderRadius: "50%", border: `1px solid ${t.success}50`, animation: `ringExpand 1.8s ${d}s cubic-bezier(0,0,.2,1) infinite`, pointerEvents: "none" }} />)}
                <div style={{ width: "84px", height: "84px", borderRadius: "50%", background: t.successBg, border: `1.5px solid ${t.success}60`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", boxShadow: `0 0 60px ${t.success}30`, position: "relative", zIndex: 1, animation: "breatheBox 3s ease-in-out infinite" }}>
                  <svg width="36" height="28" viewBox="0 0 36 28" fill="none"><path d="M2 14L13 25L34 2" stroke={t.success} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="80" style={{ animation: `checkDraw .75s .3s cubic-bezier(.16,1,.3,1) both` }} /></svg>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "30px", fontWeight: 400, color: t.textPrimary, marginBottom: "10px" }}>Welcome to Aurum</h3>
                <p style={{ fontSize: "13px", color: t.textSecondary, marginBottom: "28px", lineHeight: 1.65 }}>Your table is being prepared.<br />Redirecting you now.</p>
                <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "28px" }}>
                  {[0, 1, 2].map(i => <div key={i} style={{ width: "7px", height: "7px", borderRadius: "50%", background: t.gold, animation: `pulseDot 1.2s ${i * .22}s ease-in-out infinite` }} />)}
                </div>
                <button onClick={() => { setIsSuccess(false); setEmail(""); setPassword(""); setErrors({}); }} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: tokens.radius.md, padding: "12px 24px", color: t.textSecondary, fontSize: "12px", cursor: "pointer", letterSpacing: "0.1em", fontFamily: "'DM Sans',sans-serif", transition: `all 280ms` }} onMouseEnter={e => { e.currentTarget.style.borderColor = t.gold + "60"; e.currentTarget.style.color = t.gold; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.color = t.textSecondary; e.currentTarget.style.transform = "none"; }}>← Return to Login</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
