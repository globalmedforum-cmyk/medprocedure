import React from "react";
import { ProcedureIcon } from "./procedure-icon";
import { cn } from "@/lib/utils";

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
        "flex h-full flex-col rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
          <ProcedureIcon slug={slug} className="h-5 w-5" />
        </span>
      </div>

      <h3 className="mt-3 font-heading text-lg leading-snug font-bold tracking-tight">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">
        {description}
      </p>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border-default pt-4">
        <span className="text-xs font-medium text-text-muted">{meta}</span>
        {children}
      </div>
    </article>
  );
}
