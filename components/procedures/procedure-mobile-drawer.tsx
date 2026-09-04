"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  ProcedureStepperSidebar,
  StepItem,
} from "./procedure-stepper-sidebar";

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
      <SheetContent side="left" className="p-4 w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-2">
          <SheetTitle>Étapes de la Procédure</SheetTitle>
          <SheetDescription>
            Consultez le déroulé chronologique et sélectionnez une étape.
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
          className="border-0 shadow-none p-0 bg-transparent"
        />
      </SheetContent>
    </Sheet>
  );
}

