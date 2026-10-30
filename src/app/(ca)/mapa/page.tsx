import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapContent from "@/components/MapContent";

export const metadata = pageMetadata("ca", "/mapa");

export default function MapPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <MapContent />
      </main>
      <Footer />
    </>
  );
}
