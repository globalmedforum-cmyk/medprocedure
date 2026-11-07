import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { connection } from "next/server";

// Les administrateurs sont désignés par ADMIN_EMAILS (adresses séparées par
// des virgules). Sans cette variable, personne n'a accès à l'administration.
function getAdminEmails() {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function isAdmin() {
  // Toujours évalué à la requête : la réponse ne doit jamais être figée au build
  await connection();

  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) return false;

  const user = await currentUser();
  if (!user) return false;

  const verifiedEmails = user.emailAddresses
    .filter((e) => e.verification?.status === "verified")
    .map((e) => e.emailAddress.toLowerCase());

  // Repli sur l'e-mail principal si la vérification est implicite (SSO/OAuth)
  if (verifiedEmails.length === 0 && user.primaryEmailAddress) {
    verifiedEmails.push(user.primaryEmailAddress.emailAddress.toLowerCase());
  }

  return adminEmails.some((adminEmail) => verifiedEmails.includes(adminEmail));
}

// Répond 404 plutôt que 403 : l'existence de l'administration n'est pas révélée.
export async function requireAdmin() {
  if (!(await isAdmin())) {
    notFound();
  }
}
