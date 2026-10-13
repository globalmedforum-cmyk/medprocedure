import React from "react";
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
    <ul className="border-t border-border-default">
      {opportunities.map((opportunity) => (
        <li
          key={opportunity.id}
          className="grid gap-x-10 gap-y-4 border-b border-border-default py-6 md:grid-cols-[minmax(0,1fr)_14rem]"
        >
          <div className="space-y-3">
            <div className="space-y-1">
              <p className="text-sm text-text-muted">{opportunity.specialty}</p>
              <h3 className="font-heading text-xl leading-snug font-medium tracking-tight">
                {opportunity.title}
              </h3>
              <p className="text-sm">
                {opportunity.hospital}
                <span className="text-text-muted">
                  {" · "}
                  {opportunity.location}, {opportunity.country}
                </span>
              </p>
            </div>

            {opportunity.requirements.length > 0 && (
              <ul className="list-disc space-y-1 pl-5 text-sm leading-relaxed text-text-muted">
                {opportunity.requirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="space-y-3 text-sm">
            {opportunity.deadline && (
              <div>
                <p className="text-text-muted">Date limite</p>
                <p className="font-mono text-sm">
                  {deadlineFormatter.format(new Date(opportunity.deadline))}
                </p>
              </div>
            )}
            {opportunity.contactEmail && (
              <a
                href={`mailto:${opportunity.contactEmail}?subject=${encodeURIComponent(
                  opportunity.title
                )}`}
                className="inline-block break-all text-accent-primary underline underline-offset-4 hover:text-accent-hover"
              >
                {opportunity.contactEmail}
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
