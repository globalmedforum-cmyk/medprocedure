import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  getOpportunityCategoriesForProcedure,
  isOpportunityFullyPublic,
  procedureHasOpportunities,
  startOfToday,
} from "@/lib/opportunity-categories";
import { TermsWindow } from "@/components/terms/terms-window";
import { hasAcceptedTerms } from "@/lib/terms-acceptance";
import { ProcedureViewShell } from "@/components/procedures/procedure-view-shell";

interface ProcedurePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProcedurePageProps) {
  const { slug } = await params;
  const procedure = await prisma.procedure.findUnique({
    where: { slug },
    select: { title: true, description: true },
  });

  if (!procedure) {
    return {
      title: "Procédure médicale introuvable | MedProcedure",
    };
  }

  return {
    title: `${procedure.title} | MedProcedure`,
    description: procedure.description,
  };
}

export default async function ProcedureDetailPage({
  params,
}: ProcedurePageProps) {
  const { slug } = await params;

  if (!(await hasAcceptedTerms())) {
    return <TermsWindow next={`/procedures/${slug}`} />;
  }

  // 1. Récupération de la procédure avec ses étapes ordonnées
  const procedure = await prisma.procedure.findUnique({
    where: { slug },
    include: {
      steps: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!procedure) {
    notFound();
  }

  // 2. Récupération de la progression de l'utilisateur authentifié
  const { userId } = await auth();
  let completedStepIds: string[] = [];

  if (userId) {
    const dbUser = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { id: true },
    });

    if (dbUser) {
      const userProgress = await prisma.userProcedureProgress.findUnique({
        where: {
          userId_procedureId: {
            userId: dbUser.id,
            procedureId: procedure.id,
          },
        },
        select: { completedStepIds: true },
      });

      completedStepIds = userProgress?.completedStepIds || [];
    }
  }

  // 3. Récupération des opportunités associées, par catégorie, hors dates passées
  const opportunityRows = await prisma.opportunity.findMany({
    where: {
      category: { in: getOpportunityCategoriesForProcedure(procedure.slug) },
      OR: [{ deadline: null }, { deadline: { gte: startOfToday() } }],
    },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
  });

  // Seul l'aperçu quitte le serveur, sauf pour les catégories entièrement publiques
  const opportunities = opportunityRows.map((row) => ({
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

  return (
    <ProcedureViewShell
      procedure={procedure}
      initialCompletedStepIds={completedStepIds}
      opportunities={opportunities}
      showOpportunities={procedureHasOpportunities(procedure.slug)}
    />
  );
}

