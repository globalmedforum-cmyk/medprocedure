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

// Table des matières : les étapes reliées par un trait vertical, avec une
// pastille d'état (terminée, en cours de lecture, à venir)
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
      <ol className="relative">
        {steps.map((step, index) => {
          const isCompleted = completedSet.has(step.id);
          const isActive = step.id === activeStepId;
          const isLast = index === steps.length - 1;

          return (
            <li key={step.id} className="relative">
              {!isLast && (
                <span
                  aria-hidden
                  className="absolute top-11 -bottom-3 left-[calc(1.75rem-0.5px)] z-[1] w-px bg-text-muted/30"
                />
              )}
              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "relative grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)] items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors",
                  isActive ? "bg-accent-soft" : "hover:bg-bg-subtle",
                )}
              >
                <span
                  className={cn(
                    "relative z-10 flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                    isCompleted
                      ? "ink -rotate-12 border-[3px] border-double border-accent-primary bg-bg-surface text-accent-primary"
                      : isActive
                        ? "border-2 border-accent-primary bg-bg-surface text-accent-primary"
                        : "border-border-default bg-bg-surface text-text-muted",
                  )}
                >
                  {isCompleted ? (
                    <Check
                      aria-label="Terminée"
                      className="h-4 w-4 stroke-[3]"
                    />
                  ) : (
                    step.order
                  )}
                </span>

                <span className="space-y-0.5 pt-1">
                  <span
                    className={cn(
                      "block text-[0.95rem] leading-snug",
                      isActive
                        ? "font-bold text-text-primary"
                        : "text-text-primary",
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
