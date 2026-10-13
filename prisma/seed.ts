import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ProcedureSeed = Omit<Prisma.ProcedureCreateInput, "steps" | "progress"> & {
  steps: Prisma.StepCreateWithoutProcedureInput[];
};

// Le seed est rejouable : il ne supprime jamais les utilisateurs ni leur
// progression. Les étapes sont retrouvées par (procédure, ordre) afin de
// conserver leurs identifiants, référencés dans completedStepIds.
async function upsertProcedure({ steps, ...data }: ProcedureSeed) {
  const procedure = await prisma.procedure.upsert({
    where: { slug: data.slug },
    update: data,
    create: data,
  });

  for (const step of steps) {
    const stepData = { ...step, videoUrl: step.videoUrl ?? null };
    const existing = await prisma.step.findFirst({
      where: { procedureId: procedure.id, order: step.order },
      select: { id: true },
    });

    if (existing) {
      await prisma.step.update({ where: { id: existing.id }, data: stepData });
    } else {
      await prisma.step.create({
        data: { ...stepData, procedureId: procedure.id },
      });
    }
  }

  await prisma.step.deleteMany({
    where: {
      procedureId: procedure.id,
      order: { notIn: steps.map((step) => step.order) },
    },
  });

  return procedure;
}

async function upsertOpportunity(data: Prisma.OpportunityCreateInput) {
  const existing = await prisma.opportunity.findFirst({
    where: { title: data.title, hospital: data.hospital },
    select: { id: true },
  });

  if (existing) {
    await prisma.opportunity.update({ where: { id: existing.id }, data });
  } else {
    await prisma.opportunity.create({ data });
  }
}

async function main() {
  console.log("🌱 Démarrage du seed complet des 6 procédures médicales...");

  // 1. Doctorat (PhD)
  const phd = await upsertProcedure({
    slug: "doctorat-phd",
    title: "Doctorat (PhD)",
    description:
      "Poursuivez vos recherches et votre thèse de doctorat : directeur de laboratoire, financements et visa chercheur VLS-TS.",
    country: "France / Europe",
    category: "Recherche & Santé",
    steps: [
      {
        order: 1,
        title: "Sélection du sujet de thèse et du laboratoire d'accueil",
        description:
          "Identification d'une unité de recherche (INSERM, CNRS, universités européennes) alignée avec votre spécialité médicale.",
        estimatedDuration: "4 à 8 semaines",
        isRequired: true,
        content:
          "Rédigez une proposition de projet de thèse claire mettant en valeur l'articulation entre votre pratique clinique et vos objectifs de recherche translationnelle.",
        videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      },
      {
        order: 2,
        title:
          "Accord du directeur de thèse et rattachement à l'école doctorale",
        description:
          "Validation du profil par le directeur du laboratoire et audition auprès de l'école doctorale de l'université de rattachement.",
        estimatedDuration: "3 à 6 semaines",
        isRequired: true,
        content:
          "L'accord formel du directeur de thèse est la pièce maîtresse permettant l'obtention des financements et l'admission définitive.",
      },
      {
        order: 3,
        title: "Montage du plan de financement et bourses doctorales",
        description:
          "Candidature aux contrats doctoraux ministériels, bourses d'excellence, financements hospitaliers ou mécénats de recherche.",
        estimatedDuration: "4 à 12 semaines",
        isRequired: true,
        content:
          "En France et en Suisse, une thèse de doctorat en sciences médicales requiert impérativement un financement mensuel minimal garanti.",
      },
      {
        order: 4,
        title: "Convention d'accueil chercheur et formalités de visa VLS-TS",
        description:
          "Établissement de la convention d'accueil par l'université ou l'institut de recherche et demande de visa 'Passeport Talent - Chercheur'.",
        estimatedDuration: "3 à 5 semaines",
        isRequired: true,
        content:
          "Le visa VLS-TS Chercheur permet de séjourner en Europe tout au long de votre contrat doctoral avec droit d'accès au système de santé et mobilité Schengen.",
      },
      {
        order: 5,
        title: "Inscription académique et démarrage des travaux",
        description:
          "Finalisation de l'inscription administrative, participation au comité de suivi individuel et premier semestre expérimental.",
        estimatedDuration: "2 semaines",
        isRequired: true,
        content:
          "Validation de votre carte d'étudiant chercheur et mise en place de votre calendrier de publications scientifiques.",
      },
    ],
  });

  // 2. Équivalence Suisse (MEBEKO)
  const mebeko = await upsertProcedure({
    slug: "mebeko-suisse",
    title: "Équivalence Suisse (MEBEKO)",
    description:
      "Reconnaissance et homologation officielle de votre diplôme de médecine auprès de la commission MEBEKO / OFSP pour exercer en Suisse.",
    country: "Suisse",
    category: "Suisse / OFSP",
    steps: [
      {
        order: 1,
        title:
          "Vérification de l'éligibilité et du niveau linguistique (B2/C1)",
        description:
          "Attestation du niveau B2/C1 minimum en français ou en allemand certifié par un organisme accrédité (Goethe, DELF/DALF).",
        estimatedDuration: "2 semaines",
        isRequired: true,
        content:
          "Assurez-vous que votre diplôme de base est conforme aux critères de la directive européenne 2005/36/CE ou soumis aux accords bilatéraux.",
        videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      },
      {
        order: 2,
        title: "Constitution et légalisation du dossier académique",
        description:
          "Rassemblement des copies certifiées conformes du diplôme, des relevés de notes, du casier judiciaire et du Certificate of Good Standing.",
        estimatedDuration: "3 à 4 semaines",
        isRequired: true,
        content:
          "Tous les documents doivent être traduits par un traducteur assermenté dans une des langues officielles suisses s'ils sont dans une autre langue.",
      },
      {
        order: 3,
        title: "Dépôt officiel du dossier auprès du secrétariat MEBEKO",
        description:
          "Envoi du formulaire fédéral officiel de demande de reconnaissance avec l'ensemble des pièces justificatives par voie postale sécurisée.",
        estimatedDuration: "1 semaine",
        isRequired: true,
        content:
          "Adresse de dépôt : Office fédéral de la santé publique (OFSP), Commission des professions médicales MEBEKO, CH-3003 Berne.",
      },
      {
        order: 4,
        title: "Règlement de l'émolument fédéral et suivi d'instruction",
        description:
          "Paiement des frais de traitement fixés par l'Office fédéral de la santé publique (généralement entre 800 et 1000 CHF).",
        estimatedDuration: "2 à 3 mois",
        isRequired: true,
        content:
          "Le secrétariat MEBEKO instruit votre dossier et vous délivre un récépissé officiel avec numéro de dossier fédéral.",
      },
      {
        order: 5,
        title: "Réception de la décision et inscription au registre MedReg",
        description:
          "Attribution du numéro GLN (Global Location Number) et inscription officielle dans le registre national des professions médicales (MedReg).",
        estimatedDuration: "1 semaine",
        isRequired: true,
        content:
          "Vous êtes désormais légalement habilité à postuler en tant que médecin assistant ou praticien hospitalier en Suisse.",
      },
    ],
  });

  // 3. Stage d'Observation
  const observation = await upsertProcedure({
    slug: "stage-observation",
    title: "Stage d'Observation",
    description:
      "Immersion clinique de 1 à 3 mois en CHU ou établissement privé pour découvrir les pratiques hospitalières européennes.",
    country: "Europe",
    category: "Immersion Hospitalière",
    steps: [
      {
        order: 1,
        title:
          "Sélection du service et prise de contact avec le maître de stage",
        description:
          "Identification des pôles d'excellence correspondant à votre spécialité et envoi de votre lettre de motivation médicale.",
        estimatedDuration: "2 à 4 semaines",
        isRequired: true,
        content:
          "Ciblez les chefs de service hospitaliers renommés dans votre domaine de compétence et présentez vos objectifs d'apprentissage.",
      },
      {
        order: 2,
        title: "Signature de la convention tripartite de stage",
        description:
          "Formalisation du cadre administratif entre votre faculté/hôpital d'origine, le centre hospitalier d'accueil et vous-même.",
        estimatedDuration: "3 semaines",
        isRequired: true,
        content:
          "La convention garantit vos droits, définit le planning de présence et précise la couverture d'assurance en responsabilité civile professionnelle.",
      },
      {
        order: 3,
        title: "Assurance médicale et démarches de visa court séjour",
        description:
          "Souscription d'une assurance rapatriement et dépôt de la demande de visa Schengen court séjour si nécessaire.",
        estimatedDuration: "3 semaines",
        isRequired: true,
        content:
          "La convention d'accueil hospitalière est la pièce justificative essentielle pour l'obtention du visa de stage.",
      },
      {
        order: 4,
        title: "Immersion clinique, staffs et attestation finale de validation",
        description:
          "Participation aux staffs quotidiens, visites médicales et délivrance du certificat officiel d'observation clinique.",
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
        content:
          "Cette attestation est un atout décisif pour vos futures candidatures à des postes rémunérés de FFI ou médecin assistant.",
      },
    ],
  });

  // 4. Stage FFI (Interne)
  const ffi = await upsertProcedure({
    slug: "ffi-france",
    title: "Stage FFI (Interne)",
    description:
      "Exercez en qualité de Faisant Fonction d'Interne rémunéré (6 mois à 2 ans) pour valider vos semestres et votre expérience pratique.",
    country: "France",
    category: "Pratique Rémunérée",
    steps: [
      {
        order: 1,
        title: "Vérification des prérequis et des semestres d'internat",
        description:
          "Contrôle de la validation des années de formation médicale et conformité aux textes réglementaires du statut FFI.",
        estimatedDuration: "1 à 2 semaines",
        isRequired: true,
        content:
          "Le statut FFI est destiné aux praticiens engagés dans une spécialisation médicale souhaitant acquérir une expérience pratique en centre hospitalier français.",
      },
      {
        order: 2,
        title: "Candidature ciblée auprès des chefs de service et de la CME",
        description:
          "Envoi des candidatures pendant les périodes de recrutement pour les semestres d'été (mai) ou d'hiver (novembre).",
        estimatedDuration: "4 à 6 semaines",
        isRequired: true,
        content:
          "Transmettez un dossier complet : CV médical normé, lettres de recommandation, lettre de motivation et projet professionnel d'internat.",
      },
      {
        order: 3,
        title: "Validation de la convention d'accueil et accord de l'ARS",
        description:
          "Signature du contrat tripartite et obtention de l'autorisation de l'Agence Régionale de Santé (ARS).",
        estimatedDuration: "3 à 4 semaines",
        isRequired: true,
        content:
          "L'accord de l'ARS et la convention d'accueil tamponnée par la préfecture permettent le déclenchement immédiat de la demande de visa consulaire.",
      },
      {
        order: 4,
        title: "Dossier consulaire de visa professionnel / titre de séjour",
        description:
          "Dépôt de la demande de visa long séjour valant titre de séjour (VLS-TS) mention stagiaire ou professionnel de santé.",
        estimatedDuration: "4 semaines",
        isRequired: true,
        content:
          "Préparez l'ensemble des originaux et les justificatifs de prise en charge financière garantis par le centre hospitalier recruteur.",
      },
      {
        order: 5,
        title: "Prise de fonction, gardes hospitalières et enregistrement",
        description:
          "Visite médicale du travail, signature définitive du contrat d'interne et intégration au tableau des gardes et astreintes.",
        estimatedDuration: "1 semaine",
        isRequired: true,
        content:
          "Félicitations, vous êtes officiellement en fonction dans votre service formateur.",
      },
    ],
  });

  // 5. Stage Associé
  const associe = await upsertProcedure({
    slug: "stage-associe",
    title: "Stage Associé",
    description:
      "Immersion et perfectionnement clinique en établissement hospitalier dans le cadre d'une convention de stage (6 mois à 2 ans).",
    country: "France / Suisse",
    category: "Pratique Hospitalière",
    steps: [
      {
        order: 1,
        title: "Identification du centre hospitalier et accord du chef de pôle",
        description:
          "Prise de contact avec un service spécialisé disposant de postes de praticien associé ou stagiaire associé vacants.",
        estimatedDuration: "3 à 5 semaines",
        isRequired: true,
        content:
          "Le stage associé permet un perfectionnement technique de haut niveau pour les praticiens déjà titulaires de leur diplôme d'État de médecin.",
      },
      {
        order: 2,
        title: "Élaboration de la convention de stage et du plan de formation",
        description:
          "Définition précise des actes médicaux et chirurgicaux sous supervision ainsi que des objectifs cliniques.",
        estimatedDuration: "2 à 3 semaines",
        isRequired: true,
        content:
          "La convention doit mentionner la durée du stage, l'encadrant référent, les horaires de service et les modalités d'indemnisation.",
      },
      {
        order: 3,
        title: "Agrément de la Commission Médicale d'Établissement (CME)",
        description:
          "Approbation par la direction des affaires médicales et inscription sur la liste des praticiens associés autorisés.",
        estimatedDuration: "3 semaines",
        isRequired: true,
        content:
          "La délibération de la CME valide l'intégration du praticien au sein des équipes hospitalières.",
      },
      {
        order: 4,
        title:
          "Demande de titre de séjour et autorisation provisoire de travail",
        description:
          "Formalités consulaires et préfectorales pour l'exercice temporaire sous convention de stage.",
        estimatedDuration: "4 à 6 semaines",
        isRequired: true,
        content:
          "L'autorisation provisoire de travail (APT) délivrée par l'administration du travail est indispensable avant toute prise de poste.",
      },
      {
        order: 5,
        title: "Installation clinique et évaluations périodiques",
        description:
          "Prise de poste en unité de soins, pratique médicale supervisée et délivrance des bilans semestriels de compétences.",
        estimatedDuration: "Semestriel",
        isRequired: true,
        content:
          "Le rapport de fin de stage associé est un certificat d'expertise reconnu pour valoriser votre parcours international.",
      },
    ],
  });

  // 6. Participation aux Congrès (Assistant Visa)
  const congres = await upsertProcedure({
    slug: "participation-congres",
    title: "Participation aux Congrès",
    description:
      "Inscriptions officielles, invitations nominatives, hébergement, transport et prise en charge intégrale de votre visa court séjour C.",
    country: "France / Europe",
    category: "Événements & Visas",
    steps: [
      {
        order: 1,
        title: "Obtenir une lettre d'invitation",
        description:
          "L'attestation de participation est le document central de votre dossier. Elle justifie le motif professionnel de votre séjour en France.",
        estimatedDuration: "3 à 7 jours",
        isRequired: true,
        content:
          "L'inscription officielle auprès de la société savante organisatrice génère une lettre d'invitation nominative précisant les dates et le lieu du congrès.",
        videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
      },
      {
        order: 2,
        title: "Réservation de logement",
        description:
          "Réservation d'hôtel ferme couvrant exactement la période de l'événement et à proximité immédiate du centre de congrès.",
        estimatedDuration: "2 à 3 jours",
        isRequired: true,
        content:
          "Veillez à ce que les dates d'hébergement concordent parfaitement avec les dates de transport et le programme scientifique.",
      },
      {
        order: 3,
        title: "Billet d'avion",
        description:
          "Réservation de vol aller-retour avec itinéraire confirmé et dates alignées sur la durée stricte de l'événement (7 à 10 jours max).",
        estimatedDuration: "2 jours",
        isRequired: true,
        content:
          "Présentez une réservation confirmée sans escale complexe afin de faciliter l'évaluation par les services consulaires.",
      },
      {
        order: 4,
        title: "Assurance voyage",
        description:
          "Police d'assurance médicale internationale couvrant les soins d'urgence et le rapatriement pour au moins 30 000 €.",
        estimatedDuration: "24 heures",
        isRequired: true,
        content:
          "L'attestation d'assurance doit couvrir l'intégralité de l'espace Schengen sur toute la période du séjour.",
      },
      {
        order: 5,
        title: "Justificatifs financiers",
        description:
          "Relevés bancaires certifiés des 3 à 6 derniers mois, bulletins de paie et attestations de prise en charge financière.",
        estimatedDuration: "1 semaine",
        isRequired: true,
        content:
          "Les justificatifs doivent prouver une capacité de dépense suffisante d'au moins 120 € par jour de séjour.",
      },
      {
        order: 6,
        title: "Justificatifs de retour",
        description:
          "Attestation d'exercice médical, ordre de mission de votre hôpital ou ordre d'origine garantissant votre retour.",
        estimatedDuration: "1 semaine",
        isRequired: true,
        content:
          "La preuve d'un ancrage professionnel et familial solide est le critère numéro 1 de délivrance du visa court séjour Schengen.",
      },
      {
        order: 7,
        title: "France-Visas",
        description:
          "Création et validation du formulaire officiel en ligne sur le portail étatique France-Visas et téléchargement du récépissé.",
        estimatedDuration: "2 heures",
        isRequired: true,
        content:
          "Remplissez scrupuleusement les rubriques en veillant à l'exactitude de chaque numéro de passeport et date de validité.",
      },
      {
        order: 8,
        title: "Rendez-vous VFS / TLS",
        description:
          "Prise de rendez-vous biométrique au centre de traitement des visas, dépôt des originaux et suivi du passeport.",
        estimatedDuration: "1 à 3 semaines",
        isRequired: true,
        content:
          "Présentez-vous avec l'ensemble des pièces classées selon la checklist officielle et conservez votre numéro de suivi de dossier.",
      },
    ],
  });

  // Opportunités hospitalières et Congrès médicaux (Image 2)
  const opportunities: Prisma.OpportunityCreateInput[] = [
    // Congrès médicaux majeurs (Image 2)
    {
      title: "Congrès FCPC 2026 - Cardiologie pédiatrique et congénitale",
      hospital: "Cité des Congrès de Nantes",
      location: "Nantes",
      country: "France",
      specialty: "Cardiologie pédiatrique",
      deadline: new Date("2026-09-10"),
      requirements: [
        "Inscription nominative & invitation officielle au congrès",
        "Assistance complète dossier Visa Schengen C (TLS / VFS)",
        "Réservation d'hôtel & certificat d'assurance voyage",
      ],
      contactEmail: "inscriptions@fcpc2026.fr",
    },
    {
      title: "Congrès SFA 2026 - Société Française d'Audiologie",
      hospital: "Le Corum - Centre de Congrès de Montpellier",
      location: "Montpellier",
      country: "France",
      specialty: "Audiologie / ORL",
      deadline: new Date("2026-09-11"),
      requirements: [
        "Inscription nominative & invitation officielle au congrès",
        "Assistance complète dossier Visa Schengen C (TLS / VFS)",
        "Réservation d'hôtel & certificat d'assurance voyage",
      ],
      contactEmail: "contact@sfa-audiologie.fr",
    },
    {
      title:
        "Congrès SFAR 2026 - Société Française d'Anesthésie et de Réanimation",
      hospital: "Palais des Congrès de Paris",
      location: "Paris",
      country: "France",
      specialty: "Anesthésie-réanimation",
      deadline: new Date("2026-09-16"),
      requirements: [
        "Inscription nominative & invitation officielle au congrès",
        "Assistance complète dossier Visa Schengen C (TLS / VFS)",
        "Réservation d'hôtel & certificat d'assurance voyage",
      ],
      contactEmail: "congres@sfar.org",
    },
    {
      title:
        "Congrès SCGP 2026 - Société de Chirurgie Gynécologique et Pelvienne",
      hospital: "Palais des Congrès de Bordeaux",
      location: "Bordeaux",
      country: "France",
      specialty: "Gynécologie chirurgicale",
      deadline: new Date("2026-09-16"),
      requirements: [
        "Inscription nominative & invitation officielle au congrès",
        "Assistance complète dossier Visa Schengen C (TLS / VFS)",
        "Réservation d'hôtel & certificat d'assurance voyage",
      ],
      contactEmail: "secretariat@scgp-asso.fr",
    },

    // Postes hospitaliers
    {
      title: "Médecin Assistant en Médecine Interne",
      hospital: "Hôpitaux Universitaires de Genève (HUG)",
      location: "Genève",
      country: "Suisse",
      specialty: "Médecine Interne",
      deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      requirements: [
        "Diplôme fédéral de médecin ou équivalence MEBEKO",
        "Maîtrise du français niveau C1",
        "Motivation pour la recherche clinique et le travail en équipe",
      ],
      contactEmail: "recrutement.medical@hug.ch",
    },
    {
      title: "Poste FFI en Chirurgie Orthopédique & Traumatologie",
      hospital: "Hospices Civils de Lyon (HCL) - CHU Lyon",
      location: "Lyon",
      country: "France",
      specialty: "Chirurgie Orthopédique",
      deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      requirements: [
        "Interne en fin de cursus ou médecin diplômé éligible FFI",
        "Expérience en bloc opératoire et gestion des urgences",
        "Niveau de français B2 minimum",
      ],
      contactEmail: "orthopedie.recrutement@chu-lyon.fr",
    },
    {
      title: "Fellowship en Cardiologie Interventionnelle",
      hospital: "Centre Hospitalier Universitaire Vaudois (CHUV)",
      location: "Lausanne",
      country: "Suisse",
      specialty: "Cardiologie",
      deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      requirements: [
        "Titre de spécialiste en cardiologie ou équivalence reconnue",
        "Pratique attestée en coronarographie diagnostique",
        "Intérêt pour l'imagerie intravasculaire",
      ],
      contactEmail: "cardiologie.rh@chuv.ch",
    },
    {
      title: "Praticien Attaché Associé en Anesthésie-Réanimation",
      hospital: "Assistance Publique - Hôpitaux de Paris (AP-HP)",
      location: "Paris",
      country: "France",
      specialty: "Anesthésie-Réanimation",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      requirements: [
        "Diplôme de docteur en médecine avec spécialisation",
        "Aptitude à la prise en charge des urgences vitales",
        "Dossier complet éligible à la procédure PAE",
      ],
      contactEmail: "recrutement.anesthesie@aphp.fr",
    },
  ];

  for (const opportunity of opportunities) {
    await upsertOpportunity(opportunity);
  }

  console.log("✅ Seed terminé avec succès pour les 6 procédures :");
  console.log(`1. ${phd.title}`);
  console.log(`2. ${mebeko.title}`);
  console.log(`3. ${observation.title}`);
  console.log(`4. ${ffi.title}`);
  console.log(`5. ${associe.title}`);
  console.log(`6. ${congres.title}`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant l'exécution du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
