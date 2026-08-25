import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light context — everything below the hero.
        bg: "#F5F8FC",          // cool near-white page ground
        surface: "#FFFFFF",     // raised card
        band: "#EAF1F8",        // full-width section band, table headers
        ink: "#0B1626",         // primary text
        inkSoft: "#4A5F7A",     // secondary text
        line: "#D5DFEB",        // decorative hairlines and dividers
        field: "#7488A2",       // form control borders — meets 3:1 as a UI boundary
        accent: "#08697F",      // deep trace teal — the signal color on light
        accentSoft: "#DFF3F8",  // chip and tag ground
        alert: "#B23C17",       // the one warm note: failure states only

        // Dark context — the hero only, where the board photograph sits.
        // The bright cyan lives here; on white it falls to 1.5:1 and is unusable.
        heroBg: "#060D1E",      // board substrate
        heroInk: "#E8F1FF",     // primary text on the photograph
        heroInkSoft: "#A8C0DC", // secondary text on the photograph
        heroLine: "#2A4670",    // hairline on the photograph
        trace: "#29E0F5",       // the image's cyan glow
        violet: "#8B5CF6",      // corner bleed, used only in the hero scrim
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
