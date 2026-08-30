import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seed de la base de données...");

  // Nettoyage préalable des tables
  await prisma.userProcedureProgress.deleteMany();
  await prisma.step.deleteMany();
  await prisma.procedure.deleteMany();
  await prisma.opportunity.deleteMany();
  await prisma.user.deleteMany();

  // 1. Procédure MEBEKO Suisse
  const mebeko = await prisma.procedure.create({
    data: {
      slug: "mebeko-suisse",
      title: "Reconnaissance de diplôme MEBEKO (Suisse)",
      description:
        "Procédure officielle d'obtention de la reconnaissance fédérale de votre diplôme de médecin auprès de la Commission des professions médicales (MEBEKO) pour exercer en Suisse.",
      country: "Suisse",
      category: "Reconnaissance de diplôme",
      steps: {
        create: [
          {
            order: 1,
            title: "Vérification de l'éligibilité et du niveau linguistique",
            description:
              "Attestation du niveau B2/C1 minimum en français ou en allemand certifié par un organisme accrédité (Goethe, DELF/DALF).",
            estimatedDuration: "2 semaines",
            isRequired: true,
            content:
              "Assurez-vous que votre diplôme de base est conforme aux critères de la directive européenne 2005/36/CE ou soumis aux accords bilatéraux.",
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
              "Le secrétariat MEBEKO peut demander des compléments d'informations pendant la phase d'instruction.",
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
      },
    },
  });

  // 2. Procédure FFI France
  const ffi = await prisma.procedure.create({
    data: {
      slug: "ffi-france",
      title: "Faisant Fonction d'Interne (FFI - France)",
      description:
        "Guide complet des démarches pour occuper un poste de FFI au sein des centres hospitaliers universitaires et généraux en France.",
      country: "France",
      category: "Mobilité Hospitalière",
      steps: {
        create: [
          {
            order: 1,
            title: "Vérification des prérequis et des conventions",
            description:
              "Contrôle du niveau de formation médicale et préparation du CV médical au format européen standard.",
            estimatedDuration: "1 semaine",
            isRequired: true,
            content:
              "Le statut FFI est ouvert aux praticiens ayant validé leur formation médicale fondamentale et inscrits dans une démarche de spécialisation.",
          },
          {
            order: 2,
            title: "Candidature auprès des chefs de service hospitaliers",
            description:
              "Prise de contact ciblée avec les chefs de service lors des périodes de choix de stage (semestres de mai et novembre).",
            estimatedDuration: "3 à 6 semaines",
            isRequired: true,
            content:
              "Envoyez un dossier complet : lettre de motivation, CV détaillé, lettres de recommandation et projet professionnel.",
          },
          {
            order: 3,
            title: "Validation de la convention d'accueil par la Direction Hospitalière",
            description:
              "Établissement du contrat de travail et approbation par la Commission Médicale d'Établissement (CME) et l'Agence Régionale de Santé (ARS).",
            estimatedDuration: "3 semaines",
            isRequired: true,
            content:
              "La convention d'accueil permet d'initier la demande de visa et de titre de séjour pour exercice hospitalier.",
          },
          {
            order: 4,
            title: "Formalités administratives de séjour et visa professionnel",
            description:
              "Dépôt de la demande de visa 'Passeport Talent' ou 'Stagiaire' auprès du consulat de France.",
            estimatedDuration: "4 semaines",
            isRequired: true,
            content:
              "Munissez-vous de votre convention d'accueil tamponnée par la préfecture et de l'attestation de prise en charge financière de l'hôpital.",
          },
          {
            order: 5,
            title: "Prise de fonction et intégration dans l'équipe médicale",
            description:
              "Signature définitive du contrat, visite médicale d'embauche et intégration dans le planning des gardes et astreintes.",
            estimatedDuration: "1 semaine",
            isRequired: true,
            content:
              "Félicitations, vous démarrez votre semestre d'internat en France.",
          },
        ],
      },
    },
  });

  // 3. Procédure Stage d'Observation
  const stage = await prisma.procedure.create({
    data: {
      slug: "stage-observation",
      title: "Stage d'Observation Clinique en Milieu Hospitalier",
      description:
        "Organisation d'un stage d'immersion clinique au sein d'un service de pointe européen pour découvrir les pratiques et enrichir son réseau médical.",
      country: "Europe",
      category: "Stage Clinique",
      steps: {
        create: [
          {
            order: 1,
            title: "Sélection du service et du maître de stage",
            description:
              "Identification des pôles d'excellence correspondant à votre sous-spécialité médicale ou chirurgicale.",
            estimatedDuration: "2 semaines",
            isRequired: true,
            content:
              "Sélectionnez 3 à 5 hôpitaux universitaires cibles en Suisse, France ou Belgique.",
          },
          {
            order: 2,
            title: "Signature de la convention tripartite de stage",
            description:
              "Validation administrative entre l'établissement d'origine, le centre hospitalier d'accueil et le praticien.",
            estimatedDuration: "3 semaines",
            isRequired: true,
            content:
              "La convention précise les conditions d'assurance responsabilité civile professionnelle et les objectifs pédagogiques du stage.",
          },
          {
            order: 3,
            title: "Immersion clinique et attestation de validation de stage",
            description:
              "Participation aux staffs, visites de service et délivrance du certificat officiel de stage d'observation.",
            estimatedDuration: "1 à 3 mois",
            isRequired: true,
            content:
              "Ce stage constitue un atout déterminant pour vos futures candidatures à des postes de praticien ou de FFI.",
          },
        ],
      },
    },
  });

  // 4. Opportunités médicales
  await prisma.opportunity.createMany({
    data: [
      {
        title: "Médecin Assistant en Médecine Interne",
        hospital: "Hôpitaux Universitaires de Genève (HUG)",
        location: "Genève",
        country: "Suisse",
        specialty: "Médecine Interne",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // +60 jours
        requirements: [
          "Diplôme fédéral de médecin ou équivalence MEBEKO",
          "Maîtrise du français niveau C1",
          "Motivation pour la recherche clinique et le travail en équipe pluridisciplinaire",
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
          "Expérience en bloc opératoire et gestion des urgences traumatologiques",
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
          "Intérêt pour l'imagerie intravasculaire et la recherche translationnelle",
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
          "Diplôme de docteur en médecine avec spécialisation en anesthésie-réanimation",
          "Aptitude à la prise en charge des urgences vitales et réanimation chirurgicale",
          "Dossier complet éligible à la procédure d'autorisation d'exercice (PAE)",
        ],
        contactEmail: "recrutement.anesthesie@aphp.fr",
      },
    ],
  });

  console.log("✅ Seed terminé avec succès !");
  console.log(`- Procédures créées : ${mebeko.title}, ${ffi.title}, ${stage.title}`);
}

main()
  .catch((e) => {
    console.error("❌ Erreur pendant l'exécution du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
