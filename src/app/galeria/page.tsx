import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryContent from "@/components/GalleryContent";

export const metadata: Metadata = {
  title: "Galeria de construccions",
  description:
    "Els racons de l'Autònoma que la comunitat de mineuab ha construït al servidor de Minecraft.",
};

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <GalleryContent />
      </main>
      <Footer />
    </>
  );
}
