import { PayrollCalculator } from "../components/PayrollCalculator";
import { ShieldCheck, CheckCircle2, Download, BookOpen, Users, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function PayrollSimulatorPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumb & Intro */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Outil Gratuit Maroc &bull; 100% Conforme DGI & CNSS
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Simulateur Salaire Brut & Net Maroc (2025 / 2026)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Estimez avec précision les retenues sur salaire au Maroc : cotisations CNSS (4.48%), AMO (2.26%), déduction des frais professionnels (35%) et barème progressif de l'Impôt sur le Revenu (IGR).
          </p>
        </div>

        {/* The Live Interactive Calculator */}
        <div className="mb-16">
          <PayrollCalculator />
        </div>

        {/* Explanatory Guide Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Comprendre le Calcul de la Paie au Maroc
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Le calcul du salaire net au Maroc s'effectue en plusieurs étapes réglementées par le Code du Travail et le Code Général des Impôts (CGI) :
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Salaire Brut Global (SBG)</strong> : Salaire de base + primes + heures supplémentaires.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Cotisation CNSS</strong> : 4.48% plafonné à 6 000 DH (soit 268.80 DH max).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Cotisation AMO</strong> : 2.26% sans aucun plafonnement.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Frais Professionnels</strong> : Déduction forfaitaire de 35% plafonnée à 35 000 DH/an.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Barème IGR 2025/2026</strong> : Taux d'imposition progressif (0%, 10%, 20%, 30%, 34%, 37%).</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-2">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Gagnez du temps avec le Module Paie Chiffre Pro
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Ne calculez plus vos salaires manuellement sur Excel au risque d'erreurs lors des contrôles CNSS ou fiscaux.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div className="text-xs font-bold text-slate-800">
                  Édition en 1 clic des Bulletins de Paie et du Livre de Paie légal
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div className="text-xs font-bold text-slate-800">
                  Télé-déclaration Damancom et préparation de l'État 9421
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <Users className="w-5 h-5 text-accent" />
                <div className="text-xs font-bold text-slate-800">
                  Suivi des avances sur salaire, acomptes et solde des congés payés
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Download Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Passez à la gestion automatisée de votre entreprise
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-medium">
            Facturation conforme ICE, Devis, Bons de livraison, Gestion des Stocks et Module Paie RH complet dans un seul logiciel hors-ligne sur votre PC.
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
