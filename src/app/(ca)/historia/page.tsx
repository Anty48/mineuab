import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoryContent from "@/components/HistoryContent";

export const metadata = pageMetadata("ca", "/historia");

export default function HistoryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <HistoryContent />
      </main>
      <Footer />
    </>
  );
}
