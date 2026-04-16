"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { CONTACT_INFO } from "@/lib/constants";
import ContactForm from "@/components/sections/ContactForm";
import TimesheetDownload from "@/components/sections/TimesheetDownload";

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
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

// ─── Contact info column ──────────────────────────────────────────────────────

function ContactInfoColumn() {
  return (
    <section aria-labelledby="contact-info-heading">
      <h2 id="contact-info-heading" className="font-display text-2xl text-ink-900 mb-8">
        Contact information
      </h2>

      <div className="space-y-0 divide-y divide-sand-100">
        <div className="py-6 first:pt-0 flex gap-4">
          <span className="w-px h-8 shrink-0 mt-1 bg-gold-400" aria-hidden="true" />
          <div>
            <p className="font-body text-2xs font-semibold tracking-wider uppercase text-gold-600 mb-1">
              {CONTACT_INFO.address.label}
            </p>
            <address className="not-italic font-body text-sm text-ink-500 leading-relaxed">
              {CONTACT_INFO.address.lines.join(", ")}
            </address>
          </div>
        </div>

        <div className="py-6 flex gap-4">
          <span className="w-px h-8 shrink-0 mt-1 bg-gold-400" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-body text-2xs font-semibold tracking-wider uppercase text-gold-600">
              Email
            </p>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="font-body text-sm text-ink-500 hover:text-sage-600 transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 rounded"
            >
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className="py-6 flex gap-4">
          <span className="w-px h-8 shrink-0 mt-1 bg-gold-400" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-body text-2xs font-semibold tracking-wider uppercase text-gold-600">
              Phone
            </p>
            <a
              href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
              className="font-body text-sm text-ink-500 hover:text-sage-600 transition-colors duration-250 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400 rounded"
            >
              {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Downloads ────────────────────────────────────────────────────────────────

function DownloadsSection() {
  return (
    <section
      id="downloads"
      className="bg-sage-50"
      style={{ paddingBlock: "clamp(4rem, 7vw, 6rem)" }}
      aria-labelledby="downloads-heading"
    >
      <div className="container-site">
        <Reveal className="mb-10">
          <div className="space-y-2">
            <span className="eyebrow">Downloads</span>
            <h2
              id="downloads-heading"
              className="font-display text-2xl lg:text-3xl text-ink-900 leading-tight"
            >
              Resources
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3 max-w-2xl">
          {/* Join Our Team — primary, horizontal */}
          <Reveal delay={0.08}>
            <div className="bg-white rounded-2xl border border-sand-100 shadow-card px-7 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
              <div className="space-y-1">
                <p className="font-body text-base font-semibold text-ink-900 leading-snug">
                  Join Our Team
                </p>
                <p className="font-body text-sm text-ink-500 leading-relaxed">
                  Interested in a care career? Download our application pack.
                </p>
              </div>
              <a
                href="/downloads/application-form.pdf"
                download="TACS-Application-Form.pdf"
                className="btn-primary text-sm shrink-0"
                aria-label="Download Join Our Team application pack"
              >
                Download
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Staff Timesheet — secondary, compact row */}
          <Reveal delay={0.14}>
            <div className="flex items-center justify-between gap-5 px-7 py-4 rounded-2xl border border-sand-100 bg-white/60">
              <div className="flex items-center gap-3 min-w-0">
                <p className="font-body text-sm text-ink-600 font-medium leading-snug">
                  Staff Timesheet
                </p>
                <span className="shrink-0 font-body text-2xs px-2 py-0.5 rounded-full bg-gold-100 text-gold-700 font-semibold uppercase tracking-wider">
                  Staff only
                </span>
              </div>
              <TimesheetDownload className="btn-ghost-gold text-sm py-2 px-4 shrink-0">
                Download
              </TimesheetDownload>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── Full contact page content ────────────────────────────────────────────────

export default function ContactContent() {
  const shouldReduce = useReducedMotion();

  return (
    <main>
      {/* Page hero — consistent radial wash, no gradient */}
      <section
        className="relative bg-white overflow-hidden pt-32 pb-20"
        aria-label="Contact page introduction"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 5% 10%, rgba(240,250,245,0.85) 0%, transparent 65%)",
          }}
        />
        <div className="container-site max-w-text space-y-4">
          <motion.span
            className="eyebrow"
            initial={shouldReduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            Get in touch
          </motion.span>
          <motion.h1
            className="font-display leading-tight"
            style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}
            initial={shouldReduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
          >
            We&apos;re here to help.
          </motion.h1>
          <motion.p
            className="font-body text-ink-500 leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)" }}
            initial={shouldReduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
          >
            Reach out and we&apos;ll get back to you shortly. No pressure, no jargon —
            just a helpful conversation.
          </motion.p>
        </div>
      </section>

      {/* Form + contact info */}
      <section
        id="contact-form"
        className="bg-white"
        style={{ paddingBlock: "clamp(4rem, 7vw, 6rem)" }}
        aria-labelledby="form-heading"
      >
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: form */}
          <Reveal>
            <div>
              <h2
                id="form-heading"
                className="font-display text-2xl text-ink-900 mb-8"
              >
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>

          {/* Right: contact info */}
          <Reveal delay={0.12}>
            <ContactInfoColumn />
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section
        id="map"
        className="bg-sand-50"
        style={{ paddingBlock: "clamp(3.5rem, 6vw, 5rem)" }}
        aria-labelledby="map-heading"
      >
        <div className="container-site">
          <Reveal>
            <h2
              id="map-heading"
              className="font-display text-2xl text-ink-900 mb-8"
            >
              Find us
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="rounded-2xl overflow-hidden shadow-card-md border border-sand-100 aspect-video max-h-96">
              <iframe
                title="The Affectionate Care Support Ltd. office location in Dartford, Kent"
                src="https://www.google.com/maps?q=19+Leybourne+Road,+Rochester,+ME2+3QF,+UK&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              >
                <p>
                  <a
                    href="https://maps.google.com/?q=Admirals+Park+Dartford+DA2+6QD"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Admirals Park, Dartford on Google Maps
                  </a>
                </p>
              </iframe>
            </div>
          </Reveal>
        </div>
      </section>

      <DownloadsSection />
    </main>
  );
}
