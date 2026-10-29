// Forfaits d'assistance. Aucun prix sur le site : il est communiqué lors de
// l'appel gratuit, avant tout paiement.
export interface Offer {
  id: string;
  name: string;
  // Sous-titre : procédures couvertes ou résumé du forfait
  tagline: string;
  features: string[];
  // Mention en dessous des avantages
  note?: string;
  recommended?: boolean;
  // Forfait sur sélection (VIP) : présentation sombre
  exclusive?: boolean;
}

export const offers: Offer[] = [
  {
    id: "lite",
    name: "Lite",
    tagline: "FFI · Stage associé · Médecin assistant",
    features: [
      "Relecture de tous vos documents : CV, lettre de motivation…",
      "Correction des points à améliorer",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Vos documents, plus les contacts pour candidater",
    features: [
      "Tout le Lite",
      "Mise en relation par e-mail avec les chefs de service de votre spécialité",
      "Assistance jusqu'au dépôt de la demande de visa",
    ],
    recommended: true,
  },
  {
    id: "vip",
    name: "VIP",
    tagline: "Places limitées · avec un poste validé",
    features: [
      "Mise en relation avec un collaborateur sur le site du poste à pourvoir",
    ],
    note: "Un service ouvert selon les opportunités à la disposition de nos équipes.",
    exclusive: true,
  },
  {
    id: "mebeko",
    name: "Assistance MEBEKO",
    tagline: "Proposée à part · Suisse",
    features: [
      "Suivi de votre demande de reconnaissance de diplôme",
      "Jusqu'à la réponse de la MEBEKO",
    ],
  },
];

// Offre de lancement : la relecture du dossier offerte aux premiers médecins
// qui écrivent par e-mail
export const launchOffer = {
  places: 5,
};

export const paymentMethods = ["Orange Money", "Wave", "MTN MoMo", "Carte"];

export const coveredProcedures = [
  "Stage FFI",
  "Stage associé",
  "Médecin assistant en Suisse",
  "Enregistrement MEBEKO",
];
