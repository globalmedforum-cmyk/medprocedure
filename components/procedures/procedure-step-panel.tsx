"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProcedureResources } from "@/lib/procedure-resources";
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
}

const SUPPORT_EMAIL = "contact@medprocedure.com";

export function ProcedureStepPanel({
  procedure,
  activeStep,
  isCompleted,
  isPending,
  error,
  onToggleStep,
  onSelectStep,
}: ProcedureStepPanelProps) {
  const totalSteps = procedure.steps.length;
  const currentIndex = procedure.steps.findIndex((s) => s.id === activeStep.id);
  const prevStep = procedure.steps[currentIndex - 1] ?? null;
  const nextStep = procedure.steps[currentIndex + 1] ?? null;
  const resources = getProcedureResources(procedure.slug);

  return (
    <div className="min-w-0 space-y-12">
      <article className="space-y-6">
        <header className="space-y-2">
          <p className="font-mono text-xs text-text-muted">
            Étape {activeStep.order} sur {totalSteps}
            {activeStep.estimatedDuration &&
              ` · ${activeStep.estimatedDuration}`}
            {!activeStep.isRequired && " · facultative"}
          </p>
          <h2 className="font-heading text-2xl leading-tight font-medium tracking-tight sm:text-3xl">
            {activeStep.title}
          </h2>
        </header>

        <p className="max-w-prose text-base leading-relaxed">
          {activeStep.description}
        </p>

        {activeStep.content && (
          <section className="max-w-prose space-y-3 border-l-2 border-accent-primary pl-4">
            <h3 className="text-sm font-medium text-text-muted">En pratique</h3>
            <StepContent content={activeStep.content} />
          </section>
        )}

        {activeStep.videoUrl && (
          <div className="aspect-video w-full overflow-hidden rounded-md border border-border-default">
            <iframe
              src={activeStep.videoUrl}
              title={activeStep.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          </div>
        )}

        <div className="space-y-3 border-t border-border-default pt-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {isCompleted ? (
              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1.5 font-medium text-state-success">
                  <Check className="h-4 w-4 stroke-[2.5]" aria-hidden />
                  Étape terminée
                </span>
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => onToggleStep(activeStep.id)}
                  className="cursor-pointer text-text-muted underline underline-offset-4 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Annuler
                </button>
              </div>
            ) : (
              <Button
                disabled={isPending}
                onClick={() => onToggleStep(activeStep.id)}
                className="h-10 gap-2 px-4 text-sm"
              >
                <Check aria-hidden />
                Marquer comme terminée
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                disabled={!prevStep}
                onClick={() => prevStep && onSelectStep(prevStep.id)}
                className="h-10 gap-2 bg-transparent px-3 text-sm"
              >
                <ArrowLeft aria-hidden />
                Précédente
              </Button>
              <Button
                variant={isCompleted ? "default" : "outline"}
                disabled={!nextStep}
                onClick={() => nextStep && onSelectStep(nextStep.id)}
                className={
                  isCompleted
                    ? "h-10 gap-2 px-3 text-sm"
                    : "h-10 gap-2 bg-transparent px-3 text-sm"
                }
              >
                Suivante
                <ArrowRight aria-hidden />
              </Button>
            </div>
          </div>

          {error && (
            <p role="alert" className="text-sm text-state-error">
              {error}
            </p>
          )}
        </div>
      </article>

      <section className="space-y-4 border-t border-border-default pt-8">
        <h3 className="text-sm font-medium">Liens utiles</h3>
        <ul className="grid gap-x-10 gap-y-2.5 text-sm md:grid-cols-2">
          {resources.map((resource) => (
            <li key={resource.href}>
              <a
                href={resource.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-baseline gap-1.5 text-accent-secondary underline underline-offset-4 hover:text-text-primary"
              >
                {resource.label}
                <ExternalLink
                  className="h-3.5 w-3.5 shrink-0 translate-y-0.5"
                  aria-hidden
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                `Assistance : ${procedure.title}`
              )}`}
              className="text-accent-secondary underline underline-offset-4 hover:text-text-primary"
            >
              Écrire à l&apos;assistance
            </a>
          </li>
        </ul>
        <p className="max-w-prose text-xs leading-relaxed text-text-muted">
          Informations données à titre indicatif. Les montants, les délais et
          les calendriers évoluent : vérifiez-les sur les sites officiels
          ci-dessus avant d&apos;engager une démarche.
        </p>
      </section>
    </div>
  );
}
