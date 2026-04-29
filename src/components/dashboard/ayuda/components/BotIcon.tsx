type BotIconProps = {
  size?: number;
};

export default function BotIcon({ size = 20 }: BotIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="3" y="8" width="18" height="13" rx="3" fill="var(--card)" />

      <rect
        x="8"
        y="4"
        width="8"
        height="5"
        rx="2"
        fill="var(--primary-soft)"
      />

      <circle cx="9" cy="14" r="1.5" fill="var(--primary)" />
      <circle cx="15" cy="14" r="1.5" fill="var(--primary)" />

      <rect
        x="9"
        y="17"
        width="6"
        height="1.5"
        rx="0.75"
        fill="var(--primary)"
      />

      <line
        x1="12"
        y1="4"
        x2="12"
        y2="2"
        stroke="var(--primary-soft)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <circle cx="12" cy="1.5" r="1" fill="var(--card)" />

      <line
        x1="3"
        y1="13"
        x2="1"
        y2="13"
        stroke="var(--card)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      <line
        x1="21"
        y1="13"
        x2="23"
        y2="13"
        stroke="var(--card)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
