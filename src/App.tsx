import { useState, useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from "./components/ui/button"
import { Download, Phone, Mail, MapPin, Menu, X, ChevronDown } from 'lucide-react'

const Home = lazy(() => import('./pages/Home'))
const Support = lazy(() => import('./pages/Support'))
const Guides = lazy(() => import('./pages/Guides'))
const GuideArticle = lazy(() => import('./pages/GuideArticle'))
const ClientSpace = lazy(() => import('./pages/ClientSpace'))
const AdminSecret = lazy(() => import('./pages/AdminSecret').then(module => ({ default: module.AdminSecret })))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const TradeTemplatePage = lazy(() => import('./pages/TradeTemplatePage'))
const IceValidator = lazy(() => import('./pages/IceValidator'))
const TaxSimulator = lazy(() => import('./pages/TaxSimulator'))
const FreeInvoiceGenerator = lazy(() => import('./pages/FreeInvoiceGenerator'))
const PayrollSimulatorPage = lazy(() => import('./pages/PayrollSimulatorPage'))

const BrandLogo = ({ className = "h-8 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 120 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="10" y="50" width="20" height="40" fill="currentColor" />
    <rect x="35" y="35" width="20" height="55" fill="currentColor" />
    <rect x="60" y="20" width="20" height="70" fill="currentColor" />
    <path d="M5 70 L35 45 L60 25 L85 5" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M60 5 H85 V30" stroke="#F97316" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function AppContent() {
  const { pathname, hash } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setToolsOpen(false);
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-primary selection:text-primary-foreground">
      {pathname === '/' && (
        <div className="bg-blobs pointer-events-none">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md transition-shadow shadow-sm border-b border-slate-100">
        <div className="container mx-auto flex h-[74px] items-center justify-between px-4 lg:px-8">
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 font-black text-2xl text-slate-900 group tracking-tight">
            <div className="text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <BrandLogo className="h-8 w-auto" />
            </div>
            <span>Chiffre Pro</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-1 text-sm font-semibold ml-auto mr-6 items-center">
            <Link to="/generateur-facture-gratuit" className="px-3 py-2 rounded-xl text-primary font-bold transition-colors hover:bg-primary/10">
              Créer Facture
            </Link>
            <Link to="/#features" className="px-3 py-2 rounded-xl text-slate-600 transition-colors hover:text-primary hover:bg-slate-100">
              Fonctionnalités
            </Link>
            <Link to="/#paie" className="px-3 py-2 rounded-xl text-slate-600 transition-colors hover:text-primary hover:bg-slate-100 flex items-center gap-1.5">
              <span>Paie & RH</span>
              <span className="bg-accent/10 text-accent text-[10px] font-extrabold px-1.5 py-0.5 rounded-md">2026</span>
            </Link>
            
            {/* Tools Dropdown */}
            <div className="relative group">
              <button 
                className="px-3 py-2 rounded-xl text-slate-600 transition-colors hover:text-primary hover:bg-slate-100 flex items-center gap-1"
                onClick={() => setToolsOpen(!toolsOpen)}
                onMouseEnter={() => setToolsOpen(true)}
              >
                <span>Outils Gratuits</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>

              <div 
                className={`absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 space-y-1 transition-all ${
                  toolsOpen ? 'opacity-100 visible translate-y-1' : 'opacity-0 invisible pointer-events-none'
                }`}
                onMouseLeave={() => setToolsOpen(false)}
              >
                <Link to="/generateur-facture-gratuit" onClick={closeMenu} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold text-xs">FA</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Générateur de Facture</div>
                    <div className="text-[11px] text-slate-400">PDF instantané avec ICE</div>
                  </div>
                </Link>
                <Link to="/outils/simulateur-paie-maroc" onClick={closeMenu} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 font-bold text-xs">RH</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Simulateur Paie Maroc</div>
                    <div className="text-[11px] text-slate-400">CNSS, AMO & IGR 2026</div>
                  </div>
                </Link>
                <Link to="/outils/validateur-ice" onClick={closeMenu} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">ICE</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Validateur ICE</div>
                    <div className="text-[11px] text-slate-400">Contrôle clé & 15 chiffres</div>
                  </div>
                </Link>
                <Link to="/outils/simulateur-statut-fiscal" onClick={closeMenu} className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">IS</div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Simulateur Fiscal</div>
                    <div className="text-[11px] text-slate-400">SARL vs Auto-entrepreneur</div>
                  </div>
                </Link>
              </div>
            </div>

            <Link to="/#pricing" className="px-3 py-2 rounded-xl text-slate-600 transition-colors hover:text-primary hover:bg-slate-100">
              Tarifs
            </Link>
            <Link to="/blog" className="px-3 py-2 rounded-xl text-slate-600 transition-colors hover:text-primary hover:bg-slate-100">
              Blog
            </Link>
            <Link to="/client" className="px-3 py-2 rounded-xl text-slate-700 font-bold transition-colors hover:bg-slate-100">
              Espace Client
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <Button className="shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform font-extrabold rounded-xl" asChild>
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </a>
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 shadow-xl space-y-4">
            <nav className="flex flex-col space-y-2 font-medium text-slate-700">
              <Link to="/generateur-facture-gratuit" onClick={closeMenu} className="p-2.5 rounded-xl bg-primary/10 text-primary font-bold">
                Créer une Facture (Gratuit)
              </Link>
              <Link to="/outils/simulateur-paie-maroc" onClick={closeMenu} className="p-2.5 rounded-xl bg-accent/10 text-accent font-bold">
                Simulateur Paie & Salaire Net 2026
              </Link>
              <Link to="/#features" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Fonctionnalités ERP
              </Link>
              <Link to="/outils/validateur-ice" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Validateur ICE Maroc
              </Link>
              <Link to="/outils/simulateur-statut-fiscal" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Simulateur Fiscal SARL vs AE
              </Link>
              <Link to="/#pricing" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Tarifs & Licences
              </Link>
              <Link to="/blog" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Blog
              </Link>
              <Link to="/guides" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Guides d'utilisation
              </Link>
              <Link to="/support" onClick={closeMenu} className="p-2.5 rounded-xl hover:bg-slate-100 font-semibold">
                Support Technique
              </Link>
              <Link to="/client" onClick={closeMenu} className="p-2.5 rounded-xl text-slate-700 font-bold">
                Espace Client & Activation
              </Link>
            </nav>
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Button className="w-full shadow-lg font-bold rounded-xl" asChild>
                <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger pour Windows
                </a>
              </Button>
              <a
                href="https://wa.me/212698030397"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#25D366] text-white font-bold text-center rounded-xl text-sm shadow-md"
              >
                Contact WhatsApp (+212 698 030 397)
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main>
        <Suspense fallback={<div className="flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/support" element={<Support />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:slug" element={<GuideArticle />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/modeles/:slug" element={<TradeTemplatePage />} />
            <Route path="/outils/validateur-ice" element={<IceValidator />} />
            <Route path="/outils/simulateur-statut-fiscal" element={<TaxSimulator />} />
            <Route path="/outils/simulateur-paie-maroc" element={<PayrollSimulatorPage />} />
            <Route path="/generateur-facture-gratuit" element={<FreeInvoiceGenerator />} />
            <Route path="/outils/generateur-facture" element={<FreeInvoiceGenerator />} />
            <Route path="/client" element={<ClientSpace />} />
            <Route path="/admin-secret" element={<AdminSecret />} />
          </Routes>
        </Suspense>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-12 max-w-6xl">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 font-black text-2xl text-white mb-6 tracking-tight">
              <BrandLogo className="h-8 w-auto text-white" />
              <span>Chiffre Pro</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed font-medium mb-6">
              Le partenaire logiciel des entreprises au Maroc. Facturation conforme ICE, Module Paie & RH 2026, gestion des stocks et conformité DGI 100% hors-ligne.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/142823902" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://www.facebook.com/chiffrepro" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/chiffrepro/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Outils Fiscaux & Paie</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/generateur-facture-gratuit" className="hover:text-white transition-colors text-primary font-bold">Générateur Facture Gratuit</Link></li>
              <li><Link to="/outils/simulateur-paie-maroc" className="hover:text-white transition-colors text-accent font-bold">Simulateur Paie Maroc 2026</Link></li>
              <li><Link to="/outils/validateur-ice" className="hover:text-white transition-colors text-emerald-400">Validateur ICE Maroc</Link></li>
              <li><Link to="/outils/simulateur-statut-fiscal" className="hover:text-white transition-colors text-indigo-400">Simulateur Statut Fiscal 2026</Link></li>
              <li><Link to="/modeles/btp" className="hover:text-white transition-colors">Modèles Facture BTP & Travaux</Link></li>
              <li><Link to="/modeles/transport" className="hover:text-white transition-colors">Modèles Facture Transport</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Modules Logiciel</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/#features" className="hover:text-white transition-colors">Ventes & Facturation ICE</Link></li>
              <li><Link to="/#paie" className="hover:text-white transition-colors">Module Paie & RH Maroc</Link></li>
              <li><Link to="/#features" className="hover:text-white transition-colors">Stocks Multi-dépôts (CUMP)</Link></li>
              <li><Link to="/#features" className="hover:text-white transition-colors">Achats & Fournisseurs</Link></li>
              <li><Link to="/#pricing" className="hover:text-white transition-colors">Tarifs & Licences</Link></li>
              <li><Link to="/guides" className="hover:text-white transition-colors">Guides d'utilisation & FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Contact & Support</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><a href="tel:+212698030397" className="flex items-center gap-3 hover:text-white transition-colors"><Phone className="h-4 w-4 text-accent" /> +212 698 030 397</a></li>
              <li><a href="mailto:contact@chiffrepro.com" className="flex items-center gap-3 hover:text-white transition-colors"><Mail className="h-4 w-4 text-accent" /> contact@chiffrepro.com</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-accent" /> Casablanca, Maroc</li>
              <li className="pt-2"><Link to="/client" className="inline-block px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors">Espace Client & Licences</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl font-semibold">
          <div>&copy; {new Date().getFullYear()} Chiffre Pro. Tous droits réservés.</div>
          <div className="flex gap-6">
            <span className="text-slate-500">100% Conforme Code Général des Impôts & Code du Travail Maroc</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212698030397" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center group"
        aria-label="Contacter le support via WhatsApp"
      >
        <span className="absolute -top-12 right-0 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Support WhatsApp Direct
          <span className="absolute -bottom-1 right-6 w-2 h-2 bg-slate-900 rotate-45"></span>
        </span>
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}
