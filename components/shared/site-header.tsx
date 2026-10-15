import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Logo } from "./logo";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border-default bg-bg-surface/90 backdrop-blur">
      <div className="flex h-16 w-full items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/editor" aria-label="MedProcedure, tableau de bord">
          <Logo />
        </Link>

        <UserButton />
      </div>
    </header>
  );
}
