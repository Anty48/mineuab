"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, INSTAGRAM_URL, TWITCH_URL } from "@/lib/links";
import { DiscordIcon, InstagramIcon, TwitchIcon } from "@/components/icons";

export default function Socials() {
  const { t } = useLanguage();

  const socials = [
    {
      name: "Discord",
      desc: t("socials.discord"),
      href: DISCORD_URL,
      icon: <DiscordIcon />,
      accent: "bg-indigo-500/15 text-indigo-300",
      hover: "hover:border-indigo-400/50",
    },
    {
      name: "Instagram",
      desc: t("socials.instagram"),
      href: INSTAGRAM_URL,
      icon: <InstagramIcon />,
      accent: "bg-pink-500/15 text-pink-300",
      hover: "hover:border-pink-400/50",
    },
    {
      name: "Twitch",
      desc: t("socials.twitch"),
      href: TWITCH_URL,
      icon: <TwitchIcon />,
      accent: "bg-purple-500/15 text-purple-300",
      hover: "hover:border-purple-400/50",
    },
  ];

  return (
    <section id="xarxes" className="border-t border-zinc-900 py-24 md:py-32">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title">{t("socials.title")}</h2>
          <p className="section-subtitle">{t("socials.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card group flex flex-col transition duration-200 hover:-translate-y-1 ${s.hover}`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.accent}`}
              >
                {s.icon}
              </span>
              <h3 className="mt-6 text-xl font-semibold text-white group-hover:underline">
                {s.name}
              </h3>
              <p className="mt-2 flex-1 text-zinc-400">{s.desc}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-300">
                {t("socials.open")}
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
