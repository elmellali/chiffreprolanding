import { Button } from "../components/ui/button"
import { CheckCircle2, Download, Phone, Star, Banknote, ReceiptText, ShieldCheck } from "lucide-react"
import { InteractiveInvoice } from "../components/InteractiveInvoice"
import { ROICalculator } from "../components/ROICalculator"
import { PricingToggle } from "../components/PricingToggle"
import { FAQAccordion } from "../components/FAQAccordion"
import { FeatureTabs } from "../components/FeatureTabs"
import { TaxCalculator } from "../components/TaxCalculator"
import { ComparisonTable } from "../components/ComparisonTable"
import { Testimonials } from "../components/Testimonials"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center justify-between gap-16 max-w-[1400px] relative">
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="flex-1 max-w-[620px] relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 text-slate-800 px-4 py-2 rounded-full text-sm font-bold tracking-wide mb-8 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-primary font-bold">Nouveau v2.4</span> : Gestion des stocks & Facturation hors-ligne
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-[4rem] font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight"
            >
              Maîtrisez votre chiffre d'affaires.<br />Accélérez votre <span className="text-gradient">croissance.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-[540px] font-medium"
            >
              Le logiciel de facturation et gestion commerciale pensé pour les entreprises au Maroc. Émettez des devis et factures conformes (ICE, DGI), et suivez vos stocks 100% hors-ligne.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="h-14 px-8 text-base shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all duration-300 font-bold rounded-xl" asChild>
                <a href="https://chiffrepro.com/downloads">
                  <Download className="mr-2 h-5 w-5" /> Télécharger gratuitement
                </a>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 text-base border-2 border-slate-200 text-slate-700 hover:border-primary hover:text-primary hover:bg-slate-50 hover:-translate-y-1 transition-all duration-300 font-bold rounded-xl" asChild>
                <a href="tel:+212698030397"><Phone className="mr-2 h-5 w-5" /> Parler à un expert</a>
              </Button>
            </motion.div>

            <div className="flex items-center gap-6 mt-8 text-xs font-bold text-slate-500">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> Données 100% sur votre PC</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Compatible Windows 10/11</span>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex-1 relative w-full pt-8 lg:pt-0"
          >
            <InteractiveInvoice />
            
            {/* Floating Premium Cards */}
            <div className="absolute -bottom-5 -left-8 glass p-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-float">
              <div className="bg-primary p-3 rounded-xl text-white shadow-inner">
                <ReceiptText className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Factures</span>
                <span className="text-xl font-extrabold text-slate-900">FA-2026-001</span>
              </div>
            </div>

            <div className="absolute -bottom-10 right-[15%] glass p-4 px-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-float-fast" style={{ animationDelay: '-2s' }}>
              <div className="bg-accent p-3 rounded-xl text-white shadow-inner">
                <Banknote className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Trésorerie</span>
                <span className="text-xl font-extrabold text-slate-900">102,722.23 DH</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Social Proof Stats */}
        <section className="bg-white border-y border-slate-100 py-12 relative z-20 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-y-10 divide-x divide-slate-100">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-8 md:px-16 flex flex-col items-center gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900 flex items-center gap-1">500<span className="text-2xl text-accent">+</span></span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Entreprises au Maroc</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="px-8 md:px-16 flex flex-col items-center gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900 flex items-center gap-1">1M<span className="text-2xl text-accent">+</span></span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Factures & Devis Générés</span>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="px-8 md:px-16 flex flex-col items-center gap-2">
                <span className="text-4xl md:text-5xl font-extrabold text-slate-900 flex items-center gap-2">
                  4.9 <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
                </span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-wide">Note de Satisfaction</span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Tabs Section */}
        <section id="features" className="py-24 bg-slate-50">
          <div className="text-center mb-16 px-4">
            <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">Un ERP Complet</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Bien plus qu'un outil de facturation.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Une suite d'outils exhaustive pour gérer la vie de votre entreprise : facturation, CRM, achats, gestion des stocks et analyse financière.</p>
          </div>
          <FeatureTabs />
        </section>

        {/* Live Tax Simulator */}
        <section id="simulateur" className="py-20 px-4 bg-white border-y border-slate-100">
          <TaxCalculator />
        </section>

        {/* Comparison Table Section */}
        <section id="comparatif" className="py-24 bg-slate-50">
          <div className="text-center mb-16 px-4">
            <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">POURQUOI CHIFFRE PRO ?</div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Comparatif des solutions de gestion</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Pourquoi les entrepreneurs marocains choisissent Chiffre Pro plutôt qu'un tableur Excel ou un logiciel étranger.</p>
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
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Calculez votre retour sur investissement</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">Découvrez combien de temps et d'argent vous pouvez économiser chaque mois en structurant vos processus avec Chiffre Pro.</p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <ROICalculator />
            </motion.div>
          </div>
        </section>

        {/* Download CTA Band */}
        <section id="download" className="relative py-32 overflow-hidden bg-slate-900">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent rounded-full blur-[120px] opacity-20 translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="container mx-auto px-4 max-w-6xl relative z-10 text-center">
            <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-6">L'OUTIL DES ENTREPRISES EXIGEANTES</div>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight tracking-tight text-white max-w-4xl mx-auto">
              Prêt à maîtriser votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-300">croissance</span> ?
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium">
              Rejoignez des centaines d'entreprises qui utilisent Chiffre Pro pour apporter une structure professionnelle à la gestion de leurs revenus.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <Button size="lg" className="h-16 px-10 text-lg bg-accent text-white hover:bg-accent/90 shadow-[0_0_40px_rgba(249,115,22,0.3)] font-bold hover:-translate-y-1 transition-all duration-300 border-none rounded-2xl w-full sm:w-auto">
                <a href="https://chiffrepro.com/downloads" className="flex items-center gap-2">
                  <Download className="h-6 w-6" /> Télécharger Chiffre Pro
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-10 text-lg border-2 border-slate-700 text-white bg-slate-800/50 hover:bg-slate-800 hover:text-white hover:border-slate-600 transition-all font-bold rounded-2xl w-full sm:w-auto backdrop-blur-md">
                <a href="tel:+212698030397" className="flex items-center gap-2">
                  <Phone className="h-6 w-6" /> Contacter l'équipe
                </a>
              </Button>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-slate-400 font-bold">
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Clarté financière garantie</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Déploiement immédiat sur Windows</span>
              <span className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-accent" /> Sans engagement &bull; Essai 15 jours</span>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-slate-50">
          <div className="container mx-auto">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Des tarifs simples et transparents</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Démarrez avec confiance et choisissez la licence qui soutiendra votre prochaine étape de croissance, sans frais cachés.</p>
            </div>
            
            <PricingToggle />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">QUESTIONS FRÉQUENTES</div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Vous avez des questions ?</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Trouvez rapidement les réponses concernant l'installation et l'utilisation de Chiffre Pro.</p>
            </div>
            
            <FAQAccordion />
          </div>
        </section>
      </main>
  )
}
