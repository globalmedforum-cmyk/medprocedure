// Offres d'accompagnement présentées sur /offres. Les prix sont fixés en
// francs CFA ; le montant en euros suit la parité fixe (1 € = 655,957 FCFA).
export interface Offer {
  id: string;
  name: string;
  // Pays concerné, affiché au-dessus du nom
  country: string;
  features: string[];
  priceFcfa: number;
  // Part du prix remboursée selon la garantie du contrat signé
  refundPercent: number;
  refundLabel: string;
  // Cas ouvrant droit au remboursement (article « Remboursement » des CGU)
  refundCondition: string;
}

export const offers: Offer[] = [
  {
    id: "stage-observation",
    name: "Stage d'observation en Europe",
    country: "Europe",
    features: [
      "Obtention d'une convention de stage d'observation",
      "Assistance à la constitution de votre dossier de visa",
      "Accompagnement pour préparer votre premier séjour en Europe",
    ],
    priceFcfa: 500_000,
    refundPercent: 70,
    refundLabel: "Convention de stage",
    refundCondition: "si aucune convention n'est signée sous 6 mois",
  },
  {
    id: "mebeko",
    name: "Enregistrement MEBEKO",
    country: "Suisse",
    features: [
      "Assistance à la constitution de votre dossier",
      "Accompagnement dans les démarches de reconnaissance et d'enregistrement",
      "Suivi administratif de votre procédure",
    ],
    priceFcfa: 350_000,
    refundPercent: 70,
    refundLabel: "Enregistrement MEBEKO",
    refundCondition: "en cas de refus écrit de la MEBEKO",
  },
  {
    id: "medecin-assistant",
    name: "Poste de médecin assistant",
    country: "Suisse",
    features: [
      "Assistance dans la recherche d'opportunités",
      "Accompagnement dans les candidatures",
      "Suivi de votre démarche professionnelle",
    ],
    priceFcfa: 500_000,
    refundPercent: 75,
    refundLabel: "Poste de médecin assistant",
    refundCondition: "si aucun contrat n'est obtenu sous 12 mois",
  },
];

const FCFA_PER_EURO = 655.957;

export function formatFcfa(amount: number) {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export function formatEuro(amountFcfa: number) {
  return `${(amountFcfa / FCFA_PER_EURO).toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

export const paymentMethods = ["Orange Money", "Wave", "MTN MoMo", "Carte"];
