"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

// Reliable Unsplash images for each service — care/human/warmth themes
const SERVICE_IMAGES = [
  "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=900&q=80", // Staffing — caring hands
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80", // Training — learning environment
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80", // Supported Living — warm home
  "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=900&q=80", // Domiciliary — at-home care
];

const SERVICE_NUMBERS = ["01", "02", "03", "04"];

// ─── Accordion panel ──────────────────────────────────────────────────────────

interface AccordionPanelProps {
  title: string;
  imageSrc: string;
  isActive: boolean;
  onActivate: () => void;
}

function AccordionPanel({ title, imageSrc, isActive, onActivate }: AccordionPanelProps) {
  return (
    <button
      type="button"
      className="relative h-full w-full overflow-hidden rounded-2xl cursor-pointer border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
      style={{
        flex: isActive ? "5 1 0%" : "0.42 0 56px",
        transition: "flex 700ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        minWidth: isActive ? undefined : "56px",
      }}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      aria-label={title}
      aria-pressed={isActive}
    >
      {/* Image — slight de-zoom on active for a gentle reveal */}
      <img
        src={imageSrc}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: isActive ? "scale(1)" : "scale(1.06)",
          transition: "transform 900ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        }}
      />

      {/* Sage-tinted overlay — brand colour rather than generic black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: isActive
            ? "linear-gradient(to top, rgba(8,80,65,0.72) 0%, rgba(8,80,65,0.28) 50%, rgba(8,80,65,0.15) 100%)"
            : "rgba(8,80,65,0.68)",
          transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        }}
      />

      {/* Gold hairline top accent — only on active */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(to right, transparent, #D4A96A, transparent)",
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Active state: title at bottom-left */}
      <div
        className="absolute bottom-0 inset-x-0 p-5 transition-opacity duration-350"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden={!isActive}
      >
        <p className="font-display text-lg font-medium text-white text-left leading-snug">
          {title}
        </p>
      </div>

      {/* Inactive state: vertical title */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-350"
        style={{ opacity: isActive ? 0 : 1 }}
      >
        <p
          className="font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70 whitespace-nowrap select-none"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          {title}
        </p>
      </div>
    </button>
  );
}

// ─── Services Section ─────────────────────────────────────────────────────────

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);

  const active = SERVICES[activeIndex] ?? SERVICES[0];

  return (
    <section
      id="services"
      className="section bg-white overflow-hidden"
      aria-labelledby="services-heading"
    >
      <div className="container-site">

        {/* Section header — left-aligned, asymmetric */}
        <div className="mb-12 lg:mb-16">
          <span className="eyebrow">What we offer</span>
          <h2 id="services-heading" className="mt-3 max-w-xs leading-tight">
            Services built around people
          </h2>
        </div>

        {/* ── Desktop: split layout ─────────────────────────────────── */}
        <div className="hidden lg:flex items-stretch gap-10 xl:gap-14 h-[460px] xl:h-[520px]">

          {/* Left: editorial description — morphs with activeIndex */}
          <div className="flex-none w-64 xl:w-72 flex flex-col justify-center">
            {/* key triggers CSS animate-fade-in on each service change */}
            <div key={activeIndex} className="animate-fade-in space-y-5">

              {/* Large light number — gold tint, purely typographic */}
              <p
                className="font-body font-light text-gold-200 select-none leading-none"
                style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
                aria-hidden="true"
              >
                {SERVICE_NUMBERS[activeIndex]}
              </p>

              {/* Service title */}
              <h3 className="font-display text-2xl xl:text-3xl text-ink-900 leading-tight">
                {active.title}
              </h3>

              {/* Gold rule */}
              <span className="gold-rule block" aria-hidden="true" />

              {/* Description */}
              <p className="font-body text-sm text-ink-500 leading-relaxed">
                {active.description}
              </p>

              {/* CTA */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors duration-250 group"
              >
                Enquire about this service
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          {/* Right: image accordion — buttons must be direct flex children */}
          <div
            className="flex flex-1 gap-3"
            aria-label="Services"
          >
            {SERVICES.map((service, index) => (
              <AccordionPanel
                key={service.id}
                title={service.title}
                imageSrc={SERVICE_IMAGES[index]}
                isActive={index === activeIndex}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* ── Mobile: keyboard-accessible disclosure list ────────────── */}
        {/* Uses grid-template-rows transition — no layout-property animation */}
        <div className="lg:hidden space-y-2" role="list">
          {SERVICES.map((service, index) => {
            const isOpen = mobileOpenIndex === index;
            return (
              <div
                key={service.id}
                role="listitem"
                className="border border-sand-100 rounded-2xl overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setMobileOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span
                      className="font-body text-sm font-light text-gold-400 tabular-nums shrink-0"
                      aria-hidden="true"
                    >
                      {SERVICE_NUMBERS[index]}
                    </span>
                    <span className="font-display text-base text-ink-900 leading-snug">
                      {service.title}
                    </span>
                  </div>

                  {/* +/× toggle */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors duration-250"
                    style={{
                      borderColor: isOpen ? "#6BBF9E" : "#D5D0C8",
                      color: isOpen ? "#3A8068" : "#6B6762",
                    }}
                  >
                    <svg
                      className="w-2.5 h-2.5 transition-transform duration-350"
                      style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      viewBox="0 0 10 10"
                    >
                      <path d="M5 1v8M1 5h8" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                {/* Expandable panel — grid-template-rows for height transition */}
                <div
                  id={`service-panel-${service.id}`}
                  role="region"
                  aria-labelledby={`service-btn-${service.id}`}
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 450ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 space-y-4 pt-1">
                      {/* Thumbnail */}
                      <div className="h-36 rounded-xl overflow-hidden">
                        <img
                          src={SERVICE_IMAGES[index]}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Description */}
                      <p className="font-body text-sm text-ink-500 leading-relaxed">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors duration-250 group"
                      >
                        Enquire
                        <ArrowRight
                          className="w-3 h-3 transition-transform duration-250 group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
