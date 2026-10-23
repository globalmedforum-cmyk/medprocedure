// Titres des procédures (prisma/procedures-content.ts) et leur page. Une
// mention « Titre » dans le texte d'une étape devient un lien vers la
// procédure, y compris dans le texte saisi depuis l'administration.
export const procedureSlugByTitle: Record<string, string> = {
  "Doctorat (PhD)": "doctorat-phd",
  "Enregistrement MEBEKO": "mebeko-suisse",
  "Médecin assistant en Suisse": "medecin-assistant-suisse",
  "Stage d'observation": "stage-observation",
  "Stage FFI": "ffi-france",
  "DFMS et DFMSA": "dfms-dfmsa",
  "Stage associé": "stage-associe",
  "Participation aux congrès": "participation-congres",
};

// « Titre » entre guillemets français, espaces simples ou insécables
export const procedureMentionPattern = /(«[\s ][^»]+?[\s ]»)/g;

export function getMentionedProcedureSlug(mention: string) {
  const title = mention.slice(1, -1).trim();
  return procedureSlugByTitle[title] ?? null;
}
