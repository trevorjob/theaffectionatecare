"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { WHO_WE_HELP } from "@/lib/constants";
import CtaBanner from "@/components/sections/CtaBanner";

const EASE = [0.25, 1, 0.5, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={shouldReduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Page intro ───────────────────────────────────────────────────────────────

function AboutIntro() {
  const shouldReduce = useReducedMotion();
  return (
    <section
      className="relative bg-white overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28"
      aria-label="About us introduction"
    >
      {/* Faint sage wash — mirrors hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 5% 10%, rgba(240,250,245,0.85) 0%, transparent 65%)",
        }}
      />

      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-10 lg:gap-20 items-end">
          {/* Left: heading + sub */}
          <div className="space-y-7">
            <motion.p
              className="eyebrow"
              initial={shouldReduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Our story
            </motion.p>

            <motion.h1
              className="font-display leading-[1.06]"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)" }}
              initial={shouldReduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Over a Decade of Care{" "}
              <em className="text-sage-600 not-italic">that&nbsp;means&nbsp;it.</em>
            </motion.h1>

            <motion.div
              className="space-y-4"
              initial={shouldReduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease: EASE }}
            >
              <span className="gold-rule block" aria-hidden="true" />
              <p
                className="font-body text-ink-500 leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)", maxWidth: "44ch" }}
              >
                We offer support, companionship, palliative care, respite, staff training,
                and supported living. We put the person first in everything we do.
              </p>
            </motion.div>
          </div>

          {/* Right: stat column — restrained, typographic */}
          <motion.div
            className="flex flex-row lg:flex-col gap-10 lg:gap-8 lg:pb-2"
            initial={shouldReduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          >
            {[
              { value: "10+", label: "years serving Kent families" },
              { value: "24+", label: "dedicated team members" },
              { value: "10+", label: "supported homes" },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <p
                  className="font-display font-light text-sage-700 leading-none"
                  style={{ fontSize: "clamp(2.4rem, 4vw, 3.6rem)" }}
                >
                  {s.value}
                </p>
                <p className="font-body text-xs text-ink-400 uppercase tracking-widest">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Story ────────────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section
      className="bg-sand-50 overflow-hidden"
      style={{ paddingBlock: "clamp(4rem, 8vw, 7rem)" }}
      aria-labelledby="story-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-center">

          {/* Left: text */}
          <div className="space-y-8 order-2 lg:order-1">
            <Reveal>
              <p className="eyebrow">Where we come from</p>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="story-heading"
                className="font-display leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
              >
                Born in Kent,<br />rooted in every community around the uk.
              </h2>
            </Reveal>

            <Reveal delay={0.16} className="space-y-4">
              <p className="font-body text-sm text-ink-500 leading-relaxed">
                We started because we kept hearing the same thing: people weren&apos;t
                being looked after properly. That wasn&apos;t good enough for us. We knew
                care could be better, warmer, and more personal. So we built something
                we could be proud of.
              </p>
              <p className="font-body text-sm text-ink-500 leading-relaxed">
                Our main office is in Rochester, with a branch in Dartford. We&apos;re also
                expanding into Scotland later this year. Our team includes support
                workers, nurses, and in-house trainers who keep our standards high.
                Everything we do comes back to one thing: caring for people the right way.
              </p>
            </Reveal>

            {/* Pull quote — editorial accent */}
            <Reveal delay={0.22}>
              <blockquote className="border-l-2 border-gold-400 pl-5 my-6">
                <p className="font-display text-lg italic text-ink-700 leading-snug">
                  &ldquo;Supporting lives with affectionate care and respect.&rdquo;
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.28}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors duration-250 group"
              >
                Get in touch with our team
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </Reveal>
          </div>

          {/* Right: image */}
          <Reveal delay={0.1} className="order-1 lg:order-2">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4 / 5" }}
            >
              <img
                src="/images/person_b.jpeg"
                alt="A carer sitting with an elderly person, sharing a warm moment at home"
                className="w-full h-full object-cover"
              />
              {/* Gold accent chip — bottom-right */}
              {/* <div className="absolute bottom-5 right-5 bg-white/95 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-card border border-sand-100">
                <p className="font-body text-xs font-semibold text-ink-900 leading-tight">
                  Dartford &amp; Rochester
                </p>
                <p className="font-body text-2xs text-ink-400 mt-0.5">
                  Serving Kent since 2009
                </p>
              </div> */}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ─── Mission / Values ─────────────────────────────────────────────────────────

const PILLARS = [
  {
    number: "01",
    title: "Compassion without compromise",
    body: "Warmth is not a trade-off for professionalism. It is our definition of it. Every support we place is chosen as much for their character as their qualifications.",
  },
  {
    number: "02",
    title: "Consistency you can rely on",
    body: "Families deserve to know what to expect. We build long-term relationships with the people in our care, not a rotating rota of strangers.",
  },
  {
    number: "03",
    title: "Independence where possible",
    body: "Our supported living service is designed to maximise autonomy, enabling people to live the life they want, with the right support around them.",
  },
];

function MissionSection() {
  return (
    <section
      className="bg-white"
      style={{ paddingBlock: "clamp(4.5rem, 9vw, 8rem)" }}
      aria-labelledby="mission-heading"
    >
      <div className="container-site">

        {/* Header row — asymmetric */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 lg:mb-18">
          <Reveal>
            <div className="space-y-3">
              <p className="eyebrow">How we work</p>
              <h2
                id="mission-heading"
                className="font-display leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
              >
                The principles behind<br />everything we do.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-body text-sm text-ink-400 max-w-xs leading-relaxed md:text-right">
              Not a mission statement. These are the commitments our team lives by every day.
            </p>
          </Reveal>
        </div>

        {/* Pillars — horizontal rule list, no cards */}
        <div className="space-y-0 divide-y divide-sand-100">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 0.1}>
              <div className="grid grid-cols-1 md:grid-cols-[5rem_1fr_1.6fr] gap-x-10 gap-y-2 py-8 lg:py-10 items-start">
                {/* Number */}
                <p
                  className="font-body font-light text-gold-300 tabular-nums leading-none self-center"
                  style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)" }}
                  aria-hidden="true"
                >
                  {pillar.number}
                </p>

                {/* Title */}
                <h3 className="font-display text-xl lg:text-2xl text-ink-900 leading-snug self-center">
                  {pillar.title}
                </h3>

                {/* Body */}
                <p className="font-body text-sm text-ink-500 leading-relaxed self-center">
                  {pillar.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── Who we help ─────────────────────────────────────────────────────────────

function WhoWeHelpSection() {
  return (
    <section
      className="bg-sage-50"
      style={{ paddingBlock: "clamp(4rem, 7vw, 6rem)" }}
      aria-labelledby="who-about-heading"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-20 items-center">

          <Reveal>
            <div className="space-y-4">
              <p className="eyebrow">Who we help</p>
              <h2
                id="who-about-heading"
                className="font-display leading-tight"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
              >
                Supporting people<br />who matter.
              </h2>
              <p className="font-body text-sm text-ink-500 leading-relaxed max-w-xs">
                Our care spans a wide range of needs. Whatever the situation, the
                approach is always the same: patient, skilled, and genuinely caring.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-2.5">
              {WHO_WE_HELP.map((group) => (
                <span key={group} className="pill">
                  {group}
                </span>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

// ─── Team ─────────────────────────────────────────────────────────────────────

const TEAM = [
  { initials: "TC", name: "Theresa Clarke", role: "Founder & Director", bg: "bg-sage-100", text: "text-sage-700" },
  { initials: "MO", name: "Marcus Osei", role: "Head of Support", bg: "bg-gold-100", text: "text-gold-700" },
  { initials: "PA", name: "Priya Anand", role: "Training Lead", bg: "bg-sage-50", text: "text-sage-600" },
  { initials: "JB", name: "James Barnett", role: "Supported Living Manager", bg: "bg-sand-100", text: "text-ink-600" },
];

function TeamSection() {
  return (
    <section
      className="bg-white"
      style={{ paddingBlock: "clamp(4.5rem, 8vw, 7rem)" }}
      aria-labelledby="team-heading"
    >
      <div className="container-site">

        <div className="mb-12 lg:mb-14">
          <Reveal>
            <p className="eyebrow">The people behind the care</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="team-heading"
              className="mt-3 font-display leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.2vw, 2.8rem)" }}
            >
              A small team. An exceptional standard.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
          {TEAM.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="group space-y-4">
                {/* Avatar */}
                <div
                  className={[
                    "w-full rounded-2xl flex items-center justify-center",
                    "transition-transform duration-350 group-hover:-translate-y-1",
                    member.bg,
                  ].join(" ")}
                  style={{ aspectRatio: "1 / 1" }}
                  aria-hidden="true"
                >
                  <span
                    className={[
                      "font-display text-3xl lg:text-4xl font-medium",
                      member.text,
                    ].join(" ")}
                  >
                    {member.initials}
                  </span>
                </div>

                {/* Name & role */}
                <div>
                  <p className="font-body text-sm font-semibold text-ink-900 leading-snug">
                    {member.name}
                  </p>
                  <p className="font-body text-xs text-ink-400 mt-0.5">
                    {member.role}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3} className="mt-12">
          <p className="font-body text-sm text-ink-400 italic">
            Photography and full team bios coming soon.
          </p>
        </Reveal>

      </div>
    </section>
  );
}

// ─── CQC / Credentials ────────────────────────────────────────────────────────

function CredentialsSection() {
  return (
    <section
      className="bg-sand-50 border-y border-sand-100"
      style={{ paddingBlock: "clamp(3.5rem, 6vw, 5.5rem)" }}
      aria-label="Our credentials"
    >
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 items-center">

          <Reveal>
            <div className="space-y-3">
              <p className="eyebrow">Regulated &amp; accountable</p>
              <h2
                className="font-display leading-tight"
                style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)" }}
              >
                CQC & Ofsted Registered. Fully compliant.
              </h2>
              <p className="font-body text-sm text-ink-500 leading-relaxed max-w-prose">
                The Affectionate Care Support Ltd. is registered with the Care Quality Commission.
                Our practices are regularly inspected and held to the highest national standards.
                You can trust that the care you receive meets every regulatory requirement.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-4">
              {[
                { label: "CQC & Ofsted Registered", sub: "Care Quality Commission" },
                { label: "DBS Checked", sub: "All staff vetted" },
                { label: "Fully Insured", sub: "Public liability covered" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-3 bg-white border border-sand-100 rounded-2xl px-5 py-3.5 shadow-card"
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
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-ink-900 leading-tight">
                      {badge.label}
                    </p>
                    <p className="font-body text-2xs text-ink-400 mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}


// ─── Export ───────────────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      <AboutIntro />
      <StorySection />
      <MissionSection />
      <WhoWeHelpSection />
      {/* <TeamSection /> */}
      <CredentialsSection />
      <CtaBanner
        headingLine="Ready to talk"
        headingAccent="about care?"
        body="Whether you need care for a loved one, support for your facility, or want to join our team, we'd love to hear from you."
        secondaryLabel="Our Services"
        secondaryHref="/#services"
        watermark="Talk."
      />
    </>
  );
}
