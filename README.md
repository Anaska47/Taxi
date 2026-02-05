# SAM TAXI - Premium Transport Toulon

Service de taxi premium à Toulon avec Audi A4 Avant Break Noir. Transport privé VIP, aéroports, gares et conventionné CPAM. Luxe, confort et prestige garantis.

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
VITE_API_URL=http://localhost:3001
```

2. **Backend (backend/.env)**
```bash
PORT=3001
```

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
│   ├── Features.tsx     # Services
│   ├── Fleet.tsx        # Flotte
│   ├── CPAMSection.tsx  # Section CPAM
│   ├── Navbar.tsx       # Navigation
│   └── Footer.tsx       # Pied de page
├── backend/             # Serveur Express
│   ├── server.js        # API backend
│   └── package.json     # Dépendances backend
├── public/              # Fichiers statiques
│   ├── sitemap.xml      # Plan du site
│   └── robots.txt       # Directives robots
├── App.tsx              # Composant principal
├── index.html           # Point d'entrée HTML
├── index.tsx            # Point d'entrée React
└── package.json         # Dépendances frontend
```

## ✨ Fonctionnalités

### ✅ Implémentées
- ✅ Design premium avec thème sombre et accents dorés
- ✅ Formulaire de réservation avec validation complète
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

## 🚀 Déploiement

### Vercel (Frontend)
Le projet est optimisé pour un déploiement sur Vercel. Les fichiers statiques et le point d'entrée `index.html` sont configurés pour fonctionner avec le système de "no-build" (en utilisant ESM.sh) ou via un build Vite standard.

```bash
npm run build
```

---

**Version** : 1.0.0 (Prototype)  
**Dernière mise à jour** : Février 2026

*Note: View your app in AI Studio: [https://ai.studio/apps/drive/1H6Ot0cw_5ih_G92rd6A4gtuI3dvWN8_O](https://ai.studio/apps/drive/1H6Ot0cw_5ih_G92rd6A4gtuI3dvWN8_O)*
