// Small inline SVG icons shared across the site. All are decorative
// (aria-hidden); give the surrounding control its own accessible name.

interface IconProps {
  size?: number;
  className?: string;
}

export function InstagramIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function DiscordIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.3 4.6A17.4 17.4 0 0 0 16 3.3l-.2.4a13 13 0 0 1 3.7 1.9 15 15 0 0 0-11 0A13 13 0 0 1 12.2 3.7L12 3.3A17.4 17.4 0 0 0 7.7 4.6C4.9 8.7 4.1 12.7 4.5 16.6a17.6 17.6 0 0 0 5.3 2.7l.6-1.5a11 11 0 0 1-1.8-.9l.4-.3a12.6 12.6 0 0 0 10 0l.4.3c-.6.4-1.2.7-1.8.9l.6 1.5a17.6 17.6 0 0 0 5.3-2.7c.5-4.5-.8-8.5-3.7-12ZM9.7 14.3c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.7 2-1.7 2Zm4.6 0c-.9 0-1.7-.9-1.7-2s.7-2 1.7-2 1.7.9 1.7 2-.8 2-1.7 2Z" />
    </svg>
  );
}

export function TwitchIcon({ size = 28, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M4 3 3 6v13h4v2h3l2-2h3l4-4V3H4Zm14 8-2 2h-3l-2 2v-2H8V5h10v6Z" />
      <path d="M15 7h-1.5v4H15V7Zm-4 0H9.5v4H11V7Z" />
    </svg>
  );
}

export function CopyIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <rect x="9" y="9" width="11" height="11" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** Points down; rotate it for other directions. */
export function ChevronIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function CheckIcon({ size = 20, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
