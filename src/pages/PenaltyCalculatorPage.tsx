import { PenaltyCalculator } from "../components/PenaltyCalculator";
import { AlertTriangle, CheckCircle2, ShieldCheck, Download, BookOpen, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function PenaltyCalculatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" />
            Fiscalité Marocaine &bull; CGI 2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Calculateur de Pénalités et Majorations de Retard DGI
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Calculez les pénalités d'assiette et majorations de recouvrement en cas de retard sur vos déclarations de TVA, IS ou IR au Maroc selon l'article 208 du CGI.
          </p>
        </div>

        {/* Live Simulator */}
        <div className="mb-16">
          <PenaltyCalculator />
        </div>

        {/* Guide */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Délais Légaux de Déclaration au Maroc
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Pour éviter les sanctions de la Direction Générale des Impôts (DGI) :
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>TVA Mensuelle</strong> : Déclaration & paiement avant le 20 du mois suivant.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>TVA Trimestrielle</strong> : Déclaration avant le 20 du mois suivant le trimestre échu.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Acomptes IS</strong> : Avant le 31 mars, 30 juin, 30 septembre et 31 décembre.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Automatisez vos Échéances avec Chiffre Pro
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Chiffre Pro calcule automatiquement votre TVA collectée et déductible en temps réel.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div className="text-xs font-bold text-slate-800">
                  Rapports de TVA conformes au régime encaissement / débit
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div className="text-xs font-bold text-slate-800">
                  Alertes automatiques avant la date limite de déclaration
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Ne payez plus jamais de pénalités fiscales
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
            Pilotez votre chiffre d'affaires, vos stocks, vos fiches de paie et votre TVA en toute sérénité.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="h-14 px-8 text-base bg-white text-slate-900 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg" asChild>
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                <Download className="mr-2 h-5 w-5 text-primary" /> Télécharger Chiffre Pro
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base border-white/30 text-white hover:bg-white/10 font-extrabold rounded-2xl" asChild>
              <Link to="/#pricing">Voir les tarifs et licences</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
