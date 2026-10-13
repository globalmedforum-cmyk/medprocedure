"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TERMS_VERSION } from "@/lib/terms";
import { safeReturnPath } from "@/lib/terms-acceptance";
import { syncDbUser } from "@/lib/user";

export type AcceptTermsState = { success: false; error: string } | null;

export async function acceptTerms(
  _prev: AcceptTermsState,
  formData: FormData
): Promise<AcceptTermsState> {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Vous devez être connecté." };
  }

  if (formData.get("accept") !== "on") {
    return {
      success: false,
      error: "Cochez la case pour accepter les conditions.",
    };
  }

  const user = await syncDbUser(userId);
  await prisma.user.update({
    where: { id: user.id },
    data: { termsVersion: TERMS_VERSION, termsAcceptedAt: new Date() },
  });

  redirect(safeReturnPath(formData.get("next")));
}
