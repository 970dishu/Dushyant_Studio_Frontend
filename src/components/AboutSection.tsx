import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import SplitText from "./SplitText";
import workspaceImage from "/assets/dushyant-portrait.png";

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

const stats = [
  { value: 3, suffix: "+", label: "Years of Experience" },
  { value: 50, suffix: "+", label: "Completed Projects" },
  { value: 25, suffix: "+", label: "Clients Worldwide" },
];

const socials = [
  {
    name: "X",
    href: "https://x.com/dushyant_dishu",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/aks.dushyant",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "Behance",
    href: "https://www.behance.net/970dishu1",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/dushyant-garg-955869213/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
];

const MagneticIcon = ({ href, name, icon }: { href: string; name: string; icon: React.ReactNode }) => {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0px, 0px)";
    el.style.transition = "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)";
  }, []);

  const handleMouseEnter = useCallback(() => {
    const el = ref.current;
    if (el) el.style.transition = "transform 0.1s ease-out";
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-foreground hover:text-primary hover:bg-secondary/80 transition-colors"
      style={{ willChange: "transform", transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), color 0.2s, background-color 0.2s" }}
    >
      {icon}
    </a>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const imageInView = useInView(imageRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yMotion = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const y = isMobile ? "0px" : yMotion;

  return (
    <section ref={sectionRef} id="about" className="section-padding relative overflow-hidden">
      <motion.div className="container-wide" style={{ y }}>
        <div className="grid lg:grid-cols-[1fr,auto] gap-8 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="relative">
            <SplitText
              as="h2"
              className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 md:mb-6 uppercase tracking-tight"
              stagger={0.06}
            >
              About Me
            </SplitText>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-xl"
            >
              Hi, I'm Dushyant — a motion designer and creative director passionate about bringing stories to life through animation.
            </motion.p>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex flex-col group"
                >
                  <span className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 origin-left">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-foreground text-xs md:text-base font-medium mt-1">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 md:gap-8 mb-6 md:mb-8"
            >
              <div>
                <p className="text-foreground font-medium mb-1">WhatsApp :</p>
                <a
                  href="https://wa.me/917696057349"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  7696057349
                </a>
              </div>
              <div>
                <p className="text-foreground font-medium mb-1">Email :</p>
                <a href="mailto:dushyantdishugarg@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  dushyantdishugarg@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Social Icons with magnetic effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              {socials.map((social) => (
                <MagneticIcon key={social.name} href={social.href} name={social.name} icon={social.icon} />
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Link
                to="/my-story"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-primary rounded-full text-primary font-heading text-lg uppercase tracking-wider hover:bg-primary hover:text-background transition-all duration-300"
              >
                My Story
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/* Right - Image with clip-path reveal */}
          <div ref={imageRef} className="hidden lg:block relative">
            <motion.div
              className="w-[320px] lg:w-[360px] xl:w-[400px] aspect-[3/4] overflow-hidden rounded-2xl bg-muted"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={imageInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <motion.img
                src={workspaceImage}
                alt="Dushyant - Motion Designer"
                className="w-full h-full object-cover object-top"
                initial={{ scale: 1.15 }}
                animate={imageInView ? { scale: 1 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              />
            </motion.div>

            {/* Subtle accent line */}
            <motion.div
              className="absolute -left-4 top-8 bottom-8 w-0.5 bg-primary/40 rounded-full"
              initial={{ scaleY: 0 }}
              animate={imageInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
              style={{ originY: 0 }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;
