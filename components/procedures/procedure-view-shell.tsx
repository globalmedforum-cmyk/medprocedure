"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowLeft, List, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/components/shared/app-shell";
import { ProcedureStepperSidebar } from "./procedure-stepper-sidebar";
import { ProcedureMobileDrawer } from "./procedure-mobile-drawer";
import { ProcedureStepPanel } from "./procedure-step-panel";
import { AssistanceDialog } from "./assistance-dialog";
import { ProcedureOpportunities } from "./procedure-opportunities";
import { DossierSettingsDialog } from "@/components/dossiers/dossier-settings-dialog";
import { StartDossierDialog } from "@/components/dossiers/start-dossier-dialog";
import {
  formatDossierDate,
  getDossierLabel,
  toDateInputValue,
} from "@/lib/dossiers";
import type { DossierSummary, OpportunityItem, ProcedureData } from "./types";
import { toggleStepProgress } from "@/actions/procedure-progress";
import { cn } from "@/lib/utils";

interface ProcedureViewShellProps {
  procedure: ProcedureData;
  initialCompletedStepIds: string[];
  opportunities: OpportunityItem[];
  showOpportunities: boolean;
  // Dossier suivi. Absent : la page est le guide en lecture, sans avancement.
  dossier?: DossierSummary | null;
  showAdmin?: boolean;
  // Dossiers déjà ouverts par l'utilisateur pour cette procédure (mode guide)
  existingDossiers?: { id: string; label: string }[];
}

const tabTriggerClassName =
  "h-12 flex-none rounded-none px-0 text-sm group-data-horizontal/tabs:after:bottom-[-1px] group-data-horizontal/tabs:after:bg-accent-primary";

// Recherche insensible à la casse et aux accents
function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function matchesSearch(opportunity: OpportunityItem, query: string) {
  const text = [
    opportunity.title,
    opportunity.specialty,
    opportunity.location,
    opportunity.country,
    opportunity.details?.hospital,
    ...(opportunity.details?.requirements ?? []),
  ].join(" ");
  const haystack = normalizeSearch(text);
  return normalizeSearch(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word));
}

export function ProcedureViewShell({
  procedure,
  initialCompletedStepIds,
  opportunities,
  showOpportunities,
  dossier = null,
  existingDossiers = [],
  showAdmin = false,
}: ProcedureViewShellProps) {
  // Détermination de l'étape active initiale : première étape non complétée, ou étape 1
  const firstIncomplete = procedure.steps.find(
    (s) => !initialCompletedStepIds.includes(s.id),
  );
  const defaultStepId = firstIncomplete?.id || procedure.steps[0]?.id || "";

  const [activeStepId, setActiveStepId] = useState<string>(defaultStepId);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(
    initialCompletedStepIds,
  );
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(true);
  // Dernière étape cochée pendant cette visite : son tampon s'appose
  const [stampedStepId, setStampedStepId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("guide");
  const [opportunityQuery, setOpportunityQuery] = useState("");

  const filteredOpportunities = opportunityQuery.trim()
    ? opportunities.filter((opportunity) =>
        matchesSearch(opportunity, opportunityQuery),
      )
    : opportunities;

  const activeStep =
    procedure.steps.find((s) => s.id === activeStepId) || procedure.steps[0];

  const totalSteps = procedure.steps.length;
  const completedCount = procedure.steps.filter((s) =>
    completedStepIds.includes(s.id),
  ).length;
  const isComplete = totalSteps > 0 && completedCount === totalSteps;

  const handleSelectStep = (stepId: string) => {
    setError(null);
    setStampedStepId(null);
    setActiveStepId(stepId);
  };

  // Gestion optimiste du toggle d'étape
  const handleToggleStep = (stepId: string) => {
    if (!dossier) return;

    const isCompleted = completedStepIds.includes(stepId);
    const nextCompleted = isCompleted
      ? completedStepIds.filter((id) => id !== stepId)
      : [...completedStepIds, stepId];

    setError(null);
    setStampedStepId(isCompleted ? null : stepId);
    // Mise à jour optimiste locale immédiate
    setCompletedStepIds(nextCompleted);

    // Déclenchement de la Server Action en tâche de fond
    startTransition(async () => {
      const res = await toggleStepProgress({
        dossierId: dossier.id,
        stepId,
        completed: !isCompleted,
      });

      if (!res.success) {
        // Rollback en cas d'échec
        setCompletedStepIds(completedStepIds);
        setError(res.error ?? "L'étape n'a pas pu être enregistrée.");
      } else if (res.completedStepIds) {
        setCompletedStepIds(res.completedStepIds);
      }
    });
  };

  const progressPercent =
    totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const stepsPanel = activeStep ? (
    <ProcedureStepPanel
      procedure={procedure}
      activeStep={activeStep}
      isCompleted={completedStepIds.includes(activeStep.id)}
      isPending={isPending}
      error={error}
      onToggleStep={handleToggleStep}
      onSelectStep={handleSelectStep}
      animateStamp={stampedStepId === activeStep.id}
      startDossier={
        dossier ? undefined : (
          <StartDossierDialog
            procedureSlug={procedure.slug}
            procedureTitle={procedure.title}
            existingDossierCount={existingDossiers.length}
            triggerLabel="Suivre cette procédure"
            className="w-full sm:w-auto"
          />
        )
      }
    />
  ) : (
    <p className="text-sm text-text-muted">
      Cette procédure ne contient encore aucune étape.
    </p>
  );

  // Bouton d'ouverture de la table des matières : tiroir sur téléphone,
  // panneau latéral replié sur ordinateur
  const tocButton = (
    <Button
      variant="outline"
      onClick={() => {
        if (window.matchMedia("(min-width: 1024px)").matches) {
          setIsTocOpen(true);
        } else {
          setIsMobileDrawerOpen(true);
        }
      }}
      className={cn(
        "h-11 gap-2 rounded-xl border-border-default bg-bg-surface px-3 text-sm font-semibold",
        isTocOpen && "lg:hidden",
      )}
    >
      <List aria-hidden />
      Table des matières
      <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-primary">
        {completedCount}/{totalSteps}
      </span>
    </Button>
  );

  return (
    <AppShell showAdmin={showAdmin}>
      {/* Barre de la procédure : retour, titre, progression et actions */}
      <div className="border-b border-border-default bg-bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-4 sm:px-6">
          <div className="min-w-0 space-y-1.5">
            <div className="flex items-center gap-3">
              <Link
                href="/editor"
                aria-label="Retour au tableau de bord"
                title="Retour au tableau de bord"
                className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-text-primary transition-colors hover:bg-bg-subtle"
              >
                <ArrowLeft aria-hidden className="h-5 w-5" />
              </Link>
              <h1 className="min-w-0 font-heading text-lg leading-snug font-bold tracking-tight sm:text-xl">
                {dossier
                  ? getDossierLabel(dossier.label, procedure.title)
                  : procedure.title}
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pl-11 text-sm text-text-muted">
              {dossier ? (
                <>
                  <span className="flex items-center gap-2">
                    <ProgressRing value={progressPercent} />
                    <span>
                      {isComplete
                        ? "Dossier terminé"
                        : `${progressPercent} % de progression`}
                    </span>
                  </span>
                  {dossier.targetDate && (
                    <span>
                      Échéance : {formatDossierDate(dossier.targetDate)}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <span>
                    Guide · {procedure.country} · {totalSteps} étapes
                  </span>
                  {existingDossiers.length > 0 && (
                    <span>
                      Vos dossiers :{" "}
                      {existingDossiers.map((existing, index) => (
                        <React.Fragment key={existing.id}>
                          {index > 0 && ", "}
                          <Link
                            href={`/dossiers/${existing.id}`}
                            className="font-semibold text-accent-primary hover:underline"
                          >
                            {getDossierLabel(existing.label, procedure.title)}
                          </Link>
                        </React.Fragment>
                      ))}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto">
            <AssistanceDialog
              procedureTitle={procedure.title}
              className="w-full sm:w-auto"
            />
            {dossier ? (
              <DossierSettingsDialog
                dossierId={dossier.id}
                label={dossier.label}
                targetDate={toDateInputValue(dossier.targetDate)}
                className="w-full sm:w-auto"
              />
            ) : (
              <StartDossierDialog
                procedureSlug={procedure.slug}
                procedureTitle={procedure.title}
                existingDossierCount={existingDossiers.length}
                className="w-full sm:w-auto"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-4rem)] bg-bg-surface">
        {/* Table des matières, sur ordinateur */}
        {isTocOpen && (
          <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 flex-col border-r border-border-default lg:flex">
            <div className="flex items-center justify-between border-b border-border-default py-4 pr-4 pl-6">
              <h2 className="font-heading text-base font-bold">
                Table des matières
              </h2>
              <button
                type="button"
                onClick={() => setIsTocOpen(false)}
                aria-label="Masquer la table des matières"
                title="Masquer la table des matières"
                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary"
              >
                <X aria-hidden className="h-5 w-5" />
              </button>
            </div>
            <ProcedureStepperSidebar
              steps={procedure.steps}
              activeStepId={activeStepId}
              completedStepIds={completedStepIds}
              onSelectStep={handleSelectStep}
              className="flex-1 overflow-y-auto py-2 pr-2 pl-3"
            />
          </aside>
        )}

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-10 lg:pl-12">
          <div className="max-w-6xl space-y-6">
            {showOpportunities ? (
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(String(value))}
                className="gap-6"
              >
                <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 border-b border-border-default">
                  <TabsList
                    variant="line"
                    className="h-auto justify-start gap-6 rounded-none p-0 group-data-horizontal/tabs:h-auto sm:gap-8"
                  >
                    <TabsTrigger value="guide" className={tabTriggerClassName}>
                      Guide pas à pas
                    </TabsTrigger>
                    <TabsTrigger
                      value="opportunities"
                      className={tabTriggerClassName}
                    >
                      Opportunités liées
                      <span className="font-mono text-xs text-text-muted">
                        {opportunities.length}
                      </span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="relative w-full pb-2 sm:w-80">
                    <Search
                      aria-hidden
                      className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-[calc(50%+0.25rem)] text-text-muted"
                    />
                    <Input
                      id="opportunity-search"
                      type="search"
                      value={opportunityQuery}
                      onChange={(event) => {
                        setOpportunityQuery(event.target.value);
                        setActiveTab("opportunities");
                      }}
                      placeholder="Rechercher : ville, spécialité, société…"
                      aria-label="Rechercher dans les opportunités"
                      className="h-10 rounded-lg border-border-default bg-bg-surface pl-9"
                    />
                  </div>
                </div>

                <TabsContent value="guide" className="space-y-6">
                  {tocButton}
                  <div key={activeStepId}>{stepsPanel}</div>
                </TabsContent>

                <TabsContent value="opportunities" className="space-y-4">
                  {opportunityQuery.trim() && (
                    <p className="text-sm text-text-muted">
                      {filteredOpportunities.length === 0
                        ? `Aucun résultat pour « ${opportunityQuery.trim()} ».`
                        : `${filteredOpportunities.length} résultat${filteredOpportunities.length > 1 ? "s" : ""} sur ${opportunities.length}`}
                    </p>
                  )}
                  {(filteredOpportunities.length > 0 ||
                    !opportunityQuery.trim()) && (
                    <ProcedureOpportunities
                      opportunities={filteredOpportunities}
                    />
                  )}
                </TabsContent>
              </Tabs>
            ) : (
              <>
                {tocButton}
                <div key={activeStepId}>{stepsPanel}</div>
              </>
            )}
          </div>
        </main>
      </div>

      {/* Table des matières, sur téléphone */}
      <ProcedureMobileDrawer
        open={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        steps={procedure.steps}
        activeStepId={activeStepId}
        completedStepIds={completedStepIds}
        onSelectStep={handleSelectStep}
      />
    </AppShell>
  );
}

// Anneau de progression du dossier, comme sur les plateformes de cours
function ProgressRing({ value }: { value: number }) {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-6 w-6 -rotate-90">
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        strokeWidth="3"
        className="stroke-bg-subtle"
      />
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - value / 100)}
        className={
          value === 100 ? "stroke-state-success" : "stroke-accent-primary"
        }
      />
    </svg>
  );
}
