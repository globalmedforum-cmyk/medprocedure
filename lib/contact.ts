// Coordonnées de l'équipe d'accompagnement.
export const SUPPORT_EMAIL = "contact.medprocedure@gmail.com";

export function buildAssistanceMessage(procedureTitle: string, stepLabel?: string) {
  const context = stepLabel
    ? `la procédure « ${procedureTitle} » (${stepLabel})`
    : `la procédure « ${procedureTitle} »`;

  return `Bonjour, je souhaite être accompagné(e) par votre équipe pour ${context}.`;
}

export function buildEmailLink(subject: string, body: string) {
  return `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
