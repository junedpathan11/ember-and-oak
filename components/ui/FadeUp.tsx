"use client";

import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Small offset for the rare case where two adjacent blocks should not fire together. */
  delay?: number;
  id?: string;
}

/**
 * The site's only scroll animation: fade + 24px rise, 400ms ease-out, fired
 * once when the block enters the viewport. Deliberately not staggered.
 */
export default function FadeUp({
  children,
  as = "div",
  className,
  delay = 0,
  id,
}: FadeUpProps) {
  const MotionTag = motion.create(as as ElementType);

  return (
    <MotionTag
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
    >
      {children}
    </MotionTag>
  );
}
