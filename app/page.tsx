import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { HeroIllustration } from "@/components/shared/hero-illustration";
import { Logo } from "@/components/shared/logo";
import { ProcedureCard } from "@/components/shared/procedure-card";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "MedProcedure — exercer ou se former à l'étranger",
  description:
    "Doctorat, enregistrement MEBEKO, poste de médecin assistant, stage FFI, stage associé, stage d'observation, congrès : chaque démarche détaillée étape par étape, avec les pièces, les délais et les liens officiels.",
};

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

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/editor");
  }

  const procedures = await prisma.procedure.findMany({
    orderBy: { createdAt: "asc" },
    include: { _count: { select: { steps: true } } },
  });

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-border-default bg-bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
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
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">
        <section className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_20rem] lg:py-24 xl:grid-cols-[minmax(0,1fr)_23rem]">
          <div className="space-y-8">
            <h1 className="max-w-4xl font-heading text-[1.85rem] leading-[1.25] font-bold tracking-tight sm:text-4xl sm:leading-[1.2] lg:text-5xl lg:leading-[1.15]">
              MedProcedure est une plateforme qui accompagne les médecins, en
              activité ou en formation, dans leur projet d&apos;immigration à
              l&apos;étranger.
            </h1>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "h-12 w-full gap-2 rounded-xl px-6 text-base font-semibold shadow-sm transition-all hover:bg-accent-hover hover:shadow-md sm:w-auto",
              )}
            >
              Créer un compte
              <ArrowRight aria-hidden />
            </Link>
          </div>
          {/* Réservée aux grands écrans : sur téléphone, le texte suffit */}
          <HeroIllustration className="hidden lg:block" />
        </section>

        <section
          id="procedures"
          className="scroll-mt-24 space-y-6 pb-16 sm:pb-24"
        >
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Les procédures
          </h2>
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {procedures.map((procedure, index) => (
              <li key={procedure.id}>
                <ProcedureCard
                  index={index}
                  slug={procedure.slug}
                  title={procedure.title}
                  description={procedure.description}
                  meta={`${procedure.country} · ${procedure._count.steps} étapes`}
                >
                  <Link
                    href={`/procedures/${procedure.slug}`}
                    className="flex h-11 w-full items-center justify-center gap-1.5 rounded-xl bg-bg-subtle px-3 text-sm font-semibold transition-colors hover:bg-accent-soft hover:text-accent-primary sm:h-10"
                  >
                    Découvrir
                    <ArrowRight aria-hidden className="h-4 w-4" />
                  </Link>
                </ProcedureCard>
              </li>
            ))}
          </ol>
          <p className="text-sm text-text-muted">
            La consultation d&apos;une procédure demande un compte, qui sert à
            enregistrer votre avancement.
          </p>
        </section>

        <section id="contenu" className="scroll-mt-24 space-y-6 pb-16 sm:pb-24">
          <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
            Ce que contient chaque procédure
          </h2>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {guideContents.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm sm:p-6"
              >
                <dt className="font-heading text-base font-bold">
                  {item.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </dd>
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
