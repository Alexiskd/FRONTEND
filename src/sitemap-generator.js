const path = require('path');
const Sitemap = require('react-router-sitemap').default;

// Définissez ici la liste des routes publiques de votre application
const routes = [
  '/',
  '/index.php',
  '/trouvez.php',
  '/catalogue-cles-coffre.php',
  '/catalogue-telecommandes.php',
  '/badges.php',
  '/services.php',
  '/cle/double-de-cle.html',
  '/zone.php',
  '/paiement_devis.php',
  '/recherche.php',
  '/contact.php',
  '/commande-success',
  '/commande-cancel',
  '/devis.php',
  '/qui.php',
  '/commande-panier',
  '/upload-multiple',
  '/politique-confidentialite',
  '/mentions-legales',
  '/conditions-generales',
  // Ajoutez d'autres routes fixes si nécessaire
];

// Créez et enregistrez le sitemap
function generateSitemap() {
  return new Sitemap(routes)
    .build('https://www.votresite.com') // Remplacez par l'URL de votre site
    .save(path.resolve('./public/sitemap.xml'));
}

generateSitemap();
