// No JS scroll observer needed; using CSS keyframes for reliability
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Users, CreditCard, PieChart, ShoppingCart, Lock, Shield, CheckCircle2, Download, Phone, Mail, MapPin, Check, Star, Database, ReceiptText, Banknote } from "lucide-react"
import { InteractiveInvoice } from "./components/InteractiveInvoice"
import { ROICalculator } from "./components/ROICalculator"

const BrandLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="50" width="20" height="40" fill="currentColor" />
    <rect x="35" y="35" width="20" height="55" fill="currentColor" />
    <rect x="60" y="20" width="20" height="70" fill="currentColor" />
    <path d="M5 70 L35 45 L60 25 L85 5" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 5 H85 V30" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function App() {
  const fadeUpClass = "opacity-0 animate-fade-up"
  const fadeLeftClass = "opacity-0 animate-fade-left"

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-shadow shadow-sm border-b border-slate-100">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          <a href="#" className="flex items-center gap-2 font-bold text-2xl text-slate-900 group tracking-tight">
            <div className="text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <BrandLogo className="h-8 w-auto" />
            </div>
            <span>Chiffre Pro</span>
          </a>
          <nav className="hidden md:flex gap-1 text-sm font-medium ml-auto mr-8">
            <a href="#features" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Fonctionnalités</a>
            <a href="#pricing" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Tarifs</a>
            <a href="#download" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Télécharger</a>
            <a href="#contact" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform font-semibold" asChild>
              <a href="https://chiffrepro.com/downloads">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32 flex flex-col lg:flex-row items-center justify-between gap-16 max-w-[1400px]">
          <div className="flex-1 max-w-[580px]">
            <div className={`inline-block bg-secondary text-primary px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-8 ${fadeUpClass}`}>
              VISIBILITÉ & CONTRÔLE
            </div>
            <h1 className={`text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-slate-900 mb-6 tracking-tight ${fadeUpClass}`}>
              Maîtrisez votre chiffre d'affaires.<br />Accélérez votre <span className="text-accent">croissance.</span>
            </h1>
            
            <p className={`text-lg text-slate-600 leading-relaxed mb-8 max-w-[520px] font-medium ${fadeUpClass}`}>
              Gardez une vision claire de votre chiffre d’affaires. Chiffre Pro offre aux entreprises ambitieuses un contrôle total sur leur facturation et leurs encaissements.
            </p>

            <ul className={`space-y-4 mb-12 ${fadeUpClass}`}>
              <li className="flex items-center gap-4 text-slate-700 font-medium">
                <CheckCircle2 className="h-5 w-5 text-accent" /> Créez, envoyez et suivez chaque facture avec précision.
              </li>
              <li className="flex items-center gap-4 text-slate-700 font-medium">
                <CheckCircle2 className="h-5 w-5 text-accent" /> Passez moins de temps à relancer vos clients.
              </li>
              <li className="flex items-center gap-4 text-slate-700 font-medium">
                <CheckCircle2 className="h-5 w-5 text-accent" /> Obtenez une vision plus claire de votre trésorerie.
              </li>
            </ul>

            <div className={`flex flex-wrap gap-4 ${fadeUpClass}`}>
              <Button size="lg" className="shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform font-bold" asChild>
                <a href="https://chiffrepro.com/downloads">Commencer votre essai &rarr;</a>
              </Button>
              <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-secondary hover:-translate-y-0.5 transition-transform font-bold" asChild>
                <a href="tel:+212698030397">Découvrir Chiffre Pro</a>
              </Button>
            </div>
          </div>

          <div className="flex-1 relative w-full pt-8 lg:pt-0">
            <div className={`${fadeLeftClass}`}>
              <InteractiveInvoice />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-5 -left-8 bg-white p-4 px-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 animate-[floatCard_6s_infinite_ease-in-out_alternate]">
                <div className="bg-primary/10 p-3 rounded-lg text-primary">
                  <ReceiptText className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Factures</span>
                  <span className="text-xl font-bold text-slate-900">11</span>
                </div>
              </div>

              <div className="absolute -bottom-10 right-[20%] bg-white p-4 px-6 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-4 animate-[floatCard_6s_infinite_ease-in-out_alternate_reverse]" style={{ animationDelay: '-3s' }}>
                <div className="bg-accent/10 p-3 rounded-lg text-accent">
                  <Banknote className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Chiffre d'affaires</span>
                  <span className="text-xl font-bold text-slate-900">102,722.23 DH</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Stats */}
        <section className="bg-white border-y border-slate-200 py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-y-8 divide-x divide-slate-200">
              <div className="px-8 md:px-14 flex flex-col items-center gap-2">
                <span className={`text-4xl font-extrabold text-primary flex items-center gap-1 ${fadeUpClass}`}>500<span className="text-2xl">+</span></span>
                <span className="text-sm font-medium text-slate-500">Entreprises clientes</span>
              </div>
              <div className="px-8 md:px-14 flex flex-col items-center gap-2">
                <span className={`text-4xl font-extrabold text-primary flex items-center gap-1 ${fadeUpClass} delay-100`}>1M<span className="text-2xl">+</span></span>
                <span className="text-sm font-medium text-slate-500">Factures sécurisées</span>
              </div>
              <div className="px-8 md:px-14 flex flex-col items-center gap-2">
                <span className={`text-4xl font-extrabold text-primary flex items-center gap-2 ${fadeUpClass} delay-200`}>
                  <Star className="h-6 w-6 text-accent fill-accent" /> 4.9
                </span>
                <span className="text-sm font-medium text-slate-500">Note de fiabilité</span>
              </div>
              <div className="px-8 md:px-14 flex flex-col items-center gap-2 border-r-0">
                <span className={`text-4xl font-extrabold text-primary flex items-center gap-1 ${fadeUpClass} delay-300`}>100<span className="text-2xl">%</span></span>
                <span className="text-sm font-medium text-slate-500">Contrôle local</span>
              </div>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="bg-slate-50/50 py-16 px-4">
          <div className="container mx-auto">
            <div className={`${fadeUpClass}`}>
              <ROICalculator />
            </div>
          </div>
        </section>

        {/* Bottom Features Grid */}
        <section id="features" className="py-16 px-4 lg:px-8 max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {[
              { icon: ReceiptText, title: "Chiffre d'affaires", desc: "Suivez vos devis, factures et créances avec précision.", delay: "" },
              { icon: ShoppingCart, title: "Dépenses", desc: "Gérez vos fournisseurs et bons de commande professionnels.", delay: "delay-100" },
              { icon: Users, title: "Clients", desc: "Centralisez votre base de contacts pour un meilleur suivi.", delay: "delay-200" },
              { icon: CreditCard, title: "Trésorerie", desc: "Gardez le contrôle sur vos encaissements et décaissements.", delay: "delay-300" },
              { icon: PieChart, title: "Croissance", desc: "Des rapports clairs pour des décisions stratégiques.", delay: "delay-400" },
            ].map((feat, i) => (
              <div key={i} className={`flex flex-col items-start p-6 rounded-2xl transition-all hover:bg-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 group border border-transparent hover:border-slate-100 ${fadeUpClass} ${feat.delay}`}>
                <div className="w-14 h-14 bg-secondary text-primary rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <feat.icon className="h-7 w-7 stroke-[2.5]" />
                </div>
                <h4 className="font-bold text-lg mb-2 text-slate-800">{feat.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Detailed Features */}
        <section className="bg-white py-24">
          <div className="container mx-auto px-4 max-w-6xl space-y-32">
            
            {/* Row 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className={`flex-1 ${fadeUpClass}`}>
                <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">STRUCTURATION</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">Un suivi rigoureux de vos factures</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">Chiffre Pro donne aux entreprises ambitieuses une maîtrise claire de leur facturation. Structurez vos processus pour des encaissements plus rapides et une trésorerie sereine.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Processus de facturation standardisé</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Suivi précis des paiements et relances</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Professionnalisme garanti à chaque étape</li>
                </ul>
              </div>
              <div className={`flex-1 ${fadeUpClass} delay-200`}>
                <img src="/assets/chiffrepro-invoice.png" alt="Facturation professionnelle" className="w-full rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200" />
              </div>
            </div>

            {/* Row 2 - Security visual for Achats */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
              <div className={`flex-1 ${fadeUpClass}`}>
                <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">CONTRÔLE DES DÉPENSES</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">Une vue complète sur votre trésorerie</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">Anticipez et gérez vos flux financiers avec précision. Intégrez vos factures fournisseurs et maîtrisez vos marges pour une croissance pérenne et sécurisée.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Suivi structuré des dépenses</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Gestion centralisée des fournisseurs</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Visibilité claire sur votre marge brute</li>
                </ul>
              </div>
              <div className={`flex-1 flex justify-center w-full ${fadeUpClass} delay-200`}>
                <div className="w-full max-w-[440px] aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl border border-slate-700 flex flex-col items-center justify-center gap-4 p-8 relative overflow-hidden shadow-2xl">
                  <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/20 rounded-full blur-3xl"></div>
                  <div className="w-20 h-20 bg-slate-800 border border-slate-700 rounded-2xl flex items-center justify-center text-primary shadow-lg animate-[secPulse_3s_infinite_ease-in-out]">
                    <ShoppingCart className="h-10 w-10" />
                  </div>
                  <div className="bg-slate-800 text-white px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide border border-slate-700 mt-4">Gestion des dépenses</div>
                  <p className="text-slate-400 text-sm font-medium">Un contrôle total de vos flux</p>
                </div>
              </div>
            </div>

            {/* Row 3 - Security visual for Offline */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
              <div className={`flex-1 ${fadeUpClass}`}>
                <div className="text-primary text-xs font-bold tracking-[2px] uppercase mb-4">SÉCURITÉ & CONFIDENTIALITÉ</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">Vos données restent confidentielles</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed font-medium">Chiffre Pro est une application de bureau conçue pour une fiabilité absolue. Ne dépendez plus du cloud pour consulter votre chiffre d'affaires : vos données financières restent en sécurité, sur votre propre infrastructure.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Fonctionnement 100% autonome et local</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Aucune dépendance externe pour la facturation</li>
                  <li className="flex items-center gap-4 text-slate-700 font-bold"><div className="bg-primary/10 p-1.5 rounded-full"><Check className="h-4 w-4 text-primary" /></div> Génération de rapports et PDF en interne</li>
                </ul>
              </div>
              <div className={`flex-1 flex justify-center w-full ${fadeUpClass} delay-200`}>
                <div className="w-full max-w-[440px] aspect-[4/3] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 rounded-3xl border border-slate-200 flex flex-col items-center justify-center gap-6 p-8 relative overflow-hidden">
                  <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary/10 rounded-full blur-xl"></div>
                  <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg animate-[secPulse_3s_infinite_ease-in-out] z-10 relative">
                    <Shield className="h-10 w-10" />
                  </div>
                  
                  {/* Floating Icons Ring */}
                  <div className="flex gap-4 absolute top-1/2 -translate-y-1/2 w-full justify-between px-10">
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-sm border border-slate-100 animate-[floatCard_5s_infinite_ease-in-out_alternate]"><Lock className="h-5 w-5" /></div>
                    <div className="w-11 h-11 bg-white rounded-xl flex items-center justify-center text-slate-700 shadow-sm border border-slate-100 animate-[floatCard_5s_infinite_ease-in-out_alternate_reverse]" style={{ animationDelay: '-1.2s' }}><Database className="h-5 w-5" /></div>
                  </div>
                  
                  <div className="bg-primary text-white px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-md mt-2 z-10 relative">Architecture Sécurisée</div>
                  <p className="text-slate-600 text-sm font-bold z-10 relative">La garantie d'une fiabilité totale</p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Download CTA Band */}
        <section id="download" className="relative py-24 overflow-hidden bg-primary">
          <div className="absolute -top-[100px] -right-[100px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-[80px] -left-[80px] w-[300px] h-[300px] bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className={`flex flex-col md:flex-row items-center gap-16 ${fadeUpClass}`}>
              <div className="flex-1 text-white">
                <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">L'OUTIL DES ENTREPRISES EXIGEANTES</div>
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight tracking-tight">Prêt à maîtriser votre croissance ?</h2>
                <p className="text-lg text-slate-300 mb-8 max-w-md font-medium">Déployez Chiffre Pro et apportez une structure professionnelle à la gestion de vos revenus.</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <Button size="lg" className="bg-accent text-white hover:bg-accent/90 shadow-lg font-bold hover:-translate-y-0.5 transition-all border-none">
                    <a href="https://chiffrepro.com/downloads" className="flex items-center gap-2">
                      <Download className="h-5 w-5" /> Télécharger Chiffre Pro
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" className="border-2 border-white/30 text-white bg-transparent hover:bg-white/10 hover:text-white transition-all font-bold">
                    <a href="tel:+212698030397" className="flex items-center gap-2">
                      <Phone className="h-5 w-5" /> Contacter l'équipe
                    </a>
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-300 font-bold">
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Clarté financière</span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Déploiement immédiat</span>
                  <span className="hidden sm:inline">&bull;</span>
                  <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-accent" /> Support professionnel</span>
                </div>
              </div>
              <div className="flex-1">
                <img src="/assets/chiffrepro-dashboard.png" alt="Application Chiffre Pro" className="w-full rounded-xl shadow-2xl border-4 border-slate-700/50 transform rotate-2 hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <div className={`text-center mb-16 ${fadeUpClass}`}>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Des formules adaptées à vos objectifs</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Démarrez avec confiance et choisissez la licence qui soutiendra votre prochaine étape de croissance.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              <Card className={`hover:-translate-y-1 transition-transform border border-slate-200 ${fadeUpClass}`}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Période d'Essai</CardTitle>
                  <div className="mt-4 text-4xl font-extrabold">0 DH<span className="text-base font-medium text-slate-500">/15 jrs</span></div>
                  <CardDescription className="mt-2 font-medium">Évaluez la plateforme en conditions réelles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm font-semibold text-slate-700">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Accès complet aux fonctionnalités</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Aucun engagement requis</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Déploiement instantané</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 font-bold" asChild>
                    <a href="https://chiffrepro.com/downloads">Débuter l'évaluation</a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className={`hover:-translate-y-1 transition-transform border border-slate-200 ${fadeUpClass} delay-100`}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Mensuel</CardTitle>
                  <div className="mt-4 text-4xl font-extrabold">149 DH<span className="text-base font-medium text-slate-500">/mois</span></div>
                  <CardDescription className="mt-2 font-medium">Pour une flexibilité opérationnelle continue.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm font-semibold text-slate-700">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Gestion du chiffre d'affaires</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Mises à jour de sécurité</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Support par email</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 font-bold" asChild>
                    <a href="tel:+212698030397">Choisir ce plan</a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className={`border-2 border-primary shadow-xl shadow-primary/10 relative scale-105 z-10 bg-white ${fadeUpClass} delay-200`}>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wider text-white rounded-full">Recommandé</div>
                <CardHeader className="pt-8">
                  <CardTitle className="text-xl font-bold">Annuel</CardTitle>
                  <div className="mt-4 text-4xl font-extrabold text-slate-900">1490 DH<span className="text-base font-medium text-slate-500">/an</span></div>
                  <CardDescription className="mt-2 font-medium">L'option la plus stratégique à long terme.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm font-bold text-slate-800">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Inclus toutes les fonctionnalités</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Deux mois d'abonnement offerts</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-primary" /> Support technique prioritaire</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-primary text-white shadow-lg hover:-translate-y-0.5 transition-transform font-bold" asChild>
                    <a href="tel:+212698030397">Souscrire (Annuel)</a>
                  </Button>
                </CardFooter>
              </Card>

              <Card className={`hover:-translate-y-1 transition-transform border border-slate-200 ${fadeUpClass} delay-300`}>
                <CardHeader>
                  <CardTitle className="text-xl font-bold">Entreprise</CardTitle>
                  <div className="mt-4 text-3xl font-extrabold leading-[40px]">Sur mesure</div>
                  <CardDescription className="mt-2 font-medium">Développements spécifiques et intégrations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm font-semibold text-slate-700">
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Développements personnalisés</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Intégration à votre infrastructure</li>
                    <li className="flex items-center gap-3"><Check className="h-4 w-4 text-accent" /> Déploiement et accompagnement</li>
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                  <Button className="w-full bg-secondary text-primary hover:bg-secondary/80 font-bold" asChild>
                    <a href="mailto:contact@chiffrepro.com">Contacter l'équipe</a>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 max-w-6xl">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-2xl text-white mb-6 tracking-tight">
              <BrandLogo className="h-8 w-auto text-white" />
              <span>Chiffre Pro</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium">
              Le partenaire des entreprises ambitieuses. Maîtrisez votre chiffre d'affaires et structurez votre croissance avec professionnalisme.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Produit</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="#features" className="hover:text-white transition-colors">Fonctionnalités</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Tarifs</a></li>
              <li><a href="#download" className="hover:text-white transition-colors">Déploiement</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Documentation</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="#" className="hover:text-white transition-colors">Support technique</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Guides d'utilisation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Espace client</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="tel:+212698030397" className="flex items-center gap-3 hover:text-white transition-colors"><Phone className="h-4 w-4" /> +212 698 030 397</a></li>
              <li><a href="mailto:contact@chiffrepro.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="h-4 w-4" /> contact@chiffrepro.com</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4" /> Casablanca, Maroc</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl font-semibold">
          <div>&copy; {new Date().getFullYear()} Chiffre Pro. Tous droits réservés.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
