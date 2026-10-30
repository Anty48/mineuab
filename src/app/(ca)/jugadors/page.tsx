import { pageMetadata } from "@/i18n/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayersContent from "@/components/PlayersContent";

export const metadata = pageMetadata("ca", "/jugadors");

export default function PlayersPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PlayersContent />
      </main>
      <Footer />
    </>
  );
}
