"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { ProcedureStatus } from "@prisma/client";

const toggleStepProgressSchema = z.object({
  procedureSlug: z.string().trim().min(1).max(200),
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

    const { procedureSlug, stepId, completed } = parsed.data;

    // Récupération de l'utilisateur Clerk pour synchronisation locale si nécessaire
    const clerkUser = await currentUser();
    const primaryEmail =
      clerkUser?.emailAddresses?.[0]?.emailAddress || `${userId}@medprocedure.app`;
    const fullName =
      `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || null;

    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      update: {
        email: primaryEmail,
        name: fullName || undefined,
      },
      create: {
        clerkId: userId,
        email: primaryEmail,
        name: fullName,
      },
    });

    // Récupération de la procédure et de ses étapes
    const procedure = await prisma.procedure.findUnique({
      where: { slug: procedureSlug },
      include: {
        steps: {
          select: { id: true },
          orderBy: { order: "asc" },
        },
      },
    });

    if (!procedure) {
      return { success: false, error: "Procédure médicale introuvable." };
    }

    const procedureStepIds = new Set(procedure.steps.map((step) => step.id));

    if (!procedureStepIds.has(stepId)) {
      return { success: false, error: "Cette étape n'appartient pas à la procédure." };
    }

    const progressKey = {
      userId_procedureId: {
        userId: dbUser.id,
        procedureId: procedure.id,
      },
    };

    const updatedProgress = await prisma.$transaction(async (tx) => {
      const progress = await tx.userProcedureProgress.upsert({
        where: progressKey,
        update: {},
        create: { userId: dbUser.id, procedureId: procedure.id },
        select: { id: true },
      });

      // Verrou de ligne : deux validations simultanées ne doivent pas s'écraser
      await tx.$queryRaw`SELECT id FROM user_procedure_progress WHERE id = ${progress.id} FOR UPDATE`;

      const current = await tx.userProcedureProgress.findUniqueOrThrow({
        where: { id: progress.id },
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
        where: { id: progress.id },
        data: {
          completedStepIds: Array.from(nextCompleted),
          status: nextStatus,
        },
      });
    });

    revalidatePath(`/procedures/${procedureSlug}`);

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
