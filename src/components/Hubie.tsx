// Hubie — the Housebets sloth in his top hat. One restrained cameo,
// reserved for empty and error states. Hand-drawn for this prototype.
export function Hubie({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Hubie, the Housebets sloth"
    >
      {/* top hat, tipped like he just woke up */}
      <g transform="rotate(-10 30 12)">
        <rect x="19" y="3" width="22" height="15" rx="2.5" fill="#0f3040" />
        <rect x="19" y="13.2" width="22" height="3" fill="#c4f4f1" />
        <rect x="15" y="16.8" width="30" height="4.6" rx="2.3" fill="#0f3040" />
      </g>
      {/* head */}
      <path
        d="M32 21 C47 21 56 31 56 41 C56 52 45 58 32 58 C19 58 8 52 8 41 C8 31 17 21 32 21 Z"
        fill="#8b7458"
      />
      {/* face */}
      <path
        d="M32 27 C44 27 51 33.5 51 41.5 C51 50 42 55.5 32 55.5 C22 55.5 13 50 13 41.5 C13 33.5 20 27 32 27 Z"
        fill="#e6d9c3"
      />
      {/* eye-mask patches — the sloth signature */}
      <path
        d="M23.5 33.5 C20 31.5 16 31.8 14 34.8 C16 37.6 21.5 38.5 24.5 36.2 Z"
        fill="#5d4a38"
      />
      <path
        d="M40.5 33.5 C44 31.5 48 31.8 50 34.8 C48 37.6 42.5 38.5 39.5 36.2 Z"
        fill="#5d4a38"
      />
      {/* sleepy content eyes */}
      <path
        d="M20.5 37.5 a3.3 3.1 0 0 0 6.6 0"
        fill="none"
        stroke="#3a2c1e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M36.9 37.5 a3.3 3.1 0 0 0 6.6 0"
        fill="none"
        stroke="#3a2c1e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* nose + smile */}
      <ellipse cx="32" cy="43.6" rx="2.6" ry="2" fill="#3a2c1e" />
      <path
        d="M26.5 48.5 q5.5 3.6 11 0"
        fill="none"
        stroke="#3a2c1e"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
