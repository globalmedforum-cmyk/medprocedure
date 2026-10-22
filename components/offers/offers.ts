// Offres d'assistance payantes (voir founder/pricing.md). Prix en euros.
export interface Offer {
  id: string;
  name: string;
  price: number;
  // Paiement en plusieurs fois, ex. « 20 € + 19 € »
  instalments?: string;
  tagline: string;
  features: string[];
  recommended?: boolean;
}

export const offers: Offer[] = [
  {
    id: "relecture-express",
    name: "Relecture express",
    price: 19,
    tagline: "Un regard extérieur sur un document clé.",
    features: [
      "Un document : CV ou lettre de motivation",
      "Corrections rendues sous 48 heures",
      "Conseils adaptés à la procédure visée",
    ],
  },
  {
    id: "dossier-pret",
    name: "Dossier prêt à déposer",
    price: 39,
    instalments: "20 € au départ, 19 € quand le dossier est complet",
    tagline: "Tout votre dossier, relu jusqu'au dépôt.",
    features: [
      "Appel gratuit de 15 min avant de payer",
      "Une personne nommée suit votre dossier",
      "CV, lettre, pièces et calendrier vérifiés",
      "Corrections sous 72 heures, sinon remboursé",
      "Relectures illimitées jusqu'au dépôt",
    ],
    recommended: true,
  },
  {
    id: "accompagnement-complet",
    name: "Accompagnement complet",
    price: 99,
    instalments: "50 € au départ, 49 € quand le dossier est complet",
    tagline: "Le dossier, plus la recherche de poste.",
    features: [
      "Tout le « Dossier prêt à déposer »",
      "Calendrier de vos candidatures",
      "Sélection d'offres publiques adaptées à votre profil",
      "Modèles de messages aux chefs de service",
    ],
  },
];

// Offre de lancement : le « Dossier prêt à déposer » offert aux premiers
// médecins qui écrivent par e-mail
export const launchOffer = {
  offerId: "dossier-pret",
  places: 5,
};

export const paymentMethods = ["Orange Money", "Wave", "MTN MoMo", "Carte"];

export const coveredProcedures = [
  "DFMS / DFMSA",
  "Stage associé",
  "Poste de FFI",
  "Visa pour un congrès",
];
