import { getAccompanimentAccess, SUIVI_URL } from "@/lib/accompaniment";

// Lu par le lien « Mon accompagnement » de l'en-tête : indique si
// l'utilisateur connecté a un accompagnement payant (ou fait partie de
// l'équipe), et l'adresse de la plateforme de suivi.
export async function GET() {
  const access = await getAccompanimentAccess();
  return Response.json(
    { access, url: access ? SUIVI_URL : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
