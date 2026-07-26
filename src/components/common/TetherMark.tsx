interface TetherMarkProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

/**
 * The Tether mark: a single line running from an anchor point (safety, a
 * guardian, a fixed place) down to a small dot (you). It never breaks —
 * it sways, but always holds. Reused across the logo, loading screen,
 * and to visually connect the user to their guardians.
 */
export default function TetherMark({ size = 40, animated = true, className = '' }: TetherMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      role="img"
      aria-label="Tether"
    >
      <rect width="64" height="64" rx="18" className="fill-dusk-800" />
      <path
        d="M16 18 C 30 30, 24 38, 30 48"
        stroke="currentColor"
        className={`text-teal-400 ${animated ? 'tether-line' : ''}`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="16" cy="18" r="4.5" className="fill-sky-100" />
      <circle cx="30" cy="48" r="3.5" className="fill-teal-400" />
    </svg>
  );
}
