import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RulesContent from "@/components/RulesContent";

export const metadata: Metadata = {
  title: "Normes del servidor",
  description:
    "Les normes del servidor de Minecraft mineuab perquè tothom s'hi senti a gust.",
};

export default function RulesPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <RulesContent />
      </main>
      <Footer />
    </>
  );
}
