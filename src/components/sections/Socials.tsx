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
    <section id="xarxes" className="pb-24 pt-4 md:pb-32">
      <div className="container-page">
        <SectionHeading
          title={t("socials.title")}
          subtitle={t("socials.subtitle")}
        />

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col gap-5 rounded-2xl border border-ink/10 bg-paper-50 p-6 transition-colors hover:border-ink/20 hover:bg-white"
              >
                <span className="flex items-center justify-between">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${s.accent}`}
                  >
                    {s.icon}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-ink-600 group-hover:text-brand-600">
                    {t("socials.open")}
                    <ArrowIcon size={18} className="-rotate-45" />
                  </span>
                </span>
                <span>
                  <span className="block font-display text-2xl font-bold">{s.name}</span>
                  <span className="mt-1 block text-ink-600">{s.desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
