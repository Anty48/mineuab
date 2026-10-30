import { notFound } from "next/navigation";

// Amb un layout arrel per idioma no hi pot haver un not-found global: les adreces desconegudes passen per aquí.
export default function UnknownPage() {
  notFound();
}
