import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Verd corporatiu de mineuab. No el canvieu.
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
          950: "#022112",
        },
        // Fons clar, com les rajoles de la plaça cívica.
        paper: {
          DEFAULT: "#f4f1ea",
          50: "#fbfaf6",
          100: "#f4f1ea",
          200: "#e9e4d8",
          300: "#d8d0bd",
        },
        // Text i vores: gairebé negre, amb un punt de verd.
        ink: {
          DEFAULT: "#131a16",
          700: "#2b342f",
          600: "#454e49",
          500: "#5c655f",
        },
        // Terracota, com les juntes de maó del paviment. Només per a avisos.
        terra: {
          100: "#f6e4da",
          300: "#e3a384",
          500: "#c2603a",
          600: "#a9502e",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Ombra suau per a les peces que han de destacar sobre el paper.
        soft: "0 1px 2px rgb(19 26 22 / 0.05), 0 12px 32px -16px rgb(19 26 22 / 0.25)",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        blink: "blink 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
