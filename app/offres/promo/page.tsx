import { Check } from "lucide-react";
import { Guilloche } from "@/components/shared/guilloche";
import { Stamp } from "@/components/shared/stamp";
import { launchOffer, paymentMethods } from "@/components/offers/offers";

// Essai : visuel carré (1080 × 1080) de l'offre de lancement, pour WhatsApp
export default function PromoVisualPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-subtle p-6">
      <div
        id="promo"
        className="@container relative isolate flex aspect-square w-[1080px] max-w-full flex-col justify-between overflow-hidden bg-[#0F2A6B] p-[6%] text-white"
      >
        <Guilloche className="-z-10 text-white/10" />

        <div className="flex items-start justify-between gap-6">
          <div className="space-y-2">
            <p className="font-mono text-[clamp(0.75rem,2.2cqi,1.5rem)] tracking-[0.2em] uppercase opacity-80">
              MedProcedure · offre de lancement
            </p>
            <p className="font-heading text-[clamp(1.5rem,5cqi,3.5rem)] leading-tight font-semibold">
              Les {launchOffer.places} premiers médecins
            </p>
          </div>
          <Stamp
            label={`${launchOffer.places} places`}
            detail="seulement"
            shape="round"
            rotate={-14}
            className="w-[22%] shrink-0 text-[clamp(0.7rem,2.4cqi,1.6rem)] text-white"
          />
        </div>

        <div className="space-y-3">
          <p className="font-heading text-[clamp(1.75rem,6.5cqi,4.5rem)] leading-[1.05] font-bold">
            « Dossier prêt à déposer »
          </p>
          <p className="flex items-baseline gap-4">
            <span className="font-heading text-[clamp(4rem,19cqi,13rem)] leading-none font-bold">
              {launchOffer.price} €
            </span>
            <span className="text-[clamp(1rem,4cqi,2.75rem)] line-through opacity-60">
              {launchOffer.regularPrice} €
            </span>
          </p>
        </div>

        <ul className="grid gap-2 text-[clamp(0.9rem,3cqi,2rem)]">
          {[
            "Tout votre dossier DFMS, DFMSA ou stage associé relu",
            "Corrections sous 72 h, sinon remboursé",
            "Appel gratuit de 15 min avant de payer",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check aria-hidden className="mt-[0.15em] h-[1.1em] w-[1.1em] shrink-0" />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/25 pt-[3%]">
          <p className="text-[clamp(0.8rem,2.6cqi,1.75rem)] opacity-90">
            {paymentMethods.slice(0, 3).join(" · ")}
            <br />
            En échange : votre avis honnête
          </p>
          <p className="font-heading text-[clamp(1rem,4cqi,2.75rem)] font-bold">
            medprocedure.org
          </p>
        </div>
      </div>
    </div>
  );
}
