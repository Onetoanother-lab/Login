// ─────────────────────────────────────────────────────────────
// ASTRONOMICAL MANDALA — Left-panel centrepiece SVG
// ─────────────────────────────────────────────────────────────

export const AstronomicalMandala = ({ gold }) => {
  const outerR = 345, innerR = 65;
  const ticks = Array.from({ length: 96 }, (_, i) => {
    const a = (i / 96) * 2 * Math.PI;
    const isMaj = i % 8 === 0, isMed = i % 4 === 0;
    const len = isMaj ? 16 : isMed ? 9 : 4;
    return {
      cx: 400 + Math.cos(a) * outerR, cy: 400 + Math.sin(a) * outerR,
      ox: 400 + Math.cos(a) * (outerR - len), oy: 400 + Math.sin(a) * (outerR - len),
      isMaj, isMed,
    };
  });
  const radials = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * 2 * Math.PI;
    return { x1: 400 + Math.cos(a) * innerR, y1: 400 + Math.sin(a) * innerR, x2: 400 + Math.cos(a) * outerR, y2: 400 + Math.sin(a) * outerR, major: i % 3 === 0 };
  });
  const diamonds = [0,45,90,135,180,225,270,315].map(deg => {
    const a = deg * Math.PI / 180, r = deg % 90 === 0 ? outerR : 280;
    return { cx: 400 + Math.cos(a) * r, cy: 400 + Math.sin(a) * r, size: deg % 90 === 0 ? 5 : 3, deg };
  });
  const hex1 = Array.from({length:6},(_,i)=>{ const a=(i/6)*2*Math.PI; return `${400+Math.cos(a)*160},${400+Math.sin(a)*160}`; }).join(" ");
  const hex2 = Array.from({length:6},(_,i)=>{ const a=(i/6)*2*Math.PI+Math.PI/6; return `${400+Math.cos(a)*160},${400+Math.sin(a)*160}`; }).join(" ");
  const oct  = Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return `${400+Math.cos(a)*220},${400+Math.sin(a)*220}`; }).join(" ");

  return (
    <svg viewBox="0 0 800 800" aria-hidden="true" style={{ position:"absolute", width:"162%", height:"162%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none", overflow:"visible" }}>
      <defs>
        <radialGradient id="mgCG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={gold} stopOpacity="0.3" />
          <stop offset="55%"  stopColor={gold} stopOpacity="0.07" />
          <stop offset="100%" stopColor={gold} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mgIG" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={gold} stopOpacity="0.22" />
          <stop offset="100%" stopColor={gold} stopOpacity="0"    />
        </radialGradient>
        <filter id="mgBlur"><feGaussianBlur stdDeviation="1.8"/></filter>
      </defs>

      {/* Outer rotating ring + ticks */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpin 120s linear infinite", willChange:"transform" }}>
        <circle cx="400" cy="400" r={outerR} fill="none" stroke={gold} strokeWidth=".7" strokeOpacity=".2"/>
        <circle cx="400" cy="400" r={outerR-10} fill="none" stroke={gold} strokeWidth=".3" strokeOpacity=".07" strokeDasharray="2 6"/>
        {ticks.map((tk,i)=>(
          <line key={i} x1={tk.cx} y1={tk.cy} x2={tk.ox} y2={tk.oy} stroke={gold}
            strokeWidth={tk.isMaj?1.2:tk.isMed?.6:.35}
            strokeOpacity={tk.isMaj?.38:tk.isMed?.2:.1}
          />
        ))}
        {diamonds.map((d,i)=>(
          <g key={i} transform={`translate(${d.cx},${d.cy}) rotate(${d.deg+45})`}>
            <rect x={-d.size} y={-d.size} width={d.size*2} height={d.size*2} fill="none" stroke={gold} strokeWidth={i%2===0?.9:.5} strokeOpacity={i%2===0?.5:.25}/>
          </g>
        ))}
      </g>

      {/* Inner counter-rotating geometry */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpinR 80s linear infinite", willChange:"transform" }}>
        {[280,220,160,130,90,65].map((r,i)=>(
          <circle key={r} cx="400" cy="400" r={r} fill="none" stroke={gold}
            strokeWidth={i===0||i===5?.6:.4}
            strokeOpacity={[.14,.12,.16,.1,.08,.18][i]}
            strokeDasharray={i===1?"5 9":i===3?"3 12":undefined}
          />
        ))}
        {radials.map((l,i)=>(
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke={gold} strokeWidth={l.major?.5:.3} strokeOpacity={l.major?.2:.08}/>
        ))}
        <polygon points={hex1} fill="none" stroke={gold} strokeWidth=".45" strokeOpacity=".14"/>
        <polygon points={hex2} fill="none" stroke={gold} strokeWidth=".45" strokeOpacity=".14"/>
        <polygon points={oct}  fill="none" stroke={gold} strokeWidth=".4"  strokeOpacity=".11"/>
        {/* Intersection dots */}
        {Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return <circle key={i} cx={400+Math.cos(a)*220} cy={400+Math.sin(a)*220} r="1.6" fill={gold} fillOpacity=".35"/>; })}
      </g>

      {/* Tertiary slow mid-ring */}
      <g style={{ transformOrigin:"400px 400px", animation:"au-mandalaSpin 58s linear infinite", willChange:"transform" }}>
        <circle cx="400" cy="400" r="305" fill="none" stroke={gold} strokeWidth=".35" strokeOpacity=".09" strokeDasharray="8 16"/>
        {Array.from({length:8},(_,i)=>{ const a=(i/8)*2*Math.PI; return <circle key={i} cx={400+Math.cos(a)*305} cy={400+Math.sin(a)*305} r="2" fill="none" stroke={gold} strokeWidth=".6" strokeOpacity=".3"/>; })}
      </g>

      {/* Glow fills */}
      <circle cx="400" cy="400" r="210" fill="url(#mgCG)"/>
      <circle cx="400" cy="400" r="72"  fill="url(#mgIG)"/>
      {/* Pulsing core */}
      <circle cx="400" cy="400" r="6.5" fill="none" stroke={gold} strokeWidth="1.2" strokeOpacity=".5" filter="url(#mgBlur)"/>
      <circle cx="400" cy="400" r="4"   fill="none" stroke={gold} strokeWidth=".8"  strokeOpacity=".7"/>
      <circle cx="400" cy="400" r="1.8" fill={gold} fillOpacity=".9" style={{ animation:"au-coreGlow 3s ease-in-out infinite" }}/>
    </svg>
  );
}