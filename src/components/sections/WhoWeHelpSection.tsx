"use client";

import { motion, useReducedMotion } from "motion/react";
import { WHO_WE_HELP } from "@/lib/constants";

const EASE = [0.25, 1, 0.5, 1] as const;

export default function WhoWeHelpSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="who-we-help"
      className="bg-white"
      style={{ paddingBlock: "clamp(4.5rem, 8vw, 7rem)" }}
      aria-labelledby="who-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">

          {/* Left: heading + description */}
          <motion.div
            className="space-y-5 lg:pt-1"
            initial={shouldReduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <span className="eyebrow">Who we help</span>
            <h2
              id="who-heading"
              className="font-display leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
            >
              Supporting people<br />who matter.
            </h2>
            <span className="gold-rule block" aria-hidden="true" />
            <p className="max-w-[34ch] font-body text-sm leading-relaxed text-ink-500">
              Our care and support spans a wide range of needs and conditions. Whatever the
              situation, our approach is always the same: patient, skilled, and
              genuinely human.
            </p>
          </motion.div>

          {/* Right: staggered pill cloud */}
          <div
            className="flex flex-wrap gap-2.5 lg:pt-2"
            aria-label="Conditions and needs we support"
          >
            {WHO_WE_HELP.map((group, i) => (
              <motion.span
                key={group}
                className="pill"
                initial={shouldReduce ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.06,
                  ease: EASE,
                }}
              >
                {group}
              </motion.span>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
