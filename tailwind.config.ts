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
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
