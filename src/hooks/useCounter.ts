"use client";

import { useEffect, useRef, useState } from "react";

interface UseCounterOptions {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

/**
 * Animates a number from 0 to `target` over `duration` ms using easeOutQuart.
 * Starts when the element enters the viewport.
 * Returns { ref, display } — attach ref to any HTMLElement, render display.
 */
export function useCounter<T extends HTMLElement = HTMLElement>({
  target,
  duration = 1800,
  prefix = "",
  suffix = "",
}: UseCounterOptions) {
  const ref = useRef<T>(null);
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;
        observer.unobserve(el);

        const startTime = performance.now();

        function easeOutQuart(t: number) {
          return 1 - Math.pow(1 - t, 4);
        }

        function tick(now: number) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const value = Math.round(easeOutQuart(progress) * target);
          setDisplay(`${prefix}${value}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, prefix, suffix]);

  return { ref, display };
}
