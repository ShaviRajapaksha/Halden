
"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  progress: MotionValue<number>;
  from: number;
  to: number;
  className?: string;
  children: ReactNode;
};

export default function Beat({
  progress,
  from,
  to,
  className = "",
  children,
}: Props) {
  const fade = 0.04;

  const opacity = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    progress,
    [from, from + fade, to - fade, to],
    [22, 0, 0, -22]
  );

  const pointerEvents = useTransform(opacity, (value) =>
    value > 0.5 ? "auto" : "none"
  );

  return (
    <motion.section
      className={`beat ${className}`}
      style={{
        opacity,
        y,
        pointerEvents,
      }}
    >
      {children}
    </motion.section>
  );
}
