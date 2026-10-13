"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { TERMS_VERSION } from "@/lib/terms";
import { syncDbUser } from "@/lib/user";
import { ProcedureStatus } from "@prisma/client";

const toggleStepProgressSchema = z.object({
  dossierId: z.string().trim().min(1).max(64),
  stepId: z.string().trim().min(1).max(64),
  completed: z.boolean(),
});

export type ToggleStepProgressInput = z.infer<typeof toggleStepProgressSchema>;

export interface ToggleStepProgressResult {
  success: boolean;
  completedStepIds?: string[];
  status?: ProcedureStatus;
  error?: string;
}

export async function toggleStepProgress(
  input: ToggleStepProgressInput
): Promise<ToggleStepProgressResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Vous devez être connecté pour enregistrer votre progression." };
    }

    const parsed = toggleStepProgressSchema.safeParse(input);

    if (!parsed.success) {
      return { success: false, error: "Requête invalide." };
    }

    const { dossierId, stepId, completed } = parsed.data;

    const dbUser = await syncDbUser(userId);

    if (dbUser.termsVersion !== TERMS_VERSION) {
      return {
        success: false,
        error: "Acceptez d'abord les conditions générales d'utilisation.",
      };
    }

    // Le dossier doit appartenir à l'utilisateur connecté
    const dossier = await prisma.userProcedureProgress.findFirst({
      where: { id: dossierId, userId: dbUser.id },
      select: {
        id: true,
        procedure: { select: { steps: { select: { id: true } } } },
      },
    });

    if (!dossier) {
      return { success: false, error: "Dossier introuvable." };
    }

    const procedureStepIds = new Set(
      dossier.procedure.steps.map((step) => step.id)
    );

    if (!procedureStepIds.has(stepId)) {
      return { success: false, error: "Cette étape n'appartient pas à la procédure." };
    }

    const updatedProgress = await prisma.$transaction(async (tx) => {
      // Verrou de ligne : deux validations simultanées ne doivent pas s'écraser
      await tx.$queryRaw`SELECT id FROM user_procedure_progress WHERE id = ${dossier.id} FOR UPDATE`;

      const current = await tx.userProcedureProgress.findUniqueOrThrow({
        where: { id: dossier.id },
        select: { completedStepIds: true },
      });

      // Seules les étapes existantes de la procédure comptent dans la progression
      const nextCompleted = new Set(
        current.completedStepIds.filter((id) => procedureStepIds.has(id))
      );

      if (completed) {
        nextCompleted.add(stepId);
      } else {
        nextCompleted.delete(stepId);
      }

      let nextStatus: ProcedureStatus = ProcedureStatus.IN_PROGRESS;
      if (nextCompleted.size === 0) {
        nextStatus = ProcedureStatus.NOT_STARTED;
      } else if (nextCompleted.size === procedureStepIds.size) {
        nextStatus = ProcedureStatus.COMPLETED;
      }

      return tx.userProcedureProgress.update({
        where: { id: dossier.id },
        data: {
          completedStepIds: Array.from(nextCompleted),
          status: nextStatus,
        },
      });
    });

    revalidatePath("/editor");
    revalidatePath(`/dossiers/${dossier.id}`);

    return {
      success: true,
      completedStepIds: updatedProgress.completedStepIds,
      status: updatedProgress.status,
    };
  } catch (error) {
    console.error("Erreur toggleStepProgress:", error);
    return {
      success: false,
      error: "Une erreur est survenue lors de l'enregistrement de votre étape.",
    };
  }
}
