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
// Format de `content` : voir components/procedures/step-content.tsx (points
// « - », sous-puces indentées, encadré « ## », cartes « ### », **gras**,
// *italique*, [liens](https://…)).
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
          "Le doctorat en sciences (PhD) dure trois à quatre ans partout en Europe, mais son organisation, son mode de recrutement et la reconnaissance préalable de votre diplôme de docteur en médecine (MD) changent d'un pays à l'autre. Ce choix initial détermine votre langue de travail, votre statut salarial et votre futur titre de séjour.",
        content: [
          "- **Distinction fondamentale (MD vs PhD) :** un PhD est un diplôme de recherche pure (biologie, épidémiologie, santé publique, imagerie et IA médicale, neurosciences, etc.). Il ne donne pas le droit d'exercer la médecine clinique sur les patients en Europe, qui relève des procédures d'équivalence ordinales, mais constitue un tremplin académique et scientifique majeur.",
          "- **France (3 ans) :** thèse obligatoirement rattachée à une unité de recherche (INSERM, CNRS, université) et à une école doctorale (ED). Attention au prérequis du Master 2 : un diplôme de docteur en médecine (MD) ou un DES obtenu hors UE ne donne pas un accès automatique au PhD. Sans Master 2 de recherche, vous devez demander une dérogation pour équivalence de diplôme auprès de l'école doctorale, en valorisant votre thèse d'exercice, votre mémoire et vos publications.",
          "- **Allemagne (3 à 4 ans) :** deux voies, le doctorat individuel (*Individualpromotion*) auprès d'un professeur (*Doktorvater* ou *Doktormutter*), ou les programmes structurés (*Graduiertenkollegs*, instituts Max Planck). L'anglais est la langue de travail de la grande majorité des laboratoires biomédicaux. Votre diplôme médical doit être reconnu équivalent à un master allemand (vérifiable sur la base officielle [Anabin](https://anabin.kmk.org/)).",
          "- **Belgique (4 ans) :** très accessible aux médecins francophones (ULB, UCLouvain, ULiège) et anglophones (KU Leuven, UGent). Admission sur dossier par la commission doctorale de la faculté de médecine ou de santé publique, souvent avec un financement par un mandat du FNRS ou du FWO.",
          "- **Suisse, Pays-Bas et Scandinavie (3 à 4 ans) :** statut d'employé universitaire, bien rémunéré (contrat à 100 %). Le recrutement se fait sur offres d'emploi publiées, et un master de recherche (MSc) en plus du MD est presque toujours exigé.",
          "- **Exigences linguistiques :** même si la thèse et la vie du laboratoire se font souvent en anglais (niveau B2 à C1 demandé, par exemple IELTS ≥ 6,5 ou TOEFL iBT ≥ 90), vérifiez si le sujet implique le recrutement de patients ou des données hospitalières : la langue du pays sera alors exigée.",
        ].join("\n"),
        estimatedDuration: "1 à 2 semaines",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver un sujet et un directeur de thèse",
        description:
          "Votre admission dépend avant tout de l'accord d'un directeur de thèse (PI, Principal Investigator) habilité à diriger des recherches (HDR en France, Professor ou Privatdozent en Allemagne), ou de votre sélection sur un projet de recherche déjà financé.",
        content: [
          "- **Voie 1 : postuler à une offre de thèse publiée (la voie royale).** Le sujet est déjà défini et le financement est acquis par le laboratoire. Vous postulez comme à une offre d'emploi, avec un dossier complet.",
          "- **Voie 2 : candidature spontanée auprès d'un directeur.** Idéale si vous avez votre propre projet ou visez une bourse gouvernementale. Repérez sur PubMed ou Google Scholar les chercheurs européens qui ont publié récemment sur votre thématique.",
          "- **L'option de la cotutelle internationale :** inscription simultanée dans une université de votre pays d'origine et dans une université européenne, avec alternance des séjours et obtention d'un double diplôme de doctorat.",
          "- **Portails officiels pour trouver une offre :**",
          "  - Europe : [Euraxess Jobs](https://euraxess.ec.europa.eu/jobs/search) (filtrer sur *First Stage Researcher, R1*)",
          "  - France : [Campus France Doctorat](https://doctorat.campusfrance.org/), [ABG](https://www.abg.asso.fr/), [ADUM](https://www.adum.fr/)",
          "  - Allemagne : [PhDGermany, la base du DAAD](https://www2.daad.de/deutschland/promotion/phd/en/13306-phdgermany-database-doctoral-programmes/)",
          "  - International : [FindAPhD](https://www.findaphd.com/), [Nature Careers](https://www.nature.com/naturecareers)",
          "## Focus : dossier de candidature",
          "### Le CV académique (spécial médecin chercheur)",
          "- N'envoyez jamais un CV purement clinique. Deux pages au maximum, qui mettent en avant :",
          "  - votre profil de recherche ;",
          "  - votre formation (MD, DES, DU) et surtout le titre, la mention et la méthodologie de votre thèse d'exercice ou de votre mémoire ;",
          "  - vos publications et communications en congrès, avec votre nom en gras ;",
          "  - vos compétences techniques de recherche (R, Python, SPSS, Stata, Zotero, REDCap, imagerie, biologie) ;",
          "  - votre expérience clinique utile à la recherche (essais cliniques, registres).",
          "- Modèles recommandés : [Europass CV](https://europa.eu/europass/en/create-europass-cv) et [CV académiques Overleaf](https://www.overleaf.com/gallery/tagged/cv).",
          "### Le mail d'approche et la lettre de motivation",
          "- Le mail d'approche fait moins de 200 mots.",
          "- La lettre de motivation tient sur une page, en PDF :",
          "  - une accroche qui cite un article récent du directeur de thèse ;",
          "  - votre valeur ajoutée de clinicien chercheur : compréhension clinique et rigueur méthodologique ;",
          "  - une précision immédiate sur le mode de financement visé.",
          "- Ressource : [rédiger sa lettre de motivation de thèse (Futura Sciences)](https://www.futura-sciences.com/sciences/questions-reponses/lettre-motivation-rediger-lettre-motivation-these-16482/).",
          "### Les lettres de recommandation (2 à 3)",
          "- À demander à votre directeur de thèse ou de mémoire, à votre chef de service (PU-PH ou professeur) ou à un co-auteur scientifique.",
          "- Sur papier à en-tête officiel du CHU ou de l'université, signées, cachetées, avec une adresse e-mail professionnelle.",
          "- Elles doivent évaluer votre autonomie scientifique et votre classement (par exemple : dans les 5 % premiers de la promotion).",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Obtenir un financement",
        description:
          "En sciences biomédicales et en santé, la quasi-totalité des écoles doctorales européennes refusent l'inscription en thèse sans un financement garanti pour toute la durée du doctorat (de 1 400 € à 2 500 € net par mois selon le pays). Un PhD en sciences ne se finance pas sur fonds propres.",
        content: [
          "- **Contrats doctoraux sur projet (intégrés à l'offre) :** si l'offre est financée par une agence de recherche (ANR en France, DFG en Allemagne, FWO ou FNRS en Belgique, ERC au niveau européen), le laboratoire vous salarie directement.",
          "- **Concours des écoles doctorales (France) :** organisés entre avril et juin sous forme d'audition (présentation de 10 à 15 minutes de votre parcours et du projet devant un jury), avec l'appui de votre directeur de thèse.",
          "- **Bourses pour les médecins et chercheurs africains :**",
          "  - France : bourses des ambassades (**SCAC**), **bourse Eiffel**, financements de l'**IRD** (programme ARTS), de l'**ANRS-MIE** (maladies infectieuses) et de la **Fondation Mérieux**",
          "  - Allemagne : bourses du [DAAD](https://www.daad.de/en/), fondations Humboldt et Boehringer Ingelheim",
          "  - Belgique : bourses de coopération de l'[ARES](https://www.ares-ac.be/), mandats du [FNRS](https://www.frs-fnrs.be/) et du Télévie",
          "  - Europe : réseaux doctoraux **Marie Skłodowska-Curie (MSCA)**",
          "- **Réussir l'audition de sélection :** structurez votre présentation en cinq parties : contexte et question de recherche, hypothèse, méthodologie et plan sur trois ans (diagramme de Gantt), faisabilité et risques, adéquation de votre profil médical.",
        ].join("\n"),
        estimatedDuration: "2 à 6 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Être admis et s'inscrire à l'université",
        description:
          "Une fois le directeur de thèse et le financement validés, il faut transformer cet accord scientifique en une admission administrative officielle à l'école doctorale et à l'université.",
        content: [
          "- **Validation de la dérogation de master (propre aux MD) :** le directeur de thèse soumet votre dossier (diplôme de MD, relevés de notes, mémoire ou thèse d'exercice, publications) à la commission de l'école doctorale (France) ou au *Promotionsausschuss* (Allemagne), qui valide l'équivalence avec un Master 2.",
          "- **Plateformes d'inscription :** en France, tout se fait sur le portail [ADUM](https://www.adum.fr/) ; un doctorant sous contrat de chercheur ne passe généralement pas par la procédure *Études en France*. En Allemagne, enregistrement auprès du bureau international (*Akademisches Auslandsamt*) et du décanat (*Zulassung zur Promotion*).",
          "- **Dossier administratif :** diplôme de docteur en médecine et DES (avec traductions assermentées si nécessaire), relevés de notes, procès-verbal de soutenance de thèse, acte de naissance légalisé et preuve du financement (contrat ou attestation de bourse).",
          "- **Frais d'inscription annuels :**",
          "  - France : CVEC (environ 103 €) et droits nationaux (environ 391 € par an)",
          "  - Allemagne : pas de frais de scolarité, seulement la contribution semestrielle (*Semesterbeitrag*, de 150 € à 350 €)",
          "  - Belgique : minerval (environ 835 € la première année, puis environ 50 € par an)",
        ].join("\n"),
        estimatedDuration: "3 à 8 semaines",
        isRequired: true,
      },
      {
        order: 5,
        title: "Obtenir la convention d'accueil et le titre de séjour",
        description:
          "Doctorant financé, vous bénéficiez dans la plupart des pays européens du statut de chercheur, et non d'un simple visa étudiant. Il facilite les démarches consulaires, ouvre les droits sociaux complets et permet de venir en famille.",
        content: [
          "- **Le document clé, la convention d'accueil (*Hosting Agreement*, *Aufnahmevereinbarung*) :** établie par les ressources humaines de l'université ou de l'institut de recherche (INSERM, CNRS, Max Planck) dès la validation du financement, elle est indispensable pour la demande de visa.",
          "- **Le visa selon le pays :**",
          "  - France : VLS-TS **« Passeport talent – chercheur »**, demandé sur [France-Visas](https://france-visas.gouv.fr/)",
          "  - Allemagne : **visa de chercheur** (§ 18d AufenthG)",
          "  - Belgique : visa D avec **permis unique de chercheur** (ou visa étudiant pour une bourse exonérée d'impôts, comme celles de l'ARES)",
          "- **Pas de compte bloqué :** avec une convention d'accueil et un contrat doctoral ou une bourse officielle suffisante, vous n'avez pas à ouvrir de compte bancaire bloqué ni à fournir de garant financier.",
          "- **Avantage pour la famille :** le statut « Passeport talent – chercheur » (France) ou « chercheur § 18d » (Allemagne) permet à votre conjoint d'obtenir de plein droit un titre de séjour qui l'autorise à travailler dès son arrivée.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 6,
        title: "S'installer et démarrer la thèse",
        description:
          "L'arrivée dans le pays d'accueil lance à la fois votre contrat de travail au laboratoire et la validation définitive de votre titre de séjour pluriannuel.",
        content: [
          "- **Logement pour chercheurs :** avant le départ, sollicitez le centre de mobilité **Euraxess** de votre université pour accéder aux résidences réservées aux chercheurs internationaux (Cité internationale universitaire, *Gästehäuser* universitaires en Allemagne), sans garant local.",
          "- **Validation du titre de séjour à l'arrivée :** en France, validation sur le portail de l'[ANEF](https://administration-etrangers-en-france.interieur.gouv.fr/) dans les trois mois (taxe d'environ 225 €), pour obtenir ensuite une carte pluriannuelle couvrant la durée de la thèse. En Allemagne, déclaration de domicile à la mairie (*Anmeldung*) sous deux semaines, puis rendez-vous au service des étrangers (*Ausländerbehörde*).",
          "- **Démarches administratives et bancaires :** ouverture d'un compte bancaire local dès la première semaine pour le versement du salaire ou de la bourse, et signature du procès-verbal d'installation au laboratoire.",
          "- **Comité de suivi individuel (CSI, ou *TAC*) :** constitué dès les premiers mois, il réunit deux ou trois chercheurs extérieurs chaque année pour évaluer l'avancement des travaux et valider vos formations doctorales obligatoires (éthique scientifique, biostatistiques).",
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
        title: "Comprendre reconnaissance et enregistrement",
        description:
          "La MEBEKO (Commission des professions médicales de l'OFSP) gère les diplômes médicaux étrangers en Suisse. Pour un médecin titulaire d'un diplôme africain (hors UE et AELE), la démarche n'est pas une « reconnaissance directe » mais un enregistrement au registre des professions médicales (MedReg).",
        content: [
          "- **Pas de reconnaissance directe hors UE et AELE :** la Suisse ne reconnaît directement que les diplômes délivrés par un État de l'UE ou de l'AELE. Un diplôme obtenu en Afrique relève de la procédure d'enregistrement des diplômes non reconnaissables.",
          "- **Ce qu'apporte l'enregistrement MEBEKO (MedReg) :** il atteste officiellement l'authenticité de votre diplôme de médecin, vous attribue un numéro d'identification unique (**numéro GLN**) et inscrit vos compétences linguistiques au registre public fédéral.",
          "- **Travailler sous supervision :** cet enregistrement est exigé par les hôpitaux et les cantons pour vous autoriser à exercer comme **médecin assistant** (ou chef de clinique adjoint sous supervision) dans un établissement de formation reconnu par l'ISFM.",
          "- **Accéder au diplôme fédéral suisse :** une fois enregistré au MedReg, la MEBEKO fixe les conditions dans lesquelles vous pouvez présenter l'**examen fédéral de médecine humaine**, qui donne le diplôme fédéral de médecin à part entière.",
          "- **Spécialistes (DES) :** après l'enregistrement, c'est l'**ISFM (Institut suisse pour la formation médicale postgraduée et continue)** qui évalue vos années de spécialisation accomplies hors UE et peut accorder des équivalences partielles en vue du titre fédéral de spécialiste (FMH).",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 2,
        title: "Valider et inscrire ses connaissances linguistiques",
        description:
          "Aucun exercice médical en Suisse n'est possible sans l'inscription au registre MedReg d'au moins une langue nationale (français, allemand ou italien), au niveau B2 minimum.",
        content: [
          "- **Niveau exigé :** **B2 minimum** du CECR dans la langue de la région visée :",
          "  - français en Suisse romande (Genève, Vaud, Neuchâtel, Fribourg, Valais, Jura) ;",
          "  - allemand en Suisse alémanique ;",
          "  - italien au Tessin.",
          "- **Preuve par le cursus médical (astuce pour les médecins francophones) :** si toutes vos études de médecine se sont déroulées en français, la MEBEKO accepte une **attestation officielle de votre faculté de médecine** certifiant que l'intégralité du cursus et des examens s'est faite en français. Vous êtes alors dispensé de test de langue.",
          "- **Autres preuves acceptées :**",
          "  - un diplôme de langue international reconnu de moins de six ans : DELF B2, DALF C1 ou C2, TCF, TEF ; pour l'allemand, Goethe-Zertifikat B2 ou telc Deutsch B2-C1 Medizin ;",
          "  - ou trois ans d'exercice clinique dans la langue concernée au cours des dix dernières années.",
          "- **Coût :** émolument fédéral de **50 à 100 CHF** par langue inscrite au registre.",
        ].join("\n"),
        estimatedDuration: "2 à 8 semaines",
        isRequired: true,
      },
      {
        order: 3,
        title: "Constituer le dossier de demande MEBEKO",
        description:
          "La demande auprès de l'Office fédéral de la santé publique (OFSP, MEBEKO, à Berne) se fait par courrier. L'exigence documentaire est absolue : une simple photocopie non certifiée conforme bloque le traitement du dossier.",
        content: [
          "- **Formulaire officiel :** téléchargez, complétez et signez à la main le formulaire de demande pour un diplôme hors UE et AELE, sur la [page de l'OFSP consacrée aux diplômes d'États tiers](https://www.bag.admin.ch/fr/deposer-une-demande-de-reconnaissance-dun-diplome-de-profession-medicale-delivre-dans-un-etat-tiers-hors-de-lueaele).",
          "- **Pièces obligatoires :**",
          "  - le formulaire original signé ;",
          "  - une copie certifiée conforme du passeport en cours de validité ;",
          "  - une copie certifiée conforme, en original, du diplôme définitif de docteur en médecine ;",
          "  - le justificatif de langue B2, ou l'attestation de langue des études certifiée conforme ;",
          "  - un CV complet qui retrace tout le parcours, sans période inexpliquée.",
          "- **Règle d'or de la certification conforme :** vos copies doivent porter le tampon humide et la signature originale d'un notaire, d'une mairie, d'une chancellerie ou de l'ambassade de Suisse. N'envoyez jamais la photocopie d'un document déjà certifié.",
          "- **Traductions :** tout document ou cachet qui n'est pas en français, en allemand, en italien ou en anglais doit être accompagné d'une traduction originale par un traducteur assermenté.",
          "- **Adresse d'envoi (DHL, FedEx ou recommandé) :** *Office fédéral de la santé publique (OFSP), MEBEKO, section Formation, Schwarzenburgstrasse 157, CH-3003 Berne, Suisse*. Vérifiez l'adresse indiquée sur le formulaire avant l'envoi.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Obtenir son numéro GLN et l'inscription au MedReg",
        description:
          "À réception du dossier à Berne, la MEBEKO vérifie que les pièces sont conformes, émet la facture de l'émolument fédéral, puis vérifie l'authenticité de votre diplôme.",
        content: [
          "- **Paiement de l'émolument :** quelques semaines après réception du courrier, la MEBEKO vous envoie une facture de **800 à 1 000 CHF**. Le délai d'instruction ne commence qu'à réception de votre paiement.",
          "- **Délai d'instruction :** comptez **3 à 5 mois** en moyenne après le paiement pour la vérification du diplôme, souvent auprès de votre université ou par le répertoire mondial WDOMS et l'ECFMG.",
          "- **Inscription au MedReg et numéro GLN :** vous recevez une attestation officielle, et votre nom apparaît sur le [registre fédéral MedReg](https://www.bag.admin.ch/fr/registre-des-professions-medicales-medreg) avec votre **numéro GLN** à 13 chiffres et la langue enregistrée.",
          "- **Décision sur l'examen fédéral :** demandez en même temps à la MEBEKO la décision qui fixe vos conditions d'admission à l'examen fédéral de médecine humaine, pour préparer la suite de votre parcours en Suisse.",
        ].join("\n"),
        estimatedDuration: "3 à 5 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "Décrocher un poste de médecin assistant",
        description:
          "Avec l'enregistrement MEBEKO et le numéro GLN, votre candidature devient recevable par les hôpitaux universitaires (CHUV, HUG) et les hôpitaux cantonaux suisses.",
        content: [
          "- **Stratégies d'entrée pour un diplôme hors UE :**",
          "  - visez d'abord les hôpitaux cantonaux et régionaux en pénurie (Jura, Neuchâtel, Valais, Fribourg) ou les spécialités en tension (psychiatrie, gériatrie, réadaptation, médecine interne, radiologie avec un DES) ;",
          "  - ou un fellowship ou stage de perfectionnement universitaire de 6 à 12 mois aux HUG ou au CHUV.",
          "- **Calendrier de recrutement :** les chefs de service recrutent leurs médecins assistants **12 à 18 mois à l'avance**, avec des prises de poste principalement au **1er novembre** et au **1er mai**.",
          "- **Cibler les services formateurs :** postulez uniquement dans les services reconnus du [registre des établissements de formation de l'ISFM](https://register.siwf.ch) (catégories A, B ou C).",
          "- **Où trouver les offres :**",
          "  - [medjobs.ch](https://www.medjobs.ch/) et [fmhjob.ch](https://www.fmhjob.ch/) ;",
          "  - les pages emploi des hôpitaux : [HUG](https://www.hug.ch/emploi), [CHUV](https://www.chuv.ch/fr/chuv-home/emploi), [Hôpital du Valais](https://www.hopitalvs.ch/), [RHNe](https://www.rhne.ch/), [HFR Fribourg](https://www.h-fr.ch/).",
          "## Focus : dossier de candidature",
          "### Le CV médical au standard suisse (2 à 3 pages)",
          "- En Suisse, une photo professionnelle sobre est la norme.",
          "- Dès l'en-tête, en gras : **« Numéro GLN (MedReg) : 760100XXXXXXX, enregistré MEBEKO »**.",
          "- Détaillez votre parcours clinique au mois près : CHU, service, nom du chef de service, volume d'actes et de gardes.",
          "- Joignez un *logbook* chiffré des gestes techniques et des examens d'imagerie que vous maîtrisez en autonomie.",
          "- Terminez par une rubrique « Références » avec les coordonnées directes de deux ou trois professeurs.",
          "- Outil : [Canva](https://www.canva.com/).",
          "### La lettre de motivation (1 page)",
          "- Adressée directement au **médecin-chef du service** (« Monsieur le Professeur » ou « Madame la Médecin-cheffe »), et non aux ressources humaines.",
          "- Indiquez votre numéro GLN dès l'objet.",
          "- Mettez en avant votre autonomie clinique immédiate en garde (un atout majeur si vous avez déjà exercé ou si vous avez un DES) et votre projet d'intégrer la formation ISFM vers le titre FMH.",
          "### Les certificats de travail et les recommandations",
          "- Particularité suisse : tout employeur exige un certificat de travail détaillé (*Arbeitszeugnis*) pour chaque poste occupé.",
          "- Faites rédiger par vos chefs de service actuels des attestations sur papier à en-tête, avec vos dates exactes, la liste précise de vos responsabilités cliniques et une évaluation de votre rigueur.",
          "- Formule de conclusion attendue en Suisse : *« Le Dr [Nom] nous quitte libre de tout engagement et nous le recommandons chaleureusement à tout futur employeur hospitalier. »*",
        ].join("\n"),
        estimatedDuration: "2 à 6 mois",
        isRequired: true,
      },
      {
        order: 6,
        title: "Autorisation cantonale, permis de travail et examen fédéral",
        description:
          "Une fois le contrat signé avec l'hôpital, vous obtenez l'autorisation cantonale d'exercer sous supervision et votre permis de travail, tout en préparant l'examen fédéral qui donne l'équivalence complète.",
        content: [
          "- **Autorisation cantonale d'exercer sous supervision :** délivrée avant la prise de poste par le service de la santé publique (médecin cantonal) du canton de l'hôpital, sur présentation de l'enregistrement MEBEKO et du GLN, du contrat de travail sous supervision, d'un extrait de casier judiciaire vierge de moins de trois mois et d'un certificat médical.",
          "- **Permis de travail (L ou B) et visa D :** l'hôpital dépose la demande auprès des autorités cantonales de migration et du **SEM**. Une fois l'autorisation accordée, vous retirez votre **visa national D** à l'ambassade de Suisse, puis votre permis de séjour à votre arrivée dans le canton.",
          "- **Passer l'examen fédéral de médecine humaine :** pendant votre contrat de médecin assistant, inscrivez-vous à la session annuelle auprès de la MEBEKO, dans les délais publiés par l'OFSP. Selon la décision reçue (souvent après 36 mois d'activité clinique reconnue en Suisse), vous passez l'épreuve clinique pratique **ECOS (OSCE)**.",
          "- **Le diplôme fédéral de médecin :** la réussite à l'examen vous donne le diplôme suisse de médecin, lève les restrictions liées au diplôme hors UE et ouvre l'accès au titre fédéral de spécialiste **ISFM / FMH** et à la pratique indépendante (chef de clinique, cabinet privé).",
        ].join("\n"),
        estimatedDuration: "6 à 36 mois",
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
        title: "Choisir le pays et le cadre légal du stage",
        description:
          "Le stage d'observation (observership dans les pays anglo-saxons, Hospitation en Allemagne et en Suisse alémanique) permet d'intégrer un service hospitalier pendant deux semaines à trois mois, sans avoir encore obtenu l'équivalence de votre diplôme.",
        content: [
          "- **Règle juridique absolue, aucun geste sur le patient (*hands-off*) :** sans droit d'exercice local, vous ne pouvez ni toucher les patients, ni prescrire, ni réaliser d'actes invasifs. Vous participez en revanche aux visites, aux staffs et réunions de concertation pluridisciplinaire (RCP), à la lecture d'imagerie (PACS), au bloc opératoire en observateur et à la recherche.",
          "- **France et Belgique (1 à 3 mois) :** statut de « stagiaire observateur » ou de « médecin visiteur étranger » en CHU ou en centre hospitalier. C'est un bon tremplin vers un poste de stagiaire associé, un accueil en DFMS ou DFMSA, ou un poste après la réussite aux EVC.",
          "- **Allemagne et Suisse alémanique (*Hospitation*, 2 à 12 semaines) :** la voie royale du recrutement en Allemagne, accessible dès le niveau B1 ou B2 d'allemand. Une *Hospitation* réussie débouche très souvent sur une promesse d'embauche (*Stellenzusage*), qui permet de demander la *Berufserlaubnis* et le visa de travail.",
          "- **Royaume-Uni (*clinical attachment*, 4 à 12 semaines) :** immersion dans un hôpital du NHS pour maîtriser les protocoles britanniques, pendant ou après le PLAB ou l'UKMLA, avant de postuler à un premier poste de *clinical fellow*.",
          "- **États-Unis et Canada (*clinical observership*, environ 4 semaines) :** indispensable pour acquérir une expérience clinique américaine (*US clinical experience*, USCE) et obtenir des lettres de recommandation nord-américaines pour le Match après l'USMLE. Attention : ces programmes sont souvent payants (de 1 000 à 3 500 dollars).",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver un chef de service d'accueil",
        description:
          "Les stages d'observation ne sont presque jamais publiés. L'accueil repose sur une candidature spontanée adressée directement au chef de service (PU-PH en France, Chefarzt en Allemagne, consultant au Royaume-Uni, attending aux États-Unis).",
        content: [
          "- **Pourquoi les chefs de service acceptent facilement :** un médecin observateur ne coûte rien à l'hôpital, n'entre pas dans les quotas de postes et apporte une présence médicale motivée aux staffs.",
          "- **Où trouver les contacts des chefs de service :**",
          "  - France : annuaires des pôles des CHU et des sociétés savantes ;",
          "  - Allemagne : [Deutsches Krankenhausverzeichnis](https://www.deutsches-krankenhaus-verzeichnis.de/) et [Klinikradar](https://klinikradar.de/), en écrivant au secrétariat du chef de service (*Chefarztsekretariat*) ;",
          "  - Royaume-Uni : sites des *NHS Trusts*, rubrique *clinical attachments* ;",
          "  - États-Unis : [liste des observerships de l'AMA](https://www.ama-assn.org/education/international-medical-education/observership-program-listings-international-medical).",
          "- **Durée à demander :** un créneau précis de **4 à 8 semaines**, toujours inférieur à 90 jours, pour simplifier à la fois la convention avec l'hôpital et le visa de court séjour.",
          "## Focus : dossier de candidature",
          "### Le CV de médecin observateur (1 à 2 pages)",
          "- En en-tête : *« Candidature pour un stage d'observation non rémunéré du [date] au [date] »*.",
          "- Mettez en valeur votre diplôme (MD, DES), vos compétences diagnostiques et théoriques (lecture de scanner et d'IRM, protocoles cliniques, recherche) et votre niveau de langue certifié (français, anglais, allemand B2).",
          "- Précisez explicitement que votre financement et vos assurances sont entièrement à votre charge.",
          "- Outils : [Europass CV](https://europa.eu/europass/en/create-europass-cv) ou [FlowCV](https://flowcv.com/).",
          "### Le mail d'approche et la lettre de motivation",
          "- Le mail fait moins de 200 mots et rassure le chef de service sur trois points :",
          "  - une durée courte et précise (par exemple quatre semaines) ;",
          "  - un stage strictement d'observation et bénévole : aucun coût ni démarche complexe pour l'hôpital ;",
          "  - votre intérêt pour un équipement ou une surspécialité précise de son service.",
          "### La lettre de recommandation et l'autorisation d'absence",
          "- Joignez une lettre de votre chef de service ou de votre doyen actuel, qui atteste de votre éthique professionnelle et confirme qu'il vous accorde un congé officiel sur ces dates pour ce perfectionnement.",
          "- Cette pièce est aussi décisive pour le visa.",
        ].join("\n"),
        estimatedDuration: "3 à 8 semaines",
        isRequired: true,
      },
      {
        order: 3,
        title: "Valider la convention de stage avec l'hôpital",
        description:
          "Une fois l'accord écrit du chef de service obtenu, la direction des affaires médicales (DAM) ou les ressources humaines de l'hôpital établissent le document qui encadre votre présence dans le service.",
        content: [
          "- **France, convention d'accueil tripartite :** les CHU demandent généralement une convention signée par l'hôpital français, par vous-même et par votre établissement d'origine (CHU employeur ou faculté de médecine). Elle précise le statut de « médecin visiteur en stage d'observation, sans acte médical », pour moins de 90 jours.",
          "- **Allemagne, contrat et lettre d'invitation (*Hospitationsvertrag*, *Einladungsschreiben*) :** procédure rapide : les ressources humaines et le *Chefarzt* émettent une lettre d'invitation officielle et un contrat d'observation, sans signature de votre établissement d'origine.",
          "- **Royaume-Uni, contrat honoraire (*honorary observership contract*) :** le service *medical staffing* du NHS Trust l'établit après vérification de votre identité, de votre dossier médical et de votre casier judiciaire.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Réunir les assurances et le dossier médical",
        description:
          "Aucun hôpital n'ouvre ses services cliniques sans la preuve d'une assurance responsabilité civile et santé, et d'un dossier de médecine du travail complet.",
        content: [
          "- **Assurance responsabilité civile :** obligatoire pour couvrir tout dommage dans l'enceinte de l'hôpital. Souscrivez une assurance de mobilité internationale adaptée, par exemple [Chapka](https://www.chapkadirect.fr/), [ACS](https://www.acs-ami.com/) ou [Mawista](https://www.mawista.com/).",
          "- **Assurance santé et rapatriement (30 000 € minimum) :** exigée à la fois par l'hôpital et par le consulat pour le visa.",
          "- **Dossier médical et vaccinations :** un certificat médical et les preuves de vaccination :",
          "  - **hépatite B, avec un dosage des anticorps anti-HBs supérieur à 10 UI/L** ;",
          "  - dépistage de la tuberculose négatif (QuantiFERON, ou IDR et radiographie thoracique de moins de trois mois) ;",
          "  - DTP et ROR à jour.",
          "- **Extrait de casier judiciaire :** vierge, de moins de trois mois, traduit s'il n'est pas dans la langue du pays d'accueil.",
        ].join("\n"),
        estimatedDuration: "2 à 4 semaines",
        isRequired: true,
      },
      {
        order: 5,
        title: "Obtenir le visa de court séjour",
        description:
          "Pour un stage d'observation de moins de 90 jours, vous relevez d'un visa de court séjour. L'enjeu principal auprès du consulat est de démontrer vos ressources et la garantie de votre retour au pays à la fin du stage.",
        content: [
          "- **Le visa à demander (moins de 90 jours) :**",
          "  - espace Schengen (France, Allemagne, Belgique, Suisse) : **visa Schengen de type C**, motif professionnel ou stage d'observation médicale, sur [France-Visas](https://france-visas.gouv.fr/) ou [Videx](https://videx.diplo.de/) pour l'Allemagne ;",
          "  - Royaume-Uni : **Standard Visitor visa** (clinical attachment), sur [GOV.UK](https://www.gov.uk/standard-visitor/visit-as-an-academic-or-doctor) ;",
          "  - États-Unis : **visa B-1** (business visitor).",
          "- **Preuve d'accueil :** la convention de stage ou la lettre d'invitation signée par le chef de service et par l'administration de l'hôpital, qui précise que le stage est non rémunéré et sans acte clinique sur les patients.",
          "- **Garantir votre retour (contre un refus de visa) :** joignez impérativement votre contrat de travail ou votre arrêté de nomination, ainsi que **l'autorisation officielle d'absence ou de congé** signée par votre directeur d'hôpital, avec votre date de reprise.",
          "- **Ressources et hébergement :** relevés bancaires des trois à six derniers mois, bulletins de salaire couvrant le montant journalier exigé par le pays (de l'ordre de 65 à 120 € par jour de séjour), et réservation de logement ou attestation de chambre à l'internat de l'hôpital.",
        ].join("\n"),
        estimatedDuration: "3 à 8 semaines",
        isRequired: true,
      },
      {
        order: 6,
        title: "Réussir son immersion et la transformer en contrat",
        description:
          "Un stage d'observation est un entretien d'embauche de plusieurs semaines. L'objectif est d'en repartir avec des lettres de recommandation et, si possible, une promesse d'embauche.",
        content: [
          "- **Une attitude active dans le service :** soyez ponctuel dès le staff du matin, participez aux discussions diagnostiques, aux lectures sur console PACS (en imagerie) et aux RCP, tout en respectant strictement l'interdiction d'actes sur les patients.",
          "- **Participez à une publication :** proposez au chef de service ou à un chef de clinique d'aider à l'analyse de données ou à la rédaction d'un article ou d'un *case report* pendant votre séjour.",
          "- **Obtenez une lettre de recommandation (*letter of recommendation*, *Empfehlungsschreiben*) :** avant la dernière semaine, demandez une lettre détaillée sur papier à en-tête de l'hôpital, signée par le chef de service. C'est un atout décisif pour l'USMLE, le NHS, les EVC ou l'Allemagne.",
          "- **Préparez un futur contrat rémunéré :** lors de l'entretien de fin de stage avec le chef de service, présentez votre calendrier d'équivalence et demandez une **promesse d'embauche** : *Stellenzusage* en Allemagne pour la *Berufserlaubnis*, poste de stagiaire associé ou accueil en DFMS ou DFMSA en France.",
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
        title: "Identifier son cadre légal d'exercice comme FFI",
        description:
          "En France, un FFI (faisant fonction d'interne) est un médecin ou un interne étranger qui occupe un poste d'interne hospitalier rémunéré, à temps plein, avec participation aux gardes. Depuis les réformes du statut des PADHUE, ce poste doit s'inscrire dans l'un des trois cadres légaux autorisés.",
        content: [
          "- **Voie 1, le statut de stagiaire associé (le plus direct, sans concours) :** destiné aux médecins diplômés (MD, DES) ou aux internes, pour un perfectionnement pratique de **six mois, renouvelable une fois (douze mois au maximum)**. Il repose sur une convention de coopération internationale entre l'hôpital français et votre CHU ou votre faculté.",
          "- **Voie 2, le cursus DFMS ou DFMSA (voie universitaire) :** destiné aux internes en cours de spécialisation (DFMS, un à trois ans) ou aux médecins déjà spécialistes (DFMSA, six à douze mois), sur sélection annuelle coordonnée par l'université de Strasbourg. Voir la procédure « DFMS et DFMSA ».",
          "- **Voie 3, FFI inscrit à un DU ou DIU :** certains hôpitaux recrutent des FFI inscrits à un diplôme universitaire en France, mais la plupart des préfectures exigent désormais le cadre officiel de stagiaire associé pour délivrer le visa depuis l'étranger.",
          "- **Calendrier des semestres hospitaliers :**",
          "  - semestre d'hiver du **1er novembre au 30 avril**, recrutement de mars à juillet ;",
          "  - semestre d'été du **1er mai au 31 octobre**, recrutement de septembre à janvier.",
          "- **Rémunération et avantages :** salaire de base d'environ **1 800 à 2 100 € brut par mois**, augmenté par les gardes de nuit et de week-end (soit environ **2 200 à 3 000 € net par mois** au total), souvent avec un logement à l'internat de l'hôpital.",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 2,
        title: "Décrocher un poste dans un service agréé",
        description:
          "Chaque semestre, de nombreux postes d'internes restent vacants après le choix des internes français. Les chefs de service recherchent alors des FFI opérationnels tout de suite pour assurer l'activité clinique et les gardes.",
        content: [
          "- **Cibler les centres hospitaliers généraux et périphériques :** situés à une ou deux heures des grandes villes, ils ont des postes vacants, une direction des affaires médicales (DAM) réactive et proposent souvent un logement gratuit à l'internat.",
          "- **Spécialités qui recrutent le plus de FFI :** médecine d'urgence, gériatrie, médecine interne et polyvalente, psychiatrie, pédiatrie, réanimation, gynécologie-obstétrique et **radiologie** (très forte demande pour les profils qui maîtrisent l'échographie et le scanner d'urgence).",
          "- **Vérifier l'agrément du service :** demandez à la DAM si le service dispose bien de l'agrément de l'agence régionale de santé (ARS) pour accueillir des internes ou des stagiaires associés.",
          "- **Où trouver les postes :**",
          "  - [FHF Emploi](https://emploi.fhf.fr/), en cherchant « FFI » ou « stagiaire associé » ;",
          "  - [Profil Médecin](https://www.profilmedecin.fr/) et [Annonce Médicale](https://www.annoncemedicale.com/) ;",
          "  - les candidatures spontanées, adressées à la fois au chef de service et à la DAM.",
          "## Focus : dossier de candidature",
          "### Le CV de FFI ou de stagiaire associé (1 à 2 pages)",
          "- En en-tête, votre disponibilité exacte : semestre de mai ou de novembre.",
          "- Un encadré **« Compétences techniques et autonomie en garde »** : par exemple en radiologie, scanner corps entier en urgence, IRM neurologique et AVC, échographie Doppler ; en clinique, gestes d'urgence, lecture d'ECG, ponctions, réanimation.",
          "- En bas de page : votre CHU ou votre faculté est prêt à signer immédiatement la convention de coopération internationale.",
          "- Outils : [Europass CV](https://europa.eu/europass/en/create-europass-cv) ou les [modèles de CV de médecin de Canva](https://www.canva.com/fr_fr/cv/modeles/medecin/).",
          "### La lettre de motivation (1 page)",
          "- Adressée à la fois au **chef de service** et à la **direction des affaires médicales (DAM)**.",
          "- Mettez en avant votre maturité clinique : médecin déjà thésé ou spécialiste, capable de prendre des gardes dès le premier mois.",
          "- Rassurez l'administration sur la rapidité de signature de la convention par votre établissement d'origine.",
          "### Les lettres de recommandation (2)",
          "- Une lettre de votre professeur ou chef de service qui atteste de votre fiabilité en garde et de vos compétences diagnostiques.",
          "- Une recommandation d'un médecin qui exerce ou a exercé dans un CHU français (adresse e-mail hospitalière française ou numéro RPPS) est un accélérateur décisif.",
        ].join("\n"),
        estimatedDuration: "1 à 3 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Établir la convention d'accueil ou de coopération",
        description:
          "Dès que le chef de service valide votre recrutement, la direction des affaires médicales (DAM) de l'hôpital français prépare les conventions qui encadrent votre accueil.",
        content: [
          "- **L'accord-cadre de coopération internationale :** signé par le directeur de l'hôpital public français et par le directeur général de votre CHU ou le doyen de votre faculté de médecine.",
          "- **La convention individuelle de stagiaire associé (modèle annexé à l'arrêté du 16 mai 2011) :** signée par le directeur de l'hôpital français, le chef de service d'accueil, le représentant de votre établissement d'origine et vous-même.",
          "- **Mentions obligatoires :** les dates exactes du semestre (six mois), la rémunération brute mensuelle, l'assurance responsabilité civile prise en charge par l'hôpital français et les conditions de logement.",
          "- **Accélérer les signatures :** imprimez les conventions dès réception, faites-les signer et cacheter en personne par votre doyen ou votre directeur de CHU, puis renvoyez les originaux en France par courrier express (DHL, FedEx).",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 4,
        title: "Faire viser la convention par l'administration",
        description:
          "Le consulat de France ne délivre le visa que si votre convention a d'abord été validée par l'administration française compétente (DREETS ou préfecture).",
        content: [
          "- **Dépôt par l'hôpital :** c'est la DAM de l'hôpital d'accueil qui transmet votre dossier à la DREETS (service de la main-d'œuvre étrangère) ou à la préfecture du département.",
          "- **Pièces à fournir à la DAM :**",
          "  - les conventions signées ;",
          "  - une copie du passeport ;",
          "  - le diplôme de docteur en médecine (et le DES) ;",
          "  - une attestation de l'ordre des médecins de votre pays (*certificate of good standing*) ;",
          "  - un engagement écrit de retour au pays à la fin du stage ;",
          "  - les avis favorables du chef de service et du président de la commission médicale d'établissement (CME).",
          "- **Délai :** comptez **trois à six semaines**. Relancez régulièrement votre interlocuteur à la DAM jusqu'au retour de la convention validée.",
          "- **Envoi de l'original :** une fois la convention validée, l'hôpital vous envoie l'original par courrier express pour votre rendez-vous au consulat.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 5,
        title: "Obtenir le visa long séjour « stagiaire »",
        description:
          "Muni de l'original de votre convention validée, vous demandez au consulat de France un visa de long séjour valant titre de séjour (VLS-TS).",
        content: [
          "- **Demande en ligne sur France-Visas :** remplissez votre demande sur [France-Visas](https://france-visas.gouv.fr/) avec le motif de stage correspondant à votre statut de stagiaire associé, pour obtenir un VLS-TS « stagiaire » (ou le motif propre au DFMS et au DFMSA si vous avez été sélectionné par l'université de Strasbourg).",
          "- **Pas de compte bloqué :** la rémunération inscrite dans votre convention (1 800 à 2 100 € brut par mois) suffit comme preuve de ressources.",
          "- **Justificatif de logement :** l'attestation d'hébergement à l'internat fournie par la DAM, ou un bail ou une réservation pour votre arrivée.",
          "- **Dossier complet au centre de visas (TLS, VFS ou Capago) :** l'original de la convention validée, vos diplômes de médecine originaux, un extrait de casier judiciaire vierge de moins de trois mois et l'autorisation de congé ou de mise en disponibilité de votre employeur.",
        ].join("\n"),
        estimatedDuration: "3 à 6 semaines",
        isRequired: true,
      },
      {
        order: 6,
        title: "S'installer et prendre ses fonctions",
        description:
          "Arriver en France une semaine avant le 1er mai ou le 1er novembre permet de terminer les démarches administratives et médicales indispensables avant votre première garde.",
        content: [
          "- **Validation obligatoire du VLS-TS :** dans les trois mois qui suivent votre arrivée, validez votre visa en ligne sur le portail de l'[ANEF](https://administration-etrangers-en-france.interieur.gouv.fr/) et payez la taxe correspondante.",
          "- **Visite à la médecine du travail :** obligatoire dès la première semaine. Présentez votre carnet de vaccination avec un **dosage des anticorps anti-HBs supérieur à 10 UI/L** (hépatite B), le DTP à jour et le dépistage de la tuberculose.",
          "- **Compte bancaire et paie :** ouvrez un compte bancaire français dès les premiers jours avec votre attestation de logement à l'internat, et remettez votre RIB à la DAM avant le 10 du mois pour toucher votre premier salaire sans décalage.",
          "- **La suite du parcours, renouvellement et EVC :** pour prolonger votre stage d'un second semestre, la DAM doit saisir l'administration **deux à trois mois avant l'échéance**. Profitez aussi de votre présence à l'hôpital pour préparer les **épreuves de vérification des connaissances (EVC)** de la procédure d'autorisation d'exercice, qui ouvrent ensuite le statut de praticien associé.",
        ].join("\n"),
        estimatedDuration: "2 à 4 semaines",
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
        title: "Comprendre le cadre réglementaire",
        description:
          "Le statut de stagiaire associé, encadré par l'arrêté du 16 mai 2011, permet à un médecin diplômé hors Union européenne d'exercer des fonctions cliniques rémunérées dans un établissement public de santé, dans le cadre d'un projet de perfectionnement pratique.",
        content: [
          "- **Objectif du statut :** un perfectionnement clinique sous supervision dans un hôpital public ou un CHU français. Il ne vaut pas équivalence définitive du diplôme.",
          "- **Durée :** désignation pour **six mois, renouvelable une fois**, soit douze mois par convention. Au total, plusieurs conventions successives ne peuvent pas dépasser deux ans.",
          "- **Condition indispensable :** une convention de coopération internationale, existante ou créée pour l'occasion, entre l'hôpital français d'accueil et votre établissement ou votre faculté d'origine.",
          "- **Responsabilité médicale :** vous exercez sous la responsabilité directe d'un médecin senior référent de l'équipe, avec une rémunération prévue par la convention.",
          "- **Texte de référence :** [arrêté du 16 mai 2011 relatif aux stagiaires associés](https://affairesjuridiques.aphp.fr/textes/arrete-du-16-mai-2011-relatif-aux-stagiaires-associes-mentionnes-au-1-de-larticle-r-6134-2-du-code-de-la-sante-publique/), qui contient aussi le modèle de convention.",
        ].join("\n"),
        estimatedDuration: "1 semaine",
        isRequired: true,
      },
      {
        order: 2,
        title: "Trouver l'hôpital d'accueil et signer la convention",
        description:
          "La procédure commence par l'accord d'un chef de service hospitalier français, puis la validation administrative de la direction des affaires médicales (DAM).",
        content: [
          "- **Cibler les services agréés :** le service d'accueil doit être agréé pour la formation ou habilité à accueillir des praticiens associés. Les hôpitaux périphériques ont souvent des délais plus courts que les grands CHU.",
          "- **La convention individuelle :** la DAM rédige la convention de stage (sur le modèle annexé à l'arrêté du 16 mai 2011), signée par l'hôpital français, le chef de service, votre établissement d'origine et vous-même.",
          "- **Validation par l'administration :** l'hôpital transmet le dossier aux services de l'État (DREETS, main-d'œuvre étrangère, ou préfecture) pour validation, indispensable avant toute demande de visa.",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois",
        isRequired: true,
      },
      {
        order: 3,
        title: "Constituer le dossier et obtenir le visa long séjour",
        description:
          "Avec la convention validée par l'administration française, vous déposez votre demande de visa auprès du centre de visas de votre pays de résidence.",
        content: [
          "- **Demande sur France-Visas :** sur le portail [France-Visas](https://france-visas.gouv.fr/), choisissez le motif de stage correspondant au statut de stagiaire associé, pour obtenir un **VLS-TS « stagiaire »**.",
          "- **Pièces principales :**",
          "  - l'original de la convention individuelle validée ;",
          "  - vos diplômes originaux de médecine et de spécialité ;",
          "  - une attestation de l'ordre des médecins de votre pays (*certificate of good standing*) ;",
          "  - la preuve de ressources : la rémunération prévue par la convention suffit.",
          "- **Hébergement :** joignez l'attestation de logement ou de chambre à l'internat de l'hôpital.",
        ].join("\n"),
        estimatedDuration: "3 à 6 semaines",
        isRequired: true,
      },
      {
        order: 4,
        title: "Régulariser son séjour et passer la médecine du travail",
        description:
          "Votre arrivée en France ouvre la prise de fonctions, après quelques formalités obligatoires.",
        content: [
          "- **Validation du VLS-TS :** dans les trois mois suivant votre arrivée, validez votre visa sur le portail de l'[ANEF](https://administration-etrangers-en-france.interieur.gouv.fr/) et payez la taxe correspondante.",
          "- **Ordre des médecins :** renseignez-vous auprès de la DAM sur les formalités prévues auprès du conseil départemental de l'ordre des médecins pour votre situation.",
          "- **Visite d'aptitude :** visite obligatoire à la médecine du travail de l'hôpital, avec un carnet de vaccination à jour et un **dosage des anticorps anti-HBs supérieur à 10 UI/L** pour l'hépatite B.",
        ].join("\n"),
        estimatedDuration: "2 à 3 semaines",
        isRequired: true,
      },
      {
        order: 5,
        title: "Exercer : rémunération, gardes et formation",
        description:
          "Intégré à l'équipe médicale, vous participez aux activités cliniques et à la permanence des soins pendant toute la durée du stage.",
        content: [
          "- **Rémunération :** versée chaque mois selon la convention, de l'ordre de **1 800 à 2 300 € brut par mois** de base.",
          "- **Gardes :** participation aux gardes de nuit et de week-end, qui donnent droit à des indemnités en plus du salaire.",
          "- **Supervision et formation :** activités sous la responsabilité du médecin senior référent, avec accès aux formations, séminaires et réunions de concertation de l'hôpital.",
        ].join("\n"),
        estimatedDuration: "6 à 12 mois",
        isRequired: true,
      },
      {
        order: 6,
        title: "Renouveler le stage et préparer la suite",
        description:
          "À l'approche de la fin du premier semestre, anticipez le renouvellement ou préparez le passage vers un autre statut.",
        content: [
          "- **Renouvellement :** si le chef de service souhaite vous garder, la DAM saisit l'administration **deux mois avant la fin** du semestre.",
          "- **Préparer la sortie du statut :** le stage étant limité dans le temps, profitez-en pour préparer les **épreuves de vérification des connaissances (EVC)** de la procédure d'autorisation d'exercice, qui ouvrent un poste durable de praticien associé, ou pour candidater au **DFMS ou au DFMSA** (voir la procédure « DFMS et DFMSA »).",
        ].join("\n"),
        estimatedDuration: "1 à 2 mois avant l'échéance",
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
