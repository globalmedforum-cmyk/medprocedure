import { PrismaClient, type OpportunityCategory } from "@prisma/client";
import opportunites from "./data/opportunites.json";

const prisma = new PrismaClient();

// Importe les opportunités publiées en entier (programmes, appels à
// candidatures) décrites dans prisma/data/opportunites.json. Rejouable : une
// opportunité est retrouvée par (titre, établissement) et mise à jour, sinon
// créée.
async function main() {
  let created = 0;
  let updated = 0;

  for (const { deadline, category, ...item } of opportunites) {
    const data = {
      ...item,
      category: category as OpportunityCategory,
      deadline: new Date(`${deadline}T00:00:00.000Z`),
      contactEmail: null,
      isPublic: true,
    };
    const existing = await prisma.opportunity.findFirst({
      where: { title: item.title, hospital: item.hospital },
      select: { id: true },
    });

    if (existing) {
      await prisma.opportunity.update({ where: { id: existing.id }, data });
      updated++;
    } else {
      await prisma.opportunity.create({ data });
      created++;
    }
  }

  console.log(`Opportunités importées : ${created} créées, ${updated} mises à jour.`);
}

main()
  .catch((e) => {
    console.error("Erreur pendant l'import des opportunités :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
