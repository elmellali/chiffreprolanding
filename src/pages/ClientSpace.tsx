import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, MessageSquare, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function ClientSpace() {
  const [tab, setTab] = useState<'license' | 'login'>('license');
  
  // License assistance state
  const [clientMachineId, setClientMachineId] = useState('');
  const [clientCompanyName, setClientCompanyName] = useState('');
  const [planType, setPlanType] = useState('Standard (1 An)');

  // Login state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Portail en cours de mise à niveau vers la v2.4. Pour toute assistance immédiate, contactez notre équipe technique sur WhatsApp.');
    }, 1200);
  };

  const getWhatsAppRenewLink = () => {
    const text = encodeURIComponent(
      `Bonjour Chiffre Pro, je souhaite obtenir ou renouveler ma licence logicielle.\n\n` +
      `🏢 Société: ${clientCompanyName || 'N/A'}\n` +
      `💻 Machine ID: ${clientMachineId || 'N/A'}\n` +
      `📦 Formule: ${planType}`
    );
    return `https://wa.me/212698030397?text=${text}`;
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center relative py-12 px-4 overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="w-full max-w-5xl grid md:grid-cols-12 bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative z-10">
        
        {/* Left Side */}
        <div className="md:col-span-7 p-8 lg:p-14 flex flex-col justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            
            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 max-w-xs mb-8">
              <button
                onClick={() => setTab('license')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  tab === 'license' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Activer / Renouveler
              </button>
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                  tab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Espace Pro
              </button>
            </div>

            {tab === 'license' ? (
              <div className="space-y-6">
                <div>
                  <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-2">ASSISTANCE DIRECTE</div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Activation & Renouvellement</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">Transmettez votre identifiant machine pour recevoir votre clé en moins de 15 minutes.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Nom de votre Entreprise / Client
                    </label>
                    <input
                      type="text"
                      value={clientCompanyName}
                      onChange={(e) => setClientCompanyName(e.target.value)}
                      placeholder="Ex: Société Marocaine de Distribution SARL"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Votre Machine ID (Affiché au démarrage de l'app) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientMachineId}
                      onChange={(e) => setClientMachineId(e.target.value)}
                      placeholder="Ex: 6982004C-2C74-11B2-A85C-E0570A4DE0F6"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1.5">
                      Formule souhaitée
                    </label>
                    <select
                      value={planType}
                      onChange={(e) => setPlanType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-primary"
                    >
                      <option>Plan 1 - Standard (1 An - 1 990 DH)</option>
                      <option>Plan 2 - Pro ERP (1 An - 3 990 DH)</option>
                      <option>Plan 3 - Licence Définitive / Lifetime</option>
                      <option>Plan 4 - Essai Gratuit (15 Jours)</option>
                    </select>
                  </div>

                  <a
                    href={getWhatsAppRenewLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Envoyer ma demande sur WhatsApp &rarr;
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <div className="text-accent text-xs font-bold tracking-[2px] uppercase mb-2">PORTAIL SÉCURISÉ</div>
                  <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Espace Client Pro</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">Accédez à vos factures d'achat et téléchargements.</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Email professionnel</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                        placeholder="contact@entreprise.com" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Mot de passe</label>
                      <a href="https://wa.me/212698030397" className="text-xs font-bold text-primary hover:text-accent">Assistance ?</a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" 
                        placeholder="••••••••••••" 
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-13 bg-primary text-white font-bold text-base rounded-2xl shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-all mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                  </Button>
                </div>
              </form>
            )}

          </motion.div>
        </div>

        {/* Right Side */}
        <div className="md:col-span-5 bg-slate-900 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden text-white">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary rounded-full blur-[90px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-bold text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              Version 2.4.0 Live
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white leading-snug">
              Un support technique dédié au Maroc
            </h2>
            <p className="text-slate-300 text-xs font-medium leading-relaxed">
              Téléchargez la dernière mise à jour de Chiffre Pro. Vos données restent stockées en local sur votre PC en toute confidentialité.
            </p>
          </div>

          <div className="relative z-10 space-y-3 my-6">
            {[
              "Assistance directe sur WhatsApp 6j/7",
              "Sauvegarde locale de vos bases de données",
              "Clés délivrées sous 15 minutes"
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/10 p-5 rounded-2xl">
            <div className="flex gap-3 items-center">
              <div className="p-2.5 bg-accent rounded-xl text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm">Garantie & Sérénité</h4>
                <p className="text-slate-300 text-xs font-medium">Chiffrement matériel de vos clés de licence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
