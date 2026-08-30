import { UserButton } from "@clerk/nextjs";

export default function EditorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Editor Navbar */}
      <header className="h-14 border-b border-border px-6 flex items-center justify-between bg-card">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-lg tracking-tight">medprocedure</span>
          <span className="text-xs text-muted-foreground font-mono px-2 py-0.5 rounded bg-muted">
            editor
          </span>
        </div>

        <div className="flex items-center gap-4">
          <UserButton />
        </div>
      </header>

      {/* Editor Main Content Area */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-2">
          <h2 className="text-xl font-medium">Espace Éditeur</h2>
          <p className="text-sm text-muted-foreground">
            Bienvenue dans votre espace de gestion des procédures médicales.
          </p>
        </div>
      </main>
    </div>
  );
}
