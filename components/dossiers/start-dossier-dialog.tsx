"use client";

import React, { useActionState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createDossier } from "@/actions/dossiers";
import { suggestDossierLabel } from "@/lib/dossiers";
import { cn } from "@/lib/utils";
import { DossierFields } from "./dossier-fields";

interface StartDossierDialogProps {
  procedureSlug: string;
  procedureTitle: string;
  // Nombre de dossiers déjà ouverts pour cette procédure : sert à numéroter
  existingDossierCount: number;
  triggerLabel?: string;
  triggerVariant?: "default" | "outline";
  className?: string;
}

export function StartDossierDialog({
  procedureSlug,
  procedureTitle,
  existingDossierCount,
  triggerLabel = "Ouvrir un dossier",
  triggerVariant = "default",
  className,
}: StartDossierDialogProps) {
  const [state, formAction, isPending] = useActionState(createDossier, null);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant={triggerVariant}
            className={cn(
              "h-12 gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition-[transform,background-color,border-color,color,box-shadow] hover:shadow-md sm:h-10",
              triggerVariant === "default" && "hover:bg-accent-hover",
              triggerVariant === "outline" && "bg-transparent",
              className
            )}
          />
        }
      >
        <Plus aria-hidden />
        {triggerLabel}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-2xl border border-border-default p-6 shadow-lg sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Ouvrir un dossier
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Procédure : {procedureTitle}. Vous pouvez ouvrir plusieurs dossiers
            pour une même procédure ; chacun garde son propre avancement.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <input type="hidden" name="procedureSlug" value={procedureSlug} />
          <DossierFields
            defaultLabel={suggestDossierLabel(
              procedureTitle,
              existingDossierCount
            )}
          />

          {state && !state.success && (
            <p role="alert" className="text-sm text-state-error">
              {state.error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-start sm:gap-4">
            <Button
              type="submit"
              disabled={isPending}
              className="h-12 w-full rounded-xl px-5 text-sm font-semibold hover:bg-accent-hover sm:h-10 sm:w-auto"
            >
              {isPending ? "Création…" : "Créer le dossier"}
            </Button>
            <DialogClose
              render={
                <button
                  type="button"
                  className="flex h-11 cursor-pointer items-center justify-center text-sm text-text-muted underline underline-offset-4 hover:text-text-primary sm:h-10"
                />
              }
            >
              Annuler
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
