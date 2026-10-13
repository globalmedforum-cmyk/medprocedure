import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// Crée ou met à jour la ligne `users` correspondant au compte Clerk connecté.
export async function syncDbUser(clerkId: string) {
  const clerkUser = await currentUser();
  const email =
    clerkUser?.primaryEmailAddress?.emailAddress ??
    clerkUser?.emailAddresses?.[0]?.emailAddress ??
    `${clerkId}@medprocedure.app`;
  const name =
    `${clerkUser?.firstName ?? ""} ${clerkUser?.lastName ?? ""}`.trim() || null;

  return prisma.user.upsert({
    where: { clerkId },
    update: { email, name: name ?? undefined },
    create: { clerkId, email, name },
  });
}
