import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

const SHUTTER_COUNT = 8;

const Shutter = ({ index, open }: { index: number; open: boolean }) => {
  const angle = (index / SHUTTER_COUNT) * 360;
  return (
    <motion.div
      className="absolute w-1/2 h-full origin-right"
      style={{
        left: "0%",
        top: "0%",
        rotate: angle,
        transformOrigin: "100% 50%",
      }}
      animate={{ scaleX: open ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: open ? index * 0.03 : (SHUTTER_COUNT - index) * 0.02 }}
    >
      <div
        className="w-full h-full"
        style={{
          backgroundColor: "hsl(240, 2%, 6%)",
          clipPath: "polygon(0 20%, 100% 0%, 100% 100%, 0 80%)",
        }}
      />
    </motion.div>
  );
};

const ApertureRing = ({ open }: { open: boolean }) => (
  <div className="relative w-40 h-40">
    {/* Outer ring */}
    <motion.div
      className="absolute inset-0 rounded-full border-2 border-primary/40"
      animate={{ rotate: open ? 180 : 0, scale: open ? 1.15 : 1, opacity: open ? 0 : 1 }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    />
    {/* Inner ring */}
    <motion.div
      className="absolute inset-4 rounded-full border border-primary/60"
      animate={{ rotate: open ? -240 : 0, scale: open ? 0 : 1, opacity: open ? 0 : 1 }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
    />
    {/* Shutter blades */}
    <div className="absolute inset-4 rounded-full overflow-hidden">
      {Array.from({ length: SHUTTER_COUNT }).map((_, i) => (
        <Shutter key={i} index={i} open={open} />
      ))}
      {/* Center dot */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-2 h-2 rounded-full bg-primary" />
      </motion.div>
    </div>
  </div>
);

const FilmCounter = ({ frame }: { frame: number }) => (
  <div className="font-mono text-xs text-primary/70 tracking-widest flex items-center gap-2">
    <span className="text-primary/40">FRAME</span>
    <span className="text-primary tabular-nums w-4 text-right">{String(frame).padStart(4, "0")}</span>
  </div>
);

const RecIndicator = ({ active }: { active: boolean }) => (
  <div className="flex items-center gap-1.5">
    <motion.div
      className="w-2 h-2 rounded-full bg-red-500"
      animate={{ opacity: active ? [1, 0, 1] : 0 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
    <span className="font-mono text-xs tracking-widest text-red-400/80">REC</span>
  </div>
);

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full max-w-xs">
    <div className="flex justify-between items-center mb-1.5">
      <span className="font-mono text-[10px] text-primary/40 tracking-widest uppercase">Loading</span>
      <span className="font-mono text-[10px] text-primary/60 tabular-nums">{Math.round(progress)}%</span>
    </div>
    <div className="h-px w-full bg-white/10 overflow-hidden">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </div>
  </div>
);

const FilmStrip = ({ visible }: { visible: boolean }) => (
  <motion.div
    className="absolute top-0 left-0 right-0 h-8 flex overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="flex gap-1 items-center px-1"
      animate={{ x: [0, -80] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{ width: "200%" }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-8 h-6 border border-white/10 rounded-sm bg-white/5"
        />
      ))}
    </motion.div>
  </motion.div>
);

const BottomFilmStrip = ({ visible }: { visible: boolean }) => (
  <motion.div
    className="absolute bottom-0 left-0 right-0 h-8 flex overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: visible ? 1 : 0 }}
    transition={{ duration: 0.4 }}
  >
    <motion.div
      className="flex gap-1 items-center px-1"
      animate={{ x: [-80, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      style={{ width: "200%" }}
    >
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          className="flex-shrink-0 w-8 h-6 border border-white/10 rounded-sm bg-white/5"
        />
      ))}
    </motion.div>
  </motion.div>
);

const ScanLine = () => (
  <motion.div
    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none"
    initial={{ top: "0%" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
  />
);

export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [frame, setFrame] = useState(0);
  const [apertureOpen, setApertureOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [visible, setVisible] = useState(true);
  const rafRef = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    // Animate progress
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      setFrame(Math.floor(p * 0.24 * 25)); // ~24fps feel

      if (p < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Trigger aperture open then exit
        setTimeout(() => setApertureOpen(true), 100);
        setTimeout(() => setExiting(true), 900);
        setTimeout(() => {
          setVisible(false);
          onComplete();
        }, 1400);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ backgroundColor: "hsl(240, 2%, 6%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Scan line */}
          <ScanLine />

          {/* Film strips top & bottom */}
          <FilmStrip visible={!exiting} />
          <BottomFilmStrip visible={!exiting} />

          {/* Letterbox bars that slide away on exit */}
          <motion.div
            className="absolute top-8 left-0 right-0 h-10 bg-black/60"
            animate={{ scaleY: exiting ? 0 : 1, originY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="absolute bottom-8 left-0 right-0 h-10 bg-black/60"
            animate={{ scaleY: exiting ? 0 : 1, originY: 1 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Top HUD */}
          <motion.div
            className="absolute top-10 left-0 right-0 px-8 flex items-center justify-between"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: exiting ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <RecIndicator active={!apertureOpen} />
            <FilmCounter frame={frame} />
            <span className="font-mono text-[10px] text-primary/40 tracking-widest uppercase">1/250s · f/2.8</span>
          </motion.div>

          {/* Main content */}
          <div className="flex flex-col items-center gap-10 relative">
            {/* Aperture */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <ApertureRing open={apertureOpen} />
            </motion.div>

            {/* Studio name */}
            <motion.div
              className="text-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.3, delay: exiting ? 0 : 0.4 }}
            >
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
              >
                <h1
                  className="text-4xl md:text-5xl tracking-[0.25em] uppercase font-heading text-foreground"
                >
                  Dushyant
                  <span className="text-primary ml-3">Studio</span>
                </h1>
              </motion.div>
              <motion.p
                className="font-mono text-[11px] tracking-[0.35em] text-muted-foreground uppercase mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                Visual Storytelling
              </motion.p>
            </motion.div>

            {/* Progress */}
            <motion.div
              className="w-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.3, delay: exiting ? 0 : 0.6 }}
            >
              <ProgressBar progress={progress} />
            </motion.div>
          </div>

          {/* Bottom HUD */}
          <motion.div
            className="absolute bottom-10 left-0 right-0 px-8 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: exiting ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <span className="font-mono text-[10px] text-primary/40 tracking-widest">4K · 24fps</span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-primary/40"
                  animate={{ height: [4, 10, 4, 16, 4, 8, 4][i % 7] }}
                  transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
                />
              ))}
            </div>
            <span className="font-mono text-[10px] text-primary/40 tracking-widest">DSLR · AUTO</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
