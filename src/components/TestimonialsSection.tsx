import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import kanishkImg from "/assets/kanishk-khurana.png";
import amanImg from "/assets/aman-verma.png";
import agyaatImg from "/assets/agyaat-aadarsh.png";
import SplitText from "./SplitText";

const Counter = ({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref} className="tabular-nums">{count}{suffix}</span>;
};

const testimonials = [
  {
    quote: "The creative direction and storytelling that Dushyant brought to our project transformed our campaign completely.",
    name: "Agyaat Aadarsh",
    role: "Content Creator",
    avatar: agyaatImg,
  },
  {
    quote: "Dushyant's motion design elevated our brand to a whole new level. His attention to detail and creative vision is unmatched.",
    name: "Kanishk Khurana",
    role: "DevRel, Across Protocol",
    avatar: kanishkImg,
  },
  {
    quote: "Working with Dushyant was seamless. He understood our vision instantly and delivered animations that exceeded our expectations.",
    name: "Aman Verma",
    role: "Marketing Lead",
    avatar: amanImg,
  },
];

const stats = [
  { value: 96, suffix: "%", label: "Client Satisfaction", description: "Every project delivered with excellence" },
  { value: 32, suffix: "+", label: "Projects Delivered", description: "Across motion design, editing & direction" },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: i * 0.12,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className="bg-secondary rounded-2xl p-5 md:p-8 border border-border/40 flex flex-col h-full relative overflow-hidden group"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(circle at 50% 0%, hsl(var(--primary) / 0.06) 0%, transparent 70%)" }}
      />

      {/* Quote mark */}
      <span className="absolute top-4 right-6 font-heading text-6xl text-primary/10 font-bold leading-none select-none">
        "
      </span>

      <p className="text-foreground text-base md:text-lg mb-8 leading-relaxed flex-grow relative z-10">
        "
        {testimonial.quote.split("Dushyant").map((part, idx, arr) => (
          <Fragment key={`${testimonial.name}-${idx}`}>
            {part}
            {idx < arr.length - 1 && <span className="text-primary">Dushyant</span>}
          </Fragment>
        ))}
        "
      </p>

      <div className="flex items-center gap-4 mt-auto relative z-10">
        <div className="relative">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
          />
          <div className="absolute inset-0 rounded-full ring-2 ring-primary/0 group-hover:ring-primary/30 transition-all duration-500" />
        </div>
        <div>
          <p className="font-medium text-foreground">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} id="testimonials" className="section-padding overflow-hidden">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm text-primary uppercase tracking-wider mb-4"
          >
            Testimonials
          </motion.p>
          <SplitText
            as="h2"
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-medium text-foreground mb-6"
            delay={0.1}
            stagger={0.07}
          >
            Kind Words
          </SplitText>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-base md:text-lg max-w-2xl"
          >
            Here's what clients have shared about working with me. Their trust motivates me to keep pushing creative boundaries.
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-14 items-stretch">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="bg-secondary rounded-2xl p-6 md:p-12 border border-border/40 group relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 60% at 20% 80%, hsl(var(--primary) / 0.05) 0%, transparent 70%)" }}
              />
              <p className="text-muted-foreground text-sm mb-4">{stat.description}</p>
              <div className="flex items-baseline gap-4">
                <span className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium text-primary">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-muted-foreground text-sm md:text-base">{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
