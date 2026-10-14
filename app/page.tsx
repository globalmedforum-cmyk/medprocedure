import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { buttonVariants } from "@/components/ui/button";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { Logo } from "@/components/shared/logo";
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
      <header className="border-b border-border-default">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
          <Logo hideNameOnPhone />
          <nav className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ContactDialog
              trigger="Nous contacter"
              triggerVariant="ghost"
              triggerClassName="h-11 px-3 text-sm sm:h-10"
              title="Nous contacter"
              description="Une question sur une procédure ou sur notre accompagnement ? Écrivez-nous, sans avoir besoin de créer un compte. Votre message est déjà préparé, vous pouvez le compléter avant de l'envoyer."
              emailSubject="Demande d'information"
              message="Bonjour, je souhaite obtenir des informations sur l'accompagnement proposé par MedProcedure."
            />
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-11 bg-transparent px-4 text-sm sm:h-10",
              )}
            >
              Se connecter
            </Link>
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "hidden h-10 px-4 text-sm sm:inline-flex",
              )}
            >
              Créer un compte
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 sm:px-8">
        <section className="space-y-6 py-12 sm:py-20 lg:py-24">
          <h1 className="max-w-5xl font-heading text-[1.7rem] leading-tight font-medium tracking-tight sm:text-4xl lg:text-5xl lg:leading-[1.15]">
            MedProcedure est une plateforme qui accompagne les médecins, en
            activité ou en formation, dans leur projet d&apos;immigration à
            l&apos;étranger.
          </h1>
          {/* Sur ordinateur, « Créer un compte » est déjà dans l'en-tête */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 lg:hidden">
            <Link
              href="/sign-up"
              className={cn(
                buttonVariants(),
                "h-12 w-full gap-2 px-5 text-base sm:w-auto",
              )}
            >
              Créer un compte
              <ArrowRight aria-hidden />
            </Link>
          </div>
        </section>

        <section
          id="procedures"
          className="scroll-mt-6 space-y-5 pb-14 sm:space-y-6 sm:pb-20"
        >
          <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
            Les procédures
          </h2>
          <ol className="border-t border-border-default">
            {procedures.map((procedure, index) => (
              <li key={procedure.id} className="border-b border-border-default">
                <Link
                  href={`/procedures/${procedure.slug}`}
                  className="group grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 gap-y-2 py-5 transition-colors hover:bg-bg-surface sm:px-4 md:grid-cols-[2.5rem_minmax(0,1fr)_11rem_1.25rem] md:items-center md:gap-x-8"
                >
                  <span className="pt-1 font-mono text-sm text-text-muted md:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-heading text-xl font-medium tracking-tight group-hover:text-accent-primary">
                      {procedure.title}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                      {procedure.description}
                    </p>
                  </div>
                  <div className="col-start-2 flex items-baseline justify-between gap-3 text-sm md:col-start-3">
                    <span>{procedure.country}</span>
                    <span className="font-mono text-xs text-text-muted">
                      {procedure._count.steps} étapes
                    </span>
                  </div>
                  <ArrowRight
                    aria-hidden
                    className="hidden h-4 w-4 text-text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent-primary md:block"
                  />
                </Link>
              </li>
            ))}
          </ol>
          <p className="text-sm text-text-muted">
            La consultation d&apos;une procédure demande un compte, qui sert à
            enregistrer votre avancement.
          </p>
        </section>

        <section className="grid gap-x-16 gap-y-8 border-t border-border-default py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
          <h2 className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
            Ce que contient chaque procédure
          </h2>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {guideContents.map((item) => (
              <div key={item.title} className="space-y-1.5">
                <dt className="font-medium">{item.title}</dt>
                <dd className="text-sm leading-relaxed text-text-muted">
                  {item.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <footer className="border-t border-border-default">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-text-muted sm:px-8 md:flex-row md:items-start md:justify-between">
          <p className="max-w-xl leading-relaxed">
            MedProcedure est un service indépendant, sans lien avec les
            administrations citées. Les informations sont données à titre
            indicatif ; seuls les sites officiels font foi.
          </p>
          <div className="space-y-1 md:text-right">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="inline-flex h-11 items-center text-accent-secondary underline underline-offset-4 hover:text-text-primary md:h-auto"
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
