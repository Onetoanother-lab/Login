export const AuroraBands = ({ t }) => (
  <div aria-hidden="true" style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none" }}>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", top:"10%", height:"20%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora1} 30%, ${t.aurora2} 55%, ${t.aurora1} 72%, transparent 100%)`,
      transform:"rotate(-2deg)", animation:"au-aurora1 28s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", bottom:"16%", height:"15%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora2} 35%, ${t.aurora1} 62%, transparent 100%)`,
      transform:"rotate(1.5deg)", animation:"au-aurora2 34s 6s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
    <div style={{
      position:"absolute", left:"-20%", right:"-20%", top:"52%", height:"10%",
      background:`linear-gradient(180deg, transparent 0%, ${t.aurora1} 50%, transparent 100%)`,
      transform:"rotate(-1deg)", animation:"au-aurora1 22s 14s ease-in-out infinite", willChange:"transform,opacity",
    }}/>
  </div>
);
