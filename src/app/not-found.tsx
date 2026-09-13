import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NotFoundContent from "@/components/NotFoundContent";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main">
        <NotFoundContent />
      </main>
      <Footer />
    </>
  );
}
