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
  const primaryEmail = user?.primaryEmailAddress;

  if (!primaryEmail || primaryEmail.verification?.status !== "verified") {
    return false;
  }

  return adminEmails.includes(primaryEmail.emailAddress.toLowerCase());
}

// Répond 404 plutôt que 403 : l'existence de l'administration n'est pas révélée.
export async function requireAdmin() {
  if (!(await isAdmin())) {
    notFound();
  }
}
