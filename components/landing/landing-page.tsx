import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { FloatingHeader } from "@/components/shared/floating-header";
import { Logo } from "@/components/shared/logo";
import { ProcedureStack } from "@/components/shared/procedure-stack";
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

      {/* Bandeau d'accueil : titre sur fond bleu, carte d'action à droite */}
      <section className="mt-4 bg-accent-primary text-primary-foreground">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-8 sm:py-20 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-16">
          <div className="space-y-5">
            <p className="text-sm font-medium tracking-wide opacity-85">
              Démarches des médecins diplômés hors UE
            </p>
            <h1 className="text-[clamp(1.75rem,1.2rem+2.4vw,2.75rem)] leading-[1.15] font-bold tracking-tight text-balance hyphens-none">
              MedProcedure est une plateforme qui accompagne les médecins, en
              activité ou en formation, dans leur projet d&apos;immigration à
              l&apos;étranger.
            </h1>
          </div>

          <div className="border-b-4 border-[#00A95F] bg-bg-surface p-8 text-center text-text-primary sm:p-10">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Votre parcours, étape par étape
            </h2>
            <Link
              href="/sign-up"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 bg-accent-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-accent-hover active:scale-[0.98]"
            >
              Créer un compte gratuit
            </Link>
            <p className="my-4 text-sm text-text-muted uppercase">ou</p>
            <p className="text-base leading-relaxed">
              Parcourez les {procedures.length} procédures détaillées, rédigées
              d&apos;après les <strong>sources officielles</strong>
            </p>
            <a
              href="#procedures"
              className="mt-5 inline-flex h-12 w-full items-center justify-center border border-accent-primary px-6 text-base font-medium text-accent-primary transition-colors hover:bg-accent-soft active:scale-[0.98]"
            >
              Voir les procédures
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">
        {/* Registre des sources : la preuve plutôt que la promesse */}
        <section
          aria-label="Nos sources"
          className="grid gap-6 border-b border-border-default py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:py-14"
        >
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Chaque procédure est rédigée d&apos;après les pages officielles :{" "}
            {OFFICIAL_AUTHORITIES.join(", ")}. {officialLinkCount} liens de
            référence, vérifiés.
          </p>
          <a
            href="#procedures"
            className="inline-flex h-12 items-center justify-center bg-accent-primary px-6 text-base font-medium text-primary-foreground transition-colors hover:bg-accent-hover active:scale-[0.98]"
          >
            Choisir ma procédure
          </a>
        </section>

        <section
          id="procedures"
          className="scroll-mt-24 space-y-6 pt-14 pb-16 sm:pt-20 sm:pb-24"
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
