# 🚀 Guide de Démarrage Rapide - Site Afrihorn V2

## 🎨 Nouveau Design Premium V2

**Site ultra-visuel avec sections plein écran immersives**, inspiré des meilleurs sites maritimes de luxe.

## ✅ Ce qui a été fait

### Structure du site
- 🖼️ **Hero Plein Écran** - Image fixe parallax, particules, overlay gradient
- 📖 **Section À Propos** - Design "Manifesto" structuré avec grille et typographie premium
- 🌍 **Marchés & Clients** - Section sombre "Dashboard" avec listes interactives et cartes secteurs
- 🛠️ **5 Services Plein Écran** (100vh chacun) :
  1. **Port & Marine Operations** - Image immersive fond marin
  2. **Shipyard & Engineering** - Image chantier naval
  3. **Equipment Supply** - Image équipements portuaires
  4. **Offshore & Projects** - Image plateforme offshore
  5. **Trading & Logistics** - Image cargo/logistique
- 📧 **Contact** - Formulaire minimaliste
- 🔗 **Footer** - Design sombre avec logo blanc

### Caractéristiques Premium
- 🖼️ **Sections 100vh** - Chaque service occupe tout l'écran
- ✨ **Animations fluides** - Parallax, zoom, fade-in
- 📖 **Textes optimisés** - Courts et percutants (shortDesc)
- 🎨 **Typographie XXL** - Titres imposants jusqu'à 6rem
- 🌊 **Overlays gradients** - Texte blanc parfaitement lisible
- 🌍 **Bilingue FR/EN** - Sélecteur flottant (bas droite)
- 💬 **WhatsApp flottant** - Contact direct (bas droite)
- 📱 **100% Responsive** - Mobile, tablette, desktop

## 🎯 Lancer le site

### Dans WSL (Linux)
```bash
cd /mnt/c/Users/zouka/OneDrive/Desktop/Afrihorn/afrihorn-web
npm run dev
```

### Dans PowerShell (Windows)
```powershell
cd C:\Users\zouka\OneDrive\Desktop\Afrihorn\afrihorn-web
npm run dev
```

Puis ouvrir **http://localhost:5173** dans votre navigateur.

## ⚙️ Personnalisations rapides

### 1. Changer le numéro WhatsApp
Fichier : `src/components/FloatingActions.jsx`
```javascript
// Ligne 13
href="https://wa.me/971XXXXXXXXX"  // ← Remplacer par votre numéro
```

### 2. Modifier les textes des services
Fichiers : 
- `src/i18n/en.json` (anglais)
- `src/i18n/fr.json` (français)

**Structure V2 avec shortDesc :**
```json
{
  "services": {
    "port-marine": {
      "title": "Port & Marine Operations",
      "shortDesc": "Texte court (2-3 phrases) affiché en plein écran",
      "description": "Texte long technique (non utilisé actuellement)"
    }
  }
}
```

⚠️ **Important** : Les sections plein écran utilisent `shortDesc` pour une meilleure lisibilité.

### 3. Changer une image de service
Fichier : `src/components/ServicesGrid.jsx`

```javascript
const services = [
  { id: 'port-marine', image: '/votre-nouvelle-image.jpg' },
  { id: 'shipyard-engineering', image: '/autre-image.jpg' },
  // 5 services au total
];
```

💡 **Conseil** : Utiliser des images haute résolution (min 1920x1080) pour un rendu optimal.

### 4. Modifier les coordonnées de contact
Fichiers : `src/i18n/en.json` et `fr.json`
```json
{
  "contact": {
    "address": "Votre adresse complète",
    "phone": "+971 XX XXX XXXX"
  }
}
```

## 📂 Images utilisées

Toutes les images sont dans le dossier `public/` :
- ✅ `logo-afrihorn.png` (header + footer)
- ✅ `port_operations.avif` (Port Operations)
- ✅ `marines-services.jpg` (Marine Services)
- ✅ `shipyard.jpg` (Shipyard Operations)
- ✅ `docking.jpg` (Docking & Berthing)
- ✅ `engineering.jpg` (Engineering & Fabrication)
- ✅ `Safety, Compliance & Inspection.jpg`
- ✅ `Equipment- Supply.jpg` (Equipment Supply)
- ✅ `Project & Technical Support.jpeg`
- ✅ `offshore_support.jpg` (Offshore Support)
- ✅ `0.png` (Logistics - grille services)
- ✅ `services.png` (Consultancy)
- ✅ `Trading & Agencies.jpeg`

## 🎨 Couleurs principales

Définies dans `src/index.css` :
- **Rose/Fuchsia** : `#c83278` (accent principal)
- **Bleu** : `#3b82f6` (accent secondaire)
- **Fond sombre Hero** : `#0a0e1a`
- **Texte** : `#1a1a2e`

## 🔧 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Prévisualiser le build
npm run preview

# Vérifier les erreurs
npm run lint
```

## 💡 Astuces

### Ajouter un service
1. Ajouter l'image dans `public/`
2. Ajouter l'entrée dans `ServicesGrid.jsx`
3. Ajouter les textes dans `en.json` et `fr.json`

### Désactiver les animations
Les animations respectent automatiquement `prefers-reduced-motion` du système.

### Tester sur mobile
Le site est déjà responsive. Testez avec les DevTools (F12) > mode mobile.

## 📞 Support

Pour toute question :
- Email : contact@afrihorn.com
- WhatsApp : Cliquez sur la bulle en bas à droite du site

---

**Note** : Toutes les modifications nécessitent de redémarrer `npm run dev` pour être visibles.
