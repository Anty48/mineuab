import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipesClient from "./RecipesClient";

export const metadata = {
  title: "Receptes Custom · mineuab",
};

export default function RecipesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh]">
        <RecipesClient />
      </main>
      <Footer />
    </>
  );
}
