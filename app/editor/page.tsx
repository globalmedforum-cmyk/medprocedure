import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Progress } from "@/components/ui/progress";
import { SiteHeader } from "@/components/shared/site-header";
import { TermsWindow } from "@/components/terms/terms-window";
import { hasAcceptedTerms } from "@/lib/terms-acceptance";

export default async function EditorPage() {
  if (!(await hasAcceptedTerms())) {
    return <TermsWindow next="/editor" />;
  }

  const { userId } = await auth();

  const [procedures, progressRows] = await Promise.all([
    prisma.procedure.findMany({
      include: { steps: { select: { id: true } } },
      orderBy: { createdAt: "asc" },
    }),
    userId
      ? prisma.userProcedureProgress.findMany({
          where: { user: { clerkId: userId } },
          select: { procedureId: true, completedStepIds: true },
        })
      : [],
  ]);

  const completedByProcedure = new Map(
    progressRows.map((row) => [row.procedureId, new Set(row.completedStepIds)])
  );

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <div className="max-w-2xl space-y-3">
          <h1 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            Procédures
          </h1>
          <p className="text-base leading-relaxed text-text-muted">
            Chaque procédure détaille les pièces à réunir, l&apos;ordre des
            démarches et les délais à prévoir. Votre avancement est enregistré
            au fil des étapes.
          </p>
        </div>

        <ol className="mt-8 border-t border-border-default sm:mt-10">
          {procedures.map((procedure, index) => {
            const completed = completedByProcedure.get(procedure.id);
            const total = procedure.steps.length;
            const done = procedure.steps.filter((step) =>
              completed?.has(step.id)
            ).length;
            const isComplete = total > 0 && done === total;

            return (
              <li key={procedure.id} className="border-b border-border-default">
                <Link
                  href={`/procedures/${procedure.slug}`}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-3 py-6 transition-colors hover:bg-bg-surface sm:px-4 md:grid-cols-[2.5rem_minmax(0,1fr)_13rem_1.25rem] md:items-center md:gap-x-8"
                >
                  <span className="pt-1.5 font-mono text-sm text-text-muted md:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="space-y-1.5">
                    <h2 className="font-heading text-xl font-medium tracking-tight group-hover:text-accent-primary sm:text-2xl">
                      {procedure.title}
                    </h2>
                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                      {procedure.description}
                    </p>
                  </div>

                  <div className="col-start-2 space-y-2 text-sm md:col-start-3">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-text-primary">
                        {procedure.country}
                      </span>
                      <span className="font-mono text-xs text-text-muted">
                        {total} étapes
                      </span>
                    </div>
                    {done > 0 ? (
                      <div className="space-y-1.5">
                        <Progress
                          value={done}
                          max={total}
                          aria-label={`Avancement : ${done} étapes sur ${total}`}
                          className="h-1 border-0"
                          indicatorClassName={
                            isComplete ? "bg-state-success" : undefined
                          }
                        />
                        <p className="text-xs text-text-muted">
                          {isComplete
                            ? "Terminée"
                            : `${done} sur ${total} terminées`}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-text-muted">Non commencée</p>
                    )}
                  </div>

                  <ArrowRight
                    aria-hidden
                    className="hidden h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary md:block"
                  />
                </Link>
              </li>
            );
          })}
        </ol>

        {procedures.length === 0 && (
          <p className="mt-10 text-sm text-text-muted">
            Aucune procédure n&apos;est disponible pour le moment.
          </p>
        )}
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
