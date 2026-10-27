import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateContent from "@/components/CreateContent";

export const metadata: Metadata = {
  title: "MineUAB Create",
  description:
    "La beta tancada de MineUAB Create, el servidor de mineuab amb el mod Create: com funciona, com entrar-hi i tots els mods del modpack.",
};

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <CreateContent />
      </main>
      <Footer />
    </>
  );
}
