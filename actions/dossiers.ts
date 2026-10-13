"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { DOSSIER_LABEL_MAX_LENGTH, MAX_DOSSIERS_PER_USER } from "@/lib/dossiers";
import { prisma } from "@/lib/prisma";
import { TERMS_VERSION } from "@/lib/terms";
import { syncDbUser } from "@/lib/user";

export type DossierActionState =
  | { success: true; message: string }
  | { success: false; error: string }
  | null;

const dossierFieldsSchema = z.object({
  label: z.string().trim().max(DOSSIER_LABEL_MAX_LENGTH),
  targetDate: z.union([
    z.literal("").transform(() => null),
    z.iso.date().transform((value) => new Date(`${value}T00:00:00.000Z`)),
  ]),
});

function readDossierFields(formData: FormData) {
  return dossierFieldsSchema.safeParse({
    label: String(formData.get("label") ?? ""),
    targetDate: String(formData.get("targetDate") ?? ""),
  });
}

const INVALID_FIELDS: DossierActionState = {
  success: false,
  error: `Le nom ne peut pas dépasser ${DOSSIER_LABEL_MAX_LENGTH} caractères et la date doit être valide.`,
};

// Utilisateur connecté ayant accepté les conditions, ou message d'erreur
async function getAuthorizedUser() {
  const { userId } = await auth();
  if (!userId) {
    return { user: null, error: "Vous devez être connecté." };
  }

  const user = await syncDbUser(userId);
  if (user.termsVersion !== TERMS_VERSION) {
    return {
      user: null,
      error: "Acceptez d'abord les conditions générales d'utilisation.",
    };
  }

  return { user, error: null };
}

export async function createDossier(
  _prev: DossierActionState,
  formData: FormData
): Promise<DossierActionState> {
  const { user, error } = await getAuthorizedUser();
  if (!user) return { success: false, error };

  const procedureSlug = z
    .string()
    .trim()
    .min(1)
    .max(200)
    .safeParse(formData.get("procedureSlug"));
  const fields = readDossierFields(formData);
  if (!procedureSlug.success) {
    return { success: false, error: "Procédure inconnue." };
  }
  if (!fields.success) return INVALID_FIELDS;

  const procedure = await prisma.procedure.findUnique({
    where: { slug: procedureSlug.data },
    select: { id: true },
  });
  if (!procedure) return { success: false, error: "Procédure inconnue." };

  const dossierCount = await prisma.userProcedureProgress.count({
    where: { userId: user.id },
  });
  if (dossierCount >= MAX_DOSSIERS_PER_USER) {
    return {
      success: false,
      error: `Vous avez atteint la limite de ${MAX_DOSSIERS_PER_USER} dossiers. Supprimez-en un pour en créer un nouveau.`,
    };
  }

  const dossier = await prisma.userProcedureProgress.create({
    data: {
      userId: user.id,
      procedureId: procedure.id,
      label: fields.data.label,
      targetDate: fields.data.targetDate,
    },
    select: { id: true },
  });

  revalidatePath("/editor");
  redirect(`/dossiers/${dossier.id}`);
}

export async function updateDossier(
  _prev: DossierActionState,
  formData: FormData
): Promise<DossierActionState> {
  const { user, error } = await getAuthorizedUser();
  if (!user) return { success: false, error };

  const dossierId = z.string().trim().min(1).max(64).safeParse(formData.get("dossierId"));
  const fields = readDossierFields(formData);
  if (!dossierId.success) return { success: false, error: "Dossier inconnu." };
  if (!fields.success) return INVALID_FIELDS;

  // La condition sur userId garantit qu'on ne modifie que ses propres dossiers
  const { count } = await prisma.userProcedureProgress.updateMany({
    where: { id: dossierId.data, userId: user.id },
    data: { label: fields.data.label, targetDate: fields.data.targetDate },
  });
  if (count === 0) return { success: false, error: "Dossier inconnu." };

  revalidatePath("/editor");
  revalidatePath(`/dossiers/${dossierId.data}`);
  return { success: true, message: "Dossier enregistré." };
}

export async function deleteDossier(
  _prev: DossierActionState,
  formData: FormData
): Promise<DossierActionState> {
  const { user, error } = await getAuthorizedUser();
  if (!user) return { success: false, error };

  const dossierId = z.string().trim().min(1).max(64).safeParse(formData.get("dossierId"));
  if (!dossierId.success) return { success: false, error: "Dossier inconnu." };

  const { count } = await prisma.userProcedureProgress.deleteMany({
    where: { id: dossierId.data, userId: user.id },
  });
  if (count === 0) return { success: false, error: "Dossier inconnu." };

  revalidatePath("/editor");
  redirect("/editor");
}
