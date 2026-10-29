import { auth } from "@clerk/nextjs/server";

// Plateforme de suivi des accompagnements payants (projet medsuivi). Elle
// partage l'instance Clerk du site : le jeton de session de l'utilisateur
// connecté suffit pour lui demander s'il est client.
export const SUIVI_URL = process.env.SUIVI_URL ?? "https://medsuivi.vercel.app";

export type AccompanimentAccess = "client" | "team" | null;

// « client » : le médecin a payé un accompagnement ; « team » : membre de
// l'équipe. En cas d'erreur ou de lenteur, null : le lien n'est pas affiché.
export async function getAccompanimentAccess(): Promise<AccompanimentAccess> {
  try {
    const { userId, getToken } = await auth();
    if (!userId) return null;

    const token = await getToken();
    if (!token) return null;

    const response = await fetch(`${SUIVI_URL}/api/acces`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;

    const { access } = (await response.json()) as { access?: unknown };
    return access === "client" || access === "team" ? access : null;
  } catch {
    return null;
  }
}
