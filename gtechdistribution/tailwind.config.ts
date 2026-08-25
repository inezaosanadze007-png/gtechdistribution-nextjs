import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Palette sampled from the hero board photograph: indigo substrate,
      // cyan trace glow, the violet bleed in its corner, white solder spark.
      colors: {
        bg: "#060D1E",         // board substrate — page ground
        band: "#0A1730",       // full-width section band
        surface: "#0D1B36",    // raised card
        ink: "#E8F1FF",        // primary text
        inkSoft: "#93ADCE",    // secondary text
        line: "#1B3157",       // hairlines and borders
        field: "#456BA4",      // form control borders — meets 3:1 as a UI boundary
        accent: "#29E0F5",     // trace cyan — the signal color
        accentSoft: "#0B2C46", // chip and tag ground
        violet: "#8B5CF6",     // corner bleed, used only in the hero scrim
        alert: "#FF9B6A",      // the one warm note: failure states only
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Arial Narrow", "sans-serif"],
        body: ["var(--font-inter)", "-apple-system", "sans-serif"],
        mono: ["var(--font-plex-mono)", "Courier New", "monospace"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.6s ease both",
      },
    },
  },
  plugins: [],
};

export default config;
