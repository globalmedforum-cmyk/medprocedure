import Link from "next/link";
import { ProcedureStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  isOpportunityExpired,
  opportunityCategoryGroups,
  opportunityCategoryLabels,
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
    <div className="space-y-14">
      <header className="space-y-6">
        <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
          Administration
        </h1>
        <dl className="grid gap-6 border-y border-border-default py-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <dd className="font-mono text-2xl">{stat.value}</dd>
              <dt className="text-sm text-text-muted">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </header>

      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Procédures
        </h2>
        <ul className="border-t border-border-default">
          {procedures.map((procedure) => (
            <li key={procedure.id} className="border-b border-border-default">
              <Link
                href={`/admin/procedures/${procedure.id}`}
                className="grid gap-x-8 gap-y-1 py-4 transition-colors hover:bg-bg-surface sm:grid-cols-[minmax(0,1fr)_8rem_10rem] sm:items-baseline sm:px-3"
              >
                <span className="font-medium">{procedure.title}</span>
                <span className="font-mono text-xs text-text-muted">
                  {procedure._count.steps} étapes
                </span>
                <span className="text-sm text-text-muted">
                  {procedure.progress.length} en cours ou terminées
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-8">
        <h2 className="font-heading text-2xl font-medium tracking-tight">
          Opportunités
        </h2>

        {opportunityCategoryGroups.map((group) => {
          const items = opportunities.filter((opportunity) =>
            group.categories.includes(opportunity.category)
          );

          return (
            <div key={group.title} className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-medium">
                  {group.title}
                  <span className="ml-2 font-mono text-xs font-normal text-text-muted">
                    {items.length}
                  </span>
                </h3>
                <Link
                  href={`/admin/opportunities/new?category=${group.categories[0]}`}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "h-9 px-3 text-sm"
                  )}
                >
                  Ajouter
                </Link>
              </div>

              {items.length === 0 ? (
                <p className="border-t border-border-default pt-3 text-sm text-text-muted">
                  Aucune opportunité dans cette catégorie.
                </p>
              ) : (
                <ul className="border-t border-border-default">
                  {items.map((opportunity) => (
                    <li
                      key={opportunity.id}
                      className="border-b border-border-default"
                    >
                      <Link
                        href={`/admin/opportunities/${opportunity.id}`}
                        className="grid gap-x-8 gap-y-1 py-4 transition-colors hover:bg-bg-surface sm:grid-cols-[9rem_minmax(0,1fr)_11rem] sm:items-baseline sm:px-3"
                      >
                        <span className="text-sm text-accent-primary">
                          {opportunityCategoryLabels[opportunity.category]}
                        </span>
                        <span>
                          <span className="block font-medium">
                            {opportunity.title}
                          </span>
                          <span className="block text-sm text-text-muted">
                            {opportunity.hospital} · {opportunity.location},{" "}
                            {opportunity.country}
                          </span>
                        </span>
                        <span className="font-mono text-xs text-text-muted">
                          {opportunity.deadline
                            ? dateFormatter.format(opportunity.deadline)
                            : "Sans date limite"}
                          {isOpportunityExpired(opportunity.deadline, today) && (
                            <span className="block font-sans text-state-error">
                              Expirée, masquée du site
                            </span>
                          )}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
