"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { isAdmin } from "@/lib/admin";
import { opportunityCategories } from "@/lib/opportunity-categories";
import { prisma } from "@/lib/prisma";

z.config(z.locales.fr());

const fieldLabels: Record<string, string> = {
  title: "Titre",
  description: "Description",
  country: "Pays",
  category: "Catégorie",
  order: "Ordre",
  content: "En pratique",
  estimatedDuration: "Durée estimée",
  videoUrl: "Lien vidéo",
  hospital: "Établissement",
  location: "Ville",
  specialty: "Spécialité",
  deadline: "Date limite",
  requirements: "Conditions",
  contactEmail: "E-mail de contact",
};

export type AdminActionState =
  | { success: true; message: string }
  | { success: false; error: string }
  | null;

const FORBIDDEN: AdminActionState = {
  success: false,
  error: "Action réservée aux administrateurs.",
};

const id = z.string().trim().min(1).max(64);
const requiredText = (max: number) => z.string().trim().min(1).max(max);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || null);

const procedureSchema = z.object({
  id,
  title: requiredText(200),
  description: requiredText(2000),
  country: requiredText(100),
  category: requiredText(100),
});

const stepSchema = z.object({
  order: z.coerce.number().int().min(1).max(99),
  title: requiredText(200),
  description: requiredText(2000),
  content: optionalText(5000),
  estimatedDuration: optionalText(100),
  // L'URL est injectée dans un iframe : seul https est accepté
  videoUrl: z.union([
    z.literal("").transform(() => null),
    z.url({ protocol: /^https$/ }).max(500),
  ]),
  isRequired: z.boolean(),
});

const opportunitySchema = z.object({
  category: z.enum(opportunityCategories),
  title: requiredText(200),
  hospital: requiredText(200),
  location: requiredText(100),
  country: requiredText(100),
  specialty: requiredText(100),
  deadline: z.union([
    z.literal("").transform(() => null),
    z.iso.date().transform((value) => new Date(`${value}T00:00:00.000Z`)),
  ]),
  requirements: z
    .string()
    .max(5000)
    .transform((value) =>
      value
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
    ),
  contactEmail: z.union([
    z.literal("").transform(() => null),
    z.email().max(200),
  ]),
  isPublic: z.boolean(),
});

function fields(formData: FormData, names: string[]) {
  return Object.fromEntries(
    names.map((name) => [name, String(formData.get(name) ?? "").trim()])
  );
}

function stepFields(formData: FormData) {
  return {
    ...fields(formData, [
      "order",
      "title",
      "description",
      "content",
      "estimatedDuration",
      "videoUrl",
    ]),
    isRequired: formData.get("isRequired") === "on",
  };
}

function opportunityFields(formData: FormData) {
  return {
    ...fields(formData, [
      "category",
      "title",
      "hospital",
      "location",
      "country",
      "specialty",
      "deadline",
      "contactEmail",
    ]),
    requirements: String(formData.get("requirements") ?? ""),
    isPublic: formData.get("isPublic") === "on",
  };
}

function invalid(error: z.ZodError): AdminActionState {
  const issue = error.issues[0];
  const field = String(issue?.path[0] ?? "");
  return {
    success: false,
    error: issue
      ? `${fieldLabels[field] ?? field} : ${issue.message}`
      : "Formulaire invalide.",
  };
}

function revalidateProcedure(slug: string, procedureId: string) {
  revalidatePath("/editor");
  revalidatePath(`/procedures/${slug}`);
  revalidatePath("/admin");
  revalidatePath(`/admin/procedures/${procedureId}`);
}

export async function updateProcedure(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const parsed = procedureSchema.safeParse(
    fields(formData, ["id", "title", "description", "country", "category"])
  );
  if (!parsed.success) return invalid(parsed.error);

  const { id: procedureId, ...data } = parsed.data;
  const procedure = await prisma.procedure.update({
    where: { id: procedureId },
    data,
  });

  revalidateProcedure(procedure.slug, procedure.id);
  return { success: true, message: "Procédure enregistrée." };
}

export async function createStep(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const procedureId = id.safeParse(formData.get("procedureId"));
  const parsed = stepSchema.safeParse(stepFields(formData));
  if (!procedureId.success) return { success: false, error: "Procédure inconnue." };
  if (!parsed.success) return invalid(parsed.error);

  const procedure = await prisma.procedure.findUnique({
    where: { id: procedureId.data },
    include: { steps: { select: { order: true } } },
  });
  if (!procedure) return { success: false, error: "Procédure inconnue." };

  if (procedure.steps.some((step) => step.order === parsed.data.order)) {
    return {
      success: false,
      error: `Le numéro d'ordre ${parsed.data.order} est déjà utilisé.`,
    };
  }

  await prisma.step.create({
    data: { ...parsed.data, procedureId: procedure.id },
  });

  revalidateProcedure(procedure.slug, procedure.id);
  return { success: true, message: "Étape ajoutée." };
}

export async function updateStep(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const stepId = id.safeParse(formData.get("stepId"));
  const parsed = stepSchema.safeParse(stepFields(formData));
  if (!stepId.success) return { success: false, error: "Étape inconnue." };
  if (!parsed.success) return invalid(parsed.error);

  const step = await prisma.step.findUnique({
    where: { id: stepId.data },
    include: {
      procedure: { include: { steps: { select: { id: true, order: true } } } },
    },
  });
  if (!step) return { success: false, error: "Étape inconnue." };

  const orderTaken = step.procedure.steps.some(
    (other) => other.id !== step.id && other.order === parsed.data.order
  );
  if (orderTaken) {
    return {
      success: false,
      error: `Le numéro d'ordre ${parsed.data.order} est déjà utilisé.`,
    };
  }

  await prisma.step.update({ where: { id: step.id }, data: parsed.data });

  revalidateProcedure(step.procedure.slug, step.procedureId);
  return { success: true, message: "Étape enregistrée." };
}

export async function deleteStep(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const stepId = id.safeParse(formData.get("stepId"));
  if (!stepId.success) return { success: false, error: "Étape inconnue." };

  const step = await prisma.step.findUnique({
    where: { id: stepId.data },
    include: { procedure: { select: { slug: true } } },
  });
  if (!step) return { success: false, error: "Étape inconnue." };

  await prisma.step.delete({ where: { id: step.id } });

  revalidateProcedure(step.procedure.slug, step.procedureId);
  return { success: true, message: "Étape supprimée." };
}

export async function saveOpportunity(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const rawId = String(formData.get("opportunityId") ?? "");
  const parsed = opportunitySchema.safeParse(opportunityFields(formData));
  if (!parsed.success) return invalid(parsed.error);

  if (rawId) {
    const opportunityId = id.safeParse(rawId);
    if (!opportunityId.success) {
      return { success: false, error: "Opportunité inconnue." };
    }
    const existing = await prisma.opportunity.findUnique({
      where: { id: opportunityId.data },
      select: { id: true },
    });
    if (!existing) return { success: false, error: "Opportunité inconnue." };

    await prisma.opportunity.update({
      where: { id: existing.id },
      data: parsed.data,
    });
  } else {
    await prisma.opportunity.create({ data: parsed.data });
  }

  revalidatePath("/admin");
  revalidatePath("/procedures/[slug]", "page");
  redirect("/admin");
}

export async function deleteOpportunity(
  _prev: AdminActionState,
  formData: FormData
): Promise<AdminActionState> {
  if (!(await isAdmin())) return FORBIDDEN;

  const opportunityId = id.safeParse(formData.get("opportunityId"));
  if (!opportunityId.success) {
    return { success: false, error: "Opportunité inconnue." };
  }

  await prisma.opportunity.deleteMany({ where: { id: opportunityId.data } });

  revalidatePath("/admin");
  revalidatePath("/procedures/[slug]", "page");
  redirect("/admin");
}
