import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Polices servies depuis app/fonts : le build ne télécharge rien chez Google
const plexSans = localFont({
  variable: "--font-sans",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-sans-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-sans-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/ibm-plex-sans-latin-600-normal.woff2", weight: "600" },
  ],
});

const plexMono = localFont({
  variable: "--font-mono",
  display: "swap",
  src: [
    { path: "./fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500" },
  ],
});

const newsreader = localFont({
  variable: "--font-serif",
  display: "swap",
  src: "./fonts/newsreader-latin-wght-normal.woff2",
  weight: "200 800",
});

export const metadata: Metadata = {
  title: "MedProcedure",
  description:
    "Les démarches des médecins qui viennent exercer ou se former en Europe, étape par étape.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${plexSans.variable} ${plexMono.variable} ${newsreader.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg-base text-text-primary font-sans">
        <ClerkProvider
          localization={frFR}
          appearance={{
            theme: shadcn,
            variables: {
              colorInput: "var(--bg-surface)",
              borderRadius: "0.375rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            },
            elements: {
              cardBox: {
                boxShadow: "none",
                border: "1px solid var(--border-default)",
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
