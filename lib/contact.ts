// Coordonnées de l'équipe d'accompagnement.
export const SUPPORT_EMAIL = "globalmedforum@gmail.com";

// Numéro WhatsApp au format international, chiffres uniquement, sans « + »
// ni espaces. Numéro ivoirien : le 0 initial est conservé après l'indicatif 225.
// S'il est vide, l'option WhatsApp n'est pas proposée.
export const SUPPORT_WHATSAPP = "2250711761471";

export function buildAssistanceMessage(procedureTitle: string, stepLabel?: string) {
  const context = stepLabel
    ? `la procédure « ${procedureTitle} » (${stepLabel})`
    : `la procédure « ${procedureTitle} »`;

  return `Bonjour, je souhaite être accompagné(e) par votre équipe pour ${context}.`;
}

export function buildEmailLink(subject: string, body: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function buildWhatsAppLink(message: string) {
  if (!SUPPORT_WHATSAPP) return null;
  return `https://wa.me/${SUPPORT_WHATSAPP}?text=${encodeURIComponent(message)}`;
}
