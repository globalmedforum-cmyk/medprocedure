import React from "react";
import { ArrowRight, CalendarDays, Check, Lock, MapPin } from "lucide-react";
import { ContactDialog } from "@/components/shared/contact-dialog";
import {
  getOpportunityReference,
  opportunityCategoryLabels,
} from "@/lib/opportunity-categories";
import type { OpportunityItem } from "./types";

interface ProcedureOpportunitiesProps {
  opportunities: OpportunityItem[];
}

const deadlineFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

// Ce que débloque la demande de détails d'une offre réservée
const lockedDetails = [
  "Nom de l'établissement et du service",
  "Contact direct du recruteur",
  "Marche à suivre pour candidater",
];

const roundButtonClassName =
  "flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-accent-primary p-0 text-primary-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md";

function CheckMark() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary text-primary-foreground">
      <Check aria-hidden className="h-3.5 w-3.5 stroke-[3]" />
    </span>
  );
}

export function ProcedureOpportunities({
  opportunities,
}: ProcedureOpportunitiesProps) {
  if (opportunities.length === 0) {
    return (
      <p className="text-sm text-text-muted">
        Aucune opportunité n&apos;est associée à cette procédure pour le moment.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {opportunities.some((opportunity) => !opportunity.details) && (
        <p className="max-w-prose text-sm leading-relaxed text-text-muted">
          Ces offres sont repérées et vérifiées par notre équipe. L&apos;aperçu
          est libre ; le nom de l&apos;établissement, le contact et la marche à
          suivre pour candidater vous sont communiqués sur demande.
        </p>
      )}

      <ul className="grid gap-4 xl:grid-cols-2">
        {opportunities.map((opportunity) => {
          const reference = getOpportunityReference(opportunity.id);
          const { details } = opportunity;
          const mailto = details?.contactEmail
            ? `mailto:${details.contactEmail}?subject=${encodeURIComponent(opportunity.title)}`
            : null;

          return (
            <li
              key={opportunity.id}
              className="flex flex-col gap-5 rounded-2xl border border-border-default bg-accent-soft/40 p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
            >
              <span className="w-fit rounded-lg bg-accent-primary px-3 py-1 text-sm font-semibold text-primary-foreground">
                {opportunityCategoryLabels[opportunity.category]}
              </span>

              <h3 className="font-heading text-xl leading-snug font-bold tracking-tight sm:text-2xl">
                {opportunity.title}
              </h3>

              <div className="grid gap-4 border-l-4 border-accent-primary pl-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <CalendarDays
                    aria-hidden
                    className="mt-0.5 h-7 w-7 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {opportunity.deadline
                        ? deadlineFormatter.format(
                            new Date(opportunity.deadline),
                          )
                        : "Sans date limite"}
                    </p>
                    <p className="text-sm text-text-muted">
                      {opportunity.deadline
                        ? "Date limite"
                        : "Candidature ouverte"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 h-7 w-7 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold">
                      {details?.hospital ?? "Établissement sur demande"}
                    </p>
                    <p className="text-sm text-text-muted">
                      {opportunity.location}, {opportunity.country}
                    </p>
                  </div>
                </div>
              </div>

              <ul className="space-y-2.5 rounded-xl bg-bg-surface p-4 text-[0.95rem] leading-snug">
                {details ? (
                  <>
                    {details.requirements.map((requirement) => (
                      <li key={requirement} className="flex items-start gap-3">
                        <CheckMark />
                        {requirement}
                      </li>
                    ))}
                    {mailto && (
                      <li className="flex items-start gap-3">
                        <CheckMark />
                        <a
                          href={mailto}
                          className="font-medium break-all text-accent-primary hover:underline"
                        >
                          {details.contactEmail}
                        </a>
                      </li>
                    )}
                  </>
                ) : (
                  lockedDetails.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-text-muted"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-bg-subtle">
                        <Lock aria-hidden className="h-3.5 w-3.5" />
                      </span>
                      {item}
                    </li>
                  ))
                )}
              </ul>

              <div className="mt-auto flex items-center justify-between gap-4">
                <p className="min-w-0 text-sm font-semibold text-accent-primary">
                  {opportunity.specialty}
                  <span className="text-text-muted">
                    {" | "}Réf. {reference}
                  </span>
                </p>
                {details ? (
                  mailto && (
                    <a
                      href={mailto}
                      aria-label={`Écrire à ${details.contactEmail}`}
                      title="Écrire aux organisateurs"
                      className={roundButtonClassName}
                    >
                      <ArrowRight aria-hidden className="h-5 w-5" />
                    </a>
                  )
                ) : (
                  <ContactDialog
                    trigger={<ArrowRight aria-hidden className="size-5" />}
                    triggerAriaLabel="Obtenir les détails de cette offre"
                    triggerVariant="default"
                    triggerClassName={roundButtonClassName}
                    title="Obtenir les détails de cette offre"
                    description="L'accès au détail des offres est un service payant. Écrivez-nous : notre équipe vous indique les conditions, puis vous transmet l'établissement, le contact et la marche à suivre pour candidater."
                    emailSubject={`Détails de l'offre réf. ${reference}`}
                    message={`Bonjour, je souhaite obtenir les détails de l'offre « ${opportunity.title} » (réf. ${reference}).`}
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
