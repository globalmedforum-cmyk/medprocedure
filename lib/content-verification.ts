import { getAllProcedureResources } from "@/lib/procedure-resources";

// Mois de la dernière vérification du contenu des procédures auprès des
// sources officielles. À mettre à jour à chaque relecture.
export const CONTENT_VERIFIED_AT = "octobre 2026";

// Administrations et organismes dont les pages ont servi à rédiger les guides
export const OFFICIAL_AUTHORITIES = [
  "OFSP / MEBEKO",
  "SEM",
  "ISFM",
  "CNG",
  "ARS",
  "Service-public.fr",
  "France-Visas",
  "Commission européenne",
];

export function countOfficialLinks() {
  return new Set(getAllProcedureResources().map((resource) => resource.href))
    .size;
}
