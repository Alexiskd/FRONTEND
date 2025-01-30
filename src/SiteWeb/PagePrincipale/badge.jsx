import React, { useContext, useState } from 'react';
import { Box, Typography, Container, Button, Snackbar, Alert } from '@mui/material';
import back from "./backp.png";
import badgeImage from "./badges.jpg";
import { CartContext } from '../context/CartContext.jsx';

const Badgeuu = () => {
  // Accéder au contexte du panier
  const { addToCart, isLoggedIn, userId } = useContext(CartContext);

  // États pour les notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleAddToCart = async () => {
    if (!isLoggedIn || !userId) {
      setSnackbarMessage('Veuillez vous connecter pour ajouter des articles au panier.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    const addToPanierDto = {
      utilisateur_id: userId,
      nom_article: 'Badge Vigik',
      type_article: 'normal',
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/panier/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(addToPanierDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout au panier.');
      }

      const result = await response.json();
      addToCart({ id: result.id, nom_article: 'Badge Vigik', quantite: 1 });

      setSnackbarMessage('Article ajouté au panier avec succès.');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (err) {
      console.error('Erreur lors de l\'ajout au panier:', err.message);
      setSnackbarMessage(`Erreur: ${err.message}`);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleOrderNow = () => {
    if (!isLoggedIn || !userId) {
      setSnackbarMessage('Veuillez vous connecter pour commander cet article.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    setSnackbarMessage('Commande immédiate pour le Badge Vigik effectuée avec succès !');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Header */}
      <Box 
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#F2F2F2',
          padding: '64px 0',
        }}
      >
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700' }}>
            Badge Vigik
          </Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Container sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box 
          sx={{
            backgroundColor: '#FFFFFF',
            padding: 4,
            borderRadius: 1,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '500px'
          }}
        >
          <img 
            src={badgeImage} 
            alt="Badge Vigik" 
            style={{ width: '100%', borderRadius: '8px' }} 
          />
          <Typography variant="h6" sx={{ mt: 2, fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
            Badge Vigik
          </Typography>
          <Typography variant="body1" sx={{ color: '#333', mt: 1 }}>
            Prix : 30€ unitaire
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#025920',
                '&:hover': {
                  backgroundColor: '#014d16',
                },
                height: '36px',
              }}
              onClick={handleAddToCart}
            >
              Ajouter au panier
            </Button>

            <Button
              variant="contained"
              sx={{
                backgroundColor: '#025920',
                '&:hover': {
                  backgroundColor: '#014d16',
                },
                height: '36px',
              }}
              onClick={handleOrderNow}
            >
              Commander
            </Button>
          </Box>
        </Box>
      </Container>

     

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Badgeuu;
