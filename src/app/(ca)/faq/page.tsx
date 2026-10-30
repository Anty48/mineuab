import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqContent from "@/components/FaqContent";

export const metadata = pageMetadata("ca", "/faq");

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <FaqContent />
      </main>
      <Footer />
    </>
  );
}
