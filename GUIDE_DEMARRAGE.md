# Guide de Démarrage - SAM TAXI

## 🎯 Pour Présenter au Client

### Ce qui est prêt :
1. ✅ **Design Premium** - Interface élégante avec thème sombre et or
2. ✅ **Formulaire de Réservation** - Validation complète et envoi sécurisé
3. ✅ **Assistant IA** - Concierge virtuel pour répondre aux questions
4. ✅ **SEO Optimisé** - Référencement Google complet
5. ✅ **Responsive** - Fonctionne sur mobile, tablette et desktop

### Ce qui nécessite une décision client :
1. 🤔 **Calcul de Tarifs** - Système de tarification automatique ?
2. 🤔 **Google Maps** - Intégration pour sélection d'adresses ?
3. 🤔 **Paiement** - Stripe/PayPal pour acomptes en ligne ?
4. 🤔 **Notifications** - SMS de confirmation ?
5. 🤔 **Numéro de Téléphone** - À ajouter dans le footer et Schema.org

## 🚀 Lancement Rapide

### Étape 1 : Configuration de la clé API

1. Allez sur [Google AI Studio](https://ai.google.dev/)
2. Créez une clé API Gemini gratuite
3. Copiez la clé

4. Ouvrez `backend/.env` et remplacez :
```
GEMINI_API_KEY=votre_clé_api_ici
```

### Étape 2 : Installation

```bash
# Dans le dossier principal
npm install

# Dans le dossier backend
cd backend
npm install
cd ..
```

### Étape 3 : Lancement

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend :**
```bash
npm run dev
```

### Étape 4 : Tester

Ouvrez http://localhost:5173 dans votre navigateur

## 🧪 Tests à Effectuer

1. **Formulaire de Réservation**
   - Remplir tous les champs
   - Tester la validation (laisser des champs vides)
   - Vérifier la soumission

2. **Assistant IA**
   - Cliquer sur le bouton doré en bas à droite
   - Poser des questions sur les services
   - Vérifier les réponses

3. **Navigation**
   - Tester tous les liens du menu
   - Vérifier le scroll fluide

## 📋 Checklist Avant Présentation

- [ ] Clé API Gemini configurée
- [ ] Backend démarré (port 3001)
- [ ] Frontend démarré (port 5173)
- [ ] Formulaire testé
- [ ] Assistant IA testé
- [ ] Responsive testé sur mobile

## 🎨 Personnalisation Facile

### Changer le numéro de téléphone
Fichiers à modifier :
- `index.html` (ligne ~116 dans Schema.org)
- `components/Footer.tsx`

### Changer l'adresse
Fichier : `index.html` (lignes ~100-108 dans Schema.org)

### Changer les couleurs
Fichier : `index.html` (lignes ~55-65 dans les styles CSS)

## 🐛 Résolution de Problèmes

### Le backend ne démarre pas
- Vérifiez que Node.js est installé : `node --version`
- Vérifiez que les dépendances sont installées : `cd backend && npm install`

### L'assistant IA ne répond pas
- Vérifiez que le backend est démarré
- Vérifiez la clé API dans `backend/.env`
- Regardez la console du navigateur (F12) pour les erreurs

### Le formulaire ne s'envoie pas
- Vérifiez que le backend est accessible sur http://localhost:3001
- Testez l'endpoint : http://localhost:3001/api/health

## 📞 Support

Pour toute question technique, contactez le développeur.
