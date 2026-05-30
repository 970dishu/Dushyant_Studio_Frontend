import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

type CursorState = "default" | "hover" | "video" | "drag";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 300, mass: 0.5 };
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  const [state, setState] = useState<CursorState>("default");
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);
  const posRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const isTouchDevice = () =>
      window.matchMedia("(hover: none)").matches ||
      "ontouchstart" in window;
    if (isTouchDevice()) return;

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        cursorX.set(posRef.current.x);
        cursorY.set(posRef.current.y);
      });
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);

    const handleHoverStart = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest("video") || target.closest("[data-cursor='video']")) {
        setState("video");
      } else if (target.closest("a, button, [role='button'], [data-cursor='hover']")) {
        setState("hover");
      }
    };

    const handleHoverEnd = () => setState("default");

    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    const handleMouseDown = () => setState("drag");
    const handleMouseUp = () => setState("default");
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  const ringSize = state === "hover" ? 52 : state === "video" ? 72 : state === "drag" ? 36 : 40;
  const dotSize = state === "drag" ? 3 : 5;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-primary/70 flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          backgroundColor:
            state === "video"
              ? "hsl(var(--primary) / 0.12)"
              : state === "hover"
              ? "hsl(var(--primary) / 0.08)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 22, mass: 0.4 }}
      >
        {state === "video" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-primary text-[9px] font-heading font-bold tracking-widest uppercase select-none"
          >
            PLAY
          </motion.span>
        )}
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-primary"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: isVisible ? 1 : 0,
        }}
        animate={{ width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
};

export default CustomCursor;
