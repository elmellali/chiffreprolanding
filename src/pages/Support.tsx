import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';

export default function Support() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <main className="py-24 bg-slate-50 min-h-[80vh] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">ASSISTANCE</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Support Technique</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Notre équipe d'experts est à votre disposition pour vous accompagner et résoudre vos problèmes le plus rapidement possible.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Téléphone</h3>
              <p className="text-slate-500 font-medium mb-6">Lundi - Vendredi, 9h-18h</p>
              <a href="tel:+212698030397" className="text-lg font-extrabold text-primary hover:text-accent transition-colors">+212 698 030 397</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">WhatsApp</h3>
              <p className="text-slate-500 font-medium mb-6">Assistance rapide par message</p>
              <a href="https://wa.me/212698030397" target="_blank" rel="noopener noreferrer" className="text-lg font-extrabold text-accent hover:text-primary transition-colors">Démarrer le chat</a>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 mb-6">
                <Mail className="h-8 w-8" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 mb-2">Email</h3>
              <p className="text-slate-500 font-medium mb-6">Réponse sous 24h ouvrées</p>
              <a href="mailto:contact@chiffrepro.com" className="text-lg font-extrabold text-slate-900 hover:text-primary transition-colors">contact@chiffrepro.com</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Envoyer une demande</h2>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-primary/5 border border-primary/20 rounded-2xl p-12 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white mb-6">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Message envoyé !</h3>
                  <p className="text-slate-600 font-medium">Notre équipe a bien reçu votre demande et vous répondra dans les plus brefs délais sur l'adresse email fournie.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-slate-700">Nom complet</label>
                      <input id="name" type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium" placeholder="Jean Dupont" />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-slate-700">Adresse email</label>
                      <input id="email" type="email" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium" placeholder="jean@entreprise.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-bold text-slate-700">Sujet</label>
                    <select id="subject" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium text-slate-700">
                      <option>Problème technique (Logiciel)</option>
                      <option>Question sur la facturation / Abonnement</option>
                      <option>Demande d'évolution / Sur-mesure</option>
                      <option>Autre demande</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-bold text-slate-700">Message</label>
                    <textarea id="message" required rows={6} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none" placeholder="Décrivez votre problème avec un maximum de détails..."></textarea>
                  </div>

                  <Button type="submit" size="lg" className="w-full md:w-auto h-14 px-10 text-base shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold rounded-xl">
                    <Send className="mr-2 h-5 w-5" /> Envoyer le message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
