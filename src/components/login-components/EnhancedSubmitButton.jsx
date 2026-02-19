import { ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────────────────────
// ENHANCED SUBMIT BUTTON — Orbital energy field, ripple, shimmer
// ─────────────────────────────────────────────────────────────

/** Submit button with orbital energy field */
export const EnhancedSubmitButton = ({ t, isDark, isLoading, btnHover, setBtnHover, fireBtn, BtnRipples, ready }) => {
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
