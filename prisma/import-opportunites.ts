import { readFileSync } from "node:fs";
import path from "node:path";
import { PrismaClient, type OpportunityCategory } from "@prisma/client";

const prisma = new PrismaClient();

interface OpportunityData {
  category: OpportunityCategory;
  title: string;
  hospital: string;
  location: string;
  country: string;
  specialty: string;
  deadline: string | null;
  requirements: string[];
  // Absent : publiée en entier (programmes, appels à candidatures)
  isPublic?: boolean;
}

// Importe des opportunités décrites dans un fichier JSON de prisma/data
// (par défaut opportunites.json ; ex. : npm run db:import-opportunites --
// offres-fhf.json). Rejouable : une opportunité est retrouvée par (titre,
// établissement) et mise à jour, sinon créée.
async function main() {
  const file = path.join(__dirname, "data", process.argv[2] ?? "opportunites.json");
  const items = JSON.parse(readFileSync(file, "utf-8")) as OpportunityData[];
  let created = 0;
  let updated = 0;

  for (const { deadline, isPublic = true, ...item } of items) {
    const data = {
      ...item,
      deadline: deadline ? new Date(`${deadline}T00:00:00.000Z`) : null,
      contactEmail: null,
      isPublic,
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

  console.log(
    `${path.basename(file)} : ${created} créées, ${updated} mises à jour.`
  );
}

main()
  .catch((e) => {
    console.error("Erreur pendant l'import des opportunités :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
