"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, Download, FileText, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO, SERVICES } from "@/lib/constants";
import Image from "next/image";
import TimesheetDownload from "@/components/sections/TimesheetDownload";

// ─── Animated Container (adapted from 21st.dev) ───────────────────────────────
// Uses motion/react's `whileInView` with a blur+slide reveal.
// Fully respects prefers-reduced-motion.

type AnimatedContainerProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>["className"];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0, children }: AnimatedContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ filter: "blur(6px)", translateY: 12, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        delay,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1.0], // --ease-natural
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-sage-900 text-white"
      role="contentinfo"
    >
      {/* Subtle internal top separator — only visible when footer follows a non-CTA dark section */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-sage-800"
      />

      <div className="container-site py-16 lg:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">

          {/* ── Brand col ── */}
          <AnimatedContainer delay={0} className="space-y-5 lg:col-span-4">
            {/* Logotype */}
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="The Affectionate Care Support Ltd."
                height={40}
                width={160}
                className="h-10 w-auto"
              />

                       <div className="font-body text-lg leading-[1] text-ink-900">
  <span className="font-bold text-white">
    The Affectionate Care<br />
    <span className="font-bold text-gold-400">
      Support Ltd.
    </span>
  </span>
</div>
            </div>

            {/* Tagline */}
            <p className="max-w-xs font-body text-sm leading-relaxed text-sage-200">
              Compassionate, person-centred care services across Dartford &amp; Rochester, Kent.
              Supporting individuals and families when it matters most.
            </p>

            {/* CTA link */}
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 font-body text-sm font-medium text-gold-300 transition-colors duration-250 hover:text-gold-200"
            >
              Get in touch
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-250 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </AnimatedContainer>

          {/* ── Nav + Services + Contact cols ── */}
          <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:col-span-8">

            {/* Navigation */}
            <AnimatedContainer delay={0.1}>
              <h3 className="mb-5 font-body text-2xs font-semibold uppercase tracking-widest text-gold-400">
                Navigation
              </h3>
              <ul className="space-y-3" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-sage-200 transition-colors duration-250 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            {/* Services */}
            <AnimatedContainer delay={0.2}>
              <h3 className="mb-5 font-body text-2xs font-semibold uppercase tracking-widest text-gold-400">
                Services
              </h3>
              <ul className="space-y-3" role="list">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/#services`}
                      className="font-body text-sm text-sage-200 transition-colors duration-250 hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            {/* Contact */}
            <AnimatedContainer delay={0.3} className="col-span-2 md:col-span-1">
              <h3 className="mb-5 font-body text-2xs font-semibold uppercase tracking-widest text-gold-400">
                Contact
              </h3>
              <ul className="space-y-3.5" role="list">
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="group inline-flex items-start gap-2.5 font-body text-sm text-sage-200 transition-colors duration-250 hover:text-white"
                  >
                    <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500 transition-colors duration-250 group-hover:text-sage-300" aria-hidden="true" />
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="group inline-flex items-start gap-2.5 font-body text-sm text-sage-200 transition-colors duration-250 hover:text-white"
                  >
                    <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500 transition-colors duration-250 group-hover:text-sage-300" aria-hidden="true" />
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <address className="inline-flex items-start gap-2.5 font-body text-sm not-italic text-sage-300">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage-500" aria-hidden="true" />
                    <span className="leading-relaxed">
                      {CONTACT_INFO.address.lines.join(", ")}
                    </span>
                  </address>
                </li>
              </ul>
            </AnimatedContainer>
          </div>
        </div>

        {/* ── Downloads + copyright row ── */}
        <AnimatedContainer
          delay={0.35}
          className="mt-14 flex flex-col items-start justify-between gap-6 border-t border-sage-800 pt-8 sm:flex-row sm:items-center"
        >
          {/* Download cards */}
          <div className="flex flex-wrap gap-3">
            {/* Join Our Team — public, gold accent */}
            <a
              href="/downloads/application-form.pdf"
              download="TACS-Application-Form.pdf"
              className="group inline-flex items-center gap-2.5 rounded-full border border-gold-700/60 bg-gold-900/30 px-4 py-2.5 font-body text-sm font-medium text-gold-300 transition-all duration-250 hover:border-gold-400 hover:bg-gold-900/50 hover:text-gold-200"
            >
              <Download className="h-3.5 w-3.5 transition-transform duration-250 group-hover:-translate-y-0.5" aria-hidden="true" />
              Join Our Team
            </a>

            {/* Staff Timesheet — muted, staff-only */}
            <TimesheetDownload className="inline-flex items-center gap-2.5 rounded-full border border-sage-800 px-4 py-2.5 font-body text-sm font-medium text-sage-400 transition-all duration-250 hover:border-sage-700 hover:text-sage-300">
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              Staff Timesheet
              <span className="rounded-full bg-sage-800 px-1.5 py-0.5 text-2xs font-semibold uppercase tracking-wider text-sage-500">
                Staff
              </span>
            </TimesheetDownload>
          </div>

          {/* Copyright */}
          <p className="shrink-0 font-body text-xs text-sage-500">
            © {new Date().getFullYear()} The Affectionate Care Support Ltd.
            <span className="hidden sm:inline"> All rights reserved.</span>
          </p>
        </AnimatedContainer>
      </div>
    </footer>
  );
}
