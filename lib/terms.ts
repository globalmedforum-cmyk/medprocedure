// Conditions générales d'utilisation. Changer TERMS_VERSION redemande
// l'acceptation à tous les utilisateurs à leur prochaine visite.
export const TERMS_VERSION = "2026-10-13";
export const TERMS_VERSION_LABEL = "13 octobre 2026";

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
        intro: "Dans les Conditions, les termes suivants ont le sens ci-après :",
        items: [
          "« Éditeur » désigne l'exploitant du Site, opérant sous la dénomination MedProcedure ;",
          "« Site » désigne le site internet accessible à l'adresse medprocedure.org ;",
          "« Utilisateur » désigne toute personne physique qui crée un compte sur le Site ou en utilise les services ;",
          "« Service » désigne l'ensemble des contenus et prestations proposés par l'Éditeur, comprenant les Guides, les Opportunités et l'Assistance ;",
          "« Guides » désigne les contenus d'information décrivant, étape par étape, des démarches administratives, universitaires ou hospitalières ;",
          "« Opportunités » désigne les offres de poste, de stage, de formation, de thèse ou de congrès référencées sur le Site ;",
          "« Assistance » désigne l'accompagnement individuel fourni par l'équipe de l'Éditeur à la demande de l'Utilisateur ;",
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
      "Le prix versé rémunère la prestation d'accompagnement réalisée par l'Éditeur, indépendamment de la décision rendue par les Organismes tiers.",
      "Sauf stipulation écrite contraire, les frais dus aux Organismes tiers ou à des prestataires extérieurs, notamment les frais de visa, émoluments, droits d'inscription et frais de traduction, ne sont pas compris dans les prix de l'Éditeur et demeurent à la charge de l'Utilisateur.",
    ],
  },
  {
    title: "Données personnelles",
    clauses: [
      "L'Éditeur conserve l'adresse électronique de l'Utilisateur, son nom, l'état d'avancement de ses démarches sur le Site ainsi que la date et la version des Conditions acceptées. Aucun document personnel de l'Utilisateur n'est stocké sur le Site.",
      "Les échanges par courrier électronique ou par messagerie instantanée entre l'Utilisateur et l'équipe de l'Éditeur interviennent en dehors du Site, au moyen de services tiers.",
      "L'Utilisateur peut demander l'accès à ses données, leur rectification ou leur suppression en écrivant à l'Éditeur à l'adresse indiquée à l'article « Contact ».",
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
