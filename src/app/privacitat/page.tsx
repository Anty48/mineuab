import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Privacitat",
  description: "Quines dades mostra la web de mineuab, d'on surten i què pots fer si no hi vols sortir.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LegalContent page="privacy" />
      </main>
      <Footer />
    </>
  );
}
