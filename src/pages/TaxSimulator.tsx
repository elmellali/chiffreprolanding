import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Calculator, ArrowRight, CheckCircle2, DollarSign, ShieldAlert } from 'lucide-react';

export default function TaxSimulator() {
  const [revenue, setRevenue] = useState(350000);
  const [expenses, setExpenses] = useState(120000);
  const [activityType, setActivityType] = useState<'service' | 'commerce'>('service');

  useEffect(() => {
    document.title = "Simulateur Statut Fiscal Maroc 2026 (SARL vs Auto-Entrepreneur) | Chiffre Pro";
  }, []);

  const profit = Math.max(0, revenue - expenses);

  // Auto-entrepreneur calculation
  // Commerce: 1% CA up to 500k; Service: 2% CA up to 200k (with overage taxed or ceiling)
  const aeTaxRate = activityType === 'commerce' ? 0.01 : 0.02;
  const aeTaxAmount = revenue * aeTaxRate;
  const aeNetIncome = profit - aeTaxAmount;

  // SARL (IS - Impôt sur les Sociétés 2026)
  // Progressive rates: <= 300,000 DH: 10% (or 20% by 2026 reform step), Cotisation Minimale 0.5% (or 0.25% min 3000 DH)
  let isRate = 0.125; // 2026 transition rate
  if (profit > 1000000) {
    isRate = 0.35;
  } else if (profit > 300000) {
    isRate = 0.20;
  }
  const cotisationMinimale = Math.max(3000, revenue * 0.005);
  const isTaxAmount = Math.max(cotisationMinimale, profit * isRate);
  const sarlNetIncome = profit - isTaxAmount;

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1180px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span className="text-slate-400">Outils Fiscaux</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Simulateur Statut Fiscal 2026</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4">
            <Calculator className="w-3.5 h-3.5" /> Barème Fiscal Maroc 2026
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Simulateur Fiscal : <span className="text-gradient">Auto-Entrepreneur vs SARL</span>
          </h1>
          <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
            Calculez précisément vos impôts prévisionnels (IS, IR, Cotisation Minimale) selon votre chiffre d'affaires et vos charges réelles au Maroc.
          </p>
        </div>

        {/* Simulator Dashboard */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
              <DollarSign className="w-5 h-5 text-primary" /> Vos Chiffres Annuels (DH)
            </h2>

            {/* Type of Activity */}
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Secteur d'activité</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setActivityType('service')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    activityType === 'service'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Prestation de Services
                </button>
                <button
                  type="button"
                  onClick={() => setActivityType('commerce')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                    activityType === 'commerce'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Commerce & Industrie
                </button>
              </div>
            </div>

            {/* Revenue Slider */}
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
                <span>Chiffre d'affaires HT</span>
                <span className="text-primary font-mono">{revenue.toLocaleString('fr-FR')} DH</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="25000"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>50 000 DH</span>
                <span>2 000 000 DH</span>
              </div>
            </div>

            {/* Expenses Slider */}
            <div>
              <div className="flex justify-between text-sm font-bold text-slate-800 mb-2">
                <span>Charges & Achats déductibles</span>
                <span className="text-slate-600 font-mono">{expenses.toLocaleString('fr-FR')} DH</span>
              </div>
              <input
                type="range"
                min="0"
                max={Math.max(50000, revenue * 0.9)}
                step="10000"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>0 DH</span>
                <span>{(revenue * 0.9).toLocaleString('fr-FR')} DH</span>
              </div>
            </div>

            {/* Profit Summary */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase">Bénéfice Brut Réel</span>
              <span className="text-lg font-extrabold text-slate-900 font-mono">{profit.toLocaleString('fr-FR')} DH</span>
            </div>
          </div>

          {/* Comparison Cards Column */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            {/* Auto-Entrepreneur Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3 py-1 rounded-full uppercase">
                  Auto-Entrepreneur
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3 mb-1">Régime Forfaitaire</h3>
                <p className="text-xs text-slate-500 mb-6">Taxé sur le chiffre d'affaires brut (non déductible)</p>

                <div className="space-y-4 mb-6">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-400 font-medium">Impôt sur le CA ({aeTaxRate * 100}%)</div>
                    <div className="text-xl font-bold text-amber-700">{aeTaxAmount.toLocaleString('fr-FR')} DH</div>
                  </div>
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-400 font-medium">Revenu Net Estimé</div>
                    <div className="text-2xl font-extrabold text-slate-900">{aeNetIncome.toLocaleString('fr-FR')} DH</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Comptabilité ultra-simplifiée</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exonération de TVA</span>
                  </li>
                  {revenue > (activityType === 'commerce' ? 500000 : 200000) && (
                    <li className="flex items-center gap-1.5 text-red-600 font-bold">
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Dépassement du plafond légal</span>
                    </li>
                  )}
                </ul>
              </div>

              <div className="text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-xl text-center">
                Plafond CA : {activityType === 'commerce' ? '500 000 DH' : '200 000 DH'}
              </div>
            </div>

            {/* SARL / IS Card */}
            <div className="bg-white rounded-3xl p-6 border-2 border-primary shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                Recommandé
              </div>
              <div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase">
                  SARL / SARL AU
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-3 mb-1">Impôt sur les Sociétés</h3>
                <p className="text-xs text-slate-500 mb-6">Taxé sur le bénéfice net réel (charges déduites)</p>

                <div className="space-y-4 mb-6">
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-400 font-medium">Montant IS Prévisionnel</div>
                    <div className="text-xl font-bold text-primary">{Math.round(isTaxAmount).toLocaleString('fr-FR')} DH</div>
                  </div>
                  <div className="border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-400 font-medium">Bénéfice Net Société</div>
                    <div className="text-2xl font-extrabold text-slate-900">{Math.round(sarlNetIncome).toLocaleString('fr-FR')} DH</div>
                  </div>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 mb-6">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Déduction 100% de toutes les charges</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Récupération de la TVA déductible</span>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Protection du patrimoine personnel</span>
                  </li>
                </ul>
              </div>

              <Button size="sm" className="w-full font-bold shadow-md" asChild>
                <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                  Gérer ma SARL avec Chiffre Pro
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Feature Box */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl p-8 lg:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-extrabold mb-3">Maîtrisez votre fiscalité sans stress</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Chiffre Pro calcule automatiquement votre TVA collectée, votre TVA déductible et génère les relevés d'achats pour votre expert-comptable en 1 clic.
            </p>
          </div>
          <Button size="lg" className="h-14 px-8 font-bold bg-primary hover:bg-primary/90 shrink-0" asChild>
            <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
              Télécharger Gratuitement <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
