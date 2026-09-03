import { Check, X, ShieldCheck } from 'lucide-react';

export function ComparisonTable() {
  const features = [
    {
      name: "Conformité Fiscale Marocaine (ICE, IF, RC, TVA, DGI)",
      chiffrepro: true,
      excel: "Manuel & risqué",
      foreignCloud: "Inadapté / Complexe",
      highlight: true
    },
    {
      name: "Module Paie & RH Maroc (CNSS, AMO, IGR 2025/2026, Fiches de paie)",
      chiffrepro: true,
      excel: "Formules lourdes",
      foreignCloud: "Incompatible droit social Maroc",
      highlight: true
    },
    {
      name: "Sécurité & Confidentialité des Données",
      chiffrepro: "100% Hors-ligne sur votre PC",
      excel: "Fichiers non chiffrés",
      foreignCloud: "Hébergé à l'étranger",
      highlight: true
    },
    {
      name: "Cycle Commercial Complet (Devis, Factures, BL, BC, Avoirs)",
      chiffrepro: true,
      excel: false,
      foreignCloud: "Surcoût par module",
    },
    {
      name: "Gestion des Stocks Multi-dépôts & Valorisation CUMP",
      chiffrepro: true,
      excel: "Erreurs fréquentes",
      foreignCloud: true,
    },
    {
      name: "Rapports de TVA (Encaissement / Débit) & États Financiers P&L",
      chiffrepro: true,
      excel: "Calculs manuels",
      foreignCloud: "Paramétrage expert",
    },
    {
      name: "Tarification en Dirhams (MAD) & Zéro Frais Cachés",
      chiffrepro: "Prix transparent en MAD",
      excel: "Abonnement US/EU",
      foreignCloud: "Abonnements $ / € coûteux",
      highlight: true
    },
    {
      name: "Vitesse d'Exécution & Zéro Dépendance Internet",
      chiffrepro: "Instantané & 100% Offline",
      excel: "Lenteur si gros classeur",
      foreignCloud: "Bloqué sans connexion",
    },
    {
      name: "Support Technique Dédié au Maroc (WhatsApp & Téléphone)",
      chiffrepro: true,
      excel: false,
      foreignCloud: "Tickets en anglais par email",
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-6 px-4 text-base font-extrabold text-slate-900 w-2/5">
                  Fonctionnalités & Garanties
                </th>
                <th className="py-6 px-4 text-center bg-primary/5 rounded-t-3xl border-t-2 border-x-2 border-primary w-1/5">
                  <div className="inline-block px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-wider rounded-full mb-1">
                    Recommandé
                  </div>
                  <div className="text-xl font-extrabold text-primary">Chiffre Pro</div>
                  <div className="text-xs text-slate-500 font-semibold">ERP & Paie 100% Maroc</div>
                </th>
                <th className="py-6 px-4 text-center text-slate-700 w-1/5">
                  <div className="text-lg font-bold">Fichiers Excel</div>
                  <div className="text-xs text-slate-400 font-medium">Bricolage classique</div>
                </th>
                <th className="py-6 px-4 text-center text-slate-700 w-1/5">
                  <div className="text-lg font-bold">Logiciels Cloud Étrangers</div>
                  <div className="text-xs text-slate-400 font-medium">SaaS International</div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {features.map((item, idx) => (
                <tr key={idx} className={item.highlight ? "bg-slate-50/60 hover:bg-slate-100/60" : "hover:bg-slate-50/30"}>
                  <td className="py-5 px-4 font-bold text-slate-800 flex items-center gap-2">
                    {item.highlight && <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />}
                    <span>{item.name}</span>
                  </td>

                  {/* Chiffre Pro Column */}
                  <td className="py-5 px-4 text-center bg-primary/5 border-x-2 border-primary font-bold text-primary">
                    {typeof item.chiffrepro === 'boolean' ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    ) : (
                      <span className="text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-lg text-xs font-bold inline-block">
                        {item.chiffrepro}
                      </span>
                    )}
                  </td>

                  {/* Excel Column */}
                  <td className="py-5 px-4 text-center text-slate-600 font-medium">
                    {typeof item.excel === 'boolean' ? (
                      item.excel ? (
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )
                    ) : (
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                        {item.excel}
                      </span>
                    )}
                  </td>

                  {/* Foreign Cloud Column */}
                  <td className="py-5 px-4 text-center text-slate-600 font-medium">
                    {typeof item.foreignCloud === 'boolean' ? (
                      item.foreignCloud ? (
                        <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center mx-auto">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )
                    ) : (
                      <span className="text-xs text-amber-800 bg-amber-50 px-2 py-1 rounded-md">
                        {item.foreignCloud}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
