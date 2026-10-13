import { ClerkProvider } from "@clerk/nextjs";
import { frFR } from "@clerk/localizations";
import { shadcn } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedProcedure",
  description:
    "Les démarches des médecins qui viennent exercer ou se former en Europe, étape par étape.",
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
