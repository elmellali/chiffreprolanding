import { useState, useRef, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { tradeTemplates } from '../data/tradeTemplates';
import { Button } from '../components/ui/button';
import { FileText, Download, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle, ArrowRight, Building2, Plus, Trash2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

export default function TradeTemplatePage() {
  const { slug } = useParams<{ slug: string }>();
  const trade = slug ? tradeTemplates[slug] : null;

  if (!trade) {
    return <Navigate to="/" replace />;
  }

  const [items, setItems] = useState(trade.defaultItems);
  const [tvaRate, setTvaRate] = useState(trade.taxRate);
  const [companyName, setCompanyName] = useState("Mon Entreprise SARL");
  const [clientName, setClientName] = useState("Client Exemple SARL");
  const [iceNumber, setIceNumber] = useState("002847593000084");
  const [isGenerating, setIsGenerating] = useState(false);
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setItems(trade.defaultItems);
    setTvaRate(trade.taxRate);
    document.title = `${trade.metaTitle} | Chiffre Pro`;
  }, [slug, trade]);

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const tvaAmount = subtotal * (tvaRate / 100);
  const total = subtotal + tvaAmount;

  const handleAddItem = () => {
    setItems([...items, { desc: "Nouvelle prestation / article", qty: 1, price: 1000 }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
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
        pdf.save(`facture-${trade.slug}.pdf`);
      } catch (err) {
        console.error('Erreur génération PDF', err);
      }
    }
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen py-12 bg-slate-50">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1280px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium">
          <Link to="/" className="hover:text-primary">Accueil</Link>
          <span>/</span>
          <span className="text-slate-400">Modèles de Facture</span>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{trade.tradeName}</span>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm mb-12">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-4">
              <Building2 className="w-3.5 h-3.5" /> Modèle Spécialisé Maroc ({trade.currency})
            </span>
            <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-tight">
              {trade.headline}
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {trade.metaDescription} Modifiez directement les lignes ci-dessous et téléchargez votre facture PDF conforme aux règles de la DGI en 1 clic.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={handleDownloadPdf} disabled={isGenerating} className="shadow-lg font-bold">
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Génération..." : "Télécharger cette Facture (PDF Gratuit)"}
              </Button>
              <Button variant="outline" size="lg" asChild className="font-bold border-2">
                <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                  Installer l'application Hors-Ligne
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Grid: Interactive Invoice & Legal Specs */}
        <div className="grid lg:grid-cols-12 gap-8 mb-16 items-start">
          {/* Left Column: Interactive Invoice Editor */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden p-6 lg:p-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-slate-900">Éditeur de Facture Direct</h2>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                TVA {tvaRate}%
              </span>
            </div>

            <div ref={invoiceRef} className="bg-white p-4 rounded-xl">
              {/* Header Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">VOTRE ENTREPRISE</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full font-bold text-slate-800 border-b border-slate-200 pb-1 text-sm focus:outline-none focus:border-primary"
                  />
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <span>ICE :</span>
                    <input
                      type="text"
                      value={iceNumber}
                      onChange={(e) => setIceNumber(e.target.value)}
                      className="bg-transparent font-mono text-xs text-slate-700 focus:outline-none border-b border-dashed border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-bold block mb-1">FACTURÉ À (CLIENT)</label>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full font-bold text-slate-800 border-b border-slate-200 pb-1 text-sm focus:outline-none focus:border-primary"
                  />
                  <div className="text-xs text-slate-500 mt-1">Casablanca, Maroc</div>
                </div>
              </div>

              {/* Table of Items */}
              <div className="border border-slate-100 rounded-xl overflow-hidden mb-6">
                <div className="grid grid-cols-12 bg-slate-50 p-3 text-xs font-bold text-slate-500">
                  <div className="col-span-6">DÉSIGNATION / PRESTATION</div>
                  <div className="col-span-2 text-center">QTÉ</div>
                  <div className="col-span-3 text-right">PRIX (DH)</div>
                  <div className="col-span-1"></div>
                </div>
                <div className="divide-y divide-slate-100">
                  {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 p-3 items-center text-sm gap-2 hover:bg-slate-50/50">
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
                          onClick={() => handleRemoveItem(idx)}
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
                onClick={handleAddItem}
                className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary/80 mb-6"
              >
                <Plus className="w-4 h-4" /> Ajouter une ligne de prestation
              </button>

              {/* Totals Section */}
              <div className="bg-slate-50 p-4 rounded-xl space-y-2 text-sm max-w-[280px] ml-auto">
                <div className="flex justify-between text-slate-600">
                  <span>Total HT :</span>
                  <span className="font-semibold">{subtotal.toLocaleString('fr-FR')} DH</span>
                </div>
                <div className="flex justify-between text-slate-600 items-center">
                  <span>TVA ({tvaRate}%) :</span>
                  <span className="font-semibold">{tvaAmount.toLocaleString('fr-FR')} DH</span>
                </div>
                <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-200">
                  <span>Total TTC :</span>
                  <span className="text-primary">{total.toLocaleString('fr-FR')} DH</span>
                </div>
              </div>

              {/* Watermark Footer in PDF */}
              <div className="mt-8 pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
                Facture émise et certifiée conforme Code Général des Impôts Maroc | Généré avec Chiffre Pro (chiffrepro.com)
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={handleDownloadPdf} disabled={isGenerating} className="font-bold w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                {isGenerating ? "Création du PDF..." : "Exporter cette facture en PDF"}
              </Button>
            </div>
          </div>

          {/* Right Column: Legal Requirements & Common Mistakes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Legal Mentions */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-900 font-bold text-lg">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Mentions légales obligatoires ({trade.tradeName})</span>
              </div>
              <ul className="space-y-3">
                {trade.legalMentions.map((mention, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{mention}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200">
              <div className="flex items-center gap-2 mb-4 text-amber-900 font-bold text-lg">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Erreurs fréquentes à éviter</span>
              </div>
              <ul className="space-y-3">
                {trade.commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-amber-900">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0 mt-2"></span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* In-App Upsell Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl">
              <h3 className="font-bold text-lg mb-2">Passez à la vitesse supérieure</h3>
              <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                Marre de refaire vos factures à la main ? Chiffre Pro enregistre vos clients, calcule automatiquement les stocks et génère vos relevés TVA 100% hors-ligne.
              </p>
              <Button variant="default" className="w-full font-bold bg-primary hover:bg-primary/90" asChild>
                <a href="https://chiffrepro.com/downloads/ChiffrePro_Setup.exe">
                  Télécharger Chiffre Pro Gratuitement <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Trade FAQ */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold text-slate-900">Questions Fréquentes sur la Facturation ({trade.tradeName})</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {trade.tradeFaq.map((faq, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-900 mb-2">{faq.question}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Trades Navigation Matrix */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Découvrir d'autres modèles de facture par secteur</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.values(tradeTemplates).map((t) => (
              <Link
                key={t.slug}
                to={`/modeles/${t.slug}`}
                className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                  t.slug === slug
                    ? 'bg-primary text-white border-primary shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-primary hover:text-primary'
                }`}
              >
                {t.tradeName}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
