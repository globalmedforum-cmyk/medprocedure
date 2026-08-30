import { SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <header className="absolute top-4 right-4 flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button size="sm">Sign Up</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>

      <main className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">medprocedure</h1>
        <p className="text-muted-foreground text-sm max-w-md">
          {"Plateforme de suivi des procédures de qualification et d'installation médicale."}
        </p>

        <Show when="signed-out">
          <div className="flex items-center gap-3 mt-4">
            <SignInButton mode="modal">
              <Button variant="default">Se connecter</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">Créer un compte</Button>
            </SignUpButton>
          </div>
        </Show>
        <Show when="signed-in">
          <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
            Connecté avec succès.
          </div>
        </Show>
      </main>
    </div>
  );
}
