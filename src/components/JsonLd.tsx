/** Dades estructurades per als cercadors. El `<` s'escapa perquè cap text pugui tancar l'etiqueta. */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
