import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryContent from "@/components/HistoryContent";

export const metadata: Metadata = {
  title: "La nostra història",
  description:
    "Com un servidor de Minecraft entre amics de l'Autònoma es va convertir en mineuab, una comunitat oberta a tothom.",
};

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HistoryContent />
      </main>
      <Footer />
    </>
  );
}
