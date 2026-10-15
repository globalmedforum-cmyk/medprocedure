import { requireAdmin } from "@/lib/admin";
import {
  AdminPageHeader,
  adminCardClassName,
} from "@/components/admin/admin-ui";
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
    <div className="space-y-6">
      <AdminPageHeader title="Nouvelle opportunité" backHref="/admin" />
      <section className={adminCardClassName}>
        <OpportunityForm defaultCategory={parseOpportunityCategory(category)} />
      </section>
    </div>
  );
}
