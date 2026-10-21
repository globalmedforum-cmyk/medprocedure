import React from "react";
import { CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { getCongressMapUrl, type CongressInfo } from "@/lib/congress";

const linkClassName =
  "inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border-default bg-bg-surface px-4 text-sm font-semibold text-accent-primary transition-colors hover:border-accent-primary sm:h-10";

// Fiche du congrès suivi par un dossier, en tête du guide
export function CongressSummary({ congress }: { congress: CongressInfo }) {
  const registration = congress.registrationLink;

  return (
    <section
      aria-labelledby="congres-titre"
      className="space-y-4 rounded-2xl border border-border-default bg-accent-soft/40 p-5 sm:p-6"
    >
      <div className="space-y-1">
        <p className="font-mono text-xs tracking-[0.15em] text-accent-primary uppercase">
          Votre congrès
        </p>
        <h2
          id="congres-titre"
          className="font-heading text-xl leading-snug font-bold tracking-tight sm:text-2xl"
        >
          {congress.title}
        </h2>
        {congress.organizer && (
          <p className="text-sm text-text-muted">{congress.organizer}</p>
        )}
      </div>

      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <p className="flex items-start gap-2">
          <CalendarDays aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{congress.dates ?? "Dates à confirmer"}</span>
        </p>
        <p className="flex items-start gap-2">
          <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <a
            href={getCongressMapUrl(congress)}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {congress.venue}, {congress.city}
          </a>
        </p>
      </div>

      {congress.registrationOpen !== null && (
        <p
          className={
            congress.registrationOpen
              ? "w-fit rounded-full bg-state-success/10 px-3 py-1 text-sm font-semibold text-state-success"
              : "w-fit rounded-full bg-bg-subtle px-3 py-1 text-sm font-semibold text-text-muted"
          }
        >
          {congress.registrationOpen
            ? "Inscriptions ouvertes"
            : "Inscriptions pas encore ouvertes"}
        </p>
      )}

      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        {registration && (
          <a
            href={registration.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent-hover sm:h-10"
          >
            {registration.label}
            <ExternalLink aria-hidden className="h-4 w-4" />
          </a>
        )}
        {congress.membershipLink && (
          <a
            href={congress.membershipLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Adhérer à la société
            <ExternalLink aria-hidden className="h-4 w-4" />
          </a>
        )}
        {congress.websiteLink && (
          <a
            href={congress.websiteLink.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClassName}
          >
            Site de la société
            <ExternalLink aria-hidden className="h-4 w-4" />
          </a>
        )}
      </div>
    </section>
  );
}
