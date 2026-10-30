import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StarsContent from "@/components/StarsContent";

export const metadata = pageMetadata("ca", "/estrelles");

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
