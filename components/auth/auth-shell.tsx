import React from "react";

interface AuthShellProps {
  children: React.ReactNode;
}

const procedures = [
  "Doctorat (PhD)",
  "Équivalence suisse (MEBEKO)",
  "Stage d'observation",
  "Stage FFI",
  "Stage associé",
  "Participation aux congrès",
];

export function AuthShell({ children }: AuthShellProps) {
  return (
    <div className="grid min-h-screen w-full grid-cols-1 bg-bg-base lg:grid-cols-[minmax(0,5fr)_minmax(0,4fr)]">
      <aside className="flex flex-col justify-between gap-12 border-b border-border-default px-6 py-8 sm:px-12 lg:border-r lg:border-b-0 lg:px-16 lg:py-12">
        <span className="font-heading text-lg font-medium tracking-tight text-text-primary">
          MedProcedure
        </span>

        <div className="max-w-xl space-y-10">
          <div className="space-y-4">
            <h1 className="font-heading text-3xl leading-tight font-medium tracking-tight text-text-primary sm:text-4xl">
              Les démarches pour exercer ou se former en Europe, étape par
              étape.
            </h1>
            <p className="max-w-md text-base leading-relaxed text-text-muted">
              Pour chaque procédure : les pièces à réunir, l&apos;ordre dans
              lequel les obtenir et les délais à prévoir.
            </p>
          </div>

          <ol className="hidden border-t border-border-default sm:block">
            {procedures.map((title, index) => (
              <li
                key={title}
                className="flex items-baseline gap-4 border-b border-border-default py-2.5 text-sm text-text-primary"
              >
                <span className="font-mono text-xs text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{title}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="text-sm text-text-muted">
          &copy; {new Date().getFullYear()} MedProcedure
        </p>
      </aside>

      <main className="flex items-center justify-center px-6 py-12 sm:px-12">
        <div className="flex w-full max-w-[420px] justify-center">
          {children}
        </div>
      </main>
    </div>
  );
}
