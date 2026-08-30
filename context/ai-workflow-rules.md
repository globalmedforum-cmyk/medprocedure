# AI Workflow Rules

## Approach

Développement incrémental orienté spécifications (spec-driven workflow)[span_1](start_span)[span_1](end_span). Toutes les modifications de code doivent s'aligner rigoureusement sur les définitions de `project-overview.md` et respecter les règles d'`architecture.md`[span_2](start_span)[span_2](end_span). Aucune fonctionnalité non documentée ne doit être improvisée[span_3](start_span)[span_3](end_span).

## Scoping Rules

- Traiter une seule fonctionnalité ou composant à la fois[span_4](start_span)[span_4](end_span).
- Préférer de petits commits fonctionnels et vérifiables plutôt que des blocs monolithiques[span_5](start_span)[span_5](end_span).
- Ne pas mélanger la modélisation de base de données et la mise en page d'interface dans la même tâche[span_6](start_span)[span_6](end_span).

## When to Split Work

Scinder immédiatement la tâche si elle englobe à la fois :
- La modification du schéma Prisma et l'écriture de composants UI complexes.
- L'ajout d'une nouvelle procédure métier et la refonte des routes de navigation.
- Des ajustements d'authentification Clerk et la manipulation de données métier.

## Handling Missing Requirements

- Ne pas inventer de règles administratives spécifiques aux procédures médicales sans validation[span_7](start_span)[span_7](end_span).
- Noter les zones de flou réglementaire dans la section `Open Questions` de `progress-tracker.md`[span_8](start_span)[span_8](end_span)[span_9](start_span)[span_9](end_span).

## Protected Files

Ne pas modifier sans validation explicite :
- `components/ui/*` (composants générés par le CLI shadcn/ui)[span_10](start_span)[span_10](end_span).
- Fichiers de configuration racine critique (`next.config.mjs`, `tailwind.config.ts`, `middleware.ts`).

## Keeping Docs in Sync

Mettre à jour systématiquement `progress-tracker.md` après chaque unité de code fonctionnelle[span_11](start_span)[span_11](end_span)[span_12](start_span)[span_12](end_span).

## Before Moving to the Next Unit

1. L'unité courante est fonctionnelle de bout en bout[span_13](start_span)[span_13](end_span).
2. `npm run build` s'exécute sans erreur de compilation TypeScript[span_14](start_span)[span_14](end_span).
3. `progress-tracker.md` est synchronisé avec les livrables récents[span_15](start_span)[span_15](end_span)[span_16](start_span)[span_16](end_span).
