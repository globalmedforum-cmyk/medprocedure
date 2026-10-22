import { Check, Mail } from "lucide-react";
import { Guilloche } from "@/components/shared/guilloche";
import { Stamp } from "@/components/shared/stamp";
import { launchOffer } from "@/components/offers/offers";
import { SUPPORT_EMAIL } from "@/lib/contact";

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
              <br />
              qui nous écrivent par e-mail
            </p>
          </div>
          <Stamp
            label={`${launchOffer.places} places`}
            detail="gratuites"
            shape="round"
            rotate={-14}
            className="w-[22%] shrink-0 text-[clamp(0.7rem,2.4cqi,1.6rem)] text-white"
          />
        </div>

        <div className="space-y-3">
          <p className="font-heading text-[clamp(4rem,15cqi,10rem)] leading-none font-bold">
            Gratuit
          </p>
          <p className="font-heading text-[clamp(1.5rem,5.2cqi,3.6rem)] leading-tight font-bold">
            Votre dossier relu en entier,
            <br />
            jusqu&apos;au dépôt
          </p>
        </div>

        <ul className="grid gap-2 text-[clamp(0.9rem,3cqi,2rem)]">
          {[
            "DFMS, DFMSA, stage associé ou poste de FFI",
            "CV, lettre, pièces et calendrier vérifiés",
            "Relectures illimitées jusqu'au dépôt",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                aria-hidden
                className="mt-[0.15em] h-[1.1em] w-[1.1em] shrink-0"
              />
              {item}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/25 pt-[3%]">
          <p className="flex items-center gap-3 font-heading text-[clamp(1rem,3.8cqi,2.6rem)] font-bold">
            <Mail aria-hidden className="h-[1em] w-[1em] shrink-0" />
            {SUPPORT_EMAIL}
          </p>
          <p className="text-[clamp(0.8rem,2.4cqi,1.6rem)] opacity-90">
            En échange : votre avis honnête
            <br />
            medprocedure.org
          </p>
        </div>
      </div>
    </div>
  );
}
