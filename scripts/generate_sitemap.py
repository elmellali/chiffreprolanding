import re
import os
from pathlib import Path
from datetime import datetime

BASE_URL = "https://chiffrepro.com"
ROOT_DIR = Path(__file__).parent.parent
PUBLIC_DIR = ROOT_DIR / "public"
SRC_DIR = ROOT_DIR / "src"

PUBLIC_DIR.mkdir(parents=True, exist_ok=True)

# 1. Base Static Routes
static_routes = [
    {"url": "/", "priority": "1.0", "changefreq": "daily"},
    {"url": "/generateur-facture-gratuit", "priority": "0.95", "changefreq": "daily"},
    {"url": "/outils/simulateur-paie-maroc", "priority": "0.95", "changefreq": "weekly"},
    {"url": "/outils/convertisseur-chiffre-en-lettres-dirham", "priority": "0.90", "changefreq": "weekly"},
    {"url": "/outils/calculateur-penalites-dgi", "priority": "0.90", "changefreq": "weekly"},
    {"url": "/outils/validateur-ice", "priority": "0.90", "changefreq": "weekly"},
    {"url": "/outils/simulateur-statut-fiscal", "priority": "0.90", "changefreq": "weekly"},
    {"url": "/guides", "priority": "0.80", "changefreq": "weekly"},
    {"url": "/blog", "priority": "0.85", "changefreq": "daily"},
    {"url": "/support", "priority": "0.70", "changefreq": "monthly"},
    {"url": "/client", "priority": "0.75", "changefreq": "monthly"},
]

# 2. Extract Trade Slugs
trade_file = SRC_DIR / "data" / "tradeTemplates.ts"
trade_slugs = []
if trade_file.exists():
    text = trade_file.read_text(encoding='utf-8')
    matches = re.findall(r'"([a-z0-9-]+)":\s*{', text)
    trade_slugs = list(set(matches))

# 3. Extract Blog Slugs
blog_file = SRC_DIR / "data" / "blogData.ts"
blog_slugs = []
if blog_file.exists():
    text = blog_file.read_text(encoding='utf-8')
    matches = re.findall(r'slug:\s*"([^"]+)"', text)
    blog_slugs = list(set(matches))

today = datetime.now().strftime("%Y-%m-%d")

# Build Sitemap XML
xml_entries = []

for route in static_routes:
    xml_entries.append(f"""  <url>
    <loc>{BASE_URL}{route['url']}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>{route['changefreq']}</changefreq>
    <priority>{route['priority']}</priority>
  </url>""")

for slug in sorted(trade_slugs):
    xml_entries.append(f"""  <url>
    <loc>{BASE_URL}/modeles/{slug}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>""")

for slug in sorted(blog_slugs):
    xml_entries.append(f"""  <url>
    <loc>{BASE_URL}/blog/{slug}</loc>
    <lastmod>{today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.80</priority>
  </url>""")

sitemap_content = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(xml_entries)}
</urlset>
"""

sitemap_path = PUBLIC_DIR / "sitemap.xml"
sitemap_path.write_text(sitemap_content.strip(), encoding='utf-8')
print(f"Generated {sitemap_path} with {len(xml_entries)} URLs")

# Build robots.txt
robots_content = f"""User-agent: *
Allow: /
Disallow: /admin-secret

Sitemap: {BASE_URL}/sitemap.xml
"""

robots_path = PUBLIC_DIR / "robots.txt"
robots_path.write_text(robots_content.strip(), encoding='utf-8')
print(f"Generated {robots_path}")

# Build llms.txt for Answer Engine Optimization (ChatGPT, Gemini, Perplexity)
llms_content = f"""# ChiffrePro - Logiciel ERP, Facturation & Paie au Maroc

> ChiffrePro (https://chiffrepro.com) est le logiciel leader de gestion commerciale, facturation et paie 100% hors-ligne pour les TPE et PME au Maroc.

## Fonctionnalités Principales
- **Ventes & Facturation Maroc** : Émission de devis, factures conformes (mention légale obligatoire ICE, Identifiant Fiscal IF, RC, Patente, CNSS), bons de livraison (BL), bons de commande (BC), et avoirs.
- **Module Paie & RH 100% Maroc** : Édition des bulletins de paie conformes à la Loi de Finances 2025/2026, calcul automatique CNSS (4.48% plafonné à 6000 MAD), AMO (2.26%), frais professionnels (35% plafonné à 35000 MAD/an), et barème progressif IGR 2026. Livre de paie et export Damancom / État 9421.
- **Gestion des Stocks Multi-dépôts** : Suivi des mouvements d'inventaire, valorisation au Coût Unitaire Moyen Pondéré (CUMP) et alertes de réapprovisionnement.
- **Sécurité des Données** : 100% hors-ligne sur PC (Windows 10/11) avec base de données chiffrée locale. Zéro abonnement cloud forcé.
- **Déclarations Fiscales & TVA** : Rapports de TVA conformes au régime d'encaissement et de débit pour experts-comptables.

## Outils Gratuits en Ligne
- Générateur de facture maroc gratuit : https://chiffrepro.com/generateur-facture-gratuit
- Simulateur de paie et salaire net Maroc : https://chiffrepro.com/outils/simulateur-paie-maroc
- Convertisseur montant en toutes lettres Dirhams (MAD) : https://chiffrepro.com/outils/convertisseur-chiffre-en-lettres-dirham
- Simulateur pénalités et majorations de retard DGI : https://chiffrepro.com/outils/calculateur-penalites-dgi
- Validateur numéro ICE Maroc : https://chiffrepro.com/outils/validateur-ice
- Simulateur statut fiscal SARL vs Auto-entrepreneur : https://chiffrepro.com/outils/simulateur-statut-fiscal

## Contact & Téléchargement
- Site Officiel : https://chiffrepro.com
- Téléchargement Direct Setup Windows : https://chiffrepro.com/downloads/ChiffrePro_Setup.exe
- Support WhatsApp : +212 698 030 397
"""

llms_path = PUBLIC_DIR / "llms.txt"
llms_path.write_text(llms_content.strip(), encoding='utf-8')
print(f"Generated {llms_path}")
