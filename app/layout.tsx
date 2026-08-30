import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "medprocedure",
  description: "Plateforme de qualification et de conformité médicale",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased font-sans`}
    >
      <body className="min-h-full flex flex-col bg-black text-foreground font-sans antialiased">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "#0f1115",
              colorForeground: "#ededed",
              colorMutedForeground: "#a1a1aa",
              colorMuted: "#18181b",
              colorPrimary: "#06b6d4",
              colorPrimaryForeground: "#000000",
              colorInput: "#16181d",
              colorInputForeground: "#ffffff",
              colorNeutral: "#ffffff",
              colorDanger: "#ef4444",
              colorRing: "#06b6d4",
              borderRadius: "0.75rem",
              fontFamily: "var(--font-sans), system-ui, sans-serif",
            },
            elements: {
              card: "bg-[#0f1115] border border-zinc-800/80 rounded-2xl shadow-2xl p-8 max-w-[420px] w-full font-sans",
              rootBox: "w-full flex justify-center font-sans",
              headerTitle: "text-white font-semibold text-lg tracking-tight text-center font-sans",
              headerSubtitle: "text-zinc-400 text-xs text-center font-sans mt-1",
              socialButtonsBlockButton:
                "bg-[#16181d] border border-zinc-800/90 text-zinc-200 text-xs font-medium rounded-lg hover:bg-zinc-800/80 transition-colors font-sans py-2.5",
              socialButtonsBlockButtonText: "text-zinc-200 text-xs font-medium font-sans",
              dividerRow: "my-5",
              dividerLine: "bg-zinc-800",
              dividerText: "text-zinc-500 text-xs font-normal font-sans",
              formFieldLabel: "text-zinc-300 text-xs font-medium mb-1.5 font-sans",
              formFieldInput:
                "bg-[#16181d] border border-zinc-800 text-white placeholder:text-zinc-500 rounded-lg text-sm focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans py-2.5 px-3.5",
              formButtonPrimary:
                "bg-[#06b6d4] hover:bg-[#22d3ee] text-black font-semibold text-sm rounded-lg shadow-sm transition-colors py-2.5 font-sans",
              footerActionText: "text-zinc-400 text-xs font-sans",
              footerActionLink:
                "text-[#06b6d4] hover:text-[#22d3ee] font-medium text-xs transition-colors font-sans",
              footer: "bg-transparent font-sans pt-2",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}