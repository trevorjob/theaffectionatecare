"use client";

import { motion, useReducedMotion } from "motion/react";

interface Orb {
  color: "sage" | "gold";
  size: number;
  startX: string;
  startY: string;
  driftX: number;
  driftY: number;
  duration: number;
  opacity?: number;
}

interface PageAuraProps {
  variant: "home" | "about" | "contact";
}

const VARIANTS: Record<PageAuraProps["variant"], Orb[]> = {
  home: [
    { color: "sage", size: 720, startX: "-15%", startY: "-10%", driftX: 80,  driftY: 60,  duration: 22, opacity: 0.55 },
    { color: "gold", size: 520, startX: "85%",  startY: "65%",  driftX: -60, driftY: -40, duration: 28, opacity: 0.40 },
  ],
  about: [
    { color: "sage", size: 640, startX: "70%",  startY: "-8%",  driftX: -70, driftY: 70,  duration: 26, opacity: 0.50 },
    { color: "gold", size: 420, startX: "-10%", startY: "55%",  driftX: 50,  driftY: -50, duration: 32, opacity: 0.32 },
  ],
  contact: [
    { color: "sage", size: 580, startX: "40%",  startY: "-12%", driftX: 60,  driftY: 90,  duration: 30, opacity: 0.50 },
    { color: "gold", size: 460, startX: "-12%", startY: "75%",  driftX: 70,  driftY: -60, duration: 24, opacity: 0.38 },
  ],
};

const COLORS = {
  sage: "rgba(107, 191, 158, 1)",
  gold: "rgba(212, 169, 106, 1)",
};

export default function PageAura({ variant }: PageAuraProps) {
  const shouldReduce = useReducedMotion();
  const orbs = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width:  orb.size,
            height: orb.size,
            left:   orb.startX,
            top:    orb.startY,
            background: `radial-gradient(circle at center, ${COLORS[orb.color]} 0%, transparent 60%)`,
            opacity: orb.opacity ?? 0.5,
            filter: "blur(80px)",
            willChange: "transform",
          }}
          animate={
            shouldReduce
              ? undefined
              : {
                  x: [0, orb.driftX, 0],
                  y: [0, orb.driftY, 0],
                }
          }
          transition={{
            duration: orb.duration,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
}
