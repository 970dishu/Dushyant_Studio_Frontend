import { useState, useEffect, useRef, useCallback, PointerEvent as ReactPointerEvent } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion, AnimatePresence } from "framer-motion";
import MorphingText from "./MorphingText";
import { Maximize2, X, Volume2, VolumeX } from "lucide-react";

const videoProjects = [
  {
    id: 1,
    client: "RUN",
    subtitle: "SHOT ON IPHONE",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/run-shot.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 2,
    client: "Across Web3",
    subtitle: "DeFi Night",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/across-defi.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 3,
    client: "Devlearn",
    subtitle: "Community Pitch",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/devlearn.mp4",
    thumbnailTime: 1.1
  },
  {
    id: 4,
    client: "Agyaat Khat Intro",
    subtitle: "Animated Intro",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/agyaat-khat-intro.mp4",
    thumbnailTime: 3.1
  },
  {
    id: 5,
    client: "Across Web3",
    subtitle: "Infotainment",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/across-info.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 6,
    client: "Finance",
    subtitle: "Documentry",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/finance-documentary.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 7,
    client: "Rangrezz-Alfaaz",
    subtitle: "Promotional Video",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/rangrezz-alfaaz.mp4",
    thumbnailTime: 1.1
  },
  {
    id: 8,
    client: "SaaS VFX AI",
    subtitle: "Intro Video",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/saas-vfx-ai-intro.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 9,
    client: "SaaS VFX AI",
    subtitle: "Explainer Video",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/vfx-ai-explainer.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 10,
    client: "Thanks Giving",
    subtitle: "Welcoming Video",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/thanksgiving.mp4",
    thumbnailTime: 3.1
  },
  {
    id: 11,
    client: "Agyaat Khat",
    subtitle: "Short Series",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/agyaat-khat.mp4",
    thumbnailTime: 0.1
  },
  {
    id: 12,
    client: "Aurat Jaat",
    subtitle: "Short Series",
    // TODO: Add your video file to public/videos/ folder and update the path
    videoUrl: "/videos/aurat-jaat.mp4",
    thumbnailTime: 0.1
  },
];

const Hero = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [fullscreenVideoId, setFullscreenVideoId] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement | null>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [cardTransforms, setCardTransforms] = useState<{ [key: number]: { rotateY: number; translateZ: number; opacity: number } }>({});
  const isUserScrolling = useRef(true); // false during programmatic scroll
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const hasDragged = useRef(false);
  const [cursorState, setCursorState] = useState<'grab' | 'grabbing'>('grab');
  // Disable 3D GPU effects on mobile for performance
  const isMobile = useIsMobile();

  // Play active video, pause others
  useEffect(() => {
    Object.entries(videoRefs.current).forEach(([idStr, video]) => {
      const id = Number(idStr);
      if (video) {
        if (id === activeId && fullscreenVideoId === null) {
          video.play().catch(() => { });
        } else {
          video.pause();
          // Reset to thumbnail time instead of 0
          const project = videoProjects.find(p => p.id === id);
          if (project) {
            video.currentTime = project.thumbnailTime;
          }
        }
      }
    });
  }, [activeId, fullscreenVideoId, isMobile]);

  // Keep all videos in sync with mute state for reliable mobile behavior
  useEffect(() => {
    Object.values(videoRefs.current).forEach((video) => {
      if (video) video.muted = isMuted;
    });
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.muted = isMuted;
    }
  }, [isMuted, fullscreenVideoId]);

  // Pause all videos when tab/app is backgrounded
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        Object.values(videoRefs.current).forEach((video) => video?.pause());
        fullscreenVideoRef.current?.pause();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Lock body scroll during fullscreen
  useEffect(() => {
    document.body.style.overflow = fullscreenVideoId !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [fullscreenVideoId]);

  // Compute 3D transforms and optionally detect center card
  const updateCarousel = useCallback((updateActive: boolean) => {
    const container = carouselRef.current;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const halfWidth = containerRect.width / 2;
    let closestId: number | null = null;
    let closestDist = Infinity;
    const transforms: typeof cardTransforms = {};

    Object.entries(cardRefs.current).forEach(([idStr, card]) => {
      if (!card) return;
      const id = Number(idStr);
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const dist = Math.abs(cardCenter - centerX);
      if (dist < closestDist) {
        closestDist = dist;
        closestId = id;
      }
      // Disable 3D transforms on mobile for performance
      if (isMobile) {
        transforms[id] = { rotateY: 0, translateZ: 0, opacity: 1 };
      } else {
        const offset = (cardCenter - centerX) / halfWidth;
        const clampedOffset = Math.max(-1, Math.min(1, offset));
        const rotateY = clampedOffset * -35;
        const translateZ = (1 - Math.abs(clampedOffset)) * 50 - 50;
        const opacity = 1 - Math.abs(clampedOffset) * 0.5;
        transforms[id] = { rotateY, translateZ, opacity };
      }
    });

    setCardTransforms(transforms);
    if (updateActive && closestId !== null && closestId !== activeId) {
      setActiveId(closestId);
    }
  }, [activeId, isMobile]);

  // Listen for scroll events to detect center card
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



  // Drag handlers
  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const container = carouselRef.current;
    if (!container) return;
    isDragging.current = true;
    hasDragged.current = false;
    isUserScrolling.current = true;
    dragStartX.current = e.clientX;
    dragScrollLeft.current = container.scrollLeft;
    setCursorState('grabbing');
  }, []);

  const onPointerMove = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 10) hasDragged.current = true;
    const container = carouselRef.current;
    if (container) {
      // Balanced sensitivity with 0.95 multiplier
      container.scrollLeft = dragScrollLeft.current - (dx * 2.00);
    }
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setCursorState('grab');
  }, []);

  const handleCardClick = useCallback((id: number) => {
    if (hasDragged.current) {
      hasDragged.current = false;
      return;
    }

    // If clicking on already active card, open fullscreen
    if (id === activeId) {
      setFullscreenVideoId(id);
      return;
    }

    // Prevent auto-detection from overriding during programmatic scroll
    isUserScrolling.current = false;
    setActiveId(id);

    const card = cardRefs.current[id];
    const container = carouselRef.current;
    if (card && container) {
      const cardRect = card.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const containerCenter = containerRect.left + containerRect.width / 2;
      const scrollLeft = container.scrollLeft + (cardCenter - containerCenter);
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      // Re-enable auto-detection after scroll completes
      setTimeout(() => { isUserScrolling.current = true; }, 600);
    } else {
      isUserScrolling.current = true;
    }
  }, [activeId]);

  return (
    <>
      {/* Fullscreen Video Overlay */}
      <AnimatePresence>
        {fullscreenVideoId !== null && (() => {
          const fullscreenProject = videoProjects.find(p => p.id === fullscreenVideoId);
          return fullscreenProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-background cursor-pointer flex items-center justify-center"
              onClick={() => setFullscreenVideoId(null)}
            >
              <video
                src={fullscreenProject.videoUrl}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover"
                ref={(el) => {
                  fullscreenVideoRef.current = el;
                }}
              />

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-foreground/10 backdrop-blur-md border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
                onClick={(e) => { e.stopPropagation(); setFullscreenVideoId(null); }}
              >
                <X className="w-5 h-5 text-foreground/80" />
              </motion.button>

              {/* Tap to dismiss hint */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-6 inset-x-0 text-center text-xs text-foreground/50 font-mono tracking-wider"
              >
                TAP ANYWHERE TO CLOSE
              </motion.p>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      <section className="w-full md:min-h-screen md:flex md:flex-col">
        {/* Title Area */}
        <div className="flex-shrink-0 flex items-center justify-center pt-24 pb-4 md:pt-28 md:pb-10 lg:pt-32 lg:pb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center px-4 w-full"
          >
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-bold text-foreground leading-none flex flex-wrap items-baseline justify-center gap-2 md:gap-6"
              style={{ fontSize: "clamp(2rem, 7vw, 10rem)" }}
            >
              <span
                className="font-cursive text-primary italic"
                style={{ textShadow: "0 0 40px hsl(var(--primary) / 0.3)" }}
              >
                Creative
              </span>
              <MorphingText className="font-barrio uppercase tracking-wide" />
            </motion.h1>

            <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full max-w-4xl mx-auto mt-3 md:mt-8 px-2 md:px-4 gap-1 sm:gap-0">
              <p
                className="text-muted-foreground text-xs md:text-base opacity-0 animate-fade-up"
                style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
              >
                Crafting visual stories through motion
              </p>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="font-cursive text-foreground/60 text-sm md:text-xl lg:text-3xl"
              >
                — Dushyant
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Video Carousel */}
        <div
          className="md:flex-1 relative flex items-center"
          style={isMobile ? undefined : { perspective: "1200px" }}
        >

          <div
            ref={carouselRef}
            className="w-full overflow-x-auto flex items-center gap-3 md:gap-6 px-[8vw] md:px-[25vw] py-2 md:py-4 select-none snap-x snap-proximity"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", cursor: cursorState, touchAction: "pan-x", transformStyle: isMobile ? undefined : "preserve-3d" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>

            {videoProjects.map((project, index) => {
              const isActive = activeId === project.id;
              const t = cardTransforms[project.id];
              const rotateY = t?.rotateY ?? 0;
              const translateZ = t?.translateZ ?? 0;
              const cardOpacity = t?.opacity ?? 0.6;

              return (
                <motion.div
                  key={project.id}
                  ref={(el) => { cardRefs.current[project.id] = el; }}
                  className="flex-shrink-0 cursor-pointer group snap-center"
                  style={{
                    width: isActive
                      ? (isMobile ? "clamp(240px, 78vw, 440px)" : "clamp(320px, 50vw, 620px)")
                      : (isMobile ? "clamp(180px, 58vw, 340px)" : "clamp(250px, 35vw, 440px)"),
                    transform: isMobile ? undefined : `rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
                    opacity: isMobile ? 1 : cardOpacity,
                    transition: "width 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.4s ease-out",
                    transformStyle: isMobile ? undefined : "preserve-3d",
                  }}
                  onClick={() => handleCardClick(project.id)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.04, duration: 0.5 }}
                >
                  {/* Video Card */}
                  <motion.div
                    className="relative aspect-video rounded-lg overflow-hidden transition-all duration-500"
                    animate={{ scale: isActive ? 1 : 0.92 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                  >
                    <video
                      ref={(el) => {
                        videoRefs.current[project.id] = el;
                      }}
                      src={project.videoUrl}
                      preload="metadata"
                      loop
                      muted={isMuted}
                      playsInline
                      onLoadedMetadata={(e) => {
                        if (project.id !== activeId) {
                          e.currentTarget.currentTime = project.thumbnailTime;
                        }
                      }}
                      className="w-full h-full object-cover"
                    />

                    {/* Overlay text on video */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                      <h3 className="text-foreground text-xs md:text-sm font-semibold tracking-wide uppercase">
                        {project.client}
                      </h3>
                      <p className="text-foreground/60 text-[10px] md:text-xs font-mono tracking-wider">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Fullscreen button for active card */}
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute top-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFullscreenVideoId(project.id);
                        }}
                      >
                        <Maximize2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />
                      </motion.button>
                    )}

                    {/* Volume toggle button for active card */}
                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute bottom-3 right-3 z-10 w-8 h-8 md:w-9 md:h-9 rounded-full bg-background/60 backdrop-blur-sm border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-200"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsMuted((prev) => !prev);
                        }}
                      >
                        {isMuted ? (
                          <VolumeX className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-foreground/80" />
                        )}
                      </motion.button>
                    )}

                  </motion.div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      className="flex justify-center mt-3"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
