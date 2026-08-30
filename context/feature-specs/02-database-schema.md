Read `AGENTS.md` before starting.

We're setting up the database layer with Prisma ORM and Supabase PostgreSQL.

### Scope

1. Install Prisma CLI and Prisma Client (`@prisma/client`, `prisma`).
2. Initialize Prisma configuration under `prisma/schema.prisma`.
3. Define the relational schema:
   - `User`: `id`, `clerkId` (unique), `email`, `name`, `specialty`, `createdAt`, `updatedAt`.
   - `Procedure`: `id`, `slug` (unique), `title`, `description`, `country`, `category`, `createdAt`, `updatedAt`.
   - `Step`: `id`, `procedureId`, `order` (int), `title`, `description`, `content`, `estimatedDuration`, `isRequired` (boolean), relations with `Procedure`.
   - `UserProcedureProgress`: `id`, `userId`, `procedureId`, `status` (enum: `NOT_STARTED`, `IN_PROGRESS`, `COMPLETED`), `completedStepIds` (relation or array), `createdAt`, `updatedAt`.
   - `Opportunity`: `id`, `title`, `hospital`, `location`, `country`, `specialty`, `deadline`, `requirements`, `contactEmail`, `createdAt`, `updatedAt`.
4. Create the Prisma client singleton in `lib/prisma.ts` with Next.js hot-reload cache handling.
5. Create initial seed data script (`prisma/seed.ts`) with medical procedures (MEBEKO Switzerland, FFI France) and sample medical opportunities.
6. Configure `package.json` with prisma scripts (`db:generate`, `db:push`, `db:seed`).

### Check when done
- `npx prisma generate` runs successfully and exports typed models
- `lib/prisma.ts` instantiates client without type or import errors
- `npx tsc --noEmit` and `npm run lint` pass without errors
