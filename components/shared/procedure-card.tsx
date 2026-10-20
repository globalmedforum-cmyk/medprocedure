import React from "react";
import { cn } from "@/lib/utils";

interface ProcedureCardProps {
  index: number;
  // Identifiant de la procédure (gardé pour les appels existants)
  slug: string;
  title: string;
  description: string;
  meta: string;
  className?: string;
  // Actions affichées en bas de la carte
  children?: React.ReactNode;
}

export function ProcedureCard({
  index,
  title,
  description,
  meta,
  className,
  children,
}: ProcedureCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-lg border border-border-default bg-bg-surface p-4 transition-colors duration-200 hover:border-text-primary/40 sm:p-6",
        className,
      )}
    >
      {/* Numéro en chasse fixe et titre éditorial, sans pictogramme */}
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-sm text-accent-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="min-w-0 font-heading text-xl leading-snug font-medium tracking-tight sm:text-2xl">
          {title}
        </h3>
      </div>

      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-text-muted sm:line-clamp-none">
        {description}
      </p>

      <div className="mt-4 space-y-3 border-t border-border-default pt-3 sm:mt-5 sm:pt-4">
        <p className="text-xs font-medium text-text-muted">{meta}</p>
        {children}
      </div>
    </article>
  );
}
