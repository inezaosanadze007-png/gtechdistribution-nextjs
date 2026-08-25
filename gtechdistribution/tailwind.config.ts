import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      // Sampled from the hero chip photograph: navy board, electric blue
      // trace, and the warm amber glow off the lit die.
      colors: {
        // Light context — the page's default ground.
        bg: "#F4F7FC",          // cool near-white
        surface: "#FFFFFF",     // raised card
        band: "#E6EDF9",        // pale tint, table headers
        ink: "#0A1526",         // primary text
        inkSoft: "#46587A",     // secondary text
        line: "#D2DDEE",        // decorative hairlines
        field: "#7387A6",       // form borders — meets 3:1 as a UI boundary
        accent: "#1D4ED8",      // electric blue — the signal color on light
        accentSoft: "#E3EAFD",  // chip and tag ground
        alert: "#B3341A",       // failure states only

        // Dark context — hero, quality band, closing CTA, footer.
        deep: "#0A1428",        // navy board
        deepAlt: "#0F1D38",     // raised panel inside a dark band
        deepInk: "#E9F0FC",     // primary text on dark
        deepInkSoft: "#A5B8D6", // secondary text on dark
        deepLine: "#26385C",    // divider on dark
        trace: "#4C9BFF",       // the image's electric blue, dark grounds only
        ember: "#F0B549",       // the die's amber glow — accents on dark only
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
