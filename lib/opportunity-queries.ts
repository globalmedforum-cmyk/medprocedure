import { prisma } from "@/lib/prisma";
import {
  getOpportunityCategoriesForProcedure,
  isOpportunityFullyPublic,
  startOfToday,
} from "@/lib/opportunity-categories";
import type { OpportunityItem } from "@/components/procedures/types";

// Opportunités ouvertes rattachées à une procédure. Seul l'aperçu quitte le
// serveur, sauf pour les catégories entièrement publiques.
export async function getProcedureOpportunities(
  procedureSlug: string
): Promise<OpportunityItem[]> {
  const categories = getOpportunityCategoriesForProcedure(procedureSlug);
  if (categories.length === 0) return [];

  const rows = await prisma.opportunity.findMany({
    where: {
      category: { in: categories },
      OR: [{ deadline: null }, { deadline: { gte: startOfToday() } }],
    },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
  });

  return rows.map((row) => ({
    id: row.id,
    category: row.category,
    title: row.title,
    specialty: row.specialty,
    location: row.location,
    country: row.country,
    deadline: row.deadline,
    details: isOpportunityFullyPublic(row.category)
      ? {
          hospital: row.hospital,
          requirements: row.requirements,
          contactEmail: row.contactEmail,
        }
      : undefined,
  }));
}
