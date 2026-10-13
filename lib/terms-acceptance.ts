import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { TERMS_VERSION } from "@/lib/terms";

// N'accepte qu'un chemin interne, pour éviter toute redirection vers un autre site
export function safeReturnPath(value: unknown, fallback = "/editor") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback;
  }
  return value;
}

export async function getTermsAcceptance(clerkId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId },
    select: { termsVersion: true, termsAcceptedAt: true },
  });

  return {
    isAccepted: user?.termsVersion === TERMS_VERSION,
    acceptedAt: user?.termsAcceptedAt ?? null,
  };
}

// À appeler en tête des pages réservées : tant que la version en vigueur n'a
// pas été acceptée, la page affiche la fenêtre des conditions à la place de
// son contenu.
export async function hasAcceptedTerms() {
  const { userId } = await auth();
  if (!userId) return false;

  const { isAccepted } = await getTermsAcceptance(userId);
  return isAccepted;
}
