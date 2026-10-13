"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepItem } from "./types";

interface ProcedureStepperSidebarProps {
  steps: StepItem[];
  activeStepId: string;
  completedStepIds: string[];
  onSelectStep: (stepId: string) => void;
  className?: string;
}

export function ProcedureStepperSidebar({
  steps,
  activeStepId,
  completedStepIds,
  onSelectStep,
  className,
}: ProcedureStepperSidebarProps) {
  const completedSet = new Set(completedStepIds);

  return (
    <nav aria-label="Étapes de la procédure" className={className}>
      <ol className="border-t border-border-default">
        {steps.map((step) => {
          const isCompleted = completedSet.has(step.id);
          const isActive = step.id === activeStepId;

          return (
            <li key={step.id} className="border-b border-border-default">
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "grid w-full cursor-pointer grid-cols-[1.5rem_minmax(0,1fr)] gap-3 border-l-2 py-3 pr-2 pl-3 text-left transition-colors",
                  isActive
                    ? "border-accent-primary bg-bg-surface"
                    : "border-transparent hover:bg-bg-surface"
                )}
              >
                <span className="flex h-5 items-center font-mono text-xs text-text-muted">
                  {isCompleted ? (
                    <Check
                      aria-label="Terminée"
                      className="h-4 w-4 stroke-[2.5] text-state-success"
                    />
                  ) : (
                    String(step.order).padStart(2, "0")
                  )}
                </span>

                <span className="space-y-0.5">
                  <span
                    className={cn(
                      "block text-sm leading-snug",
                      isActive && "font-medium",
                      isCompleted && !isActive
                        ? "text-text-muted"
                        : "text-text-primary"
                    )}
                  >
                    {step.title}
                  </span>
                  {step.estimatedDuration && (
                    <span className="block text-xs text-text-muted">
                      {step.estimatedDuration}
                    </span>
                  )}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
