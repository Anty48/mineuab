import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RankingContent from "@/components/RankingContent";

export const metadata = pageMetadata("ca", "/ranquing");

export default function RankingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <RankingContent />
      </main>
      <Footer />
    </>
  );
}
