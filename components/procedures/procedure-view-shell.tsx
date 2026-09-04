"use client";

import React, { useState, useTransition } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProcedureStepperSidebar } from "./procedure-stepper-sidebar";
import { ProcedureMobileDrawer } from "./procedure-mobile-drawer";
import {
  ProcedureMainPanel,
  ProcedureData,
  OpportunityItem,
} from "./procedure-main-panel";
import { toggleStepProgress } from "@/actions/procedure-progress";

interface ProcedureViewShellProps {
  procedure: ProcedureData;
  initialCompletedStepIds: string[];
  opportunities: OpportunityItem[];
}

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
  const [isPending, startTransition] = useTransition();

  const activeStep =
    procedure.steps.find((s) => s.id === activeStepId) || procedure.steps[0];

  // Gestion optimiste du toggle d'étape
  const handleToggleStep = (stepId: string) => {
    const isCompleted = completedStepIds.includes(stepId);
    const nextCompleted = isCompleted
      ? completedStepIds.filter((id) => id !== stepId)
      : [...completedStepIds, stepId];

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
        console.error("Erreur mise à jour de l'étape :", res.error);
      } else if (res.completedStepIds) {
        setCompletedStepIds(res.completedStepIds);
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-base text-text-primary">
      {/* Top Application Navbar */}
      <header className="sticky top-0 z-30 h-14 border-b border-border-default bg-bg-surface/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors"
          >
            <div className="h-7 w-7 rounded-lg bg-accent-primary flex items-center justify-center text-white font-bold text-xs shadow-xs">
              M
            </div>
            <span className="font-heading font-semibold text-sm tracking-tight hidden sm:inline text-text-primary">
              MedProcedure
            </span>
          </Link>

          <span className="text-border-default hidden sm:inline">&bull;</span>

          <span className="text-xs font-medium text-text-muted truncate max-w-[200px] sm:max-w-md">
            {procedure.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden text-xs h-8 gap-1.5 border-border-default"
          >
            <Menu className="h-4 w-4" />
            <span>Étapes</span>
          </Button>

          <UserButton />
        </div>
      </header>

      {/* Main 2-Column Body Layout */}
      <div className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Fixed-width Stepper (Desktop) */}
          <div className="hidden lg:block w-80 shrink-0 sticky top-20">
            <ProcedureStepperSidebar
              steps={procedure.steps}
              activeStepId={activeStepId}
              completedStepIds={completedStepIds}
              onSelectStep={setActiveStepId}
            />
          </div>

          {/* Right Column: Main Content Panel */}
          {activeStep && (
            <ProcedureMainPanel
              procedure={procedure}
              activeStep={activeStep}
              completedStepIds={completedStepIds}
              opportunities={opportunities}
              isPending={isPending}
              onToggleStep={handleToggleStep}
              onSelectStep={setActiveStepId}
              onOpenMobileMenu={() => setIsMobileDrawerOpen(true)}
            />
          )}
        </div>
      </div>

      {/* Mobile Drawer (Sheet) */}
      <ProcedureMobileDrawer
        open={isMobileDrawerOpen}
        onOpenChange={setIsMobileDrawerOpen}
        steps={procedure.steps}
        activeStepId={activeStepId}
        completedStepIds={completedStepIds}
        onSelectStep={setActiveStepId}
      />
    </div>
  );
}
