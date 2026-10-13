import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import {
  getOpportunityCategoriesForProcedure,
  startOfToday,
} from "@/lib/opportunity-categories";
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
  const opportunities = await prisma.opportunity.findMany({
    where: {
      category: { in: getOpportunityCategoriesForProcedure(procedure.slug) },
      OR: [{ deadline: null }, { deadline: { gte: startOfToday() } }],
    },
    orderBy: [{ deadline: "asc" }, { createdAt: "desc" }],
  });

  return (
    <ProcedureViewShell
      procedure={procedure}
      initialCompletedStepIds={completedStepIds}
      opportunities={opportunities}
    />
  );
}

