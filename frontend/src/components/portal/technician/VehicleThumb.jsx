export default function VehicleThumb({ className = "" }) {
  return (
    <svg viewBox="0 0 220 120" className={className} role="img" aria-label="Vehicle illustration">
      <defs>
        <linearGradient id="techBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fdfdfd" />
          <stop offset="100%" stopColor="#d7d9dc" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="100" rx="80" ry="7" fill="#000" opacity="0.08" />
      <path
        d="M28 82
           C 28 68, 42 66, 58 64
           L 76 44
           C 86 34, 100 28, 116 28
           L 150 28
           C 164 28, 176 34, 184 46
           L 196 64
           C 204 66, 210 72, 210 82
           C 210 90, 202 94, 192 94
           L 176 94
           C 176 80, 164 70, 150 70
           C 136 70, 124 80, 124 94
           L 100 94
           C 100 80, 88 70, 74 70
           C 60 70, 48 80, 48 94
           L 38 94
           C 30 94, 28 88, 28 82 Z"
        fill="url(#techBody)"
        stroke="#c3c5c9"
        strokeWidth="1.2"
      />
      <path
        d="M84 44 C 92 36, 104 32, 116 32 L 148 32 C 158 32, 168 37, 176 46 L 172 46 L 92 46 Z"
        fill="#5b6b74"
      />
      <circle cx="74" cy="94" r="16" fill="#2a2b2d" />
      <circle cx="74" cy="94" r="7" fill="#9a9ea3" />
      <circle cx="150" cy="94" r="16" fill="#2a2b2d" />
      <circle cx="150" cy="94" r="7" fill="#9a9ea3" />
    </svg>
  );
}
