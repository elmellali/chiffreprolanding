import { Button } from "../components/ui/button";
import { 
  CheckCircle2, Download, Phone, Star, Banknote, ReceiptText, ShieldCheck, 
  Sparkles, UserCheck, Landmark 
} from "lucide-react";
import { InteractiveInvoice } from "../components/InteractiveInvoice";
import { PayrollCalculator } from "../components/PayrollCalculator";
import { ROICalculator } from "../components/ROICalculator";
import { PricingToggle } from "../components/PricingToggle";
import { FAQAccordion } from "../components/FAQAccordion";
import { FeatureTabs } from "../components/FeatureTabs";
import { TaxCalculator } from "../components/TaxCalculator";
import { ComparisonTable } from "../components/ComparisonTable";
import { Testimonials } from "../components/Testimonials";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="container mx-auto px-4 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-28 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 max-w-[1400px] relative">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

        <div className="flex-1 max-w-[640px] relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold tracking-wide mb-6 shadow-sm"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-primary font-bold">Nouveau v2.5</span> : Module Paie & RH Maroc (Barème IGR 2025/2026)
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-[3.75rem] font-black leading-[1.1] text-slate-900 mb-6 tracking-tight"
          >
            Le logiciel tout-en-un pour gérer votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-accent">entreprise au Maroc.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-[560px] font-medium"
          >
            Facturation & Devis conformes (ICE, DGI), Gestion des Stocks multi-dépôts, Module Paie & RH, et suivi de Trésorerie. Vos données restent <strong>100% sécurisées sur votre PC</strong>, sans abonnement cloud forcé.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/25 hover:-translate-y-1 transition-all duration-300 font-extrabold rounded-2xl bg-primary text-white hover:bg-primary/90" asChild>
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                <Download className="mr-2 h-5 w-5" /> Télécharger pour Windows
              </a>
            </Button>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base border-2 border-slate-200 text-slate-700 hover:border-accent hover:text-accent hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 font-extrabold rounded-2xl" asChild>
              <a href="https://wa.me/212698030397" target="_blank" rel="noopener noreferrer">
                <Phone className="mr-2 h-5 w-5 text-accent" /> Démo WhatsApp Directe
              </a>
            </Button>
          </motion.div>

          <div className="flex flex-wrap items-center gap-6 mt-8 text-xs font-bold text-slate-500">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Données 100% sur votre PC</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Compatible Windows 10/11</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Essai gratuit 15 jours</span>
          </div>
        </div>

        {/* Hero Interactive Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex-1 relative w-full pt-4 lg:pt-0"
        >
          <InteractiveInvoice />
          
          {/* Floating Live Badges */}
          <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 px-5 rounded-2xl shadow-xl flex items-center gap-3.5 animate-float">
            <div className="bg-primary p-2.5 rounded-xl text-white shadow-inner">
              <UserCheck className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Module Paie Maroc</span>
              <span className="text-sm font-extrabold text-slate-900">CNSS &bull; AMO &bull; IGR 2026</span>
            </div>
          </div>

          <div className="absolute -bottom-8 right-[5%] sm:right-[12%] bg-white/95 backdrop-blur-md border border-slate-200 p-3.5 px-5 rounded-2xl shadow-xl flex items-center gap-3.5 animate-float-fast" style={{ animationDelay: '-2s' }}>
            <div className="bg-accent p-2.5 rounded-xl text-white shadow-inner">
              <Banknote className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Trésorerie & Stocks</span>
              <span className="text-sm font-extrabold text-slate-900">Multi-dépôts & TVA</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Social Proof Stats */}
      <section className="bg-white border-y border-slate-100 py-10 relative z-20 shadow-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 text-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl sm:text-5xl font-black text-slate-900">500<span className="text-accent">+</span></span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">Entreprises au Maroc</span>
            </div>
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <span className="text-3xl sm:text-5xl font-black text-slate-900">1M<span className="text-accent">+</span></span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">Factures & Devis Émis</span>
            </div>
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <span className="text-3xl sm:text-5xl font-black text-slate-900">100%</span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">Conforme ICE & DGI</span>
            </div>
            <div className="flex flex-col items-center pt-4 sm:pt-0">
              <span className="text-3xl sm:text-5xl font-black text-slate-900 flex items-center gap-1">
                4.9 <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wide mt-1">Satisfaction Client</span>
            </div>
          </div>
        </div>
      </section>

      {/* Free Tools Hub Banner */}
      <section className="py-12 bg-slate-100/70 border-b border-slate-200/60">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-8">
            <span className="text-accent text-xs font-extrabold uppercase tracking-widest">BOÎTE À OUTILS PROFESSIONNELLE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">Nos outils gratuits pour entrepreneurs au Maroc</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/generateur-facture-gratuit" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-primary transition-all group">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ReceiptText className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-primary transition-colors">Créateur Facture PDF</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Générez une facture conforme avec ICE, TVA et logo gratuitement.</p>
            </Link>

            <Link to="/outils/simulateur-paie-maroc" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-accent transition-all group">
              <div className="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-accent transition-colors">Simulateur Paie Maroc</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Calcul Brut vers Net avec CNSS, AMO et nouveau barème IGR 2026.</p>
            </Link>

            <Link to="/outils/validateur-ice" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-500 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-emerald-600 transition-colors">Validateur Numéro ICE</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Vérifiez la validité de l'identifiant commun de l'entreprise (15 chiffres).</p>
            </Link>

            <Link to="/outils/simulateur-statut-fiscal" className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-500 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">Simulateur Fiscal SARL vs AE</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Comparez vos impôts entre Auto-Entrepreneur et SARL au Maroc.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="text-center mb-12 px-4 max-w-3xl mx-auto">
          <div className="text-accent text-xs font-extrabold tracking-[2px] uppercase mb-3">UN ERP COMPLET & INTUITIF</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Bien plus qu'un outil de facturation.</h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Une suite logicielle complète pour piloter la croissance de votre PME : Factures, Bons de livraison, Paie marocaine, Stocks multi-dépôts, Achats et Déclarations TVA.
          </p>
        </div>
        <FeatureTabs />
      </section>

      {/* Live Payroll Section */}
      <section id="paie" className="py-20 px-4 bg-slate-900 text-white relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 text-accent font-extrabold text-xs uppercase tracking-wider border border-accent/30 mb-3">
              <UserCheck className="w-4 h-4" />
              Nouveau Module &bull; RH & Gestion Sociale
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              La Paie Marocaine enfin simple et automatisée
            </h2>
            <p className="text-slate-300 text-base max-w-2xl mx-auto font-medium leading-relaxed">
              Testez notre simulateur ci-dessous. Le logiciel Chiffre Pro génère automatiquement l'ensemble des bulletins de paie et le livre de paie pour tous vos salariés.
            </p>
          </div>
          <PayrollCalculator />
        </div>
      </section>

      {/* Live Tax Simulator */}
      <section id="simulateur" className="py-20 px-4 bg-white border-y border-slate-100">
        <TaxCalculator />
      </section>

      {/* Comparison Table Section */}
      <section id="comparatif" className="py-24 bg-slate-50">
        <div className="text-center mb-16 px-4 max-w-3xl mx-auto">
          <div className="text-accent text-xs font-extrabold tracking-[2px] uppercase mb-3">POURQUOI CHOISIR CHIFFRE PRO ?</div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Comparatif des solutions de gestion</h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Pourquoi les entrepreneurs et directeurs financiers marocains préfèrent Chiffre Pro aux fichiers Excel et aux logiciels cloud étrangers.
          </p>
        </div>
        <ComparisonTable />
      </section>

      {/* Testimonials */}
      <section id="temoignages" className="py-20 bg-white border-y border-slate-100">
        <Testimonials />
      </section>

      {/* ROI Calculator */}
      <section className="bg-slate-50 py-24 px-4 border-b border-slate-100">
        <div className="container mx-auto">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="text-accent text-xs font-extrabold tracking-[2px] uppercase mb-3">RENTABILITÉ IMMÉDIATE</div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Calculez votre retour sur investissement</h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
              Découvrez combien d'heures et de dirhams vous gagnez chaque mois en automatisant vos factures, stocks et fiches de paie avec Chiffre Pro.
            </p>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <ROICalculator />
          </motion.div>
        </div>
      </section>

      {/* Download CTA Band */}
      <section id="download" className="relative py-28 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent rounded-full blur-[120px] opacity-20 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/20 text-accent font-extrabold text-xs uppercase tracking-wider mb-6 border border-accent/30">
            <Sparkles className="w-3.5 h-3.5" />
            INSTALLATION INSTANTANÉE &bull; ESSAI 15 JOURS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight text-white max-w-4xl mx-auto">
            Prêt à structurer la gestion de votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-amber-300">entreprise ?</span>
          </h2>
          <p className="text-base sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
            Rejoignez plus de 500 entreprises marocaines qui utilisent Chiffre Pro pour sécuriser leur facturation, leur paie et leurs stocks 100% hors-ligne.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <Button size="lg" className="h-16 px-10 text-lg bg-accent text-white hover:bg-accent/90 shadow-[0_0_40px_rgba(249,115,22,0.35)] font-black hover:-translate-y-1 transition-all duration-300 border-none rounded-2xl w-full sm:w-auto">
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe" className="flex items-center gap-2">
                <Download className="h-6 w-6" /> Télécharger Chiffre Pro
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 border-slate-700 text-white bg-slate-800/60 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all font-black rounded-2xl w-full sm:w-auto backdrop-blur-md" asChild>
              <a href="https://wa.me/212698030397" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-accent" /> Parler sur WhatsApp
              </a>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs sm:text-sm text-slate-400 font-bold">
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Clarté financière garantie</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Déploiement immédiat sur Windows</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> Sans engagement &bull; Données locales</span>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 px-4 max-w-3xl mx-auto">
            <div className="text-accent text-xs font-extrabold tracking-[2px] uppercase mb-3">TARIFICATION CLAIRE & DIRECTE</div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Des tarifs simples, en Dirhams (MAD)</h2>
            <p className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed">
              Choisissez la licence adaptée à la taille de votre structure. Zéro commission sur vos factures, zéro frais cachés.
            </p>
          </div>
          
          <PricingToggle />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <div className="text-accent text-xs font-extrabold tracking-[2px] uppercase mb-3">QUESTIONS FRÉQUENTES</div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Vous avez des questions ?</h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
              Trouvez rapidement les réponses concernant l'installation, la conformité marocaine et l'utilisation de Chiffre Pro.
            </p>
          </div>
          
          <FAQAccordion />
        </div>
      </section>
    </main>
  );
}
