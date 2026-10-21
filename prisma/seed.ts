import { Prisma, PrismaClient } from "@prisma/client";
import { procedures, type ProcedureSeed } from "./procedures-content";

const prisma = new PrismaClient();

// Le seed est rejouable : il ne supprime jamais les utilisateurs ni leur
// progression. Les étapes sont retrouvées par (procédure, ordre) afin de
// conserver leurs identifiants, référencés dans completedStepIds.
async function upsertProcedure({ steps, ...data }: ProcedureSeed) {
  const procedure = await prisma.procedure.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  });

  for (const step of steps) {
    const stepData = { ...step, videoUrl: step.videoUrl ?? null };
    const existing = await prisma.step.findFirst({
      where: { procedureId: procedure.id, order: step.order },
      select: { id: true },
    });

    if (existing) {
      await prisma.step.update({ where: { id: existing.id }, data: stepData });
    } else {
      await prisma.step.create({
        data: { ...stepData, procedureId: procedure.id },
      });
    }
  }

  await prisma.step.deleteMany({
    where: {
      procedureId: procedure.id,
      order: { notIn: steps.map((step) => step.order) },
    },
  });

  return procedure;
}

// Les opportunités se gèrent dans l'administration : le seed crée celles qui
// manquent mais ne réécrit jamais une opportunité existante.
async function createOpportunityIfMissing(data: Prisma.OpportunityCreateInput) {
  const existing = await prisma.opportunity.findFirst({
    where: { title: data.title, hospital: data.hospital },
    select: { id: true },
  });

  if (!existing) {
    await prisma.opportunity.create({ data });
  }
}

async function main() {
  console.log("🌱 Démarrage du seed des procédures médicales...");

  for (const procedure of procedures) {
    await upsertProcedure(procedure);
  }

  // Opportunités hospitalières. Les congrès sont importés par
  // prisma/import-congres.ts.
  const opportunities: Prisma.OpportunityCreateInput[] = [
    // Postes hospitaliers
    {
      category: "MEDECIN_ASSISTANT",
      title: "Médecin Assistant en Médecine Interne",
      hospital: "Hôpitaux Universitaires de Genève (HUG)",
      location: "Genève",
      country: "Suisse",
      specialty: "Médecine Interne",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      requirements: [
        "Diplôme fédéral de médecin ou équivalence MEBEKO",
        "Maîtrise du français niveau C1",
        "Motivation pour la recherche clinique et le travail en équipe",
      ],
      contactEmail: "recrutement.medical@hug.ch",
    },
    {
      category: "FFI",
      title: "Poste FFI en Chirurgie Orthopédique & Traumatologie",
      hospital: "Hospices Civils de Lyon (HCL) - CHU Lyon",
      location: "Lyon",
      country: "France",
      specialty: "Chirurgie Orthopédique",
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      requirements: [
        "Interne en fin de cursus ou médecin diplômé éligible FFI",
        "Expérience en bloc opératoire et gestion des urgences",
        "Niveau de français B2 minimum",
      ],
      contactEmail: "orthopedie.recrutement@chu-lyon.fr",
    },
    {
      category: "FELLOWSHIP",
      title: "Fellowship en Cardiologie Interventionnelle",
      hospital: "Centre Hospitalier Universitaire Vaudois (CHUV)",
      location: "Lausanne",
      country: "Suisse",
      specialty: "Cardiologie",
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      requirements: [
        "Titre de spécialiste en cardiologie ou équivalence reconnue",
        "Pratique attestée en coronarographie diagnostique",
        "Intérêt pour l'imagerie intravasculaire",
      ],
      contactEmail: "cardiologie.rh@chuv.ch",
    },
    {
      category: "STAGE_ASSOCIE",
      title: "Praticien Attaché Associé en Anesthésie-Réanimation",
      hospital: "Assistance Publique - Hôpitaux de Paris (AP-HP)",
      location: "Paris",
      country: "France",
      specialty: "Anesthésie-Réanimation",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: [
        "Diplôme de docteur en médecine avec spécialisation",
        "Aptitude à la prise en charge des urgences vitales",
        "Dossier complet éligible à la procédure PAE",
      ],
      contactEmail: "recrutement.anesthesie@aphp.fr",
    },
  ];

  for (const opportunity of opportunities) {
    await createOpportunityIfMissing(opportunity);
  }

  console.log(`✅ Seed terminé : ${procedures.length} procédures.`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant l'exécution du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
