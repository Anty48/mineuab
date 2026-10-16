/** Capçalera de secció de l'inici: títol i subtítol. */
export default function SectionHeading({
  title,
  subtitle,
  tone = "light",
  className = "",
}: {
  title: string;
  subtitle?: string;
  /** "dark" per a les seccions amb fons verd fosc. */
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";

  return (
    <div className={`max-w-2xl ${className}`}>
      <h2 className={`section-title ${dark ? "text-paper" : ""}`}>{title}</h2>
      {subtitle && (
        <p className={`section-subtitle ${dark ? "text-paper/75" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
