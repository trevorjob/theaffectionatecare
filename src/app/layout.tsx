import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "The Affectionate Care Support Ltd.",
    template: "%s | The Affectionate Care Support Ltd.",
  },
  description:
    "Professional care services in Dartford & Rochester, Kent. Staffing, training & development, supported living, and domiciliary care — supporting people with autism, learning disabilities, elderly care, and more.",
  keywords: [
    "care company",
    "domiciliary care",
    "supported living",
    "care staffing",
    "Kent",
    "Dartford",
    "Rochester",
    "autism support",
    "learning disabilities",
    "elderly care",
  ],
  authors: [{ name: "The Affectionate Care Support Ltd." }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "The Affectionate Care Support Ltd.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
