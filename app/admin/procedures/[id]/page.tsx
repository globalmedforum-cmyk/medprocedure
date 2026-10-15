import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";
import { AdminPageHeader, AdminSection } from "@/components/admin/admin-ui";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin";
import {
  createStep,
  deleteStep,
  updateProcedure,
  updateStep,
} from "@/actions/admin";
import { AdminForm } from "@/components/admin/admin-form";
import { DeleteForm } from "@/components/admin/delete-form";
import { Field, TextAreaField } from "@/components/admin/fields";
import { StepFields } from "@/components/admin/step-fields";

interface AdminProcedurePageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminProcedurePage({
  params,
}: AdminProcedurePageProps) {
  await requireAdmin();
  const { id } = await params;

  const procedure = await prisma.procedure.findUnique({
    where: { id },
    include: { steps: { orderBy: { order: "asc" } } },
  });

  if (!procedure) {
    notFound();
  }

  const nextOrder = (procedure.steps.at(-1)?.order ?? 0) + 1;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title={procedure.title}
        eyebrow={`/procedures/${procedure.slug}`}
        backHref="/admin"
        actions={
          <Link
            href={`/procedures/${procedure.slug}`}
            className="inline-flex h-11 items-center gap-1.5 rounded-xl px-3 text-sm font-semibold text-text-muted transition-colors hover:bg-bg-subtle hover:text-text-primary sm:h-10"
          >
            Voir la page
            <ExternalLink aria-hidden className="h-4 w-4" />
          </Link>
        }
      />

      <AdminSection
        title="Présentation"
        description="Titre, description, pays et catégorie affichés sur le site."
      >
        <AdminForm
          action={updateProcedure}
          submitLabel="Enregistrer"
          className="max-w-2xl"
        >
          <input type="hidden" name="id" value={procedure.id} />
          <Field
            label="Titre"
            name="title"
            required
            defaultValue={procedure.title}
          />
          <TextAreaField
            label="Description"
            name="description"
            required
            defaultValue={procedure.description}
          />
          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Pays"
              name="country"
              required
              defaultValue={procedure.country}
            />
            <Field
              label="Catégorie"
              name="category"
              required
              defaultValue={procedure.category}
            />
          </div>
        </AdminForm>
      </AdminSection>

      <AdminSection
        title="Étapes"
        description="Cliquez sur une étape pour la modifier ou la supprimer."
      >
        <div className="space-y-2">
          {procedure.steps.map((step) => (
            <details
              key={step.id}
              className="group rounded-xl border border-border-default bg-bg-base transition-colors open:bg-bg-surface open:shadow-sm"
            >
              <summary className="grid cursor-pointer list-none grid-cols-[2.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-xl p-4 transition-colors hover:bg-bg-subtle [&::-webkit-details-marker]:hidden">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft font-mono text-xs font-semibold text-accent-primary">
                  {String(step.order).padStart(2, "0")}
                </span>
                <span className="font-semibold">{step.title}</span>
                <ChevronDown
                  aria-hidden
                  className="h-4 w-4 text-text-muted transition-transform group-open:rotate-180"
                />
              </summary>

              <div className="border-t border-border-default p-4 sm:p-6">
                <div className="max-w-2xl space-y-6">
                  <AdminForm
                    action={updateStep}
                    submitLabel="Enregistrer l'étape"
                  >
                    <input type="hidden" name="stepId" value={step.id} />
                    <StepFields step={step} />
                  </AdminForm>
                  <DeleteForm
                    action={deleteStep}
                    name="stepId"
                    value={step.id}
                    label="Supprimer cette étape"
                  />
                </div>
              </div>
            </details>
          ))}
        </div>
      </AdminSection>

      <AdminSection
        title="Ajouter une étape"
        description="Elle s'insère selon son numéro d'ordre."
      >
        <AdminForm
          key={nextOrder}
          action={createStep}
          submitLabel="Ajouter l'étape"
          resetOnSuccess
          className="max-w-2xl"
        >
          <input type="hidden" name="procedureId" value={procedure.id} />
          <StepFields defaultOrder={nextOrder} />
        </AdminForm>
      </AdminSection>
    </div>
  );
}
