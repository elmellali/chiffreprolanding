import { useState } from 'react';
import { Calculator, Copy, Check, Sparkles, Building2 } from 'lucide-react';

export function TaxCalculator() {
  const [amount, setAmount] = useState<number>(10000);
  const [calculationMode, setCalculationMode] = useState<'ht_to_ttc' | 'ttc_to_ht'>('ht_to_ttc');
  const [vatRate, setVatRate] = useState<number>(20);
  const [isCopied, setIsCopied] = useState(false);

  // Calculations
  const rateMultiplier = vatRate / 100;
  let ht = 0;
  let tva = 0;
  let ttc = 0;

  if (calculationMode === 'ht_to_ttc') {
    ht = amount || 0;
    tva = ht * rateMultiplier;
    ttc = ht + tva;
  } else {
    ttc = amount || 0;
    ht = ttc / (1 + rateMultiplier);
    tva = ttc - ht;
  }

  const handleCopy = () => {
    const summary = `Montant HT: ${ht.toFixed(2)} MAD | TVA (${vatRate}%): ${tva.toFixed(2)} MAD | Total TTC: ${ttc.toFixed(2)} MAD (Calculé via ChiffrePro.com)`;
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 rounded-[2.5rem] p-8 md:p-14 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        {/* Left column: Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 text-accent font-bold text-xs uppercase tracking-wider border border-accent/30">
            <Sparkles className="w-3.5 h-3.5" />
            Outil Gratuit &bull; Fiscalité Marocaine
          </div>

          <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Simulateur Express TVA & Facturation
          </h3>
          <p className="text-slate-300 text-sm font-medium leading-relaxed">
            Calculez en un instant vos montants selon les taux de TVA légaux au Maroc (Code Général des Impôts). Intégré par défaut dans Chiffre Pro.
          </p>

          {/* Mode Switcher */}
          <div className="flex bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700 max-w-sm">
            <button
              onClick={() => setCalculationMode('ht_to_ttc')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                calculationMode === 'ht_to_ttc' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Partir du Montant HT
            </button>
            <button
              onClick={() => setCalculationMode('ttc_to_ht')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                calculationMode === 'ttc_to_ht' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Partir du Montant TTC
            </button>
          </div>

          {/* Input Amount */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              {calculationMode === 'ht_to_ttc' ? 'Montant Hors Taxes (HT)' : 'Montant Toutes Taxes Comprises (TTC)'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="100"
                value={amount || ''}
                onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800/90 border-2 border-slate-700 rounded-2xl px-5 py-4 text-2xl font-extrabold text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 font-mono transition-all"
                placeholder="10000"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                DH (MAD)
              </span>
            </div>
          </div>

          {/* TVA Rate Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Taux de TVA Officiel
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[
                { rate: 20, label: '20% (Standard)' },
                { rate: 14, label: '14% (Services)' },
                { rate: 10, label: '10% (Hôtellerie)' },
                { rate: 7, label: '7% (Eau/Élec)' },
                { rate: 0, label: '0% (Exonéré)' }
              ].map((item) => (
                <button
                  key={item.rate}
                  type="button"
                  onClick={() => setVatRate(item.rate)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    vatRate === item.rate
                      ? 'bg-accent border-accent text-white font-bold shadow-lg shadow-accent/20'
                      : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500 font-semibold'
                  }`}
                >
                  <span className="block text-sm md:text-base font-extrabold">{item.rate}%</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Live Ticket Result */}
        <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 relative border border-slate-100">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Calculator className="w-5 h-5" />
              Résultat Fiscal Certifié
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
              CGI Maroc
            </span>
          </div>

          <div className="space-y-3 font-medium text-sm">
            <div className="flex justify-between items-center text-slate-600">
              <span>Montant Net HT :</span>
              <span className="font-mono text-base font-bold text-slate-900">
                {ht.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                TVA ({vatRate}%) :
              </span>
              <span className="font-mono text-base font-bold text-accent">
                + {tva.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
              <span className="font-extrabold text-slate-900 text-base">Total Net à Payer (TTC) :</span>
              <span className="font-mono text-2xl font-black text-primary">
                {ttc.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs text-slate-500 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <Building2 className="w-3.5 h-3.5 text-primary" />
              Conformité Facture Maroc :
            </div>
            <p>ICE, Identifiant Fiscal (IF), RC et Patente configurables en 1 clic dans Chiffre Pro.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              {isCopied ? 'Copié !' : 'Copier le récapitulatif'}
            </button>
            <a
              href="https://chiffrepro.com/downloads"
              className="py-3 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              Créer ma facture &rarr;
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
