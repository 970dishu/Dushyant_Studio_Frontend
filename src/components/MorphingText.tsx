import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const prefixes = ["Direc", "Edi"];
const suffix = "tor";

const MorphingText = ({ className }: { className?: string }) => {
  const [prefixIndex, setPrefixIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState<number | "auto">("auto");
  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrefixIndex((prev) => (prev + 1) % prefixes.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const currentPrefix = prefixes[prefixIndex];

  useEffect(() => {
    if (measureRef.current) {
      setContainerWidth(measureRef.current.offsetWidth);
    }
  }, [prefixIndex]);

  return (
    <span className={`relative inline-flex ${className ?? ""}`}>
      {/* Hidden measurer for prefix */}
      <span
        ref={measureRef}
        className="absolute invisible whitespace-nowrap"
        aria-hidden="true"
      >
        {currentPrefix.split("").map((char, i) => (
          <span key={i} className="inline-block">{char}</span>
        ))}
      </span>

      {/* Animated prefix with smooth width */}
      <motion.span
        ref={containerRef}
        className="inline-flex overflow-hidden relative"
        style={{ clipPath: "inset(0)" }}
        animate={{ width: containerWidth }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="popLayout">
          {currentPrefix.split("").map((char, i) => (
            <motion.span
              key={`${prefixIndex}-${i}`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-100%", opacity: 0, position: "absolute" }}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                type: "spring",
                stiffness: 300,
                damping: 20,
                mass: 0.8,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.span>{/* Static suffix */}<span>{suffix}</span>
    </span>
  );
};

export default MorphingText;
