"use client";

import type { ComponentProps, ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Mail, Phone, MapPin, Download, FileText, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, CONTACT_INFO, SERVICES } from "@/lib/constants";

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
      className="relative bg-sage-900 text-white overflow-hidden"
      role="contentinfo"
    >
      {/* Subtle internal top separator — only visible when footer follows a non-CTA dark section */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px bg-sage-800"
      />

      <div className="container-site py-16 lg:py-20">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Brand col ── */}
          <AnimatedContainer delay={0} className="lg:col-span-4 space-y-5">
            {/* Logotype */}
            <div>
              <p className="font-display text-xl font-semibold text-white leading-tight">
                The Affectionate Care
              </p>
              <p className="font-display text-xl font-normal text-gold-400 leading-tight">
                Company
              </p>
            </div>

            {/* Tagline */}
            <p className="font-body text-sm text-sage-200 leading-relaxed max-w-xs">
              Compassionate, person-centred care services across Dartford &amp; Rochester, Kent.
              Supporting individuals and families when it matters most.
            </p>

            {/* CTA link */}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-gold-300 hover:text-gold-200 transition-colors duration-250 group"
            >
              Get in touch
              <ArrowUpRight
                className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </AnimatedContainer>

          {/* ── Nav + Services + Contact cols ── */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">

            {/* Navigation */}
            <AnimatedContainer delay={0.1}>
              <h3 className="font-body text-2xs font-semibold uppercase tracking-widest text-gold-400 mb-5">
                Navigation
              </h3>
              <ul className="space-y-3" role="list">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm text-sage-200 hover:text-white transition-colors duration-250"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            {/* Services */}
            <AnimatedContainer delay={0.2}>
              <h3 className="font-body text-2xs font-semibold uppercase tracking-widest text-gold-400 mb-5">
                Services
              </h3>
              <ul className="space-y-3" role="list">
                {SERVICES.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/#services`}
                      className="font-body text-sm text-sage-200 hover:text-white transition-colors duration-250"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </AnimatedContainer>

            {/* Contact */}
            <AnimatedContainer delay={0.3} className="col-span-2 md:col-span-1">
              <h3 className="font-body text-2xs font-semibold uppercase tracking-widest text-gold-400 mb-5">
                Contact
              </h3>
              <ul className="space-y-3.5" role="list">
                <li>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-start gap-2.5 font-body text-sm text-sage-200 hover:text-white transition-colors duration-250 group"
                  >
                    <Mail className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sage-500 group-hover:text-sage-300 transition-colors duration-250" aria-hidden="true" />
                    {CONTACT_INFO.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-start gap-2.5 font-body text-sm text-sage-200 hover:text-white transition-colors duration-250 group"
                  >
                    <Phone className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sage-500 group-hover:text-sage-300 transition-colors duration-250" aria-hidden="true" />
                    {CONTACT_INFO.phone}
                  </a>
                </li>
                <li>
                  <address className="not-italic inline-flex items-start gap-2.5 font-body text-sm text-sage-300">
                    <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-sage-500" aria-hidden="true" />
                    <span className="leading-relaxed">
                      {CONTACT_INFO.officialAddress.lines.join(", ")}
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
          className="mt-14 pt-8 border-t border-sage-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          {/* Download cards */}
          <div className="flex flex-wrap gap-3">
            {/* Join Our Team — public, gold accent */}
            <a
              href="#"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-gold-700/60 bg-gold-900/30 text-gold-300 hover:border-gold-400 hover:text-gold-200 hover:bg-gold-900/50 text-sm font-body font-medium transition-all duration-250 group"
            >
              <Download className="w-3.5 h-3.5 transition-transform duration-250 group-hover:-translate-y-0.5" aria-hidden="true" />
              Join Our Team
            </a>

            {/* Staff Timesheet — muted, staff-only */}
            <a
              href="#"
              aria-label="Staff Timesheet — staff access only"
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-sage-800 text-sage-400 hover:border-sage-700 hover:text-sage-300 text-sm font-body font-medium transition-all duration-250"
            >
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              Staff Timesheet
              <span className="text-2xs px-1.5 py-0.5 rounded-full bg-sage-800 text-sage-500 font-semibold uppercase tracking-wider">
                Staff
              </span>
            </a>
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-sage-500 shrink-0">
            © {new Date().getFullYear()} The Affectionate Care Company Ltd.
            <span className="hidden sm:inline"> All rights reserved.</span>
          </p>
        </AnimatedContainer>
      </div>
    </footer>
  );
}
