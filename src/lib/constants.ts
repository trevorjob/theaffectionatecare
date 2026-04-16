import type { NavLink, ServiceCard, Testimonial, StatItem } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const STATS: StatItem[] = [
  { value: 10,  suffix: "+", label: "Happy Homes" },
  { value: 24,  suffix: "+", label: "Inspired Team Members" },
  { value: 15,  suffix: "+", label: "Years Experience" },
];

export const SERVICES: ServiceCard[] = [
  {
    id: "staffing",
    title: "Staffing",
    description:
      "Placing experienced, vetted care professionals with families and facilities — quickly and reliably.",
    icon: "👥",
  },
  {
    id: "training",
    title: "Training & Development",
    description:
      "Equipping carers with the skills, certifications, and confidence to deliver exceptional care.",
    icon: "📋",
  },
  {
    id: "supported-living",
    title: "Supported Living",
    description:
      "Enabling individuals to live independently in a safe, supportive environment tailored to their needs.",
    icon: "🏡",
  },
  {
    id: "domiciliary",
    title: "Domiciliary Care",
    description:
      "Compassionate in-home care that preserves dignity, independence, and quality of life.",
    icon: "💚",
  },
];

export const WHO_WE_HELP = [
  "Autism & Asperger's",
  "Learning Disabilities",
  "Elderly Care",
  "Alcohol Dependency",
  "Mental Health",
  "Physical Disabilities",
  "Respite Care",
  "Palliative Care",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "From the very first call, we felt heard. The team took genuine time to understand my mother's needs and matched us with a carer who felt like family.",
    name: "Sarah T.",
    role: "Family Client, Dartford",
  },
  {
    id: "2",
    quote:
      "Professional, warm, and incredibly thorough. Our facility has worked with The Affectionate Care Support Ltd. for two years — the standard never drops.",
    name: "James R.",
    role: "Care Facility Manager, Rochester",
  },
  {
    id: "3",
    quote:
      "The supported living arrangement gave my brother the independence he deserved while keeping us reassured. We couldn't be more grateful.",
    name: "Priya M.",
    role: "Family Client, Kent",
  },
];

export const CONTACT_INFO = {
  address: {
    label: "Address",
    lines: ["19 Leybourne Road", "Rochester", "United Kingdom", "ME2 3QF"],
  },
  email: "hello@tacs.health",
  phone: "+44 (0)1322 643289",
};
