import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { deleteOpportunity } from "@/actions/admin";
import { DeleteForm } from "@/components/admin/delete-form";
import { OpportunityForm } from "@/components/admin/opportunity-form";

interface AdminOpportunityPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminOpportunityPage({
  params,
}: AdminOpportunityPageProps) {
  await requireAdmin();
  const { id } = await params;

  const opportunity = await prisma.opportunity.findUnique({ where: { id } });

  if (!opportunity) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
        {opportunity.title}
      </h1>
      <OpportunityForm opportunity={opportunity} />
      <DeleteForm
        action={deleteOpportunity}
        name="opportunityId"
        value={opportunity.id}
        label="Supprimer cette opportunité"
      />
    </div>
  );
}
