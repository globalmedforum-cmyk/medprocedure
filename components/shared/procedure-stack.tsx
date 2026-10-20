import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProcedureCarousel } from "@/components/shared/procedure-carousel";
import { Guilloche } from "@/components/shared/guilloche";
import { Stamp } from "@/components/shared/stamp";
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

// Deux papiers en alternance, comme les pages d'un passeport. Les couleurs
// restent fixes en mode sombre : ce sont des objets, pas des surfaces de
// l'interface.
const papers = [
  {
    page: "bg-[#F3EEE3]",
    guilloche: "text-[#C9A882]/45",
    ink: "text-[#B4400A]",
  },
  {
    page: "bg-[#E7ECEF]",
    guilloche: "text-[#7E97A6]/40",
    ink: "text-[#1F4E79]",
  },
];

// Zone de lecture automatique d'un passeport : capitales, sans accents,
// chevrons pour combler, 44 caractères par ligne
function machineLine(parts: string[]) {
  const text = parts
    .map((part) =>
      part
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toUpperCase()
        .replace(/[^A-Z0-9]+/g, "<"),
    )
    .join("<<");
  return text.slice(0, 44).padEnd(44, "<");
}

// Cartes empilées : sur ordinateur, chaque procédure reste collée en haut de
// l'écran et la suivante vient glisser par-dessus en défilant
export function ProcedureStack({ procedures }: ProcedureStackProps) {
  const total = String(procedures.length).padStart(2, "0");

  return (
    <ProcedureCarousel count={procedures.length}>
      <ol
        aria-label="Procédures"
        className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-4 [scrollbar-width:none] md:mx-0 md:block md:space-y-10 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden"
      >
        {procedures.map((procedure, index) => {
          const paper = papers[index % papers.length];
          const page = String(index + 1).padStart(2, "0");

          return (
            <li
              key={procedure.id}
              className="w-[88%] shrink-0 snap-center sm:w-[70%] md:sticky md:w-auto"
              // Chaque page s'arrête un peu plus bas que la précédente : on
              // voit le bord des pages déjà empilées
              style={{ top: `calc(5.5rem + ${index * 0.75}rem)` }}
            >
              <article
                className={cn(
                  "relative isolate flex h-full flex-col overflow-hidden rounded-lg border border-black/10 text-[#1C1A17] shadow-[0_1px_0_rgb(0_0_0/0.04),0_14px_34px_-18px_rgb(0_0_0/0.35)] md:min-h-[27rem]",
                  paper.page,
                )}
              >
                <Guilloche className={cn("-z-10", paper.guilloche)} />

                <div className="flex items-center justify-between border-b border-black/10 px-5 py-3 font-mono text-[0.65rem] tracking-[0.2em] uppercase sm:px-8">
                  <span>
                    MedProcedure
                    <span className="hidden sm:inline">
                      {" "}
                      · {procedure.category}
                    </span>
                  </span>
                  <span>
                    Page {page} / {total}
                  </span>
                </div>

                <div className="grid flex-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
                  <div className="relative flex flex-col gap-5 p-5 sm:p-8 lg:p-10">
                    <p className="font-mono text-[0.7rem] tracking-[0.2em] text-black/55 uppercase">
                      Destination
                    </p>
                    <p className="-mt-4 font-heading text-4xl leading-none font-semibold tracking-tight uppercase sm:text-5xl">
                      {procedure.country}
                    </p>
                    <h3 className="font-heading text-2xl leading-tight font-medium italic sm:text-3xl">
                      {procedure.title}
                    </h3>
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-black/10 pt-4 text-sm">
                      <div>
                        <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-black/55 uppercase">
                          Étapes
                        </dt>
                        <dd className="font-mono text-base sm:text-lg">
                          {String(procedure.steps.length).padStart(2, "0")}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-mono text-[0.65rem] tracking-[0.18em] text-black/55 uppercase">
                          Domaine
                        </dt>
                        <dd className="text-base leading-snug sm:text-lg">
                          {procedure.category}
                        </dd>
                      </div>
                    </dl>
                    <Link
                      href={`/procedures/${procedure.slug}`}
                      className="mt-auto inline-flex h-12 w-fit items-center gap-2 rounded-md bg-[#1C1A17] px-5 text-sm font-semibold text-[#F3EEE3] transition-colors hover:bg-black"
                    >
                      Ouvrir le guide
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Link>

                    <Stamp
                      label={procedure.country}
                      detail={`${procedure.steps.length} étapes`}
                      shape="round"
                      rotate={index % 2 === 0 ? -14 : 11}
                      className={cn(
                        "absolute top-6 right-5 hidden w-28 text-sm opacity-80 sm:right-8 sm:flex",
                        paper.ink,
                      )}
                    />
                  </div>

                  {/* Page de droite : la table des matières du guide */}
                  <div className="hidden border-l border-dashed border-black/15 p-8 md:block lg:p-10">
                    <p className="mb-4 font-mono text-[0.65rem] tracking-[0.2em] text-black/55 uppercase">
                      Table des matières
                    </p>
                    <ol className="space-y-3">
                      {procedure.steps.map((step) => (
                        <li
                          key={step.order}
                          className="grid grid-cols-[1.75rem_minmax(0,1fr)_auto] items-baseline gap-2 border-b border-dotted border-black/20 pb-2 text-sm"
                        >
                          <span className="font-mono text-xs text-black/55">
                            {String(step.order).padStart(2, "0")}
                          </span>
                          <span className="truncate">{step.title}</span>
                          <span className="font-mono text-[0.65rem] text-black/55">
                            {step.estimatedDuration}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Bande de lecture automatique, comme au bas d'un passeport */}
                <div
                  aria-hidden
                  className="overflow-hidden border-t border-black/10 bg-white/40 px-5 py-3 font-mono text-[0.62rem] leading-relaxed tracking-[0.28em] whitespace-nowrap text-black/60 sm:px-8 sm:text-xs"
                >
                  <p>
                    {machineLine([
                      "P",
                      "MedProcedure",
                      procedure.country,
                      procedure.title,
                    ])}
                  </p>
                  <p>
                    {machineLine([
                      `${procedure.steps.length} etapes`,
                      "medprocedure",
                      procedure.slug,
                    ])}
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </ProcedureCarousel>
  );
}
