import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects, Project } from "@/data/projects";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Desktop Sticky Stacking Card ─────────────────────────────────────────
// Each card is `sticky top-0 h-screen` so it "sticks" while the next one
// scrolls into view and overlaps. As it recedes it scales down slightly.
const ProjectCard = ({
  project,
  index,
  totalProjects,
}: {
  project: Project;
  index: number;
  totalProjects: number;
}) => {
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  // As this card scrolls out, it scales down from 1 → 0.9
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88]);
  // And fades opacity slightly
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0.6]);

  return (
    <div
      ref={cardRef}
      className="sticky top-0 h-screen flex items-center justify-center px-4 md:px-6 lg:px-12 overflow-hidden"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative w-full max-w-[1600px]"
        style={{ scale, opacity }}
      >
        {/* Card number badge top-right */}
        <div
          onClick={() => navigate(`/project/${project.slug}`)}
          className="group relative w-full aspect-[16/9] rounded-[24px] overflow-hidden bg-card cursor-pointer"
          style={{
            boxShadow:
              "0 25px 60px -15px rgba(0, 0, 0, 0.5), 0 10px 30px -10px rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 lg:p-16">
            <div className="absolute top-6 right-6 md:top-10 md:right-10">
              <span className="font-heading text-5xl md:text-8xl lg:text-9xl font-bold text-foreground/10 group-hover:text-primary/20 transition-colors duration-500">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <span className="text-sm md:text-base text-primary uppercase tracking-widest mb-3">
              {project.category}
            </span>

            <h3 className="font-heading text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-muted-foreground text-sm md:text-base lg:text-lg max-w-2xl mb-6">
              {project.shortDescription}
            </p>

            <div className="flex flex-wrap gap-4 md:gap-8 text-sm text-muted-foreground">
              <div>
                <span className="text-foreground/50">Client:</span>{" "}
                <span className="text-foreground">{project.client}</span>
              </div>
              <div>
                <span className="text-foreground/50">Year:</span>{" "}
                <span className="text-foreground">{project.year}</span>
              </div>
              <div>
                <span className="text-foreground/50">Role:</span>{" "}
                <span className="text-foreground">{project.role}</span>
              </div>
            </div>
          </div>

          {index === 0 && (
            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Scroll
              </span>
              <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// ─── Mobile Simple Card ────────────────────────────────────────────────────
const MobileProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      <div
        onClick={() => navigate(`/project/${project.slug}`)}
        className="group relative w-full aspect-video rounded-2xl overflow-hidden bg-card cursor-pointer"
        style={{ boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" }}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end p-5">
          <span className="text-xs text-primary uppercase tracking-widest mb-1">
            {project.category}
          </span>
          <h3 className="font-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span>
              <span className="text-foreground/50">Client:</span> {project.client}
            </span>
            <span>
              <span className="text-foreground/50">Year:</span> {project.year}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ───────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="work" className="relative bg-background">
      {/* Section Header */}
      <div className="section-padding pb-0">
        <div className="container-wide">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-8">
            <div>
              <motion.p
                className="text-sm text-primary uppercase tracking-wider mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Selected Work
              </motion.p>
              <motion.h2
                className="font-heading text-3xl md:text-5xl lg:text-6xl font-medium text-foreground"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Featured Projects
              </motion.h2>
            </div>
            <motion.p
              className="text-muted-foreground text-base md:text-lg max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              A showcase of my best motion design, film editing, and creative
              direction work.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mobile: simple vertical grid */}
      {isMobile && (
        <div className="px-4 py-8 flex flex-col gap-6">
          {projects.map((project, index) => (
            <MobileProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}

      {/* Desktop: sticky-stack scroll effect */}
      {!isMobile && (
        <div className="relative">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalProjects={projects.length}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
