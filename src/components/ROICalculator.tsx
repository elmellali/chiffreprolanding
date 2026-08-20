import { useState } from "react"
import { Calculator, Clock, Coins } from "lucide-react"
import { Card, CardContent } from "./ui/card"

export function ROICalculator() {
  const [invoicesPerMonth, setInvoicesPerMonth] = useState(20)
  
  // Assume 15 minutes saved per invoice
  const hoursSaved = Math.round((invoicesPerMonth * 15) / 60)
  // Assume 100 DH value per hour
  const moneySaved = hoursSaved * 100

  return (
    <Card className="w-full max-w-4xl mx-auto border-2 border-indigo-100 shadow-xl shadow-indigo-100/50 bg-white/50 backdrop-blur">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          
          {/* Slider Section */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 p-2 rounded-lg text-primary">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-800">Calculez votre ROI</h3>
            </div>
            
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-semibold text-slate-600">Factures créées par mois</label>
                <span className="text-2xl font-black text-primary">{invoicesPerMonth}</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="200" 
                step="5"
                value={invoicesPerMonth}
                onChange={(e) => setInvoicesPerMonth(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-xs text-slate-400 font-medium mt-2">
                <span>5</span>
                <span>200+</span>
              </div>
            </div>
            
            <p className="text-sm text-slate-500">
              En moyenne, nos utilisateurs économisent 15 minutes par facture grâce à l'automatisation et au catalogue intégré.
            </p>
          </div>

          {/* Results Section */}
          <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
            <div className="flex-1 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-sm mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-500 mb-1">Temps gagné</div>
              <div className="text-3xl font-black text-slate-800">{hoursSaved} <span className="text-lg">h/mois</span></div>
            </div>
            
            <div className="flex-1 bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-sm mb-3">
                <Coins className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-slate-500 mb-1">Coût économisé*</div>
              <div className="text-3xl font-black text-emerald-600">{moneySaved.toLocaleString()} <span className="text-lg">DH</span></div>
            </div>
          </div>
          
        </div>
      </CardContent>
    </Card>
  )
}
