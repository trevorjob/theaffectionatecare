import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Brand Colours ───────────────────────────────────────────────
      colors: {
        sage: {
          50:  "#F0FAF5",
          100: "#E1F5EE",
          200: "#B8E9D8",
          300: "#86D6BB",
          400: "#6BBF9E",
          500: "#4A9B7F",
          600: "#3A8068",
          700: "#2D6E56",
          800: "#1F5040",
          900: "#085041",
        },
        gold: {
          50:  "#FDF7EE",
          100: "#FAEEDA",
          200: "#F5D9B0",
          300: "#EDBE7E",
          400: "#DFB87A",
          500: "#D4A96A",
          600: "#B88A42",
          700: "#A06C2E",
          800: "#7D4F1C",
          900: "#633806",
        },
        sand: {
          50:  "#F9F7F4",
          100: "#F5F3EF",
          200: "#EAE7E1",
          300: "#D5D0C8",
          400: "#B8B1A5",
          500: "#9A9187",
        },
        ink: {
          400: "#6B6762",
          500: "#504D49",
          600: "#3D3B38",
          700: "#2C2A27",
          900: "#1A1916",
        },
      },

      // ─── Typography ───────────────────────────────────────────────────
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-nunito)", "system-ui", "sans-serif"],
        sans:    ["var(--font-nunito)", "system-ui", "sans-serif"],
      },

      fontSize: {
        "2xs": ["0.625rem",  { lineHeight: "1rem" }],
        xs:    ["0.75rem",   { lineHeight: "1.125rem" }],
        sm:    ["0.875rem",  { lineHeight: "1.375rem" }],
        base:  ["1rem",      { lineHeight: "1.625rem" }],
        lg:    ["1.125rem",  { lineHeight: "1.75rem" }],
        xl:    ["1.25rem",   { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem",    { lineHeight: "2rem" }],
        "3xl": ["1.875rem",  { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem",   { lineHeight: "2.75rem" }],
        "5xl": ["3rem",      { lineHeight: "3.5rem" }],
        "6xl": ["3.75rem",   { lineHeight: "4.25rem" }],
        "7xl": ["4.5rem",    { lineHeight: "5rem" }],
        "8xl": ["6rem",      { lineHeight: "6.5rem" }],
      },

      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.02em",
        tight:    "-0.01em",
        normal:   "0em",
        wide:     "0.02em",
        wider:    "0.06em",
        widest:   "0.12em",
      },

      // ─── Spacing ──────────────────────────────────────────────────────
      spacing: {
        "18":  "4.5rem",
        "22":  "5.5rem",
        "26":  "6.5rem",
        "30":  "7.5rem",
        "34":  "8.5rem",
      },

      // ─── Max Widths ───────────────────────────────────────────────────
      maxWidth: {
        "8xl":  "88rem",
        "site": "75rem",
        "text": "44rem",
      },

      // ─── Border Radius ────────────────────────────────────────────────
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },

      // ─── Box Shadows ──────────────────────────────────────────────────
      boxShadow: {
        "card":      "0 1px 3px 0 rgb(26 25 22 / 0.06), 0 1px 2px -1px rgb(26 25 22 / 0.04)",
        "card-md":   "0 4px 12px -2px rgb(26 25 22 / 0.08), 0 2px 6px -2px rgb(26 25 22 / 0.04)",
        "card-lg":   "0 12px 32px -4px rgb(26 25 22 / 0.10), 0 4px 12px -4px rgb(26 25 22 / 0.04)",
        "card-xl":   "0 24px 48px -8px rgb(26 25 22 / 0.12), 0 8px 20px -6px rgb(26 25 22 / 0.06)",
        "glow-sage": "0 0 32px 0 rgb(74 155 127 / 0.15)",
        "glow-gold": "0 0 32px 0 rgb(212 169 106 / 0.15)",
      },

      // ─── Transitions ─────────────────────────────────────────────────
      transitionTimingFunction: {
        "natural":    "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        "out-smooth": "cubic-bezier(0.0, 0.0, 0.2, 1.0)",
        "in-smooth":  "cubic-bezier(0.4, 0.0, 1.0, 1.0)",
      },

      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "450": "450ms",
        "600": "600ms",
        "800": "800ms",
      },

      // ─── Animations ───────────────────────────────────────────────────
      keyframes: {
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-scale": {
          "0%":   { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },

      animation: {
        "fade-in-up":    "fade-in-up 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0) both",
        "fade-in":       "fade-in 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.0) both",
        "fade-in-scale": "fade-in-scale 0.6s cubic-bezier(0.25, 0.1, 0.25, 1.0) both",
      },
    },
  },
  plugins: [],
};

export default config;
