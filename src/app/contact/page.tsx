import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactContent from "@/components/sections/ContactContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Reach out to The Affectionate Care Company. We're here to help — whether you need care, staffing, or want to join our team.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <ContactContent />
      <Footer />
    </>
  );
}
