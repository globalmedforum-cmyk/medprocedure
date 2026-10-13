import React from "react";
import { SUPPORT_EMAIL } from "@/lib/contact";
import {
  TERMS_VERSION_LABEL,
  termsArticles,
  termsPreamble,
} from "@/lib/terms";

// Texte des conditions générales, partagé par la page publique et par la
// fenêtre d'acceptation.
export function TermsText() {
  const contactArticleNumber = termsArticles.length + 1;

  return (
    <div className="space-y-8 text-sm leading-relaxed sm:text-base">
      <div className="space-y-2">
        <p className="font-mono text-xs text-text-muted">
          Version du {TERMS_VERSION_LABEL}
        </p>
        <p>{termsPreamble}</p>
      </div>

      {termsArticles.map((article, articleIndex) => {
        const articleNumber = articleIndex + 1;

        return (
          <section key={article.title} className="space-y-3">
            <h3 className="font-heading text-lg font-medium tracking-tight">
              Article {articleNumber} – {article.title}
            </h3>

            {article.clauses.map((clause, clauseIndex) => {
              const number = `${articleNumber}.${clauseIndex + 1}`;

              if (typeof clause === "string") {
                return (
                  <p key={number}>
                    <span className="font-mono text-xs text-text-muted">
                      {number}
                    </span>{" "}
                    {clause}
                  </p>
                );
              }

              return (
                <div key={number} className="space-y-2">
                  <p>
                    <span className="font-mono text-xs text-text-muted">
                      {number}
                    </span>{" "}
                    {clause.intro}
                  </p>
                  <ol className="list-[lower-alpha] space-y-1.5 pl-9 marker:text-text-muted">
                    {clause.items.map((item) => (
                      <li key={item} className="pl-1">
                        {item}
                      </li>
                    ))}
                  </ol>
                </div>
              );
            })}
          </section>
        );
      })}

      <section className="space-y-3">
        <h3 className="font-heading text-lg font-medium tracking-tight">
          Article {contactArticleNumber} – Contact
        </h3>
        <p>
          <span className="font-mono text-xs text-text-muted">
            {contactArticleNumber}.1
          </span>{" "}
          Toute question relative aux Conditions ou aux données personnelles
          peut être adressée à l&apos;Éditeur à l&apos;adresse suivante :{" "}
          <a
            href={`mailto:${SUPPORT_EMAIL}`}
            className="text-accent-secondary underline underline-offset-4 hover:text-text-primary"
          >
            {SUPPORT_EMAIL}
          </a>
          .
        </p>
      </section>
    </div>
  );
}
