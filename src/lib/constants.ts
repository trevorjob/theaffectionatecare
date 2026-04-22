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
    id: "support",
    title: "Support",
    description:
      "Providing experienced, DBS-checked care professionals to families and facilities, matched carefully to the people and needs that matter most.",
    icon: "👥",
  },
  {
    id: "training",
    title: "Training & Development",
    description:
      "Equipping carers with the qualifications, practical skills, and confidence to deliver exceptional, person-centred care.",
    icon: "📋",
  },
  {
    id: "supported-living",
    title: "Supported Living",
    description:
      "Enabling individuals with learning disabilities, autism, and complex needs to live independently in a home that truly feels like theirs.",
    icon: "🏡",
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
  "Young Adults (16 - 19)",
  "Children (13 - 15)",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    quote:
      "From the very first call, we felt heard. The team took genuine time to understand my mother's needs and matched us with a support staff who felt like family.",
    name: "Sarah T.",
    role: "Family Client, Dartford",
  },
  {
    id: "2",
    quote:
      "Professional, warm, and incredibly thorough. Our facility has worked with The Affectionate Care Support Ltd. for two years. The standard never drops.",
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
  email: "team@tacs.health",
  phone: "+44 (0)1322 643289",
};
