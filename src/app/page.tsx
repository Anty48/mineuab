import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import History from "@/components/sections/History";
import Disclaimer from "@/components/sections/Disclaimer";
import Events from "@/components/sections/Events";
import Socials from "@/components/sections/Socials";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Disclaimer />
        <About />
        <History />
        <Events />
        <Socials />
      </main>
      <Footer />
    </>
  );
}
