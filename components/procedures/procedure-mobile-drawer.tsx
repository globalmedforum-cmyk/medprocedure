"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ProcedureStepperSidebar } from "./procedure-stepper-sidebar";
import type { StepItem } from "./types";

interface ProcedureMobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  steps: StepItem[];
  activeStepId: string;
  completedStepIds: string[];
  onSelectStep: (stepId: string) => void;
}

export function ProcedureMobileDrawer({
  open,
  onOpenChange,
  steps,
  activeStepId,
  completedStepIds,
  onSelectStep,
}: ProcedureMobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-full overflow-y-auto p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] sm:max-w-md"
      >
        <SheetHeader className="pb-2">
          <SheetTitle>Table des matières</SheetTitle>
          <SheetDescription>
            Choisissez l&apos;étape à afficher.
          </SheetDescription>
        </SheetHeader>

        <ProcedureStepperSidebar
          steps={steps}
          activeStepId={activeStepId}
          completedStepIds={completedStepIds}
          onSelectStep={(id) => {
            onSelectStep(id);
            onOpenChange(false);
          }}
        />
      </SheetContent>
    </Sheet>
  );
}
