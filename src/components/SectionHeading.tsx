/** Capçalera de secció de l'inici: número i nom en píxels, títol i subtítol. */
export default function SectionHeading({
  number,
  label,
  title,
  subtitle,
  tone = "light",
  className = "",
}: {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  /** "dark" per a les seccions amb fons verd fosc. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${className}`}>
      <p className={`eyebrow ${dark ? "text-brand-300" : ""}`}>
        {number}
        <span aria-hidden>/</span>
        {label}
      </p>
      <h2 className={`section-title mt-4 ${dark ? "text-paper" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${dark ? "text-paper/75" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
