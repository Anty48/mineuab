"use client";

import { useLanguage } from "@/i18n/LanguageProvider";
import { DISCORD_URL, INSTAGRAM_URL, TWITCH_URL } from "@/lib/links";

function InstagramIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.3 4.6A17.4 17.4 0 0 0 16 3.3l-.2.4a13 13 0 0 1 3.7 1.9 15 15 0 0 0-11 0A13 13 0 0 1 12.2 3.7L12 3.3A17.4 17.4 0 0 0 7.7 4.6C4.9 8.7 4.1 12.7 4.5 16.6a17.6 17.6 0 0 0 5.3 2.7l.6-1.5a11 11 0 0 1-1.8-.9l.4-.3a12.6 12.6 0 0 0 10 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1.5a17.6 17.6 0 0 0 5.3-2.7c.5-4.5-.8-8.5-3.7-12ZM9.7 14.3c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.7 2-1.7 2Zm4.6 0c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2Z" />
    </svg>
  );
}

function TwitchIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4 3 3 6v13h4v2h3l2-2h3l4-4V3H4Zm14 8-2 2h-3l-2 2v-2H8V5h10v6Z" />
      <path d="M15 7h-1.5v4H15V7Zm-4 0H9.5v4H11V7Z" />
    </svg>
  );
}

export default function Socials() {
  const { t } = useLanguage();

  const socials = [
    {
      name: "Instagram",
      desc: t("socials.instagram"),
      href: INSTAGRAM_URL,
      icon: <InstagramIcon />,
      color: "hover:border-pink-400/50 hover:bg-pink-500/10 text-pink-300",
    },
    {
      name: "Discord",
      desc: t("socials.discord"),
      href: DISCORD_URL,
      icon: <DiscordIcon />,
      color: "hover:border-indigo-400/50 hover:bg-indigo-500/10 text-indigo-300",
    },
    {
      name: "Twitch",
      desc: t("socials.twitch"),
      href: TWITCH_URL,
      icon: <TwitchIcon />,
      color: "hover:border-purple-400/50 hover:bg-purple-500/10 text-purple-300",
    },
  ];

  return (
    <section id="socials" className="scroll-mt-20 py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="section-title text-white">{t("socials.title")}</h2>
          <p className="mt-4 text-neutral-400">{t("socials.subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`card group flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 ${s.color}`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/5">
                {s.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-bold text-white">{s.name}</h3>
                <p className="truncate text-sm text-neutral-400">{s.desc}</p>
              </div>
              <span className="ml-auto text-neutral-500 transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
