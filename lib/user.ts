import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Crée ou met à jour la ligne `users` correspondant au compte Clerk connecté.
export async function syncDbUser(clerkId: string) {
  const clerkUser = await currentUser();
  const primaryEmail = clerkUser?.primaryEmailAddress;
  const email =
    primaryEmail?.emailAddress ??
    clerkUser?.emailAddresses?.[0]?.emailAddress ??
    `${clerkId}@medprocedure.app`;
  const name =
    `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || null;

  const existing = await prisma.user.findUnique({ where: { clerkId } });
  if (existing) {
    // L'e-mail n'est mis à jour que s'il n'appartient pas déjà à une autre ligne
    const emailOwner =
      existing.email === email
        ? existing
        : await prisma.user.findUnique({ where: { email } });

    return prisma.user.update({
      where: { id: existing.id },
      data: {
        name: name ?? undefined,
        email: !emailOwner || emailOwner.id === existing.id ? email : undefined,
      },
    });
  }

  // Même personne, nouvel identifiant Clerk (changement d'instance Clerk,
  // reconnexion avec un compte social ayant la même adresse, etc.) : la ligne
  // existante est rattachée au compte Clerk actuel afin de conserver dossiers,
  // historique et acceptation des conditions sans conflit d'unicité d'e-mail.
  const sameEmail = await prisma.user.findUnique({ where: { email } });
  if (sameEmail) {
    return prisma.user.update({
      where: { id: sameEmail.id },
      data: { clerkId, name: name ?? undefined },
    });
  }

  return prisma.user.create({ data: { clerkId, email, name } });
}
