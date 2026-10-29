import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";

export const metadata: Metadata = {
  title: "Avís legal",
  description: "Qui hi ha darrere de mineuab, un projecte d'estudiants sense ànim de lucre, i què cal saber de la web.",
};

export default function LegalNoticePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LegalContent page="notice" />
      </main>
      <Footer />
    </>
  );
}
