"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, INSTAGRAM_URL, TWITCH_URL, YOUTUBE_URL } from "@/lib/links";
import SectionHeading from "@/components/SectionHeading";
import { ArrowIcon, DiscordIcon, InstagramIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";

export default function Socials() {
  const { t } = useLanguage();

  const socials = [
    {
      name: "Discord",
      desc: t("socials.discord"),
      href: DISCORD_URL,
      icon: <DiscordIcon />,
      accent: "bg-[#5865F2]",
    },
    {
      name: "YouTube",
      desc: t("socials.youtube"),
      href: YOUTUBE_URL,
      icon: <YouTubeIcon />,
      accent: "bg-[#FF0000]",
    },
    {
      name: "Instagram",
      desc: t("socials.instagram"),
      href: INSTAGRAM_URL,
      icon: <InstagramIcon />,
      accent: "bg-[#D62976]",
    },
    {
      name: "Twitch",
      desc: t("socials.twitch"),
      href: TWITCH_URL,
      icon: <TwitchIcon />,
      accent: "bg-[#9146FF]",
    },
  ];

  return (
    <section id="xarxes" className="border-t-2 border-ink py-20 md:py-28">
      <div className="container-page">
        <SectionHeading
          title={t("socials.title")}
          subtitle={t("socials.subtitle")}
        />

        {/* Una fila gran per xarxa; en passar-hi per sobre s'omple de verd. */}
        <ul className="mt-12 border-t-2 border-ink">
          {socials.map((s) => (
            <li key={s.name} className="border-b-2 border-ink">
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 px-3 py-6 transition-colors hover:bg-brand-600 hover:text-white md:gap-8 md:px-5 md:py-8"
              >
                <span
                  className={`flex h-14 w-14 items-center justify-center border-2 border-ink text-white md:h-16 md:w-16 ${s.accent}`}
                >
                  {s.icon}
                </span>
                <span>
                  <span className="block font-display text-3xl font-extrabold md:text-5xl">
                    {s.name}
                  </span>
                  <span className="mt-1 block text-ink-600 group-hover:text-white">{s.desc}</span>
                </span>
                <span className="flex items-center gap-2 font-bold">
                  <span className="hidden sm:inline">{t("socials.open")}</span>
                  <ArrowIcon
                    size={24}
                    className="-rotate-45 transition-transform group-hover:rotate-0"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
