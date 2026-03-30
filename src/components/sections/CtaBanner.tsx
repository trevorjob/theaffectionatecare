"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const EASE = [0.25, 1, 0.5, 1] as const;
// Slower, more stately ease for the watermark
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

interface CtaBannerProps {
  id?: string;
  eyebrow?: string;
  headingLine: string;
  headingAccent: string;
  body: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  watermark?: string;
}

export default function CtaBanner({
  id,
  eyebrow = "Get in touch",
  headingLine,
  headingAccent,
  body,
  primaryLabel = "Get In Touch",
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref,
  watermark = "Care.",
}: CtaBannerProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id={id}
      className="relative bg-sage-900 overflow-hidden"
      style={{ paddingBlock: "clamp(5.5rem, 11vw, 9rem)" }}
      aria-label="Call to action"
    >
      {/* Gold hairline — grows outward from centre on entry */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(to right, transparent, #D4A96A 25%, #D4A96A 75%, transparent)",
          transformOrigin: "center",
        }}
        initial={shouldReduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE_EXPO }}
      />

      {/* Typographic watermark — drifts slowly into position on entry */}
      <motion.span
        aria-hidden="true"
        className="absolute bottom-0 right-0 font-display italic font-light leading-none select-none pointer-events-none"
        style={{
          fontSize: "clamp(11rem, 26vw, 24rem)",
          color: "#1F5040",
          letterSpacing: "-0.04em",
        }}
        initial={shouldReduce ? false : { opacity: 0, y: "25%", x: "8%" }}
        whileInView={{ opacity: 1, y: "18%", x: "4%" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.6, ease: EASE_EXPO }}
      />

      <div className="container-site relative">
        <div className="max-w-2xl space-y-8">

          {/* Eyebrow */}
          <motion.p
            className="eyebrow"
            style={{ color: "#6BBF9E" }}
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {eyebrow}
          </motion.p>

          {/* Heading — white base, accent blooms to gold after heading arrives */}
          <motion.h2
            className="font-display text-white leading-[1.06]"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            {headingLine}{" "}
            {/* Colour bloom: arrives as white, transitions to gold */}
            <motion.em
              style={{ fontStyle: "italic" }}
              initial={shouldReduce ? false : { color: "#FFFFFF" }}
              whileInView={{ color: "#DFB87A" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: 0.62, ease: EASE }}
            >
              {headingAccent}
            </motion.em>
          </motion.h2>

          {/* Gold rule — draws left to right */}
          <motion.span
            className="gold-rule block"
            aria-hidden="true"
            style={{ transformOrigin: "left" }}
            initial={shouldReduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          />

          {/* Body */}
          <motion.p
            className="font-body text-sage-200 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)", maxWidth: "44ch" }}
            initial={shouldReduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
          >
            {body}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-6 pt-1"
            initial={shouldReduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.32, ease: EASE }}
          >
            {/* Primary button — shimmer sweep on entry, once only */}
            <Link
              href={primaryHref}
              className="btn-primary bg-gold-500 hover:bg-gold-600 relative overflow-hidden"
            >
              {/* Shimmer ray — diagonal sweep, fired once when button enters view */}
              {!shouldReduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 w-12 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.38) 50%, transparent 80%)",
                    skewX: "-12deg",
                  }}
                  initial={{ left: "-60px" }}
                  whileInView={{ left: "calc(100% + 60px)" }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.72, ease: EASE }}
                />
              )}
              {primaryLabel}
            </Link>

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-300 hover:text-white transition-colors duration-250"
              >
                {secondaryLabel}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
