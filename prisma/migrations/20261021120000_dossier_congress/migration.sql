-- Un dossier peut être rattaché à un congrès (opportunité) : le guide
-- affiche alors les dates, le lieu et les liens de ce congrès.
ALTER TABLE "user_procedure_progress" ADD COLUMN "opportunityId" TEXT;

CREATE INDEX "user_procedure_progress_opportunityId_idx" ON "user_procedure_progress"("opportunityId");

ALTER TABLE "user_procedure_progress" ADD CONSTRAINT "user_procedure_progress_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "opportunities"("id") ON DELETE SET NULL ON UPDATE CASCADE;
