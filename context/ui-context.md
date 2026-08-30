# UI Context

## Theme

Thème médical professionnel, propre et rassurant. Dominante claire avec fonds blancs et ardoise pâle, rehaussée par des accents bleu médical et cyan profond pour le focus et les indicateurs d'état.

## Colors

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#F8FAFC` |
| Surface (Cards) | `--bg-surface`     | `#FFFFFF` |
| Primary text    | `--text-primary`   | `#0F172A` |
| Muted text      | `--text-muted`     | `#64748B` |
| Primary accent  | `--accent-primary` | `#0284C7` |
| Accent hover    | `--accent-hover`   | `#0369A1` |
| Border          | `--border-default` | `#E2E8F0` |
| Error           | `--state-error`    | `#EF4444` |
| Success         | `--state-success`  | `#10B981` |

## Typography

| Role      | Font                | Variable      |
| --------- | ------------------- | ------------- |
| UI text   | Inter / Geist Sans  | `--font-sans` |
| Code/mono | JetBrains Mono      | `--font-mono` |

## Border Radius

| Context           | Class            |
| ----------------- | ---------------- |
| Inline / small UI | `rounded-md`     |
| Cards / panels    | `rounded-xl`     |
| Modals / Stepper  | `rounded-2xl`    |

## Component Library

- shadcn/ui configuré sur Tailwind CSS.
- Composants clés : `Card`, `Progress`, `Badge`, `Button`, `ScrollArea`, `Separator`, `Tabs`.

## Layout Patterns

- **Dashboard :** Header fixe avec profil utilisateur, grille de résumé en haut, listing des procédures en cours.
- **Vue Procédure :** Layout 2 colonnes avec barre latérale gauche fixe (liste ordonnée des étapes + checkboxes) et corps principal défilant (contenu pédagogique, embeds vidéo, call to actions).
- **Cartes d'opportunités :** Grille responsive (1 col mobile, 2 col tablette, 3 col desktop) avec tags de spécialité et badges de date limite.

## Icons

- Lucide React exclusivement.
- Dimensions standard : `h-4 w-4` pour les statuts et boutons denses, `h-5 w-5` pour la navigation principale.
