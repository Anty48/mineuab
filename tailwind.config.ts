import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#0A8A3F",
          50: "#e9f8ee",
          100: "#c9edd4",
          200: "#95dcac",
          300: "#5ec583",
          400: "#2fa95f",
          500: "#0A8A3F",
          600: "#087334",
          700: "#075c2a",
          800: "#064821",
          900: "#04321a",
        },
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        pixel: "4px 4px 0 0 rgba(0,0,0,0.35)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        "pop-in": "pop-in 0.2s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
