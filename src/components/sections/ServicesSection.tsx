"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/lib/constants";

// Unsplash images for each service — care/human/warmth themes
const SERVICE_IMAGES = [
  "/images/smiling-nurse-hospital-hallway.jpg", // Staffing — caring hands
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80", // Training — learning environment
  "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=900&q=80", // Supported Living — warm home
];

const SERVICE_NUMBERS = ["01", "02", "03"];

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
      className="relative h-full w-full cursor-pointer overflow-hidden rounded-2xl border-0 p-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage-400"
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
        className="absolute inset-0 h-full w-full object-cover"
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
        className="absolute inset-x-0 top-0 h-px transition-opacity duration-500"
        style={{
          background: "linear-gradient(to right, transparent, #D4A96A, transparent)",
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Active state: title at bottom-left */}
      <div
        className="absolute inset-x-0 bottom-0 p-5 transition-opacity duration-350"
        style={{ opacity: isActive ? 1 : 0 }}
        aria-hidden={!isActive}
      >
        <p className="text-left font-display text-lg font-medium leading-snug text-white">
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
          className="select-none whitespace-nowrap font-body text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70"
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
      className="section overflow-hidden bg-white"
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
        <div className="hidden h-[460px] items-stretch gap-10 lg:flex xl:h-[520px] xl:gap-14">

          {/* Left: editorial description — morphs with activeIndex */}
          <div className="flex w-64 flex-none flex-col justify-center xl:w-72">
            {/* key triggers CSS animate-fade-in on each service change */}
            <div key={activeIndex} className="animate-fade-in space-y-5">

              {/* Large light number — gold tint, purely typographic */}
              <p
                className="select-none font-body font-light leading-none text-gold-200"
                style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
                aria-hidden="true"
              >
                {SERVICE_NUMBERS[activeIndex]}
              </p>

              {/* Service title */}
              <h3 className="font-display text-2xl leading-tight text-ink-900 xl:text-3xl">
                {active.title}
              </h3>

              {/* Gold rule */}
              <span className="gold-rule block" aria-hidden="true" />

              {/* Description */}
              <p className="font-body text-sm leading-relaxed text-ink-500">
                {active.description}
              </p>

              {/* CTA */}
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-600 transition-colors duration-250 hover:text-sage-700"
              >
                Enquire about this service
                <ArrowRight
                  className="h-3.5 w-3.5 transition-transform duration-250 group-hover:translate-x-0.5"
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
        <div className="space-y-2 lg:hidden" role="list">
          {SERVICES.map((service, index) => {
            const isOpen = mobileOpenIndex === index;
            return (
              <div
                key={service.id}
                role="listitem"
                className="overflow-hidden rounded-2xl border border-sand-100"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setMobileOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`service-panel-${service.id}`}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span
                      className="shrink-0 font-body text-sm font-light tabular-nums text-gold-400"
                      aria-hidden="true"
                    >
                      {SERVICE_NUMBERS[index]}
                    </span>
                    <span className="font-display text-base leading-snug text-ink-900">
                      {service.title}
                    </span>
                  </div>

                  {/* +/× toggle */}
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors duration-250"
                    style={{
                      borderColor: isOpen ? "#6BBF9E" : "#D5D0C8",
                      color: isOpen ? "#3A8068" : "#6B6762",
                    }}
                  >
                    <svg
                      className="h-2.5 w-2.5 transition-transform duration-350"
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
                    <div className="space-y-4 px-5 pb-5 pt-1">
                      {/* Thumbnail */}
                      <div className="h-36 overflow-hidden rounded-xl">
                        <img
                          src={SERVICE_IMAGES[index]}
                          alt={service.title}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Description */}
                      <p className="font-body text-sm leading-relaxed text-ink-500">
                        {service.description}
                      </p>

                      {/* CTA */}
                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-1.5 font-body text-sm font-medium text-sage-600 transition-colors duration-250 hover:text-sage-700"
                      >
                        Enquire
                        <ArrowRight
                          className="h-3 w-3 transition-transform duration-250 group-hover:translate-x-0.5"
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
