import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { LandingPage } from "@/components/landing/landing-page";
import { getLandingProcedures } from "@/lib/landing";

export const metadata: Metadata = {
  title: "MedProcedure — exercer ou se former à l'étranger",
  description:
    "Doctorat, enregistrement MEBEKO, poste de médecin assistant, stage FFI, stage associé, stage d'observation, congrès : chaque démarche détaillée étape par étape, avec les pièces, les délais et les liens officiels.",
};

export default async function HomePage() {
  const { userId } = await auth();

  if (userId) {
    redirect("/editor");
  }

  return <LandingPage procedures={await getLandingProcedures()} />;
}
