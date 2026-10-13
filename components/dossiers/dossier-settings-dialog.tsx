"use client";

import React, { useActionState, useState, useTransition } from "react";
import { Settings2 } from "lucide-react";
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
import { deleteDossier, updateDossier } from "@/actions/dossiers";
import { cn } from "@/lib/utils";
import { DossierFields } from "./dossier-fields";

interface DossierSettingsDialogProps {
  dossierId: string;
  label: string;
  targetDate: string;
  className?: string;
}

export function DossierSettingsDialog({
  dossierId,
  label,
  targetDate,
  className,
}: DossierSettingsDialogProps) {
  const [updateState, updateAction, isUpdating] = useActionState(
    updateDossier,
    null
  );
  const [deleteState, deleteAction, isDeleting] = useActionState(
    deleteDossier,
    null
  );
  const [, startTransition] = useTransition();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);

  // Soumission manuelle : les champs gardent la saisie après l'enregistrement
  const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => updateAction(formData));
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.set("dossierId", dossierId);
    startTransition(() => deleteAction(formData));
  };

  return (
    <Dialog onOpenChange={(open) => !open && setIsConfirmingDelete(false)}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className={cn(
              "h-12 gap-2 bg-transparent px-4 text-sm sm:h-10",
              className
            )}
          />
        }
      >
        <Settings2 aria-hidden />
        Modifier le dossier
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="gap-5 rounded-md border border-border-default p-6 sm:max-w-md"
      >
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            Modifier le dossier
          </DialogTitle>
          <DialogDescription className="text-sm leading-relaxed">
            Renommez ce dossier ou fixez-lui une échéance. Votre avancement
            n&apos;est pas modifié.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-5">
          <input type="hidden" name="dossierId" value={dossierId} />
          <DossierFields defaultLabel={label} defaultTargetDate={targetDate} />

          {updateState?.success && (
            <p role="status" className="text-sm text-state-success">
              {updateState.message}
            </p>
          )}
          {updateState && !updateState.success && (
            <p role="alert" className="text-sm text-state-error">
              {updateState.error}
            </p>
          )}

          <div className="flex flex-col gap-2 sm:flex-row-reverse sm:justify-start sm:gap-4">
            <Button
              type="submit"
              disabled={isUpdating}
              className="h-12 w-full px-5 text-sm sm:h-10 sm:w-auto"
            >
              {isUpdating ? "Enregistrement…" : "Enregistrer"}
            </Button>
            <DialogClose
              render={
                <button
                  type="button"
                  className="flex h-11 cursor-pointer items-center justify-center text-sm text-text-muted underline underline-offset-4 hover:text-text-primary sm:h-10"
                />
              }
            >
              Fermer
            </DialogClose>
          </div>
        </form>

        <div className="space-y-3 border-t border-border-default pt-5">
          {isConfirmingDelete ? (
            <>
              <p className="text-sm leading-relaxed">
                Supprimer ce dossier efface définitivement son avancement.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="destructive"
                  disabled={isDeleting}
                  onClick={handleDelete}
                  className="h-11 px-4 text-sm sm:h-10"
                >
                  {isDeleting ? "Suppression…" : "Confirmer la suppression"}
                </Button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setIsConfirmingDelete(false)}
                  className="flex h-11 cursor-pointer items-center text-sm text-text-muted underline underline-offset-4 hover:text-text-primary"
                >
                  Annuler
                </button>
              </div>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsConfirmingDelete(true)}
              className="flex h-11 cursor-pointer items-center text-sm text-state-error underline underline-offset-4 hover:text-text-primary"
            >
              Supprimer ce dossier
            </button>
          )}
          {deleteState && !deleteState.success && (
            <p role="alert" className="text-sm text-state-error">
              {deleteState.error}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
