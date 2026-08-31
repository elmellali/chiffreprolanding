import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReceiptText, ShoppingCart, Users, PieChart, Box, Settings } from 'lucide-react';

const features = [
  {
    id: "facturation",
    icon: ReceiptText,
    title: "Ventes & Facturation",
    subtitle: "Gérez votre cycle de vente de A à Z",
    description: "De la création d'un devis élégant à la génération de la facture finale. Chiffre Pro gère les acomptes, les paiements partiels, les factures récurrentes et les avoirs en toute simplicité.",
    benefits: ["Devis, Factures & Bons de livraison", "Facturation récurrente", "Avoirs & Gestion des acomptes"],
    image: "/assets/chiffrepro-invoice.png"
  },
  {
    id: "crm",
    icon: Users,
    title: "CRM & Contacts",
    subtitle: "Une vision unifiée de vos partenaires",
    description: "Centralisez les fiches de vos clients et fournisseurs. Gardez une trace complète de l'historique financier (factures, paiements, solde restant dû) et gérez de multiples adresses.",
    benefits: ["Fiches Clients & Fournisseurs", "Historique financier complet", "Adresses de livraison/facturation"],
    image: "/assets/chiffrepro-invoice.png"
  },
  {
    id: "achats",
    icon: ShoppingCart,
    title: "Achats & Dépenses",
    subtitle: "Maîtrisez vos coûts et vos stocks",
    description: "Éditez vos bons de commande (Purchase Orders), validez vos réceptions (Goods Receipts) et enregistrez les factures de vos fournisseurs. Suivez l'ensemble de vos charges pour protéger votre rentabilité.",
    benefits: ["Bons de Commande & Réception", "Factures Fournisseurs", "Suivi des charges courantes"],
    image: "/assets/chiffrepro-dashboard.png"
  },
  {
    id: "catalogue",
    icon: Box,
    title: "Catalogue & Stocks",
    subtitle: "Vos produits et services sous contrôle",
    description: "Une base de données centralisée pour vos articles facturables. Assignez des taxes par défaut, définissez vos prix et surveillez l'état de votre inventaire en temps réel.",
    benefits: ["Gestion Produits & Services", "Taxes & Tarifs personnalisés", "Suivi des stocks"],
    image: "/assets/chiffrepro-invoice.png"
  },
  {
    id: "rapports",
    icon: PieChart,
    title: "Rapports & Analyses",
    subtitle: "Prenez des décisions éclairées",
    description: "Visualisez l'état de santé de votre entreprise. Générez des rapports de pertes et profits (P&L), analysez votre chiffre d'affaires et préparez vos déclarations de TVA en un clic.",
    benefits: ["Rapports Pertes & Profits (P&L)", "Rapports des Taxes (TVA)", "Analyse des Ventes & Stocks"],
    image: "/assets/chiffrepro-dashboard.png"
  },
  {
    id: "outils",
    icon: Settings,
    title: "Configuration & Outils",
    subtitle: "Un logiciel qui s'adapte à vous",
    description: "Personnalisez entièrement vos modèles de documents PDF. Gérez les droits d'accès de vos collaborateurs, créez des champs sur-mesure et sécurisez vos données grâce à l'outil de sauvegarde intégré.",
    benefits: ["Personnalisation PDF avancée", "Gestion des rôles utilisateurs", "Sauvegarde & Restauration"],
    image: "/assets/chiffrepro-invoice.png"
  }
];

export function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(features[0].id);

  const activeFeature = features.find(f => f.id === activeTab)!;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar / Tabs */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2">
          {features.map((feature) => {
            const isActive = activeTab === feature.id;
            return (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`relative p-4 text-left rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-xl shadow-slate-200/50 border border-primary/10 scale-[1.02] z-10' : 'bg-transparent hover:bg-white/50 border border-transparent'}`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-tab-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-10 bg-primary rounded-r-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-500'}`}>
                    <feature.icon className="h-6 w-6 stroke-[2]" />
                  </div>
                  <div>
                    <h4 className={`font-bold text-base md:text-lg ${isActive ? 'text-primary' : 'text-slate-700'}`}>{feature.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="w-full lg:w-2/3 bg-white rounded-[2.5rem] p-8 lg:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative min-h-[500px] flex items-center">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full relative z-10"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs tracking-wider uppercase mb-6">
                {activeFeature.title}
              </div>
              <h3 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                {activeFeature.subtitle}
              </h3>
              <p className="text-lg text-slate-600 mb-10 font-medium leading-relaxed max-w-2xl">
                {activeFeature.description}
              </p>
              
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                {activeFeature.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex flex-col gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
