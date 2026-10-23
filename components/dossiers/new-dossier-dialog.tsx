"use client";

import React, { useActionState, useState } from "react";
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

interface NewDossierDialogProps {
  procedures: { slug: string; title: string; dossierCount: number }[];
  // L'utilisateur a déjà au moins un dossier : « Ouvrir un autre dossier »
  hasDossiers?: boolean;
  className?: string;
}

// Ouverture d'un dossier avec choix de la procédure, depuis le tableau de bord
export function NewDossierDialog({
  procedures,
  hasDossiers = false,
  className,
}: NewDossierDialogProps) {
  const [state, formAction, isPending] = useActionState(createDossier, null);
  const [procedureSlug, setProcedureSlug] = useState(procedures[0]?.slug ?? "");
  const selected = procedures.find((p) => p.slug === procedureSlug);

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-11 gap-2 rounded-xl bg-bg-surface px-4 text-sm font-semibold shadow-sm transition-[transform,background-color,border-color,color,box-shadow] hover:shadow-md sm:h-10",
              className
            )}
          />
        }
      >
        <Plus aria-hidden />
        {hasDossiers ? "Ouvrir un autre dossier" : "Ouvrir un dossier"}
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-2xl border border-border-default p-6 shadow-lg sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl font-bold">
            Ouvrir un dossier
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Choisissez la procédure à suivre. Vous pouvez ouvrir plusieurs
            dossiers pour une même procédure.
          </DialogDescription>
        </DialogHeader>

        <form action={formAction} className="space-y-5">
          <label className="block space-y-1.5">
            <span className="block text-sm font-medium">Procédure</span>
            <select
              name="procedureSlug"
              value={procedureSlug}
              onChange={(event) => setProcedureSlug(event.target.value)}
              className="h-11 w-full rounded-xl border border-input bg-bg-surface px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
            >
              {procedures.map((procedure) => (
                <option key={procedure.slug} value={procedure.slug}>
                  {procedure.title}
                </option>
              ))}
            </select>
          </label>

          {/* La clé réinitialise le nom proposé à chaque changement de procédure */}
          <DossierFields
            key={procedureSlug}
            defaultLabel={
              selected
                ? suggestDossierLabel(selected.title, selected.dossierCount)
                : ""
            }
          />

          {state && !state.success && (
            <p role="alert" className="text-sm text-state-error">
              {state.error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-start sm:gap-4">
            <Button
              type="submit"
              disabled={isPending || !selected}
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
