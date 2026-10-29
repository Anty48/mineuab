"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import PageHeader from "@/components/PageHeader";

interface Section {
  title: string;
  body: string[];
}

/** Les pàgines de privacitat i d'avís legal: el text és a `legal` de translations.ts. */
export default function LegalContent({ page }: { page: "privacy" | "notice" }) {
  const { t, raw } = useLanguage();
  const sections = raw<Section[]>(`legal.${page}.sections`) ?? [];

  return (
    <>
      <PageHeader
        crumb={t(`legal.${page}.title`)}
        title={t(`legal.${page}.title`)}
        subtitle={t(`legal.${page}.subtitle`)}
      />

      <section className="pb-20 pt-6 md:pb-28 md:pt-10">
        <div className="container-page max-w-3xl">
          {sections.map((s) => (
            <div key={s.title} className="border-t-2 border-ink py-8">
              <h2 className="font-display text-2xl font-extrabold">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p} className="mt-3 max-w-2xl leading-relaxed text-ink-600">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="field-label border-t-2 border-ink pt-6">{t("legal.updated")}</p>
        </div>
      </section>
    </>
  );
}
