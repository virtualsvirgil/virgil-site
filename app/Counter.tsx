"use client";

import { useEffect, useRef, useState } from "react";

/** Animated count-up readout. Mirrors the prototype's ease-out cubic to `to`. */
export default function Counter({
  to,
  dec = 0,
  delay = 550,
  durationMs = 1500,
}: {
  to: number;
  dec?: number;
  delay?: number;
  durationMs?: number;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    // Respect reduced-motion: jump straight to the final value.
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(to);
      return;
    }
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      let p = Math.min((now - start) / durationMs, 1);
      p = 1 - Math.pow(1 - p, 3);
      setVal(to * p);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    const t = setTimeout(() => {
      raf.current = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(t);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [to, dec, delay, durationMs]);

  const text =
    dec > 0 ? val.toFixed(dec) : Math.round(val).toLocaleString("en-US");
  return <>{text}</>;
}
