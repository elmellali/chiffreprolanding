import sys

with open(r'src\App.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace(
    '<a href="#features" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Fonctionnalités</a>',
    '<a href="#features" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Fonctionnalités</a>\n            <a href="#faq" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">FAQ</a>'
)

faq_section = '''        {/* FAQ Section */}
        <section id="faq" className="py-24 bg-white border-t border-slate-200">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className={`text-center mb-16 ${fadeUpClass}`}>
              <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">QUESTIONS FRÉQUENTES</div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Vous avez des questions ?</h2>
              <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">Trouvez rapidement les réponses concernant l'installation et l'utilisation de Chiffre Pro.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 ${fadeUpClass}`}>
                <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  Est-ce que mes données sont stockées sur le cloud ?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Non, Chiffre Pro est une application de bureau. Toutes vos données sont stockées localement sur votre ordinateur, vous garantissant une sécurité et une confidentialité absolues.</p>
              </div>

              <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 ${fadeUpClass} delay-100`}>
                <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  Dois-je payer pour les mises à jour ?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Avec nos forfaits mensuel et annuel, toutes les mises à jour fonctionnelles et de sécurité sont incluses sans frais supplémentaires pendant toute la durée de votre abonnement.</p>
              </div>

              <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 ${fadeUpClass}`}>
                <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  Puis-je personnaliser mes factures ?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Absolument ! Vous pouvez ajouter votre logo, modifier les couleurs, et ajuster les mentions légales pour que chaque facture reflète parfaitement l'identité de votre entreprise.</p>
              </div>

              <div className={`bg-slate-50 p-6 rounded-2xl border border-slate-100 ${fadeUpClass} delay-100`}>
                <h4 className="font-bold text-lg text-slate-900 mb-3 flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" /> 
                  Comment se passe l'installation ?
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">Le téléchargement inclut un assistant d'installation simple. En quelques clics, l'application est prête sur votre poste. L'activation de votre licence se fait lors du premier lancement.</p>
              </div>
            </div>
          </div>
        </section>
      </main>'''

content = content.replace('      </main>', faq_section)

whatsapp_button = '''
      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212698030397" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(37,211,102,0.4)] transition-all flex items-center justify-center group"
        aria-label="Contacter le support via WhatsApp"
      >
        <span className="absolute -top-12 right-0 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          Support WhatsApp
          <span className="absolute -bottom-1 right-6 w-2 h-2 bg-slate-900 rotate-45"></span>
        </span>
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  )
}'''
content = content.replace('    </div>\n  )\n}', whatsapp_button)

main_start = content.find('<main>')
main_end = content.find('</main>') + 7
main_content = content[main_start:main_end]

home_tsx = '''import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Users, CreditCard, PieChart, ShoppingCart, Lock, Shield, CheckCircle2, Download, Phone, Check, Star, Database, ReceiptText, Banknote } from "lucide-react"
import { InteractiveInvoice } from "../components/InteractiveInvoice"
import { ROICalculator } from "../components/ROICalculator"

export default function Home() {
  const fadeUpClass = "opacity-0 animate-fade-up"
  const fadeLeftClass = "opacity-0 animate-fade-left"
  return (
    ''' + main_content + '''
  )
}
'''

app_tsx = '''import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Button } from "./components/ui/button"
import { Download, Phone, Mail, MapPin } from "lucide-react"

import Home from './pages/Home'
import Support from './pages/Support'
import Guides from './pages/Guides'
import ClientSpace from './pages/ClientSpace'

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
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen text-slate-800 font-sans selection:bg-primary selection:text-primary-foreground">
      {pathname === '/' && (
        <div className="bg-blobs">
          <div className="blob blob-1"></div>
          <div className="blob blob-2"></div>
        </div>
      )}

      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-shadow shadow-sm border-b border-slate-100">
        <div className="container mx-auto flex h-[72px] items-center justify-between px-4 lg:px-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-slate-900 group tracking-tight">
            <div className="text-primary transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <BrandLogo className="h-8 w-auto" />
            </div>
            <span>Chiffre Pro</span>
          </Link>
          <nav className="hidden md:flex gap-1 text-sm font-medium ml-auto mr-8">
            <Link to="/#features" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Fonctionnalités</Link>
            <Link to="/#pricing" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Tarifs</Link>
            <Link to="/#faq" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">FAQ</Link>
            <Link to="/#download" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Télécharger</Link>
            <a href="#contact" className="px-4 py-2 rounded-lg text-slate-600 transition-colors hover:text-primary hover:bg-secondary">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <Button className="shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-transform font-semibold" asChild>
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/client" element={<ClientSpace />} />
        </Routes>
      </main>

''' + content[content.find('<footer'):]

with open(r'src\pages\Home.tsx', 'w', encoding='utf-8') as f:
    f.write(home_tsx)

with open(r'src\App.tsx', 'w', encoding='utf-8') as f:
    f.write(app_tsx)
