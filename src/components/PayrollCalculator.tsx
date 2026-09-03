import { useState } from 'react';
import { Copy, Check, ShieldCheck, Download, Sparkles } from 'lucide-react';

export function PayrollCalculator() {
  const [grossSalary, setGrossSalary] = useState<number>(8000);
  const [dependents, setDependents] = useState<number>(0);
  const [mode, setMode] = useState<'brut_to_net' | 'net_to_brut'>('brut_to_net');
  const [isCopied, setIsCopied] = useState(false);

  // Moroccan Payroll Calculation (Loi de Finances 2025 / 2026)
  const calculatePayroll = (brut: number, deps: number) => {
    const sbg = Math.max(0, brut || 0);
    
    // CNSS Employee: 4.48% with 6000 MAD ceiling
    const cnssBase = Math.min(sbg, 6000);
    const cnssEmployee = cnssBase * 0.0448;

    // AMO Employee: 2.26% without ceiling
    const amoEmployee = sbg * 0.0226;

    // Frais professionnels: 35% with 2916.67 MAD monthly ceiling (35000 MAD / year)
    const fraisPro = Math.min(sbg * 0.35, 2916.67);

    // Salaire Net Imposable (SNI)
    const sni = Math.max(0, sbg - cnssEmployee - amoEmployee - fraisPro);

    // IGR Barème 2025 / 2026 (Mensuel)
    let igrBrut = 0;
    let deductionTranche = 0;
    let rate = 0;

    if (sni <= 3333.33) {
      rate = 0;
      deductionTranche = 0;
    } else if (sni <= 5000) {
      rate = 0.10;
      deductionTranche = 333.33;
    } else if (sni <= 6666.67) {
      rate = 0.20;
      deductionTranche = 833.33;
    } else if (sni <= 8333.33) {
      rate = 0.30;
      deductionTranche = 1500.00;
    } else if (sni <= 15000) {
      rate = 0.34;
      deductionTranche = 1833.33;
    } else {
      rate = 0.37;
      deductionTranche = 2283.33;
    }

    igrBrut = Math.max(0, (sni * rate) - deductionTranche);

    // Family deductions: 30 MAD per dependent up to 6 dependents
    const familyDeduction = Math.min(deps, 6) * 30;
    const igrNet = Math.max(0, igrBrut - familyDeduction);

    // Net Salary
    const netSalary = sbg - cnssEmployee - amoEmployee - igrNet;

    // Employer Contributions (Estimates)
    const cnssFamily = sbg * 0.0640; // 6.40%
    const cnssSocial = cnssBase * 0.0898; // 8.98% (ceiling 6000)
    const amoEmployer = sbg * 0.0411; // 4.11%
    const taxeFormation = sbg * 0.0160; // 1.6%
    const employerCharges = cnssFamily + cnssSocial + amoEmployer + taxeFormation;
    const totalCostEmployer = sbg + employerCharges;

    return {
      sbg,
      cnssEmployee,
      amoEmployee,
      fraisPro,
      sni,
      rate: rate * 100,
      igrNet,
      netSalary,
      employerCharges,
      totalCostEmployer
    };
  };

  // Convert Net to Gross approximation
  const approximateGrossFromNet = (targetNet: number, deps: number) => {
    let low = targetNet;
    let high = targetNet * 2.5;
    let bestGross = targetNet;

    for (let i = 0; i < 30; i++) {
      const mid = (low + high) / 2;
      const res = calculatePayroll(mid, deps);
      if (Math.abs(res.netSalary - targetNet) < 0.5) {
        bestGross = mid;
        break;
      }
      if (res.netSalary < targetNet) {
        low = mid;
      } else {
        high = mid;
      }
      bestGross = mid;
    }
    return bestGross;
  };

  const currentGross = mode === 'brut_to_net' 
    ? grossSalary 
    : approximateGrossFromNet(grossSalary, dependents);

  const results = calculatePayroll(currentGross, dependents);

  const handleCopy = () => {
    const summary = `--- Simulation Paie Maroc (Conforme Loi de Finances 2025/2026) ---
Salaire Brut: ${results.sbg.toFixed(2)} MAD
CNSS Salarié (4.48%): -${results.cnssEmployee.toFixed(2)} MAD
AMO Salarié (2.26%): -${results.amoEmployee.toFixed(2)} MAD
Frais Professionnels (35%): ${results.fraisPro.toFixed(2)} MAD
IGR Retenu (${results.rate}%): -${results.igrNet.toFixed(2)} MAD
>>> SALAIRE NET À PAYER: ${results.netSalary.toFixed(2)} MAD
Coût Total Employeur: ${results.totalCostEmployer.toFixed(2)} MAD
Généré avec Chiffre Pro (chiffrepro.com)`;

    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto bg-slate-900 rounded-[2.5rem] p-6 sm:p-10 lg:p-14 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[140px] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/20 text-accent font-bold text-xs uppercase tracking-wider border border-accent/30 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            Barème Réformé &bull; Loi de Finances 2025/2026
          </div>
          <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Simulateur de Paie & Salaire Net Maroc
          </h3>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Calculez instantanément les cotisations CNSS, AMO et l'IGR selon la nouvelle réforme fiscale marocaine.
          </p>
        </div>

        <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setMode('brut_to_net')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'brut_to_net' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Du Brut vers Net
          </button>
          <button
            onClick={() => setMode('net_to_brut')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'net_to_brut' ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Du Net vers Brut
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="relative z-10 grid lg:grid-cols-12 gap-10 pt-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              {mode === 'brut_to_net' ? 'Salaire Brut Global Mensuel' : 'Salaire Net Souhaité Mensuel'}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="500"
                value={grossSalary || ''}
                onChange={(e) => setGrossSalary(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-800/90 border-2 border-slate-700 rounded-2xl px-5 py-4 text-2xl font-extrabold text-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 font-mono transition-all"
                placeholder="8000"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                MAD / mois
              </span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Montants Fréquents
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[4000, 6000, 10000, 15000].map((val) => (
                <button
                  key={val}
                  onClick={() => setGrossSalary(val)}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                    grossSalary === val
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {val.toLocaleString()} DH
                </button>
              ))}
            </div>
          </div>

          {/* Dependents */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Personnes à charge (Enfants / Conjoint)</span>
              <span className="text-primary font-bold">{dependents} ({dependents * 30} DH déductible)</span>
            </label>
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setDependents(num)}
                  className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                    dependents === num
                      ? 'bg-accent text-white border-accent shadow-sm'
                      : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Conformité Loi de Finances Maroc 2025/2026</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Intègre le relèvement du seuil d'exonération IGR (jusqu'à 40 000 DH/an), le plafond des frais pro à 35 000 DH et les nouveaux taux réduits.
            </p>
          </div>
        </div>

        {/* Right Output Card */}
        <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 sm:p-8 border border-slate-700 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Bulletin Récapitulatif
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? 'Copié !' : 'Copier le récapitulatif'}
            </button>
          </div>

          {/* Big Result Highlight */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary/30 via-slate-900 to-accent/20 border border-primary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Salaire Net Estimé (À Virer)
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono mt-1">
                {results.netSalary.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                <span className="text-lg font-bold text-accent">MAD</span>
              </div>
            </div>

            <div className="sm:text-right border-t sm:border-t-0 sm:border-l border-slate-700 pt-3 sm:pt-0 sm:pl-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Coût Total Entreprise
              </span>
              <div className="text-xl sm:text-2xl font-extrabold text-slate-200 font-mono mt-0.5">
                {results.totalCostEmployer.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}{' '}
                <span className="text-xs font-semibold text-slate-400">MAD</span>
              </div>
            </div>
          </div>

          {/* Breakdown Table */}
          <div className="space-y-3 divide-y divide-slate-700/60 text-sm">
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-300 font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span> Salaire Brut Global (SBG)
              </span>
              <span className="font-mono font-bold text-white">
                {results.sbg.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> Cotisation CNSS (4.48% plafonné)
              </span>
              <span className="font-mono font-semibold text-rose-300">
                - {results.cnssEmployee.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-400"></span> Cotisation AMO (2.26%)
              </span>
              <span className="font-mono font-semibold text-rose-300">
                - {results.amoEmployee.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span> Retenue IGR (Tranche {results.rate}%)
              </span>
              <span className="font-mono font-semibold text-amber-300">
                - {results.igrNet.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>

            <div className="flex justify-between items-center pt-3">
              <span className="text-slate-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400"></span> Charges Patronales CNSS + AMO (Estimées)
              </span>
              <span className="font-mono font-semibold text-indigo-300">
                + {results.employerCharges.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} DH
              </span>
            </div>
          </div>

          {/* CTA Box */}
          <div className="pt-4 border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400 font-medium">
              Envie d'éditer automatiquement les bulletins de paie et le livre de paie ?
            </div>
            <a
              href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe"
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-primary/30 hover:-translate-y-0.5 transition-all whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              Télécharger Chiffre Pro
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
