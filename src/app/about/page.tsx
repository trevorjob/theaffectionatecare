import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/sections/AboutContent";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Affectionate Care Company — 15+ years of compassionate care in Dartford and Rochester, Kent.",
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
