import Image from "next/image";

/** Banner for inner pages: a blurred build in the background and the page title on top. */
export default function PageHeader({
  title,
  subtitle,
  image,
  narrow = false,
}: {
  title: string;
  subtitle?: string;
  /** Pre-blurred background from public/assets. */
  image: string;
  /** Line the text up with the narrower column used by reading pages. */
  narrow?: boolean;
}) {
  return (
    <header className="relative isolate flex min-h-[26rem] items-end overflow-hidden md:min-h-[32rem]">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[50%_35%]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/70 to-black/50"
      />
      <div className={`container-page pb-14 pt-32 ${narrow ? "max-w-3xl" : ""}`}>
        <h1 className="text-shadow-lg text-balance text-4xl font-semibold text-white md:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-shadow-lg mt-4 max-w-2xl text-balance text-lg text-zinc-200 md:text-2xl">
            {subtitle}
          </p>
        )}
      </div>
    </header>
  );
}
