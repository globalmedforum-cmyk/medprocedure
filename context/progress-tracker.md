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

- **Durcissement données (2026-10-13)**:
  - `prisma/seed.ts` rendu rejouable : upsert des procédures par `slug`, des étapes par (procédure, ordre) et des opportunités par (titre, hôpital). Plus aucun `deleteMany` sur `users` ni `user_procedure_progress`.
  - `toggleStepProgress` : validation Zod des arguments, refus d'un `stepId` étranger à la procédure, mise à jour sous transaction avec verrou de ligne, purge des identifiants d'étapes orphelins.
  - Migration de référence `prisma/migrations/0_init` générée hors ligne depuis le schéma ; scripts `db:migrate` et `db:deploy` ajoutés.
  - Vérifié : `npx tsc --noEmit` et `npm run lint` à 0 erreur. Seed et action non exécutés contre la base.

- **Refonte UI/UX (2026-10-13)**:
  - Nouvelle direction documentée dans `context/ui-context.md` : thème clair uniquement, fond papier, accent bleu encre, Newsreader pour les titres, IBM Plex Sans et Mono pour le reste. Thème sombre, dégradés, ombres et surcharges CSS `.cl-*` supprimés.
  - Clerk : thème `shadcn` branché sur les jetons, interface en français (`@clerk/localizations`). `lang="fr"` sur le document.
  - `/editor` : liste numérotée des procédures avec l'avancement de l'utilisateur, à la place de la grille de cartes.
  - `/procedures/[slug]` : deux onglets (« Guide pas à pas », « Opportunités liées ») conformes à la spec ; sommaire des étapes, étape active, une seule action « Marquer comme terminée », message d'erreur visible si l'enregistrement échoue. `procedure-main-panel.tsx` remplacé par `procedure-step-panel.tsx`, `procedure-opportunities.tsx` et `types.ts`.
  - Retirés : boutons sans effet (« Enregistrer », « Partager », « Site officiel »), onglets « Checklist » et « Ressources officielles » (doublon et texte de remplissage), bannière violette, barre d'action flottante.
  - Liens officiels et rappel visa affichés selon le pays de la procédure (France-Visas hors Suisse, OFSP pour la Suisse) au lieu d'être identiques partout.
  - Vérifié : `tsc`, `eslint`, `npm run build`, et rendu à l'écran du catalogue, de la vue procédure (bureau, étroit, tiroir) et de la connexion. La validation d'une étape en étant connecté n'a pas été testée.

- **Thème noir (2026-10-13)** : à la demande, passage du thème clair à un fond noir avec texte blanc, accent orange pour les actions et l'étape active, liens en bleu (`--accent-secondary`). Seuls les jetons de `app/globals.css` et la classe `dark` changent ; `ui-context.md` mis à jour.

- **Administration (2026-10-13)** :
  - `/admin` réservé aux adresses listées dans la variable `ADMIN_EMAILS` (e-mail principal Clerk vérifié) ; sans cette variable, personne n'y accède. Les non-administrateurs reçoivent une 404. Contrôle répété dans chaque page et chaque Server Action (`lib/admin.ts`).
  - Vue d'ensemble : compteurs, liste des procédures et des opportunités.
  - `/admin/procedures/[id]` : modification de la présentation, modification, ajout et suppression d'étapes (numéro d'ordre unique par procédure, lien vidéo en https uniquement).
  - `/admin/opportunities/new` et `/admin/opportunities/[id]` : ajout, modification, suppression.
  - Server Actions dans `actions/admin.ts`, validées avec Zod (messages en français).
  - Vérifié : `tsc`, `eslint`, `npm run build`, et la redirection d'un visiteur non connecté vers la connexion. Les écrans et les formulaires n'ont pas été vus ni testés en tant qu'administrateur connecté.

- **Catégories d'opportunités (2026-10-13)** :
  - Schéma : enum `OpportunityCategory` (`FFI`, `STAGE_ASSOCIE`, `MEDECIN_ASSISTANT`, `FELLOWSHIP`, `PHD`, `CONGRES`) et champ obligatoire `Opportunity.category`. Migration `20261013170000_opportunity_category`, qui classe les opportunités existantes d'après leur titre.
  - Administration : opportunités réparties en trois groupes (postes hospitaliers, fellowship et PhD, congrès), chacun avec son bouton « Ajouter » ; catégorie choisie dans le formulaire.
  - Onglet « Opportunités liées » : filtré par catégorie selon la procédure (`lib/opportunity-categories.ts`), à la place de la comparaison sur le pays qui ne fonctionnait pas. Le stage d'observation n'a aucune catégorie associée.
  - Vérifié : `tsc`, `eslint`, `npm run build`. La migration n'est pas encore appliquée à la base.

- **Contenu des procédures (2026-10-13)** :
  - Septième procédure : « Médecin assistant en Suisse » (`medecin-assistant-suisse`, 7 étapes), reliée à la catégorie d'opportunités « Médecin assistant ».
  - Les sept procédures réécrites dans `prisma/procedures-content.ts` à partir des sources officielles consultées en octobre 2026 (OFSP, service-public.fr, France-Visas, facultés de médecine, AP-HP) : étapes formulées comme des actions, description courte, puis liste « En pratique » (pièces, montants, délais).
  - Vidéos YouTube factices retirées (plus aucun `videoUrl` en base).
  - Liens officiels par procédure dans `lib/procedure-resources.ts`, affichés sous chaque étape, avec une mention « à titre indicatif ». L'ancien bloc générique « Avant de déposer un visa » est supprimé, son contenu étant intégré aux étapes concernées.
  - `StepContent` : les lignes commençant par « - » deviennent des listes (utilisable aussi depuis l'admin).
  - Seed : les opportunités ne sont plus réécrites, seulement créées si absentes.
  - Contenu appliqué à la base par `npm run db:seed` ; vérifié à l'écran sur la nouvelle procédure.

- **Page d'accueil publique (2026-10-13)** : la racine `/` est publique (`proxy.ts`) et n'est plus une simple redirection. Elle présente le service, liste les procédures et les opportunités ouvertes lues en base, puis renvoie vers l'inscription. Un utilisateur connecté est toujours redirigé vers `/editor`. Vérifié : `tsc`, `eslint`, `npm run build`, rendu à l'écran en large et en étroit.

- **Procédures, seconde passe (2026-10-13)** :
  - « Doctorat (PhD) » et « Stage d'observation » passent à l'échelle européenne : pays « Europe », étapes générales avec les particularités de la France, de l'Allemagne et de la Belgique, liens européens (EURAXESS, Commission européenne, DAAD, FNRS).
  - « Stage FFI » ne décrit plus que le poste (statut, voie d'accès, arrivée, visa, prise de fonctions, validation des semestres). La candidature universitaire devient une huitième procédure, « DFMS et DFMSA » (`dfms-dfmsa`, 5 étapes).
  - Page d'accueil (non déployée) : mention des opportunités ajoutée à « Ce que contient chaque procédure », section « Opportunités ouvertes » retirée.

- **Logo (2026-10-13)** : logo fourni par le propriétaire (`public/logo.png`) affiché via `components/shared/logo.tsx` dans l'en-tête du site, la page d'accueil et l'écran de connexion ; icônes d'onglet remplacées (`app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`).

- **Bouton « Obtenir une assistance » (2026-10-13)** : présent en haut de chaque procédure et sous chaque étape. Il ouvre une fenêtre proposant un e-mail et un message WhatsApp déjà rédigés (procédure et étape en cours). Coordonnées dans `lib/contact.ts` ; l'option WhatsApp ne s'affiche que si `SUPPORT_WHATSAPP` est renseigné.

- **Téléphone d'abord (2026-10-13)** : passe sur l'accueil, la connexion, le catalogue et la vue procédure à 375 px. En-tête d'accueil réduit à « Se connecter » sur téléphone, boutons principaux en pleine largeur et hauts de 48 px, navigation précédente/suivante en deux colonnes, écran de connexion qui montre le formulaire sans défilement, couleur de barre du navigateur. Vérifié à l'écran à 375 px : aucun débordement horizontal. L'admin n'a pas été contrôlé à cette largeur. Mention « Une assistance personnalisée » ajoutée à la page d'accueil.

- **Bouton « Nous contacter » (2026-10-13)** : dans l'en-tête de la page d'accueil, pour les visiteurs sans compte. Il ouvre la même fenêtre e-mail / WhatsApp que l'assistance, désormais factorisée dans `components/shared/contact-dialog.tsx`. Sur téléphone, le nom du site est masqué dans cet en-tête pour laisser la place aux deux boutons.

## In Progress

- None.

## Next Up

- Marquer la migration de référence comme appliquée sur la base existante : `npx prisma migrate resolve --applied 0_init` (à lancer une seule fois, puis abandonner `db:push`).
- Remplir `context/project-overview.md` (encore le gabarit vide).
- Tableau de bord avec progression par procédure ; CI minimale (lint, types, build).

## Open Questions

- Le contenu des procédures a été rédigé d'après les sites officiels mais n'a pas été relu par un professionnel du domaine. Points à faire valider en priorité : le fait qu'un médecin diplômé hors UE ne peut être FFI que par un DFMS ou un DFMSA, la mention du visa long séjour correspondant, rémunération des stagiaires associés, absence de rémunération des stages d'observation, règles cantonales suisses hors Vaud.
- Les liens utiles sont dans le code (`lib/procedure-resources.ts`) et non modifiables depuis l'admin.
- Le seed réécrit les procédures et supprime les étapes absentes de `prisma/seed.ts` : le relancer en production écraserait les modifications faites depuis `/admin`. Faut-il le bloquer hors développement ?
- Synchronisation des utilisateurs Clerk : aujourd'hui à la première validation d'étape, avec e-mail de repli fictif. Passer à un webhook Clerk ?

## Architecture Decisions

- Le schéma évolue désormais par migrations Prisma versionnées, plus par `db push`, pour garder un historique et permettre le retour arrière.
- Le seed ne doit jamais supprimer de données utilisateur : les identifiants d'étapes sont référencés par `completedStepIds` et doivent rester stables.

## Session Notes

- [Context needed to resume work in the next session]
