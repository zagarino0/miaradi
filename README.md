# Miaradi — Tour Operator Madagascar

Site vitrine statique pour présenter les circuits et expériences de voyage à Madagascar.

## Lancer en local

À la racine du dépôt :

```bash
python -m http.server 5500
```

Puis ouvrir http://localhost:5500

Aucune compilation ni dépendance Node.js n'est nécessaire.

## Structure

- `index.html` — contenu et sections du site
- `styles.css` — identité visuelle safari, responsive desktop/mobile
- `script.js` — diaporama de la page d'accueil, navigation mobile et formulaire de demande

## Notes

- Les images de démonstration sont chargées depuis des URL externes. Une connexion Internet est nécessaire pour les afficher.
- Le formulaire prépare un e-mail dans la messagerie du visiteur ; il ne stocke pas les demandes sur un serveur.
- Le diaporama respecte le réglage système « réduire les animations ».
