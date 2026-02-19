import { BOKEH, PARTICLES, GEO_ELEMENTS, DATA_STREAMS } from "../constants";

// ─────────────────────────────────────────────────────────────
// RIGHT PANEL — 12-layer cinematic background system
// ─────────────────────────────────────────────────────────────

export const RightPanelBokeh = ({ t, isDark }) => (
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

export const RightPanelParticles = ({ t }) => (
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

export const RightPanelScanLine = ({ t, isDark }) => (
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
export const RightPanelGeometry = ({ t, isDark }) => (
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
export const RightPanelDataStreams = ({ t, isDark }) => (
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
export const SecurityBadge = ({ t, isDark }) => (
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
export const CardAura = ({ t, isDark, mx, my }) => {
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
export const AmbientSpotlight = ({ t, isDark, mx, my }) => {
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
export const RightPanelBackground = ({ t, isDark, mx, my }) => (
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
