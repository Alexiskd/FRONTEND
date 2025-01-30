import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from "./appbar.jsx";
import Footer from './PagePrincipale/footer.jsx';
import { CartProvider } from './context/CartContext.jsx';
import styled, { createGlobalStyle } from 'styled-components';
import Barreadmin from '../AppAdmin/barreadmin.jsx';
import Ajoutez from '../AppAdmin/ajoutez.jsx';

// Importation paresseuse des composants pour optimiser le chargement
const CommandePagePanier = lazy(() => import('./PagePrincipale/commandePagePanier.jsx'));
const Login = lazy(() => import("../SiteWeb/HomePage.jsx"));
const Catalogue = lazy(() => import("./PagePrincipale/catologue.jsx"));
const CleDynamicPage = lazy(() => import("./PagePrincipale/CleDynamicPage.jsx"));
const CoffreFortDynamic = lazy(() => import('./PagePrincipale/CoffreFortDynamic.jsx'));
const Coffrefort = lazy(() => import('./PagePrincipale/coffrefort.jsx'));
const Telecomande = lazy(() => import('./PagePrincipale/telecomande.jsx'));
const Badgeuu = lazy(() => import('./PagePrincipale/badge.jsx'));
const AutreService = lazy(() => import('./PagePrincipale/autreservice.jsx'));
const Contact = lazy(() => import('./PagePrincipale/contact.jsx'));
const ProtectedRoute = lazy(() => import('../Protect-route.jsx'));
const PaymentSuccess = lazy(() => import('./PagePrincipale/PaymentSuccess.jsx'));
const Devis = lazy(() => import('./UserPA/devis.jsx'));
const TutorialPopup = lazy(() => import('./PagePrincipale/tuto.jsx'));
const AboutUs = lazy(() => import('./PagePrincipale/aboutus.jsx'));
const CommandePage = lazy(() => import('./PagePrincipale/commandePage.jsx'));
const Loginside = lazy(() => import('../AppAdmin/loginside.jsx'));

// Styles globaux
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #ffffff;
    color: #333333;
    line-height: 1.6;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.3s ease;
  }

  a:hover {
    color: rgb(0, 179, 63);
  }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const LoadingContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  &:after {
    content: ' ';
    display: block;
    width: 50px;
    height: 50px;
    border: 6px solid #f3f3f3;
    border-top: 6px solid #025920;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ProtectedRouteWrapper = ({ children }) => {
  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  return isAuthenticated() ? children : <Navigate to="/app" />;
};

const App = () => {
  const location = useLocation(); // Hook pour récupérer le chemin actuel
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Affiche la popup tutorielle uniquement pour certaines routes
    if (location.pathname === '/trouvez.php' || location.pathname === '/catalogue-cles-coffre.php') {
      setShowTutorial(true);
    } else {
      setShowTutorial(false);
    }
  }, [location]);

  const handleCloseTutorial = () => setShowTutorial(false);

  // Détection si la route actuelle est une route admin
  const isAdminRoute = location.pathname.startsWith('/app/admin');

  return (
    <CartProvider>
      <AppContainer>
        {/* Styles globaux */}
        <GlobalStyle />

        {/* En-tête, affiché uniquement si ce n'est pas une route admin */}
        {!isAdminRoute && <Header />}

        {/* Popup tutorielle */}
        {showTutorial && <TutorialPopup onClose={handleCloseTutorial} />}

        {/* Routes */}
        <Suspense fallback={<LoadingContainer />}>
          <Routes>
            {/* Routes publiques */}
            <Route path="/" element={<Login />} />
            <Route path="/trouvez.php" element={<Catalogue />} />
            <Route path="/catalogue-cles-coffre.php" element={<Coffrefort />} />
            <Route path="/catalogue-telecommandes.php" element={<Telecomande />} />
            <Route path="/badges.php" element={<Badgeuu />} />
            <Route path="/services.php" element={<AutreService />} />
            <Route path="/contact.php" element={<Contact />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

            {/* Routes dynamiques */}
            <Route path="/dynamic/:brandName" element={<CleDynamicPage />} />
            <Route path="/dynamic2/:brandName" element={<CoffreFortDynamic />} />

            {/* Formulaire de devis */}
            <Route path="/devis.php" element={<Devis />} />

            {/* "Qui sommes-nous ?" */}
            <Route path="/qui-sommes-nous.php" element={<AboutUs />} />

            {/* Routes de commande */}
            <Route path="/commander/:brandName/:articleType/:articleName" element={<CommandePage />} />
            <Route path="/commande-panier" element={<CommandePagePanier />} />
            {/* Routes admin */}
            <Route
              path="/app/admin/*"
              element={
                <ProtectedRouteWrapper>
                  <Box sx={{ display: 'flex' }}>
                    {/* Barre de navigation latérale */}
                    <Barreadmin />

                    {/* Contenu principal */}
                    <Box
                      component="main"
                      sx={{
                        flexGrow: 1,
                        bgcolor: 'background.default',
                        p: 3,
                        ml: '240px',
                      }}
                    >
                      <Routes>
                        {/* Route pour la nouvelle composante Ajoutez */}
                        <Route path="ajouter" element={<Ajoutez />} />
                      </Routes>
                    </Box>
                  </Box>
                </ProtectedRouteWrapper>
              }
            />

            {/* Page de connexion admin */}
            <Route path="/app" element={<Loginside />} />

            {/* Route 404 */}
            <Route
              path="*"
              element={
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <h1 style={{ fontSize: '3rem', color: '#FF4D4F' }}>404 - Page Non Trouvée</h1>
                  <p style={{ fontSize: '1.5rem', color: '#555' }}>
                    La page que vous recherchez n'existe pas ou a été déplacée.
                  </p>
                </div>
              }
            />
          </Routes>
        </Suspense>

        {/* Footer, affiché uniquement si ce n'est pas une route admin */}
        {!isAdminRoute && <Footer />}
      </AppContainer>
    </CartProvider>
  );
};

export default App;
