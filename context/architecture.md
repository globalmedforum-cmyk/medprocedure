# Architecture Context

## Stack

| Layer     | Technology                  | Role                                              |
| --------- | --------------------------- | ------------------------------------------------- |
| Framework | Next.js 15+ (App Router)    | Rendu serveur/client, routing et API Server Actions |
| UI        | Tailwind CSS + shadcn/ui    | Système de design, composants accessibles et réactifs |
| Auth      | Clerk                       | Gestion des sessions, inscriptions et sécurité     |
| Database  | Supabase (PostgreSQL)       | Stockage des données relationnelles               |
| ORM       | Prisma                      | Modélisation des types et requêtage typé           |

## System Boundaries

- `app/(auth)/` — Pages de connexion et d'inscription gérées via Clerk.
- `app/(dashboard)/` — Routes protégées : vue d'ensemble, catalogue d'opportunités et exécution de procédure.
- `components/procedures/` — Composants d'exécution : sidebar des étapes, barre de progression, visualiseur d'étape.
- `components/opportunities/` — Composants de présentation des cartes et filtres.
- `lib/prisma.ts` — Client singleton Prisma pour l'accès aux données.
- `actions/` — Server Actions Next.js pour valider les étapes et muter l'état utilisateur.

## Storage Model

- **Database (PostgreSQL via Supabase)** : Profils utilisateurs (synchronisés depuis Clerk), définitions des procédures, étapes séquentielles, opportunités publiées, et enregistrements de progression (`UserProcedureProgress`).
- **Blob/File Storage** : Aucun stockage de fichiers requis pour cette phase.

## Auth and Access Model

- L'authentification est déléguée à Clerk via middleware Next.js.
- Chaque médecin est rattaché à son identifiant unique Clerk (`clerkId`).
- Un utilisateur ne peut lire et modifier que ses propres enregistrements de progression.
- Les données de procédures et d'opportunités sont en lecture seule pour les praticiens.

## Invariants

1. Aucune étape ne peut être enregistrée avec un identifiant utilisateur non authentifié.
2. Le calcul de progression d'une procédure dépend strictement du ratio étapes complétées / total d'étapes actives.
3. Aucun document personnel n'est collecté ou stocké sur les serveurs de l'application.
4. Les contenus textuels et étapes doivent rester accessibles même sans connexion vidéo externe.

