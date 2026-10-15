import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { isAdmin } from "@/lib/admin";
import { procedureHasOpportunities } from "@/lib/opportunity-categories";
import { getProcedureOpportunities } from "@/lib/opportunity-queries";
import { hasAcceptedTerms } from "@/lib/terms-acceptance";
import { TermsWindow } from "@/components/terms/terms-window";
import { ProcedureViewShell } from "@/components/procedures/procedure-view-shell";

export const metadata: Metadata = {
  title: "Dossier | MedProcedure",
  robots: { index: false, follow: false },
};

interface DossierPageProps {
  params: Promise<{ id: string }>;
}

export default async function DossierPage({ params }: DossierPageProps) {
  const { id } = await params;

  if (!(await hasAcceptedTerms())) {
    return <TermsWindow next={`/dossiers/${id}`} />;
  }

  const { userId } = await auth();
  if (!userId) {
    notFound();
  }

  // Un dossier n'est visible que par son propriétaire
  const dossier = await prisma.userProcedureProgress.findFirst({
    where: { id, user: { clerkId: userId } },
    include: {
      procedure: { include: { steps: { orderBy: { order: "asc" } } } },
    },
  });

  if (!dossier) {
    notFound();
  }

  const { procedure } = dossier;
  const opportunities = await getProcedureOpportunities(procedure.slug);

  return (
    <ProcedureViewShell
      // Une clé par dossier : l'état local ne fuit pas d'un dossier à l'autre
      key={dossier.id}
      procedure={procedure}
      initialCompletedStepIds={dossier.completedStepIds}
      opportunities={opportunities}
      showOpportunities={procedureHasOpportunities(procedure.slug)}
      showAdmin={await isAdmin()}
      dossier={{
        id: dossier.id,
        label: dossier.label,
        targetDate: dossier.targetDate,
      }}
    />
  );
}
