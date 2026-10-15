import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { procedureHasOpportunities } from "@/lib/opportunity-categories";
import { getProcedureOpportunities } from "@/lib/opportunity-queries";
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

  // 2. Dossiers déjà ouverts par l'utilisateur pour cette procédure
  const { userId } = await auth();
  const existingDossiers = userId
    ? await prisma.userProcedureProgress.findMany({
        where: { procedureId: procedure.id, user: { clerkId: userId } },
        orderBy: { createdAt: "asc" },
        select: { id: true, label: true },
      })
    : [];

  // 3. Opportunités associées
  const opportunities = await getProcedureOpportunities(procedure.slug);

  return (
    <ProcedureViewShell
      procedure={procedure}
      initialCompletedStepIds={[]}
      existingDossiers={existingDossiers}
      opportunities={opportunities}
      showOpportunities={procedureHasOpportunities(procedure.slug)}
      showAdmin={await isAdmin()}
    />
  );
}

