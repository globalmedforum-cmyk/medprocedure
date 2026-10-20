"use client";

import React from "react";
import { LifeBuoy } from "lucide-react";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { buildAssistanceMessage } from "@/lib/contact";
import { cn } from "@/lib/utils";

interface AssistanceDialogProps {
  procedureTitle: string;
  stepLabel?: string;
  className?: string;
}

export function AssistanceDialog({
  procedureTitle,
  stepLabel,
  className,
}: AssistanceDialogProps) {
  return (
    <ContactDialog
      trigger={
        <>
          <LifeBuoy aria-hidden />
          Obtenir une assistance
        </>
      }
      triggerClassName={cn(
        "h-12 gap-2 rounded-xl border-border-default bg-bg-surface px-4 text-sm font-semibold shadow-sm transition-all hover:shadow-md sm:h-10",
        className,
      )}
      title="Obtenir une assistance"
      description="Notre équipe peut vous accompagner dans cette procédure. Choisissez comment nous écrire : votre message est déjà préparé, vous pouvez le compléter avant de l'envoyer."
      emailSubject={`Demande d'accompagnement : ${procedureTitle}`}
      message={buildAssistanceMessage(procedureTitle, stepLabel)}
    />
  );
}
