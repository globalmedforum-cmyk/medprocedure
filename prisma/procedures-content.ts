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
