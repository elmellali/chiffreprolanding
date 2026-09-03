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
  },
  "cabinet-medical": {
    slug: "cabinet-medical",
    tradeName: "Médecins, Dentistes & Cabinets Médicaux",
    headline: "Modèle de Note d'Honoraires & Facture Médicale au Maroc",
    metaTitle: "Modèle Facture Médicale & Note d'Honoraires Maroc (Exonéré TVA)",
    metaDescription: "Modèle de note d'honoraires pour médecins, cliniques et dentistes au Maroc. Mention obligatoire d'exonération de TVA (Article 91 CGI).",
    taxRate: 0,
    currency: "DH",
    legalMentions: [
      "Exonération de TVA sans droit à déduction en vertu de l'article 91-I du Code Général des Impôts (prestations de santé)",
      "Numéro d'inscription à l'Ordre National des Médecins ou Dentistes",
      "Identifiant Fiscal (IF) et Taxe Professionnelle (Patente)",
      "Mention des actes médicaux codifiés CNSS / AMO"
    ],
    defaultItems: [
      { desc: "Consultation médicale spécialisée & examen clinique", qty: 1, price: 400 },
      { desc: "Échographie de contrôle doppler haute résolution", qty: 1, price: 600 },
      { desc: "Bilan médical de synthèse & prescription", qty: 1, price: 200 }
    ],
    commonMistakes: [
      "Appliquer de la TVA sur des actes de soins médicaux (les soins sont exonérés)",
      "Oublier d'indiquer l'Identifiant Fiscal sur la note d'honoraires transmise aux mutuelles",
      "Ne pas délivrer de reçu détaillé exigé pour les remboursements AMO / CNOPS"
    ],
    tradeFaq: [
      {
        question: "Les médecins doivent-ils facturer la TVA au Maroc ?",
        answer: "Non, les actes de diagnostic, de traitement et de soins dispensés par les professionnels de santé sont exonérés de TVA conformément à l'article 91 du CGI marocain."
      },
      {
        question: "Quelle est la différence entre une note d'honoraires et une facture ?",
        answer: "Pour les professions libérales de santé, la note d'honoraires fait office de facture légale justificative pour le patient et sa mutuelle."
      }
    ]
  },
  "avocat-juridique": {
    slug: "avocat-juridique",
    tradeName: "Avocats, Notaires & Conseillers Juridiques",
    headline: "Modèle de Facture d'Honoraires Avocat & Notaire au Maroc",
    metaTitle: "Modèle Facture Avocat & Notaire Maroc (TVA 10% / 20%) - Gratuit",
    metaDescription: "Modèle de facture d'honoraires juridiques pour avocats et notaires au Maroc. Application du taux de TVA légal et retenue à la source.",
    taxRate: 10,
    currency: "DH",
    legalMentions: [
      "Taux de TVA à 10% sur les prestations des avocats et interprètes agréés (art. 99 CGI)",
      "Numéro d'inscription au Barreau ou à l'Ordre des Notaires",
      "Mention expresse du numéro de dossier ou de l'affaire judiciaire",
      "Détail des débours et droits de timbre avancés pour le compte du client"
    ],
    defaultItems: [
      { desc: "Honoraires de consultation juridique et rédaction de statuts SARL", qty: 1, price: 8500 },
      { desc: "Assistance et représentation devant le Tribunal de Commerce", qty: 1, price: 12000 },
      { desc: "Débours : Droits d'enregistrement et taxe judiciaire (remboursables)", qty: 1, price: 2150 }
    ],
    commonMistakes: [
      "Facturer de la TVA sur les débours payés à l'État (les débours ne sont pas taxables)",
      "Appliquer un taux de TVA erroné sans vérifier le barème en vigueur",
      "Ne pas distinguer les honoraires de conseil de la provision pour frais de justice"
    ],
    tradeFaq: [
      {
        question: "Les débours doivent-ils être soumis à la TVA ?",
        answer: "Non, les débours engagés au nom et pour le compte du client (frais d'enregistrement, timbres, taxes de greffe) sont facturés à l'euro/dirham près sans TVA."
      },
      {
        question: "Quel est le taux de TVA applicable pour les avocats au Maroc ?",
        answer: "Le taux de TVA applicable aux honoraires des avocats inscrits au barreau est de 10% selon le Code Général des Impôts."
      }
    ]
  },
  "restauration-traiteur": {
    slug: "restauration-traiteur",
    tradeName: "Restauration, Cafés & Traiteurs",
    headline: "Modèle de Facture Restauration & Traiteur au Maroc",
    metaTitle: "Modèle Facture Restaurant & Traiteur Maroc (TVA 10%) - Gratuit",
    metaDescription: "Modèle de facture pour traiteurs, restaurants et organisateurs de réceptions au Maroc. Taux de TVA à 10% et mentions légales conformes.",
    taxRate: 10,
    currency: "DH",
    legalMentions: [
      "Taux de TVA à 10% applicable aux prestations de restauration et fourniture de repas",
      "Mention détaillée du nombre de couverts ou forfaits banquet",
      "ICE obligatoire pour les réceptions d'entreprises (séminaires, comités d'entreprise)",
      "Conditions d'acompte à la réservation et solde le jour de l'événement"
    ],
    defaultItems: [
      { desc: "Prestation Traiteur Buffet Déjeuner d'affaires (Couverts)", qty: 60, price: 220 },
      { desc: "Pause-café d'accueil : viennoiseries marocaines & jus frais", qty: 60, price: 45 },
      { desc: "Service en salle & maîtres d'hôtel dédiés (Forfait)", qty: 4, price: 600 }
    ],
    commonMistakes: [
      "Facturer la location de matériel ou salle à 10% au lieu de 20%",
      "Oublier de ventiler les prestations de bouche (10%) et les autres services (20%)",
      "Ne pas faire signer le bon de commande de réception"
    ],
    tradeFaq: [
      {
        question: "Quel est le taux de TVA pour un service traiteur d'entreprise ?",
        answer: "La fourniture de nourriture et boissons préparées est soumise au taux de TVA réduit de 10% au Maroc."
      },
      {
        question: "La facture de restaurant est-elle déductible pour une société ?",
        answer: "Oui, les frais de repas d'affaires sont déductibles si la facture comporte l'ICE de la société cliente et correspond à un motif professionnel légitime."
      }
    ]
  },
  "auto-entrepreneur": {
    slug: "auto-entrepreneur",
    tradeName: "Auto-Entrepreneurs & Indépendants",
    headline: "Modèle de Facture Auto-Entrepreneur Maroc (100% Conforme)",
    metaTitle: "Modèle Facture Auto-Entrepreneur Maroc Gratuit (Exonération TVA)",
    metaDescription: "Modèle de facture officiel pour auto-entrepreneurs au Maroc. Mention légale obligatoire d'exonération de TVA (Article 91 CGI) et ICE.",
    taxRate: 0,
    currency: "DH",
    legalMentions: [
      "Mention légale obligatoire : 'Franchise en base de TVA - Exonéré en vertu de l'article 91 du CGI'",
      "Numéro de la Carte Nationale d'Auto-Entrepreneur (RNAE)",
      "Numéro d'Identifiant Commun de l'Entreprise (ICE)",
      "Montant total net à payer en Dirhams (MAD) sans aucune TVA"
    ],
    defaultItems: [
      { desc: "Prestation de création de contenu & gestion réseaux sociaux (Mois)", qty: 1, price: 3500 },
      { desc: "Conception graphique supports marketing & bannières", qty: 5, price: 400 },
      { desc: "Rédaction d'articles optimisés SEO pour site web (Pack 10)", qty: 1, price: 2500 }
    ],
    commonMistakes: [
      "Faire figurer une ligne de TVA (l'auto-entrepreneur n'a pas le droit de facturer la TVA)",
      "Oublier la mention légale d'exonération obligatoire (risque de rejet par le client SARL)",
      "Dépasser le plafond annuel de chiffre d'affaires autorisé par l'État"
    ],
    tradeFaq: [
      {
        question: "Une entreprise peut-elle refuser une facture d'auto-entrepreneur ?",
        answer: "Non, la facture est 100% légale et comptabilisable si elle comporte le numéro d'auto-entrepreneur, l'ICE et la mention d'exonération de TVA."
      },
      {
        question: "Quel est le seuil de chiffre d'affaires pour les auto-entrepreneurs en 2026 ?",
        answer: "500 000 DH/an pour le commerce et l'industrie, et 200 000 DH/an pour les prestations de services."
      }
    ]
  },
  "import-export-portnet": {
    slug: "import-export-portnet",
    tradeName: "Importateurs, Exportateurs & Transitaires",
    headline: "Modèle de Facture Export & Commerce International Maroc",
    metaTitle: "Modèle Facture Export Maroc (PortNet, Devises, TVA 0%) - Conforme",
    metaDescription: "Modèle de facture export pour entreprises marocaines. Conformité PortNet, facturation en devises étrangères (EUR/USD) et TVA 0% (Article 89 CGI).",
    taxRate: 0,
    currency: "EUR",
    legalMentions: [
      "Mention obligatoire : 'Opération d'exportation de biens/services - Exonérée de TVA avec droit à déduction (Art. 89-I CGI)'",
      "Mention du titre d'exportation (Engagement de change / Déclaration Unique de Marchandises DUM)",
      "Indication de la devise de transaction (EUR, USD, MAD) et conditions Incoterms (FOB, CIF, DAP)",
      "Compte bancaire professionnel marocain pour le rapatriement des devises"
    ],
    defaultItems: [
      { desc: "Export Huile d'Argan Cosmétique Bio Pure 100ml (Lot de 500 unités)", qty: 500, price: 8.50 },
      { desc: "Conditionnement spécifique export & étiquetage multilingue", qty: 1, price: 450.00 },
      { desc: "Fret maritime FOB Casablanca Port", qty: 1, price: 800.00 }
    ],
    commonMistakes: [
      "Facturer de la TVA marocaine à un client étranger à l'export",
      "Omettre la référence DUM / PortNet exigée par l'Office des Changes",
      "Ne pas conserver le justificatif bancaire de rapatriement des devises"
    ],
    tradeFaq: [
      {
        question: "L'exportation est-elle exonérée de TVA au Maroc ?",
        answer: "Oui, les ventes de produits et services consommés hors du territoire marocain sont exonérées de TVA au taux de 0% avec droit à déduction de la TVA d'amont."
      },
      {
        question: "Quel est le délai pour rapatrier les devises au Maroc ?",
        answer: "Selon la réglementation de l'Office des Changes, le produit des exportations de biens doit être rapatrié dans un délai maximum de 150 jours à compter de la date d'expédition."
      }
    ]
  },
  "location-voitures": {
    slug: "location-voitures",
    tradeName: "Agences de Location de Voitures (Rent a Car)",
    headline: "Modèle de Facture Location de Véhicules au Maroc",
    metaTitle: "Modèle Facture Location Voiture Maroc (TVA 20% & Caution) - Gratuit",
    metaDescription: "Modèle de facture pour agences de location de voitures au Maroc. Gestion des contrats, franchises d'assurance, cautions et TVA à 20%.",
    taxRate: 20,
    currency: "DH",
    legalMentions: [
      "Taux de TVA standard à 20% sur les locations de véhicules sans chauffeur",
      "Mention du contrat de location, numéro de matricule et dates de début/fin",
      "Numéro d'agrément du Ministère du Transport (autorisation d'exploitation)",
      "Détail clair entre le prix de location et les franchises/assurances complémentaires"
    ],
    defaultItems: [
      { desc: "Location Véhicule Citadin Automatique (Durée 7 jours)", qty: 7, price: 350 },
      { desc: "Option Assurance Tous Risques sans franchise (Pack Sérénité)", qty: 7, price: 80 },
      { desc: "Option Siège Bébé & Kilométrage Illimité", qty: 1, price: 150 }
    ],
    commonMistakes: [
      "Confondre la caution (dépôt de garantie non taxable) et le montant de la prestation facturée",
      "Ne pas faire contresigner la fiche d'état des lieux de départ et retour",
      "Omettre le numéro d'agrément transport sur la facture"
    ],
    tradeFaq: [
      {
        question: "La caution encaissée temporairement est-elle soumise à la TVA ?",
        answer: "Non, la caution est un dépôt de garantie non assujetti à la TVA. Seules les sommes conservées pour dédommagement de sinistre ou franchise peuvent être régularisées."
      },
      {
        question: "Quel est le taux de TVA pour une location avec chauffeur ?",
        answer: "La location avec chauffeur est assimilée à une prestation de transport soumise au taux réduit de 14% sous conditions d'agrément."
      }
    ]
  }
};
