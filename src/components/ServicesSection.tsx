import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Motion Design",
    description: "Bringing static visuals to life through dynamic animations that captivate and engage audiences.",
    details: [
      "2D & 3D motion graphics",
      "Logo animations",
      "Explainer videos",
      "Social media content",
      "UI/UX micro-interactions",
      "Kinetic typography",
    ],
  },
  {
    number: "02",
    title: "Film Editing",
    description: "Crafting compelling narratives through precise editing, pacing, and visual storytelling techniques.",
    details: [
      "Narrative film editing",
      "Commercial editing",
      "Documentary storytelling",
      "Color grading",
      "Sound design",
      "Multi-camera editing",
    ],
  },
  {
    number: "03",
    title: "Video Editing",
    description: "Transforming raw footage into polished, professional videos with seamless transitions and visual flow.",
    details: [
      "YouTube content editing",
      "Short-form video editing",
      "Interview editing",
      "Promotional videos",
      "Video color correction",
      "Audio sync & mixing",
    ],
  },
  {
    number: "04",
    title: "Storywriting",
    description: "Developing compelling narratives that connect with audiences on an emotional level.",
    details: [
      "Script development",
      "Storyboarding",
      "Narrative structure",
      "Brand storytelling",
      "Character development",
      "Concept writing",
    ],
  },
];

const FloatingTag = ({
  detail,
  index
}: {
  detail: string;
  index: number;
}) => {
  const tagRef = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: tagRef,
    offset: ["start end", "end start"]
  });

  // Each tag floats at different rates for organic feel
  const floatOffset = (index % 3) - 1; // -1, 0, or 1
  const yFull = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [15 + floatOffset * 5, 0, -15 - floatOffset * 5]
  );
  const rotateFull = useTransform(
    scrollYProgress,
    [0, 1],
    [floatOffset * 2, -floatOffset * 2]
  );

  // Disable parallax on mobile/reduced-motion for performance
  const y = shouldReduceMotion ? 0 : yFull;
  const rotate = shouldReduceMotion ? 0 : rotateFull;

  return (
    <motion.span
      ref={tagRef}
      style={{ y, rotate }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-border/50 text-sm md:text-base text-foreground/80 hover:border-primary hover:text-primary transition-colors duration-300 inline-block"
    >
      {detail}
    </motion.span>
  );
};

const ServiceCard = ({
  service,
  index,
  isActive,
  onClick
}: {
  service: typeof services[0];
  index: number;
  isActive: boolean;
  onClick: (index: number) => void;
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
        {/* Left: Number + Title */}
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

        {/* Right: Arrow indicator */}
        <motion.div
          className="flex-shrink-0 w-10 h-10 md:w-14 md:h-14 rounded-full border border-border/50 flex items-center justify-center"
          animate={{
            backgroundColor: isActive ? "hsl(var(--primary))" : "transparent",
            borderColor: isActive ? "hsl(var(--primary))" : "hsl(var(--border) / 0.5)"
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
              stroke: isActive ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))"
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

      {/* Expanded Content */}
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isActive ? "auto" : 0,
          opacity: isActive ? 1 : 0
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <div className="pb-4 md:pb-8 px-4 md:px-8 pl-[3.5rem] md:pl-[5.5rem] lg:pl-[6rem]">
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mb-4 md:mb-6">
            {service.description}
          </p>

          {/* Tags with parallax */}
          <div className="flex flex-wrap gap-3">
            {service.details.map((detail, i) => (
              <FloatingTag key={i} detail={detail} index={i} />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-12 md:py-20 overflow-hidden"
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-secondary/50 to-background pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="container-wide relative z-10">
        {/* Header */}
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

        {/* Services List */}
        <div className="border-t border-border/30">
          {services.map((service, index) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={index}
              isActive={activeIndex === index}
              onClick={(i) => setActiveIndex(activeIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
