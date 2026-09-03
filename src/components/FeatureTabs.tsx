import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReceiptText, ShoppingCart, Users, PieChart, Box, UserCheck, Landmark, CheckCircle2, ShieldCheck } from 'lucide-react';

const features = [
  {
    id: "facturation",
    icon: ReceiptText,
    badge: "100% Conforme ICE / DGI",
    title: "Ventes & Facturation",
    subtitle: "Gérez votre cycle commercial de A à Z",
    description: "De la création d'un devis élégant à la génération de la facture finale et du bon de livraison. Chiffre Pro gère les acomptes, les retenues à la source, les factures récurrentes et les avoirs en toute conformité marocaine.",
    benefits: [
      "Devis, Factures & Bons de Livraison (BL)",
      "Gestion des Acomptes & Avoirs",
      "Mention obligatoire ICE, IF, RC, CNSS, Patente",
      "Facturation récurrente & multi-taux TVA"
    ]
  },
  {
    id: "paie",
    icon: UserCheck,
    badge: "Loi de Finances 2025/2026",
    title: "Paie & RH Maroc",
    subtitle: "Édition des fiches de paie & déclarations sociales",
    description: "Un moteur de paie marocain complet et automatisé. Calculez en 1 clic les cotisations CNSS, l'AMO, le barème IGR progressif, les frais professionnels et gérez les congés payés et avances sur salaires.",
    benefits: [
      "Bulletins de paie conformes et Livre de Paie légal",
      "Calcul automatique CNSS (4.48%), AMO (2.26%) & IGR 2026",
      "Gestion des congés payés & autorisations d'absence",
      "Télé-déclaration Damancom & État 9421"
    ]
  },
  {
    id: "stocks",
    icon: Box,
    badge: "Multi-dépôts & Alertes",
    title: "Catalogue & Stocks",
    subtitle: "Vos produits, services et inventaires sous contrôle",
    description: "Suivez vos niveaux de stock en temps réel sur plusieurs entrepôts ou points de vente. Alertes de réapprovisionnement, calcul du Coût Unitaire Moyen Pondéré (CUMP) et historique complet des mouvements.",
    benefits: [
      "Gestion multi-dépôts & transferts de stock",
      "Alertes automatiques de stock minimum",
      "Valorisation d'inventaire (CUMP / FIFO)",
      "Codes-barres & déclinaisons articles"
    ]
  },
  {
    id: "achats",
    icon: ShoppingCart,
    badge: "Maîtrise des charges",
    title: "Achats & Dépenses",
    subtitle: "Maîtrisez vos coûts et vos fournisseurs",
    description: "Éditez vos bons de commande (BC), validez les bons de réception fournisseurs et enregistrez les factures d'achats. Suivez avec précision vos charges d'exploitation pour maximiser votre marge nette.",
    benefits: [
      "Bons de Commande & Réceptions Fournisseurs",
      "Suivi des échéances et paiements fournisseurs",
      "Contrôle des marges et imputation des dépenses",
      "Historique complet des achats par fournisseur"
    ]
  },
  {
    id: "crm",
    icon: Users,
    badge: "CRM Intégré",
    title: "Clients & Fournisseurs",
    subtitle: "Une vision unifiée de vos partenaires d'affaires",
    description: "Centralisez les fiches de vos clients et fournisseurs avec validation automatique du numéro ICE. Suivez les encours financiers, l'historique des transactions et les relances d'impayés.",
    benefits: [
      "Fiches complètes avec vérification ICE",
      "Relevé de compte client & relances d'impayés",
      "Adresses multiples de facturation & livraison",
      "Statistiques d'achat par client"
    ]
  },
  {
    id: "tresorerie",
    icon: Landmark,
    badge: "Visibilité Financière",
    title: "Trésorerie & Banque",
    subtitle: "Suivez vos flux financiers en temps réel",
    description: "Enregistrez vos règlements (virements, chèques, LCN, espèces) et gérez vos comptes bancaires et caisses. Évitez les mauvaises surprises avec un suivi prévisionnel précis des encaissements et décaissements.",
    benefits: [
      "Suivi caisses et comptes bancaires multiples",
      "Gestion des chèques et effets (LCN)",
      "Rapprochement bancaire & état des impayés",
      "Prévisions des flux de trésorerie"
    ]
  },
  {
    id: "rapports",
    icon: PieChart,
    badge: "Déclarations Simplifiées",
    title: "Rapports Fiscaux & TVA",
    subtitle: "Vos états financiers prêts pour votre comptable",
    description: "Générez en un clic vos déclarations de TVA (encaissement / débit), vos comptes de résultat (P&L), et exportez l'ensemble des écritures comptables conformes aux normes marocaines.",
    benefits: [
      "Rapport officiel de TVA trimestrielle/mensuelle",
      "Compte de résultat (Pertes & Profits / P&L)",
      "Grand Livre & Journaux de vente/achat",
      "Export Excel et PDF pour expert-comptable"
    ]
  }
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id);
  const activeFeature = features.find(f => f.id === activeTab) || features[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-5/12 flex flex-col gap-2.5">
          {features.map((feature) => {
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`relative p-4 sm:p-5 text-left rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-white shadow-xl shadow-slate-200/80 border border-primary/20 scale-[1.02] z-10' 
                    : 'bg-transparent hover:bg-white/60 border border-transparent'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-tab-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${
                      isActive ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-slate-100 text-slate-500'
                    }`}>
                      <feature.icon className="h-5 w-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className={`font-bold text-base sm:text-lg ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                        {feature.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-medium line-clamp-1">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap hidden sm:inline-block ${
                    isActive ? 'bg-accent/10 text-accent' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {feature.badge}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-7/12 bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden relative min-h-[480px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-accent/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="w-full relative z-10"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs tracking-wider uppercase mb-5">
                <activeFeature.icon className="w-3.5 h-3.5" />
                {activeFeature.badge}
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
                {activeFeature.subtitle}
              </h3>

              <p className="text-base text-slate-600 mb-8 font-medium leading-relaxed">
                {activeFeature.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-3.5 pt-4 border-t border-slate-100">
                {activeFeature.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/80 border border-slate-100/80">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Données stockées localement sur votre machine
                </span>
                <a
                  href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-accent transition-colors"
                >
                  Tester ce module &rarr;
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
