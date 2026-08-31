import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Est-ce que mes données sont stockées sur le cloud ?",
    answer: "Non, Chiffre Pro est une application de bureau. Toutes vos données sont stockées localement sur votre ordinateur, vous garantissant une sécurité et une confidentialité absolues."
  },
  {
    question: "Dois-je payer pour les mises à jour ?",
    answer: "Avec nos forfaits mensuel et annuel, toutes les mises à jour fonctionnelles et de sécurité sont incluses sans frais supplémentaires pendant toute la durée de votre abonnement."
  },
  {
    question: "Puis-je personnaliser mes factures ?",
    answer: "Absolument ! Vous pouvez ajouter votre logo, modifier les couleurs, et ajuster les mentions légales pour que chaque facture reflète parfaitement l'identité de votre entreprise."
  },
  {
    question: "Comment se passe l'installation ?",
    answer: "Le téléchargement inclut un assistant d'installation simple. En quelques clics, l'application est prête sur votre poste. L'activation de votre licence se fait lors du premier lancement."
  }
];

export function FAQAccordion() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {faqs.map((faq, index) => {
        const isActive = activeIndex === index;
        return (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isActive ? 'bg-white border-primary shadow-md' : 'bg-slate-50 border-slate-200 hover:border-primary/50'}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
            >
              <span className={`font-bold text-lg ${isActive ? 'text-primary' : 'text-slate-900'}`}>
                {faq.question}
              </span>
              <motion.div
                animate={{ rotate: isActive ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`p-1 rounded-full ${isActive ? 'bg-primary/10 text-primary' : 'bg-slate-200 text-slate-500'}`}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 pt-0 text-slate-600 font-medium leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
