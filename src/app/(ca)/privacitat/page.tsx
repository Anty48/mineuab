import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalContent from "@/components/LegalContent";

export const metadata = pageMetadata("ca", "/privacitat");

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LegalContent page="privacy" />
      </main>
      <Footer />
    </>
  );
}
