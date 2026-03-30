// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageSrc?: string;
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}
