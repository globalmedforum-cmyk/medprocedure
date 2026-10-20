import { prisma } from "@/lib/prisma";

// Procédures affichées sur la page d'accueil, avec le titre et la durée de
// chaque étape pour l'aperçu de la table des matières
export function getLandingProcedures() {
  return prisma.procedure.findMany({
    orderBy: { createdAt: "asc" },
    include: {
      steps: {
        select: { order: true, title: true, estimatedDuration: true },
        orderBy: { order: "asc" },
      },
    },
  });
}

export type LandingProcedure = Awaited<
  ReturnType<typeof getLandingProcedures>
>[number];
