import { Star, Quote, Building, CheckCircle2 } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      name: "Yassine Berrada",
      role: "Directeur Général",
      company: "Atlas Négoce & Distribution",
      city: "Casablanca",
      quote: "Chiffre Pro a remplacé nos 15 classeurs Excel. La gestion conjointe des bons de livraison et des factures nous évite tout litige avec nos clients. Le logiciel s'ouvre instantanément sans ralentissement.",
      rating: 5,
      impact: "+40% de rapidité de facturation"
    },
    {
      name: "Fatima-Zahra El Amrani",
      role: "Fondatrice & Architecte",
      company: "Studio Design 360",
      city: "Rabat",
      quote: "Nos devis ont une présentation impeccable avec notre logo et nos conditions de paiement. Le fait que mes données comptables restent sur mon ordinateur sans passer par un cloud inconnu est un vrai soulagement.",
      rating: 5,
      impact: "0 impayé oublié grâce aux alertes"
    },
    {
      name: "Mehdi Tazi",
      role: "Gérant",
      company: "TechnoSolutions Maroc",
      city: "Tanger",
      quote: "Le rapport TVA en fin de trimestre me prend maintenant 2 minutes à exporter pour mon comptable. Le support client sur WhatsApp répond toujours en moins de 10 minutes. Bravo !",
      rating: 5,
      impact: "Bilan comptable prêt 5x plus vite"
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-extrabold text-xs tracking-wider uppercase mb-4">
          Témoignages Clients
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Adopté par plus de 500 entreprises au Maroc
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
          Découvrez comment des entrepreneurs et directeurs financiers structurent leur facturation au quotidien.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl p-8 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 relative group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex text-yellow-400 gap-1">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              </div>

              <p className="text-slate-600 text-sm font-medium leading-relaxed italic">
                "{item.quote}"
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {item.impact}
              </div>

              <div>
                <h4 className="font-extrabold text-slate-900 text-base">{item.name}</h4>
                <p className="text-xs text-slate-500 font-semibold flex items-center gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-slate-400" />
                  {item.role}, {item.company} ({item.city})
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
