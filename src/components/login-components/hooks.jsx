import { useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// CUSTOM HOOKS
// ─────────────────────────────────────────────────────────────

export function useGlobalStyles(css) {
  useEffect(() => {
    const id = "aurum-login-styles";
    if (document.getElementById(id)) return;
    const el = document.createElement("style");
    el.id = id; el.textContent = css;
    document.head.appendChild(el);
  }, []);
}

export function useClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () => new Date().toLocaleTimeString(navigator.language, { hour:"2-digit", minute:"2-digit", timeZoneName:"short" });
    setTime(fmt());
    const iv = setInterval(() => setTime(fmt()), 60000);
    return () => clearInterval(iv);
  }, []);
  return time;
}

export function useIsMobile(bp = 768) {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" ? window.innerWidth <= bp : false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${bp}px)`);
    const h = e => setMobile(e.matches);
    mq.addEventListener("change", h);
    setMobile(mq.matches);
    return () => mq.removeEventListener("change", h);
  }, [bp]);
  return mobile;
}

export function useRipple(color) {
  const [ripples, setRipples] = useState([]);
  const fire = useCallback(e => {
    const r = e.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples(rs => [...rs, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setTimeout(() => setRipples(rs => rs.filter(ri => ri.id !== id)), 900);
  }, []);
  const Ripples = () => (
    <>{ripples.map(rp => <span key={rp.id} aria-hidden="true" style={{ position:"absolute", left:rp.x, top:rp.y, width:12, height:12, borderRadius:"50%", background:color, pointerEvents:"none", animation:"au-ripple .85s var(--ease-out) forwards" }}/>)}</>
  );
  return { fire, Ripples };
}

/* ── Hook: mouse parallax ── */
export function useMouseParallax(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref?.current || window;
    let raf;
    const onMove = e => {
      raf && cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const bounds = ref?.current?.getBoundingClientRect?.() || { left:0, top:0, width:window.innerWidth, height:window.innerHeight };
        const rx = ((e.clientX - bounds.left) / bounds.width  - 0.5) * 2;
        const ry = ((e.clientY - bounds.top)  / bounds.height - 0.5) * 2;
        setPos({ x: rx, y: ry });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); raf && cancelAnimationFrame(raf); };
  }, []);
  return pos;
}
