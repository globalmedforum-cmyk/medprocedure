// Conditions générales d'utilisation. Changer TERMS_VERSION redemande
// l'acceptation à tous les utilisateurs à leur prochaine visite.
export const TERMS_VERSION = "2026-10-31";
export const TERMS_VERSION_LABEL = "31 octobre 2026";

// Une clause est un paragraphe, ou une phrase d'introduction suivie d'une
// énumération (a), (b), (c)…
export type TermsClause = string | { intro: string; items: string[] };

export interface TermsArticle {
  title: string;
  clauses: TermsClause[];
}

export const termsPreamble =
  "Les présentes conditions générales d'utilisation (ci-après les « Conditions ») régissent l'accès au site medprocedure.org et l'utilisation des services qui y sont proposés. Toute utilisation du Service suppose leur acceptation préalable et sans réserve.";

export const termsArticles: TermsArticle[] = [
  {
    title: "Objet",
    clauses: [
      "Les Conditions ont pour objet de définir les modalités selon lesquelles l'Éditeur met le Service à la disposition de l'Utilisateur, ainsi que les droits et obligations de chacun.",
    ],
  },
  {
    title: "Définitions",
    clauses: [
      {
        intro:
          "Dans les Conditions, les termes suivants ont le sens ci-après :",
        items: [
          "« Éditeur » désigne l'exploitant du Site, opérant sous la dénomination MedProcedure ;",
          "« Site » désigne le site internet accessible à l'adresse medprocedure.org ;",
          "« Utilisateur » désigne toute personne physique qui crée un compte sur le Site ou en utilise les services ;",
          "« Service » désigne l'ensemble des contenus et prestations proposés par l'Éditeur, comprenant les Guides, les Opportunités et l'Assistance ;",
          "« Guides » désigne les contenus d'information décrivant, étape par étape, des démarches administratives, universitaires ou hospitalières ;",
          "« Opportunités » désigne les offres de poste, de stage, de formation, de thèse ou de congrès référencées sur le Site ;",
          "« Assistance » désigne l'accompagnement individuel fourni par l'équipe de l'Éditeur à la demande de l'Utilisateur, notamment dans le cadre des Formules ;",
          "« Formules » désigne les formules d'accompagnement payantes « Stage d'observation en Europe », « Enregistrement MEBEKO » et « Poste de médecin assistant », dont le contenu et le prix sont présentés à l'Utilisateur avant tout paiement ;",
          "« Plateforme de suivi » désigne l'espace sécurisé, distinct du Site, réservé aux Utilisateurs ayant souscrit une Formule, au moyen duquel l'Utilisateur et l'équipe de l'Éditeur échangent messages et documents et suivent l'avancement du dossier ;",
          "« Documents » désigne les pièces que l'Utilisateur transmet à l'Éditeur pour la constitution de son dossier, telles que passeport, diplômes, relevés de notes, curriculum vitae, lettres, attestations, certificats médicaux ou extraits de casier judiciaire ;",
          "« Organismes tiers » désigne les administrations, représentations consulaires, universités, établissements de santé et, plus généralement, toute autorité ou tout établissement appelé à statuer sur une demande de l'Utilisateur.",
        ],
      },
    ],
  },
  {
    title: "Acceptation et opposabilité",
    clauses: [
      "L'accès à l'espace personnel du Site est subordonné à l'acceptation expresse des Conditions par l'Utilisateur, matérialisée par une case à cocher lors de sa première connexion.",
      "La date d'acceptation et la version acceptée sont enregistrées par l'Éditeur et font foi entre les parties.",
      "L'Utilisateur qui n'accepte pas les Conditions doit s'abstenir d'utiliser le Service.",
    ],
  },
  {
    title: "Description du Service",
    clauses: [
      "Le Service est un service d'information et d'accompagnement destiné aux médecins diplômés à l'étranger qui souhaitent exercer ou se former en Europe.",
      "L'Éditeur est un prestataire indépendant. Il n'est ni une administration, ni une représentation consulaire, ni un établissement de santé, ni un cabinet d'avocats, et n'agit au nom ou pour le compte d'aucun Organisme tiers.",
      "Les Guides et les réponses apportées dans le cadre de l'Assistance constituent des informations de portée générale. Ils ne constituent pas une consultation juridique et ne sauraient se substituer aux textes en vigueur ni aux informations délivrées par les Organismes tiers.",
    ],
  },
  {
    title: "Engagements de l'Éditeur",
    clauses: [
      "L'Éditeur est tenu, pour l'exécution du Service, d'une obligation de moyens.",
      {
        intro: "À ce titre, l'Éditeur s'engage à :",
        items: [
          "établir les Guides à partir des sources officielles disponibles à la date de leur rédaction et à mentionner ces sources ;",
          "corriger dans les meilleurs délais toute erreur portée à sa connaissance ;",
          "ne référencer que des Opportunités ayant fait l'objet d'une vérification par son équipe à la date de leur publication, et à retirer celles dont la date limite est échue ;",
          "communiquer à l'Utilisateur le prix et le contenu de toute prestation payante préalablement à tout paiement ;",
          "apporter à l'Assistance le soin et la diligence attendus d'un professionnel, et à signaler à l'Utilisateur les difficultés qu'il identifie dans son dossier ;",
          "préserver la confidentialité des informations et documents communiqués par l'Utilisateur, et à ne les utiliser que pour les besoins de son dossier.",
        ],
      },
    ],
  },
  {
    title: "Absence de garantie de résultat",
    clauses: [
      "Les décisions relatives aux demandes de l'Utilisateur relèvent de la compétence exclusive des Organismes tiers. L'Éditeur n'est tenu à aucune obligation de résultat.",
      {
        intro: "En conséquence, l'Éditeur ne garantit pas :",
        items: [
          "la délivrance d'un visa, d'un titre de séjour ou d'une autorisation de travail ;",
          "la reconnaissance ou l'enregistrement d'un diplôme, ni la délivrance d'une autorisation d'exercer ;",
          "l'admission de l'Utilisateur à une formation, à un doctorat, à un stage ou à un congrès ;",
          "l'obtention d'un poste, d'un entretien ou d'une réponse de la part d'un établissement ;",
          "les délais d'instruction pratiqués par les Organismes tiers ;",
          "le maintien d'une Opportunité à la date à laquelle l'Utilisateur présente sa candidature ;",
          "l'exactitude, à la date de la démarche de l'Utilisateur, des règles, montants, délais et calendriers mentionnés sur le Site, ceux-ci étant susceptibles d'être modifiés sans préavis par les Organismes tiers ;",
          "la disponibilité continue et sans erreur du Site.",
        ],
      },
      "Seuls les textes en vigueur et les informations publiées par les Organismes tiers font foi. Il appartient à l'Utilisateur de les consulter avant toute décision ou dépense.",
      "Aucun membre de l'équipe de l'Éditeur n'est habilité à promettre l'issue d'une démarche. Toute déclaration en ce sens est dépourvue d'effet.",
    ],
  },
  {
    title: "Obligations de l'Utilisateur",
    clauses: [
      {
        intro: "L'Utilisateur s'engage à :",
        items: [
          "fournir des informations exactes, complètes et à jour ;",
          "ne transmettre que des documents authentiques, l'Éditeur se réservant le droit de refuser ou d'interrompre toute prestation en présence d'un document falsifié ou d'une fausse déclaration ;",
          "vérifier auprès des Organismes tiers les informations déterminantes pour sa démarche ;",
          "utiliser le Service à des fins strictement personnelles ;",
          "préserver la confidentialité de ses identifiants de connexion.",
        ],
      },
    ],
  },
  {
    title: "Prestations payantes",
    clauses: [
      "La consultation des Guides est libre. L'Assistance et l'accès au détail de certaines Opportunités constituent des prestations payantes.",
      "Le prix, le contenu de la prestation et les conditions de remboursement sont communiqués à l'Utilisateur avant tout paiement. Aucun paiement n'est effectué sur le Site.",
      "Le prix d'une Formule est celui présenté sur le Site à la date de la souscription, sauf prix différent convenu par écrit entre l'Éditeur et l'Utilisateur avant le début de l'Assistance. Il peut être réglé en une ou plusieurs fois selon les modalités convenues ; l'Assistance peut être suspendue tant qu'une échéance convenue n'est pas réglée.",
      "Le prix versé rémunère la prestation d'accompagnement réalisée par l'Éditeur, indépendamment de la décision rendue par les Organismes tiers.",
      "Sauf stipulation écrite contraire, les frais dus aux Organismes tiers ou à des prestataires extérieurs, notamment les frais de visa, émoluments, droits d'inscription et frais de traduction, ne sont pas compris dans les prix de l'Éditeur et demeurent à la charge de l'Utilisateur.",
    ],
  },
  {
    title: "Remboursement",
    clauses: [
      "Les sommes versées rémunèrent un travail d'accompagnement réalisé pour l'essentiel dès le début de l'Assistance, notamment l'analyse du dossier, la relecture des Documents et les conseils de l'équipe. Elles ne sont pas remboursables, sous réserve de la garantie prévue au présent article.",
      "Lorsque la loi applicable reconnaît à l'Utilisateur un délai de rétractation, l'Utilisateur qui demande expressément le commencement de l'Assistance avant l'expiration de ce délai reconnaît que les prestations exécutées à la date de sa rétractation restent dues.",
      {
        intro:
          "L'Éditeur garantit le remboursement d'une partie des sommes effectivement versées au titre d'une Formule, dans les cas suivants :",
        items: [
          "Stage d'observation en Europe : soixante-dix pour cent (70 %), lorsqu'aucune convention de stage d'observation n'a été signée par un établissement d'accueil dans un délai de six (6) mois à compter du début de l'Assistance ;",
          "Enregistrement MEBEKO : soixante-dix pour cent (70 %), lorsque l'enregistrement du diplôme a été refusé par une décision écrite de l'autorité compétente ;",
          "Poste de médecin assistant : soixante-quinze pour cent (75 %), lorsqu'aucun contrat de travail de médecin assistant n'a été obtenu dans un délai de douze (12) mois à compter du début de l'Assistance.",
        ],
      },
      "Cette garantie s'applique sur simple demande écrite de l'Utilisateur adressée à l'Éditeur à l'adresse indiquée à l'article « Contact », accompagnée, pour la Formule « Enregistrement MEBEKO », de la décision de refus. Elle n'est soumise à aucune autre condition.",
      "Seule exception : la garantie ne s'applique pas lorsque l'Utilisateur a transmis un Document falsifié ou fait une fausse déclaration.",
      "Le remboursement est effectué dans un délai de trente (30) jours suivant la réception de la demande, par le moyen de paiement utilisé lors du règlement lorsque cela est possible, déduction faite des frais de transfert. Les frais dus aux Organismes tiers ou à des prestataires extérieurs ne sont jamais remboursés par l'Éditeur.",
    ],
  },
  {
    title: "Données personnelles",
    clauses: [
      "L'Éditeur conserve, sur le Site, l'adresse électronique de l'Utilisateur, son nom, l'état d'avancement de ses démarches ainsi que la date et la version des Conditions acceptées. Aucun Document n'est stocké sur le Site.",
      "Lorsque l'Utilisateur souscrit une Formule, l'Éditeur traite en outre, sur la Plateforme de suivi, les Documents qu'il transmet, les messages échangés avec l'équipe, la liste des pièces de son dossier et l'historique de ses paiements.",
      "Ces données sont traitées dans le seul but de préparer, de vérifier et de suivre le dossier de l'Utilisateur, en exécution du contrat qui le lie à l'Éditeur. Elles ne sont ni vendues, ni cédées, ni utilisées à des fins publicitaires.",
      "Seuls l'Utilisateur et les membres habilités de l'équipe de l'Éditeur ont accès aux Documents. Ceux-ci ne sont jamais rendus publics et ne sont transmis à un Organisme tiers qu'à la demande de l'Utilisateur ou avec son accord.",
      "Les données sont hébergées par des prestataires techniques choisis par l'Éditeur, qui agissent sur ses instructions et sont tenus à la confidentialité. Elles peuvent à ce titre être hébergées hors du pays de résidence de l'Utilisateur.",
      "L'Éditeur met en œuvre des mesures raisonnables pour protéger les données, notamment l'accès par identifiants personnels et le contrôle de l'accès à chaque Document. L'Utilisateur ne transmet que les Documents nécessaires à son dossier et peut demander à tout moment la suppression d'un Document qui n'est plus utile.",
      "Les Documents et les messages sont supprimés au plus tard douze (12) mois après la fin de l'Assistance, sauf demande contraire de l'Utilisateur. Les informations relatives aux paiements sont conservées pendant la durée imposée par les obligations comptables et fiscales de l'Éditeur.",
      "L'Utilisateur dispose d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de ses données, ainsi que du droit de s'opposer à leur traitement. Il exerce ces droits en écrivant à l'Éditeur à l'adresse indiquée à l'article « Contact ». Il peut également introduire une réclamation auprès de l'autorité de protection des données compétente.",
    ],
  },
  {
    title: "Propriété intellectuelle",
    clauses: [
      "Les contenus du Site, notamment les Guides, sont la propriété de l'Éditeur. Toute reproduction, diffusion ou revente, totale ou partielle, sans son autorisation écrite préalable est interdite.",
    ],
  },
  {
    title: "Responsabilité",
    clauses: [
      "L'Utilisateur demeure seul responsable de ses démarches, des documents qu'il dépose et des décisions qu'il prend.",
      "La responsabilité de l'Éditeur ne saurait être engagée du fait d'un refus, d'un retard ou de toute décision d'un Organisme tiers, ni du fait d'une information devenue inexacte à la suite d'une évolution de la réglementation ou de la pratique d'un Organisme tiers.",
    ],
  },
  {
    title: "Modification des Conditions",
    clauses: [
      "L'Éditeur peut modifier les Conditions à tout moment. La version modifiée est présentée à l'Utilisateur lors de sa connexion suivante, et son acceptation conditionne la poursuite de l'utilisation du Service.",
    ],
  },
];
