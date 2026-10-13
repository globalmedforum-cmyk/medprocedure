import type { OpportunityCategory } from "@prisma/client";

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

export interface ProcedureData {
  id: string;
  slug: string;
  title: string;
  description: string;
  country: string;
  category: string;
  steps: StepItem[];
}

// Aperçu public d'une opportunité. Pour les offres à accès réservé,
// l'établissement, le contact et les conditions ne sont jamais envoyés au
// navigateur : `details` est absent et l'équipe les communique sur demande.
// Les congrès sont publiés en entier.
export interface OpportunityItem {
  id: string;
  category: OpportunityCategory;
  title: string;
  specialty: string;
  location: string;
  country: string;
  deadline?: Date | string | null;
  details?: {
    hospital: string;
    requirements: string[];
    contactEmail: string | null;
  };
}
