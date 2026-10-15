// Clé de stockage du thème choisi (clair ou sombre), partagée entre le script
// d'initialisation de app/layout.tsx et le bouton de l'en-tête.
export const THEME_STORAGE_KEY = "medprocedure-theme";

// Couleur de la barre du navigateur sur téléphone, selon le thème
export const THEME_COLORS = { light: "#F9FAFB", dark: "#0B1120" } as const;

export function applyThemeColor(isDark: boolean) {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? THEME_COLORS.dark : THEME_COLORS.light);
}
