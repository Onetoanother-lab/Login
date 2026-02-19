import { LP_DUST, LP_STREAKS } from "./constants";

// ─────────────────────────────────────────────────────────────
// CARD DECORATIONS
// LoginAmbientDust  — rising dust motes + diagonal streaks
// CardFloatDiamonds — ornament diamonds around the card
// CardHaloRings     — expanding halo rings from card edge
// ─────────────────────────────────────────────────────────────

export const LoginAmbientDust = ({ t, ready }) => {
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
export const CardFloatDiamonds = ({ t, ready }) => {
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
export const CardHaloRings = ({ t, ready }) => {
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
