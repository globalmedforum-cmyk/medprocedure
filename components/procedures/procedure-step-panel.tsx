"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
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

function getOfficialLinks(country: string) {
  const links: { label: string; href: string }[] = [];

  if (country !== "Suisse") {
    links.push({
      label: "France-Visas, portail officiel des visas",
      href: "https://france-visas.gouv.fr",
    });
  }
  if (country.includes("Suisse")) {
    links.push({
      label: "Office fédéral de la santé publique (OFSP)",
      href: "https://www.bag.admin.ch",
    });
  }

  return links;
}

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
  const officialLinks = getOfficialLinks(procedure.country);
  const involvesVisa = procedure.country !== "Suisse";

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
          <div className="max-w-prose space-y-1 border-l-2 border-accent-primary pl-4">
            <p className="text-sm font-medium">À savoir</p>
            <p className="text-base leading-relaxed whitespace-pre-line text-text-muted">
              {activeStep.content}
            </p>
          </div>
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

      <div className="grid gap-10 border-t border-border-default pt-8 md:grid-cols-2">
        {involvesVisa && (
          <section className="space-y-3">
            <h3 className="text-sm font-medium">Avant de déposer un visa</h3>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-text-muted marker:text-state-warning">
              <li>
                Limitez le séjour demandé à la durée stricte de
                l&apos;événement ou du stage.
              </li>
              <li>
                Les dates du logement, du transport et de l&apos;assurance
                doivent être identiques.
              </li>
              <li>
                Justifiez vos ressources ou joignez une attestation de prise en
                charge.
              </li>
              <li>
                Le passeport doit rester valide 3 à 6 mois après la date de
                retour.
              </li>
            </ul>
          </section>
        )}

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Liens utiles</h3>
          <ul className="space-y-2 text-sm">
            {officialLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent-primary underline underline-offset-4 hover:text-accent-hover"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                  `Assistance : ${procedure.title}`
                )}`}
                className="text-accent-primary underline underline-offset-4 hover:text-accent-hover"
              >
                Écrire à l&apos;assistance
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
