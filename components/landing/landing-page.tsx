import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { FloatingHeader } from "@/components/shared/floating-header";
import { Logo } from "@/components/shared/logo";
import { ProcedureStack } from "@/components/shared/procedure-stack";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SUPPORT_EMAIL } from "@/lib/contact";
import {
  OFFICIAL_AUTHORITIES,
  countOfficialLinks,
} from "@/lib/content-verification";
import type { LandingProcedure } from "@/lib/landing";
import { cn } from "@/lib/utils";

const guideContents = [
  {
    title: "Les étapes dans l'ordre",
    text: "Chaque procédure est découpée en étapes à suivre l'une après l'autre, de la vérification de vos conditions jusqu'à la prise de poste.",
  },
  {
    title: "Les pièces et les délais",
    text: "Pour chaque étape : les documents à réunir, les montants à prévoir et le temps que la démarche prend habituellement.",
  },
  {
    title: "Les sources officielles",
    text: "Des liens directs vers les administrations concernées, pour vérifier une règle ou télécharger le bon formulaire.",
  },
  {
    title: "Les opportunités liées",
    text: "Postes hospitaliers, fellowships, thèses et congrès ouverts, rattachés à la procédure qui permet d'y candidater.",
  },
  {
    title: "Une assistance personnalisée",
    text: "À chaque étape, vous pouvez demander l'accompagnement de notre équipe, par WhatsApp ou par e-mail, pour avancer sur votre dossier.",
  },
  {
    title: "Votre avancement",
    text: "Vous cochez les étapes terminées et vous retrouvez votre dossier là où vous l'avez laissé.",
  },
];

interface LandingPageProps {
  procedures: LandingProcedure[];
}

// Page d'accueil publique, affichée aux visiteurs non connectés
export function LandingPage({ procedures }: LandingPageProps) {
  const officialLinkCount = countOfficialLinks();

  return (
    <div className="flex min-h-screen flex-col">
      <FloatingHeader>
        <div className="flex h-14 w-full items-center justify-between gap-4 px-3 sm:px-5">
          <Logo hideNameOnPhone />

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <ThemeToggle />
            <ContactDialog
              trigger="Nous contacter"
              triggerVariant="ghost"
              triggerClassName="h-11 rounded-lg px-3 text-sm font-medium sm:h-10"
              title="Nous contacter"
              description="Une question sur une procédure ou sur notre accompagnement ? Écrivez-nous, sans avoir besoin de créer un compte. Votre message est déjà préparé, vous pouvez le compléter avant de l'envoyer."
              emailSubject="Demande d'information"
              message="Bonjour, je souhaite obtenir des informations sur l'accompagnement proposé par MedProcedure."
            />
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "h-11 rounded-lg px-3 text-sm font-medium sm:h-10",
              )}
            >
              Se connecter
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "hidden h-10 gap-2 rounded-xl px-4 text-sm font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md md:inline-flex",
              )}
            >
              Créer un compte
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </div>
      </FloatingHeader>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">
        <section className="grid items-start gap-x-16 gap-y-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_22rem] lg:py-24">
          {/* Une seule ligne sur tous les écrans : la taille suit la largeur
                disponible, plafonnée à 12 px */}
          <div className="@container lg:col-span-2">
            <p className="font-mono text-[min(0.75rem,3.4cqi)] tracking-[0.12em] whitespace-nowrap text-text-muted uppercase">
              Démarches des médecins diplômés hors UE
            </p>
          </div>
          <div className="space-y-8">
            {/* Titre aligné à gauche : taille fluide selon l'écran, lignes
                équilibrées, jamais de césure ni d'espaces étirés */}
            <div className="max-w-[40rem]">
              <h1 className="font-heading text-[clamp(1.75rem,1.15rem+2.6vw,2.75rem)] leading-[1.18] font-semibold tracking-tight text-balance hyphens-none">
                MedProcedure est une plateforme qui accompagne les médecins, en
                activité ou en formation, dans leur projet d&apos;immigration à
                l&apos;étranger.
              </h1>
            </div>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "h-12 w-full gap-2 rounded-md px-6 text-base font-semibold transition-colors hover:bg-accent-hover sm:w-auto",
              )}
            >
              Créer un compte
              <ArrowRight aria-hidden />
            </Link>
          </div>

          {/* Registre des sources : la preuve plutôt que la promesse */}
          <aside
            aria-label="Nos sources"
            className="border-y border-text-primary py-5"
          >
            <p className="font-mono text-[0.7rem] tracking-[0.2em] text-text-muted uppercase">
              Registre des sources
            </p>
            <dl className="mt-4 divide-y divide-border-default">
              {[
                ["Procédures", String(procedures.length).padStart(2, "0")],
                ["Liens de référence", String(officialLinkCount)],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-4 py-2.5"
                >
                  <dt className="text-sm text-text-muted">{label}</dt>
                  <dd className="font-mono text-base capitalize">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm leading-relaxed text-text-muted">
              Rédigé d&apos;après les pages officielles :{" "}
              <span className="text-text-primary">
                {OFFICIAL_AUTHORITIES.join(", ")}
              </span>
              .
            </p>
          </aside>
        </section>

        <section
          id="procedures"
          className="scroll-mt-24 space-y-6 pb-16 sm:pb-24"
        >
          <div className="@container mx-auto space-y-4 pb-4 text-center sm:pb-8">
            <p className="font-mono text-xs font-medium tracking-widest text-text-muted uppercase">
              {procedures.length} procédures détaillées
            </p>
            <h2 className="font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl lg:text-[min(3rem,4.3cqi)] lg:whitespace-nowrap">
              Toutes vos démarches{" "}
              <em className="whitespace-nowrap text-accent-primary">
                étape par étape
              </em>{" "}
              au même endroit.
            </h2>
          </div>
          <ProcedureStack procedures={procedures} />
          <p className="text-sm text-text-muted">
            La consultation d&apos;une procédure demande un compte, qui sert à
            enregistrer votre avancement.
          </p>
        </section>

        <section id="contenu" className="scroll-mt-24 space-y-8 pb-16 sm:pb-24">
          <h2 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
            Ce que contient chaque procédure
          </h2>
          {/* Sommaire éditorial : des filets et des numéros, pas des cartes */}
          <dl className="grid border-t border-text-primary sm:grid-cols-2 lg:grid-cols-3">
            {guideContents.map((item, index) => (
              <div
                key={item.title}
                className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3 border-b border-border-default py-6 sm:pr-8"
              >
                <span className="font-mono text-sm text-accent-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="font-heading text-xl font-medium">
                    {item.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-text-muted">
                    {item.text}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="border-t border-border-default bg-bg-surface">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-text-muted sm:px-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl leading-relaxed">
            MedProcedure est un service indépendant, sans lien avec les
            administrations citées. Les informations sont données à titre
            indicatif ; seuls les sites officiels font foi.
          </p>
          <div className="space-y-1 md:text-right">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex h-11 items-center font-medium text-accent-secondary hover:underline md:h-auto"
            >
              {SUPPORT_EMAIL}
            </a>
            <p>
              <Link
                href="/conditions"
                className="inline-flex h-11 items-center underline underline-offset-4 hover:text-text-primary md:h-auto"
              >
                Conditions générales d&apos;utilisation
              </Link>
            </p>
            <p>&copy; {new Date().getFullYear()} MedProcedure</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
