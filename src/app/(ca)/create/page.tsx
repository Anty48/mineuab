import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreateContent from "@/components/CreateContent";

export const metadata = pageMetadata("ca", "/create");

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <CreateContent />
      </main>
      <Footer />
    </>
  );
}
