import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export function SiteHeader() {
  return (
    <header className="border-b border-border-default bg-bg-base">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link
          href="/editor"
          className="font-heading text-lg font-medium tracking-tight text-text-primary"
        >
          MedProcedure
        </Link>

        <UserButton />
      </div>
    </header>
  );
}
