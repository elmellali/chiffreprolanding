import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from './ui/button';

export function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Essentiel",
      description: "Pour les indépendants et TPE qui démarrent. Structurez votre facturation en toute conformité.",
      priceMonthly: 199,
      priceAnnual: 1990,
      suffix: isAnnual ? "/an" : "/mois",
      features: [
        "Devis, Factures & Bons de livraison illimités",
        "Conformité légale ICE, IF, RC, Patente & DGI",
        "CRM : Gestion Clients & Fournisseurs",
        "Rapports de base des ventes & encaissements",
        "100% Hors-ligne : vos données restent sur votre PC",
        "Support technique par email & WhatsApp"
      ],
      cta: "Commencer l'essai gratuit",
      ctaLink: "https://chiffrepro.com/downloads/ChiffrePro_Setup.exe",
      recommended: false,
    },
    {
      name: "Pro ERP & Paie",
      description: "La formule complète pour les PME structurées. Ventes, achats, stocks et gestion de la paie marocaine.",
      priceMonthly: 399,
      priceAnnual: 3990,
      suffix: isAnnual ? "/an" : "/mois",
      features: [
        "Tout de la formule Essentiel",
        "Module Paie & RH Maroc (CNSS, AMO, IGR 2026)",
        "Édition Bulletins de Paie & Livre de Paie",
        "Gestion des Stocks Multi-dépôts & Valorisation CUMP",
        "Achats (Bons de commande & Bons de réception)",
        "Déclarations fiscales & Rapports TVA",
        "Support VIP dédié sur WhatsApp"
      ],
      cta: "Télécharger la version Pro",
      ctaLink: "https://chiffrepro.com/downloads/ChiffrePro_Setup.exe",
      recommended: true,
    },
    {
      name: "Entreprise & Réseau",
      description: "Pour les structures avec plusieurs postes ou magasins. Intégrations sur-mesure et assistance dédiée.",
      priceMonthly: "Sur devis",
      priceAnnual: "Sur devis",
      suffix: "",
      features: [
        "Toutes les fonctionnalités Pro ERP & Paie",
        "Déploiement multi-postes & réseau local",
        "Reprise et migration de vos données existantes",
        "Modèles de documents PDF 100% sur-mesure",
        "Formation personnalisée de vos équipes",
        "Interlocuteur & Chef de projet dédié"
      ],
      cta: "Demander un devis",
      ctaLink: "https://wa.me/212698030397",
      recommended: false,
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      {/* Billing Switcher */}
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-full flex items-center shadow-inner relative">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Paiement Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Licence Annuelle <span className="text-accent ml-1 font-extrabold">-2 mois offerts</span>
          </button>
          
          <motion.div 
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm border border-slate-200 z-0"
            initial={false}
            animate={{
              left: isAnnual ? "50%" : "0.375rem",
              width: "50%"
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative rounded-3xl p-8 flex flex-col bg-white border ${
              plan.recommended 
                ? 'border-primary shadow-2xl shadow-primary/15 scale-105 z-10' 
                : 'border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-all'
            }`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-accent px-4 py-1.5 text-xs font-black uppercase tracking-wider text-white rounded-full shadow-md flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Le choix n°1 des PME
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm font-medium h-12 mb-6 leading-relaxed">{plan.description}</p>
            
            <div className="mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-baseline gap-1">
                <span className={`font-black text-slate-900 ${typeof plan.priceMonthly === 'number' ? 'text-4xl' : 'text-3xl'}`}>
                  {typeof plan.priceMonthly === 'number' 
                    ? (isAnnual ? plan.priceAnnual.toLocaleString() : plan.priceMonthly.toLocaleString()) 
                    : plan.priceMonthly}
                </span>
                {typeof plan.priceMonthly === 'number' && <span className="text-xl font-bold text-slate-900">DH</span>}
                <span className="text-slate-500 font-medium ml-1 text-sm">{plan.suffix}</span>
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Tarification transparente en Dirhams &bull; Sans engagement
              </div>
            </div>

            <ul className="space-y-3.5 mb-8 flex-grow text-sm font-medium text-slate-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1 flex-shrink-0 ${plan.recommended ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-600'}`}>
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full font-extrabold py-6 text-base rounded-2xl ${
                plan.recommended 
                  ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'
              }`} 
              asChild
            >
              <a href={plan.ctaLink}>{plan.cta}</a>
            </Button>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Données 100% hébergées sur votre PC</span>
        <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-emerald-600" /> Mises à jour légales et fiscales incluses</span>
      </div>
    </div>
  );
}
