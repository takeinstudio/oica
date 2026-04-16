import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

const AnimatedSection = ({ children, className = "", delay = 0, direction = "up" }: Props) => {
  const getInitialY = () => {
    if (direction === "up") return 30;
    if (direction === "down") return -30;
    return 0;
  };
  
  const getInitialX = () => {
    if (direction === "left") return -30;
    if (direction === "right") return 30;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
