import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Verd corporatiu de mineuab, el mateix del logo (#088F40). No el canvieu.
        brand: {
          DEFAULT: "#088F40",
          50: "#e9f8ee",
          100: "#c9edd4",
          200: "#95dcac",
          300: "#5ec583",
          400: "#2fa95f",
          500: "#088F40",
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
        // Llautó i andesita, els materials del mod Create. Només a la pàgina /create.
        brass: {
          100: "#fbf0cc",
          200: "#f5dc8e",
          300: "#eec55c",
          400: "#dfab37",
          500: "#c08a22",
          700: "#7d5614",
        },
        andesite: {
          300: "#b9bdb8",
          400: "#9a9f9a",
          500: "#7d827d",
          700: "#4a4e4a",
          800: "#323532",
          900: "#232623",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
        pixel: ["var(--font-pixel)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Ombra dura i desplaçada, com un bloc: als botons i a les peces principals.
        block: "6px 6px 0 0 #131a16",
        "block-sm": "4px 4px 0 0 #131a16",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.25" },
        },
        // Dos engranatges iguals que encaixen: el segon comença mitja dent girat i va al revés.
        cog: {
          to: { transform: "rotate(360deg)" },
        },
        "cog-rev": {
          from: { transform: "rotate(22.5deg)" },
          to: { transform: "rotate(-337.5deg)" },
        },
        // La cinta transportadora: les ratlles avancen el que fa un tram (24 px).
        belt: {
          to: { backgroundPosition: "24px 0" },
        },
      },
      animation: {
        blink: "blink 1.4s steps(2, jump-none) infinite",
        cog: "cog 16s linear infinite",
        "cog-rev": "cog-rev 16s linear infinite",
        "cog-fast": "cog 3s linear infinite",
        belt: "belt 0.8s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
