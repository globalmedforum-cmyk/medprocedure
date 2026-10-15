import React from "react";
import type { Opportunity, OpportunityCategory } from "@prisma/client";
import { saveOpportunity } from "@/actions/admin";
import {
  opportunityCategoryGroups,
  opportunityCategoryLabels,
} from "@/lib/opportunity-categories";
import { AdminForm } from "./admin-form";
import { Field, TextAreaField } from "./fields";

interface OpportunityFormProps {
  opportunity?: Opportunity;
  defaultCategory?: OpportunityCategory;
}

export function OpportunityForm({
  opportunity,
  defaultCategory,
}: OpportunityFormProps) {
  return (
    <AdminForm
      action={saveOpportunity}
      submitLabel={opportunity ? "Enregistrer" : "Ajouter l'opportunité"}
      className="max-w-2xl"
    >
      {opportunity && (
        <input type="hidden" name="opportunityId" value={opportunity.id} />
      )}
      <label className="block space-y-1.5">
        <span className="block text-sm font-medium">Catégorie</span>
        <select
          name="category"
          required
          defaultValue={opportunity?.category ?? defaultCategory ?? ""}
          className="h-11 w-full rounded-xl border border-input bg-bg-surface px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
        >
          <option value="" disabled>
            Choisir une catégorie
          </option>
          {opportunityCategoryGroups.map((group) => (
            <optgroup key={group.title} label={group.title}>
              {group.categories.map((category) => (
                <option key={category} value={category}>
                  {opportunityCategoryLabels[category]}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
      <p className="rounded-xl bg-accent-soft p-4 text-sm leading-relaxed text-text-primary">
        Visible par tous sur le site : la catégorie, le titre, la spécialité, la
        ville, le pays et la date limite. L&apos;établissement, les conditions
        et l&apos;e-mail de contact restent réservés à l&apos;équipe, sauf pour
        les congrès, qui sont publiés en entier.
      </p>
      <Field
        label="Titre"
        name="title"
        required
        defaultValue={opportunity?.title}
        hint="Public. N'y mettez pas le nom de l'établissement."
      />
      <Field
        label="Établissement"
        name="hospital"
        required
        defaultValue={opportunity?.hospital}
        hint="Réservé à l'équipe, sauf pour un congrès (lieu affiché)."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Ville"
          name="location"
          required
          defaultValue={opportunity?.location}
        />
        <Field
          label="Pays"
          name="country"
          required
          defaultValue={opportunity?.country}
        />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Spécialité"
          name="specialty"
          required
          defaultValue={opportunity?.specialty}
        />
        <Field
          label="Date limite"
          name="deadline"
          type="date"
          defaultValue={opportunity?.deadline?.toISOString().slice(0, 10)}
        />
      </div>
      <TextAreaField
        label="Conditions"
        name="requirements"
        defaultValue={opportunity?.requirements.join("\n")}
        hint="Une condition par ligne. Réservé à l'équipe, sauf pour un congrès."
      />
      <Field
        label="E-mail de contact"
        name="contactEmail"
        type="email"
        defaultValue={opportunity?.contactEmail}
        hint="Réservé à l'équipe, sauf pour un congrès."
      />
    </AdminForm>
  );
}
