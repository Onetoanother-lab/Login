import { STARS, CONSTELLATION_LINES } from "../constants";

export const StarField = ({ gold }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }}
  >
    {CONSTELLATION_LINES.map(([a,b,op],i)=>(
      <line key={i} x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y} stroke={gold} strokeWidth=".07" strokeOpacity={op}/>
    ))}
    {STARS.map((s,i)=>(
      <circle key={i} cx={s.x} cy={s.y} r={s.big?s.size*1.9:s.size} fill={gold}
        style={{ "--star-base":s.base, opacity:s.base, animation:`au-starTwinkle ${s.dur}s ${s.del}s ease-in-out infinite` }}
      />
    ))}
    {/* 3 shooting stars */}
    <line x1="12" y1="6"  x2="20" y2="9"  stroke={gold} strokeWidth=".22" strokeOpacity=".7" strokeLinecap="round" style={{ animation:"au-shoot1 14s 2s ease-out infinite" }}/>
    <line x1="70" y1="18" x2="76" y2="21" stroke={gold} strokeWidth=".16" strokeOpacity=".55" strokeLinecap="round" style={{ animation:"au-shoot2 19s 8s ease-out infinite" }}/>
    <line x1="45" y1="4"  x2="52" y2="7"  stroke={gold} strokeWidth=".19" strokeOpacity=".65" strokeLinecap="round" style={{ animation:"au-shoot3 22s 14s ease-out infinite" }}/>
  </svg>
);
