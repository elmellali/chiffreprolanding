import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Book, FileText, Settings, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock database for the guide articles
export const articlesContent: Record<string, any> = {
  "1": {
    category: 'getting-started',
    title: 'Installation et première configuration',
    content: `
      <h2>Bienvenue sur Chiffre Pro</h2>
      <p>L'installation de Chiffre Pro est conçue pour être aussi simple que possible. Suivez ces étapes pour commencer à utiliser votre ERP local.</p>
      
      <h3>1. Téléchargement de l'exécutable</h3>
      <p>Assurez-vous d'avoir téléchargé la dernière version de l'installateur (<code>ChiffrePro_Setup.exe</code>) depuis le portail officiel.</p>
      
      <img src="/assets/setup_wizard.png" class="rounded-2xl border border-slate-200 shadow-xl my-8 w-full object-cover" alt="Assistant d'installation Chiffre Pro" />
      
      <h3>2. Processus d'installation</h3>
      <p>Double-cliquez sur le fichier téléchargé. L'assistant d'installation vous guidera. Le logiciel installera automatiquement les dépendances requises, y compris le moteur de base de données SQLite local.</p>
      
      <h3>3. Activation de la licence</h3>
      <p>Au premier lancement, un écran d'activation apparaîtra. Entrez votre clé de licence à 9 chiffres fournie lors de l'achat. Cette clé liera Chiffre Pro à l'identifiant matériel de votre machine (Machine ID).</p>
      
      <img src="/assets/license_activation.png" class="rounded-2xl border border-slate-200 shadow-xl my-8 max-w-lg mx-auto object-cover" alt="Activation de la licence" />
      
      <div class="bg-accent/10 p-4 rounded-xl border border-accent/20 my-6">
        <strong>Important :</strong> Si vous changez d'ordinateur, vous devrez contacter le support pour réinitialiser l'association de votre licence.
      </div>
      
      <h3>4. Profil de l'entreprise</h3>
      <p>Allez dans les <strong>Paramètres</strong> pour remplir les informations de votre entreprise : Logo, SIRET, ICE, et l'adresse. Ces informations apparaîtront automatiquement sur tous vos documents générés.</p>
    `
  },
  "2": {
    category: 'getting-started',
    title: 'Créer votre première fiche client',
    content: `
      <h2>Gérer vos contacts efficacement</h2>
      <p>La création d'une fiche client complète vous fera gagner un temps précieux lors de la rédaction de vos devis et factures.</p>
      
      <h3>Étape 1 : Accéder au module CRM</h3>
      <p>Cliquez sur l'onglet <strong>Clients</strong> dans le menu de navigation gauche, puis sur le bouton "Nouveau Client".</p>
      
      <h3>Étape 2 : Informations Générales</h3>
      <p>Choisissez d'abord si le client est une <strong>Entreprise</strong> (B2B) ou un <strong>Particulier</strong> (B2C). Remplissez le nom de la société, le contact principal et les coordonnées.</p>
      
      <h3>Étape 3 : Adresses multiples</h3>
      <p>Vous pouvez ajouter plusieurs adresses à un même client (ex: une adresse de facturation à Casablanca, et une adresse de livraison à Rabat). C'est très utile pour l'édition des Bons de Livraison.</p>
      
      <h3>Étape 4 : Suivi financier</h3>
      <p>Une fois le client créé, sa fiche affichera automatiquement son historique financier : montant total facturé, montant payé et reste à charge (solde dû).</p>
    `
  },
  "3": {
    category: 'billing',
    title: 'Convertir un devis en facture',
    content: `
      <h2>Le flux de facturation automatisé</h2>
      <p>Dans Chiffre Pro, vous n'avez pas besoin de ressaisir les informations lorsqu'un devis est accepté par votre client.</p>
      
      <h3>1. Trouver le devis</h3>
      <p>Allez dans <strong>Ventes > Devis</strong>. Sélectionnez le devis qui vient d'être approuvé.</p>
      
      <h3>2. Marquer comme "Accepté"</h3>
      <p>Changez le statut du devis de "Envoyé" à "Accepté". Cela indique au système que l'affaire est conclue.</p>
      
      <img src="/assets/chiffrepro-invoice.png" class="rounded-2xl border border-slate-200 shadow-xl my-8 w-full object-cover" alt="Conversion devis en facture" />
      
      <h3>3. Conversion en 1 clic</h3>
      <p>Cliquez sur le bouton <strong>Convertir en Facture</strong>. Une nouvelle fenêtre de facture s'ouvrira, reprenant l'intégralité du client, des articles, des remises et des taxes du devis. Vous pouvez encore la modifier avant de l'enregistrer.</p>
      
      <p>Le devis d'origine gardera une trace de la facture liée pour la traçabilité comptable.</p>
    `
  },
  "4": {
    category: 'billing',
    title: 'Gérer les acomptes et reliquats',
    content: `
      <h2>Gérer la trésorerie et les paiements partiels</h2>
      <p>Chiffre Pro gère très bien les situations où un client ne paie pas la totalité d'une facture en une seule fois.</p>
      
      <h3>Enregistrer un acompte</h3>
      <p>Lorsqu'une facture est au statut "Brouillon" ou "Envoyée", ouvrez-la et cliquez sur <strong>Enregistrer un paiement</strong>. Entrez le montant de l'acompte perçu (ex: 30% du total). La facture passera automatiquement au statut <strong>Partiellement Payée</strong>.</p>
      
      <img src="/assets/chiffrepro-dashboard.png" class="rounded-2xl border border-slate-200 shadow-xl my-8 w-full object-cover" alt="Tableau de bord et paiements" />
      
      <h3>Suivi du solde</h3>
      <p>Sur le tableau de bord et sur la fiche client, le <strong>Solde Dû</strong> reflétera automatiquement ce paiement. Le PDF de la facture, si vous le régénérez, affichera "Montant payé : X" et "Reste à payer : Y".</p>
    `
  },
  "5": {
    category: 'settings',
    title: 'Personnaliser le modèle de facture',
    content: `
      <h2>L'image de marque de votre entreprise</h2>
      <p>Vos factures doivent refléter l'identité de votre entreprise. Le moteur de rendu PDF de Chiffre Pro est entièrement personnalisable.</p>
      
      <h3>Paramètres PDF</h3>
      <p>Rendez-vous dans <strong>Paramètres > Modèles PDF</strong>. Vous y trouverez plusieurs modèles de base (Classique, Moderne, Épuré).</p>
      
      <ul>
        <li><strong>Couleurs :</strong> Choisissez une couleur primaire pour les titres et les tableaux de la facture.</li>
        <li><strong>Logo :</strong> Importez un logo haute résolution (recommandé PNG avec fond transparent).</li>
        <li><strong>Mentions Légales :</strong> Remplissez le champ "Texte de pied de page". C'est ici que vous devez indiquer votre RC, IF, ICE, et Patente (pour le Maroc) ou les équivalents de votre pays, ainsi que les pénalités de retard.</li>
      </ul>
      
      <p>Vous pouvez prévisualiser le rendu avec un bouton de test avant de sauvegarder.</p>
    `
  },
  "6": {
    category: 'settings',
    title: 'Sauvegarder et restaurer vos données',
    content: `
      <h2>Sécuriser votre base de données</h2>
      <p>Puisque Chiffre Pro est une application de bureau locale (Desktop ERP), vos données sont stockées sur <strong>votre</strong> ordinateur, et non dans le cloud. Cela garantit votre confidentialité, mais exige que vous fassiez des sauvegardes régulières.</p>
      
      <h3>Outil de Backup Intégré</h3>
      <p>Allez dans <strong>Paramètres > Sauvegarde (Backup)</strong>. Cliquez sur <strong>Créer une sauvegarde</strong>. Le système générera une archive de la base de données <code>database.sqlite</code>.</p>
      
      <h3>Bonnes pratiques</h3>
      <p>Nous vous recommandons fortement d'enregistrer ces fichiers de sauvegarde sur une clé USB externe, un disque dur externe, ou un dossier synchronisé dans le cloud (comme Google Drive ou OneDrive) au moins une fois par semaine.</p>
      
      <h3>Restauration</h3>
      <p>En cas de problème matériel, installez Chiffre Pro sur le nouvel ordinateur, allez dans l'outil de restauration et sélectionnez votre dernier fichier de sauvegarde pour retrouver votre environnement exact.</p>
    `
  },
  "7": {
    category: 'billing',
    title: 'Gérer les factures fournisseurs et achats',
    content: `
      <h2>Suivi complet de vos dépenses</h2>
      <p>Chiffre Pro vous permet de centraliser toutes vos factures d'achats et de suivre vos dépenses fournisseurs, garantissant une vue d'ensemble de votre rentabilité.</p>
      
      <h3>Créer une facture d'achat</h3>
      <p>Allez dans <strong>Achats > Factures Fournisseurs</strong>. Cliquez sur <strong>Nouvelle Facture</strong>. Sélectionnez le fournisseur, la date et renseignez les articles achetés ainsi que la TVA récupérable.</p>
      
      <h3>L'Intelligence Artificielle (Extraction PDF)</h3>
      <p>Pour aller plus vite, utilisez notre assistant IA (si activé dans vos paramètres). Glissez-déposez le PDF envoyé par votre fournisseur. L'IA lira la facture hors-ligne et pré-remplira automatiquement les montants, la date et le nom du fournisseur. Vous n'avez plus qu'à vérifier et valider.</p>
      
      <h3>Impact sur la trésorerie et les stocks</h3>
      <p>L'enregistrement d'une facture d'achat mettra à jour votre tableau de bord (Dépenses) et augmentera automatiquement les quantités en stock des articles achetés.</p>
    `
  },
  "8": {
    category: 'billing',
    title: 'Bons de Commande et Bons de Réception',
    content: `
      <h2>Maîtrisez votre chaîne d'approvisionnement</h2>
      <p>Le module des achats ne se limite pas à la facturation. Vous pouvez gérer l'intégralité du cycle, de la commande à la réception des marchandises.</p>
      
      <h3>1. Le Bon de Commande (BC)</h3>
      <p>Allez dans <strong>Achats > Bons de Commande</strong>. Créez un document pour officialiser votre demande d'achat auprès d'un fournisseur. Le BC n'impacte ni votre comptabilité ni vos stocks.</p>
      
      <h3>2. Le Bon de Réception (BR)</h3>
      <p>À la livraison de la marchandise, convertissez votre BC en Bon de Réception. Ce document atteste que vous avez bien reçu les articles. <strong>La validation d'un BR met automatiquement vos stocks à jour.</strong></p>
      
      <h3>3. La facturation</h3>
      <p>Enfin, lorsque le fournisseur vous envoie sa facture, vous pouvez la lier au BR correspondant. Ce flux sécurise vos approvisionnements et vous évite de payer des marchandises non reçues.</p>
    `
  },
  "9": {
    category: 'getting-started',
    title: 'Gérer les articles et l\'inventaire',
    content: `
      <h2>Votre catalogue produit</h2>
      <p>Un catalogue bien structuré est la clé pour facturer rapidement. Chiffre Pro gère à la fois les biens physiques (avec suivi de stock) et les services.</p>
      
      <h3>Créer un article</h3>
      <p>Dans le menu <strong>Catalogue > Articles</strong>, ajoutez un nouveau produit. Renseignez son nom, sa référence (SKU), et son prix de vente. Si c'est un bien physique, cochez "Suivre le stock".</p>
      
      <h3>Le prix d'achat et la marge</h3>
      <p>Remplissez impérativement le <strong>Prix d'achat</strong>. Cela permettra à Chiffre Pro de calculer automatiquement votre <strong>marge brute</strong> sur chaque facture et devis généré.</p>
      
      <h3>L'import en masse (Bulk Import)</h3>
      <p>Si vous possédez déjà une liste d'articles sur Excel, utilisez la fonction d'import. Téléchargez notre modèle CSV depuis la page Articles, remplissez-le (en veillant à bien inclure les colonnes de prix d'achat et de stock), et réimportez-le dans le logiciel en un clic.</p>
    `
  }
};

const categoryIcons: Record<string, any> = {
  'getting-started': Book,
  'billing': FileText,
  'settings': Settings,
  'all': HelpCircle
};

const categoryNames: Record<string, string> = {
  'getting-started': 'Premiers pas',
  'billing': 'Facturation & Devis',
  'settings': 'Paramètres'
};

export default function GuideArticle() {
  const { id } = useParams<{ id: string }>();
  const article = id ? articlesContent[id] : null;

  if (!article) {
    return (
      <main className="py-32 bg-slate-50 min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <HelpCircle className="h-16 w-16 text-slate-300 mb-6" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Article introuvable</h1>
        <p className="text-slate-600 mb-8 font-medium">L'article que vous recherchez n'existe pas ou a été déplacé.</p>
        <Link to="/guides" className="text-primary font-bold hover:underline flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Retour au centre d'aide
        </Link>
      </main>
    );
  }

  const Icon = categoryIcons[article.category] || HelpCircle;

  return (
    <main className="py-24 bg-white min-h-[80vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link to="/guides" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Tous les guides
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-100 p-2 rounded-xl text-slate-500">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">
              {categoryNames[article.category]}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-12 tracking-tight leading-tight">
            {article.title}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:text-slate-900 prose-h3:text-xl prose-h3:text-slate-800 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-code:text-primary prose-code:bg-primary/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
        
        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
          <h3 className="font-bold text-slate-900 mb-2">Cet article vous a-t-il aidé ?</h3>
          <div className="flex justify-center gap-4 mt-4">
            <button className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors">Oui, merci</button>
            <button className="px-6 py-2 rounded-full border border-slate-200 text-slate-600 font-bold hover:bg-slate-100 transition-colors">Non, pas vraiment</button>
          </div>
        </div>
      </div>
    </main>
  );
}
