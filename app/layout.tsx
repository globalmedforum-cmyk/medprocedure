import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "medprocedure",
  description: "Qualification et conformité médicale",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-foreground font-sans">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "#0d0d0d",
              colorForeground: "#ededed",
              colorMutedForeground: "#a1a1aa",
              colorMuted: "#18181b",
              colorPrimary: "#06b6d4",
              colorPrimaryForeground: "#000000",
              colorInput: "#161618",
              colorInputForeground: "#ffffff",
              colorNeutral: "#ffffff",
              colorDanger: "#ef4444",
              colorRing: "#06b6d4",
              borderRadius: "0.625rem",
            },
            elements: {
              card: "bg-[#0d0d0d] border border-zinc-800/80 rounded-2xl shadow-none p-8 max-w-[400px] w-full",
              rootBox: "w-full flex justify-center",
              headerTitle: "text-white font-semibold text-lg tracking-tight text-center",
              headerSubtitle: "text-zinc-400 text-xs text-center",
              socialButtonsBlockButton:
                "bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-medium rounded-lg hover:bg-zinc-800 transition-colors",
              socialButtonsBlockButtonText: "text-zinc-200 text-xs font-medium",
              dividerRow: "my-4",
              dividerLine: "bg-zinc-800",
              dividerText: "text-zinc-500 text-xs font-normal",
              formFieldLabel: "text-zinc-300 text-xs font-medium mb-1.5",
              formFieldInput:
                "bg-[#161618] border border-zinc-800 text-white placeholder:text-zinc-500 rounded-lg text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all",
              formButtonPrimary:
                "bg-[#06b6d4] hover:bg-[#22d3ee] text-black font-semibold text-sm rounded-lg shadow-sm transition-colors py-2.5",
              footerActionText: "text-zinc-400 text-xs",
              footerActionLink:
                "text-[#06b6d4] hover:text-[#22d3ee] font-medium text-xs transition-colors",
              footer: "bg-transparent",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}