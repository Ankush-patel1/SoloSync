import { useState, useEffect, useRef } from 'react';

/**
 * Tracks scroll progress (0→1) within a scroll container element.
 * The container should be taller than the viewport (e.g. 550vh).
 * While the sticky inner element is visible, progress animates through [0,1].
 */
export function useScrollAnimation(containerRef) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      if (!containerRef.current) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const el = containerRef.current;
      const containerTop = el.offsetTop;
      const containerHeight = el.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollableDistance = containerHeight - windowHeight;

      const scrolled = window.scrollY - containerTop;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

      setScrollProgress(progress);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [containerRef]);

  return scrollProgress;
}
