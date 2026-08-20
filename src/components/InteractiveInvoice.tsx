import { useState, useRef } from "react"
import { FileText, Download, CheckCircle2, RefreshCw } from "lucide-react"
import { toPng } from 'html-to-image'
import { jsPDF } from 'jspdf'

export function InteractiveInvoice() {
  const [items, setItems] = useState([{ desc: "Création site web", qty: 1, price: 5000 }])
  const [tvaRate, setTvaRate] = useState(20)
  const [isGenerating, setIsGenerating] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0)
  const tvaAmount = subtotal * (tvaRate / 100)
  const total = subtotal + tvaAmount

  const invoiceRef = useRef<HTMLDivElement>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    
    if (invoiceRef.current) {
      try {
        const imgData = await toPng(invoiceRef.current, { cacheBust: true, pixelRatio: 2 })
        const pdf = new jsPDF('p', 'mm', 'a4')
        
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const nodeWidth = invoiceRef.current.offsetWidth
        const nodeHeight = invoiceRef.current.offsetHeight
        const pdfHeight = (nodeHeight * pdfWidth) / nodeWidth
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
        pdf.save('facture.pdf')
      } catch (err) {
        console.error('Error generating PDF', err)
      }
    }

    setIsGenerating(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 3000)
  }

  return (
    <div className="relative w-full max-w-[600px] mx-auto perspective-1000 group">
      {/* Background glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      {/* Main Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform rotate-y-[-5deg] rotate-x-[2deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-500 ease-out">
        
        <div ref={invoiceRef} className="bg-white rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">Facture #FA-2026-001</div>
                <div className="text-xs text-slate-500">Aujourd'hui</div>
              </div>
            </div>
            <div className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">Brouillon</div>
          </div>

          {/* Client Info (Static) */}
          <div className="p-6 pb-2 grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-slate-400 font-semibold mb-1">DE</div>
              <div className="text-sm font-bold text-slate-800">Mon Entreprise SARL</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 font-semibold mb-1">À</div>
              <div className="text-sm font-bold text-slate-800">Client Example</div>
            </div>
          </div>

          {/* Interactive Lines */}
          <div className="p-6 pt-4">
            <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-slate-400 mb-2 px-2">
              <div className="col-span-6">DESCRIPTION</div>
              <div className="col-span-2 text-center">QTE</div>
              <div className="col-span-4 text-right">PRIX (DH)</div>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-100 transition-colors focus-within:border-primary/50 focus-within:bg-white">
                  <div className="col-span-6">
                    <input 
                      type="text" 
                      value={item.desc}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].desc = e.target.value;
                        setItems(newItems);
                      }}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number" 
                      value={item.qty}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].qty = parseInt(e.target.value) || 0;
                        setItems(newItems);
                      }}
                      className="w-full bg-transparent text-sm font-medium text-slate-700 text-center focus:outline-none"
                    />
                  </div>
                  <div className="col-span-4 relative">
                    <input 
                      type="number" 
                      value={item.price}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].price = parseInt(e.target.value) || 0;
                        setItems(newItems);
                      }}
                      className="w-full bg-transparent text-sm font-bold text-slate-800 text-right focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Totals */}
          <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
            <div className="w-1/2 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Sous-total</span>
                <span className="font-semibold text-slate-700">{subtotal.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-slate-500 flex items-center gap-2">
                  TVA 
                  <select 
                    className="bg-white border border-slate-200 rounded px-1 text-xs focus:outline-none"
                    value={tvaRate}
                    onChange={(e) => setTvaRate(parseInt(e.target.value))}
                  >
                    <option value={20}>20%</option>
                    <option value={10}>10%</option>
                    <option value={0}>0%</option>
                  </select>
                </span>
                <span className="font-semibold text-slate-700">{tvaAmount.toLocaleString()} DH</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-slate-200 mt-2">
                <span className="font-bold text-slate-800">Total TTC</span>
                <span className="font-extrabold text-primary">{total.toLocaleString()} DH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hover overlay CTA */}
        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={handleGenerate}
            disabled={isGenerating}
            className="bg-primary text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-primary/30 transition-all hover:-translate-y-1 flex items-center gap-2 w-full justify-center disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isGenerating ? (
              <><RefreshCw className="w-5 h-5 animate-spin" /> Génération...</>
            ) : showConfetti ? (
              <><CheckCircle2 className="w-5 h-5" /> Télécharger Chiffre Pro !</>
            ) : (
              <><Download className="w-5 h-5" /> Générer PDF</>
            )}
          </button>
        </div>
      </div>

      {/* Floating tooltip */}
      <div className="absolute -top-6 -right-6 bg-emerald-500 text-white text-xs font-bold px-3 py-2 rounded-lg shadow-lg rotate-12 animate-pulse z-10 hidden md:block">
        Modifiez-moi ! ✨
      </div>
    </div>
  )
}
