import { HeartHandshake } from "lucide-react";
import { getAccompanimentAccess, SUIVI_URL } from "@/lib/accompaniment";

// Lien vers la plateforme de suivi, affiché seulement aux médecins qui ont
// payé un accompagnement (et à l'équipe). Rendu dans un <Suspense> : la
// vérification ne retarde pas l'affichage du reste de l'en-tête.
export async function AccompanimentLink() {
  const access = await getAccompanimentAccess();
  if (!access) return null;

  const label = access === "team" ? "Suivi des clients" : "Mon accompagnement";

  return (
    <a
      href={SUIVI_URL}
      className="inline-flex h-9 items-center gap-1.5 rounded-full bg-accent-soft px-3 text-sm font-semibold text-accent-primary transition-colors hover:bg-accent-primary hover:text-white"
    >
      <HeartHandshake className="size-4" aria-hidden />
      <span className="hidden sm:inline">{label}</span>
      <span className="sr-only sm:hidden">{label}</span>
    </a>
  );
}
