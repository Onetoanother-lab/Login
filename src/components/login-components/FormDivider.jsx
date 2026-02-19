// ─────────────────────────────────────────────────────────────
// FORM DIVIDER — Animated gold rule between header and form
// ─────────────────────────────────────────────────────────────

export const FormDivider = ({ t, delay = 0 }) => {
  const G = t.gold;
  return (
    <div aria-hidden="true" style={{ position:"relative", height:1, margin:"0 0 22px" }}>
      <div style={{
        position:"absolute", left:0, right:0, top:"50%", height:".5px",
        background:`linear-gradient(to right,transparent,${G}55 20%,${G}88 50%,${G}55 80%,transparent)`,
        transform:"scaleX(0) translateY(-50%)", transformOrigin:"center",
        animation:`lp-dividerIn 1.0s ${delay}ms cubic-bezier(0.16,1,0.3,1) both`,
      }}/>
      <div style={{
        position:"absolute", left:"50%", top:"50%",
        width:4, height:4, marginLeft:-2, marginTop:-2,
        background:G, transform:"rotate(45deg)",
        animation:`lp-dividerDot 3.5s ${delay+400}ms ease-in-out infinite`,
        boxShadow:`0 0 6px ${G}88`,
      }}/>
    </div>
  );
};
