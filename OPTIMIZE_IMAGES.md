# Optimisation des Images

## Images à Optimiser (Trop Lourdes)

Les images suivantes sont trop lourdes et ralentissent le chargement du site :

1. **equipment_supply.jpg** - 7.3 MB ❌ (Doit être < 500 KB)
2. **safety_compliance_inspection.jpg** - 3.7 MB ❌ (Doit être < 500 KB)
3. **marines-services.jpg** - 2.8 MB ❌ (Doit être < 500 KB)
4. **engineering.jpg** - 2.4 MB ❌ (Doit être < 500 KB)
5. **shipyard.jpg** - 1.7 MB ❌ (Doit être < 500 KB)
6. **0.png** - 1.5 MB ❌ (Doit être < 500 KB)
7. **docking_bethering_support.jpg** - 1.4 MB ❌ (Doit être < 500 KB)
8. **logo-afrihorn.png** - 934 KB ⚠️ (Peut être optimisé)

## Comment Optimiser

### Option 1 : Utiliser un outil en ligne (Recommandé)
1. Aller sur https://tinypng.com/ ou https://squoosh.app/
2. Uploader chaque image
3. Télécharger la version compressée
4. Remplacer l'image dans le dossier `public/`

### Option 2 : Utiliser ImageMagick (Ligne de commande)
```bash
# Installer ImageMagick
# Windows: https://imagemagick.org/script/download.php

# Compresser une image
magick convert input.jpg -quality 85 -resize 1920x1080\> output.jpg
```

### Option 3 : Convertir en WebP (Meilleure compression)
```bash
# Installer cwebp
# Puis convertir
cwebp -q 80 input.jpg -o output.webp
```

## Résolution Recommandée
- Images de fond de services : 1920x1080px maximum
- Logo : 400x400px maximum
- Qualité JPEG : 80-85%

## Après Optimisation
Une fois les images optimisées, le site devrait charger 5-10x plus rapidement !
