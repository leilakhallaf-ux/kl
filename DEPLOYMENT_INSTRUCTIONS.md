# Instructions de Déploiement OVH

## Fichiers à télécharger

Tous les fichiers nécessaires se trouvent dans le dossier **`dist/`** :
- `index.html`
- `.htaccess` (configuration Apache)
- Dossier `assets/` (contient tous les CSS et JavaScript)

## Étapes de déploiement

### 1. Préparer les fichiers
Le build de production a été généré dans le dossier `dist/`. Ce dossier contient tout ce dont vous avez besoin.

### 2. Connexion à votre hébergement OVH
- Connectez-vous à votre espace client OVH
- Accédez à votre hébergement web
- Utilisez le gestionnaire de fichiers ou connectez-vous via FTP/SFTP

### 3. Télécharger les fichiers
Téléchargez **tout le contenu** du dossier `dist/` vers le répertoire racine de votre site web (généralement `/www/` ou `/public_html/`)

Votre structure doit ressembler à :
```
/www/ (ou /public_html/)
├── index.html
├── .htaccess
└── assets/
    ├── index-CEYlVrNA.css
    └── index-C8gnyZ1I.js
```

### 4. Configuration des variables d'environnement

**IMPORTANT :** Les variables d'environnement Supabase sont compilées dans le build, mais vous devez vous assurer que votre projet Supabase est accessible publiquement.

Vérifiez que ces valeurs sont correctes dans votre `.env` local :
- `VITE_SUPABASE_URL` : URL de votre projet Supabase
- `VITE_SUPABASE_ANON_KEY` : Clé anonyme publique Supabase

Si vous devez modifier ces valeurs, éditez le fichier `.env` et relancez `npm run build`.

### 5. Configuration Apache (.htaccess)

Le fichier `.htaccess` inclus configure :
- ✅ Redirection HTTPS automatique
- ✅ Routage pour React (Single Page Application)
- ✅ Compression Gzip pour optimisation
- ✅ Cache navigateur pour performances
- ✅ En-têtes de sécurité

**Assurez-vous que le module `mod_rewrite` est activé** sur votre hébergement OVH (normalement activé par défaut).

### 6. Vérification

Après le déploiement, testez :
- La page d'accueil charge correctement
- La navigation entre pages fonctionne
- Les images et styles s'affichent
- Le changement de langue fonctionne
- La connexion à Supabase fonctionne

### 7. Configuration du domaine

Si vous utilisez un domaine personnalisé :
- Configurez les DNS pour pointer vers votre hébergement OVH
- Activez le certificat SSL dans votre espace client OVH
- Le `.htaccess` redirigera automatiquement vers HTTPS

## Dépannage

### Erreur 404 sur les routes
Le `.htaccess` doit être présent et `mod_rewrite` doit être activé.

### Images ou styles manquants
Vérifiez que le dossier `assets/` a bien été téléchargé avec tous ses fichiers.

### Erreurs Supabase
Vérifiez les variables d'environnement et la configuration RLS de votre base de données Supabase.

## Support

Pour toute assistance supplémentaire, contactez le support OVH ou consultez leur documentation sur l'hébergement de sites React/SPA.
