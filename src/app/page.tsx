import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import Disclaimer from "@/components/sections/Disclaimer";
import HowToJoin from "@/components/sections/HowToJoin";
import About from "@/components/sections/About";
import Socials from "@/components/sections/Socials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Disclaimer />
        <HowToJoin />
        <About />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
