import type { Metadata, Viewport } from "next";
import RootDocument from "@/components/RootDocument";
import { rootMetadata } from "@/i18n/seo";

export const metadata: Metadata = rootMetadata("ca");

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
  colorScheme: "light",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="ca">{children}</RootDocument>;
}
