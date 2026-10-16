import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import HowToJoin from "@/components/sections/HowToJoin";
import About from "@/components/sections/About";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Socials from "@/components/sections/Socials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <HowToJoin />
        <About />
        <GalleryPreview />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
