import { PrismaClient } from "@prisma/client";
import congres from "./data/congres.json";

const prisma = new PrismaClient();

// Importe les prochains congrès des sociétés savantes françaises, relevés sur
// leurs sites officiels (prisma/data/congres.json). Rejouable : un congrès est
// retrouvé par (titre, lieu) et mis à jour, sinon créé. Les congrès déjà
// passés restent en base ; le site les masque après leur date.
async function main() {
  let created = 0;
  let updated = 0;

  for (const { deadline, ...item } of congres) {
    const data = {
      ...item,
      category: "CONGRES" as const,
      deadline: new Date(`${deadline}T00:00:00.000Z`),
      contactEmail: null,
    };
    const existing = await prisma.opportunity.findFirst({
      where: { category: "CONGRES", title: item.title, hospital: item.hospital },
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

  console.log(`Congrès importés : ${created} créés, ${updated} mis à jour.`);
}

main()
  .catch((e) => {
    console.error("Erreur pendant l'import des congrès :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
