import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/ProfileContent";

interface Props {
  params: Promise<{ nom: string }>;
}

// El perfil es llegeix des del navegador (API del servidor de Minecraft); aquí només hi ha el nom de l'adreça.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = decodeURIComponent((await params).nom);
  return {
    title: name,
    description: `El carnet de jugador de ${name} a mineuab: skin, carrera, crèdits i estadístiques del servidor.`,
  };
}

export default async function PlayerPage({ params }: Props) {
  const name = decodeURIComponent((await params).nom);
  return (
    <>
      <Navbar />
      <main id="main">
        <ProfileContent name={name} />
      </main>
      <Footer />
    </>
  );
}
