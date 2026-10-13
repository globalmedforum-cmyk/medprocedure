import React from "react";
import { Input } from "@/components/ui/input";
import { DOSSIER_LABEL_MAX_LENGTH } from "@/lib/dossiers";

interface DossierFieldsProps {
  defaultLabel?: string;
  defaultTargetDate?: string;
}

export function DossierFields({
  defaultLabel = "",
  defaultTargetDate = "",
}: DossierFieldsProps) {
  return (
    <>
      <label className="block space-y-1.5">
        <span className="block text-sm font-medium">Nom du dossier</span>
        <Input
          name="label"
          defaultValue={defaultLabel}
          maxLength={DOSSIER_LABEL_MAX_LENGTH}
          placeholder="Exemple : Congrès de cardiologie, Paris"
          className="h-11 md:text-sm"
        />
        <span className="block text-xs text-text-muted">
          Facultatif. Il vous sert à distinguer plusieurs dossiers d&apos;une
          même procédure.
        </span>
      </label>

      <label className="block space-y-1.5">
        <span className="block text-sm font-medium">
          Échéance visée
          <span className="font-normal text-text-muted"> (facultatif)</span>
        </span>
        <Input
          name="targetDate"
          type="date"
          defaultValue={defaultTargetDate}
          className="h-11 md:text-sm"
        />
      </label>
    </>
  );
}
