"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeOut } from "@/lib/utils";

/**
 * Scroll-triggered fade-up. Renders children unchanged when the user prefers
 * reduced motion.
 */
export default function Reveal({ as = "div", delay = 0, y = 16, className, children, ...props }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] ?? motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...props}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </Tag>
  );
}
