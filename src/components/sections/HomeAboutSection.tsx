"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;
const EASE_OUT  = [0.25, 1, 0.5, 1] as const;

// The heading split into individually-revealable words.
// Each word stores whether it should render in sage italic.
const WORDS: { text: string; accent?: boolean }[] = [
  { text: "Fifteen" },
  { text: "years" },
  { text: "of" },
  { text: "care" },
  { text: "that" },
  { text: "means" },
  { text: "it.", accent: true },
];

// ─── Word mask ────────────────────────────────────────────────────────────────
// Same clip-reveal pattern as HeroSection, tuned heavier/slower for this context.

function RevealWord({
  text,
  accent,
  delay,
  inView,
  shouldReduce,
}: {
  text: string;
  accent?: boolean;
  delay: number;
  inView: boolean;
  shouldReduce: boolean;
}) {
  return (
    <span
      className="inline-block overflow-hidden leading-none"
      style={{ paddingBottom: "0.1em", marginBottom: "-0.1em" }}
    >
      <motion.span
        className={[
          "inline-block leading-[1.1]",
          accent ? "italic text-sage-600" : "text-ink-900",
        ].join(" ")}
        initial={{ y: "110%", opacity: 0 }}
        animate={inView && !shouldReduce ? { y: "0%", opacity: 1 } : {}}
        transition={{ duration: 0.75, delay, ease: EASE_EXPO }}
      >
        {text}
      </motion.span>
    </span>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
// Follows cursor within a bounding radius; springs back when the cursor leaves.
// Radius = 80px from button edge. Max displacement = 10px.

function MagneticLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const shouldReduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.6 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || shouldReduce) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Clamp displacement — feels like a magnet with a limit
    const MAX = 10;
    rawX.set(Math.max(-MAX, Math.min(MAX, dx * 0.28)));
    rawY.set(Math.max(-MAX, Math.min(MAX, dy * 0.28)));
  }, [rawX, rawY, shouldReduce]);

  const handleMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  if (shouldReduce) {
    return (
      <Link
        href={href}
        className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-sage-700 hover:text-sage-900 transition-colors duration-250"
      >
        {children}
      </Link>
    );
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group inline-flex items-center gap-2 font-body text-sm font-semibold text-sage-700 hover:text-sage-900 transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage-400 rounded"
    >
      {children}
    </motion.a>
  );
}

// ─── Clip-path image reveal ───────────────────────────────────────────────────
// Image starts as a small collapsed pill at centre, expands to full frame.

function ClipRevealImage({
  src,
  alt,
  inView,
  shouldReduce,
}: {
  src: string;
  alt: string;
  inView: boolean;
  shouldReduce: boolean;
}) {
  return (
    <motion.div
      className="w-full h-full rounded-3xl overflow-hidden"
      // Collapsed pill → full rounded frame
      initial={{ clipPath: "inset(44% 38% 44% 38% round 9999px)" }}
      animate={
        inView && !shouldReduce
          ? { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }
          : inView && shouldReduce
          ? { clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }
          : {}
      }
      transition={{ duration: 1.05, delay: 0.12, ease: EASE_EXPO }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        // Subtle de-zoom that completes as clip expands
      />
    </motion.div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function HomeAboutSection() {
  const shouldReduce = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="about-short"
      ref={sectionRef}
      className="bg-sand-50 overflow-hidden"
      style={{ paddingBlock: "clamp(5rem, 9vw, 8rem)" }}
      aria-labelledby="about-short-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20 items-center">

          {/* ── Left: text ────────────────────────────────────────── */}
          <div className="space-y-8 order-2 lg:order-1">

            {/* Eyebrow */}
            <motion.p
              className="eyebrow"
              initial={shouldReduce ? false : { opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, ease: EASE_OUT }}
            >
              About us
            </motion.p>

            {/* Heading — word-by-word clip reveal */}
            <h2
              id="about-short-heading"
              className="font-display flex flex-wrap gap-x-[0.28em] gap-y-1"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08 }}
            >
              {WORDS.map((word, i) => (
                <RevealWord
                  key={word.text}
                  text={word.text}
                  accent={word.accent}
                  delay={0.08 + i * 0.085}
                  inView={inView}
                  shouldReduce={shouldReduce}
                />
              ))}
            </h2>

            {/* Gold rule */}
            <motion.span
              className="gold-rule block"
              aria-hidden="true"
              style={{ transformOrigin: "left" }}
              initial={shouldReduce ? false : { scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.62, ease: EASE_OUT }}
            />

            {/* Body */}
            <motion.p
              className="font-body text-sm text-ink-500 leading-relaxed"
              style={{ maxWidth: "42ch" }}
              initial={shouldReduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.52, ease: EASE_OUT }}
            >
              Founded in Kent, we set out with one conviction: that care is only care
              when it&apos;s genuinely human. Fifteen years, 24 team members, and 10+
              supported homes later. That conviction hasn&apos;t changed.
            </motion.p>

            {/* Magnetic CTA */}
            <motion.div
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7, ease: EASE_OUT }}
              // Padding creates the magnetic capture zone without visual impact
              className="inline-block p-3 -m-3"
            >
              <MagneticLink href="/about">
                Our story
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </MagneticLink>
            </motion.div>

            {/* Inline credentials — quiet, earned */}
            <motion.div
              className="flex items-center gap-6 pt-2 border-t border-sand-200"
              initial={shouldReduce ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.82, ease: EASE_OUT }}
            >
              {[
                { value: "15+", label: "years" },
                { value: "24+", label: "team members" },
                { value: "10+", label: "homes" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex items-baseline gap-1.5">
                  {i > 0 && (
                    <span className="w-px h-3.5 bg-sand-300 self-center" aria-hidden="true" />
                  )}
                  <span className="font-display text-xl font-medium text-ink-900 leading-none ml-1.5">
                    {stat.value}
                  </span>
                  <span className="font-body text-2xs text-ink-400">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: image with clip-path reveal ───────────────── */}
          <div
            className="order-1 lg:order-2"
            style={{ aspectRatio: "4 / 5" }}
          >
            <ClipRevealImage
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=900&q=85"
              alt="A carer sitting beside an elderly person at home, sharing a warm conversation"
              inView={inView}
              shouldReduce={shouldReduce}
            />
          </div>

        </div>
      </div>
    </section>
  );
}
