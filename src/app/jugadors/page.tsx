import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayersContent from "@/components/PlayersContent";

export const metadata: Metadata = {
  title: "Jugadors",
  description:
    "Tots els jugadors del servidor de Minecraft mineuab: busca'n un i obre el seu carnet, amb la skin, la carrera i les estadístiques.",
};

export default function PlayersPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PlayersContent />
      </main>
      <Footer />
    </>
  );
}
