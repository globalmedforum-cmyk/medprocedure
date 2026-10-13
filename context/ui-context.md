# UI Context

## Theme

Un dossier administratif bien tenu, pas un tableau de bord. Thème clair uniquement : fond papier, encre sombre, un seul accent bleu encre réservé aux actions et à l'étape active. Le vert ne sert qu'à marquer ce qui est terminé.

Principes :

- Des listes séparées par des filets plutôt que des cartes. Pas d'ombres, pas de dégradés, pas de flou d'arrière-plan.
- Une seule action principale par écran. Pas de bouton sans effet.
- Une information n'apparaît qu'une fois (l'avancement n'est pas répété dans trois blocs).
- Texte courant en 16 px, jamais en dessous de 12 px. Titres en casse de phrase, à la française.
- Les icônes accompagnent une action ; elles ne décorent pas les titres.

## Colors

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#F3F2EE` |
| Surface         | `--bg-surface`     | `#FCFCFA` |
| Primary text    | `--text-primary`   | `#17211D` |
| Muted text      | `--text-muted`     | `#5C6661` |
| Primary accent  | `--accent-primary` | `#233A8B` |
| Accent hover    | `--accent-hover`   | `#1A2C6B` |
| Border          | `--border-default` | `#DAD9D2` |
| Error           | `--state-error`    | `#B42318` |
| Success         | `--state-success`  | `#1E7B4F` |
| Warning         | `--state-warning`  | `#8A5A00` |

Les jetons shadcn/ui (`--primary`, `--card`, `--border`…) sont dérivés de ces variables dans `app/globals.css` ; Clerk les reprend via le thème `shadcn`. Il n'y a pas de thème sombre.

## Typography

| Role            | Font           | Variable       | Classe         |
| --------------- | -------------- | -------------- | -------------- |
| Titres          | Newsreader     | `--font-serif` | `font-heading` |
| Texte et UI     | IBM Plex Sans  | `--font-sans`  | `font-sans`    |
| Numéros, délais | IBM Plex Mono  | `--font-mono`  | `font-mono`    |

## Border Radius

`--radius` vaut `0.375rem`. Boutons, champs et vidéo utilisent `rounded-md`. Les listes et sections n'ont pas de coins arrondis : elles sont délimitées par des filets.

## Component Library

- shadcn/ui configuré sur Tailwind CSS ; les primitives de `components/ui/` ne sont pas modifiées, le style passe par les jetons et `className`.
- Composants utilisés : `Button`, `Progress`, `Tabs` (variante `line`), `Sheet`.

## Layout Patterns

- **En-tête :** `SiteHeader` (`components/shared/`), nom du produit en texte et profil utilisateur.
- **Catalogue (`/editor`) :** liste numérotée des procédures, une ligne par procédure, avec pays, nombre d'étapes et avancement de l'utilisateur.
- **Vue procédure :** titre, avancement, puis deux onglets « Guide pas à pas » et « Opportunités liées ». Le guide est en deux colonnes : sommaire des étapes à gauche (tiroir sur mobile), étape active à droite.
- **Opportunités :** liste, avec date limite et contact dans une colonne à droite.

## Icons

- Lucide React exclusivement, en `h-4 w-4`.
