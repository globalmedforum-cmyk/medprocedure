# Code Standards

## General

- Modularité stricte : séparer les composants d'affichage pur de la logique de mutation de données.
- Ne pas introduire de bibliothèques tierces superflues pour des fonctionnalités réalisables en React natif.
- Clarté du domaine : utiliser le vocabulaire médical et administratif adéquat dans le code (`procedure`, `step`, `specialty`, `mebeko`, `ffi`).

## TypeScript

- Mode strict activé en permanence (`strict: true`).
- Bannir l'usage de `any` ; utiliser des types inférés depuis Prisma ou des schémas Zod.
- Valider systématiquement les arguments de Server Actions via Zod.

## Next.js (App Router)

- Privilégier les Server Components par défaut pour la récupération de données.
- Ajouter `'use client'` uniquement sur les composants avec interactivité locale (ex : toggle de checklist, lecteur d'étape, filtres interactifs).
- Centraliser les mutations de données dans des Server Actions dédiées sous `actions/`.

## Styling

- Utiliser rigoureusement les variables de couleur définies dans `ui-context.md`.
- Pas de valeurs hexadécimales brutes dans les classes Tailwind.
- Garantir le responsive design sur smartphone pour toutes les vues du tableau de bord.

## API Routes & Server Actions

- Vérifier l'authentification Clerk (`auth()`) en en-tête de chaque Server Action.
- Renvoyer des réponses typées uniformes : `{ success: true, data }` ou `{ success: false, error }`.

## File Organization

- `app/` — Routes, layouts et pages Next.js.
- `components/ui/` — Primitives graphiques shadcn/ui.
- `components/shared/` — Composants réutilisables transverses (navbar, notifications).
- `prisma/` — Schéma Prisma et scripts de seed.
- `types/` — Déclarations de types TypeScript globaux.
