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

// Catégories affichées dans l'onglet « Opportunités liées » de chaque procédure.
// Une procédure absente de cette table n'a pas d'onglet : stage d'observation,
// enregistrement MEBEKO. Les DFMS et DFMSA mènent à un poste de FFI.
const categoriesByProcedureSlug: Record<string, OpportunityCategory[]> = {
  "ffi-france": ["FFI"],
  "dfms-dfmsa": ["FFI"],
  "stage-associe": ["STAGE_ASSOCIE"],
  "medecin-assistant-suisse": ["MEDECIN_ASSISTANT"],
  "doctorat-phd": ["PHD", "FELLOWSHIP"],
  "participation-congres": ["CONGRES"],
};

export function getOpportunityCategoriesForProcedure(slug: string) {
  return categoriesByProcedureSlug[slug] ?? [];
}

export function procedureHasOpportunities(slug: string) {
  return getOpportunityCategoriesForProcedure(slug).length > 0;
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

// Catégories publiées en entier ; les autres n'affichent qu'un aperçu, sauf
// une opportunité marquée publique dans l'administration
const fullyPublicCategories: OpportunityCategory[] = ["CONGRES"];

export function isOpportunityFullyPublic(opportunity: {
  category: OpportunityCategory;
  isPublic: boolean;
}) {
  return (
    opportunity.isPublic || fullyPublicCategories.includes(opportunity.category)
  );
}

// Référence courte, citée par le client quand il demande le détail d'une offre
export function getOpportunityReference(id: string) {
  return id.slice(-6).toUpperCase();
}
