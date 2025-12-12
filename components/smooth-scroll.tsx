"use client";

import Lenis from "lenis";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";

type SmoothScrollContextValue = {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void;
};

const SmoothScrollContext = createContext<SmoothScrollContextValue | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(SmoothScrollContext);
  if (!ctx) throw new Error("useSmoothScroll must be used within SmoothScroll");
  return ctx;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const root = document.documentElement;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenisRef.current = lenis;

    root.classList.add("lenis", "lenis-smooth");

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      root.classList.remove("lenis", "lenis-smooth");
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback(
    (target: string | HTMLElement, options?: { offset?: number }) => {
      const lenis = lenisRef.current;
      if (!lenis) return;

      const el =
        typeof target === "string" ? (document.querySelector(target) as HTMLElement | null) : target;

      if (!el) return;

      lenis.scrollTo(el, { offset: options?.offset ?? 0 });
    },
    [],
  );

  const value = useMemo(() => ({ scrollTo }), [scrollTo]);

  return <SmoothScrollContext.Provider value={value}>{children}</SmoothScrollContext.Provider>;
}
