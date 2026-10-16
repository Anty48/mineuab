import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsContent from "@/components/StarsContent";

export const metadata: Metadata = {
  title: "El pacte de les estrelles",
  description:
    "Com funciona el PvP a mineuab: lluitar, quedar-se el botí i atacar bases només entre qui ha signat el pacte de les estrelles, i segons les estrelles de tots dos.",
};

export default function StarsPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <StarsContent />
      </main>
      <Footer />
    </>
  );
}
