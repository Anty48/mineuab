import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";

export const metadata = pageMetadata("ca", "/avis-legal");

export default function LegalNoticePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LegalContent page="notice" />
      </main>
      <Footer />
    </>
  );
}
