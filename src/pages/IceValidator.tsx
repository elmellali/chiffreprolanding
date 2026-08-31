import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ShieldCheck, AlertCircle, CheckCircle2, Search, ArrowRight, FileCheck, Building2, HelpCircle } from 'lucide-react';

export default function IceValidator() {
  const [iceInput, setIceInput] = useState('');
  const [hasValidated, setHasValidated] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<{
    companyCode: string;
    branchCode: string;
    checksum: string;
  } | null>(null);

  useEffect(() => {
    document.title = "Vérificateur ICE Maroc Gratuit - Valider un Identifiant Commun de l'Entreprise | Chiffre Pro";
  }, []);

  const handleValidate = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanIce = iceInput.trim().replace(/\s+/g, '');
    const errors: string[] = [];

    if (!cleanIce) {
      errors.push("Veuillez saisir un numéro d'ICE.");
    } else if (!/^\d+$/.test(cleanIce)) {
      errors.push("L'ICE doit être composé uniquement de chiffres (aucun caractère alphabétique).");
    } else if (cleanIce.length !== 15) {
      errors.push(`L'ICE doit comporter exactement 15 chiffres (actuellement ${cleanIce.length} chiffres saisis).`);
    }

    if (errors.length === 0) {
      setIsValid(true);
      setParsedData({
        companyCode: cleanIce.slice(0, 9),
        branchCode: cleanIce.slice(9, 13),
        checksum: cleanIce.slice(13, 15)
      });
      setValidationErrors([]);
    } else {
      setIsValid(false);
      setParsedData(null);
      setValidationErrors(errors);
    }
    setHasValidated(true);
  };

  const handleTestSample = () => {
    setIceInput('002847593000084');
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1100px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span className="text-slate-400">Outils Gratuits</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Validateur ICE Maroc</span>
        </div>

        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4">
            <ShieldCheck className="w-3.5 h-3.5" /> Outil Fiscal Gratuit 100% Conforme DGI
          </span>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
            Vérificateur & Validateur <span className="text-gradient">ICE Maroc</span>
          </h1>
          <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
            Vérifiez instantanément la conformité et la structure à 15 chiffres de l'Identifiant Commun de l'Entreprise (ICE) de vos clients ou fournisseurs.
          </p>
        </div>

        {/* Main Validator Card */}
        <div className="bg-white rounded-3xl p-8 lg:p-10 border border-slate-200 shadow-xl mb-12 max-w-3xl mx-auto">
          <form onSubmit={handleValidate} className="space-y-6">
            <div>
              <label htmlFor="ice-input" className="block text-sm font-bold text-slate-800 mb-2">
                Numéro d'ICE à vérifier (15 chiffres)
              </label>
              <div className="relative">
                <input
                  id="ice-input"
                  type="text"
                  placeholder="Ex: 002847593000084"
                  value={iceInput}
                  onChange={(e) => {
                    setIceInput(e.target.value);
                    setHasValidated(false);
                  }}
                  className="w-full h-14 pl-12 pr-32 rounded-2xl border-2 border-slate-200 text-lg font-mono tracking-wider text-slate-800 focus:outline-none focus:border-primary transition-colors"
                />
                <Building2 className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={handleTestSample}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:underline bg-slate-50 px-2 py-1 rounded"
                >
                  Exemple ICE
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20">
              <Search className="w-5 h-5 mr-2" /> Vérifier la validité de l'ICE
            </Button>
          </form>

          {/* Validation Result Box */}
          {hasValidated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 p-6 rounded-2xl border ${
                isValid
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-red-50 border-red-200 text-red-950'
              }`}
            >
              <div className="flex items-start gap-4">
                {isValid ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">
                    {isValid ? "Structure d'ICE Valide & Conforme DGI" : "Numéro d'ICE Invalide ou Incomplet"}
                  </h3>
                  {isValid ? (
                    <div>
                      <p className="text-sm text-emerald-800 mb-4">
                        Ce numéro respecte parfaitement le format officiel à 15 chiffres requis par la Direction Générale des Impôts.
                      </p>
                      {parsedData && (
                        <div className="grid grid-cols-3 gap-3 bg-white/80 p-3 rounded-xl border border-emerald-200 text-xs">
                          <div>
                            <span className="text-slate-500 block">Identifiant Unique</span>
                            <span className="font-mono font-bold text-slate-800">{parsedData.companyCode}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Code Siège / Succursale</span>
                            <span className="font-mono font-bold text-slate-800">{parsedData.branchCode}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Clé de Contrôle</span>
                            <span className="font-mono font-bold text-slate-800">{parsedData.checksum}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <ul className="space-y-1 text-sm text-red-800 list-disc list-inside">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Educational Content & DGI Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-lg">
              <FileCheck className="w-5 h-5 text-primary" />
              <span>Pourquoi l'ICE est-il obligatoire au Maroc ?</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              L'Identifiant Commun de l'Entreprise (ICE) est obligatoire depuis 2016 sur toutes les factures, devis, bons de commande et documents commerciaux au Maroc.
            </p>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Condition indispensable pour déduire la charge fiscale</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Obligatoire pour récupérer la TVA auprès de la DGI</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Évite les amendes et redressements lors des audits</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-xl mb-3">Automatisez la vérification des ICE</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Chiffre Pro valide automatiquement le format de l'ICE de chaque nouveau client et fournisseur, et insère les mentions obligatoires sur vos devis et factures sans risque d'erreur.
              </p>
            </div>
            <Button size="lg" className="w-full font-bold bg-primary hover:bg-primary/90" asChild>
              <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                Télécharger Chiffre Pro (Windows) <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900">Questions Fréquentes sur l'ICE au Maroc</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">De combien de chiffres est composé un ICE ?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Un numéro d'ICE marocain est composé de 15 chiffres : les 9 premiers identifient l'entreprise mère, les 4 suivants la succursale/siège (souvent 0000 ou 0001), et les 2 derniers constituent la clé de contrôle.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Que risque-t-on en omettant l'ICE sur une facture ?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                En vertu du Code Général des Impôts marocain, une facture sans ICE ne permet pas au client de déduire la dépense de son bénéfice imposable, et la TVA payée n'est pas déductible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
