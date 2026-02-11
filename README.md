# Afrihorn - Site Web Maritime Premium

Site web one-page **ultra-visuel et immersif** pour Afrihorn, spécialiste en équipements maritimes et portuaires.

## 🎨 Design Premium V2

**Expérience plein écran cinématique** inspirée des sites de luxe maritimes et yachting.

## 🚀 Fonctionnalités

- 🖼️ **Sections plein écran** - Chaque service occupe 100vh avec image immersive
- ✨ **Animations premium** - Parallax, zoom, fade-in et transitions fluides
- 📖 **Textes optimisés** - Courts, percutants et parfaitement lisibles
- 🌍 **Bilingue FR/EN** avec sélecteur flottant en bas à droite
- 📱 **100% Responsive** - Mobile, tablette, desktop
- 💬 **WhatsApp flottant** pour contact direct
- 🎯 **5 services majeurs** - Port, Shipyard, Equipment, Offshore, Trading
- 🌍 **Section marchés** détaillée avec zones géographiques et clients
- ♿ **Accessibilité** - Respect de `prefers-reduced-motion`

## 🛠 Technologies

- **React 19** + **Vite 7**
- **Framer Motion** pour les animations
- **CSS Modules** pour le styling scopé
- Context API pour la gestion d'état (langue)

## 📦 Installation

```bash
npm install
```

## 🎬 Lancement

### Mode développement
```bash
npm run dev
```
Puis ouvrir http://localhost:5173

### Build production
```bash
npm run build
npm run preview
```

## 📁 Structure

```
src/
├── components/          # Composants React
│   ├── Header.jsx      # Header dynamique (transparent→solid on scroll)
│   ├── Hero.jsx        # Hero plein écran avec parallax fixe
│   ├── Intro.jsx       # Section À propos épurée
│   ├── Markets.jsx     # Marchés & clients (régions, ports)
│   ├── ServicesGrid.jsx # 5 services PLEIN ÉCRAN immersifs ⭐
│   ├── Contact.jsx     # Formulaire minimaliste
│   ├── Footer.jsx      # Footer sombre
│   └── FloatingActions.jsx # Langue + WhatsApp (bottom-right)
├── context/            # Context React
│   └── LanguageContext.jsx # Gestion FR/EN
├── i18n/              # Traductions
│   ├── en.json        # Textes EN (avec shortDesc pour services)
│   └── fr.json        # Textes FR (avec shortDesc pour services)
└── App.jsx            # Composant racine

public/                # Assets statiques
├── logo-afrihorn.png
├── 0.png
├── services.png
├── port_operations.avif
├── marines-services.jpg
├── shipyard.jpg
├── docking.jpg
├── engineering.jpg
├── Safety, Compliance & Inspection.jpg
├── Equipment- Supply.jpg
├── Project & Technical Support.jpeg
├── offshore_support.jpg
└── Trading & Agencies.jpeg
```

## 🎨 Personnalisation

### Changer les couleurs
Éditer `src/index.css` :
```css
:root {
  --color-accent: #c83278;        /* Rose/Fuchsia principal */
  --color-accent-hover: #a82862;  /* Hover */
  --color-hero-bg: #1a1025;       /* Fond Hero */
  /* ... */
}
```

### Modifier les textes des services
Éditer `src/i18n/en.json` et `src/i18n/fr.json` :

```json
"services": {
  "port-marine": {
    "title": "Port & Marine Operations",
    "shortDesc": "Texte court (2-3 phrases) pour les sections plein écran",
    "description": "Texte long technique (non utilisé actuellement)"
  }
}
```

⚠️ **Important** : Les sections utilisent `shortDesc` pour une meilleure lisibilité sur les grandes images.

### Ajouter/modifier les images des services
1. Placer les images dans `public/`
2. Mettre à jour `src/components/ServicesGrid.jsx` :
```javascript
const services = [
  { id: 'port-marine', image: '/votre-image.jpg' },
  { id: 'shipyard-engineering', image: '/autre-image.jpg' },
  // 5 services au total
];
```

💡 **Conseil** : Utiliser des images haute résolution (min 1920x1080) pour un rendu optimal plein écran.

### Changer le numéro WhatsApp
Éditer `src/components/FloatingActions.jsx` :
```javascript
href="https://wa.me/971XXXXXXXXX"  // Remplacer par votre numéro
```

## 📞 Contact

Pour toute question sur le code ou les modifications :
- Email: contact@afrihorn.com
- Localisation: United Arab Emirates

## 📚 Documentation

- **NOUVEAU_DESIGN_V2.md** - 📘 Explications complètes du design plein écran (À LIRE)
- **NOUVEAU_DESIGN.md** - Documentation de la version premium V1
- **CHANGEMENTS.md** - Historique des modifications
- **GUIDE_DEMARRAGE.md** - Guide de démarrage rapide

## 📝 License

© Afrihorn. Tous droits réservés.
