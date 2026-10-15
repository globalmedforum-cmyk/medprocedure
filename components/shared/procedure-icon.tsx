import React from "react";
import {
  Award,
  BookOpenCheck,
  Briefcase,
  Eye,
  FileBadge,
  GraduationCap,
  Plane,
  Stethoscope,
} from "lucide-react";

interface ProcedureIconProps {
  slug: string;
  className?: string;
}

// Icône d'illustration de chaque procédure, sur les cartes
export function ProcedureIcon({ slug, className }: ProcedureIconProps) {
  const props = { "aria-hidden": true, className };

  switch (slug) {
    case "doctorat-phd":
      return <GraduationCap {...props} />;
    case "medecin-assistant-suisse":
      return <Stethoscope {...props} />;
    case "stage-observation":
      return <Eye {...props} />;
    case "ffi-france":
      return <Briefcase {...props} />;
    case "dfms-dfmsa":
      return <BookOpenCheck {...props} />;
    case "stage-associe":
      return <Award {...props} />;
    case "participation-congres":
      return <Plane {...props} />;
    default:
      return <FileBadge {...props} />;
  }
}
