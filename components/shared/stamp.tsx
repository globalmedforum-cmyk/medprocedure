import React from "react";
import { cn } from "@/lib/utils";

interface StampProps {
  // Texte principal, en capitales
  label: string;
  // Ligne secondaire, plus petite
  detail?: string;
  // Tampon rond (décor) ou rectangulaire (validation d'une étape)
  shape?: "round" | "rect";
  // Inclinaison en degrés
  rotate?: number;
  // Joue l'animation d'apposition
  animate?: boolean;
  className?: string;
}

// Tampon encreur : double filet, capitales en chasse fixe et encre
// légèrement irrégulière. Purement décoratif pour les lecteurs d'écran
// quand il double une information déjà donnée en texte.
export function Stamp({
  label,
  detail,
  shape = "rect",
  rotate = -6,
  animate = false,
  className,
}: StampProps) {
  return (
    <span
      style={
        {
          "--stamp-rotate": `${rotate}deg`,
          transform: `rotate(${rotate}deg)`,
        } as React.CSSProperties
      }
      className={cn(
        "ink inline-flex flex-col items-center justify-center border-[3px] border-double border-current text-center font-mono leading-tight font-medium tracking-[0.18em] uppercase select-none",
        shape === "round"
          ? "aspect-square rounded-full p-4"
          : "rounded-md px-4 py-2",
        animate && "animate-stamp",
        className,
      )}
    >
      <span className="text-[0.8em]">{label}</span>
      {detail && (
        <span className="mt-0.5 text-[0.55em] tracking-[0.14em] opacity-90">
          {detail}
        </span>
      )}
    </span>
  );
}
