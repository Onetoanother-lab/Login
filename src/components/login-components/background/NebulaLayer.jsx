export const NebulaLayer = ({ t, isDark }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
    style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", opacity:isDark?1:.6 }}
  >
    <defs>
      <filter id="nb1"><feGaussianBlur stdDeviation="6"/></filter>
      <filter id="nb2"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    <ellipse cx="22" cy="22" rx="28" ry="22" fill={t.nebula1} filter="url(#nb2)" style={{ animation:"au-nebulaBreath 18s ease-in-out infinite" }}/>
    <ellipse cx="78" cy="80" rx="32" ry="25" fill={t.nebula2} filter="url(#nb2)" style={{ animation:"au-nebulaBreath 24s 4s ease-in-out infinite" }}/>
    <ellipse cx="85" cy="38" rx="14" ry="18" fill={t.nebula1} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 16s 8s ease-in-out infinite" }}/>
    <ellipse cx="15" cy="65" rx="18" ry="14" fill={t.nebula2} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 20s 2s ease-in-out infinite" }}/>
    <ellipse cx="52" cy="52" rx="10" ry="10" fill={t.nebula1} filter="url(#nb1)" style={{ animation:"au-nebulaBreath 28s 12s ease-in-out infinite" }}/>
  </svg>
);
