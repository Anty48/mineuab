import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/ProfileContent";
import { PLAYER_NAME_PATTERN } from "@/lib/playerName";

interface Props {
  params: Promise<{ nom: string }>;
}

/** El nom de l'adreça, o null si no pot ser un nom de Minecraft (llavors la pàgina és un 404). */
async function playerName(params: Props["params"]) {
  let name: string;
  try {
    name = decodeURIComponent((await params).nom);
  } catch {
    return null;
  }
  return PLAYER_NAME_PATTERN.test(name) ? name : null;
}

// El perfil es llegeix des del navegador (API del servidor de Minecraft); aquí només hi ha el nom de l'adreça.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = await playerName(params);
  if (!name) return {};
  return {
    title: name,
    description: `El carnet de jugador de ${name} a mineuab: skin, carrera, crèdits i estadístiques del servidor.`,
  };
}

export default async function PlayerPage({ params }: Props) {
  const name = await playerName(params);
  if (!name) notFound();
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
