import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SERVER_ADDRESS, SITE_URL } from "@/lib/links";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const TITLE = "mineuab — Servidor de Minecraft";
const DESCRIPTION = `Servidor de Minecraft nascut a l'Autònoma i obert a tothom, siguis o no de la UAB. IP: ${SERVER_ADDRESS}`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
  title: {
    default: TITLE,
    template: "%s · mineuab",
  },
  description: DESCRIPTION,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "mineuab",
    locale: "ca_ES",
    alternateLocale: ["es_ES"],
    title: TITLE,
    description: DESCRIPTION,
    images: [
      { url: "/assets/og.jpg", width: 1200, height: 630, alt: "La plaça cívica de mineuab" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/assets/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className={`${inter.variable} dark`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
