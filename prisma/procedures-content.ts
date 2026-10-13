import type { Prisma } from "@prisma/client";

export type ProcedureSeed = Omit<
  Prisma.ProcedureCreateInput,
  "steps" | "progress"
> & {
  steps: Prisma.StepCreateWithoutProcedureInput[];
};

// Contenu rédigé à partir des sources officielles consultées en octobre 2026
// (OFSP, service-public.fr, France-Visas, facultés de médecine, AP-HP,
// Commission européenne, ambassades d'Allemagne, régions belges).
// Les montants, délais et calendriers changent : les liens de
// lib/procedure-resources.ts renvoient vers la source à jour.
//
// Dans `content`, une ligne commençant par « - » est affichée comme un
// élément de liste.
export const procedures: ProcedureSeed[] = [
  {
    slug: "doctorat-phd",
    title: "Doctorat (PhD)",
    description:
      "Préparer une thèse en Europe : choisir le pays, trouver un sujet et un directeur, obtenir un financement, puis demander le titre de séjour de chercheur.",
    country: "Europe",
    category: "Recherche",
    steps: [
      {
        order: 1,
        title: "Choisir le pays et le type de doctorat",
        description:
          "Le doctorat dure trois à quatre ans partout en Europe, mais son organisation change d'un pays à l'autre. Ce choix détermine la langue de travail, le financement et le titre de séjour.",
        content: [
          "- France : thèse en trois ans, rattachée à un laboratoire et à une école doctorale.",
          "- Allemagne : doctorat individuel auprès d'un professeur, ou programme structuré dans une école doctorale ; beaucoup de programmes sont en anglais.",
          "- Belgique : thèse en quatre ans, souvent financée par un mandat du FNRS ou du FWO.",
          "- Dans tous les cas, il faut un master ou un diplôme de niveau équivalent. Un diplôme de docteur en médecine est examiné sur dossier par l'université.",
          "- Vérifiez la langue exigée : la thèse peut souvent être rédigée en anglais, mais la vie du laboratoire se fait dans la langue du pays.",
        ].join("\n"),
        estimatedDuration: "1 à 2 semaines",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver un sujet et un directeur de thèse",
        description:
          "On ne s'inscrit pas « en doctorat » de façon générale : on rejoint un projet précis, dans une équipe, sous la direction d'un chercheur habilité.",
        content: [
          "- Consultez les offres du portail européen EURAXESS, qui couvre tous les pays.",
          "- France : portail doctorat de Campus France et theses.fr. Allemagne : base d'offres du DAAD.",
          "- Ou écrivez directement à un chercheur de l'équipe visée, avec un CV, une lettre de motivation et une proposition de projet de deux à trois pages.",
          "- Gardez une trace écrite de l'accord du directeur : elle vous sera demandée pour l'admission.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Obtenir un financement",
        description:
          "La plupart des universités n'admettent un doctorant que si la thèse est financée. Le financement détermine aussi votre statut : salarié ou boursier.",
        content: [
          "- Poste de doctorant salarié : la forme la plus courante en Allemagne, en Belgique et dans les pays nordiques ; en France, c'est le contrat doctoral.",
          "- Bourses nationales : programme Eiffel et bourses des ambassades (France), DAAD (Allemagne), FNRS et FWO (Belgique).",
          "- Réseaux doctoraux Marie Skłodowska-Curie : postes salariés financés par l'Union européenne, ouverts à toutes les nationalités.",
          "- Bourses du gouvernement de votre pays ou de fondations.",
          "- Demandez à votre futur directeur quelles sources sont réalistes pour votre profil : il connaît les calendriers.",
        ].join("\n"),
        estimatedDuration: "2 à 6 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Être admis et s'inscrire à l'université",
        description:
          "L'admission est prononcée par l'université ou son école doctorale, qui vérifie d'abord que votre diplôme donne accès au doctorat.",
        content: [
          "- Préparez diplômes et relevés de notes, avec une traduction assermentée si l'université la demande.",
          "- France : inscription en ligne, le plus souvent sur la plateforme ADUM, puis paiement de la CVEC et des droits. Selon votre pays, la procédure « Études en France » est obligatoire.",
          "- Allemagne : la faculté vérifie l'équivalence de votre diplôme, puis vous délivre une lettre d'admission comme doctorant.",
          "- Signez la convention ou la charte de thèse avec votre directeur.",
        ].join("\n"),
        estimatedDuration: "3 à 8 semaines",
        isRequired: true,
      },
      {
        order: 5,
        title: "Obtenir la convention d'accueil et le titre de séjour",
        description:
          "Dans l'Union européenne, un chercheur d'un pays tiers est admis sur la base d'une convention d'accueil signée avec l'organisme de recherche. Elle ouvre droit à un titre de séjour de chercheur d'au moins un an, renouvelable.",
        content: [
          "- Demandez la convention d'accueil à l'université ou au laboratoire, deux à quatre mois avant le dépôt du visa.",
          "- Déposez la demande au consulat du pays d'accueil, depuis votre pays de résidence.",
          "- France : titre de séjour « talent – chercheur », demandé sur France-Visas.",
          "- Belgique : permis unique, demandé par l'organisme de recherche auprès de la région.",
          "- Allemagne : visa national, puis titre de séjour délivré sur place par le service des étrangers.",
          "- Sans contrat ni convention d'accueil, vous relevez du visa étudiant, aux droits plus limités.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 6,
        title: "S'installer et démarrer la thèse",
        description:
          "Les premières semaines servent à régulariser votre séjour et à poser le cadre de travail avec votre directeur.",
        content: [
          "- Déclarez votre résidence : validation du visa en ligne en France, inscription à la commune en Belgique et en Allemagne.",
          "- Affiliez-vous à l'assurance maladie du pays et ouvrez un compte bancaire.",
          "- Contactez le centre EURAXESS de votre université : il accompagne les chercheurs étrangers pour le logement et les démarches.",
          "- Fixez avec votre directeur le calendrier de la première année et les modalités de suivi de la thèse.",
          "- Le titre de séjour de chercheur permet des séjours de recherche dans d'autres pays de l'Union.",
        ].join("\n"),
        estimatedDuration: "1 mois",
        isRequired: true,
      },
    ],
  },
  {
    slug: "mebeko-suisse",
    title: "Enregistrement MEBEKO",
    description:
      "Faire reconnaître ou enregistrer votre diplôme de médecin auprès de la Commission des professions médicales (MEBEKO), condition préalable à tout exercice en Suisse.",
    country: "Suisse",
    category: "Reconnaissance du diplôme",
    steps: [
      {
        order: 1,
        title: "Identifier la voie qui vous concerne",
        description:
          "La procédure dépend du pays où votre diplôme a été délivré et de votre nationalité. Choisir la bonne voie dès le départ évite de payer un dossier qui sera refusé.",
        content: [
          "- Reconnaissance directe : diplôme délivré par un État de l'UE ou de l'AELE, et vous ou votre conjoint avez la nationalité suisse ou celle d'un État de l'UE ou de l'AELE.",
          "- Reconnaissance indirecte : diplôme d'un État tiers déjà reconnu par un État de l'UE ou de l'AELE, avec au moins trois ans d'expérience clinique au cours des cinq dernières années dans cet État ou en Suisse.",
          "- Enregistrement d'un diplôme non reconnaissable : tous les autres cas. Il permet de travailler sous supervision, comme médecin assistant, mais ne vaut pas reconnaissance.",
          "- Le diplôme fédéral reste accessible plus tard : 36 mois d'activité clinique en Suisse à plein temps ouvrent l'accès à l'examen fédéral ; après 60 mois, seule la partie théorique est à passer.",
        ].join("\n"),
        estimatedDuration: "1 à 2 jours",
        isRequired: true,
      },
      {
        order: 2,
        title: "Prouver votre niveau de langue",
        description:
          "Une langue ne peut être inscrite au registre que si vous la maîtrisez au niveau B2 au minimum. L'inscription est facultative, mais les employeurs et les cantons contrôlent vos connaissances, et certains exigent davantage.",
        content: [
          "Une seule de ces preuves suffit :",
          "- un certificat de langue reconnu, datant de moins de six ans, qui détaille les quatre compétences (lire, écrire, écouter, parler) ;",
          "- un diplôme de médecine ou un titre postgrade obtenu dans cette langue ;",
          "- trois ans d'expérience médicale dans cette langue au cours des dix dernières années.",
          "L'inscription coûte 50 à 100 CHF par langue et peut être demandée en même temps que la reconnaissance du diplôme.",
        ].join("\n"),
        estimatedDuration: "Variable selon l'examen",
        isRequired: true,
      },
      {
        order: 3,
        title: "Constituer le dossier",
        description:
          "Chaque voie a son propre formulaire, à télécharger sur le site de l'Office fédéral de la santé publique (OFSP). Il donne la liste exacte des pièces attendues.",
        content: [
          "- Pièces habituelles : formulaire rempli et signé, copie certifiée du passeport ou de la carte d'identité, CV signé, copie certifiée du diplôme.",
          "- Pour un diplôme de l'UE : attestation de conformité à la directive 2005/36/CE, délivrée par l'autorité du pays du diplôme.",
          "- Les documents officiels doivent être des copies certifiées conformes (notaire, commune, représentation diplomatique).",
          "- N'envoyez jamais d'originaux : ils ne sont pas restitués.",
          "- Langues acceptées : allemand, français, italien, anglais. Dans les autres cas, joignez une traduction officielle.",
        ].join("\n"),
        estimatedDuration: "3 à 6 semaines",
        isRequired: true,
      },
      {
        order: 4,
        title: "Envoyer le dossier par courrier postal",
        description:
          "La MEBEKO n'accepte que les dossiers envoyés par la poste. Les envois par e-mail et les dépôts sur place sont refusés.",
        content: [
          "Adresse : Office fédéral de la santé publique OFSP, MEBEKO, Section « formation universitaire », Schwarzenburgstrasse 157, 3003 Berne, Suisse.",
          "- Envoyez toutes les pièces en un seul envoi, de préférence en recommandé avec suivi.",
          "- Gardez une copie complète du dossier.",
          "- Un accusé de réception vous parvient par e-mail, en général sous trois à quatre semaines.",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 5,
        title: "Régler l'émolument et suivre l'instruction",
        description:
          "Quand le dossier est jugé complet, la MEBEKO vous envoie une facture. La procédure ne se termine qu'après le paiement intégral.",
        content: [
          "- Reconnaissance directe ou indirecte : 800 à 1 000 CHF.",
          "- Enregistrement d'un diplôme non reconnaissable : 800 à 1 200 CHF, facturés en deux fois.",
          "- Paiement par virement bancaire uniquement, sans échelonnement.",
          "- Délai indicatif après l'accusé de réception : trois à six mois pour une reconnaissance, souvent plus pour un enregistrement.",
          "- Évitez les relances : la MEBEKO indique qu'elles ralentissent le traitement.",
        ].join("\n"),
        estimatedDuration: "3 à 6 mois",
        isRequired: true,
      },
      {
        order: 6,
        title: "Recevoir la décision et vérifier votre inscription",
        description:
          "La décision arrive par courrier recommandé. Elle s'accompagne de votre inscription au registre des professions médicales (MedReg) et de l'attribution d'un numéro GLN.",
        content: [
          "- Vérifiez que votre fiche du MedReg est exacte : diplôme, langues inscrites.",
          "- Signalez tout changement d'adresse ou de nom à la MEBEKO.",
          "- L'autorisation de pratiquer relève ensuite du canton où vous travaillerez.",
          "- Pour chercher un poste, poursuivez avec la procédure « Médecin assistant en Suisse ».",
        ].join("\n"),
        estimatedDuration: "1 à 2 semaines",
        isRequired: true,
      },
    ],
  },
  {
    slug: "medecin-assistant-suisse",
    title: "Médecin assistant en Suisse",
    description:
      "Obtenir un poste de médecin assistant dans un hôpital suisse : inscription au registre, candidature, autorisation cantonale, permis de séjour et installation.",
    country: "Suisse",
    category: "Poste hospitalier",
    steps: [
      {
        order: 1,
        title: "Faire inscrire votre diplôme au registre",
        description:
          "Aucun établissement ne peut vous engager si vous ne figurez pas au registre des professions médicales (MedReg). C'est le préalable à tout le reste.",
        content: [
          "- Diplôme de l'UE ou de l'AELE : demandez la reconnaissance à la MEBEKO.",
          "- Diplôme d'un État tiers : demandez l'enregistrement comme diplôme non reconnaissable ; il autorise l'exercice sous supervision.",
          "- Suivez la procédure « Enregistrement MEBEKO » et comptez plusieurs mois.",
          "- Selon les cantons, un engagement sous réserve est parfois possible dès que la MEBEKO a accusé réception du dossier : posez la question à l'employeur.",
        ].join("\n"),
        estimatedDuration: "4 à 8 mois",
        isRequired: true,
      },
      {
        order: 2,
        title: "Atteindre le niveau de langue attendu",
        description:
          "Le registre exige le niveau B2 dans la langue de travail. En pratique, les hôpitaux attendent souvent mieux, car vous serez seul face aux patients dès les premières gardes.",
        content: [
          "- Suisse romande : français. Suisse alémanique : allemand, et comprendre le dialecte aide beaucoup. Tessin : italien.",
          "- Faites inscrire la langue au MedReg (50 à 100 CHF par langue).",
          "- Si vous n'avez ni étudié ni exercé dans cette langue, préparez un certificat de moins de six ans.",
        ].join("\n"),
        estimatedDuration: "Variable",
        isRequired: true,
      },
      {
        order: 3,
        title: "Préparer un dossier de candidature",
        description:
          "Les services suisses attendent un dossier complet dès le premier envoi. Les certificats de travail y pèsent autant que le CV.",
        content: [
          "- CV daté, chronologique, sans période inexpliquée.",
          "- Lettre de motivation adressée au médecin-chef du service, avec la spécialité visée et votre date de disponibilité.",
          "- Copies des diplômes et de la décision de la MEBEKO.",
          "- Certificats de travail de vos postes précédents et, si possible, deux lettres de recommandation.",
        ].join("\n"),
        estimatedDuration: "1 à 2 semaines",
        isRequired: true,
      },
      {
        order: 4,
        title: "Trouver un poste dans un établissement de formation reconnu",
        description:
          "Pour que vos années comptent en vue d'un titre de spécialiste, le service doit être reconnu comme établissement de formation postgraduée par l'Institut suisse pour la formation médicale (ISFM).",
        content: [
          "- Vérifiez la reconnaissance du service dans le registre des établissements de formation de l'ISFM.",
          "- Consultez les offres sur les sites des hôpitaux, sur la bourse de l'emploi de la FMH et auprès de l'asmac, l'association des médecins assistants.",
          "- Les candidatures spontanées au médecin-chef sont courantes.",
          "- Les postes se pourvoient souvent six à douze mois à l'avance : postulez tôt.",
        ].join("\n"),
        estimatedDuration: "2 à 6 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "Obtenir l'autorisation cantonale si elle est requise",
        description:
          "Les règles varient d'un canton à l'autre. Dans plusieurs cantons, un médecin assistant titulaire d'un diplôme hors UE et AELE doit avoir une autorisation de pratiquer sous supervision ; la demande est en général déposée par l'établissement.",
        content: [
          "Exemple du canton de Vaud :",
          "- autorisation valable un an, renouvelable sur demande motivée ;",
          "- pièces : formulaire, CV, pièce d'identité, diplôme et sa traduction, certificat médical et extrait de casier judiciaire de moins de six mois, attestation de l'ordre professionnel du pays d'exercice, plan de formation ;",
          "- émolument de 100 CHF, délai de huit à dix semaines.",
          "Pour un autre canton, renseignez-vous auprès de son service de la santé publique.",
        ].join("\n"),
        estimatedDuration: "2 à 3 mois",
        isRequired: false,
      },
      {
        order: 6,
        title: "Obtenir le permis de séjour et de travail",
        description:
          "La demande est déposée par l'employeur auprès du canton, une fois le contrat signé.",
        content: [
          "- Ressortissants de l'UE ou de l'AELE : la libre circulation s'applique ; le permis est délivré sur présentation du contrat de travail.",
          "- Ressortissants d'États tiers : l'autorisation est soumise à l'accord du canton puis de la Confédération, dans la limite de contingents annuels. Prévoyez plusieurs mois.",
          "- N'entrez pas en Suisse pour travailler avant d'avoir cette autorisation ; le visa d'entrée est délivré par la représentation suisse de votre pays une fois l'accord donné.",
        ].join("\n"),
        estimatedDuration: "1 à 4 mois",
        isRequired: true,
      },
      {
        order: 7,
        title: "S'installer et ouvrir votre dossier de formation",
        description:
          "Quelques formalités sont à accomplir dans les premiers jours, et votre formation postgraduée doit être documentée dès le premier poste.",
        content: [
          "- Annoncez votre arrivée à la commune de résidence dans les quatorze jours.",
          "- Souscrivez une assurance-maladie obligatoire dans les trois mois.",
          "- Ouvrez votre logbook électronique auprès de l'ISFM pour faire valider vos périodes de formation.",
          "- Avec un diplôme seulement enregistré, vous pouvez commencer la formation postgraduée, mais le titre de spécialiste ne s'obtient qu'avec un diplôme fédéral ou reconnu.",
        ].join("\n"),
        estimatedDuration: "1 mois",
        isRequired: true,
      },
    ],
  },
  {
    slug: "stage-observation",
    title: "Stage d'observation",
    description:
      "Observer le fonctionnement d'un service hospitalier en Europe pendant quelques semaines, sans participer aux soins. Le séjour dépasse rarement trois mois.",
    country: "Europe",
    category: "Immersion hospitalière",
    steps: [
      {
        order: 1,
        title: "Comprendre ce que le stage permet",
        description:
          "Vous êtes accueilli comme observateur : vous assistez aux consultations, aux visites, aux réunions de service et aux interventions, mais vous ne réalisez aucun acte de soin et vous ne prescrivez pas.",
        content: [
          "- La règle est la même partout : sans autorisation d'exercer dans le pays, aucun geste sur un patient. En Allemagne, où ce stage s'appelle « Hospitation », même une prise de sang est interdite.",
          "- La durée est courte : trois mois au maximum en France.",
          "- Le stage n'est pas rémunéré. En Allemagne, l'hôpital ne peut ni vous payer ni vous loger gratuitement.",
          "- Il ne donne pas le droit d'exercer et ne se transforme pas en poste.",
          "- Vous êtes tenu au secret médical, comme tout le personnel du service.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver un service d'accueil",
        description:
          "L'accord du chef de service est le point de départ. Il est plus facile à obtenir quand la demande est précise et portée par votre établissement d'origine.",
        content: [
          "- Écrivez au chef de service avec un CV, vos objectifs d'apprentissage et les dates souhaitées, dans la langue du pays ou en anglais.",
          "- Faites appuyer la demande par votre hôpital ou votre faculté.",
          "- Beaucoup d'hôpitaux universitaires ont un formulaire de candidature dédié aux observateurs : cherchez-le sur leur site.",
          "- Une fois l'accord de principe obtenu, demandez le contact du service administratif qui prépare les documents.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Obtenir la convention ou la lettre d'invitation",
        description:
          "L'hôpital formalise votre accueil par écrit. C'est ce document qui justifiera votre séjour auprès du consulat.",
        content: [
          "- France : convention de stage signée entre l'hôpital et votre établissement d'origine.",
          "- Allemagne : lettre d'invitation ou contrat précisant l'établissement, le service, les dates et le nom d'un contact.",
          "- Pièces habituellement demandées : copie du diplôme et du passeport, CV, attestation d'assurance responsabilité civile couvrant le milieu hospitalier.",
          "- Selon l'établissement : carnet de vaccination à jour et justificatif de niveau de langue.",
        ].join("\n"),
        estimatedDuration: "3 à 6 semaines",
        isRequired: true,
      },
      {
        order: 4,
        title: "Demander le visa",
        description:
          "Si votre nationalité y est soumise, un séjour de 90 jours au plus relève du visa Schengen de court séjour, aux règles communes à tous les pays de l'espace Schengen.",
        content: [
          "- Déposez la demande auprès du consulat du pays où se déroule le stage : France-Visas pour la France, le site de l'ambassade pour les autres pays.",
          "- Passeport valable au moins trois mois après la fin du séjour, délivré depuis moins de dix ans, avec deux pages vierges.",
          "- Assurance voyage couvrant au moins 30 000 € de frais médicaux et de rapatriement, pour tout l'espace Schengen.",
          "- Justificatifs d'hébergement et de ressources. Frais de visa : 90 € pour un adulte.",
          "- Déposez le dossier tôt, et au plus tard quinze jours avant le départ.",
          "- Au-delà de 90 jours, il faut un visa national de long séjour, propre à chaque pays.",
        ].join("\n"),
        estimatedDuration: "3 à 6 semaines",
        isRequired: false,
      },
      {
        order: 5,
        title: "Effectuer le stage et obtenir l'attestation",
        description:
          "Le premier jour, présentez-vous au service administratif qui a préparé votre accueil, puis au médecin référent.",
        content: [
          "- Tenez un carnet de ce que vous observez : il vous servira pour vos candidatures suivantes.",
          "- Demandez en fin de stage une attestation signée du chef de service, mentionnant le service et les dates.",
          "- Respectez la date de retour prévue : un séjour sans dépassement facilite les demandes de visa ultérieures.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
    ],
  },
  {
    slug: "ffi-france",
    title: "Stage FFI",
    description:
      "Exercer comme faisant fonction d'interne dans un hôpital français : le statut, la voie d'accès, le visa, la prise de fonctions et la validation des semestres.",
    country: "France",
    category: "Poste hospitalier",
    steps: [
      {
        order: 1,
        title: "Comprendre le statut de FFI",
        description:
          "Le faisant fonction d'interne occupe un poste d'interne dans un service agréé pour la formation. Il exerce par délégation, sous la responsabilité d'un praticien du service.",
        content: [
          "- Les postes suivent le rythme des semestres d'internat, qui débutent en novembre et en mai.",
          "- Vous êtes rémunéré et vous participez aux gardes comme un interne.",
          "- Le statut est temporaire et ne donne pas le droit d'exercer la médecine en France par la suite.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 2,
        title: "Vérifier votre voie d'accès",
        description:
          "On ne postule pas directement à un poste de FFI comme à un emploi. Le statut est attaché à une formation universitaire suivie en France.",
        content: [
          "- Médecin diplômé hors Union européenne : le statut s'obtient en étant admis à un DFMS ou à un DFMSA. Suivez d'abord la procédure « DFMS et DFMSA ».",
          "- C'est cette admission qui vous affecte dans un hôpital : vous ne choisissez pas librement le service.",
          "- Si vous avez la nationalité française avec un diplôme obtenu hors de l'Union européenne, vous ne relevez pas du statut de FFI mais de la procédure d'autorisation d'exercice, gérée par le Centre national de gestion.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 3,
        title: "Préparer votre arrivée avec l'hôpital",
        description:
          "Dès que votre affectation est connue, prenez contact avec la direction des affaires médicales de l'hôpital : c'est elle qui établit votre dossier administratif.",
        content: [
          "- Demandez la liste des pièces : diplômes, passeport, attestation d'affectation, relevé d'identité bancaire, carnet de vaccination.",
          "- Renseignez-vous sur le logement : beaucoup d'hôpitaux disposent d'un internat, aux places limitées.",
          "- Confirmez par écrit votre date de prise de fonctions et le service d'affectation.",
        ].join("\n"),
        estimatedDuration: "2 à 4 semaines",
        isRequired: true,
      },
      {
        order: 4,
        title: "Demander le visa long séjour",
        description:
          "Déposez la demande dès réception de votre attestation d'affectation. Le consulat vous précise la mention applicable à votre situation.",
        content: [
          "- Remplissez la demande sur France-Visas, puis prenez rendez-vous au consulat ou chez son prestataire.",
          "- Pièces habituelles : passeport, attestation d'affectation, justificatifs d'hébergement et de ressources.",
          "- Selon votre pays de résidence, la procédure « Études en France » de Campus France est obligatoire avant le visa.",
          "- Les délais s'allongent à l'approche de la rentrée de novembre : n'attendez pas.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "Prendre vos fonctions",
        description:
          "Les premiers jours combinent les formalités de l'hôpital, celles de l'université et la régularisation de votre séjour.",
        content: [
          "- Présentez-vous à la direction des affaires médicales avant le premier jour, puis au chef de service.",
          "- Passez la visite médicale d'embauche.",
          "- Validez votre visa long séjour en ligne dans les trois mois qui suivent votre arrivée.",
          "- Affiliez-vous à l'Assurance maladie et ouvrez un compte bancaire pour recevoir votre rémunération.",
          "- Demandez le tableau de gardes et les protocoles du service.",
        ].join("\n"),
        estimatedDuration: "2 semaines",
        isRequired: true,
      },
      {
        order: 6,
        title: "Faire valider vos semestres",
        description:
          "Chaque semestre de stage est évalué par le responsable du service. Ces validations conditionnent l'obtention de votre diplôme.",
        content: [
          "- Demandez en début de semestre les objectifs attendus et les modalités d'évaluation.",
          "- Faites signer la validation de stage avant de quitter le service.",
          "- Conservez une copie de chaque validation et de vos attestations de fonctions : elles vous seront demandées dans votre pays.",
        ].join("\n"),
        estimatedDuration: "6 mois par semestre",
        isRequired: true,
      },
    ],
  },
  {
    slug: "dfms-dfmsa",
    title: "DFMS et DFMSA",
    description:
      "Les deux diplômes qui permettent à un médecin diplômé hors Union européenne de venir se spécialiser en France. La sélection est nationale, annuelle, et se prépare un an à l'avance.",
    country: "France",
    category: "Formation spécialisée",
    steps: [
      {
        order: 1,
        title: "Choisir entre DFMS et DFMSA",
        description:
          "Les deux diplômes s'adressent aux médecins titulaires d'un diplôme obtenu hors de l'Union européenne, de l'Espace économique européen, de la Suisse et d'Andorre. Le choix dépend de votre avancement.",
        content: [
          "- DFMS (diplôme de formation médicale spécialisée) : vous êtes en cours de spécialisation dans votre pays. La formation dure de deux à six semestres.",
          "- DFMSA (formation approfondie) : vous êtes déjà spécialiste. La formation dure un à deux semestres.",
          "- Il n'existe pas de poste de DFMS en médecine générale.",
          "- Ces diplômes ne donnent pas le droit d'exercer la médecine en France par la suite.",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 2,
        title: "Obtenir une attestation de français de niveau B2",
        description:
          "Le niveau B2 est le minimum exigé. L'attestation est à joindre au dossier, il faut donc la passer avant l'ouverture de la campagne.",
        content: [
          "- Certifications acceptées : DELF, TCF ou TEF.",
          "- Si tout votre cursus s'est déroulé en français, une attestation de votre établissement peut la remplacer.",
          "- Inscrivez-vous tôt : les sessions sont espacées et les résultats prennent plusieurs semaines.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Déposer le dossier de candidature",
        description:
          "La campagne est centralisée par la faculté de médecine de Strasbourg pour toute la France. Les candidatures se déposent environ un an avant la prise de fonctions.",
        content: [
          "- Le calendrier est publié chaque automne sur le site de la faculté de médecine de Strasbourg. La date limite se situe habituellement autour du 15 janvier, pour une prise de fonctions en novembre.",
          "- Si vous résidez à l'étranger, le dossier passe par le service de coopération et d'action culturelle de l'ambassade de France.",
          "- Pièces habituelles : fiche d'identité, diplômes, attestation de votre situation dans la spécialité, CV, lettre de motivation.",
          "- Suivez la procédure à la lettre : un dossier incomplet ou hors délai est annulé.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Compléter le second dossier et attendre l'affectation",
        description:
          "Les candidats retenus envoient un second dossier au printemps. La faculté répartit ensuite les candidats selon les postes ouverts dans les hôpitaux.",
        content: [
          "- Joignez au second dossier l'attestation de français.",
          "- L'affectation dépend des postes offerts dans votre spécialité : vous ne choisissez pas librement l'hôpital.",
          "- Les résultats sont publiés au début de l'été.",
        ].join("\n"),
        estimatedDuration: "4 à 6 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "S'inscrire à l'université d'accueil",
        description:
          "Votre affectation désigne une université et un hôpital. L'inscription universitaire est obligatoire : c'est elle qui fonde votre statut.",
        content: [
          "- Inscrivez-vous à l'université d'accueil et réglez la CVEC et les droits d'inscription.",
          "- Conservez l'attestation d'affectation et le certificat de scolarité : ils servent au visa et à l'hôpital.",
          "- Pour le visa, l'arrivée à l'hôpital et la validation des semestres, poursuivez avec la procédure « Stage FFI ».",
        ].join("\n"),
        estimatedDuration: "2 à 4 semaines",
        isRequired: true,
      },
    ],
  },
  {
    slug: "stage-associe",
    title: "Stage associé",
    description:
      "Formation pratique complémentaire dans un hôpital public français, pour un médecin diplômé hors Union européenne, dans le cadre d'une coopération entre votre établissement et l'hôpital d'accueil.",
    country: "France",
    category: "Perfectionnement hospitalier",
    steps: [
      {
        order: 1,
        title: "Vérifier les conditions",
        description:
          "Le statut de stagiaire associé est encadré par un arrêté du 16 mai 2011. Il vise un perfectionnement de durée limitée, suivi d'un retour dans votre pays.",
        content: [
          "- Diplôme de docteur en médecine permettant d'exercer dans le pays où il a été obtenu ou dans votre pays d'origine.",
          "- Niveau de français B2.",
          "- Durée : six mois, renouvelables une fois. La durée totale des conventions ne peut pas dépasser deux ans.",
          "- Si vous avez suivi une formation diplômante en France (DFMS, DFMSA), un délai d'un an doit s'écouler avant le stage.",
          "- À l'issue du stage, vous devez rentrer dans votre pays ; le statut ne permet pas de rester en France sous un autre statut.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver un hôpital d'accueil et un établissement partenaire",
        description:
          "Le stage repose sur une coopération entre l'hôpital français et un établissement de votre pays : hôpital, université ou ministère. Sans partenaire signataire, il n'y a pas de convention possible.",
        content: [
          "- Obtenez l'accord d'un chef de service, puis contactez la direction des affaires médicales de l'hôpital.",
          "- Identifiez dans votre pays l'établissement qui signera, ainsi que le nom et la fonction de son représentant.",
          "- Vérifiez s'il existe déjà une convention de coopération entre les deux établissements : cela raccourcit nettement les délais.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Faire établir les conventions",
        description:
          "Deux documents sont nécessaires : la convention de coopération entre les établissements, et la convention de stage qui fixe vos conditions d'accueil.",
        content: [
          "La convention de stage précise le service, le praticien responsable de votre suivi, les objectifs et les modalités d'évaluation.",
          "Pièces habituellement demandées :",
          "- copie des diplômes et du passeport ;",
          "- CV et attestation de français ;",
          "- coordonnées de l'établissement partenaire et de son signataire.",
          "La rémunération est fixée par la convention : demandez à l'hôpital qui la prend en charge.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Obtenir la validation préfectorale et le visa",
        description:
          "Une fois signées, les conventions sont transmises par l'hôpital aux services de la préfecture. Leur validation vous permet de demander le visa.",
        content: [
          "- Attendez le retour de la convention validée avant de déposer le visa.",
          "- Demandez sur France-Visas un visa long séjour valant titre de séjour, mention « stagiaire ».",
          "- Souscrivez une assurance responsabilité civile.",
          "- Les préfectures peuvent refuser l'autorisation à un candidat qui vient d'effectuer un stage associé : ne comptez pas sur un enchaînement de conventions.",
        ].join("\n"),
        estimatedDuration: "2 à 3 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "Prendre vos fonctions et préparer l'évaluation",
        description:
          "Vous exercez sous la responsabilité du praticien désigné dans la convention, sans suivre de formation universitaire en parallèle.",
        content: [
          "- Présentez-vous à la direction des affaires médicales avant le premier jour.",
          "- Validez votre visa long séjour en ligne dans les trois mois qui suivent votre arrivée.",
          "- Si un renouvellement est envisagé, lancez la demande deux à trois mois avant la fin de la période en cours.",
          "- Demandez en fin de stage l'évaluation écrite prévue par la convention.",
        ].join("\n"),
        estimatedDuration: "6 mois",
        isRequired: true,
      },
    ],
  },
  {
    slug: "participation-congres",
    title: "Participation aux congrès",
    description:
      "Préparer un déplacement à un congrès médical en France : inscription, invitation, réservations et demande de visa court séjour.",
    country: "France",
    category: "Congrès et visa",
    steps: [
      {
        order: 1,
        title: "S'inscrire au congrès et obtenir la lettre d'invitation",
        description:
          "La lettre d'invitation est la pièce centrale du dossier de visa : elle justifie le motif professionnel de votre séjour.",
        content: [
          "- Inscrivez-vous auprès de l'organisateur et réglez les droits d'inscription.",
          "- Demandez une lettre d'invitation nominative, mentionnant votre nom tel qu'il figure sur le passeport, les dates et le lieu du congrès.",
          "- Conservez le reçu de paiement : il prouve que l'inscription est effective.",
        ].join("\n"),
        estimatedDuration: "3 à 7 jours",
        isRequired: true,
      },
      {
        order: 2,
        title: "Vérifier votre passeport et fixer le calendrier",
        description:
          "Un passeport non conforme entraîne un refus immédiat, et un dépôt tardif ne laisse aucune marge en cas de pièce manquante.",
        content: [
          "- Le passeport doit être valable au moins trois mois après la fin du visa, avoir été délivré depuis moins de dix ans et comporter deux pages vierges.",
          "- Déposez la demande le plus tôt possible, et au plus tard quinze jours avant le départ.",
          "- Limitez le séjour demandé aux dates du congrès, avec un ou deux jours de marge.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 3,
        title: "Réserver l'hébergement",
        description:
          "Le consulat vérifie que vous savez où vous logez pendant tout le séjour.",
        content: [
          "- Réservez un hôtel couvrant exactement les nuits du séjour, de préférence proche du lieu du congrès.",
          "- Les dates doivent correspondre à celles du transport et de l'assurance.",
          "- Si vous êtes hébergé par un particulier, celui-ci doit obtenir une attestation d'accueil auprès de sa mairie.",
        ].join("\n"),
        estimatedDuration: "1 à 2 jours",
        isRequired: true,
      },
      {
        order: 4,
        title: "Réserver le transport",
        description:
          "Le dossier doit montrer un aller et un retour, à des dates cohérentes avec le congrès.",
        content: [
          "- Privilégiez une réservation modifiable ou remboursable tant que le visa n'est pas accordé.",
          "- Les dates d'arrivée et de départ doivent encadrer celles du congrès, sans séjour prolongé inexpliqué.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 5,
        title: "Souscrire l'assurance voyage",
        description:
          "L'assurance est obligatoire : sans elle, le visa est refusé.",
        content: [
          "- Couverture d'au moins 30 000 € pour les soins d'urgence, l'hospitalisation et le rapatriement.",
          "- Valable dans tout l'espace Schengen.",
          "- Couvrant toute la durée du séjour, jour d'arrivée et jour de départ compris.",
        ].join("\n"),
        estimatedDuration: "1 jour",
        isRequired: true,
      },
      {
        order: 6,
        title: "Réunir les justificatifs professionnels et financiers",
        description:
          "Ces pièces montrent deux choses : que vous pouvez financer le séjour, et que vous avez des raisons solides de rentrer.",
        content: [
          "- Attestation de votre employeur ou ordre de mission, précisant votre fonction, votre congé et la date de reprise.",
          "- Relevés bancaires des trois derniers mois et derniers bulletins de salaire.",
          "- Si un tiers finance le voyage (hôpital, société savante, laboratoire), une attestation de prise en charge.",
          "- Repères de ressources retenus par les consulats français : 65 € par jour avec une réservation d'hôtel, 120 € par jour sans justificatif d'hébergement.",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 7,
        title: "Remplir la demande sur France-Visas",
        description:
          "La demande se fait en ligne, sur le portail officiel. Il vous indique la liste exacte des pièces selon votre situation et le montant des frais.",
        content: [
          "- Créez un compte, remplissez le formulaire et choisissez le motif « voyage d'affaires », qui couvre la participation à un congrès.",
          "- Recopiez le numéro et les dates du passeport sans erreur : une incohérence suffit à faire rejeter le dossier.",
          "- Imprimez le formulaire et le récépissé.",
        ].join("\n"),
        estimatedDuration: "2 heures",
        isRequired: true,
      },
      {
        order: 8,
        title: "Déposer le dossier au rendez-vous",
        description:
          "Le dépôt se fait en personne, au consulat ou chez le prestataire qu'il a désigné dans votre pays, avec prise des empreintes.",
        content: [
          "- Prenez rendez-vous dès que la demande en ligne est validée : les créneaux sont parfois rares.",
          "- Apportez les originaux et une copie de chaque pièce, classés dans l'ordre de la liste de France-Visas.",
          "- Les frais de visa sont de 90 € pour un adulte, auxquels s'ajoutent les frais de service du prestataire. Ils ne sont pas remboursés en cas de refus.",
          "- Conservez le reçu : il permet de suivre le dossier et de récupérer le passeport.",
        ].join("\n"),
        estimatedDuration: "2 à 4 semaines",
        isRequired: true,
      },
    ],
  },
];
