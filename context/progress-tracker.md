# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Feature Spec 05 Complete

## Current Goal

- Ready for next phase (Refinement, testing, or additional features)

## Completed

- **01-design-system.md**:
  - Configured `shadcn/ui` with Tailwind CSS v4.
  - Installed `lucide-react`, `clsx`, `tailwind-merge`, and `class-variance-authority`.
  - Created `lib/utils.ts` with `cn()` utility.
  - Generated core UI primitives under `components/ui/` (`Button`, `Card`, `Dialog`, `Input`, `Tabs`, `Textarea`, `ScrollArea`).
  - Configured dark theme and updated root layout to use the dark theme.
- **03-auth.md**:
  - Configured `ClerkProvider` in `app/layout.tsx` using Clerk's `dark` theme from `@clerk/ui/themes` with appearance variables mapped to application CSS variables (no hardcoded colors).
  - Created responsive two-panel `AuthShell` component (`components/auth/auth-shell.tsx`) with left branding/features on large screens and centered form on all viewports without gradients, oversized heroes, or feature cards.
  - Implemented `/sign-in` and `/sign-up` catch-all pages using `SignIn` and `SignUp` inside `AuthShell`.
  - Configured `proxy.ts` at project root with `createRouteMatcher` using existing environment variables (`NEXT_PUBLIC_CLERK_SIGN_IN_URL`, `NEXT_PUBLIC_CLERK_SIGN_UP_URL`), protecting all non-auth routes by default.
  - Updated `/` (`app/page.tsx`) to redirect authenticated users to `/editor` and unauthenticated users to `/sign-in`.
  - Built `/editor` (`app/editor/page.tsx`) with a clean navbar featuring `UserButton` for profile management and logout.
  - Verified `npm run build` and `npm run lint` passing with 0 errors.
- **04-auth-ui-styling.md**:
  - Implemented exact 50/50 split layout (`components/auth/auth-shell.tsx`) matching reference screenshot with differentiated dark slate left panel (`#0c0e12`), cyan square logo, big headline ("Votre parcours médical en Europe commence ici."), subtext, 3 feature items with rounded cyan icon badges (procédures officielles, accompagnement étape par étape, opportunités médicales), and copyright footer.
  - Styled right-side Clerk authentication card (`#0f1115` on pure black `#000000` background) with cyan CTA button (`#06b6d4`), dark social login buttons, and cyan links.
  - Integrated `Inter` and `JetBrains Mono` fonts matching `context/ui-context.md` guidelines across the entire application and Clerk components.
- **02-database-schema.md**:
  - Configured Prisma ORM with PostgreSQL database schema (`prisma/schema.prisma`) defining `User`, `Procedure`, `Step`, `UserProcedureProgress`, and `Opportunity` models with `ProcedureStatus` enum.
  - Created Prisma client singleton in `lib/prisma.ts` with Next.js development hot-reload caching.
  - Created initial seed dataset script (`prisma/seed.ts`) with realistic procedures (MEBEKO Suisse, FFI France, Stage d'Observation) and hospital opportunities.
  - Configured `package.json` scripts (`db:generate`, `db:push`, `db:seed`) and created `.env.example` with Supabase pooler/direct connection strings.
  - Verified `npx prisma generate`, `npx tsc --noEmit`, and `npm run lint` with 0 errors.
- **05-procedures-module.md**:
  - Registered all semantic tokens from `context/ui-context.md` in `app/globals.css` (`--bg-base`, `--bg-surface`, `--text-primary`, `--text-muted`, `--accent-primary`, `--accent-hover`, `--border-default`, `--state-error`, `--state-success`) without hardcoded hex colors.
  - Built core UI primitives under `components/ui/` (`Progress`, `Badge`, `Separator`, `Checkbox`, `Sheet`).
  - Added `videoUrl String?` to `Step` model and synchronized database with `npx prisma db push && npx prisma generate`.
  - Implemented Server Action `toggleStepProgress` (`actions/procedure-progress.ts`) with Clerk authentication, optimistic updates, and database persistence on `UserProcedureProgress`.
  - Seeded all **6 medical procedures** and congresses in PostgreSQL (`prisma/seed.ts`):
    1. *Doctorat (PhD)* (`Recherche & Santé`)
    2. *Équivalence Suisse (MEBEKO)* (`Suisse / OFSP`)
    3. *Stage d'Observation* (`Immersion Hospitalière`)
    4. *Stage FFI (Interne)* (`Pratique Rémunérée`)
    5. *Stage Associé* (`Pratique Hospitalière`)
    6. *Participation aux Congrès* (`Événements & Visas`) avec les 8 étapes officielles visa et congrès médicaux réels (FCPC Nantes, Congrès SFA Montpellier, Congrès SFAR Paris, Congrès SCGP Bordeaux).
  - Built 2-column layout route (`/procedures/[slug]`):
    - Left column: Chronological vertical stepper (`ProcedureStepperSidebar`) with visual status indicators (validated checkmark, active blue ring, upcoming dotted circle).
    - Right column: Main panel (`ProcedureMainPanel`) with breadcrumbs, guidance alert box, active step purple highlight banner, progress card with dynamic percentage, 16:9 responsive media container (cleanly collapsed if absent), multi-tab content (procedure details, interactive checklist, related hospital opportunities, official resources), and sticky bottom action bar.
    - Mobile responsiveness: Collapsible drawer (`ProcedureMobileDrawer`) using shadcn `Sheet`.
  - Redesigned `/editor` catalog matching Image 1 with the 6 stylized procedure cards.
  - Verified `npx tsc --noEmit`, `npm run lint` (0 errors, 0 warnings), and `npm run build` passing cleanly.

## In Progress

- None.

## Next Up

- Additional features or procedures enhancements as requested.

## Open Questions

- [Any unresolved product or technical decisions]

## Architecture Decisions

- [Decisions made that affect the system design or
  data model — include why the decision was made]

## Session Notes

- [Context needed to resume work in the next session]
