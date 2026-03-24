import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Lenis from "lenis";

export const useSmoothScroll = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) {
      return;
    }

    lenis.start();

    if (location.hash) {
      requestAnimationFrame(() => {
        lenis.scrollTo(location.hash, { offset: -80, duration: 1 });
      });
      return;
    }

    // Preserve browser scroll restoration on back/forward navigation.
    if (navigationType === "POP") {
      return;
    }

    lenis.scrollTo(0, { immediate: true });
  }, [location.pathname, location.hash, navigationType]);
};
