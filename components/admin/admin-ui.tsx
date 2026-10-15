import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Carte blanche commune aux pages d'administration
export const adminCardClassName =
  "rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm sm:p-8";

interface AdminPageHeaderProps {
  title: string;
  eyebrow?: React.ReactNode;
  backHref?: string;
  actions?: React.ReactNode;
}

export function AdminPageHeader({
  title,
  eyebrow,
  backHref,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className={cn(adminCardClassName, "space-y-4")}>
      {backHref && (
        <Link
          href={backHref}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-11 gap-2 rounded-xl border-border-default bg-bg-surface px-3 text-sm font-semibold text-text-primary transition-all hover:shadow-sm sm:h-9",
          )}
        >
          <ArrowLeft aria-hidden />
          Retour à l&apos;administration
        </Link>
      )}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1.5">
          {eyebrow && (
            <p className="font-mono text-xs text-text-muted">{eyebrow}</p>
          )}
          <h1 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            {title}
          </h1>
        </div>
        {actions}
      </div>
    </header>
  );
}

interface AdminSectionProps {
  id?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export function AdminSection({
  id,
  title,
  description,
  actions,
  children,
}: AdminSectionProps) {
  return (
    <section
      id={id}
      className={cn(adminCardClassName, "scroll-mt-24 space-y-5")}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="font-heading text-xl font-bold tracking-tight">
            {title}
          </h2>
          {description && (
            <p className="text-sm leading-relaxed text-text-muted">
              {description}
            </p>
          )}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
