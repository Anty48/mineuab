// El servidor de Minecraft, publicat amb el túnel de Cloudflare: BlueMap, rànquing (Credits) i perfils.
// Han de ser els orígens de MAP_URL, RANKING_URL i PROFILES_URL de src/lib/links.ts: si canvien allà, canvieu-los aquí.
const MAPA = "https://map.mineuab.org";
const CREDITS = "https://credits.mineuab.org";
const PERFIL = "https://perfil.mineuab.org";
// Per provar amb els perfils en local (NEXT_PUBLIC_PROFILES_URL a links.ts), també cal deixar-los passar.
const PERFILS = process.env.NEXT_PUBLIC_PROFILES_URL ? new URL(process.env.NEXT_PUBLIC_PROFILES_URL).origin : "";

// Què pot carregar la web i d'on. Next posa scripts i estils al mateix HTML, per això cal 'unsafe-inline'.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  // Les cares i les skins dels jugadors i les icones de les receptes venen del servidor; blob: i data: per a
  // les textures del visor de skins en 3D.
  `img-src 'self' data: blob: ${PERFIL} ${PERFILS}`,
  "font-src 'self'",
  // L'estat del servidor (mcsrvstat.us) i les dades del servidor (rànquing i perfils).
  `connect-src 'self' https://api.mcsrvstat.us ${CREDITS} ${PERFIL} ${PERFILS}`,
  // El BlueMap de /mapa.
  `frame-src ${MAPA}`,
  // Ningú pot posar la web dins d'un iframe (contra el clickjacking).
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
]
  .map((d) => d.trim())
  .join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
