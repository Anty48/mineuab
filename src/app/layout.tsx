import type { Metadata } from "next";
import { Inter, Press_Start_2P } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: "mineuab — Comunitat de Minecraft de la UAB",
  description:
    "La comunitat de Minecraft feta per i per a estudiants de la UAB. Construeix, explora i fes comunitat amb nosaltres.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "mineuab",
    description: "La comunitat de Minecraft de la UAB.",
    images: ["/assets/square_col.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ca" className={`${inter.variable} ${pixel.variable} dark`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
