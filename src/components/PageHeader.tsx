import Link from "next/link";

/** Capçalera de les pàgines interiors: ruta, títol i subtítol, sobre un to que es fon amb la pàgina. */
export default function PageHeader({
  crumb,
  title,
  subtitle,
}: {
  /** Nom curt de la pàgina per a la ruta de dalt ("mineuab / Normes"). */
  crumb: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="bg-gradient-to-b from-paper-200/80 to-paper">
      <div className="container-page pb-10 pt-12 md:pb-14 md:pt-20">
        <p className="eyebrow">
          <Link href="/" className="hover:underline">
            mineuab
          </Link>
          <span aria-hidden className="text-ink/30">
            /
          </span>
          {crumb}
        </p>
        <h1 className="mt-3 max-w-3xl text-balance font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-pretty text-lg text-ink-600 md:text-xl">{subtitle}</p>
        )}
      </div>
    </header>
  );
}
