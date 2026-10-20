"use client";

import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProcedureResources } from "@/lib/procedure-resources";
import { AssistanceDialog } from "./assistance-dialog";
import { StepContent } from "./step-content";
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
}: ProcedureStepPanelProps) {
  const totalSteps = procedure.steps.length;
  const currentIndex = procedure.steps.findIndex((s) => s.id === activeStep.id);
  const prevStep = procedure.steps[currentIndex - 1] ?? null;
  const nextStep = procedure.steps[currentIndex + 1] ?? null;
  const resources = getProcedureResources(procedure.slug);

  return (
    <div className="min-w-0 space-y-8">
      <article className="space-y-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-accent-primary uppercase">
            Étape {activeStep.order} sur {totalSteps}
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
          {activeStep.description}
        </p>

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
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-state-success/30 bg-state-success/5 px-4 py-3">
              <span className="flex items-center gap-2 text-sm font-semibold text-state-success">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                Étape terminée
              </span>
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
