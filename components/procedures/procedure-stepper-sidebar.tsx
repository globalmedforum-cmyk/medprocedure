"use client";

import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface StepItem {
  id: string;
  order: number;
  title: string;
  description: string;
  content?: string | null;
  videoUrl?: string | null;
  estimatedDuration?: string | null;
  isRequired: boolean;
}

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
  const completedCount = steps.filter((s) => completedSet.has(s.id)).length;
  const nextIncompleteStep = steps.find((s) => !completedSet.has(s.id));

  return (
    <aside
      className={cn(
        "flex flex-col bg-bg-surface border border-border-default rounded-2xl p-5 shadow-xs",
        className
      )}
    >
      {/* Header card */}
      <div className="space-y-3 pb-4 border-b border-border-default">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-base font-semibold text-text-primary">
            Avancement de la démarche
          </h2>
          <Badge variant="accent" className="font-mono text-xs">
            {completedCount}/{steps.length}
          </Badge>
        </div>
        <p className="text-xs text-text-muted leading-relaxed">
          Suivez chronologiquement les étapes administratives et hospitalières.
        </p>

        {/* Action / Next step prompt */}
        {nextIncompleteStep && (
          <div className="rounded-xl bg-bg-base border border-border-default/80 p-3 space-y-2">
            <div className="text-[11px] font-medium text-text-muted uppercase tracking-wider">
              Prochaine action requise
            </div>
            <div className="text-xs font-semibold text-text-primary line-clamp-1">
              {nextIncompleteStep.order}. {nextIncompleteStep.title}
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSelectStep(nextIncompleteStep.id)}
              className="w-full text-xs h-7 gap-1.5 text-accent-primary border-accent-primary/30 hover:bg-accent-primary/10"
            >
              <span>Reprendre ici</span>
              <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Chronological Stepper List */}
      <div className="pt-4 space-y-1 relative">
        {steps.map((step, index) => {
          const isCompleted = completedSet.has(step.id);
          const isActive = step.id === activeStepId;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="relative">
              {/* Vertical connecting line */}
              {!isLast && (
                <div
                  className={cn(
                    "absolute left-[15px] top-[30px] bottom-[-8px] w-[2px] transition-colors duration-200",
                    isCompleted ? "bg-state-success/40" : "bg-border-default"
                  )}
                />
              )}

              <button
                type="button"
                onClick={() => onSelectStep(step.id)}
                className={cn(
                  "w-full text-left p-2.5 rounded-xl transition-all duration-150 flex items-start gap-3 group relative cursor-pointer",
                  isActive
                    ? "bg-accent-primary/10 border border-accent-primary/30 shadow-xs"
                    : "hover:bg-bg-base border border-transparent"
                )}
              >
                {/* Step indicator circle */}
                <div className="relative z-10 shrink-0 mt-0.5">
                  {isCompleted ? (
                    <div className="h-7 w-7 rounded-full bg-state-success text-white flex items-center justify-center shadow-xs">
                      <Check className="h-4 w-4 stroke-[2.5]" />
                    </div>
                  ) : isActive ? (
                    <div className="h-7 w-7 rounded-full bg-bg-surface border-2 border-accent-primary flex items-center justify-center shadow-xs">
                      <div className="h-2.5 w-2.5 rounded-full bg-accent-primary animate-pulse" />
                    </div>
                  ) : (
                    <div className="h-7 w-7 rounded-full bg-bg-surface border border-dashed border-border-default flex items-center justify-center text-xs font-mono text-text-muted group-hover:border-accent-primary/50">
                      <span>{step.order}</span>
                    </div>
                  )}
                </div>

                {/* Step Text Details */}
                <div className="flex-1 min-w-0 pr-1">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={cn(
                        "text-xs font-semibold truncate",
                        isActive
                          ? "text-accent-primary"
                          : isCompleted
                          ? "text-text-primary"
                          : "text-text-muted group-hover:text-text-primary"
                      )}
                    >
                      {step.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5 text-[11px] text-text-muted">
                    {step.estimatedDuration && (
                      <span>{step.estimatedDuration}</span>
                    )}
                    {isCompleted && (
                      <span className="text-state-success font-medium">
                        &bull; Validé
                      </span>
                    )}
                    {isActive && !isCompleted && (
                      <span className="text-accent-primary font-medium">
                        &bull; En cours
                      </span>
                    )}
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
