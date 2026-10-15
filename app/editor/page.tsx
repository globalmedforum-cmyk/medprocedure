import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { ProcedureStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { formatDossierDate, getDossierLabel } from "@/lib/dossiers";
import { startOfToday } from "@/lib/opportunity-categories";
import { hasAcceptedTerms } from "@/lib/terms-acceptance";
import { Progress } from "@/components/ui/progress";
import { AppShell } from "@/components/shared/app-shell";
import { ProcedureCard } from "@/components/shared/procedure-card";
import { NewDossierDialog } from "@/components/dossiers/new-dossier-dialog";
import { isAdmin } from "@/lib/admin";
import { cn } from "@/lib/utils";
import { StartDossierDialog } from "@/components/dossiers/start-dossier-dialog";
import { TermsWindow } from "@/components/terms/terms-window";

export const metadata: Metadata = {
  title: "Tableau de bord | MedProcedure",
};

function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count > 1 ? plural : singular}`;
}

export default async function DashboardPage() {
  if (!(await hasAcceptedTerms())) {
    return <TermsWindow next="/editor" />;
  }

  const { userId } = await auth();

  const [procedures, dossierRows] = await Promise.all([
    prisma.procedure.findMany({
      include: {
        steps: {
          select: { id: true, order: true, title: true },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "asc" },
    }),
    userId
      ? prisma.userProcedureProgress.findMany({
          where: { user: { clerkId: userId } },
          orderBy: { updatedAt: "desc" },
        })
      : [],
  ]);

  const today = startOfToday();
  const procedureById = new Map(procedures.map((p) => [p.id, p]));

  const dossiers = dossierRows.flatMap((row) => {
    const procedure = procedureById.get(row.procedureId);
    if (!procedure) return [];

    const completed = new Set(row.completedStepIds);
    const total = procedure.steps.length;
    const done = procedure.steps.filter((step) =>
      completed.has(step.id),
    ).length;
    const isComplete = total > 0 && done === total;

    return [
      {
        id: row.id,
        label: getDossierLabel(row.label, procedure.title),
        procedure,
        total,
        done,
        isComplete,
        nextStep: procedure.steps.find((step) => !completed.has(step.id)),
        targetDate: row.targetDate,
        isOverdue:
          !isComplete && row.targetDate !== null && row.targetDate < today,
        isStarted: row.status !== ProcedureStatus.NOT_STARTED || done > 0,
      },
    ];
  });

  const activeDossiers = dossiers.filter((dossier) => !dossier.isComplete);
  const completedDossiers = dossiers.filter((dossier) => dossier.isComplete);
  const dossierCountByProcedure = new Map<string, number>();
  for (const dossier of dossiers) {
    dossierCountByProcedure.set(
      dossier.procedure.id,
      (dossierCountByProcedure.get(dossier.procedure.id) ?? 0) + 1,
    );
  }

  const dossierGroups = [
    { title: "En cours", items: activeDossiers },
    { title: "Terminés", items: completedDossiers },
  ].filter((group) => group.items.length > 0);

  const procedureOptions = procedures.map((procedure) => ({
    slug: procedure.slug,
    title: procedure.title,
    dossierCount: dossierCountByProcedure.get(procedure.id) ?? 0,
  }));

  return (
    <AppShell showAdmin={await isAdmin()}>
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-8 sm:py-12">
        <header className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Tableau de bord
            </h1>
            <p className="text-base text-text-muted">
              {dossiers.length === 0
                ? "Ouvrez un dossier pour suivre une démarche étape par étape."
                : `${pluralize(activeDossiers.length, "dossier en cours", "dossiers en cours")}, ${pluralize(completedDossiers.length, "terminé", "terminés")}.`}
            </p>
          </div>
          {procedureOptions.length > 0 && (
            <NewDossierDialog
              procedures={procedureOptions}
              hasDossiers={dossiers.length > 0}
              className="w-full sm:w-auto"
            />
          )}
        </header>

        <div className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-8">
          <section
            id="mes-dossiers"
            className="scroll-mt-24 space-y-5"
            aria-labelledby="mes-dossiers-titre"
          >
            <h2
              id="mes-dossiers-titre"
              className="font-heading text-xl font-bold tracking-tight sm:text-2xl"
            >
              Mes dossiers
            </h2>

            {dossiers.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border-default bg-bg-surface p-6 text-sm leading-relaxed text-text-muted">
                Vous n&apos;avez pas encore de dossier. Choisissez une procédure
                et cliquez sur « Ouvrir un dossier ».
              </div>
            ) : (
              dossierGroups.map((group) => (
                <div key={group.title} className="space-y-3">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    {group.title}
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs font-semibold text-accent-primary">
                      {group.items.length}
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {group.items.map((dossier) => (
                      <li key={dossier.id}>
                        <Link
                          href={`/dossiers/${dossier.id}`}
                          className="group block rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-xs font-medium text-text-muted">
                              {dossier.procedure.title} ·{" "}
                              {dossier.procedure.country}
                            </p>
                            <ArrowRight
                              aria-hidden
                              className="h-4 w-4 shrink-0 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary"
                            />
                          </div>
                          <p className="mt-1 font-heading text-lg font-bold tracking-tight">
                            {dossier.label}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed">
                            {dossier.isComplete ? (
                              <span className="font-medium text-state-success">
                                Toutes les étapes sont terminées.
                              </span>
                            ) : dossier.nextStep ? (
                              <>
                                <span className="text-text-muted">
                                  {dossier.isStarted
                                    ? "Prochaine étape : "
                                    : "Première étape : "}
                                </span>
                                <span className="font-medium">
                                  {dossier.nextStep.title}
                                </span>
                              </>
                            ) : null}
                          </p>

                          <Progress
                            value={dossier.done}
                            max={dossier.total || 1}
                            aria-label={`Avancement : ${dossier.done} étapes sur ${dossier.total}`}
                            className="mt-4 h-2 rounded-full border-0 bg-bg-subtle"
                            indicatorClassName={cn(
                              "rounded-full",
                              dossier.isComplete && "bg-state-success",
                            )}
                          />
                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                            <span className="font-medium text-text-muted">
                              {dossier.done} sur {dossier.total} étapes
                            </span>
                            {dossier.targetDate && (
                              <span
                                className={
                                  dossier.isOverdue
                                    ? "font-medium text-state-error"
                                    : "text-text-muted"
                                }
                              >
                                Échéance :{" "}
                                {formatDossierDate(dossier.targetDate)}
                                {dossier.isOverdue && " (dépassée)"}
                              </span>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </section>

          <section
            id="procedures"
            className="scroll-mt-24 space-y-5"
            aria-labelledby="procedures-titre"
          >
            <div className="space-y-1.5">
              <h2
                id="procedures-titre"
                className="font-heading text-xl font-bold tracking-tight sm:text-2xl"
              >
                Procédures
              </h2>
              <p className="text-sm leading-relaxed text-text-muted">
                Lisez un guide librement, ou ouvrez un dossier pour suivre votre
                avancement.
              </p>
            </div>

            <ol className="space-y-3">
              {procedures.map((procedure, index) => {
                const dossierCount =
                  dossierCountByProcedure.get(procedure.id) ?? 0;

                return (
                  <li key={procedure.id}>
                    <ProcedureCard
                      index={index}
                      slug={procedure.slug}
                      title={procedure.title}
                      description={procedure.description}
                      meta={`${procedure.country} · ${procedure.steps.length} étapes${
                        dossierCount > 0
                          ? ` · ${pluralize(dossierCount, "dossier ouvert", "dossiers ouverts")}`
                          : ""
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href={`/procedures/${procedure.slug}`}
                          className="inline-flex h-11 items-center justify-center rounded-xl bg-bg-subtle px-2 text-sm font-semibold transition-colors hover:bg-border-default sm:h-10"
                        >
                          Lire le guide
                        </Link>
                        <StartDossierDialog
                          procedureSlug={procedure.slug}
                          procedureTitle={procedure.title}
                          existingDossierCount={dossierCount}
                          triggerLabel="Ouvrir un dossier"
                          className="h-11 w-full gap-1.5 rounded-xl px-2 font-semibold hover:bg-accent-hover sm:h-10"
                        />
                      </div>
                    </ProcedureCard>
                  </li>
                );
              })}
            </ol>

            {procedures.length === 0 && (
              <p className="text-sm text-text-muted">
                Aucune procédure n&apos;est disponible pour le moment.
              </p>
            )}
          </section>
        </div>
      </main>
    </AppShell>
  );
}
