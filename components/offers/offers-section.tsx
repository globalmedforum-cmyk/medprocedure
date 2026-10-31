import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { ContactDialog } from "@/components/shared/contact-dialog";
import { formatEuro, formatFcfa, offers, paymentMethods } from "./offers";

const contactDescription =
  "Écrivez-nous par WhatsApp ou par e-mail : nous étudions votre profil et vous indiquons le parcours adapté à votre situation, avant tout paiement.";

// Page des offres : argumentaire, trois offres avec leur prix, garantie de
// remboursement partiel
export function OffersSection() {
  return (
    <div className="space-y-14 sm:space-y-20">
      <section aria-labelledby="offres-titre" className="max-w-3xl space-y-5">
        <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase">
          Médecins d&apos;Afrique francophone
        </p>
        <h1
          id="offres-titre"
          className="font-heading text-[clamp(1.75rem,1.15rem+2.6vw,2.75rem)] leading-[1.18] font-bold tracking-tight text-balance"
        >
          Et si vous changiez de stratégie pour exercer en Europe&nbsp;?
        </h1>
        <div className="space-y-4 text-lg leading-relaxed text-text-muted">
          <p>
            Vous avez envoyé des dizaines de mails aux hôpitaux en France, en
            Belgique ou en Suisse&nbsp;? Vous recherchez un poste de FFI, un
            stage associé ou une opportunité professionnelle, mais vous recevez
            peu de réponses, voire des refus successifs&nbsp;? Vous n&apos;êtes
            pas seul dans cette situation.
          </p>
          <p>
            Plutôt que de multiplier les candidatures à distance, préparez votre
            arrivée en Europe grâce à un parcours adapté à votre situation.
            Notre équipe vous accompagne dans trois démarches.
          </p>
        </div>
      </section>

      <section aria-label="Nos offres">
        <ul className="grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {offers.map((offer, index) => (
            <li
              key={offer.id}
              className="flex flex-col gap-6 rounded-2xl border border-border-default bg-bg-surface p-6 sm:p-7"
            >
              <div className="space-y-1.5">
                <p className="font-mono text-xs tracking-[0.15em] text-text-muted uppercase">
                  {index + 1} · {offer.country}
                </p>
                <h2 className="font-heading text-xl font-bold lg:min-h-[2lh]">
                  {offer.name}
                </h2>
              </div>

              <div>
                <p className="font-heading text-3xl font-bold tracking-tight">
                  {formatFcfa(offer.priceFcfa)}
                </p>
                <p className="text-sm text-text-muted">
                  soit {formatEuro(offer.priceFcfa)}
                </p>
              </div>

              <ul className="space-y-2.5 text-[0.95rem]">
                {offer.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check
                      aria-hidden
                      className="mt-0.5 h-5 w-5 shrink-0 text-accent-primary"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <p className="rounded-xl bg-accent-soft px-4 py-3 text-sm font-semibold text-accent-primary">
                Garantie de remboursement de {offer.refundPercent}&nbsp;%
                <span className="block font-normal">
                  {offer.refundCondition}
                </span>
              </p>

              <ContactDialog
                trigger={
                  <>
                    <MessageCircle aria-hidden className="h-4 w-4" />
                    Étudier mon profil
                  </>
                }
                triggerVariant="default"
                triggerClassName="mt-auto h-12 w-full gap-2 rounded-xl px-4 text-sm font-semibold hover:bg-accent-hover"
                title={`Étudier mon profil : ${offer.name}`}
                description={contactDescription}
                emailSubject={`Accompagnement : ${offer.name}`}
                message={`Bonjour, je souhaite être accompagné pour l'offre « ${offer.name} ».`}
              />
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-text-muted">
          Paiement : {paymentMethods.join(" · ")}
        </p>
      </section>

      <section
        aria-labelledby="garantie-titre"
        className="rounded-3xl bg-accent-primary p-7 text-primary-foreground sm:p-10"
      >
        <p className="inline-flex rounded-full bg-primary-foreground/15 px-3 py-1 text-sm font-semibold">
          Notre engagement
        </p>
        <h2
          id="garantie-titre"
          className="mt-5 max-w-3xl font-heading text-[clamp(1.6rem,1.1rem+2vw,2.5rem)] leading-tight font-bold tracking-tight text-balance"
        >
          Votre projet européen mérite un accompagnement avec des engagements
          concrets.
        </h2>
        <p className="mt-4 max-w-2xl text-lg opacity-90">
          Nous croyons en la qualité de notre accompagnement. C&apos;est
          pourquoi nous proposons une garantie contractuelle de remboursement
          partiel&nbsp;:
        </p>
        <dl className="mt-8 grid gap-6 sm:grid-cols-3">
          {offers.map((offer) => (
            <div key={offer.id} className="space-y-1">
              <dt className="sr-only">{offer.refundLabel}</dt>
              <dd className="font-heading text-5xl font-bold">
                {offer.refundPercent}&nbsp;%
              </dd>
              <dd className="font-semibold">{offer.refundLabel}</dd>
              <dd className="text-sm opacity-80">{offer.refundCondition}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 space-y-3 border-t border-primary-foreground/25 pt-6">
          <p className="text-lg">
            Vous connaissez nos engagements avant même de commencer votre
            accompagnement.
          </p>
          <p className="text-sm opacity-80">
            Garantie soumise aux conditions du contrat signé et aux{" "}
            <Link href="/conditions" className="underline underline-offset-2">
              conditions générales
            </Link>
            . Elle ne constitue pas une garantie de délivrance de visa ou de
            décision favorable des autorités.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="pourquoi-titre"
        className="grid gap-6 rounded-2xl border border-border-default bg-bg-surface p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center"
      >
        <div className="max-w-2xl space-y-3">
          <h2
            id="pourquoi-titre"
            className="font-heading text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Pourquoi adopter cette nouvelle approche&nbsp;?
          </h2>
          <p className="text-lg leading-relaxed text-text-muted">
            Les opportunités sont plus accessibles lorsque vous êtes déjà
            présent en Europe et que vous développez votre réseau professionnel
            sur place. Notre objectif : vous aider à franchir les premières
            étapes d&apos;un véritable projet professionnel en Europe.
          </p>
        </div>
        <ContactDialog
          trigger={
            <>
              <MessageCircle aria-hidden className="h-4 w-4" />
              Contacter notre équipe
            </>
          }
          triggerVariant="default"
          triggerClassName="h-12 w-full gap-2 rounded-xl px-6 text-base font-semibold hover:bg-accent-hover lg:w-auto"
          title="Contacter notre équipe"
          description={contactDescription}
          emailSubject="Étude de mon profil"
          message="Bonjour, je souhaite que vous étudiiez mon profil pour identifier le parcours adapté à ma situation."
        />
      </section>
    </div>
  );
}
