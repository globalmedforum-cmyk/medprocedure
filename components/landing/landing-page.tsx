import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { FloatingHeader } from "@/components/shared/floating-header";
import { Logo } from "@/components/shared/logo";
import { ProcedureCards } from "@/components/landing/procedure-cards";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SUPPORT_EMAIL } from "@/lib/contact";
import type { LandingProcedure } from "@/lib/landing";
import {
  OFFICIAL_AUTHORITIES,
  countOfficialLinks,
} from "@/lib/content-verification";
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

      {/* Bandeau d'accueil : panneau nuit arrondi, texte sobre, carte d'action à droite */}
      <section className="mx-auto mt-4 w-full max-w-6xl px-3 sm:px-4">
        <div className="overflow-hidden rounded-3xl bg-ink text-white">
          <div className="grid items-center gap-10 px-6 py-10 sm:px-12 sm:py-12 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-14 lg:py-14">
            <div className="max-w-[36rem] space-y-5">
              <p className="text-sm text-white/70 sm:text-base">
                Démarches des médecins diplômés hors UE
              </p>
              <h1 className="text-[clamp(1.75rem,1.1rem+2.2vw,2.6rem)] leading-[1.18] font-bold tracking-tight text-pretty hyphens-none">
                MedProcedure est une plateforme qui accompagne les médecins, en
                activité ou en formation, dans leur projet d&apos;immigration à
                l&apos;étranger.
              </h1>
            </div>

            <div className="rounded-2xl bg-bg-surface p-7 text-text-primary shadow-2xl shadow-black/30 sm:p-8">
              <h2 className="text-xl font-bold sm:text-2xl">
                Votre parcours, étape par étape
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                Suivez votre dossier, cochez chaque étape et retrouvez-le là où
                vous l&apos;avez laissé.
              </p>
              <Link
                href="/sign-up"
                className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-hover active:scale-[0.98]"
              >
                Créer un compte gratuit
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <a
                href="#procedures"
                className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-xl border border-border-default px-6 text-base font-semibold text-text-primary transition-colors hover:border-accent-primary hover:text-accent-primary active:scale-[0.98]"
              >
                Voir les procédures
              </a>
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">
        {/* Registre des sources : la preuve plutôt que la promesse */}
        <section
          aria-label="Nos sources"
          className="grid gap-6 border-b border-border-default py-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-10"
        >
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Chaque procédure est rédigée d&apos;après les pages officielles&nbsp;:{" "}
            {OFFICIAL_AUTHORITIES.join(", ")}. {officialLinkCount} liens de
            référence, vérifiés.
          </p>
          <a
            href="#procedures"
            className="inline-flex h-12 items-center justify-center rounded-xl bg-accent-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-accent-hover active:scale-[0.98]"
          >
            Choisir ma procédure
          </a>
        </section>

        <section
          id="procedures"
          className="scroll-mt-24 space-y-6 pt-10 pb-10 sm:pt-12 sm:pb-14"
        >
          <div className="@container mx-auto space-y-4 pb-2 text-center sm:pb-4">
            <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              Toutes vos démarches{" "}
              <em className="whitespace-nowrap text-accent-primary">
                étape par étape
              </em>{" "}
              au même endroit.
            </h2>
          </div>
          <ProcedureCards procedures={procedures} />
          <p className="text-sm text-text-muted">
            La consultation d&apos;une procédure demande un compte, qui sert à
            enregistrer votre avancement.
          </p>
        </section>

        <section id="contenu" className="scroll-mt-24 space-y-6 pb-12 sm:pb-16">
          {/* Toujours sur une ligne : la taille suit la largeur disponible */}
          <div className="@container">
            <h2 className="font-heading text-[min(2.25rem,6.4cqi)] font-medium tracking-tight whitespace-nowrap">
              Ce que contient chaque procédure
            </h2>
          </div>
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
