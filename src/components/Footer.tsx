import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const socialLinks = [
  { name: "Twitter / X", href: "https://x.com/Dushyant_Dishu" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/dushyant-garg-955869213/" },
  { name: "Instagram", href: "https://www.instagram.com/aks.dushyant/" },
  { name: "Behance", href: "https://www.behance.net/970dishu1" },
];

const navLinks = [
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#work" },
  { name: "Contact", href: "#contact" },
];

const MarqueeText = () => {
  const text = "DUSHYANT · STUDIO · MOTION · DESIGN · ";
  const repeated = text.repeat(3);

  return (
    <div className="overflow-hidden py-4 md:py-6 border-y border-border/20 relative group">
      <div className="flex whitespace-nowrap animate-footer-marquee group-hover:[animation-play-state:paused]">
        {[...Array(2)].map((_, i) => (
          <span
            key={i}
            className="flex-shrink-0 font-heading font-bold uppercase tracking-tighter select-none"
            style={{
              fontSize: "clamp(4rem, 10vw, 10rem)",
              lineHeight: 1,
              color: "transparent",
              WebkitTextStroke: "1px hsl(var(--border))",
            }}
          >
            {repeated}
          </span>
        ))}
      </div>

      {/* Glow on hover */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse 60% 100% at 50% 50%, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="border-t border-border/30 overflow-hidden">
      {/* Big animated marquee */}
      <MarqueeText />

      {/* Main footer content */}
      <motion.div
        style={{ y, opacity }}
        className="px-6 md:px-12 lg:px-20 py-12 md:py-16"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 md:gap-8 mb-12 md:mb-16">
            {/* Brand column */}
            <div className="md:col-span-1">
              <a href="#" className="font-heading text-2xl font-bold text-foreground block mb-4">
                Dushyant<span className="text-primary">.</span>studio
              </a>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                Motion Designer & Creative Director crafting compelling visual stories through animation and film.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-foreground/70">Available for new projects</span>
              </div>
            </div>

            {/* Nav column */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-5 font-medium">Navigate</p>
              <nav className="flex flex-col gap-3">
                {navLinks.map((link) =>
                  isHomePage ? (
                    <a
                      key={link.name}
                      href={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden" />
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      key={link.name}
                      to={`/${link.href}`}
                      className="group inline-flex items-center gap-1.5 text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 overflow-hidden" />
                      {link.name}
                    </Link>
                  )
                )}
              </nav>
            </div>

            {/* Social column */}
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-5 font-medium">Connect</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-border/20">
            <p className="text-xs text-muted-foreground/50">
              © {new Date().getFullYear()} Dushyant Garg. All rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Back to top
              <span className="w-6 h-6 rounded-full border border-border/40 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all">
                <ArrowUp className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
