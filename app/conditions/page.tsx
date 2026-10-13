import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { Logo } from "@/components/shared/logo";
import { AcceptTermsForm } from "@/components/terms/accept-terms-form";
import { TermsText } from "@/components/terms/terms-text";
import { getTermsAcceptance, safeReturnPath } from "@/lib/terms-acceptance";

export const metadata: Metadata = {
  title: "Conditions générales d'utilisation | MedProcedure",
  description:
    "Conditions générales d'utilisation du site medprocedure.org : engagements de l'éditeur, absence de garantie de résultat et obligations de l'utilisateur.",
};

const acceptanceDateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Paris",
});

interface ConditionsPageProps {
  searchParams: Promise<{ next?: string }>;
}

export default async function ConditionsPage({
  searchParams,
}: ConditionsPageProps) {
  const { next } = await searchParams;

  const { userId } = await auth();
  const acceptance = userId ? await getTermsAcceptance(userId) : null;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border-default">
        <div className="mx-auto flex h-14 w-full max-w-3xl items-center px-4 sm:px-8">
          <Link href="/" aria-label="MedProcedure, accueil">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-8 sm:py-14">
        <h1 className="font-heading text-3xl leading-tight font-medium tracking-tight sm:text-4xl">
          Conditions générales d&apos;utilisation
        </h1>

        <div className="mt-8">
          <TermsText />
        </div>

        <div className="mt-12 border-t border-border-default pt-8">
          {acceptance && !acceptance.isAccepted ? (
            <AcceptTermsForm next={safeReturnPath(next)} />
          ) : acceptance?.isAccepted ? (
            <div className="space-y-4">
              <p className="text-sm text-text-muted">
                Vous avez accepté ces conditions
                {acceptance.acceptedAt
                  ? ` le ${acceptanceDateFormatter.format(acceptance.acceptedAt)}`
                  : ""}
                .
              </p>
              <Link
                href="/editor"
                className="inline-flex h-11 items-center text-sm underline underline-offset-4 hover:text-accent-primary"
              >
                Retour à mes procédures
              </Link>
            </div>
          ) : (
            <Link
              href="/"
              className="inline-flex h-11 items-center text-sm underline underline-offset-4 hover:text-accent-primary"
            >
              Retour à l&apos;accueil
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
