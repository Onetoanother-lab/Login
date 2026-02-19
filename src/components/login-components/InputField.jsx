import { useState } from "react";
import { useRipple } from "./hooks.jsx";

// ─────────────────────────────────────────────────────────────
// INPUT FIELD — Floating label, error shake, focus glow
// ─────────────────────────────────────────────────────────────

export const InputField = ({ id, label, type, value, onChange, error, t, suffix, autoComplete, animDelay, ready, hasError }) => {
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
