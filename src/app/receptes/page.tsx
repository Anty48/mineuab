import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipesContent from "@/components/RecipesContent";

export const metadata: Metadata = {
  title: "Receptes",
  description:
    "Les receptes que només trobaràs al servidor de Minecraft mineuab, en directe des del servidor: què es fa, amb quins ingredients i on.",
};

export default function RecipesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <RecipesContent />
      </main>
      <Footer />
    </>
  );
}
