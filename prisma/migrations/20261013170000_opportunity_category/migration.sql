-- CreateEnum
CREATE TYPE "OpportunityCategory" AS ENUM ('FFI', 'STAGE_ASSOCIE', 'MEDECIN_ASSISTANT', 'FELLOWSHIP', 'PHD', 'CONGRES');

-- AlterTable : colonne ajoutée avec une valeur provisoire, le temps de classer l'existant
ALTER TABLE "opportunities" ADD COLUMN "category" "OpportunityCategory" NOT NULL DEFAULT 'MEDECIN_ASSISTANT';

-- Classement des opportunités existantes d'après leur titre
UPDATE "opportunities" SET "category" = 'CONGRES' WHERE "title" ILIKE 'Congrès%';
UPDATE "opportunities" SET "category" = 'FFI' WHERE "title" ILIKE '%FFI%';
UPDATE "opportunities" SET "category" = 'FELLOWSHIP' WHERE "title" ILIKE '%Fellowship%';
UPDATE "opportunities" SET "category" = 'PHD' WHERE "title" ILIKE '%PhD%' OR "title" ILIKE '%Doctorat%';
UPDATE "opportunities" SET "category" = 'STAGE_ASSOCIE' WHERE "title" ILIKE '%Associé%' AND "title" NOT ILIKE '%FFI%';

ALTER TABLE "opportunities" ALTER COLUMN "category" DROP DEFAULT;

-- CreateIndex
CREATE INDEX "opportunities_category_idx" ON "opportunities"("category");
