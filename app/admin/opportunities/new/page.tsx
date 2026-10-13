import { requireAdmin } from "@/lib/admin";
import { OpportunityForm } from "@/components/admin/opportunity-form";
import { parseOpportunityCategory } from "@/lib/opportunity-categories";

interface AdminNewOpportunityPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function AdminNewOpportunityPage({
  searchParams,
}: AdminNewOpportunityPageProps) {
  await requireAdmin();
  const { category } = await searchParams;

  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
        Nouvelle opportunité
      </h1>
      <OpportunityForm defaultCategory={parseOpportunityCategory(category)} />
    </div>
  );
}
