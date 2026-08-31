export interface TradeTemplateItem {
  desc: string;
  qty: number;
  price: number;
}

export interface TradeTemplate {
  slug: string;
  tradeName: string;
  headline: string;
  metaTitle: string;
  metaDescription: string;
  legalMentions: string[];
  taxRate: number;
  currency: string;
  defaultItems: TradeTemplateItem[];
  commonMistakes: string[];
  tradeFaq: { question: string; answer: string }[];
}

export const tradeTemplates: Record<string, TradeTemplate> = {
  "btp": {
    slug: "btp",
    tradeName: "BTP & Travaux de Construction",
    headline: "Modèle de Facture BTP & Travaux au Maroc (Conforme DGI)",
    metaTitle: "Modèle Facture BTP Maroc Gratuit (Excel, PDF, Word) - Conforme DGI",
    metaDescription: "Téléchargez un modèle de facture BTP et travaux conforme aux règles fiscales marocaines. Gestion des retenues de garantie, situations de travaux et ICE.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "Mention obligatoire du numéro d'ICE de l'entreprise et du maître d'ouvrage",
      "Mention de la retenue de garantie (généralement 5% ou 10% selon le marché)",
      "Référence obligatoire au Marché ou Bon de Commande (BC) et Bon de Livraison (BL)",
      "Taux de TVA standard à 20% applicable aux travaux de construction et d'aménagement"
    ],
    defaultItems: [
      { desc: "Gros œuvre : Coulage béton armé dalle R+1 (m³)", qty: 25, price: 1200 },
      { desc: "Fourniture et pose de carrelage grès cérame 60x60 (m²)", qty: 80, price: 180 },
      { desc: "Travaux d'enduit extérieur monocouche (m²)", qty: 150, price: 75 }
    ],
    commonMistakes: [
      "Oubli de déduire la retenue de garantie de 5% sur le total TTC de la situation",
      "Absence de signature conjointe du maître d'œuvre sur le métré contradictoire",
      "Non-mention du numéro de marché public ou privé sur l'en-tête de facture"
    ],
    tradeFaq: [
      {
        question: "Comment gérer la retenue de garantie sur une facture BTP au Maroc ?",
        answer: "La retenue de garantie (souvent 5%) est déduite du montant TTC à payer sur chaque situation intermédiaire. Elle n'est libérée qu'après la réception définitive des travaux (généralement un an après la réception provisoire)."
      },
      {
        question: "Quel est le taux de TVA applicable pour les travaux de construction ?",
        answer: "Le taux standard au Maroc est de 20%. Pour certains programmes sociaux agréés par l'État, des exonérations avec droit à déduction peuvent s'appliquer sous conditions strictes de la DGI."
      }
    ]
  },
  "transport": {
    slug: "transport",
    tradeName: "Transport & Logistique",
    headline: "Modèle de Facture Transport & Fret Routier au Maroc",
    metaTitle: "Modèle Facture Transport Maroc (TVA 14%) - Gratuit & Conforme",
    metaDescription: "Modèle de facture pour transporteurs et transitaires au Maroc. Application du taux spécifique de TVA à 14% et mentions obligatoires lettre de voiture.",
    taxRate: 14,
    currency: "DH",
    legalMentions: [
      "Taux de TVA spécifique de 14% applicable aux opérations de transport de voyageurs et de marchandises",
      "Mention du numéro de la Lettre de Voiture (CMR) ou Bon de Chargement",
      "Matricule du véhicule / remorque et itinéraire effectué",
      "ICE obligatoire du donneur d'ordre pour la déductibilité de la TVA"
    ],
    defaultItems: [
      { desc: "Transport de marchandises Casablanca -> Tanger Med (Semi-remorque)", qty: 2, price: 4200 },
      { desc: "Frais de déchargement et manutention quai", qty: 1, price: 650 },
      { desc: "Frais de passage et péage autoroutier", qty: 1, price: 380 }
    ],
    commonMistakes: [
      "Appliquer une TVA à 20% au lieu du taux légal obligatoire de 14% pour le transport",
      "Oublier de joindre la lettre de voiture émargée par le destinataire final",
      "Omettre l'adresse exacte de départ et de destination"
    ],
    tradeFaq: [
      {
        question: "Quel est le taux de TVA exact pour le transport au Maroc ?",
        answer: "En vertu de l'article 89 du Code Général des Impôts marocain, les opérations de transport de marchandises et de personnes sont soumises au taux réduit de TVA de 14%."
      },
      {
        question: "Les frais annexes (manutention, stockage) ont-ils le même taux de TVA ?",
        answer: "Les prestations de pure manutention ou de stockage isolées sont en général taxées au taux standard de 20%, sauf si elles font partie intégrante du contrat de transport principal."
      }
    ]
  },
  "agence-digitale": {
    slug: "agence-digitale",
    tradeName: "Agence Web, Marketing & Freelance Tech",
    headline: "Modèle de Facture Agence Web, Développement & Freelance",
    metaTitle: "Modèle Facture Agence Digitale & Freelance Maroc - Conforme DGI",
    metaDescription: "Modèle de facture pour développeurs web, agences de communication et consultants tech au Maroc. Facturation d'acomptes, jalons et prestations de services.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "Facturation avec mention des jalons du devis (Acompte, Livraison V1, Solde)",
      "TVA au taux normal de 20% pour les prestations de services informatiques",
      "Mention des conditions de propriété intellectuelle après règlement complet",
      "ICE et identifiant fiscal du client professionnel"
    ],
    defaultItems: [
      { desc: "Développement application web sur mesure (Jalon 1 - 40%)", qty: 1, price: 18000 },
      { desc: "Refonte identité visuelle & charte graphique complète", qty: 1, price: 6500 },
      { desc: "Hébergement Cloud haute disponibilité & Maintenance annuelle", qty: 1, price: 3600 }
    ],
    commonMistakes: [
      "Livrer le code source ou les accès administrateur avant la facturation du solde",
      "Oublier de faire valider un bon de recette / procès-verbal de livraison",
      "Ne pas préciser les délais et modalités de support après livraison"
    ],
    tradeFaq: [
      {
        question: "Comment facturer un client étranger depuis le Maroc ?",
        answer: "Les prestations de services informatiques exportées à l'étranger bénéficient de l'exonération de TVA avec droit à déduction (TVA 0%), sous réserve de justifier le rapatriement des devises auprès de l'Office des Changes."
      },
      {
        question: "Quel acompte demander pour un projet de développement web ?",
        answer: "La pratique standard au Maroc est d'exiger un acompte de 30% à 50% à la signature du devis avant tout commencement des travaux."
      }
    ]
  },
  "artisan": {
    slug: "artisan",
    tradeName: "Artisans, Menuisiers & Électriciens",
    headline: "Modèle de Facture Artisan & Métiers de Main au Maroc",
    metaTitle: "Modèle Facture Artisan Maroc (Auto-entrepreneur & SARL) - Gratuit",
    metaDescription: "Créez facilement une facture pour artisan au Maroc (plombier, menuisier, électricien). Mentions obligatoires auto-entrepreneur et TVA.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "Pour les auto-entrepreneurs : mention 'Exonéré de TVA en vertu de l'article 91 du CGI'",
      "Pour les SARL d'artisanat : TVA à 20% sur la main-d'œuvre et le matériel",
      "Détail clair entre le coût des fournitures et le coût de la main d'œuvre",
      "Garantie légale d'installation et conformité des matériaux"
    ],
    defaultItems: [
      { desc: "Fourniture et pose tableau électrique triphasé complet", qty: 1, price: 3400 },
      { desc: "Main d'œuvre tirage de câbles & raccordement prises (Jours)", qty: 3, price: 600 },
      { desc: "Fourniture luminaires LED encastrés", qty: 12, price: 120 }
    ],
    commonMistakes: [
      "Facturer de la TVA alors que vous avez le statut d'auto-entrepreneur",
      "Ne pas faire signer un bon de fin de travaux à la réception du chantier",
      "Mélanger les fournitures achetées et le tarif horaire de prestation"
    ],
    tradeFaq: [
      {
        question: "Un auto-entrepreneur artisan peut-il facturer une SARL ?",
        answer: "Oui, un auto-entrepreneur peut tout à fait facturer une société. La facture doit comporter le numéro d'auto-entrepreneur, l'ICE et la mention légale d'exonération de TVA."
      },
      {
        question: "Quelle est la limite de chiffre d'affaires pour un artisan auto-entrepreneur ?",
        answer: "Le plafond annuel est de 500 000 DH pour les activités commerciales et industrielles, et de 200 000 DH pour les prestations de services."
      }
    ]
  },
  "commerce-gros": {
    slug: "commerce-gros",
    tradeName: "Commerce de Gros & Distribution",
    headline: "Modèle de Facture Commerce de Gros & Négoce au Maroc",
    metaTitle: "Modèle Facture Commerce de Gros Maroc (ICE, BL, Remises) - Gratuit",
    metaDescription: "Modèle de facture pour grossistes et distributeurs au Maroc. Gestion des remises par volume, bons de livraison et conformité DGI.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "ICE obligatoire du client pour justifier la déductibilité fiscale de l'achat",
      "Référence expresse aux numéros des Bons de Livraison (BL) rattachés",
      "Indication détaillée des remises commerciales et escomptes appliqués",
      "Conditions de règlement (Chèque, Virement, Traite/LCR à 60 ou 90 jours)"
    ],
    defaultItems: [
      { desc: "Carton Huile de Tournesol 5L (Lot de 10 cartons)", qty: 50, price: 320 },
      { desc: "Sac Farine Industrielle 50kg qualité supérieure", qty: 100, price: 210 },
      { desc: "Conditionnement Sucre Granulé 25kg", qty: 40, price: 175 }
    ],
    commonMistakes: [
      "Émettre une facture globale sans lister les bons de livraison correspondants",
      "Accepter des règlements en espèces supérieurs à 5 000 DH (seuil de déductibilité DGI)",
      "Ne pas enregistrer l'ICE du commerçant détaillant"
    ],
    tradeFaq: [
      {
        question: "Quel est le plafond légal pour les paiements en espèces au Maroc ?",
        answer: "Selon l'article 193 du CGI, les factures payées en espèces au-delà de 5 000 DH TTC ne sont pas déductibles fiscalement et la TVA correspondante n'est pas récupérable par le client."
      },
      {
        question: "Faut-il obligatoirement joindre le Bon de Livraison à la facture ?",
        answer: "Oui, en cas de contrôle fiscal, l'administration fiscale exige le rapprochement strict entre la facture et le bon de livraison émargé attestant de la réalité du flux physique."
      }
    ]
  },
  "consultant": {
    slug: "consultant",
    tradeName: "Consultants, Formateurs & Cabinets de Conseil",
    headline: "Modèle de Facture Consultant & Expertise au Maroc",
    metaTitle: "Modèle Facture Consultant & Conseil Maroc (Retenue DGI) - Gratuit",
    metaDescription: "Modèle de facture pour consultants indépendants et cabinets au Maroc. Gestion des honoraires, taux journalier moyen (TJM) et TVA.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "Taux de TVA à 20% sur les prestations intellectuelles et honoraires de conseil",
      "Détail du nombre de jours / TJM ou forfait contractuel",
      "Mention de la retenue à la source le cas échéant (personne physique non patentée)",
      "Identifiants fiscaux complets (ICE, IF, RC, Patente)"
    ],
    defaultItems: [
      { desc: "Audit organisationnel et financier stratégique (Jours)", qty: 5, price: 4500 },
      { desc: "Animation atelier de formation management d'équipe (Journée)", qty: 2, price: 6000 },
      { desc: "Rapport de recommandations stratégiques & feuille de route", qty: 1, price: 7500 }
    ],
    commonMistakes: [
      "Ne pas préciser le périmètre exact de la mission dans la description",
      "Oublier de facturer les frais de déplacement ou de séjour refacturables",
      "Négliger la date de début et de fin de la prestation"
    ],
    tradeFaq: [
      {
        question: "Comment calculer son Taux Journalier Moyen (TJM) au Maroc ?",
        answer: "Le TJM se calcule en divisant le revenu net cible annuel (majoré de 40% pour couvrir les charges, impôts IS/IR et périodes creuses) par le nombre estimé de jours facturables (environ 180 à 200 jours par an)."
      },
      {
        question: "Les formations professionnelles sont-elles soumises à la TVA ?",
        answer: "Oui, les prestations de formation continue animées par des cabinets privés sont soumises au taux standard de TVA de 20% au Maroc."
      }
    ]
  }
};
