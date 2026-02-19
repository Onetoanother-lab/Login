import { useState, useEffect } from "react";
import {
  FG_PARTICLES, BG_PARTICLES, DEBRIS, RAYS,
  M_RINGS, M_TICKS, M_SPOKES, M_DIAMONDS, HALOS,
  LETTERS, ACCOLADES, TIMELINE, FLARES, EMBERS, STATS
} from "./constants";

export const CinematicIntro = ({ gold = "#c9a84c", goldLight = "#e8c97a", onComplete }) => {
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
