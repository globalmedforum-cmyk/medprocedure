-- Une opportunité peut être publiée en entier (établissement, conditions et
-- liens visibles par tous), comme les congrès.
ALTER TABLE "opportunities" ADD COLUMN "isPublic" BOOLEAN NOT NULL DEFAULT false;
