import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Motion Design",
    description:
      "Bringing static visuals to life through dynamic animations that captivate and engage audiences.",
  },
  {
    number: "02",
    title: "Film Editing",
    description:
      "Crafting compelling narratives through precise editing, pacing, and visual storytelling techniques.",
  },
  {
    number: "03",
    title: "Video Editing",
    description:
      "Transforming raw footage into polished, professional videos with seamless transitions and visual flow.",
  },
  {
    number: "04",
    title: "Short Form",
    description:
      "Creating short-form content that hooks fast, tells a clear story, and drives engagement.",
  },
];

const serviceToProjectMap: Record<string, string> = {
  "Motion Design": "motion-design-showcase",
  "Film Editing": "film-editing-masterpiece",
  "Video Editing": "creative-direction-vision",
  "Short Form": "short-form-reels",
};

const ServiceCard = ({
  service,
  index,
  isActive,
  onClick,
  onViewProjectClick,
}: {
  service: (typeof services)[0];
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
  onViewProjectClick: (serviceTitle: string) => void;
}) => {
  return (
    <motion.div
      className="group relative border-b border-border/30 cursor-pointer"
      onClick={() => onClick(index)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="py-4 md:py-8 px-4 md:px-8 flex items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-4 md:gap-10 flex-1 min-w-0">
          <span className="text-primary/40 font-heading text-base md:text-xl font-medium min-w-[2.5rem] md:min-w-[3.5rem] flex-shrink-0">
            {service.number}
          </span>
          <motion.h3
            className="font-heading text-xl md:text-3xl lg:text-4xl font-medium text-foreground transition-colors duration-300 group-hover:text-primary truncate"
            animate={{ x: isActive ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {service.title}
          </motion.h3>
        </div>

        <motion.div
          className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-border/50 flex items-center justify-center"
          animate={{
            backgroundColor: isActive ? "hsl(var(--primary))" : "transparent",
            borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5 md:w-6 md:h-6"
            animate={{
              rotate: isActive ? 45 : 0,
              stroke: isActive
                ? "hsl(var(--primary-foreground))"
                : "hsl(var(--foreground))",
            }}
            transition={{ duration: 0.3 }}
          >
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>

      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="pb-4 md:pb-8 px-4 md:px-8 pl-[3.5rem] md:pl-[5.5rem] lg:pl-[6rem]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 14 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="rounded-xl border border-border/40 bg-secondary/20 p-4 md:p-5"
          >
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-4 leading-relaxed">
              {service.description}
            </p>

            <div className="flex justify-start">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProjectClick(service.title);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-4 md:px-6 py-2.5 md:py-3 rounded-lg border border-primary/50 bg-background/70 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors duration-300 text-sm md:text-base font-medium"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <span>View Project</span>
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ x: isActive ? [0, 3, 0] : 0 }}
                  transition={{ duration: 1.2, repeat: isActive ? Infinity : 0, ease: "easeInOut" }}
                >
                  <path
                    d="M5 12H19M19 12L12.5 5.5M19 12L12.5 18.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const handleViewProject = (serviceTitle: string) => {
    const slug = serviceToProjectMap[serviceTitle];
    if (!slug) return;
    navigate(`/project/${slug}`);
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="container-wide relative z-10">
        <motion.div
          className="pt-2 md:pt-0 mb-6 ml-4 md:mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm text-primary uppercase tracking-wider mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            What I Do
          </motion.p>
          <h2 className="font-heading text-3xl md:text-5xl font-medium text-foreground leading-[1.1]">
            What can I do for you<span className="text-primary">?</span>
          </h2>
        </motion.div>

        <div className="border-t border-border/30">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onClick={(i) => setActiveIndex(activeIndex === i ? null : i)}
              onViewProjectClick={handleViewProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
