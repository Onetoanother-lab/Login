import { AstronomicalMandala } from "./AstronomicalMandala";
import { StarField }           from "./StarField";
import { NebulaLayer }         from "./NebulaLayer";
import { AuroraBands }         from "./AuroraBands";

/** 11-plane cinematic left-panel background */
/** 11-plane cinematic background */
export const PanelBackground = ({ t, isDark }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>

    {/* P1 — Deep base gradient */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? `radial-gradient(ellipse 90% 65% at 18% 12%, rgba(201,168,76,.16) 0%, transparent 52%),
           radial-gradient(ellipse 70% 80% at 88% 95%, rgba(55,35,180,.2)   0%, transparent 58%),
           radial-gradient(ellipse 55% 55% at 60% 50%, rgba(8,5,22,.88)     0%, transparent 85%),
           linear-gradient(172deg, #05050e 0%, #090714 28%, #070511 58%, #040309 100%)`
        : `radial-gradient(ellipse 90% 65% at 18% 12%, rgba(160,120,40,.14) 0%, transparent 52%),
           radial-gradient(ellipse 70% 80% at 88% 95%, rgba(90,70,200,.08)  0%, transparent 58%),
           linear-gradient(172deg, #e4ddd0 0%, #d9d0c0 28%, #e0d8cc 58%, #eae3d8 100%)`,
    }}/>

    {/* P2 — Nebula colour clouds */}
    <NebulaLayer t={t} isDark={isDark}/>

    {/* P3 — Aurora bands */}
    <AuroraBands t={t}/>

    {/* P4 — Mandala (hero) */}
    <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", opacity:isDark?1:.65 }}>
      <AstronomicalMandala gold={t.gold}/>
    </div>

    {/* P5 — Star field */}
    <div style={{ position:"absolute", inset:0, opacity:isDark?1:.28 }}>
      <StarField gold={t.gold}/>
    </div>

    {/* P6 — Warm gold orb top-left */}
    <div style={{ position:"absolute", width:750, height:750, borderRadius:"50%", top:"-300px", left:"-220px", background:`radial-gradient(circle, ${t.orb1} 0%, transparent 60%)`, animation:"au-orbFloat 28s ease-in-out infinite", willChange:"transform" }}/>

    {/* P7 — Cool deep-space orb bottom-right */}
    <div style={{ position:"absolute", width:560, height:560, borderRadius:"50%", bottom:"-200px", right:"-140px", background:`radial-gradient(circle, ${t.orb2} 0%, transparent 62%)`, animation:"au-orbFloat2 38s ease-in-out infinite", willChange:"transform" }}/>

    {/* P8 — Mid accent orb */}
    <div style={{ position:"absolute", width:340, height:340, borderRadius:"50%", top:"35%", right:"5%", background:`radial-gradient(circle, ${t.nebula2} 0%, transparent 65%)`, animation:"au-orbFloat3 46s ease-in-out infinite", willChange:"transform" }}/>

    {/* P9 — Cinematic vignette */}
    <div style={{
      position:"absolute", inset:0,
      background: isDark
        ? "radial-gradient(ellipse 68% 78% at 38% 44%, transparent 28%, rgba(3,2,8,.72) 68%, rgba(1,0,4,.96) 100%)"
        : "radial-gradient(ellipse 68% 78% at 38% 44%, transparent 28%, rgba(90,80,60,.25) 68%, rgba(70,58,40,.52) 100%)",
    }}/>

    {/* P10 — Dense film grain */}
    <div style={{
      position:"absolute", inset:"-80px", opacity:isDark?.065:.045,
      backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
      backgroundSize:"200px", mixBlendMode:isDark?"screen":"multiply", pointerEvents:"none",
    }}/>

    {/* P11 — Scanlines */}
    <div style={{
      position:"absolute", inset:0,
      backgroundImage:`repeating-linear-gradient(0deg, transparent, transparent 3px, ${isDark?"rgba(0,0,0,.07)":"rgba(0,0,0,.028)"} 3px, ${isDark?"rgba(0,0,0,.07)":"rgba(0,0,0,.028)"} 4px)`,
      pointerEvents:"none",
    }}/>

    {/* Seam dissolve into right panel */}
    <div style={{
      position:"absolute", right:0, top:0, bottom:0, width:"40%",
      background: isDark ? "linear-gradient(to right, transparent, rgba(3,2,8,.62))" : "linear-gradient(to right, transparent, rgba(220,214,200,.58))",
    }}/>
  </div>
);
