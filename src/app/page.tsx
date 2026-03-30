import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HomeAboutSection from "@/components/sections/HomeAboutSection";
import WhoWeHelpSection from "@/components/sections/WhoWeHelpSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import HomeCtaSection from "@/components/sections/HomeCtaSection";

export const metadata: Metadata = {
  title: "The Affectionate Care Company — Care Services in Kent",
  description:
    "Professional staffing, supported living, domiciliary care, and training across Dartford & Rochester, Kent. Supporting people with autism, learning disabilities, elderly care, and more.",
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />

        {/* Stats bar */}
        {/* <section
          id="stats"
          className="bg-sage-100 border-y border-sage-200"
          aria-label="Company statistics"
        >
          <div className="container-site py-14 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-sage-200">
            {[
              { value: "10+", label: "Happy Homes" },
              { value: "24+", label: "Inspired Team Members" },
              { value: "15+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="py-4 sm:py-0">
                <p className="font-display text-5xl font-light text-sage-700">{stat.value}</p>
                <p className="font-body text-sm text-ink-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section> */}

        <ServicesSection />

        <HomeAboutSection />

        <WhoWeHelpSection />

        <TestimonialsSection />

        <HomeCtaSection />
      </main>
      <Footer />
    </>
  );
}
