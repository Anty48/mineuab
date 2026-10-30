import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryContent from "@/components/GalleryContent";

export const metadata = pageMetadata("ca", "/galeria");

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <GalleryContent />
      </main>
      <Footer />
    </>
  );
}
