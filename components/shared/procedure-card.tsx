import React from "react";
import { cn } from "@/lib/utils";
import { ProcedureIcon } from "./procedure-icon";

interface ProcedureCardProps {
  index: number;
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
  slug,
  title,
  description,
  meta,
  className,
  children,
}: ProcedureCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border-default bg-bg-surface p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6",
        className
      )}
    >
      {/* Sur téléphone, icône, numéro et titre tiennent sur une seule ligne */}
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
          <ProcedureIcon slug={slug} className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <span className="block font-mono text-[11px] text-text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="font-heading text-base leading-snug font-bold tracking-tight sm:text-lg">
            {title}
          </h3>
        </div>
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
