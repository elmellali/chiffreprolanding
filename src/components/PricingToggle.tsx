import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/button';

export function PricingToggle() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Essentiel",
      description: "Pour les TPE et indépendants. Idéal pour structurer votre facturation.",
      priceMonthly: 199,
      priceAnnual: 1990,
      suffix: isAnnual ? "/an" : "/mois",
      features: [
        "Devis et Factures illimités",
        "CRM : Clients & Fournisseurs",
        "Rapports de base",
        "Support par email"
      ],
      cta: "Commencer l'essai gratuit",
      ctaLink: "https://chiffrepro.com/downloads",
      recommended: false,
    },
    {
      name: "Pro ERP",
      description: "Pour les PME structurées. Maîtrisez vos ventes, vos achats et vos stocks.",
      priceMonthly: 399,
      priceAnnual: 3990,
      suffix: isAnnual ? "/an" : "/mois",
      features: [
        "Tout de la formule Essentiel",
        "Gestion des Stocks & Inventaire",
        "Achats (Bons de commande & Réceptions)",
        "Rapports P&L et Taxes (TVA)",
        "Support prioritaire (WhatsApp)"
      ],
      cta: "Choisir la formule Pro",
      ctaLink: "tel:+212698030397",
      recommended: true,
    },
    {
      name: "Entreprise",
      description: "Des besoins complexes ? Intégrations sur mesure et assistance dédiée.",
      priceMonthly: "Sur devis",
      priceAnnual: "Sur devis",
      suffix: "",
      features: [
        "Toutes les fonctionnalités Pro",
        "Assistant Intelligence Artificielle",
        "Développements spécifiques",
        "Déploiement multi-postes réseau",
        "Chef de projet dédié"
      ],
      cta: "Contacter l'équipe",
      ctaLink: "mailto:contact@chiffrepro.com",
      recommended: false,
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex justify-center mb-12">
        <div className="bg-slate-100 p-1.5 rounded-full flex items-center shadow-inner relative">
          <button
            onClick={() => setIsAnnual(false)}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${!isAnnual ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Mensuel
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${isAnnual ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Annuel <span className="text-accent ml-1">-2 mois gratuits</span>
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

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className={`relative rounded-3xl p-8 flex flex-col bg-white border ${plan.recommended ? 'border-primary shadow-2xl shadow-primary/10 scale-105 z-10' : 'border-slate-200 shadow-xl shadow-slate-200/50 hover:shadow-2xl transition-shadow'}`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-accent px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white rounded-full shadow-md">
                Le choix des PME
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
            <p className="text-slate-500 text-sm font-medium h-12 mb-6">{plan.description}</p>
            
            <div className="mb-8">
              <div className="flex items-baseline gap-1">
                <span className={`font-extrabold text-slate-900 ${typeof plan.priceMonthly === 'number' ? 'text-4xl' : 'text-3xl'}`}>
                  {typeof plan.priceMonthly === 'number' 
                    ? (isAnnual ? plan.priceAnnual : plan.priceMonthly) 
                    : plan.priceMonthly}
                </span>
                {typeof plan.priceMonthly === 'number' && <span className="text-xl font-bold text-slate-900">DH</span>}
                <span className="text-slate-500 font-medium ml-1">{plan.suffix}</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-grow text-sm font-semibold text-slate-700">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className={`mt-0.5 rounded-full p-1 ${plan.recommended ? 'bg-primary/10' : 'bg-slate-100'}`}>
                    <Check className={`h-3 w-3 ${plan.recommended ? 'text-primary' : 'text-slate-600'}`} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full font-bold py-6 text-base ${plan.recommended ? 'bg-primary text-white shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'}`} 
              asChild
            >
              <a href={plan.ctaLink}>{plan.cta}</a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
