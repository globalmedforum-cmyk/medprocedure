import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

export const viewport: Viewport = {
  themeColor: "#F9FAFB",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${jakarta.variable} ${plexMono.variable} h-full antialiased`}
    >
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
                boxShadow: "0 1px 3px rgb(15 23 42 / 0.06), 0 8px 24px rgb(15 23 42 / 0.06)",
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
