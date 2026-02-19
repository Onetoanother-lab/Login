import { PanelBackground } from "./background/PanelBackground";

// ─────────────────────────────────────────────────────────────
// LEFT PANEL — Brand story, stats, Michelin badge
// ─────────────────────────────────────────────────────────────

export const LeftPanel = ({ t, ready, themeKey }) => {
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
