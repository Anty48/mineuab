import { Bricolage_Grotesque, Inter, Silkscreen } from "next/font/google";
import "@/app/globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { Locale } from "@/i18n/translations";

// Text corrent.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Títols.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Etiquetes petites en píxels, com les lletres del logo.
const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

/** L'<html> de la web. Cada idioma té el seu layout arrel, perquè lang ja surti bé al HTML del servidor. */
export default function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return (
    <html lang={locale} className={`${inter.variable} ${bricolage.variable} ${silkscreen.variable}`}>
      <body className="font-sans">
        <LanguageProvider locale={locale}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
