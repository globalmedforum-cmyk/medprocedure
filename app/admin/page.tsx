import Link from "next/link";
import { ProcedureStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { ArrowRight, Plus } from "lucide-react";
import { AdminOpportunityCard } from "@/components/admin/admin-opportunity-card";
import { buttonVariants } from "@/components/ui/button";
import { AdminPageHeader, AdminSection } from "@/components/admin/admin-ui";
import { cn } from "@/lib/utils";
import {
  isOpportunityExpired,
  opportunityCategoryGroups,
  startOfToday,
} from "@/lib/opportunity-categories";

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

export default async function AdminPage() {
  await requireAdmin();
  const today = startOfToday();

  const [userCount, completedCount, procedures, opportunities] =
    await Promise.all([
      prisma.user.count(),
      prisma.userProcedureProgress.count({
        where: { status: ProcedureStatus.COMPLETED },
      }),
      prisma.procedure.findMany({
        orderBy: { createdAt: "asc" },
        include: {
          _count: { select: { steps: true } },
          progress: {
            where: { status: { not: ProcedureStatus.NOT_STARTED } },
            select: { id: true },
          },
        },
      }),
      prisma.opportunity.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

  const stats = [
    { label: "Utilisateurs ayant commencé une procédure", value: userCount },
    { label: "Procédures terminées", value: completedCount },
    { label: "Opportunités publiées", value: opportunities.length },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Administration" eyebrow="Mode administrateur" />

      <dl className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm"
          >
            <dd className="font-heading text-3xl font-bold tracking-tight">
              {stat.value}
            </dd>
            <dt className="mt-1 text-sm text-text-muted">{stat.label}</dt>
          </div>
        ))}
      </dl>

      <AdminSection
        id="procedures"
        title="Procédures"
        description="Modifiez la présentation et les étapes de chaque procédure."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {procedures.map((procedure) => (
            <li key={procedure.id}>
              <Link
                href={`/admin/procedures/${procedure.id}`}
                className="group flex h-full items-center justify-between gap-4 rounded-xl border border-border-default bg-bg-base p-4 transition-all hover:border-accent-primary/40 hover:bg-bg-surface hover:shadow-md"
              >
                <span className="space-y-1">
                  <span className="block font-semibold">{procedure.title}</span>
                  <span className="block text-xs text-text-muted">
                    {procedure._count.steps} étapes ·{" "}
                    {procedure.progress.length} en cours ou terminées
                  </span>
                </span>
                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      </AdminSection>

      <AdminSection
        id="opportunites"
        title="Opportunités"
        description="Ajoutez, modifiez ou retirez les offres, classées par catégorie."
      >
        <div className="space-y-6">
          {opportunityCategoryGroups.map((group) => {
            const items = opportunities.filter((opportunity) =>
              group.categories.includes(opportunity.category),
            );

            return (
              <div key={group.title} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-base font-semibold">
                    {group.title}
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-primary">
                      {items.length}
                    </span>
                  </h3>
                  <Link
                    href={`/admin/opportunities/new?category=${group.categories[0]}`}
                    className={cn(
                      buttonVariants(),
                      "h-10 gap-1.5 rounded-xl px-3 text-sm font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md",
                    )}
                  >
                    <Plus aria-hidden />
                    Ajouter
                  </Link>
                </div>

                {items.length === 0 ? (
                  <p className="rounded-xl border border-dashed border-border-default p-4 text-sm text-text-muted">
                    Aucune opportunité dans cette catégorie.
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {items.map((opportunity) => (
                      <li key={opportunity.id}>
                        <AdminOpportunityCard
                          id={opportunity.id}
                          category={opportunity.category}
                          title={opportunity.title}
                          hospital={opportunity.hospital}
                          location={opportunity.location}
                          country={opportunity.country}
                          deadlineLabel={
                            opportunity.deadline
                              ? dateFormatter.format(opportunity.deadline)
                              : "Sans date limite"
                          }
                          isExpired={isOpportunityExpired(
                            opportunity.deadline,
                            today,
                          )}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </AdminSection>
    </div>
  );
}
