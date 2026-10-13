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

export interface OpportunityItem {
  id: string;
  title: string;
  hospital: string;
  location: string;
  country: string;
  specialty: string;
  deadline?: Date | string | null;
  requirements: string[];
  contactEmail?: string | null;
}
