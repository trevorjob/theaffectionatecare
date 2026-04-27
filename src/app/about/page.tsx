import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutContent from "@/components/sections/AboutContent";
import PageAura from "@/components/effects/PageAura";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about The Affectionate Care Support Ltd., with 10+ years of compassionate care",
};

export default function AboutPage() {
  return (
    <>
      <PageAura variant="about" />
      <Navbar />
      <main>
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}
