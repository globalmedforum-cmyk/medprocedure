import React from "react";
import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

interface AuthShellProps {
  children: React.ReactNode;
}

// Écran de connexion et d'inscription : une colonne centrée, aérée
export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-bg-base px-4 py-10 sm:py-16">
      <ThemeToggle className="absolute top-3 right-3 sm:top-4 sm:right-4" />
      <Link href="/" aria-label="MedProcedure, accueil">
        <Logo />
      </Link>

      <p className="mt-6 max-w-sm text-center text-sm leading-relaxed text-text-muted sm:text-base">
        Les démarches pour exercer ou se former à l&apos;étranger, étape par
        étape.
      </p>

      <main className="mt-8 flex w-full max-w-[420px] justify-center">
        {children}
      </main>

      <p className="mt-10 text-xs text-text-muted">
        &copy; {new Date().getFullYear()} MedProcedure ·{" "}
        <Link
          href="/conditions"
          className="hover:text-text-primary hover:underline"
        >
          Conditions générales d&apos;utilisation
        </Link>
      </p>
    </div>
  );
}
