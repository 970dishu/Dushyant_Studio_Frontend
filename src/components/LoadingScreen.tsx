import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
  duration?: number;
}

/* ─── Camera SVG icon with loading state ─── */
const CameraIcon = ({ clicked, progress }: { clicked: boolean; progress: number }) => {
  // Progress arc around the outer lens ring (r=28, circumference ≈ 175.9)
  const lensCircumference = 2 * Math.PI * 28;
  const arcOffset = lensCircumference - (lensCircumference * progress) / 100;
  // Aperture iris: center cover fades out as progress increases → lens "opens"
  const irisOpacity = Math.max(0, 1 - progress / 80);
  // Iris blade opacity (fade out as aperture opens)
  const bladeOpacity = Math.max(0, 1 - progress / 60);

  return (
    <motion.svg
      viewBox="0 0 120 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "clamp(130px, 20vw, 200px)", height: "auto" }}
      animate={clicked ? { scale: [1, 0.9, 1.05, 1], y: [0, -5, 2, 0] } : {}}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <defs>
        <radialGradient id="arcoat" cx="35%" cy="32%" r="70%">
          <stop offset="0%" stopColor="rgba(80,140,220,0.28)" />
          <stop offset="50%" stopColor="rgba(100,60,180,0.14)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="glassDepth" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#050810" />
          <stop offset="100%" stopColor="#0d1a2e" />
        </radialGradient>
        <clipPath id="lensClip">
          <circle cx="60" cy="50" r="15" />
        </clipPath>
      </defs>

      {/* Viewfinder hump */}
      <rect x="38" y="4" width="24" height="12" rx="3" fill="hsl(240,2%,22%)" stroke="hsl(240,2%,32%)" strokeWidth="1" />
      {/* Shutter button */}
      <circle cx="88" cy="13" r="5" fill="hsl(240,2%,28%)" stroke="hsl(240,2%,38%)" strokeWidth="1" />
      <motion.circle cx="88" cy="13" r="3"
        animate={clicked ? { fill: ["hsl(79,100%,72%)", "hsl(240,2%,26%)"] } : { fill: "hsl(240,2%,26%)" }}
        transition={{ duration: 0.25 }}
      />
      {/* Body */}
      <rect x="4" y="14" width="112" height="72" rx="8" fill="hsl(240,2%,17%)" stroke="hsl(240,2%,28%)" strokeWidth="1.5" />
      <rect x="5" y="15" width="110" height="7" rx="6" fill="rgba(255,255,255,0.035)" />

      {/* Grip texture */}
      {[0,1,2,3].map(i => (
        <rect key={i} x="8" y={28 + i * 10} width="6" height="6" rx="1.5" fill="hsl(240,2%,13%)" />
      ))}
      {/* Mode dial */}
      <circle cx="104" cy="28" r="7" fill="hsl(240,2%,21%)" stroke="hsl(240,2%,30%)" strokeWidth="1" />
      <motion.line x1="104" y1="22" x2="104" y2="25"
        stroke="hsl(79,100%,72%)" strokeWidth="1.5" strokeLinecap="round"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Status LED */}
      <motion.circle cx="16" cy="22" r="2.5"
        animate={{ fill: clicked ? "hsl(79,100%,72%)" : ["hsl(0,80%,55%)", "rgba(180,40,40,0.25)", "hsl(0,80%,55%)"] }}
        transition={{ duration: 0.9, repeat: clicked ? 0 : Infinity }}
      />

      {/* ── Lens assembly ── */}
      {/* Outer ring — background track */}
      <circle cx="60" cy="50" r="28" fill="hsl(240,2%,11%)" stroke="hsl(240,2%,20%)" strokeWidth="1.5" />
      {/* Progress arc track (dim) */}
      <circle cx="60" cy="50" r="28" fill="none"
        stroke="hsl(79,100%,72%,0.1)" strokeWidth="2.5"
      />
      {/* Progress arc fill */}
      <motion.circle cx="60" cy="50" r="28" fill="none"
        stroke="hsl(79,100%,72%)" strokeWidth="2.5" strokeLinecap="round"
        strokeDasharray={lensCircumference}
        strokeDashoffset={arcOffset}
        style={{ rotate: -90, transformOrigin: "60px 50px" }}
        transition={{ duration: 0.1, ease: "linear" }}
      />

      {/* Mid ring */}
      <circle cx="60" cy="50" r="20" fill="hsl(240,2%,8%)" stroke="hsl(240,2%,17%)" strokeWidth="1" />

      {/* Glass base */}
      <circle cx="60" cy="50" r="15" fill="url(#glassDepth)" stroke="hsl(240,2%,15%)" strokeWidth="0.8" />
      {/* AR coating */}
      <circle cx="60" cy="50" r="15" fill="url(#arcoat)" />
      {/* Specular highlight */}
      <ellipse cx="54" cy="44" rx="5" ry="3" fill="rgba(255,255,255,0.12)" transform="rotate(-30 54 44)" />
      <ellipse cx="52.5" cy="43" rx="2" ry="1.2" fill="rgba(255,255,255,0.22)" transform="rotate(-30 52 43)" />

      {/* Iris blades — 6 thin lines that fade out as aperture opens */}
      <g clipPath="url(#lensClip)" opacity={bladeOpacity}>
        {[0,1,2,3,4,5].map(i => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <line key={i}
              x1="60" y1="50"
              x2={60 + 14 * Math.cos(a)} y2={50 + 14 * Math.sin(a)}
              stroke="hsl(240,2%,6%)" strokeWidth="4"
            />
          );
        })}
      </g>

      {/* Aperture cover — opaque dark circle that fades as aperture opens */}
      <circle cx="60" cy="50" r="15" fill="#060912" fillOpacity={irisOpacity} />

      {/* Center reflection — becomes visible as iris opens */}
      <circle cx="60" cy="50" r="4" fill="#030608" fillOpacity={1 - irisOpacity * 0.3} />
      <circle cx="57.5" cy="47.5" r="1.2" fill="rgba(255,255,255,0.25)" fillOpacity={1 - irisOpacity} />
    </motion.svg>
  );
};

/* ─── Film strip ─── */
const FilmStrip = ({ reverse }: { reverse?: boolean }) => (
  <div className="absolute left-0 right-0 overflow-hidden"
    style={{ height: "clamp(20px,3vh,28px)", top: reverse ? undefined : 0, bottom: reverse ? 0 : undefined }}
  >
    <motion.div className="flex gap-1 items-center h-full px-1"
      animate={{ x: reverse ? [-64, 0] : [0, -64] }}
      transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
      style={{ width: "220%" }}
    >
      {Array.from({ length: 60 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 border border-white/10 rounded-sm bg-white/[0.03]"
          style={{ width: "clamp(20px,3vw,28px)", height: "clamp(12px,2vh,18px)" }}
        />
      ))}
    </motion.div>
  </div>
);

/* ─── Scan line ─── */
const ScanLine = () => (
  <motion.div className="absolute left-0 right-0 h-px pointer-events-none"
    style={{ background: "linear-gradient(90deg,transparent,hsl(79,100%,72%,0.15),transparent)" }}
    animate={{ top: ["0%", "100%", "0%"] }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
  />
);

/* ─── Viewfinder corners ─── */
const Corners = ({ lit }: { lit: boolean }) => (
  <>
    {[
      { top: "8%",    left: "6%",  bt: true, bl: true  },
      { top: "8%",    right: "6%", bt: true, br: true  },
      { bottom: "8%", left: "6%",  bb: true, bl: true  },
      { bottom: "8%", right: "6%", bb: true, br: true  },
    ].map(({ bt, bl, br, bb, ...pos }, i) => (
      <motion.div key={i} className="absolute"
        style={{
          ...pos,
          width: "clamp(18px,3vw,28px)", height: "clamp(18px,3vw,28px)",
          borderTopWidth:    bt ? 2 : 0,
          borderLeftWidth:   bl ? 2 : 0,
          borderRightWidth:  br ? 2 : 0,
          borderBottomWidth: bb ? 2 : 0,
          borderStyle: "solid",
        }}
        animate={{ borderColor: lit ? "hsl(79,100%,72%,0.9)" : "hsl(79,100%,72%,0.35)" }}
        transition={{ duration: 0.3 }}
      />
    ))}
  </>
);

/* ─── Waveform ─── */
const Waveform = () => (
  <div className="flex items-center gap-px">
    {[3,6,10,5,13,7,4,10,5,8].map((h, i) => (
      <motion.div key={i} className="w-0.5 rounded-full bg-primary/50"
        animate={{ height: [h*0.5, h, h*0.3, h][i%4] }}
        transition={{ duration: 0.45+i*0.06, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        style={{ height: h }}
      />
    ))}
  </div>
);

/* ════════════════════════════════════════════════════════ */
export default function LoadingScreen({ onComplete, duration = 3000 }: LoadingScreenProps) {
  const [progress, setProgress]             = useState(0);
  const [frame, setFrame]                   = useState(0);
  const [shutterClicked, setShutterClicked] = useState(false);
  const [flash, setFlash]                   = useState(false);
  const [exiting, setExiting]               = useState(false);
  const [visible, setVisible]               = useState(true);
  const rafRef   = useRef<number>();
  const startRef = useRef<number>();

  useEffect(() => {
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min(((ts - startRef.current) / duration) * 100, 100);
      setProgress(p);
      setFrame(Math.floor(p * 0.24 * 25));
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setShutterClicked(true); setFlash(true); }, 80);
        setTimeout(() => setFlash(false), 260);
        setTimeout(() => setExiting(true), 800);
        setTimeout(() => { setVisible(false); onComplete(); }, 1300);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ backgroundColor: "hsl(240,2%,5%)" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Shutter flash */}
          <AnimatePresence>
            {flash && (
              <motion.div className="absolute inset-0 z-50 pointer-events-none"
                initial={{ opacity: 0.85 }} animate={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ backgroundColor: "white" }}
              />
            )}
          </AnimatePresence>

          <ScanLine />
          <FilmStrip />
          <FilmStrip reverse />

          {/* Corners */}
          <div className="absolute inset-0 pointer-events-none">
            <Corners lit={shutterClicked} />
          </div>

          {/* Rule-of-thirds */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
            <div className="absolute left-1/3 top-0 bottom-0 border-l border-white" />
            <div className="absolute left-2/3 top-0 bottom-0 border-l border-white" />
            <div className="absolute top-1/3 left-0 right-0 border-t border-white" />
            <div className="absolute top-2/3 left-0 right-0 border-t border-white" />
          </div>

          {/* TOP HUD */}
          <motion.div
            className="absolute left-0 right-0 px-4 sm:px-8 flex items-center justify-between"
            style={{ top: "clamp(26px,5.5vh,48px)" }}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: exiting ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            <div className="flex items-center gap-1.5">
              <motion.div className="w-2 h-2 rounded-full bg-red-500"
                animate={{ opacity: shutterClicked ? 0 : [1, 0.2, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] sm:text-xs tracking-widest text-red-400/80">REC</span>
            </div>
            <div className="font-mono text-[10px] sm:text-xs text-primary/70 tracking-widest flex items-center gap-1.5">
              <span className="text-primary/35">FRAME</span>
              <span className="text-primary tabular-nums">{String(frame).padStart(4, "0")}</span>
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-primary/35 tracking-widest">1/250s · f/2.8</span>
          </motion.div>

          {/* MAIN */}
          <div className="flex flex-col items-center" style={{ gap: "clamp(20px,3.5vh,36px)" }}>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
              className="relative"
            >
              {/* Ambient glow under camera */}
              <CameraIcon clicked={shutterClicked} progress={progress} />
            </motion.div>

            {/* Name */}
            <motion.div className="text-center overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.3, delay: exiting ? 0 : 0.35 }}
            >
              <div className="overflow-hidden">
                <motion.h1
                  className="font-heading uppercase text-foreground tracking-[0.22em]"
                  style={{ fontSize: "clamp(1.3rem,4.5vw,2.6rem)" }}
                  initial={{ y: "100%" }} animate={{ y: "0%" }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.76,0,0.24,1] }}
                >
                  Dushyant<span className="text-primary ml-2 sm:ml-3">Studio</span>
                </motion.h1>
              </div>
              <motion.p
                className="font-mono uppercase text-muted-foreground tracking-[0.3em] mt-1"
                style={{ fontSize: "clamp(8px,1.4vw,10px)" }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ delay: 0.75, duration: 0.45 }}
              >
                Visual Storytelling
              </motion.p>
            </motion.div>

            {/* Progress */}
            <motion.div
              style={{ width: "clamp(160px,32vw,280px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: exiting ? 0 : 1 }}
              transition={{ duration: 0.3, delay: exiting ? 0 : 0.55 }}
            >
              <div className="flex justify-between mb-1.5">
                <span className="font-mono text-[9px] sm:text-[10px] text-primary/35 tracking-widest uppercase">
                  {shutterClicked ? "CAPTURED" : "Loading"}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] text-primary/60 tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="h-px w-full bg-white/10 overflow-hidden">
                <motion.div className="h-full bg-primary"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </motion.div>
          </div>

          {/* BOTTOM HUD */}
          <motion.div
            className="absolute left-0 right-0 px-4 sm:px-8 flex items-center justify-between"
            style={{ bottom: "clamp(26px,5.5vh,48px)" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: exiting ? 0 : 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <span className="font-mono text-[9px] sm:text-[10px] text-primary/35 tracking-widest">4K · 24fps</span>
            <Waveform />
            <div className="flex flex-col items-end gap-0.5">
              <span className="font-mono text-[9px] text-primary/30 tracking-widest">ISO 3200</span>
              <span className="font-mono text-[9px] text-primary/25 tracking-widest hidden sm:block">AWB · AUTO</span>
            </div>
          </motion.div>

          {/* Letterbox */}
          <motion.div className="absolute top-[3.5%] left-0 right-0 pointer-events-none bg-black/50"
            style={{ height: "clamp(22px,4vh,34px)" }}
            animate={{ scaleY: exiting ? 0 : 1, transformOrigin: "top" }}
            transition={{ duration: 0.4 }}
          />
          <motion.div className="absolute bottom-[3.5%] left-0 right-0 pointer-events-none bg-black/50"
            style={{ height: "clamp(22px,4vh,34px)" }}
            animate={{ scaleY: exiting ? 0 : 1, transformOrigin: "bottom" }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
