import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecipesContent from "@/components/RecipesContent";

export const metadata = pageMetadata("ca", "/receptes");

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
