import { useState } from 'react';
import { Copy, Check, Sparkles, FileText, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

function numberToFrenchWords(n: number): string {
  if (n === 0) return 'zéro';

  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf'];
  const teens = ['dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', 'dix', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingts', 'quatre-vingt-dix'];

  function convertChunk(num: number): string {
    let result = '';

    const hundred = Math.floor(num / 100);
    const remainder = num % 100;

    if (hundred > 0) {
      if (hundred === 1) {
        result += 'cent ';
      } else {
        result += units[hundred] + ' cent' + (remainder === 0 ? 's ' : ' ');
      }
    }

    if (remainder > 0) {
      if (remainder < 10) {
        result += units[remainder];
      } else if (remainder < 20) {
        result += teens[remainder - 10];
      } else if (remainder < 70) {
        const ten = Math.floor(remainder / 10);
        const unit = remainder % 10;
        if (unit === 1 && ten !== 8) {
          result += tens[ten] + ' et un';
        } else if (unit > 0) {
          result += tens[ten] + '-' + units[unit];
        } else {
          result += tens[ten];
        }
      } else if (remainder < 80) {
        const unit = remainder % 10;
        if (unit === 1) {
          result += 'soixante et onze';
        } else {
          result += 'soixante-' + teens[unit];
        }
      } else if (remainder < 90) {
        const unit = remainder % 10;
        if (unit > 0) {
          result += 'quatre-vingt-' + units[unit];
        } else {
          result += 'quatre-vingts';
        }
      } else {
        const unit = remainder % 10;
        result += 'quatre-vingt-' + teens[unit];
      }
    }

    return result.trim();
  }

  const billions = Math.floor(n / 1000000000);
  const millions = Math.floor((n % 1000000000) / 1000000);
  const thousands = Math.floor((n % 1000000) / 1000);
  const unitsPart = n % 1000;

  let words = '';

  if (billions > 0) {
    words += (billions === 1 ? 'un milliard ' : convertChunk(billions) + ' milliards ');
  }
  if (millions > 0) {
    words += (millions === 1 ? 'un million ' : convertChunk(millions) + ' millions ');
  }
  if (thousands > 0) {
    words += (thousands === 1 ? 'mille ' : convertChunk(thousands) + ' mille ');
  }
  if (unitsPart > 0) {
    words += convertChunk(unitsPart);
  }

  return words.trim();
}

export function convertMadAmount(amount: number): { french: string; checkFormat: string } {
  if (isNaN(amount) || amount <= 0) {
    return {
      french: "Zéro dirham et zéro centime",
      checkFormat: "# Zéro dirham et 00/100 #"
    };
  }

  const dirhams = Math.floor(amount);
  const centimes = Math.round((amount - dirhams) * 100);

  const dirhamsWords = numberToFrenchWords(dirhams);
  const dirhamUnit = dirhams > 1 ? 'dirhams' : 'dirham';

  let french = `${dirhamsWords} ${dirhamUnit}`;

  if (centimes > 0) {
    const centimesWords = numberToFrenchWords(centimes);
    const centimeUnit = centimes > 1 ? 'centimes' : 'centime';
    french += ` et ${centimesWords} ${centimeUnit}`;
  }

  // Capitalize first letter
  french = french.charAt(0).toUpperCase() + french.slice(1);

  const checkFormat = `# ${french} #`;

  return { french, checkFormat };
}

export function NumberToWordsMad() {
  const [amount, setAmount] = useState<number>(18500.50);
  const [isCopied, setIsCopied] = useState(false);

  const { french, checkFormat } = convertMadAmount(amount);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-slate-200/80 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="relative z-10 space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Outil Gratuit &bull; Chèques & Factures Maroc
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Convertisseur de Montant en Lettres (MAD)
            </h2>
          </div>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Saisissez le montant en chiffres (Dirhams marocains)
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              step="0.01"
              value={amount || ''}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              placeholder="18500.50"
              className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-6 py-4 text-2xl sm:text-3xl font-black text-slate-900 focus:outline-none focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all font-mono"
            />
            <span className="absolute right-6 top-1/2 -translate-y-1/2 text-sm sm:text-base font-extrabold text-slate-400">
              DH (MAD)
            </span>
          </div>
        </div>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-2">Exemples rapides :</span>
          {[1500, 5000, 12750.80, 50000, 120000].map((val) => (
            <button
              key={val}
              onClick={() => setAmount(val)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
            >
              {val.toLocaleString()} DH
            </button>
          ))}
        </div>

        {/* Result Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Montant en toutes lettres
            </span>
            <button
              onClick={() => handleCopy(french)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all backdrop-blur-sm"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {isCopied ? 'Copié !' : 'Copier'}
            </button>
          </div>

          <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-relaxed font-sans">
            "{french}"
          </div>

          {/* Cheque format */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-300">
            <div>
              <span className="font-bold text-slate-400">Format Recommandé Chèque Bancaire :</span>
              <div className="font-mono text-sm font-bold text-accent mt-0.5">{checkFormat}</div>
            </div>
            <button
              onClick={() => handleCopy(checkFormat)}
              className="text-xs font-bold text-slate-300 hover:text-white underline underline-offset-4"
            >
              Copier format chèque
            </button>
          </div>
        </div>

        {/* CTA Integration */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Automatisez vos factures et chèques</h4>
              <p className="text-xs text-slate-500 font-medium">Chiffre Pro convertit automatiquement tous vos totaux en lettres.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to="/generateur-facture-gratuit"
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 text-xs font-extrabold flex items-center gap-1.5 transition-all w-full sm:w-auto justify-center"
            >
              Créer une Facture
            </Link>
            <a
              href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe"
              className="px-4 py-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 text-xs font-extrabold flex items-center gap-1.5 shadow-md shadow-primary/20 transition-all w-full sm:w-auto justify-center whitespace-nowrap"
            >
              <Download className="w-4 h-4" /> Logiciel PC
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
