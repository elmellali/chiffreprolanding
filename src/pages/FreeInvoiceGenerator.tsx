import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import {
  Download, Plus, Trash2, Upload, Eraser,
  Sparkles, CheckCircle2, ShieldCheck, HelpCircle, ArrowRight
} from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

interface LineItem {
  id: string;
  desc: string;
  qty: number;
  price: number;
}

const THEME_COLORS = [
  { name: 'Indigo', bg: 'bg-indigo-600', text: 'text-indigo-600', border: 'border-indigo-600', hex: '#4F46E5' },
  { name: 'Émeraude', bg: 'bg-emerald-600', text: 'text-emerald-600', border: 'border-emerald-600', hex: '#059669' },
  { name: 'Bleu Pro', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600', hex: '#2563EB' },
  { name: 'Ambre', bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600', hex: '#D97706' },
  { name: 'Ardoise', bg: 'bg-slate-800', text: 'text-slate-800', border: 'border-slate-800', hex: '#1E293B' },
];

export default function FreeInvoiceGenerator() {
  const [selectedTheme, setSelectedTheme] = useState(THEME_COLORS[0]);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Document Info
  const [invoiceNumber, setInvoiceNumber] = useState('FA-2026-001');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]);

  // Company Info
  const [companyName, setCompanyName] = useState('Mon Entreprise SARL');
  const [companyAddress, setCompanyAddress] = useState('120 Boulevard Zerktouni, Casablanca');
  const [companyIce, setCompanyIce] = useState('002847593000084');
  const [companyRc, setCompanyRc] = useState('458921');
  const [companyIf, setCompanyIf] = useState('52940182');
  const [companyPhone, setCompanyPhone] = useState('+212 522 00 00 00');
  const [companyEmail, setCompanyEmail] = useState('contact@monentreprise.ma');

  // Client Info
  const [clientName, setClientName] = useState('Client Partenaire SARL');
  const [clientAddress, setClientAddress] = useState('Boulevard d\'Anfa, Casablanca');
  const [clientIce, setClientIce] = useState('001928471000055');

  // Items & Calculations
  const [items, setItems] = useState<LineItem[]>([
    { id: '1', desc: 'Prestation de développement & intégration web', qty: 1, price: 6500 },
    { id: '2', desc: 'Maintenance annuelle & hébergement cloud', qty: 1, price: 1800 }
  ]);
  const [discountVal, setDiscountVal] = useState(0);
  const [tvaRate, setTvaRate] = useState(20);
  const [notes, setNotes] = useState('Règlement par virement bancaire sous 30 jours.\nRIB : 011 780 0000 123456789012 34 (BMCE Bank)');

  const [isGenerating, setIsGenerating] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.title = "Générateur de Facture Gratuit Maroc (PDF, ICE, Signature) | Chiffre Pro";
  }, []);

  // Totals
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const discountAmount = discountVal;
  const taxableSubtotal = Math.max(0, subtotal - discountAmount);
  const tvaAmount = taxableSubtotal * (tvaRate / 100);
  const total = taxableSubtotal + tvaAmount;

  // Signature Pad Handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('touches' in e) ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = ('touches' in e) ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1E293B';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Logo Upload Handler
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now().toString(), desc: 'Nouvel article ou prestation', qty: 1, price: 500 }
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    if (invoiceRef.current) {
      try {
        const imgData = await toPng(invoiceRef.current, { cacheBust: true, pixelRatio: 2 });
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const nodeWidth = invoiceRef.current.offsetWidth;
        const nodeHeight = invoiceRef.current.offsetHeight;
        const pdfHeight = (nodeHeight * pdfWidth) / nodeWidth;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`facture-${invoiceNumber || 'maroc'}.pdf`);
      } catch (err) {
        console.error('Erreur génération PDF', err);
      }
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1360px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span className="text-slate-400">Outils Gratuits</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">Générateur de Facture Gratuit</span>
        </div>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm mb-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Studio Facturation Gratuit & Conforme DGI
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              Générateur de Facture <span className="text-gradient">Maroc Gratuit</span>
            </h1>
            <p className="text-slate-600 text-base lg:text-lg leading-relaxed">
              Créez, personnalisez et signez vos devis et factures conformes aux normes fiscales marocaines (ICE, RC, IF, TVA). Téléchargez instantanément en PDF haute qualité.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <Button size="lg" onClick={handleDownloadPdf} disabled={isGenerating} className="shadow-xl font-bold h-14 px-8 text-base">
              <Download className="mr-2 h-5 w-5" />
              {isGenerating ? "Génération PDF..." : "Télécharger la Facture (PDF)"}
            </Button>
          </div>
        </div>

        {/* Control Bar: Colors & Presets */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Couleur du Thème :</span>
            <div className="flex gap-2">
              {THEME_COLORS.map(c => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedTheme(c)}
                  className={`w-8 h-8 rounded-full ${c.bg} transition-transform ${selectedTheme.name === c.name ? 'scale-110 ring-2 ring-offset-2 ring-primary' : 'hover:scale-105'}`}
                  title={c.name}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Taux de TVA :</span>
            {[20, 14, 10, 7, 0].map(rate => (
              <button
                key={rate}
                onClick={() => setTvaRate(rate)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${tvaRate === rate ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
              >
                {rate}%
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Main Paper Invoice Container */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden p-6 sm:p-10">
            <div ref={invoiceRef} className="bg-white p-2">
              {/* Header: Logo & Company / Invoice Title */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b-2 pb-8 mb-8" style={{ borderColor: selectedTheme.hex }}>
                <div className="w-full sm:w-1/2">
                  {logoUrl ? (
                    <div className="relative group w-40 h-20 mb-3">
                      <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                      <button
                        onClick={() => setLogoUrl(null)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Supprimer le logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-slate-200 hover:border-primary rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer text-xs font-bold text-slate-500 hover:text-primary transition-colors w-44 mb-3">
                      <Upload className="w-4 h-4" />
                      <span>Ajouter votre Logo</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  )}

                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full text-xl font-extrabold text-slate-900 focus:outline-none mb-1"
                    placeholder="Nom de votre Société"
                  />
                  <input
                    type="text"
                    value={companyAddress}
                    onChange={(e) => setCompanyAddress(e.target.value)}
                    className="w-full text-xs text-slate-600 focus:outline-none mb-1"
                    placeholder="Adresse"
                  />
                  <div className="text-[11px] text-slate-500 font-mono space-y-0.5 mt-2">
                    <div className="flex items-center gap-1">
                      <span>ICE :</span>
                      <input
                        type="text"
                        value={companyIce}
                        onChange={(e) => setCompanyIce(e.target.value)}
                        className="bg-transparent font-bold focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span>RC :</span>
                        <input
                          type="text"
                          value={companyRc}
                          onChange={(e) => setCompanyRc(e.target.value)}
                          className="bg-transparent focus:outline-none w-16"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span>IF :</span>
                        <input
                          type="text"
                          value={companyIf}
                          onChange={(e) => setCompanyIf(e.target.value)}
                          className="bg-transparent focus:outline-none w-20"
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        type="text"
                        value={companyPhone}
                        onChange={(e) => setCompanyPhone(e.target.value)}
                        className="bg-transparent focus:outline-none"
                      />
                      <span>|</span>
                      <input
                        type="text"
                        value={companyEmail}
                        onChange={(e) => setCompanyEmail(e.target.value)}
                        className="bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full sm:w-1/2 text-left sm:text-right">
                  <h2 className="text-3xl font-black uppercase tracking-wider mb-2" style={{ color: selectedTheme.hex }}>
                    FACTURE
                  </h2>
                  <div className="flex items-center sm:justify-end gap-2 text-sm font-bold text-slate-800 mb-1">
                    <span>N°</span>
                    <input
                      type="text"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(e.target.value)}
                      className="text-right font-mono font-extrabold border-b border-slate-200 pb-0.5 focus:outline-none focus:border-primary w-32"
                    />
                  </div>
                  <div className="text-xs text-slate-500 space-y-1">
                    <div>Date : <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="bg-transparent focus:outline-none font-medium" /></div>
                    <div>Échéance : <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="bg-transparent focus:outline-none font-medium" /></div>
                  </div>
                </div>
              </div>

              {/* Client Info Block */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
                <div className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: selectedTheme.hex }}>
                  Facturé À (Client) :
                </div>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full font-extrabold text-slate-800 text-base bg-transparent focus:outline-none mb-1"
                  placeholder="Nom de l'entreprise cliente"
                />
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full text-xs text-slate-600 bg-transparent focus:outline-none mb-1"
                  placeholder="Adresse du client"
                />
                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono mt-1">
                  <span>ICE Client :</span>
                  <input
                    type="text"
                    value={clientIce}
                    onChange={(e) => setClientIce(e.target.value)}
                    className="bg-transparent font-bold focus:outline-none"
                    placeholder="15 chiffres"
                  />
                </div>
              </div>

              {/* Items Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
                <div className="grid grid-cols-12 text-white p-3 text-xs font-bold" style={{ backgroundColor: selectedTheme.hex }}>
                  <div className="col-span-6">DÉSIGNATION ARTICLE / PRESTATION</div>
                  <div className="col-span-2 text-center">QTÉ</div>
                  <div className="col-span-3 text-right">PRIX UNIT. HT (DH)</div>
                  <div className="col-span-1"></div>
                </div>

                <div className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <div key={item.id} className="grid grid-cols-12 p-3 items-center text-sm gap-2 hover:bg-slate-50/50">
                      <div className="col-span-6">
                        <input
                          type="text"
                          value={item.desc}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx].desc = e.target.value;
                            setItems(next);
                          }}
                          className="w-full bg-transparent text-slate-800 text-xs font-medium focus:outline-none"
                        />
                      </div>
                      <div className="col-span-2 text-center">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx].qty = Number(e.target.value) || 0;
                            setItems(next);
                          }}
                          className="w-full text-center bg-transparent text-slate-800 text-xs font-bold focus:outline-none"
                        />
                      </div>
                      <div className="col-span-3 text-right">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const next = [...items];
                            next[idx].price = Number(e.target.value) || 0;
                            setItems(next);
                          }}
                          className="w-full text-right bg-transparent text-slate-800 text-xs font-bold focus:outline-none"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1"
                          title="Supprimer la ligne"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Item Button */}
              <button
                onClick={addItem}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 mb-8"
              >
                <Plus className="w-4 h-4" /> Ajouter une ligne
              </button>

              {/* Bottom Section: Notes / Signature / Totals */}
              <div className="grid sm:grid-cols-12 gap-8 items-end pt-4 border-t border-slate-100">
                {/* Notes & Digital Signature */}
                <div className="sm:col-span-7 space-y-6">
                  <div>
                    <label className="text-xs font-bold text-slate-400 block mb-1">CONDITIONS & NOTES</label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full p-2.5 text-xs text-slate-600 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>

                  {/* Digital Signature Pad */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-slate-400">SIGNATURE & CACHET</label>
                      <button onClick={clearSignature} className="text-[10px] text-red-500 hover:underline flex items-center gap-1 font-semibold">
                        <Eraser className="w-3 h-3" /> Effacer
                      </button>
                    </div>
                    <canvas
                      ref={canvasRef}
                      width={300}
                      height={100}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                      className="border border-slate-200 rounded-xl bg-slate-50 w-full h-24 cursor-crosshair touch-none"
                    />
                  </div>
                </div>

                {/* Totals Summary */}
                <div className="sm:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Sous-Total HT :</span>
                    <span className="font-semibold">{subtotal.toLocaleString('fr-FR')} DH</span>
                  </div>
                  {discountVal > 0 && (
                    <div className="flex justify-between text-red-600">
                      <span>Remise :</span>
                      <span>-{discountAmount.toLocaleString('fr-FR')} DH</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>TVA ({tvaRate}%) :</span>
                    <span className="font-semibold">{tvaAmount.toLocaleString('fr-FR')} DH</span>
                  </div>
                  <div className="flex justify-between text-slate-900 font-black text-lg pt-3 border-t border-slate-200">
                    <span>TOTAL TTC :</span>
                    <span style={{ color: selectedTheme.hex }}>{total.toLocaleString('fr-FR')} DH</span>
                  </div>
                </div>
              </div>

              {/* Watermark Legal Seal */}
              <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
                Document émis et certifié conforme Code Général des Impôts Maroc (DGI) • Émis avec Chiffre Pro (www.chiffrepro.com)
              </div>
            </div>
          </div>

          {/* Right Sidebar: Settings & Upsell */}
          <div className="lg:col-span-4 space-y-6">
            {/* Download CTA Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 text-lg">Exporter votre document</h3>
              <Button size="lg" onClick={handleDownloadPdf} disabled={isGenerating} className="w-full font-bold shadow-lg shadow-primary/20">
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Création du PDF..." : "Télécharger PDF Gratuit"}
              </Button>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 justify-center">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Format A4 Haute Définition</span>
              </div>
            </div>

            {/* Discount Controller */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Remise Commerciale (DH)</label>
              <input
                type="number"
                value={discountVal}
                onChange={(e) => setDiscountVal(Number(e.target.value) || 0)}
                className="w-full h-11 px-3 rounded-xl border border-slate-200 font-bold text-sm focus:outline-none focus:border-primary"
                placeholder="0 DH"
              />
            </div>

            {/* In-App Upsell Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-primary/20 text-primary-300 mb-4">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Hors-Ligne & Sécurisé
              </span>
              <h3 className="font-extrabold text-xl mb-3">Automatisez votre gestion avec Chiffre Pro</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Vous passez trop de temps à refaire vos factures ? Téléchargez le logiciel Chiffre Pro pour enregistrer vos clients, gérer vos stocks et générer vos relevés TVA automatiquement.
              </p>
              <Button size="lg" className="w-full font-bold bg-primary hover:bg-primary/90" asChild>
                <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                  Installer l'application Windows <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900">Questions Fréquentes sur la Facturation au Maroc</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Quelles sont les mentions obligatoires sur une facture marocaine ?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Toute facture émise au Maroc doit comporter la dénomination sociale, l'adresse, l'ICE (15 chiffres), le RC, l'Identifiant Fiscal (IF), le numéro de Patente, la date, la numérotation séquentielle et le détail clair de la TVA.
              </p>
            </div>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-2">Une signature numérique sur facture est-elle légale ?</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Oui, la législation marocaine (loi 53-05 sur l'échange électronique des données juridiques) reconnaît la validité des documents commerciaux et factures électroniques signés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
