import React from "react";
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

      <ul className="space-y-4">
        {opportunities.map((opportunity) => {
          const reference = getOpportunityReference(opportunity.id);

          return (
            <li
              key={opportunity.id}
              className="grid gap-x-10 gap-y-4 rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start"
            >
              <div className="space-y-2">
                <p className="text-sm font-semibold text-accent-primary">
                  {opportunityCategoryLabels[opportunity.category]}
                  <span className="text-text-muted">
                    {" · "}
                    {opportunity.specialty}
                  </span>
                </p>
                <h3 className="font-heading text-xl leading-snug font-bold tracking-tight">
                  {opportunity.title}
                </h3>
                <p className="text-sm">
                  {opportunity.details && (
                    <>
                      {opportunity.details.hospital}
                      <span className="text-text-muted">{" · "}</span>
                    </>
                  )}
                  {opportunity.location}, {opportunity.country}
                </p>
              </div>

              <div className="space-y-1 text-sm">
                <p className="text-text-muted">Date limite</p>
                <p className="font-mono">
                  {opportunity.deadline
                    ? deadlineFormatter.format(new Date(opportunity.deadline))
                    : "Non précisée"}
                </p>
                <p className="pt-1 font-mono text-xs text-text-muted">
                  Réf. {reference}
                </p>
              </div>

              {opportunity.details ? (
                <div className="space-y-3 text-sm md:col-span-2">
                  {opportunity.details.requirements.length > 0 && (
                    <ul className="list-disc space-y-1 pl-5 leading-relaxed text-text-muted marker:text-accent-primary">
                      {opportunity.details.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  )}
                  {opportunity.details.contactEmail && (
                    <a
                      href={`mailto:${opportunity.details.contactEmail}?subject=${encodeURIComponent(
                        opportunity.title,
                      )}`}
                      className="inline-flex py-2 font-medium break-all text-accent-secondary hover:underline md:py-0.5"
                    >
                      {opportunity.details.contactEmail}
                    </a>
                  )}
                </div>
              ) : (
                <div className="space-y-3 md:col-span-2">
                  <p className="text-sm text-text-muted">
                    Établissement, contact et modalités de candidature : sur
                    demande.
                  </p>
                  <ContactDialog
                    trigger="Obtenir les détails de cette offre"
                    triggerVariant="default"
                    triggerClassName="h-12 w-full rounded-xl px-4 text-sm font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md sm:h-10 sm:w-auto"
                    title="Obtenir les détails de cette offre"
                    description="L'accès au détail des offres est un service payant. Écrivez-nous : notre équipe vous indique les conditions, puis vous transmet l'établissement, le contact et la marche à suivre pour candidater."
                    emailSubject={`Détails de l'offre réf. ${reference}`}
                    message={`Bonjour, je souhaite obtenir les détails de l'offre « ${opportunity.title} » (réf. ${reference}).`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
