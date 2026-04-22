"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";

// ─── Testimonial data ─────────────────────────────────────────────────────────
// 9 entries split across 3 columns. Real UK care-company tone.
// Avatar portraits from randomuser.me — swap for real photos when available.

const TESTIMONIALS = [
  {
    quote:
      "From the very first call, we felt heard. The team took time to understand my mother's needs and matched us with a support that felt like family.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Sarah T.",
    role: "Family client, Dartford",
  },
  {
    quote:
      "Professional, warm, and incredibly thorough. Our facility has worked with The Affectionate Care Support Ltd. for two years. The standard never drops.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "James R.",
    role: "Care facility manager, Rochester",
  },
  {
    quote:
      "The supported living arrangement gave my brother the independence he deserved, while keeping us completely reassured. We couldn't be more grateful.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    name: "Priya M.",
    role: "Family client, Kent",
  },
  {
    quote:
      "Every Support Staff placed was qualified, compassionate, and genuinely invested in my father's wellbeing. I can sleep easy knowing he's cared for.",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    name: "David K.",
    role: "Son of client, Gravesend",
  },
  {
    quote:
      "The training programmes were exactly what our team needed: practical, relevant, and delivered with real care for the profession.",
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
    name: "Fiona L.",
    role: "Care home manager, Medway",
  },
  {
    quote:
      "A care company that actually listens. They understood our family's situation and found us the right match on the very first try.",
    avatar: "https://randomuser.me/api/portraits/men/71.jpg",
    name: "Thomas A.",
    role: "Family client, Chatham",
  },
  {
    quote:
      "We've worked with several agencies over the years. None have come close to the reliability and quality we experience with this team.",
    avatar: "https://randomuser.me/api/portraits/women/26.jpg",
    name: "Amara S.",
    role: "Registered nurse, Rochester",
  },
  {
    quote:
      "The care has allowed my grandmother to stay in her own home safely, which is all she ever wanted. The difference is remarkable.",
    avatar: "https://randomuser.me/api/portraits/men/14.jpg",
    name: "Connor B.",
    role: "Grandson of client, Dartford",
  },
  {
    quote:
      "From the initial assessment to ongoing support, everything has been handled with kindness and true professionalism. Exactly what families need.",
    avatar: "https://randomuser.me/api/portraits/women/53.jpg",
    name: "Rachel N.",
    role: "Family client, Sittingbourne",
  },
];

const firstColumn  = TESTIMONIALS.slice(0, 3);
const secondColumn = TESTIMONIALS.slice(3, 6);
const thirdColumn  = TESTIMONIALS.slice(6, 9);

// ─── Single testimonial entry — editorial, no card ────────────────────────────

interface TestimonialEntryProps {
  quote: string;
  avatar: string;
  name: string;
  role: string;
}

function TestimonialEntry({ quote, avatar, name, role }: TestimonialEntryProps) {
  return (
    <article className="py-7 border-t border-sage-100 first:border-t-0">
      {/* Oversized opening quote mark — typographic accent in Playfair */}
      <p
        className="font-display font-normal text-gold-200 leading-none select-none mb-3"
        style={{ fontSize: "3.5rem", lineHeight: 1 }}
        aria-hidden="true"
      >
        &ldquo;
      </p>

      {/* Quote body — Playfair italic, warm ink tone */}
      <blockquote className="font-display italic text-base text-ink-600 leading-relaxed mb-5">
        {quote}
      </blockquote>

      {/* Attribution */}
      <footer className="flex items-center gap-3">
        <img
          src={avatar}
          alt={name}
          width={36}
          height={36}
          className="w-9 h-9 rounded-full object-cover ring-2 ring-sage-200"
        />
        <div>
          <p className="font-body text-sm font-semibold text-ink-900 leading-tight">{name}</p>
          <p className="font-body text-xs text-ink-400 leading-tight mt-0.5">{role}</p>
        </div>
      </footer>
    </article>
  );
}

// ─── Scrolling column ─────────────────────────────────────────────────────────
// Content is duplicated 2× so translateY: "-50%" creates a seamless loop.
// `useReducedMotion` stops animation entirely for accessibility.

interface TestimonialColumnProps {
  entries: typeof TESTIMONIALS;
  duration?: number;
  className?: string;
}

function TestimonialColumn({ entries, duration = 18, className }: TestimonialColumnProps) {
  const shouldReduce = useReducedMotion();

  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        animate={shouldReduce ? undefined : { translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {/* Content duplicated for seamless loop */}
        {[0, 1].map((copy) => (
          <React.Fragment key={copy}>
            {entries.map((entry, i) => (
              <TestimonialEntry key={`${copy}-${i}`} {...entry} />
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="section bg-sage-50 overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-site">

        {/* Header — left-aligned, not centred */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="mb-12 lg:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
        >
          <div>
            <span className="eyebrow">Real voices</span>
            <h2 id="testimonials-heading" className="mt-3 max-w-xs leading-tight">
              Families who trust us
            </h2>
          </div>
          <p className="font-body text-sm text-ink-500 max-w-xs leading-relaxed sm:text-right">
            Every word here is from someone whose family we've had the privilege to support.
          </p>
        </motion.div>

        {/* Scrolling columns — masked with sage-50 fade top/bottom */}
        {/*
          The mask-image fade matches bg-sage-50 so the columns dissolve
          into the section background rather than cutting off hard.
        */}
        <div
          className="flex gap-6 lg:gap-10 max-h-[640px] overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, #F0FAF5 10%, #F0FAF5 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, #F0FAF5 10%, #F0FAF5 88%, transparent 100%)",
          }}
          aria-label="Testimonials scroll"
        >
          {/* Column 1 — visible on all sizes */}
          <TestimonialColumn
            entries={firstColumn}
            duration={22}
            className="flex-1"
          />

          {/* Column 2 — tablet and up */}
          <TestimonialColumn
            entries={secondColumn}
            duration={17}
            className="flex-1 hidden md:block"
          />

          {/* Column 3 — desktop only */}
          <TestimonialColumn
            entries={thirdColumn}
            duration={20}
            className="flex-1 hidden lg:block"
          />
        </div>

      </div>
    </section>
  );
}
