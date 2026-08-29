/**
 * Renders the hero sedan as an SVG illustration that tilts in 3D based on
 * cursor position, tracked by the parent <Hero> via onMouseMove.
 */
export default function Car3D({ rotateX = 0, rotateY = 0, translateZ = 0 }) {
  return (
    <div className="perspective-1200 relative mx-auto -mt-1 flex h-[190px] w-full max-w-[460px] items-end justify-center sm:h-[220px]">
      {/* ambient ground rings — rotate slowly, independent of cursor */}
      <div className="pointer-events-none absolute bottom-1 left-1/2 h-[170px] w-[400px] -translate-x-1/2">
        <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-gold-300/60" />
        <div className="absolute inset-6 rounded-full border border-maroon-200/50" />
        <div className="absolute inset-0 rounded-full bg-radial-fade" />
      </div>

      {/* cursor-reactive 3D layer */}
      <div
        className="preserve-3d relative transition-transform duration-150 ease-out will-change-transform"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`,
        }}
      >
        <svg
          viewBox="0 0 640 320"
          className="w-full drop-shadow-[0_35px_35px_rgba(42,5,16,0.25)]"
          role="img"
          aria-label="Illustration of a sedan monitored by DriveGuard AI"
        >
          <defs>
            <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdfdfd" />
              <stop offset="55%" stopColor="#e7e8ea" />
              <stop offset="100%" stopColor="#c7c9cd" />
            </linearGradient>
            <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fa3ad" />
              <stop offset="100%" stopColor="#41545e" />
            </linearGradient>
            <linearGradient id="stripe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#d4941a" />
              <stop offset="100%" stopColor="#7a1129" />
            </linearGradient>
            <radialGradient id="wheel" cx="35%" cy="35%" r="70%">
              <stop offset="0%" stopColor="#5b5f66" />
              <stop offset="100%" stopColor="#17181a" />
            </radialGradient>
          </defs>

          {/* contact shadow */}
          <ellipse cx="320" cy="296" rx="230" ry="16" fill="#2a0510" opacity="0.18" />

          {/* lower body */}
          <path
            d="M55 235
               C 55 205, 85 200, 120 196
               L 168 150
               C 190 128, 222 116, 258 116
               L 388 116
               C 420 116, 448 126, 470 148
               L 508 190
               C 552 196, 585 206, 585 232
               C 585 248, 572 256, 552 256
               L 500 256
               C 500 224, 474 198, 442 198
               C 410 198, 384 224, 384 256
               L 262 256
               C 262 224, 236 198, 204 198
               C 172 198, 146 224, 146 256
               L 92 256
               C 68 256, 55 250, 55 235 Z"
            fill="url(#body)"
            stroke="#b6b8bd"
            strokeWidth="1.5"
          />

          {/* accent stripe */}
          <path
            d="M120 196 L470 148"
            stroke="url(#stripe)"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* greenhouse / windows */}
          <path
            d="M182 150
               C 200 130, 226 120, 258 120
               L 386 120
               C 416 120, 442 130, 462 148
               L 452 150
               L 250 150
               L 182 150 Z"
            fill="url(#glass)"
          />
          <path
            d="M195 148 C 210 133, 230 124, 254 123 L 254 148 Z"
            fill="#c7d6dc"
            opacity="0.55"
          />
          <line x1="322" y1="122" x2="322" y2="150" stroke="#2a343a" strokeWidth="2" />

          {/* headlight + grille */}
          <path
            d="M470 150 L500 188 L470 190 L458 156 Z"
            fill="#fff4d6"
            stroke="#e5aa27"
            strokeWidth="1"
          />
          <rect x="500" y="205" width="34" height="10" rx="3" fill="#3a3d42" />

          {/* taillight */}
          <rect x="60" y="210" width="14" height="20" rx="4" fill="#7a1129" />

          {/* door seams */}
          <line x1="262" y1="150" x2="262" y2="250" stroke="#b6b8bd" strokeWidth="1.5" />
          <line x1="386" y1="150" x2="386" y2="250" stroke="#b6b8bd" strokeWidth="1.5" />
          <line x1="324" y1="196" x2="324" y2="250" stroke="#c7c9cd" strokeWidth="1" />

          {/* door handles */}
          <rect x="290" y="176" width="22" height="5" rx="2.5" fill="#8a8d92" />
          <rect x="405" y="176" width="22" height="5" rx="2.5" fill="#8a8d92" />

          {/* wheels */}
          <g>
            <circle cx="204" cy="256" r="40" fill="url(#wheel)" />
            <circle cx="204" cy="256" r="19" fill="#c9962b" opacity="0.9" />
            <circle cx="204" cy="256" r="7" fill="#2a2b2d" />
          </g>
          <g>
            <circle cx="442" cy="256" r="40" fill="url(#wheel)" />
            <circle cx="442" cy="256" r="19" fill="#c9962b" opacity="0.9" />
            <circle cx="442" cy="256" r="7" fill="#2a2b2d" />
          </g>
        </svg>

        {/* floating scan reticle, sits slightly above the body in 3D space */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold-400/70"
          style={{ transform: "translateZ(28px)" }}
        />
      </div>
    </div>
  );
}
