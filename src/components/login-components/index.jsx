import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate }                        from "react-router-dom";
import { Eye, EyeOff, AlertCircle }                from "lucide-react";

import { THEMES }                from "./tokens";
import { GLOBAL_CSS }            from "./globalCss";
import { useGlobalStyles, useClock, useIsMobile, useRipple, useMouseParallax } from "./hooks.jsx";
import { CinematicIntro }        from "./CinematicIntro";
import { LeftPanel }             from "./LeftPanel";
import { RightPanelBackground }  from "./background/RightPanelBackground";
import { InputField }            from "./InputField";
import { FormDivider }           from "./FormDivider";
import { SecurityBadge }         from "./SecurityBadge";
import { EnhancedSubmitButton }  from "./EnhancedSubmitButton";
import { SuccessScreen }         from "./SuccessScreen";
import { LoginAmbientDust, CardFloatDiamonds, CardHaloRings } from "./CardDecorations";

// ─────────────────────────────────────────────────────────────
// RESTAURANT LOGIN — Main page component
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