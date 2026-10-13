# UI Context

## Theme

Un dossier administratif bien tenu, pas un tableau de bord. Thème sombre uniquement : fond noir, texte blanc. L'orange est réservé aux actions et à l'étape active, le bleu aux liens hypertexte. Le vert ne sert qu'à marquer ce qui est terminé.

Principes :

- Des listes séparées par des filets plutôt que des cartes. Pas d'ombres, pas de dégradés, pas de flou d'arrière-plan.
- Une seule action principale par écran. Pas de bouton sans effet.
- Une information n'apparaît qu'une fois (l'avancement n'est pas répété dans trois blocs).
- Texte courant en 16 px, jamais en dessous de 12 px. Titres en casse de phrase, à la française.
- Les icônes accompagnent une action ; elles ne décorent pas les titres.

## Colors

| Role            | CSS Variable         | Value     |
| --------------- | -------------------- | --------- |
| Page background | `--bg-base`          | `#000000` |
| Surface         | `--bg-surface`       | `#111111` |
| Primary text    | `--text-primary`     | `#FFFFFF` |
| Muted text      | `--text-muted`       | `#A3A3A3` |
| Primary accent  | `--accent-primary`   | `#FF7A1A` |
| Accent hover    | `--accent-hover`     | `#FF9547` |
| Links           | `--accent-secondary` | `#6EA8FF` |
| Border          | `--border-default`   | `#2A2A2A` |
| Error           | `--state-error`      | `#FF6B5E` |
| Success         | `--state-success`    | `#3DD68C` |
| Warning         | `--state-warning`    | `#F5B83D` |

Les jetons shadcn/ui (`--primary`, `--card`, `--border`…) sont dérivés de ces variables dans `app/globals.css` ; Clerk les reprend via le thème `shadcn`. Le texte posé sur l'orange est noir. La classe `dark` est fixée sur `<html>` ; il n'y a pas de thème clair.

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
