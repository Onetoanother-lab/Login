// ─────────────────────────────────────────────────────────────
// SECURITY BADGE — 256-bit encrypted indicator
// ─────────────────────────────────────────────────────────────

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
