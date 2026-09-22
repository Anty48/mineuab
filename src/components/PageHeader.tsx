import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

/** Capçalera de les pàgines interiors: títol a l'esquerra i una captura del servidor a la dreta. */
export default function PageHeader({
  crumb,
  title,
  subtitle,
  image,
  caption,
}: {
  /** Nom curt de la pàgina per a la ruta de dalt ("mineuab / Normes"). */
  crumb: string;
  title: string;
  subtitle?: string;
  /** Captura importada de src/assets/gallery. */
  image: StaticImageData;
  /** Peu de la captura. */
  caption?: string;
}) {
  return (
    <header className="bg-paving border-b-2 border-ink">
      <div className="container-page grid items-center gap-12 py-12 md:py-16 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        <div>
          <p className="eyebrow">
            <Link href="/" className="hover:underline">
              mineuab
            </Link>
            <span aria-hidden>/</span>
            {crumb}
          </p>
          <h1 className="mt-4 text-balance font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-xl text-pretty text-lg text-ink-600 md:text-xl">{subtitle}</p>
          )}
        </div>

        <figure className="mx-auto w-full max-w-lg rotate-[1.5deg] border-2 border-ink bg-paper-50 p-2 shadow-block-lg lg:max-w-none">
          <Image
            src={image}
            alt=""
            placeholder="blur"
            priority
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 512px, 100vw"
            className="aspect-[16/10] w-full object-cover"
          />
          {caption && (
            <figcaption className="px-1 pt-2 font-pixel text-[11px] uppercase text-ink-600">
              {caption}
            </figcaption>
          )}
        </figure>
      </div>
    </header>
  );
}
