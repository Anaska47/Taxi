# SAM TAXI - Landing Page Optimisée (Conversion)

Cette version du projet est ultra-optimisée pour un seul objectif : **la prise de rendez-vous**. Le design a été simplifié pour offrir une expérience "Audi Confort" professionnelle et efficace, adaptée aussi bien au transport privé qu'au transport médical.

## 🚀 Architecture
- **Frontend** : React + Vite
- **Base de données** : Supabase (pour un enregistrement fiable et sécurisé des rendez-vous)
- **Style** : CSS Moderne (Apple/Audi inspiré), propre et rapide.

## 🛠️ Configuration Supabase

1. Créez un projet sur [Supabase](https://supabase.com/).
2. Exécutez le script SQL se trouvant dans `supabase_schema.sql` dans votre SQL Editor Supabase.
3. Copiez vos clés API (URL et Anon Key) dans le fichier `.env.local` :
   ```env
   VITE_SUPABASE_URL=votre_url_supabase
   VITE_SUPABASE_ANON_KEY=votre_cle_anon
   ```

## 📦 Installation & Lancement

```bash
# Installation des dépendances
npm install

# Lancement en mode développement
npm run dev
```

## ✨ Points clés
- **Formulaire focus** : Uniquement les informations essentielles (Nom, Tél, Départ, Arrivée, Type).
- **Nuance Audi** : Palette de couleurs sobre (Navy, Silver, White) pour inspirer confiance et confort.
- **Transport Médical** : Mise en avant de la compatibilité transport conventionné.

---
**Version** : 2.0.0 (Optimisée Conversion)  
**Date** : 25 Février 2026
