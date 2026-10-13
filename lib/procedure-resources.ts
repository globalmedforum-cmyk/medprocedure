export interface ProcedureResource {
  label: string;
  href: string;
}

const franceVisas: ProcedureResource = {
  label: "France-Visas, portail officiel des visas",
  href: "https://france-visas.gouv.fr",
};

const anef: ProcedureResource = {
  label: "Administration des étrangers en France (validation du visa)",
  href: "https://administration-etrangers-en-france.interieur.gouv.fr",
};

const etudesEnFrance: ProcedureResource = {
  label: "Campus France, procédure « Études en France »",
  href: "https://www.campusfrance.org/fr/candidature-procedure-etudes-en-france",
};

const mebeko: ProcedureResource = {
  label: "OFSP, Commission des professions médicales (MEBEKO)",
  href: "https://www.bag.admin.ch/fr/commission-des-professions-medicales-mebeko",
};

const medreg: ProcedureResource = {
  label: "OFSP, registre des professions médicales (MedReg)",
  href: "https://www.bag.admin.ch/fr/registre-des-professions-medicales-medreg",
};

const isfm: ProcedureResource = {
  label: "ISFM, formation postgraduée et logbook",
  href: "https://www.siwf.ch/fr",
};

// Liens officiels affichés sous chaque étape, par procédure
const resourcesByProcedureSlug: Record<string, ProcedureResource[]> = {
  "doctorat-phd": [
    {
      label: "Campus France, portail du doctorat et offres de thèse",
      href: "https://doctorat.campusfrance.org",
    },
    { label: "theses.fr, thèses en cours et soutenues", href: "https://theses.fr" },
    etudesEnFrance,
    { label: "Euraxess France, accueil des chercheurs", href: "https://www.euraxess.fr" },
    franceVisas,
    anef,
  ],
  "mebeko-suisse": [
    mebeko,
    {
      label: "OFSP, demande pour un diplôme de l'UE ou de l'AELE",
      href: "https://www.bag.admin.ch/fr/deposer-une-demande-de-reconnaissance-dun-diplome-de-profession-medicale-delivre-dans-un-etat-de-lueaele",
    },
    {
      label: "OFSP, demande pour un diplôme d'un État tiers",
      href: "https://www.bag.admin.ch/fr/deposer-une-demande-de-reconnaissance-dun-diplome-de-profession-medicale-delivre-dans-un-etat-tiers-hors-de-lueaele",
    },
    medreg,
    isfm,
  ],
  "medecin-assistant-suisse": [
    medreg,
    {
      label: "ISFM, registre des établissements de formation",
      href: "https://register.siwf.ch",
    },
    isfm,
    { label: "FMH, bourse de l'emploi", href: "https://www.fmhjob.ch" },
    { label: "asmac, association des médecins assistants", href: "https://vsao.ch/fr/" },
    {
      label: "Canton de Vaud, autorisation de pratiquer comme médecin assistant",
      href: "https://www.vd.ch/prestation/demander-une-autorisation-de-pratiquer-en-tant-que-medecin-assistant-pour-les-diplomes-hors-ue-aele",
    },
    {
      label: "Secrétariat d'État aux migrations, travailler en Suisse",
      href: "https://www.sem.admin.ch/sem/fr/home/themen/arbeit.html",
    },
  ],
  "stage-observation": [
    franceVisas,
    {
      label: "Service-public.fr, visa de court séjour Schengen",
      href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16146",
    },
    {
      label: "AP-HP, accueil des professionnels de santé étrangers",
      href: "https://www.aphp.fr/professionnels-linternational",
    },
  ],
  "ffi-france": [
    {
      label: "Faculté de médecine de Strasbourg (calendrier DFMS / DFMSA)",
      href: "https://med.unistra.fr",
    },
    {
      label: "Université Paris Cité, présentation des DFMS et DFMSA",
      href: "https://u-paris.fr/medecine/dfms-dfmsa/",
    },
    etudesEnFrance,
    franceVisas,
    anef,
  ],
  "stage-associe": [
    {
      label: "Légifrance, arrêté du 16 mai 2011 relatif aux stagiaires associés",
      href: "https://www.legifrance.gouv.fr/loda/id/JORFTEXT000024095666",
    },
    {
      label: "AP-HP, accueil des professionnels de santé étrangers",
      href: "https://www.aphp.fr/professionnels-linternational",
    },
    franceVisas,
    anef,
  ],
  "participation-congres": [
    franceVisas,
    {
      label: "France-Visas, voyage d'affaires et congrès",
      href: "https://france-visas.gouv.fr/voyage-d-affaires",
    },
    {
      label: "Service-public.fr, visa de court séjour Schengen",
      href: "https://www.service-public.gouv.fr/particuliers/vosdroits/F16146",
    },
  ],
};

export function getProcedureResources(slug: string) {
  return resourcesByProcedureSlug[slug] ?? [];
}
