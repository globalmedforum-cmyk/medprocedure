import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { THEME_COLORS, THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

// Polices servies depuis app/fonts : le build ne télécharge rien chez Google
const jakarta = localFont({
  variable: "--font-sans",
  display: "swap",
  src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2",
  weight: "200 800",
});

const plexMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
});

export const metadata: Metadata = {
  title: "MedProcedure",
  description:
    "Les démarches des médecins qui viennent exercer ou se former en Europe, étape par étape.",
};

// Applique le thème mémorisé avant le premier affichage, sans clignotement
// (la couleur de la barre du navigateur est ajustée une fois l'en-tête lu)
const themeScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark"){document.documentElement.classList.add("dark");document.addEventListener("DOMContentLoaded",function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_COLORS.dark}")})}}catch(e){}`;

export const viewport: Viewport = {
  themeColor: THEME_COLORS.light,
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      // La classe `dark` est posée par le script ci-dessous avant l'affichage
      suppressHydrationWarning
      className={`${jakarta.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary font-sans">
        <ClerkProvider
          localization={frFR}
          appearance={{
            theme: shadcn,
            variables: {
              colorInput: "var(--bg-surface)",
              borderRadius: "0.75rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            },
            elements: {
              cardBox: {
                boxShadow:
                  "0 1px 3px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.06)",
                border: "1px solid var(--border-default)",
                borderRadius: "1rem",
              },
              formButtonPrimary: {
                fontWeight: 600,
              },
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
