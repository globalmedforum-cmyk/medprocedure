"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCongressMapUrl, type CongressInfo } from "@/lib/congress";
import { getProcedureResources } from "@/lib/procedure-resources";
import { Stamp } from "@/components/shared/stamp";
import { AssistanceDialog } from "./assistance-dialog";
import { ProcedureMentions, StepContent } from "./step-content";
import type { ProcedureData, StepItem } from "./types";

interface ProcedureStepPanelProps {
  procedure: ProcedureData;
  activeStep: StepItem;
  isCompleted: boolean;
  isPending: boolean;
  error: string | null;
  onToggleStep: (stepId: string) => void;
  onSelectStep: (stepId: string) => void;
  // Hors dossier, le guide est en lecture : ce contenu remplace le bouton de suivi
  startDossier?: React.ReactNode;
  // Joue l'animation du tampon : l'étape vient d'être cochée
  animateStamp?: boolean;
  // Congrès suivi par le dossier : certaines étapes s'y adaptent
  congress?: CongressInfo | null;
}

export function ProcedureStepPanel({
  procedure,
  activeStep,
  isCompleted,
  isPending,
  error,
  onToggleStep,
  onSelectStep,
  startDossier,
  animateStamp = false,
  congress = null,
}: ProcedureStepPanelProps) {
  const totalSteps = procedure.steps.length;
  const currentIndex = procedure.steps.findIndex((s) => s.id === activeStep.id);
  const prevStep = procedure.steps[currentIndex - 1] ?? null;
  const nextStep = procedure.steps[currentIndex + 1] ?? null;
  const resources = [
    ...(congress ? getCongressLinks(congress) : []),
    ...getProcedureResources(procedure.slug),
  ];

  return (
    <div className="min-w-0 space-y-8">
      <article className="space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-xs tracking-[0.15em] text-accent-primary uppercase">
            Étape {String(activeStep.order).padStart(2, "0")} /{" "}
            {String(totalSteps).padStart(2, "0")}
            {activeStep.estimatedDuration && (
              <span className="font-medium text-text-muted normal-case">
                {" · "}
                {activeStep.estimatedDuration}
              </span>
            )}
            {!activeStep.isRequired && (
              <span className="font-medium text-text-muted normal-case">
                {" · facultative"}
              </span>
            )}
          </p>
          <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            {activeStep.title}
          </h2>
        </header>

        <p className="max-w-3xl text-base leading-relaxed text-text-muted sm:text-lg">
          <ProcedureMentions text={activeStep.description} />
        </p>

        {congress && (
          <CongressStepNote congress={congress} stepOrder={activeStep.order} />
        )}

        {activeStep.content && <StepContent content={activeStep.content} />}

        <div className="space-y-4 border-t border-border-default pt-6">
          {startDossier ? (
            <div className="flex flex-col gap-3 rounded-xl bg-accent-soft p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-relaxed">
                Ouvrez un dossier pour enregistrer votre avancement.
              </p>
              {startDossier}
            </div>
          ) : isCompleted ? (
            <div className="flex flex-wrap items-center justify-between gap-4 py-2">
              <span className="sr-only">Étape terminée</span>
              <Stamp
                label="Validée"
                detail={`Étape ${activeStep.order} sur ${totalSteps}`}
                animate={animateStamp}
                className="text-2xl text-accent-primary"
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => onToggleStep(activeStep.id)}
                className="flex h-11 cursor-pointer items-center px-1 text-sm text-text-muted underline underline-offset-4 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50 sm:h-auto"
              >
                Annuler
              </button>
            </div>
          ) : (
            <Button
              variant="outline"
              disabled={isPending}
              onClick={() => onToggleStep(activeStep.id)}
              className="h-12 w-full gap-2 rounded-xl border-border-default bg-bg-surface px-4 text-sm font-semibold shadow-sm transition-all hover:border-state-success hover:text-state-success hover:shadow-md sm:w-auto"
            >
              <Check aria-hidden className="text-state-success" />
              Marquer comme terminée
            </Button>
          )}

          {error && (
            <p role="alert" className="text-sm text-state-error">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="secondary"
              disabled={!prevStep}
              onClick={() => prevStep && onSelectStep(prevStep.id)}
              className="h-12 gap-2 rounded-xl px-3 text-sm font-semibold transition-all hover:bg-border-default"
            >
              <ArrowLeft aria-hidden />
              Précédente
            </Button>
            <Button
              disabled={!nextStep}
              onClick={() => nextStep && onSelectStep(nextStep.id)}
              className="h-12 gap-2 rounded-xl px-3 text-sm font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md"
            >
              Suivante
              <ArrowRight aria-hidden />
            </Button>
          </div>
        </div>
      </article>

      <section className="space-y-4 border-t border-border-default pt-8">
        <h3 className="font-heading text-lg font-bold">Liens utiles</h3>
        <ul className="grid gap-x-8 gap-y-1 text-sm md:grid-cols-2">
          {resources.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-start gap-2 rounded-lg py-2 font-medium text-text-primary transition-colors hover:text-accent-secondary"
              >
                <ExternalLink
                  className="mt-0.5 h-4 w-4 shrink-0 text-text-muted group-hover:text-accent-secondary"
                  aria-hidden
                />
                <span className="underline-offset-4 group-hover:underline">
                  {resource.label}
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-3 rounded-xl bg-bg-base p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium">
            Besoin d&apos;aide pour cette étape ?
          </p>
          <AssistanceDialog
            procedureTitle={procedure.title}
            stepLabel={`étape ${activeStep.order} : ${activeStep.title}`}
            className="w-full sm:w-auto"
          />
        </div>
        <p className="max-w-prose text-xs leading-relaxed text-text-muted">
          Informations données à titre indicatif. Les montants, les délais et
          les calendriers évoluent : vérifiez-les sur les sites officiels
          ci-dessus avant d&apos;engager une démarche.
        </p>
      </section>
    </div>
  );
}

function getCongressLinks(congress: CongressInfo) {
  return [
    congress.registrationLink && {
      label: `${congress.registrationLink.label} (${congress.title})`,
      href: congress.registrationLink.href,
    },
    congress.membershipLink && {
      label: "Adhérer à la société organisatrice",
      href: congress.membershipLink.href,
    },
    congress.websiteLink && {
      label: "Site de la société organisatrice",
      href: congress.websiteLink.href,
    },
  ].filter((link): link is { label: string; href: string } => Boolean(link));
}

const noteDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function shiftDate(iso: string, days: number, months = 0) {
  const date = new Date(iso);
  date.setUTCMonth(date.getUTCMonth() + months);
  date.setUTCDate(date.getUTCDate() + days);
  return noteDateFormatter.format(date);
}

const noteLinkClassName =
  "font-semibold text-accent-primary underline-offset-4 hover:underline";

// Encadré propre au congrès choisi. Les étapes sont repérées par leur numéro
// d'ordre dans prisma/procedures-content.ts (procédure « participation-congres »).
function CongressStepNote({
  congress,
  stepOrder,
}: {
  congress: CongressInfo;
  stepOrder: number;
}) {
  let body: React.ReactNode = null;

  if (stepOrder === 1) {
    body = (
      <>
        <p>
          {congress.registrationOpen === true &&
            "Les inscriptions sont ouvertes. "}
          {congress.registrationOpen === false &&
            "Les inscriptions ne sont pas encore ouvertes : surveillez la page du congrès. "}
          Inscrivez-vous, puis demandez votre lettre d&apos;invitation à
          l&apos;organisateur
          {congress.organizer ? ` (${congress.organizer})` : ""}.
        </p>
        <ul className="space-y-1">
          {congress.registrationLink && (
            <li>
              <a
                href={congress.registrationLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={noteLinkClassName}
              >
                {congress.registrationLink.label}
              </a>
            </li>
          )}
          {congress.membershipLink && (
            <li>
              <a
                href={congress.membershipLink.href}
                target="_blank"
                rel="noopener noreferrer"
                className={noteLinkClassName}
              >
                Adhérer à la société
              </a>{" "}
              <span className="text-text-muted">
                : les membres paient souvent un tarif d&apos;inscription réduit.
              </span>
            </li>
          )}
        </ul>
      </>
    );
  } else if (stepOrder === 2 && congress.startDate) {
    body = (
      <p>
        Dates du congrès :{" "}
        {congress.dates ?? `à partir du ${shiftDate(congress.startDate, 0)}`}.
        Déposez votre demande de visa entre le{" "}
        <strong>{shiftDate(congress.startDate, 0, -6)}</strong> et le{" "}
        <strong>{shiftDate(congress.startDate, -15)}</strong> au plus tard,
        quinze jours avant le début du congrès.
      </p>
    );
  } else if (stepOrder === 3) {
    body = (
      <p>
        Lieu du congrès : {congress.venue}, {congress.city}. Réservez un hébergement à
        proximité, pour les nuits du congrès.{" "}
        <a
          href={getCongressMapUrl(congress)}
          target="_blank"
          rel="noopener noreferrer"
          className={noteLinkClassName}
        >
          Voir le lieu sur la carte
        </a>
      </p>
    );
  }

  if (!body) return null;

  return (
    <div className="max-w-3xl space-y-2 rounded-xl border-l-4 border-accent-primary bg-accent-soft/50 p-4 text-sm leading-relaxed">
      <p className="font-mono text-xs tracking-[0.15em] text-accent-primary uppercase">
        Pour votre congrès
      </p>
      {body}
    </div>
  );
}
