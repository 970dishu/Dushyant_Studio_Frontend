import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

const SplitText = ({
  children,
  className = "",
  delay = 0,
  stagger = 0.06,
  once = true,
  as: Tag = "h2",
}: SplitTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, margin: "-80px" });

  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 180,
        damping: 22,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`overflow-hidden ${className}`}
      style={{ display: "block" }}
      aria-label={children}
    >
      <Tag className={`m-0 p-0 ${className}`} aria-hidden>
        {words.map((word, i) => (
          <span
            key={i}
            className="inline-block overflow-hidden"
            style={{ marginRight: "0.25em" }}
          >
            <motion.span
              variants={wordVariants}
              className="inline-block"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
};

export default SplitText;
