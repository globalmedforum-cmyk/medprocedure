import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import {
  AdminPageHeader,
  adminCardClassName,
} from "@/components/admin/admin-ui";
import { deleteOpportunity } from "@/actions/admin";
import { DeleteForm } from "@/components/admin/delete-form";
import { OpportunityForm } from "@/components/admin/opportunity-form";
import { getOpportunityReference } from "@/lib/opportunity-categories";

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
    <div className="space-y-6">
      <AdminPageHeader
        title={opportunity.title}
        eyebrow={`Réf. ${getOpportunityReference(opportunity.id)}`}
        backHref="/admin"
      />
      <section className={adminCardClassName}>
        <OpportunityForm opportunity={opportunity} />
      </section>
      <section className={adminCardClassName}>
        <h2 className="mb-3 font-heading text-lg font-bold">
          Zone de suppression
        </h2>
        <DeleteForm
          action={deleteOpportunity}
          name="opportunityId"
          value={opportunity.id}
          label="Supprimer cette opportunité"
        />
      </section>
    </div>
  );
}
