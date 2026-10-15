import type { Metadata } from "next";
import { requireAdmin } from "@/lib/admin";
import { getAdminUsers } from "@/lib/admin-queries";
import { AdminUserList } from "@/components/admin/admin-lists";
import { AdminPageHeader, AdminSection } from "@/components/admin/admin-ui";

export const metadata: Metadata = {
  title: "Utilisateurs | Administration MedProcedure",
};

export default async function AdminUsersPage() {
  await requireAdmin();
  const users = await getAdminUsers();

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Utilisateurs"
        eyebrow={`${users.length} compte${users.length > 1 ? "s" : ""}`}
        backHref="/admin"
      />
      <AdminSection
        title="Tous les comptes"
        description="Du plus récent au plus ancien. Ouvrez un compte pour voir ses dossiers."
      >
        <AdminUserList users={users} />
      </AdminSection>
    </div>
  );
}
