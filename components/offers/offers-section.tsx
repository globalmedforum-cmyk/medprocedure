import Link from "next/link";
import { Check, Mail, Phone } from "lucide-react";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { Stamp } from "@/components/shared/stamp";
import { SUPPORT_EMAIL } from "@/lib/contact";
import { cn } from "@/lib/utils";
import {
  coveredProcedures,
  launchOffer,
  offers,
  paymentMethods,
} from "./offers";

// Grille des offres d'assistance, avec le bandeau de l'offre de lancement
export function OffersSection() {
  return (
    <section aria-labelledby="offres-titre" className="space-y-10">
      <header className="max-w-2xl space-y-3">
        <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase">
          Assistance personnalisée
        </p>
        <h1
          id="offres-titre"
          className="font-heading text-[clamp(1.75rem,1.15rem+2.6vw,2.75rem)] leading-[1.18] font-semibold tracking-tight text-balance"
        >
          Les guides restent gratuits. Choisissez l&apos;aide qu&apos;il vous
          faut pour votre dossier.
        </h1>
        <p className="text-text-muted">
          Pour : {coveredProcedures.join(" · ")}
        </p>
      </header>

      <LaunchBanner />

      <ul className="grid gap-5 md:grid-cols-2 md:items-stretch">
        {offers.map((offer) => {
          return (
            <li
              key={offer.id}
              className={cn(
                "relative flex flex-col gap-6 rounded-2xl border p-6 sm:p-7",
                offer.exclusive
                  ? "border-transparent bg-accent-primary text-primary-foreground"
                  : "bg-bg-surface",
                offer.recommended
                  ? "border-2 border-accent-primary shadow-lg"
                  : !offer.exclusive && "border-border-default",
              )}
            >
              {offer.recommended && (
                <span className="absolute -top-3 left-6 rounded-full bg-accent-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Le plus choisi
                </span>
              )}

              <div className="space-y-1.5">
                <h2 className="font-heading text-xl font-bold">{offer.name}</h2>
                <p
                  className={cn(
                    "text-sm",
                    offer.exclusive
                      ? "font-semibold opacity-90"
                      : "text-text-muted",
                  )}
                >
                  {offer.tagline}
                </p>
              </div>

              <ul className="space-y-2.5 text-[0.95rem]">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0",
                        !offer.exclusive && "text-accent-primary",
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {offer.note && (
                <p className="text-sm italic opacity-85">{offer.note}</p>
              )}

              <ContactDialog
                trigger={
                  <>
                    <Phone aria-hidden className="h-4 w-4" />
                    Réserver mon appel gratuit
                  </>
                }
                triggerVariant={
                  offer.recommended || offer.exclusive ? "default" : "outline"
                }
                triggerClassName={cn(
                  "mt-auto h-12 w-full gap-2 rounded-xl px-4 text-sm font-semibold",
                  offer.recommended && "hover:bg-accent-hover",
                  offer.exclusive &&
                    "bg-primary-foreground text-accent-primary hover:bg-primary-foreground/90",
                )}
                title={`Réserver un appel gratuit : ${offer.name}`}
                description="Écrivez-nous par WhatsApp ou par e-mail : nous vous proposons un créneau pour un appel gratuit de 15 minutes, avant tout paiement."
                emailSubject={`Appel gratuit : ${offer.name}`}
                message={`Bonjour, je souhaite réserver l'appel gratuit pour le forfait « ${offer.name} ».`}
              />
            </li>
          );
        })}
      </ul>

      <div className="flex flex-col gap-2 text-sm text-text-muted">
        <p className="font-semibold text-text-primary">
          Appel gratuit de 15 minutes sur Google Meet, avant tout paiement :
          nous vous présentons le tarif du forfait adapté à votre dossier.
        </p>
        <p>Paiement : {paymentMethods.join(" · ")}</p>
        <p>
          Aucun service ne peut garantir un poste ou un visa : nous vous aidons
          à déposer un dossier complet. En Premium, VIP et Assistance MEBEKO,
          60 % vous sont remboursés si la convention de stage n&apos;est pas
          obtenue ou si la MEBEKO refuse l&apos;enregistrement, selon les{" "}
          <Link href="/conditions" className="underline underline-offset-2">
            conditions générales
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

function LaunchBanner() {
  return (
    <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-accent-primary p-6 text-primary-foreground sm:flex-row sm:items-center sm:justify-between sm:p-7">
      <div className="space-y-1.5">
        <p className="font-mono text-xs tracking-[0.15em] uppercase opacity-80">
          Offre de lancement
        </p>
        <p className="font-heading text-2xl leading-tight font-bold sm:text-3xl">
          Votre dossier relu en entier jusqu&apos;au dépôt, gratuitement
        </p>
        <p className="opacity-90">
          Pour les {launchOffer.places} premiers médecins qui nous écrivent par
          e-mail, en échange de votre avis honnête.
        </p>
        <a
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("Offre de lancement : relecture gratuite de mon dossier")}`}
          className="inline-flex items-center gap-2 pt-1 font-semibold underline underline-offset-4"
        >
          <Mail aria-hidden className="h-4 w-4" />
          {SUPPORT_EMAIL}
        </a>
      </div>
      <Stamp
        label={`${launchOffer.places} places`}
        detail="gratuites"
        shape="round"
        rotate={-12}
        className="w-28 shrink-0 self-start text-sm text-primary-foreground sm:self-center"
      />
    </div>
  );
}
