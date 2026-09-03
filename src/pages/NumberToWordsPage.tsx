import { NumberToWordsMad } from "../components/NumberToWordsMad";
import { Sparkles, CheckCircle2, ShieldCheck, Download, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export default function NumberToWordsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Intro Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Outil Gratuit &bull; Dirhams Marocains (MAD)
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Convertisseur Montant en Toutes Lettres Dirhams (MAD)
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Convertissez instantanément vos montants en chiffres en toutes lettres pour vos chèques bancaires, lettres de change (LCN), factures et reçus au Maroc.
          </p>
        </div>

        {/* Live Interactive Converter */}
        <div className="mb-16">
          <NumberToWordsMad />
        </div>

        {/* Practical Rules Guide */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Règles d'écriture des Chèques au Maroc
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Pour éviter tout rejet ou falsification de chèque bancaire ou de LCN par les banques marocaines (Attijariwafa, BCP, BMCE, CIH, etc.) :
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700 font-medium">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Encadrez toujours le montant par des dièses : <strong># Vingt mille dirhams #</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>En cas de divergence entre chiffres et lettres, le montant en lettres fait légalement foi.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>Ne laissez aucun espace vide avant ou après l'écriture du montant.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-2">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Automatisez avec le Logiciel Chiffre Pro
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Ne perdez plus de temps à vérifier l'orthographe de vos totaux de factures ou de vos bordereaux de règlement.
            </p>
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <div className="text-xs font-bold text-slate-800">
                  Génération automatique du montant en lettres sur tous les devis & factures PDF
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <div className="text-xs font-bold text-slate-800">
                  Gestion des règlements chèques, LCN, virements et caisse espèces
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">
            Gagnez en sérénité et en professionnalisme
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
