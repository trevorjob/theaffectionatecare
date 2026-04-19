"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Phone, Mail } from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import { CONTACT_INFO } from "@/lib/constants";

const EASE      = [0.25, 1, 0.5, 1]  as const;
const EASE_EXPO = [0.16, 1, 0.3, 1]  as const;

export default function HomeCtaSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative bg-sage-900 overflow-hidden"
      style={{ paddingBlock: "clamp(5rem, 10vw, 8.5rem)" }}
      aria-labelledby="cta-heading"
    >
      {/* Gold hairline — grows outward from centre */}
      <motion.div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent, #D4A96A 25%, #D4A96A 75%, transparent)",
          transformOrigin: "center",
        }}
        initial={shouldReduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.9, ease: EASE_EXPO }}
      />

      {/* Typographic watermark */}
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
      >
        Talk.
      </motion.span>

      <div className="container-site relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16 xl:gap-20 items-start">

          {/* ── Left: editorial heading ────────────────────────────── */}
          <div className="space-y-8 lg:pt-2">

            <motion.p
              className="eyebrow"
              style={{ color: "#6BBF9E" }}
              initial={shouldReduce ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Get in touch
            </motion.p>

            <motion.h2
              id="cta-heading"
              className="font-display text-white leading-[1.06]"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              Let&apos;s talk about{" "}
              <motion.em
                style={{ fontStyle: "italic" }}
                initial={shouldReduce ? false : { color: "#FFFFFF" }}
                whileInView={{ color: "#DFB87A" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: 0.62, ease: EASE }}
              >
                your care needs.
              </motion.em>
            </motion.h2>

            <motion.span
              className="gold-rule block"
              aria-hidden="true"
              style={{ transformOrigin: "left" }}
              initial={shouldReduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            />

            <motion.p
              className="font-body text-sage-200 leading-relaxed"
              style={{ fontSize: "clamp(1rem, 1.4vw, 1.05rem)", maxWidth: "38ch" }}
              initial={shouldReduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
            >
              Whether you need care for a loved one, staffing for your facility,
              or want to join our team, fill in the form or reach us directly.
            </motion.p>

            {/* Direct contact — two items, quiet */}
            <motion.div
              className="space-y-3 pt-1"
              initial={shouldReduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.36, ease: EASE }}
            >
              <a
                href={`tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-3 font-body text-sm text-sage-300 hover:text-white transition-colors duration-250 group w-fit"
              >
                <Phone className="w-3.5 h-3.5 text-sage-500 group-hover:text-sage-300 transition-colors duration-250 shrink-0" aria-hidden="true" />
                {CONTACT_INFO.phone}
              </a>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-3 font-body text-sm text-sage-300 hover:text-white transition-colors duration-250 group w-fit"
              >
                <Mail className="w-3.5 h-3.5 text-sage-500 group-hover:text-sage-300 transition-colors duration-250 shrink-0" aria-hidden="true" />
                {CONTACT_INFO.email}
              </a>
            </motion.div>

            {/* Prefer a full conversation? */}
            <motion.p
              className="font-body text-2xs text-sage-600 leading-relaxed"
              initial={shouldReduce ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.44, ease: EASE }}
            >
              Prefer a longer conversation?{" "}
              <Link
                href="/contact"
                className="text-sage-400 hover:text-sage-200 underline underline-offset-2 transition-colors duration-250"
              >
                Visit our contact page
              </Link>
            </motion.p>
          </div>

          {/* ── Right: floating white form card ───────────────────── */}
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          >
            <div className="bg-white rounded-3xl shadow-card-xl p-8 lg:p-10">
              <h3 className="font-display text-xl text-ink-900 mb-6 leading-snug">
                Send us a message
              </h3>
              <ContactForm
                idPrefix="home-"
                messageRows={4}
                submitLabel="Send Message"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
