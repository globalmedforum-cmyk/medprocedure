import type { Metadata } from "next";
import { FloatingHeader } from "@/components/shared/floating-header";
import { Logo } from "@/components/shared/logo";
import { OffersSection } from "@/components/offers/offers-section";

export const metadata: Metadata = {
  title: "Assistance personnalisée | MedProcedure",
};

// Essai : rendu des offres d'assistance payantes dans le site
export default function OffersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <FloatingHeader>
        <div className="flex h-14 w-full items-center px-3 sm:px-5">
          <Logo />
        </div>
      </FloatingHeader>
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 sm:py-16">
        <OffersSection />
      </main>
    </div>
  );
}
