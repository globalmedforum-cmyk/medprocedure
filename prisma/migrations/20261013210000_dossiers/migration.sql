-- Plusieurs dossiers par utilisateur et par procédure : la contrainte d'unicité
-- est remplacée par un simple index, et chaque dossier reçoit un nom et une
-- échéance facultative.
DROP INDEX IF EXISTS "user_procedure_progress_userId_procedureId_key";

ALTER TABLE "user_procedure_progress" ADD COLUMN "label" TEXT NOT NULL DEFAULT '',
ADD COLUMN "targetDate" TIMESTAMP(3);

CREATE INDEX "user_procedure_progress_userId_procedureId_idx" ON "user_procedure_progress"("userId", "procedureId");
