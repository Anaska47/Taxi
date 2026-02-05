<<<<<<< HEAD
# SAM TAXI - Premium Transport Toulon

Service de taxi premium à Toulon avec Audi A4 Avant Break Noir. Transport privé VIP, aéroports, gares et conventionné CPAM.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js (v18 ou supérieur)
- npm ou yarn

### Installation

1. **Installer les dépendances du frontend**
```bash
npm install
```

2. **Installer les dépendances du backend**
```bash
cd backend
npm install
cd ..
```

### Configuration

1. **Frontend (.env.local)**
```bash
VITE_GEMINI_API_KEY=PLACEHOLDER_API_KEY
VITE_API_URL=http://localhost:3001
```

2. **Backend (backend/.env)**
```bash
GEMINI_API_KEY=votre_clé_api_gemini_ici
PORT=3001
```

> ⚠️ **Important** : Obtenez votre clé API Gemini sur [Google AI Studio](https://ai.google.dev/)

### Lancement

1. **Démarrer le backend** (dans un terminal)
```bash
cd backend
npm run dev
```

2. **Démarrer le frontend** (dans un autre terminal)
```bash
npm run dev
```

3. **Ouvrir dans le navigateur**
```
http://localhost:5173
```

## 📁 Structure du Projet

```
sam-taxi/
├── components/           # Composants React
│   ├── Hero.tsx         # Section héro
│   ├── BookingSection.tsx  # Formulaire de réservation
│   ├── ConciergeAI.tsx  # Assistant IA
│   ├── Features.tsx     # Services
│   ├── Fleet.tsx        # Flotte
│   ├── CPAMSection.tsx  # Section CPAM
│   ├── Navbar.tsx       # Navigation
│   └── Footer.tsx       # Pied de page
├── services/            # Services API
│   └── geminiService.ts # Service Gemini AI
├── backend/             # Serveur Express
│   ├── server.js        # API backend
│   └── package.json     # Dépendances backend
├── public/              # Fichiers statiques
│   ├── sitemap.xml      # Plan du site
│   └── robots.txt       # Directives robots
├── App.tsx              # Composant principal
├── index.html           # Point d'entrée HTML
└── package.json         # Dépendances frontend
```

## ✨ Fonctionnalités

### ✅ Implémentées
- ✅ Design premium avec thème sombre et accents dorés
- ✅ Formulaire de réservation avec validation complète
- ✅ Assistant IA conversationnel (Concierge)
- ✅ Backend sécurisé avec Express.js
- ✅ SEO optimisé (meta tags, Schema.org, sitemap)
- ✅ Responsive design
- ✅ Animations fluides

### 🔄 À Discuter avec le Client
- Calcul automatique des tarifs
- Intégration Google Maps
- Système de paiement en ligne
- Notifications SMS
- Dashboard administrateur

## 🛠️ Technologies Utilisées

### Frontend
- React 19
- TypeScript
- Vite
- TailwindCSS
- Google Fonts (Playfair Display, Montserrat)

### Backend
- Node.js
- Express.js
- Google Gemini AI
- CORS

## 📝 API Endpoints

### Backend (http://localhost:3001)

- `GET /api/health` - Vérification de l'état du serveur
- `POST /api/concierge` - Assistant IA conversationnel
- `POST /api/booking` - Réservation de taxi
- `POST /api/contact` - Formulaire de contact

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans `index.html` :
- Or : `#d4af37`
- Noir : `#0a0a0a`
- Charcoal : `#121212`

### Polices
- Titres : Playfair Display (serif)
- Corps : Montserrat (sans-serif)

## 🚀 Déploiement

### Frontend
Recommandé : Vercel, Netlify, ou GitHub Pages

```bash
npm run build
```

### Backend
Recommandé : Railway, Render, ou Heroku

```bash
cd backend
npm start
```

## 📞 Contact

Pour toute question ou personnalisation, contactez le développeur.

## 📄 Licence

Propriété de SAM TAXI - Tous droits réservés

---

**Version** : 1.0.0 (Prototype)  
**Dernière mise à jour** : Février 2026
=======
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1H6Ot0cw_5ih_G92rd6A4gtuI3dvWN8_O

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
>>>>>>> 595b434dc79218137e94e1c625611026e4d17c05
