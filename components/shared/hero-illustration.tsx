import { cn } from "@/lib/utils";

interface HeroIllustrationProps {
  className?: string;
}

// Illustration décorative de la page d'accueil : le parcours du médecin,
// du dossier au départ. Couleurs prises dans les jetons du thème.
export function HeroIllustration({ className }: HeroIllustrationProps) {
  return (
    <svg
      viewBox="0 0 360 400"
      aria-hidden
      className={cn("h-auto w-full", className)}
      fill="none"
    >
      {/* Trajets en pointillés */}
      <g
        className="stroke-text-muted/50"
        strokeWidth="2"
        strokeDasharray="5 7"
        strokeLinecap="round"
      >
        <path d="M152 132 C 172 92, 192 72, 214 70" />
        <path d="M278 122 C 304 152, 306 178, 296 204" />
        <path d="M246 272 C 222 322, 184 338, 150 328" />
      </g>

      {/* Fiche médicale */}
      <g transform="rotate(4 275 70)">
        <rect
          x="220"
          y="24"
          width="112"
          height="92"
          rx="14"
          className="fill-bg-surface stroke-border-default"
          strokeWidth="2"
        />
        <rect
          x="234"
          y="38"
          width="32"
          height="32"
          rx="9"
          className="fill-accent-soft"
        />
        <path
          d="M250 45 V63 M241 54 H259"
          className="stroke-accent-primary"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <g
          className="stroke-border-default"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M276 46 H318" />
          <path d="M276 60 H306" />
          <path d="M234 86 H318" />
          <path d="M234 100 H296" />
        </g>
      </g>

      {/* Dossier et stylo */}
      <g transform="rotate(-6 95 185)">
        <rect
          x="44"
          y="122"
          width="102"
          height="128"
          rx="14"
          className="fill-bg-surface stroke-border-default"
          strokeWidth="2"
        />
        <g
          className="stroke-border-default"
          strokeWidth="4"
          strokeLinecap="round"
        >
          <path d="M60 146 H112" />
          <path d="M60 162 H128" />
          <path d="M60 178 H120" />
        </g>
        {/* Stylo */}
        <path
          d="M74 232 L110 196 L118 204 L82 240 L70 244 Z"
          className="fill-accent-primary"
        />
        <path
          d="M110 196 L114 192 L122 200 L118 204 Z"
          className="fill-text-primary"
        />
        <path
          d="M62 244 C 68 238, 74 248, 80 244"
          className="stroke-accent-primary"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Tampon validé */}
        <circle cx="144" cy="126" r="18" className="fill-text-primary" />
        <path
          d="M136 126 L142 132 L153 120"
          className="stroke-bg-surface"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Avion */}
      <g transform="translate(274 238) rotate(-38)">
        <path
          d="M-44 0 C -44 -8, 30 -9, 46 0 C 30 9, -44 8, -44 0 Z"
          className="fill-bg-surface stroke-text-primary"
          strokeWidth="2.5"
        />
        <path
          d="M-4 -6 L -22 -42 L -10 -42 L 16 -6 Z M-4 6 L -22 42 L -10 42 L 16 6 Z"
          className="fill-text-primary"
        />
        <path
          d="M-36 -4 L -46 -18 L -38 -18 L -26 -4 Z M-36 4 L -46 18 L -38 18 L -26 4 Z"
          className="fill-accent-primary"
        />
        <g className="fill-text-primary">
          <circle cx="24" cy="0" r="2.2" />
          <circle cx="32" cy="0" r="2.2" />
        </g>
      </g>

      {/* Valise */}
      <g transform="rotate(-4 98 330)">
        <path
          d="M80 290 V280 A8 8 0 0 1 88 272 H108 A8 8 0 0 1 116 280 V290"
          className="stroke-text-primary"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <rect
          x="50"
          y="288"
          width="96"
          height="76"
          rx="12"
          className="fill-text-primary"
        />
        <path
          d="M74 288 V364 M122 288 V364"
          className="stroke-bg-surface/25"
          strokeWidth="3"
        />
        <circle cx="98" cy="318" r="9" className="fill-accent-primary" />
        <rect
          x="88"
          y="338"
          width="20"
          height="12"
          rx="3"
          className="fill-bg-surface/80"
        />
      </g>

      {/* Petits repères */}
      <g className="stroke-text-muted/60" strokeWidth="2" strokeLinecap="round">
        <path d="M196 226 L204 234 M204 226 L196 234" />
        <path d="M30 96 L36 102 M36 96 L30 102" />
      </g>
      <circle cx="324" cy="300" r="4" className="fill-accent-primary/70" />
      <circle cx="190" cy="40" r="3" className="fill-text-muted/40" />
    </svg>
  );
}
