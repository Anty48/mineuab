import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapContent from "@/components/MapContent";

export const metadata: Metadata = {
  title: "Mapa del món",
  description:
    "El mapa en directe del servidor de Minecraft mineuab: construccions, camins i jugadors connectats.",
};

export default function MapPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <MapContent />
      </main>
      <Footer />
    </>
  );
}
