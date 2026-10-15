# UI Context

## Theme

Interface claire, minimaliste et aérée (branche `experimentation-ui`, en évaluation). Fond gris très clair, cartes blanches aux grands arrondis et à l'ombre légère, texte bleu nuit. L'orange est réservé aux actions principales, à la progression et à l'étape active ; le vert marque ce qui est terminé.

Principes :

- Les contenus sont posés dans des cartes blanches (`rounded-2xl`, bordure fine, `shadow-sm`, `hover:shadow-md`).
- Une seule action principale orange par zone. Les actions secondaires sont blanches à bordure fine.
- Texte courant en 16 px, jamais en dessous de 12 px. Titres en casse de phrase, à la française.
- Téléphone d'abord : chaque écran est conçu pour 375 px de large, puis élargi avec `sm:`, `md:` et `lg:`. Sur téléphone, les actions principales occupent toute la largeur et toute zone cliquable fait au moins 44 px de haut.

## Colors

| Role            | CSS Variable         | Value     |
| --------------- | -------------------- | --------- |
| Page background | `--bg-base`          | `#F9FAFB` |
| Surface (cartes)| `--bg-surface`       | `#FFFFFF` |
| Fond discret    | `--bg-subtle`        | `#F1F5F9` |
| Primary text    | `--text-primary`     | `#0F172A` |
| Muted text      | `--text-muted`       | `#475569` |
| Primary accent  | `--accent-primary`   | `#F25C05` |
| Accent hover    | `--accent-hover`     | `#D94F00` |
| Accent doux     | `--accent-soft`      | `#FFF1E8` |
| Links           | `--accent-secondary` | `#1D4ED8` |
| Border          | `--border-default`   | `#E2E8F0` |
| Error           | `--state-error`      | `#DC2626` |
| Success         | `--state-success`    | `#16A34A` |
| Warning         | `--state-warning`    | `#B45309` |

Les jetons shadcn/ui (`--primary`, `--card`, `--border`…) sont dérivés de ces variables dans `app/globals.css` ; Clerk les reprend via le thème `shadcn`.

Un mode sombre existe : la classe `dark` sur `<html>` redéfinit ces variables (bloc `.dark` de `app/globals.css`). Le bouton de l'en-tête (`ThemeToggle`) la bascule et mémorise le choix dans le navigateur ; un script de `app/layout.tsx` l'applique avant l'affichage. Le mode clair est celui par défaut.

## Typography

| Role            | Font              | Variable      | Classe                     |
| --------------- | ----------------- | ------------- | -------------------------- |
| Titres          | Plus Jakarta Sans | `--font-sans` | `font-heading` + `font-bold` |
| Texte et UI     | Plus Jakarta Sans | `--font-sans` | `font-sans`                |
| Numéros, délais | IBM Plex Mono     | `--font-mono` | `font-mono`                |

Les polices sont hébergées dans `app/fonts/` et chargées avec `next/font/local`. Le logo, fourni blanc sur fond noir, est affiché en noir grâce aux classes `invert mix-blend-multiply`.

## Border Radius

`--radius` vaut `0.75rem`. Boutons et champs : `rounded-xl`. Cartes, fenêtres et sections : `rounded-2xl`.

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
