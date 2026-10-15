import { notFound } from "next/navigation";
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
    <div className="space-y-14">
      <header className="space-y-2">
        <p className="font-mono text-xs text-text-muted">
          /procedures/{procedure.slug}
        </p>
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {procedure.title}
        </h1>
      </header>

      <section className="space-y-5">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Présentation
        </h2>
        <AdminForm
          action={updateProcedure}
          submitLabel="Enregistrer"
          className="max-w-2xl"
        >
          <input type="hidden" name="id" value={procedure.id} />
          <Field label="Titre" name="title" required defaultValue={procedure.title} />
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
      </section>

      <section className="space-y-5">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Étapes
        </h2>

        <div className="border-t border-border-default">
          {procedure.steps.map((step) => (
            <details
              key={step.id}
              className="group border-b border-border-default"
            >
              <summary className="grid cursor-pointer grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-3 py-4 transition-colors hover:bg-bg-surface sm:px-3">
                <span className="font-mono text-xs text-text-muted">
                  {String(step.order).padStart(2, "0")}
                </span>
                <span className="font-medium">{step.title}</span>
                <span className="text-sm text-text-muted group-open:hidden">
                  Modifier
                </span>
                <span className="hidden text-sm text-text-muted group-open:inline">
                  Fermer
                </span>
              </summary>

              <div className="max-w-2xl space-y-6 pt-2 pb-8 sm:px-3">
                <AdminForm action={updateStep} submitLabel="Enregistrer l'étape">
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
            </details>
          ))}
        </div>

        <div className="max-w-2xl space-y-5 pt-6">
          <h3 className="text-base font-medium">Ajouter une étape</h3>
          <AdminForm
            key={nextOrder}
            action={createStep}
            submitLabel="Ajouter l'étape"
            resetOnSuccess
          >
            <input type="hidden" name="procedureId" value={procedure.id} />
            <StepFields defaultOrder={nextOrder} />
          </AdminForm>
        </div>
      </section>
    </div>
  );
}
