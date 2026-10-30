import type { Metadata } from "next";
import PlayerPage from "@/app/(ca)/jugador/[nom]/page";
import { playerMetadata } from "@/i18n/seo";
import { playerNameFromPath } from "@/lib/playerName";

export async function generateMetadata({ params }: { params: Promise<{ nom: string }> }): Promise<Metadata> {
  const name = playerNameFromPath((await params).nom);
  return name ? playerMetadata("es", name) : {};
}

export default PlayerPage;
