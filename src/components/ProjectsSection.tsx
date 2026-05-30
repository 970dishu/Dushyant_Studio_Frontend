import { useRef, useState, useCallback, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useTransform,
  useInView,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";
import SplitText from "./SplitText";

const N = projects.length;
const tiltSpring = { damping: 22, stiffness: 240, mass: 0.5 };

const PEEK = 64;  // px of adjacent card peeking in from each side
const GAP  = 20;  // px gap between cards in the track

// ─── Desktop Card ─────────────────────────────────────────────────────────────
const ProjectCard = ({
  project,
  index,
  isCurrent,
  cardWidth,
  onCardClick,
}: {
  project: (typeof projects)[0];
  index: number;
  isCurrent: boolean;
  cardWidth: number;
  onCardClick: () => void;
}) => {
  const navigate = useNavigate();
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered]       = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(my, [0, 1], [isCurrent ? 4 : 0, isCurrent ? -4 : 0]), tiltSpring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [isCurrent ? -4 : 0, isCurrent ? 4 : 0]), tiltSpring);
  const glowX  = useTransform(mx, [0, 1], [0, 100]);
  const glowY  = useTransform(my, [0, 1], [0, 100]);
  const glowBg = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, hsl(var(--primary) / 0.22) 0%, transparent 52%)`;

  const onMove = useCallback((e: React.MouseEvent) => {
    if (!isCurrent) return;
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top)  / r.height);
  }, [isCurrent, mx, my]);

  const onEnter = useCallback(() => {
    if (!isCurrent) return;
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  }, [isCurrent]);

  const onLeave = useCallback(() => {
    setHovered(false);
    setVideoReady(false);
    mx.set(0.5); my.set(0.5);
    if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
  }, [mx, my]);

  const handleClick = () => {
    if (!isCurrent) { onCardClick(); return; }
    navigate(`/project/${project.slug}`);
  };

  return (
    <motion.div
      ref={cardRef}
      className="flex-shrink-0 relative overflow-hidden cursor-pointer"
      style={{
        width: cardWidth,
        height: "72vh",
        borderRadius: 24,
        rotateX: isCurrent ? rotateX : 0,
        rotateY: isCurrent ? rotateY : 0,
        transformPerspective: 1100,
        transformStyle: "preserve-3d",
        boxShadow: isCurrent
          ? hovered
            ? "0 40px 100px -20px rgba(0,0,0,0.75)"
            : "0 24px 70px -15px rgba(0,0,0,0.6)"
          : "0 8px 30px -8px rgba(0,0,0,0.4)",
      }}
      animate={{
        opacity: isCurrent ? 1 : 0.45,
        scale:   isCurrent ? 1 : 0.95,
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onClick={handleClick}
    >
      {/* Image */}
      <motion.img
        src={project.image} alt={project.title}
        className="absolute inset-0 w-full h-full object-cover"
        animate={{
          scale:  isCurrent && hovered ? 1.06 : 1,
          filter: isCurrent && hovered ? "grayscale(0%)" : "grayscale(65%)",
        }}
        transition={{
          scale:  { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          filter: { duration: 0.5 },
        }}
      />

      {/* Video preview (current card only) */}
      {isCurrent && project.heroVideo && (
        <motion.video
          ref={videoRef}
          src={hovered ? project.heroVideo : undefined}
          muted loop playsInline preload="none"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ opacity: hovered && videoReady ? 1 : 0 }}
          transition={{ duration: 0.55 }}
        />
      )}

      {/* Cursor glow */}
      {isCurrent && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: glowBg }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/35 to-transparent" />

      {/* Top bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
        <span
          className="px-3 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.13em] backdrop-blur-md"
          style={{
            background: "hsl(var(--primary) / 0.15)",
            color: "hsl(var(--primary))",
            border: "1px solid hsl(var(--primary) / 0.4)",
          }}
        >
          {project.category}
        </span>
        {isCurrent && (
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center border backdrop-blur-md"
            animate={{
              backgroundColor: hovered ? "hsl(var(--primary))" : "rgba(255,255,255,0.08)",
              borderColor:     hovered ? "hsl(var(--primary))" : "rgba(255,255,255,0.2)",
              rotate: hovered ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUpRight className="w-4 h-4 text-white" />
          </motion.div>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-7 md:pb-10 z-10">
        <div
          aria-hidden
          className="absolute bottom-2 right-5 font-heading font-black select-none pointer-events-none leading-none"
          style={{ fontSize: "clamp(6rem, 12vw, 16rem)", color: "rgba(255,255,255,0.04)" }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        <motion.h3
          className="font-heading font-bold text-white leading-none mb-3"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 4.5rem)" }}
          animate={{ y: isCurrent && hovered ? -4 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.h3>

        {isCurrent && (
          <>
            <motion.p
              className="text-white/55 text-sm md:text-base mb-5 max-w-xl leading-relaxed"
              animate={{ opacity: hovered ? 0.85 : 0.55 }}
              transition={{ duration: 0.3 }}
            >
              {project.shortDescription}
            </motion.p>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm">
              {[
                { label: "Client", value: project.client },
                { label: "Year",   value: project.year   },
                { label: "Role",   value: project.role   },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className="text-white/35">{label}</span>
                  <span className="text-white/80 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

// ─── Mobile Card ─────────────────────────────────────────────────────────────
const MobileProjectCard = ({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) => {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, clipPath: "inset(10% 0 0 0 round 16px)" }}
      animate={isInView ? { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0 round 16px)" } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        onClick={() => navigate(`/project/${project.slug}`)}
        className="group relative w-full aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
        style={{ boxShadow: "0 12px 40px -10px rgba(0,0,0,0.6)" }}
      >
        <img
          src={project.image} alt={project.title}
          className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 p-5 flex flex-col justify-between">
          <span
            className="self-start px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
            style={{
              background: "hsl(var(--primary) / 0.2)",
              color: "hsl(var(--primary))",
              border: "1px solid hsl(var(--primary) / 0.4)",
            }}
          >
            {project.category}
          </span>
          <div>
            <h3 className="font-heading text-2xl font-bold text-white mb-1.5 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-white/50 text-xs mb-3 line-clamp-2">{project.shortDescription}</p>
            <div className="flex items-center gap-2 text-[11px] text-white/40">
              <span>{project.client}</span>
              <span className="text-white/20">·</span>
              <span>{project.year}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ─────────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const isMobile = useIsMobile();
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  // Card width = container minus two peek widths minus two gaps
  const cardW = Math.max(280, containerW - PEEK * 2 - GAP * 2);
  // Track x: position current card so PEEK+GAP is visible on each side
  const trackX = -(current * (cardW + GAP)) + PEEK + GAP;

  // Measure container on mount and resize
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerW(el.clientWidth);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onResize = () => setContainerW(el.clientWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const prev = () => { if (current > 0) setCurrent((c) => c - 1); };
  const next = () => { if (current < N - 1) setCurrent((c) => c + 1); };

  return (
    <section id="work" className="relative bg-background section-padding">
      <div className="container-wide">

        {/* Header */}
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <motion.p
              className="text-sm text-primary uppercase tracking-wider mb-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Selected Work
            </motion.p>
            <SplitText
              as="h2"
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-foreground"
              delay={0.05}
              stagger={0.07}
            >
              Featured Projects
            </SplitText>
          </div>

          {/* Desktop nav */}
          {!isMobile && (
            <div className="flex items-center gap-3 pb-1">
              {/* Counter */}
              <div className="flex items-end gap-1 mr-3 leading-none select-none">
                <motion.span
                  key={current}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-heading text-4xl font-black text-primary tabular-nums"
                >
                  {String(current + 1).padStart(2, "0")}
                </motion.span>
                <span className="font-heading text-lg text-foreground/25 mb-0.5">
                  /{String(N).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={prev}
                disabled={current === 0}
                className="w-12 h-12 rounded-full border border-border/40 flex items-center justify-center text-foreground/60 hover:text-primary hover:border-primary hover:bg-primary/10 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={next}
                disabled={current === N - 1}
                className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-all duration-300 disabled:opacity-25 disabled:cursor-not-allowed"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* ── DESKTOP: peek carousel ── */}
        {!isMobile && (
          <>
            {/* overflow-hidden clips the track; edges of adjacent cards peek in */}
            <div ref={containerRef} className="overflow-hidden">
              <motion.div
                className="flex"
                style={{ gap: GAP }}
                animate={{ x: trackX }}
                transition={{ type: "spring", damping: 32, stiffness: 200, mass: 0.7 }}
              >
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                    isCurrent={index === current}
                    cardWidth={cardW}
                    onCardClick={() => setCurrent(index)}
                  />
                ))}
              </motion.div>
            </div>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to project ${i + 1}`}
                >
                  <motion.div
                    className="rounded-full"
                    animate={{
                      width: i === current ? 28 : 6,
                      height: 6,
                      backgroundColor:
                        i === current
                          ? "hsl(var(--primary))"
                          : "hsl(var(--foreground) / 0.2)",
                      boxShadow:
                        i === current
                          ? "0 0 10px 2px hsl(var(--primary) / 0.5)"
                          : "none",
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  />
                </button>
              ))}
            </div>
          </>
        )}

        {/* ── MOBILE: vertical stack ── */}
        {isMobile && (
          <div className="flex flex-col gap-5">
            {projects.map((project, index) => (
              <MobileProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default ProjectsSection;
