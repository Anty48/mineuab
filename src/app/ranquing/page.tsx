import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RankingContent from "@/components/RankingContent";

export const metadata: Metadata = {
  title: "Rànquing de crèdits",
  description:
    "Qui té més crèdits al servidor de Minecraft mineuab, en directe, i com se'n guanyen.",
};

export default function RankingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <RankingContent />
      </main>
      <Footer />
    </>
  );
}
