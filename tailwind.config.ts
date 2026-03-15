import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#F8F3EE",
        plum: "#2D1854",
        gold: "#C97B3A",
        violet: "#4A1F7A",
        midnight: "#1A0A2E",
        champagne: "#F0D5A0",
        "soft-ivory": "#F0EBE3",
        "muted-warm": "#6B5A4A",
        subtle: "#9B8A7A",
        sand: "#F0EBE3",
        sale: "#8B3A1A",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "4px",
        md: "8px",
        lg: "12px",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(26,10,46,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;

