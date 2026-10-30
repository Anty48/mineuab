import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RulesContent from "@/components/RulesContent";

export const metadata = pageMetadata("ca", "/normes");

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
