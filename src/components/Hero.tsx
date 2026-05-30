import { useState, useEffect, useRef, useCallback, PointerEvent as ReactPointerEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import MorphingText from "./MorphingText";
import { Maximize2, X, Volume2, VolumeX } from "lucide-react";

const videoProjects = [
  { id: 1,  client: "RUN",               subtitle: "SHOT ON IPHONE",    videoUrl: "/videos/run-shot.mp4",            thumbnailTime: 0.1 },
  { id: 2,  client: "Across Web3",       subtitle: "DeFi Night",        videoUrl: "/videos/across-defi.mp4",         thumbnailTime: 0.1 },
  { id: 3,  client: "Devlearn",          subtitle: "Community Pitch",   videoUrl: "/videos/devlearn.mp4",            thumbnailTime: 1.1 },
  { id: 4,  client: "Agyaat Khat Intro", subtitle: "Animated Intro",    videoUrl: "/videos/agyaat-khat-intro.mp4",   thumbnailTime: 3.1 },
  { id: 5,  client: "Across Web3",       subtitle: "Infotainment",      videoUrl: "/videos/across-info.mp4",         thumbnailTime: 0.1 },
  { id: 6,  client: "Finance",           subtitle: "Documentary",       videoUrl: "/videos/finance-documentary.mp4", thumbnailTime: 0.1 },
  { id: 7,  client: "Rangrezz-Alfaaz",   subtitle: "Promotional Video", videoUrl: "/videos/rangrezz-alfaaz.mp4",     thumbnailTime: 1.1 },
  { id: 8,  client: "SaaS VFX AI",       subtitle: "Intro Video",       videoUrl: "/videos/vfx-ai-intro.mp4",        thumbnailTime: 0.1 },
  { id: 9,  client: "SaaS VFX AI",       subtitle: "Explainer Video",   videoUrl: "/videos/vfx-ai-explainer.mp4",    thumbnailTime: 0.1 },
  { id: 10, client: "Thanks Giving",     subtitle: "Welcoming Video",   videoUrl: "/videos/thanksgiving.mp4",        thumbnailTime: 3.1 },
  { id: 11, client: "Agyaat Khat",       subtitle: "Short Series",      videoUrl: "/videos/agyaat-khat.mp4",         thumbnailTime: 0.1 },
  { id: 12, client: "Aurat Jaat",        subtitle: "Short Series",      videoUrl: "/videos/aurat-jaat.mp4",          thumbnailTime: 0.1 },
  { id: 13, client: "Reliq Launch",      subtitle: "Launch Video",      videoUrl: "/videos/reliq-launch.mp4",        thumbnailTime: 0.7 },
  { id: 14, client: "Solana x Across",   subtitle: "Promo Video",       videoUrl: "/videos/solana-across.mp4",       thumbnailTime: 0.1 },
  { id: 15, client: "Yaas Trial",        subtitle: "Trial Edit",        videoUrl: "/videos/yaas-trial.mp4",          thumbnailTime: 0.1 },
  { id: 16, client: "Yaas Intro",        subtitle: "Intro Video",       videoUrl: "/videos/yaas-intro.mp4",          thumbnailTime: 7   },
];

const CornerMarkers = () => (
  <>
    {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r",
      "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
      <span key={i} className={`absolute w-4 h-4 border-primary/70 pointer-events-none z-20 ${cls}`} />
    ))}
  </>
);

const AmbientGlow = () => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{ background: "radial-gradient(ellipse 60% 50% at 50% 60%, hsl(79 100% 72% / 0.13) 0%, transparent 70%)" }}
  />
);

const Hero = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [fullscreenVideoId, setFullscreenVideoId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const carouselRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  // cardRefs points to plain divs — no framer-motion — so direct style writes never conflict
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  const isUserScrolling = useRef(true);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const [cursorState, setCursorState] = useState<"grab" | "grabbing">("grab");
  const dragVelocity = useRef(0);
  const dragLastX = useRef(0);
  const dragLastT = useRef(0);
  const momentumRaf = useRef<number>();
  const isMobile = useIsMobile();
  const activeIdRef = useRef<number | null>(null);
  useEffect(() => { activeIdRef.current = activeId; }, [activeId]);

  const studioRef = useRef<HTMLSpanElement>(null);

  // Parallax on window scroll — direct DOM, zero React state
  useEffect(() => {
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const el = studioRef.current;
        if (!el) return;
        const y = window.scrollY * 0.18;
        el.style.transform = `translate(-50%, calc(-50% + ${y}px)) translateZ(0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(rafId); };
  }, []);

  const activeProject = videoProjects.find((p) => p.id === activeId);
  const activeIndex  = videoProjects.findIndex((p) => p.id === activeId);

  /* ── video play/pause ── */
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idStr, video]) => {
      const id = Number(idStr);
      if (!video) return;
      if (id === activeId && fullscreenVideoId === null) {
        if (video.src) video.play().catch(() => {});
      } else {
        video.pause();
        const proj = videoProjects.find((p) => p.id === id);
        if (proj && video.src) video.currentTime = proj.thumbnailTime;
      }
    });
  }, [activeId, fullscreenVideoId, isMobile]);

  useEffect(() => {
    Object.values(videoRefs.current).forEach((v) => { if (v) v.muted = isMuted; });
    if (fullscreenVideoRef.current) fullscreenVideoRef.current.muted = isMuted;
  }, [isMuted, fullscreenVideoId]);

  useEffect(() => {
    const handle = () => {
      if (document.hidden) {
        Object.values(videoRefs.current).forEach((v) => v?.pause());
        fullscreenVideoRef.current?.pause();
      }
    };
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, []);

  useEffect(() => {
    document.body.style.overflow = fullscreenVideoId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [fullscreenVideoId]);

  /* ── carousel 3D — direct DOM, zero React state per frame ── */
  const updateCarousel = useCallback(
    (updateActive: boolean) => {
      const container = carouselRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const centerX  = containerRect.left + containerRect.width / 2;
      const halfWidth = containerRect.width / 2;

      let closestId   = activeIdRef.current;
      let closestDist = Infinity;

      // Also track current active card distance for hysteresis
      let currentActiveDist = Infinity;

      Object.entries(cardRefs.current).forEach(([idStr, card]) => {
        if (!card) return;
        const id = Number(idStr);
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);

        if (id === activeIdRef.current) currentActiveDist = dist;
        if (dist < closestDist) { closestDist = dist; closestId = id; }

        // Write 3D transform directly — no setState, no re-render
        if (!isMobile) {
          const offset = (cardCenter - centerX) / halfWidth;
          const clamped = Math.max(-1, Math.min(1, offset));
          const rotateY   = clamped * -35;
          const translateZ = (1 - Math.abs(clamped)) * 50 - 50;
          card.style.transform = `rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
        }
      });

      // Hysteresis: only switch active card when the new card is clearly closer
      // (prevents rapid toggling right at the boundary between two cards)
      if (
        updateActive &&
        closestId !== null &&
        closestId !== activeIdRef.current &&
        closestDist < currentActiveDist - 40
      ) {
        setActiveId(closestId);
      }
    },
    [isMobile],
  );

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    let rafId: number;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => updateCarousel(isUserScrolling.current));
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    const timeout = setTimeout(() => updateCarousel(true), 600);
    return () => {
      container.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeout);
    };
  }, [updateCarousel]);

  /* ── drag with momentum ── */
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container) return;
    // Kill any ongoing momentum
    cancelAnimationFrame(momentumRaf.current!);
    isDragging.current = true;
    hasDragged.current = false;
    isUserScrolling.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = container.scrollLeft;
    dragLastX.current = e.clientX;
    dragLastT.current = performance.now();
    dragVelocity.current = 0;
    setCursorState("grabbing");
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 8) hasDragged.current = true;
    const container = carouselRef.current;
    if (!container) return;
    container.scrollLeft = dragScrollLeft.current - dx * 1.6;
    // Track velocity (px/ms → scale to px/frame at 60fps)
    const now = performance.now();
    const dt = now - dragLastT.current;
    if (dt > 0) dragVelocity.current = ((dragLastX.current - e.clientX) / dt) * 16;
    dragLastX.current = e.clientX;
    dragLastT.current = now;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setCursorState("grab");
    const container = carouselRef.current;
    if (!container) return;
    // Momentum: keep scrolling and decelerate
    let v = dragVelocity.current;
    const decay = 0.91;
    const step = () => {
      if (Math.abs(v) < 0.4) return;
      container.scrollLeft += v;
      v *= decay;
      momentumRaf.current = requestAnimationFrame(step);
    };
    momentumRaf.current = requestAnimationFrame(step);
  }, []);

  const handleCardClick = useCallback(
    (id: number) => {
      if (hasDragged.current) { hasDragged.current = false; return; }
      if (id === activeId) { setFullscreenVideoId(id); return; }
      isUserScrolling.current = false;
      setActiveId(id);
      const card = cardRefs.current[id];
      const container = carouselRef.current;
      if (card && container) {
        const cardCenter = card.getBoundingClientRect().left + card.getBoundingClientRect().width / 2;
        const containerCenter = container.getBoundingClientRect().left + container.getBoundingClientRect().width / 2;
        container.scrollTo({ left: container.scrollLeft + (cardCenter - containerCenter), behavior: "smooth" });
        setTimeout(() => { isUserScrolling.current = true; }, 600);
      } else {
        isUserScrolling.current = true;
      }
    },
    [activeId],
  );

  return (
    <>
      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {fullscreenVideoId !== null && (() => {
          const proj = videoProjects.find((p) => p.id === fullscreenVideoId);
          return proj && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background flex items-center justify-center cursor-pointer"
              onClick={() => setFullscreenVideoId(null)}
            >
              <video src={proj.videoUrl} autoPlay loop muted={isMuted} playsInline
                className="w-full h-full object-cover"
                ref={(el) => { fullscreenVideoRef.current = el; }}
              />
              <CornerMarkers />
              <div className="absolute top-0 left-0 right-0 px-6 py-4 flex items-center justify-between pointer-events-none">
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-primary/60 uppercase">Now Playing</p>
                  <p className="font-heading text-sm uppercase tracking-wider text-foreground/90 mt-0.5">{proj.client}</p>
                </div>
                <span className="font-mono text-[10px] text-foreground/30 tracking-widest">{proj.subtitle}</span>
              </div>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="absolute top-4 right-5 z-10 w-9 h-9 rounded-full bg-foreground/10 backdrop-blur-md border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 pointer-events-auto"
                onClick={(e) => { e.stopPropagation(); setFullscreenVideoId(null); }}
              >
                <X className="w-4 h-4 text-foreground/80" />
              </motion.button>
              <motion.p
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.4, y: 0 }} transition={{ delay: 0.5 }}
                className="absolute bottom-6 inset-x-0 text-center text-[10px] text-foreground/50 font-mono tracking-widest"
              >
                TAP ANYWHERE TO CLOSE
              </motion.p>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* ── Hero ── */}
      <section className="w-full relative overflow-hidden">

        {/* STUDIO ghost — direct-DOM parallax, own GPU layer, zero React coupling */}
        <span
          ref={studioRef}
          className="absolute left-1/2 font-heading font-bold uppercase leading-none whitespace-nowrap pointer-events-none select-none"
          aria-hidden="true"
          style={{
            top: "50%",
            transform: "translate(-50%, -50%) translateZ(0)",
            willChange: "transform",
            fontSize: "clamp(8rem, 28vw, 26rem)",
            letterSpacing: "-0.02em",
            color: "hsl(0 0% 98% / 0.025)",
          }}
        >
          STUDIO
        </span>

        {/* Top accent line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, hsl(79 100% 72% / 0.25), transparent)" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* ── Title — own GPU layer so carousel reflows never touch it ── */}
        <div className="flex items-center justify-center pt-24 pb-4 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12 relative"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
            className="text-center px-4 w-full"
          >
            <motion.div
              className="flex items-center justify-center gap-3 mb-4 md:mb-6"
              initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="h-px w-8 md:w-16 bg-primary/40" />
              <span className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-primary/70 uppercase">
                Selected Works · {new Date().getFullYear()}
              </span>
              <span className="h-px w-8 md:w-16 bg-primary/40" />
            </motion.div>

            <motion.h1
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
              className="font-bold text-foreground leading-none flex flex-wrap items-baseline justify-center gap-2 md:gap-6"
              style={{ fontSize: "clamp(2rem, 7vw, 10rem)" }}
            >
              <span className="font-cursive text-primary italic"
                style={{ textShadow: "0 0 60px hsl(79 100% 72% / 0.35), 0 0 120px hsl(79 100% 72% / 0.1)" }}>
                Creative
              </span>
              <MorphingText className="font-barrio uppercase tracking-wide" />
            </motion.h1>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-4xl mx-auto mt-3 md:mt-8 px-2 md:px-4 gap-1 sm:gap-0">
              <motion.p className="text-muted-foreground text-xs md:text-base"
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Crafting visual stories through motion
              </motion.p>
              <motion.div className="hidden sm:flex items-center gap-4"
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase">Available</span>
                </div>
                <span className="text-border">·</span>
                <span className="font-mono text-[10px] tracking-widest text-foreground/30">{videoProjects.length} Projects</span>
              </motion.div>
              <motion.p initial={{ opacity: 0, x: 20 }} animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-cursive text-foreground/60 text-sm md:text-xl lg:text-3xl"
              >
                — Dushyant
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* ── Carousel — fixed height + layout containment so nothing leaks out ── */}
        <div
          className="relative flex items-center"
          style={{
            height: "clamp(260px, 54vh, 640px)",
            contain: "layout style",
            perspective: isMobile ? undefined : "1200px",
          }}
        >
          {!isMobile && <AmbientGlow />}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />

          <div
            ref={carouselRef}
            className="w-full overflow-x-auto flex items-center gap-3 md:gap-6 px-[8vw] md:px-[25vw] py-2 md:py-6 select-none snap-x snap-proximity"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              cursor: cursorState,
              touchAction: "pan-x",
              transformStyle: isMobile ? undefined : "preserve-3d",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <style>{`div::-webkit-scrollbar{display:none}`}</style>

            {videoProjects.map((project, index) => {
              const isActive   = activeId === project.id;
              const isNearActive = activeIndex === -1 ? index < 3 : Math.abs(index - activeIndex) <= 2;

              return (
                // Outer div: owns width (CSS transition) + is the 3D transform target via direct style writes
                // It is a plain div — no framer-motion — so direct card.style.transform never conflicts
                <div
                  key={project.id}
                  ref={(el) => { cardRefs.current[project.id] = el; }}
                  className="flex-shrink-0 cursor-pointer snap-center"
                  style={{
                    width: isActive
                      ? (isMobile ? "clamp(240px, 78vw, 440px)" : "clamp(320px, 50vw, 620px)")
                      : (isMobile ? "clamp(180px, 58vw, 340px)" : "clamp(250px, 35vw, 440px)"),
                    // Only width transitions via CSS; transform is written directly each frame (no lag)
                    transition: "width 0.55s cubic-bezier(0.25,1,0.5,1)",
                    transformStyle: isMobile ? undefined : "preserve-3d",
                  }}
                  onClick={() => handleCardClick(project.id)}
                >
                  {/* Entrance animation wrapper — framer-motion is scoped here, never touches outer div */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + index * 0.035, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Aspect-ratio shell: text lives here, outside the scaled layer */}
                    <div className="relative aspect-video">

                      {/* Scale layer — CSS transition, no spring overshoot */}
                      <div
                        className="absolute inset-0 rounded-lg overflow-hidden"
                        style={{
                          transform: `scale(${isActive ? 1 : 0.92})`,
                          transition: "transform 0.45s cubic-bezier(0.25,1,0.5,1), box-shadow 0.45s ease",
                          boxShadow: isActive
                            ? "0 0 0 1px hsl(79 100% 72% / 0.45), 0 0 40px hsl(79 100% 72% / 0.15), 0 20px 60px rgba(0,0,0,0.6)"
                            : "0 8px 32px rgba(0,0,0,0.4)",
                        }}
                      >
                        <video
                          ref={(el) => { videoRefs.current[project.id] = el; }}
                          src={isNearActive ? project.videoUrl : undefined}
                          preload={isActive ? "auto" : "metadata"}
                          loop muted={isMuted} playsInline
                          onLoadedMetadata={(e) => {
                            if (project.id !== activeId) e.currentTarget.currentTime = project.thumbnailTime;
                          }}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0" style={{
                          background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.15) 50%, transparent 100%)",
                        }} />
                        {isActive && <CornerMarkers />}
                      </div>

                      {/* ── Text & buttons outside scale layer — never bounce ── */}

                      <div className="absolute top-3 left-3 z-10 pointer-events-none">
                        <span className="font-mono text-[10px] tracking-widest transition-colors duration-300"
                          style={{ color: isActive ? "hsl(79 100% 72% / 0.8)" : "rgba(255,255,255,0.3)" }}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>

                      <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 z-10 pointer-events-none">
                        <h3 className="text-foreground text-xs md:text-sm font-semibold tracking-wide uppercase">
                          {project.client}
                        </h3>
                        <p className="text-foreground/55 text-[10px] md:text-xs font-mono tracking-wider mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {isActive && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          className="absolute top-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-background/60 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                          onClick={(e) => { e.stopPropagation(); setFullscreenVideoId(project.id); }}
                        >
                          <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />
                        </motion.button>
                      )}

                      {isActive && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                          className="absolute bottom-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-background/60 backdrop-blur-sm border border-primary/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/60 transition-all duration-200"
                          onClick={(e) => { e.stopPropagation(); setIsMuted((p) => !p); }}
                        >
                          {isMuted
                            ? <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />
                            : <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />}
                        </motion.button>
                      )}
                    </div>

                    {/* Progress bar */}
                    {isActive && (
                      <motion.div
                        className="h-px mt-0 mx-1 bg-primary/30 overflow-hidden"
                        initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                        style={{ transformOrigin: "left" }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <motion.div className="h-full bg-primary"
                          initial={{ x: "-100%" }} animate={{ x: "0%" }}
                          transition={{ duration: 3.5, ease: "linear", repeat: Infinity }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Info strip — own GPU layer ── */}
        <motion.div
          className="px-6 md:px-12 lg:px-20 pb-8 md:pb-12"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{ transform: "translateZ(0)", willChange: "transform" }}
        >
          <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">

            <div className="min-w-0 relative" style={{ minHeight: "3.5rem" }}>
              <AnimatePresence>
                {activeProject && (
                  <motion.div key={activeProject.id}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0"
                  >
                    <p className="font-mono text-[10px] tracking-[0.3em] text-primary/60 uppercase mb-0.5 whitespace-nowrap">Now Viewing</p>
                    <p className="font-heading text-base md:text-xl uppercase tracking-wider text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{activeProject.client}</p>
                    <p className="font-mono text-[10px] md:text-xs tracking-widest text-muted-foreground mt-0.5 whitespace-nowrap">{activeProject.subtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex-shrink-0 flex flex-col items-end gap-2">
              <div className="relative" style={{ minHeight: "2rem", minWidth: "3.5rem" }}>
              <AnimatePresence>
                {activeIndex !== -1 && (
                  <motion.div key={activeIndex}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="absolute inset-0 flex items-baseline justify-end gap-1"
                  >
                    <span className="font-mono text-lg md:text-2xl text-foreground/80 tabular-nums font-light">
                      {String(activeIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-xs text-foreground/25">/</span>
                    <span className="font-mono text-xs text-foreground/30 tabular-nums">
                      {String(videoProjects.length).padStart(2, "0")}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>

              <motion.div className="hidden md:flex items-center gap-2"
                initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 1.2 }}
              >
                <motion.span className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase"
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  Drag to explore
                </motion.span>
                <span className="font-mono text-[10px] text-foreground/25">→</span>
              </motion.div>
            </div>
          </div>

          <div className="mt-4 md:mt-6 h-px max-w-7xl mx-auto"
            style={{ background: "linear-gradient(90deg, hsl(79 100% 72% / 0.2), hsl(79 100% 72% / 0.05) 40%, transparent)" }}
          />
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
