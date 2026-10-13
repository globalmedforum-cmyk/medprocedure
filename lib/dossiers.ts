import type { ProcedureStatus } from "@prisma/client";

export const MAX_DOSSIERS_PER_USER = 40;
export const DOSSIER_LABEL_MAX_LENGTH = 80;

export const dossierStatusLabels: Record<ProcedureStatus, string> = {
  NOT_STARTED: "Non commencé",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminé",
};

// Nom affiché d'un dossier : son nom s'il en a un, sinon celui de la procédure
export function getDossierLabel(label: string, procedureTitle: string) {
  return label.trim() || procedureTitle;
}

const dossierDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDossierDate(date: Date | string) {
  return dossierDateFormatter.format(new Date(date));
}

// Valeur attendue par un champ <input type="date">
export function toDateInputValue(date: Date | string | null | undefined) {
  return date ? new Date(date).toISOString().slice(0, 10) : "";
}
