import React from "react";
import { SiteHeader } from "@/components/shared/site-header";
import { AcceptTermsForm } from "./accept-terms-form";
import { TermsText } from "./terms-text";

interface TermsWindowProps {
  // Page à afficher une fois les conditions acceptées
  next: string;
}

// Fenêtre bloquante affichée à la place d'une page réservée tant que les
// conditions générales en vigueur n'ont pas été acceptées.
export function TermsWindow({ next }: TermsWindowProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/80 sm:items-center sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="terms-window-title"
          className="flex h-dvh w-full flex-col border-border-default bg-bg-surface sm:h-auto sm:max-h-[90vh] sm:max-w-2xl sm:rounded-md sm:border"
        >
          <header className="space-y-1.5 border-b border-border-default px-4 py-4 sm:px-6">
            <h2
              id="terms-window-title"
              className="font-heading text-xl font-medium tracking-tight sm:text-2xl"
            >
              Conditions générales d&apos;utilisation
            </h2>
            <p className="text-sm text-text-muted">
              Lisez et acceptez ces conditions pour accéder au site.
            </p>
          </header>

          <div
            tabIndex={0}
            className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6"
          >
            <TermsText />
          </div>

          <footer className="border-t border-border-default px-4 py-4 sm:px-6">
            <AcceptTermsForm next={next} />
          </footer>
        </div>
      </div>
    </div>
  );
}
