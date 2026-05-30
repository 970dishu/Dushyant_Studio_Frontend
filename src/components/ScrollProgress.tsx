import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9997] origin-left"
      style={{
        scaleX,
        background: "hsl(var(--primary))",
        boxShadow: "0 0 8px 1px hsl(var(--primary) / 0.6)",
      }}
    />
  );
};

export default ScrollProgress;
