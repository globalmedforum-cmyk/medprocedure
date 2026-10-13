"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SiteHeader } from "@/components/shared/site-header";
import { ProcedureStepperSidebar } from "./procedure-stepper-sidebar";
import { ProcedureMobileDrawer } from "./procedure-mobile-drawer";
import { ProcedureStepPanel } from "./procedure-step-panel";
import { AssistanceDialog } from "./assistance-dialog";
import { ProcedureOpportunities } from "./procedure-opportunities";
import type { OpportunityItem, ProcedureData } from "./types";
import { toggleStepProgress } from "@/actions/procedure-progress";

interface ProcedureViewShellProps {
  procedure: ProcedureData;
  initialCompletedStepIds: string[];
  opportunities: OpportunityItem[];
}

const tabTriggerClassName =
  "h-12 flex-none rounded-none px-0 text-sm group-data-horizontal/tabs:after:bottom-[-1px] group-data-horizontal/tabs:after:bg-accent-primary";

export function ProcedureViewShell({
  procedure,
  initialCompletedStepIds,
  opportunities,
}: ProcedureViewShellProps) {
  // Détermination de l'étape active initiale : première étape non complétée, ou étape 1
  const firstIncomplete = procedure.steps.find(
    (s) => !initialCompletedStepIds.includes(s.id)
  );
  const defaultStepId = firstIncomplete?.id || procedure.steps[0]?.id || "";

  const [activeStepId, setActiveStepId] = useState<string>(defaultStepId);
  const [completedStepIds, setCompletedStepIds] = useState<string[]>(
    initialCompletedStepIds
  );
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const activeStep =
    procedure.steps.find((s) => s.id === activeStepId) || procedure.steps[0];

  const totalSteps = procedure.steps.length;
  const completedCount = procedure.steps.filter((s) =>
    completedStepIds.includes(s.id)
  ).length;
  const isComplete = totalSteps > 0 && completedCount === totalSteps;

  const handleSelectStep = (stepId: string) => {
    setError(null);
    setActiveStepId(stepId);
  };

  // Gestion optimiste du toggle d'étape
  const handleToggleStep = (stepId: string) => {
    const isCompleted = completedStepIds.includes(stepId);
    const nextCompleted = isCompleted
      ? completedStepIds.filter((id) => id !== stepId)
      : [...completedStepIds, stepId];

    setError(null);
    // Mise à jour optimiste locale immédiate
    setCompletedStepIds(nextCompleted);

    // Déclenchement de la Server Action en tâche de fond
    startTransition(async () => {
      const res = await toggleStepProgress({
        procedureSlug: procedure.slug,
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

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-4 sm:px-8 sm:py-12">
        <header className="space-y-5 sm:space-y-6">
          <nav aria-label="Fil d'Ariane" className="text-sm text-text-muted">
            <Link
              href="/editor"
              className="inline-flex h-11 items-center underline underline-offset-4 hover:text-text-primary sm:h-auto"
            >
              Procédures
            </Link>
            <span aria-hidden> / </span>
            <span>{procedure.category}</span>
          </nav>

          <div className="flex flex-wrap items-start justify-between gap-x-10 gap-y-5">
            <div className="max-w-3xl space-y-3">
              <h1 className="font-heading text-2xl leading-tight font-medium tracking-tight sm:text-4xl">
                {procedure.title}
              </h1>
              <p className="text-base leading-relaxed text-text-muted">
                {procedure.description}
              </p>
            </div>
            <AssistanceDialog
              procedureTitle={procedure.title}
              className="w-full sm:w-auto"
            />
          </div>

          <div className="space-y-2 sm:max-w-sm">
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span>{procedure.country}</span>
              <span className="font-mono text-xs text-text-muted">
                {isComplete
                  ? "Procédure terminée"
                  : `${completedCount} sur ${totalSteps} étapes terminées`}
              </span>
            </div>
            <Progress
              value={completedCount}
              max={totalSteps || 1}
              aria-label="Avancement de la procédure"
              className="h-1 border-0"
              indicatorClassName={isComplete ? "bg-state-success" : undefined}
            />
          </div>
        </header>

        <Tabs defaultValue="guide" className="mt-6 gap-6 sm:mt-10 sm:gap-8">
          <TabsList
            variant="line"
            className="h-auto w-full justify-start gap-6 rounded-none sm:gap-8 border-b border-border-default p-0 group-data-horizontal/tabs:h-auto"
          >
            <TabsTrigger value="guide" className={tabTriggerClassName}>
              Guide pas à pas
            </TabsTrigger>
            <TabsTrigger value="opportunities" className={tabTriggerClassName}>
              Opportunités liées
              <span className="font-mono text-xs text-text-muted">
                {opportunities.length}
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide">
            <div className="grid items-start gap-x-12 gap-y-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
              <ProcedureStepperSidebar
                steps={procedure.steps}
                activeStepId={activeStepId}
                completedStepIds={completedStepIds}
                onSelectStep={handleSelectStep}
                className="sticky top-6 hidden lg:block"
              />

              <Button
                variant="outline"
                onClick={() => setIsMobileDrawerOpen(true)}
                className="h-12 w-full justify-between bg-transparent px-4 text-sm lg:hidden"
              >
                <span className="flex items-center gap-2">
                  <List aria-hidden />
                  Toutes les étapes
                </span>
                <span className="font-mono text-xs text-text-muted">
                  {completedCount}/{totalSteps}
                </span>
              </Button>

              {activeStep ? (
                <ProcedureStepPanel
                  procedure={procedure}
                  activeStep={activeStep}
                  isCompleted={completedStepIds.includes(activeStep.id)}
                  isPending={isPending}
                  error={error}
                  onToggleStep={handleToggleStep}
                  onSelectStep={handleSelectStep}
                />
              ) : (
                <p className="text-sm text-text-muted">
                  Cette procédure ne contient encore aucune étape.
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="opportunities">
            <ProcedureOpportunities opportunities={opportunities} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Drawer (Sheet) */}
      <ProcedureMobileDrawer
        open={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        steps={procedure.steps}
        activeStepId={activeStepId}
        completedStepIds={completedStepIds}
        onSelectStep={handleSelectStep}
      />
    </div>
  );
}
