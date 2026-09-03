import { useState } from 'react';
import { Copy, Check, Download, AlertTriangle } from 'lucide-react';

export function PenaltyCalculator() {
  const [taxAmount, setTaxAmount] = useState<number>(15000);
  const [taxType, setTaxType] = useState<'tva' | 'is' | 'ir'>('tva');
  const [delayMonths, setDelayMonths] = useState<number>(2);
  const [declarationLate, setDeclarationLate] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState(false);

  // Moroccan CGI Calculation Rules (Article 208 CGI)
  // Pénalité de déclaration: 5% (<= 30 jours) ou 15% (> 30 jours)
  const declarationPenaltyRate = declarationLate ? (delayMonths <= 1 ? 0.05 : 0.15) : 0;
  const declarationPenalty = taxAmount * declarationPenaltyRate;

  // Majoration de paiement: 5% 1er mois + 0.5% par mois supplémentaire
  const paymentPenaltyRate = delayMonths > 0 ? 0.05 + Math.max(0, delayMonths - 1) * 0.005 : 0;
  const paymentPenalty = taxAmount * paymentPenaltyRate;

  const totalPenalties = declarationPenalty + paymentPenalty;
  const totalToPay = taxAmount + totalPenalties;

  const handleCopy = () => {
    const summary = `--- Simulation Pénalités Fiscaux DGI Maroc ---
Impôt Principal (${taxType.toUpperCase()}): ${taxAmount.toFixed(2)} MAD
Mois de retard: ${delayMonths} mois
Pénalité Déclaration (${(declarationPenaltyRate * 100).toFixed(0)}%): ${declarationPenalty.toFixed(2)} MAD
Majoration Paiement (${(paymentPenaltyRate * 100).toFixed(1)}%): ${paymentPenalty.toFixed(2)} MAD
Total Pénalités & Intérêts: ${totalPenalties.toFixed(2)} MAD
TOTAL À RÉGLER À LA DGI: ${totalToPay.toFixed(2)} MAD
Généré avec Chiffre Pro (chiffrepro.com)`;

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/20 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-400 font-bold text-xs uppercase tracking-wider border border-rose-500/30 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              Article 208 &bull; Code Général des Impôts Maroc
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Simulateur de Pénalités de Retard DGI (TVA & IS)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-medium mt-1">
              Estimez les pénalités et majorations légales en cas de déclaration ou paiement tardif de vos impôts au Maroc.
            </p>
          </div>

          <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
            {(['tva', 'is', 'ir'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setTaxType(type)}
                className={`px-4 py-1.5 text-xs font-bold rounded-xl transition-all uppercase ${
                  taxType === type ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-5">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Montant Principal de l'Impôt Dû ({taxType.toUpperCase()})
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={taxAmount || ''}
                  onChange={(e) => setTaxAmount(parseFloat(e.target.value) || 0)}
                  placeholder="15000"
                  className="w-full bg-slate-800/90 border-2 border-slate-700 rounded-2xl px-5 py-4 text-2xl font-black text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 font-mono transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                  MAD
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Durée du Retard</span>
                <span className="text-rose-400 font-bold">{delayMonths} mois de retard</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 6, 12].map((m) => (
                  <button
                    key={m}
                    onClick={() => setDelayMonths(m)}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      delayMonths === m
                        ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {m}m
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-white">Retard de Déclaration</div>
                <div className="text-[11px] text-slate-400">Déclaration non déposée dans les délais</div>
              </div>
              <input
                type="checkbox"
                checked={declarationLate}
                onChange={(e) => setDeclarationLate(e.target.checked)}
                className="w-5 h-5 rounded accent-primary cursor-pointer"
              />
            </div>
          </div>

          {/* Results Output */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                Décompte des Pénalités Légales
              </span>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {isCopied ? 'Copié !' : 'Copier'}
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-rose-950/60 via-slate-900 to-indigo-950/60 border border-rose-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Surcoût Total Pénalités & Majorations
                </span>
                <div className="text-3xl font-black text-rose-400 font-mono mt-1">
                  + {totalPenalties.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  <span className="text-sm font-bold text-white">MAD</span>
                </div>
              </div>

              <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-700 pt-3 sm:pt-0 sm:pl-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Total Final à Payer DGI
                </span>
                <div className="text-2xl font-black text-white font-mono mt-0.5">
                  {totalToPay.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                  <span className="text-xs font-semibold text-slate-400">MAD</span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 divide-y divide-slate-700/60 text-sm">
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-300 font-medium">Impôt Principal dû</span>
                <span className="font-mono font-bold text-white">
                  {taxAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400 font-medium">Pénalité Déclaration ({(declarationPenaltyRate * 100).toFixed(0)}%)</span>
                <span className="font-mono font-bold text-rose-300">
                  + {declarationPenalty.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
              </div>
              <div className="flex justify-between items-center pt-2.5">
                <span className="text-slate-400 font-medium">Majoration Paiement ({(paymentPenaltyRate * 100).toFixed(1)}%)</span>
                <span className="font-mono font-bold text-rose-300">
                  + {paymentPenalty.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-400 font-medium">
                Évitez tout retard avec les alertes TVA automatiques de Chiffre Pro.
              </div>
              <a
                href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe"
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-primary/30 transition-all whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" /> Télécharger Chiffre Pro
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
