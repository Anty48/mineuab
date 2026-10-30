import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProfileContent from "@/components/ProfileContent";
import { playerMetadata } from "@/i18n/seo";
import { playerNameFromPath } from "@/lib/playerName";

interface Props {
  params: Promise<{ nom: string }>;
}

// El perfil es llegeix des del navegador (API del servidor de Minecraft); aquí només hi ha el nom de l'adreça.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = playerNameFromPath((await params).nom);
  return name ? playerMetadata("ca", name) : {};
}

export default async function PlayerPage({ params }: Props) {
  const name = playerNameFromPath((await params).nom);
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
