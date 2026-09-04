"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ProcedureStatus } from "@prisma/client";

export interface ToggleStepProgressInput {
  procedureSlug: string;
  stepId: string;
  completed: boolean;
}

export interface ToggleStepProgressResult {
  success: boolean;
  completedStepIds?: string[];
  status?: ProcedureStatus;
  error?: string;
}

export async function toggleStepProgress({
  procedureSlug,
  stepId,
  completed,
}: ToggleStepProgressInput): Promise<ToggleStepProgressResult> {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "Vous devez être connecté pour enregistrer votre progression." };
    }

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
          orderBy: { order: "asc" },
        },
      },
    });

    if (!procedure) {
      return { success: false, error: "Procédure médicale introuvable." };
    }

    // Récupération ou initialisation de la progression
    const existingProgress = await prisma.userProcedureProgress.findUnique({
      where: {
        userId_procedureId: {
          userId: dbUser.id,
          procedureId: procedure.id,
        },
      },
    });

    const currentCompleted = new Set(existingProgress?.completedStepIds || []);

    if (completed) {
      currentCompleted.add(stepId);
    } else {
      currentCompleted.delete(stepId);
    }

    const nextCompletedStepIds = Array.from(currentCompleted);
    const totalSteps = procedure.steps.length;

    let nextStatus: ProcedureStatus = ProcedureStatus.NOT_STARTED;
    if (nextCompletedStepIds.length === 0) {
      nextStatus = ProcedureStatus.NOT_STARTED;
    } else if (nextCompletedStepIds.length >= totalSteps && totalSteps > 0) {
      nextStatus = ProcedureStatus.COMPLETED;
    } else {
      nextStatus = ProcedureStatus.IN_PROGRESS;
    }

    const updatedProgress = await prisma.userProcedureProgress.upsert({
      where: {
        userId_procedureId: {
          userId: dbUser.id,
          procedureId: procedure.id,
        },
      },
      update: {
        completedStepIds: nextCompletedStepIds,
        status: nextStatus,
      },
      create: {
        userId: dbUser.id,
        procedureId: procedure.id,
        completedStepIds: nextCompletedStepIds,
        status: nextStatus,
      },
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

