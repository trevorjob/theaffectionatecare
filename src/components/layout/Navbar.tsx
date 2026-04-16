"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { NAV_LINKS } from "@/lib/constants";

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    // Fire once on mount so SSR → client state is in sync
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50",
        // Transition only the properties that actually change — not transition-all
        "transition-[background-color,box-shadow,border-color] duration-350",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-card border-b border-sand-100"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <nav
        className="container-site flex items-center justify-between h-16 md:h-18"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="shrink-0 flex items-center gap-2 group"
          aria-label="The Affectionate Care Support Ltd. — Home"
        >
          <Image
            src="/images/logo.jpg"
            alt="The Affectionate Care Support Ltd."
            height={40}
            width={200}
            className="h-10 w-auto"
            priority
          />
         <div className="leading-[1] font-body text-lg text-ink-900">
  <span className="font-bold">
    The Affectionate Care<br />
    <span className="font-bold text-sage-500">
      Support Ltd.
    </span>
  </span>
</div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={[
                    "font-body text-sm font-medium transition-colors duration-250",
                    "relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-sage-500",
                    "after:transition-[width] after:duration-250",
                    isActive
                      ? "text-sage-700 after:w-full"
                      : "text-ink-600 hover:text-ink-900 after:w-0 hover:after:w-full",
                  ].join(" ")}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link href="/contact" className="btn-secondary text-sm py-2 px-5">
            Get In Touch
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden p-2.5 -mr-1 rounded-lg text-ink-600 hover:text-ink-900 hover:bg-sand-100 active:bg-sand-200 transition-colors duration-250"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {/* Animated hamburger → ✕ */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={
                menuOpen
                  ? { d: "M6 18L18 6", opacity: 1 }
                  : { d: "M3 6h18", opacity: 1 }
              }
              transition={shouldReduce ? { duration: 0 } : { duration: 0.2, ease: EASE }}
            />
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12h18"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={shouldReduce ? { duration: 0 } : { duration: 0.15, ease: EASE }}
            />
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              animate={
                menuOpen
                  ? { d: "M6 6L18 18", opacity: 1 }
                  : { d: "M3 18h18", opacity: 1 }
              }
              transition={shouldReduce ? { duration: 0 } : { duration: 0.2, ease: EASE }}
            />
          </svg>
        </button>
      </nav>

      {/* Mobile menu — AnimatePresence unmounts cleanly so no hidden focusable links */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Navigation menu"
            initial={shouldReduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduce ? {} : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="md:hidden bg-white/95 backdrop-blur-md border-b border-sand-100"
          >
            <ul className="container-site flex flex-col gap-0.5 py-4" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={[
                        // py-3 ensures 44px touch target (12+20+12)
                        "flex items-center py-3 px-3 rounded-xl font-body text-sm font-medium transition-colors duration-250",
                        isActive
                          ? "text-sage-700 bg-sage-50"
                          : "text-ink-600 hover:text-ink-900 hover:bg-sand-50 active:bg-sand-100",
                      ].join(" ")}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}

              <li className="pt-3 pb-1">
                <Link
                  href="/contact"
                  className="btn-primary text-sm w-full justify-center"
                >
                  Get In Touch
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
