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
import { SiteHeader } from "@/components/shared/site-header";
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
    const done = procedure.steps.filter((step) => completed.has(step.id)).length;
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
      (dossierCountByProcedure.get(dossier.procedure.id) ?? 0) + 1
    );
  }

  const dossierGroups = [
    { title: "En cours", items: activeDossiers },
    { title: "Terminés", items: completedDossiers },
  ].filter((group) => group.items.length > 0);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <header className="max-w-2xl space-y-3">
          <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            Tableau de bord
          </h1>
          <p className="text-base leading-relaxed text-text-muted">
            {dossiers.length === 0
              ? "Ouvrez un dossier pour suivre une démarche étape par étape. Vous pouvez en ouvrir plusieurs pour une même procédure."
              : `${pluralize(activeDossiers.length, "dossier en cours", "dossiers en cours")}, ${pluralize(completedDossiers.length, "terminé", "terminés")}.`}
          </p>
        </header>

        <section className="mt-10 space-y-6" aria-labelledby="mes-dossiers">
          <h2
            id="mes-dossiers"
            className="font-heading text-2xl font-medium tracking-tight"
          >
            Mes dossiers
          </h2>

          {dossiers.length === 0 ? (
            <p className="border-t border-border-default pt-5 text-sm leading-relaxed text-text-muted">
              Vous n&apos;avez pas encore de dossier. Choisissez une procédure
              ci-dessous et cliquez sur « Ouvrir un dossier ».
            </p>
          ) : (
            dossierGroups.map((group) => (
              <div key={group.title} className="space-y-2">
                <h3 className="text-sm font-medium text-text-muted">
                  {group.title}
                  <span className="ml-2 font-mono text-xs">
                    {group.items.length}
                  </span>
                </h3>
                <ul className="border-t border-border-default">
                  {group.items.map((dossier) => (
                    <li
                      key={dossier.id}
                      className="border-b border-border-default"
                    >
                      <Link
                        href={`/dossiers/${dossier.id}`}
                        className="group grid gap-x-8 gap-y-3 py-5 transition-colors hover:bg-bg-surface sm:px-4 md:grid-cols-[minmax(0,1fr)_15rem_1.25rem] md:items-center"
                      >
                        <div className="space-y-1.5">
                          <p className="text-sm text-text-muted">
                            {dossier.procedure.title}
                            {" · "}
                            {dossier.procedure.country}
                          </p>
                          <p className="font-heading text-xl font-medium tracking-tight group-hover:text-accent-primary">
                            {dossier.label}
                          </p>
                          <p className="text-sm leading-relaxed">
                            {dossier.isComplete ? (
                              <span className="text-state-success">
                                Toutes les étapes sont terminées.
                              </span>
                            ) : dossier.nextStep ? (
                              <>
                                <span className="text-text-muted">
                                  {dossier.isStarted
                                    ? "Prochaine étape : "
                                    : "Première étape : "}
                                </span>
                                {dossier.nextStep.title}
                              </>
                            ) : null}
                          </p>
                        </div>

                        <div className="space-y-2 text-sm">
                          <Progress
                            value={dossier.done}
                            max={dossier.total || 1}
                            aria-label={`Avancement : ${dossier.done} étapes sur ${dossier.total}`}
                            className="h-1 border-0"
                            indicatorClassName={
                              dossier.isComplete ? "bg-state-success" : undefined
                            }
                          />
                          <p className="font-mono text-xs text-text-muted">
                            {dossier.done} sur {dossier.total} étapes
                          </p>
                          {dossier.targetDate && (
                            <p
                              className={
                                dossier.isOverdue
                                  ? "text-state-error"
                                  : "text-text-muted"
                              }
                            >
                              Échéance : {formatDossierDate(dossier.targetDate)}
                              {dossier.isOverdue && " (dépassée)"}
                            </p>
                          )}
                        </div>

                        <ArrowRight
                          aria-hidden
                          className="hidden h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary md:block"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </section>

        <section className="mt-14 space-y-6" aria-labelledby="procedures">
          <div className="max-w-2xl space-y-2">
            <h2
              id="procedures"
              className="font-heading text-2xl font-medium tracking-tight"
            >
              Procédures
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              Lisez un guide librement, ou ouvrez un dossier pour suivre votre
              avancement.
            </p>
          </div>

          <ol className="border-t border-border-default">
            {procedures.map((procedure, index) => {
              const dossierCount =
                dossierCountByProcedure.get(procedure.id) ?? 0;

              return (
                <li
                  key={procedure.id}
                  className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-4 border-b border-border-default py-6 sm:px-4 lg:grid-cols-[2.5rem_minmax(0,1fr)_auto] lg:items-center lg:gap-x-8"
                >
                  <span className="pt-1.5 font-mono text-sm text-text-muted lg:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-xl font-medium tracking-tight">
                      {procedure.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                      {procedure.description}
                    </p>
                    <p className="text-sm">
                      {procedure.country}
                      <span className="font-mono text-xs text-text-muted">
                        {" · "}
                        {procedure.steps.length} étapes
                        {dossierCount > 0 &&
                          ` · ${pluralize(dossierCount, "dossier ouvert", "dossiers ouverts")}`}
                      </span>
                    </p>
                  </div>

                  <div className="col-start-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:col-start-3">
                    <StartDossierDialog
                      procedureSlug={procedure.slug}
                      procedureTitle={procedure.title}
                      existingDossierCount={dossierCount}
                      triggerLabel={
                        dossierCount > 0
                          ? "Ouvrir un autre dossier"
                          : "Ouvrir un dossier"
                      }
                      triggerVariant={dossierCount > 0 ? "outline" : "default"}
                      className="w-full sm:w-auto"
                    />
                    <Link
                      href={`/procedures/${procedure.slug}`}
                      className="flex h-11 items-center justify-center text-sm underline underline-offset-4 hover:text-accent-primary sm:h-10"
                    >
                      Lire le guide
                    </Link>
                  </div>
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
      </main>

      <footer className="border-t border-border-default">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 text-sm text-text-muted sm:px-8">
          <Link
            href="/conditions"
            className="inline-flex h-11 items-center underline underline-offset-4 hover:text-text-primary"
          >
            Conditions générales d&apos;utilisation
          </Link>
        </div>
      </footer>
    </div>
  );
}
