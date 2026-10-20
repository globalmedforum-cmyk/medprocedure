import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProcedureCarousel } from "@/components/shared/procedure-carousel";
import { ProcedureIcon } from "@/components/shared/procedure-icon";
import { cn } from "@/lib/utils";

interface ProcedureStackItem {
  id: string;
  slug: string;
  title: string;
  description: string;
  country: string;
  category: string;
  steps: { order: number; title: string; estimatedDuration: string | null }[];
}

interface ProcedureStackProps {
  procedures: ProcedureStackItem[];
}

// Deux habillages en alternance. Les couleurs restent fixes en mode sombre :
// ce sont des panneaux de couleur, pas des surfaces de l'interface.
const themes = [
  {
    card: "bg-[#BF4A00] text-white",
    eyebrow: "text-white/75",
    bullet: "bg-white",
    cta: "bg-white text-[#9C3D00] hover:bg-orange-50",
  },
  {
    card: "bg-[#0F172A] text-white",
    eyebrow: "text-white/60",
    bullet: "bg-[#FF7A1A]",
    cta: "bg-[#FF7A1A] text-[#0F172A] hover:bg-[#FF9547]",
  },
];

// Cartes empilées : sur ordinateur, chaque procédure reste collée en haut de
// l'écran et la suivante vient glisser par-dessus en défilant
export function ProcedureStack({ procedures }: ProcedureStackProps) {
  return (
    <ProcedureCarousel count={procedures.length}>
      <ol
        aria-label="Procédures"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-10 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {procedures.map((procedure, index) => {
          const theme = themes[index % themes.length];
          const firstStep = procedure.steps[0];
          const lastStep = procedure.steps.at(-1);

          return (
            <li
              key={procedure.id}
              className="w-[88%] shrink-0 snap-center sm:w-[70%] md:sticky md:w-auto"
              // Chaque carte s'arrête un peu plus bas que la précédente : on
              // voit le bord des cartes déjà empilées
              style={{ top: `calc(5.5rem + ${index * 0.75}rem)` }}
            >
              <article
                className={cn(
                  "grid h-full grid-rows-[1fr_auto] overflow-hidden rounded-3xl shadow-lg md:min-h-[26rem] md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:grid-rows-1",
                  theme.card,
                )}
              >
                <div className="flex flex-col justify-center gap-6 p-6 sm:p-10 lg:p-14">
                  <p
                    className={cn(
                      "font-mono text-xs font-medium tracking-widest uppercase",
                      theme.eyebrow,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")} · {procedure.country} ·{" "}
                    {procedure.category}
                  </p>
                  <h3 className="font-heading text-3xl leading-[1.1] font-bold tracking-tight sm:text-4xl">
                    {procedure.title}
                  </h3>
                  <ul className="space-y-2.5 text-[0.95rem] leading-snug sm:text-base">
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-2 h-1.5 w-1.5 shrink-0",
                          theme.bullet,
                        )}
                      />
                      {procedure.steps.length} étapes détaillées, avec les
                      pièces, les délais et les liens officiels
                    </li>
                    {firstStep && lastStep && (
                      <li className="hidden items-start gap-3 sm:flex">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-2 h-1.5 w-1.5 shrink-0",
                            theme.bullet,
                          )}
                        />
                        De « {firstStep.title} » à « {lastStep.title} »
                      </li>
                    )}
                    <li className="flex items-start gap-3">
                      <span
                        aria-hidden
                        className={cn(
                          "mt-2 h-1.5 w-1.5 shrink-0",
                          theme.bullet,
                        )}
                      />
                      Assistance personnalisée à chaque étape
                    </li>
                  </ul>
                  <Link
                    href={`/procedures/${procedure.slug}`}
                    className={cn(
                      "inline-flex h-12 w-fit items-center gap-2 rounded-full px-6 text-sm font-semibold shadow-sm transition-all hover:shadow-md sm:text-base",
                      theme.cta,
                    )}
                  >
                    Découvrir le guide
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </div>

                {/* Aperçu de la table des matières du guide */}
                <div
                  aria-hidden
                  className="relative hidden items-end justify-center overflow-hidden bg-bg-base md:mt-10 md:flex md:rounded-tl-3xl md:p-8 md:pb-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgb(15 23 42 / 0.12) 1.2px, transparent 1.2px)",
                    backgroundSize: "14px 14px",
                  }}
                >
                  <div className="w-full max-w-sm rounded-t-2xl border border-b-0 border-border-default bg-bg-surface p-5 text-text-primary shadow-lg">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent-primary">
                        <ProcedureIcon
                          slug={procedure.slug}
                          className="h-5 w-5"
                        />
                      </span>
                      <span className="text-sm font-bold">
                        Table des matières
                      </span>
                    </div>
                    <ol className="space-y-1">
                      {procedure.steps.slice(0, 4).map((step, stepIndex) => (
                        <li
                          key={step.order}
                          className={cn(
                            "flex items-start gap-3 rounded-lg px-2 py-2",
                            stepIndex === 0 && "bg-accent-soft",
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[0.7rem] font-semibold",
                              stepIndex === 0
                                ? "border-2 border-accent-primary text-accent-primary"
                                : "border-border-default text-text-muted",
                            )}
                          >
                            {step.order}
                          </span>
                          <span className="min-w-0">
                            <span
                              className={cn(
                                "block truncate text-xs leading-snug",
                                stepIndex === 0 && "font-bold",
                              )}
                            >
                              {step.title}
                            </span>
                            {step.estimatedDuration && (
                              <span className="block text-[0.65rem] text-text-muted">
                                {step.estimatedDuration}
                              </span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </ProcedureCarousel>
  );
}
