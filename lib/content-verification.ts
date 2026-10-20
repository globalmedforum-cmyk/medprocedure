import { getAllProcedureResources } from "@/lib/procedure-resources";

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
