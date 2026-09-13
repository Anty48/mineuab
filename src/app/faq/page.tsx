import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqContent from "@/components/FaqContent";

export const metadata: Metadata = {
  title: "Preguntes freqüents",
  description:
    "Com entrar, quina versió cal, com registrar-se i altres dubtes sobre el servidor de Minecraft mineuab.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <FaqContent />
      </main>
      <Footer />
    </>
  );
}
