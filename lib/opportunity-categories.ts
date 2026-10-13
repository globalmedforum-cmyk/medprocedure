import type { OpportunityCategory } from "@prisma/client";

export const opportunityCategoryLabels: Record<OpportunityCategory, string> = {
  FFI: "FFI",
  STAGE_ASSOCIE: "Stage associé",
  MEDECIN_ASSISTANT: "Médecin assistant",
  FELLOWSHIP: "Fellowship",
  PHD: "PhD",
  CONGRES: "Congrès",
};

// Regroupement utilisé dans l'administration
export const opportunityCategoryGroups: {
  title: string;
  categories: OpportunityCategory[];
}[] = [
  {
    title: "Postes hospitaliers",
    categories: [
      "FFI",
      "STAGE_ASSOCIE",
      "MEDECIN_ASSISTANT",
    ],
  },
  {
    title: "Fellowship et PhD",
    categories: ["FELLOWSHIP", "PHD"],
  },
  {
    title: "Congrès",
    categories: ["CONGRES"],
  },
];

// Catégories affichées dans l'onglet « Opportunités liées » de chaque procédure
const categoriesByProcedureSlug: Record<string, OpportunityCategory[]> = {
  "ffi-france": ["FFI"],
  "stage-associe": ["STAGE_ASSOCIE"],
  "mebeko-suisse": ["MEDECIN_ASSISTANT"],
  "doctorat-phd": ["PHD", "FELLOWSHIP"],
  "participation-congres": ["CONGRES"],
};

export function getOpportunityCategoriesForProcedure(slug: string) {
  return categoriesByProcedureSlug[slug] ?? [];
}

export const opportunityCategories = Object.keys(
  opportunityCategoryLabels
) as OpportunityCategory[];

export function parseOpportunityCategory(value: unknown) {
  return opportunityCategories.find((category) => category === value);
}

// Une opportunité reste visible jusqu'à la fin du jour de sa date limite
export function startOfToday() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}

export function isOpportunityExpired(deadline: Date | null, today: Date) {
  return deadline !== null && deadline < today;
}
