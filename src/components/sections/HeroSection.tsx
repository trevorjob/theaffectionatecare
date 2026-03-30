"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";

// ─── Animation config ─────────────────────────────────────────────────────────
// Each word of the headline is revealed by sliding up from behind a clip mask.
// This is the high-end editorial reveal pattern — words emerge, not just fade.
// Falls back to instant display if prefers-reduced-motion is set.

const HEADLINE_WORDS = [
  { text: "Care", italic: false },
  { text: "that", italic: false },
  { text: "feels", italic: false },
  { text: "like", italic: false },
  { text: "family.", italic: true, accent: true }, // sage-600 italic
];

const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const;

// ─── Parallax image wrapper ───────────────────────────────────────────────────
// Subtle vertical parallax on the hero image — image moves up slightly as the
// user scrolls down. Uses transform only (no layout animation).

function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, -50]);
  const shouldReduce = useReducedMotion();

  return (
    <div
      ref={ref}
      className="relative w-full h-full overflow-hidden rounded-3xl"
      aria-hidden="true"
    >
      <motion.img
        src={src}
        alt={alt}
        style={shouldReduce ? undefined : { y }}
        className="w-full h-full object-cover scale-[1.12]"
        initial={{ opacity: 0, scale: 1.18 }}
        animate={{ opacity: 1, scale: 1.12 }}
        transition={{ duration: 1.1, ease: EASE_OUT_QUART, delay: 0.15 }}
      />
      {/* Subtle sage vignette on left edge — blends image into text side */}
      <div
        className="absolute inset-y-0 left-0 w-24 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #FAFAF8, transparent)",
        }}
      />
    </div>
  );
}

// ─── Word reveal ─────────────────────────────────────────────────────────────
// Each word sits inside `overflow: hidden` so the slide-up emerges from behind
// an invisible clip — not a fade, an unveiling.

function RevealWord({
  text,
  italic,
  accent,
  delay,
  shouldReduce,
}: {
  text: string;
  italic?: boolean;
  accent?: boolean;
  delay: number;
  shouldReduce: boolean;
}) {
  return (
    <span
      className="inline-block overflow-hidden leading-none"
      style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
    >
      <motion.span
        className={[
          "inline-block leading-[1.1]",
          italic ? "italic" : "",
          accent ? "text-sage-600" : "text-ink-900",
        ].join(" ")}
        initial={shouldReduce ? false : { y: "105%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{
          duration: 0.7,
          delay,
          ease: EASE_OUT_QUART,
        }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export default function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-background flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Faint sage radial wash — top-left origin, very subtle */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at -10% 20%, rgba(240,250,245,0.9) 0%, transparent 65%)",
        }}
      />

      <div className="container-site w-full pt-28 pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.85fr] gap-10 lg:gap-16 xl:gap-20 items-center">

          {/* ── Left: text ───────────────────────────────────────────── */}
          <div className="space-y-8 lg:space-y-10">

            {/* Eyebrow */}
            <motion.p
              className="eyebrow"
              initial={shouldReduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
            >
              Dartford &amp; Rochester, Kent
            </motion.p>

            {/* Headline — word-by-word reveal */}
            <h1
              className="font-display flex flex-wrap gap-x-[0.3em] gap-y-1"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)", lineHeight: 1.08 }}
            >
              {HEADLINE_WORDS.map((word, i) => (
                <RevealWord
                  key={word.text}
                  text={word.text}
                  italic={word.italic}
                  accent={word.accent}
                  delay={0.1 + i * 0.1}
                  shouldReduce={shouldReduce ?? false}
                />
              ))}
            </h1>

            {/* Gold rule + subtext */}
            <motion.div
              className="space-y-5"
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE_OUT_QUART }}
            >
              <span className="gold-rule block" aria-hidden="true" />
              <p
                className="font-body text-ink-500 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.125rem)", maxWidth: "38ch" }}
              >
                Staffing, training &amp; development, supported living, and domiciliary
                care — delivered with compassion, consistency, and genuine human warmth.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-3 pt-1"
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.78, ease: EASE_OUT_QUART }}
            >
              <Link href="/#services" className="btn-primary">
                Our Services
              </Link>
              <Link href="/contact" className="btn-secondary group">
                Contact Us
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            {/* Trust signal — inline, unobtrusive */}
            <motion.div
              className="flex items-center gap-6 pt-2"
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE_OUT_QUART }}
              aria-label="Key statistics"
            >
              {[
                { value: "15+", label: "years" },
                { value: "24+", label: "team members" },
                { value: "10+", label: "happy homes" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  {i > 0 && (
                    <span className="w-px h-4 bg-sand-200 self-center" aria-hidden="true" />
                  )}
                  <span className="font-display text-xl font-medium text-ink-900 leading-none ml-1.5">
                    {stat.value}
                  </span>
                  <span className="font-body text-xs text-ink-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: image ─────────────────────────────────────────── */}
          <div
            className="relative h-[360px] sm:h-[440px] lg:h-[580px] xl:h-[640px]"
            aria-hidden="true"
          >
            <ParallaxImage
              src="https://images.unsplash.com/photo-1493815793585-d94ccbc86df8"
              alt="A grandmother and grandchild sitting closely together in warm natural light"
            />

            {/* Floating credential chip — bottom-left of image */}
            <motion.div
              className="absolute -bottom-4 -left-4 lg:-left-8 bg-white rounded-2xl px-5 py-3.5 shadow-card-md border border-sand-100 flex items-center gap-3"
              initial={shouldReduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT_QUART }}
              aria-label="CQC Registered"
            >
              <div className="w-8 h-8 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                <svg
                  className="w-4 h-4 text-sage-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-ink-900 leading-tight">
                  CQC Registered
                </p>
                <p className="font-body text-2xs text-ink-400 leading-tight mt-0.5">
                  Quality Care Commission
                </p>
              </div>
            </motion.div>

            {/* Floating gold accent — top-right of image */}
            <motion.div
              className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-gold-50 border border-gold-200 flex items-center justify-center"
              initial={shouldReduce ? false : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.1, ease: EASE_OUT_QUART }}
              aria-hidden="true"
            >
              <span className="font-display text-gold-500 text-lg font-normal italic leading-none">
                15+
              </span>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Scroll cue — fades out on scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        initial={shouldReduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        {/* <span className="font-body text-2xs uppercase tracking-widest text-ink-400">
          Scroll
        </span> */}
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-ink-300 to-transparent"
          animate={shouldReduce ? undefined : { scaleY: [1, 0.3, 1], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
