-- AlterTable : acceptation des conditions générales d'utilisation
ALTER TABLE "users" ADD COLUMN "termsVersion" TEXT,
ADD COLUMN "termsAcceptedAt" TIMESTAMP(3);
