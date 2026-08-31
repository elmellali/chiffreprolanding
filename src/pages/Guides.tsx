import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, FileText, Settings, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'all', name: 'Tous les guides' },
  { id: 'getting-started', name: 'Premiers pas', icon: Book },
  { id: 'billing', name: 'Facturation & Devis', icon: FileText },
  { id: 'settings', name: 'Paramètres', icon: Settings },
];

const articles = [
  { id: 1, category: 'getting-started', title: 'Installation et première configuration', description: 'Apprenez comment installer Chiffre Pro sur votre poste de travail et activer votre licence pour la première fois.' },
  { id: 2, category: 'getting-started', title: 'Créer votre première fiche client', description: 'Un guide étape par étape pour remplir correctement les informations de vos clients afin de générer des factures conformes.' },
  { id: 3, category: 'billing', title: 'Convertir un devis en facture', description: 'Découvrez comment gagner du temps en transformant un devis accepté directement en facture.' },
  { id: 4, category: 'billing', title: 'Gérer les acomptes et reliquats', description: 'La méthode recommandée pour enregistrer les paiements partiels et suivre le solde de chaque facture.' },
  { id: 5, category: 'settings', title: 'Personnaliser le modèle de facture', description: 'Comment intégrer votre logo, changer les couleurs principales et définir vos mentions légales obligatoires.' },
  { id: 6, category: 'settings', title: 'Sauvegarder et restaurer vos données', description: 'Procédure complète pour sécuriser la base de données locale de Chiffre Pro sur un support externe.' },
  { id: 7, category: 'billing', title: 'Gérer les factures fournisseurs et achats', description: 'Enregistrez vos factures d\'achats et utilisez l\'IA pour extraire automatiquement les montants.' },
  { id: 8, category: 'billing', title: 'Bons de Commande et Bons de Réception', description: 'Le cycle complet des achats : créez vos bons de commande et réceptionnez vos marchandises.' },
  { id: 9, category: 'getting-started', title: 'Gérer les articles et l\'inventaire', description: 'Créez votre catalogue de produits, gérez vos prix d\'achat et surveillez votre stock en temps réel.' },
];

export default function Guides() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || article.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="py-24 bg-slate-50 min-h-[80vh] relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-accent text-xs font-bold tracking-[2px] uppercase mb-4">BASE DE CONNAISSANCES</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Centre d'aide</motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative mt-10"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border-2 border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium text-lg shadow-sm" 
              placeholder="Rechercher un guide, un tutoriel..."
            />
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <motion.aside 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.3 }}
            className="w-full lg:w-1/4"
          >
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 sticky top-24">
              <h3 className="font-bold text-lg text-slate-900 mb-4 px-4">Catégories</h3>
              <ul className="space-y-2">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl font-bold transition-all flex items-center gap-3 ${activeCategory === cat.id ? 'bg-primary text-white shadow-md' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      {cat.icon && <cat.icon className="h-4 w-4" />}
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>

          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.4 }}
            className="w-full lg:w-3/4"
          >
            <div className="mb-6 flex justify-between items-end">
              <h2 className="text-2xl font-bold text-slate-900">
                {searchQuery ? 'Résultats de recherche' : categories.find(c => c.id === activeCategory)?.name}
              </h2>
              <span className="text-sm font-bold text-slate-500 bg-slate-200 px-3 py-1 rounded-full">{filteredArticles.length} articles</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <AnimatePresence>
                {filteredArticles.length > 0 ? (
                  filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to={`/guides/${article.id}`} className="block h-full bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 transition-all group">
                        <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full inline-block mb-4 uppercase tracking-wider">
                          {categories.find(c => c.id === article.category)?.name}
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors">{article.title}</h3>
                        <p className="text-slate-600 font-medium mb-6 leading-relaxed line-clamp-2">{article.description}</p>
                        <div className="flex items-center text-primary font-bold text-sm mt-auto">
                          Lire l'article <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="col-span-2 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
                      <Search className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun résultat trouvé</h3>
                    <p className="text-slate-500 font-medium">Nous n'avons trouvé aucun article correspondant à "{searchQuery}".</p>
                    <button onClick={() => setSearchQuery('')} className="mt-6 text-primary font-bold hover:underline">Effacer la recherche</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
