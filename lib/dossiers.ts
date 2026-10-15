import type { ProcedureStatus } from "@prisma/client";

export const MAX_DOSSIERS_PER_USER = 40;
export const DOSSIER_LABEL_MAX_LENGTH = 80;

export const dossierStatusLabels: Record<ProcedureStatus, string> = {
  NOT_STARTED: "Non commencé",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminé",
};

// Nom proposé pour un nouveau dossier : la procédure suivie d'un numéro,
// par exemple « Doctorat (PhD) 2 » pour le deuxième dossier de cette procédure
export function suggestDossierLabel(
  procedureTitle: string,
  existingDossierCount: number
) {
  const suffix = ` ${existingDossierCount + 1}`;
  return (
    procedureTitle.slice(0, DOSSIER_LABEL_MAX_LENGTH - suffix.length) + suffix
  );
}

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

// État réel d'un dossier, calculé à partir des étapes cochées. Le statut
// enregistré n'est recalculé que lorsque l'utilisateur coche une étape : il
// peut être périmé après l'ajout ou le retrait d'une étape par l'admin.
export function getDossierState({
  done,
  total,
  status,
}: {
  done: number;
  total: number;
  status: ProcedureStatus;
}): ProcedureStatus {
  if (total > 0 && done === total) return "COMPLETED";
  if (status !== "NOT_STARTED" || done > 0) return "IN_PROGRESS";
  return "NOT_STARTED";
}
