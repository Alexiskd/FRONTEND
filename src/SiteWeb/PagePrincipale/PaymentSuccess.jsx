import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Typography, Button, Container } from '@mui/material';
import { CheckCircle, Error as ErrorIcon } from '@mui/icons-material';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const paymentStatus = searchParams.get('status'); // Récupère le statut de l'URL

  return (
    <Box
      sx={{
        backgroundColor: '#F2F2F2',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Container
        sx={{
          maxWidth: '600px',
          backgroundColor: '#FFFFFF',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        {paymentStatus === 'success' ? (
          <>
            <CheckCircle sx={{ fontSize: 80, color: '#4CAF50', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Paiement Validé !
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Vous avez reçu un e-mail contenant un récapitulatif de votre commande
              ainsi que le bordereau d'envoi de votre clé.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#025920',
                '&:hover': { backgroundColor: '#014d16' },
                borderRadius: 3,
              }}
              onClick={() => (window.location.href = '/')}
            >
              Retour à l'accueil
            </Button>
          </>
        ) : (
          <>
            <ErrorIcon sx={{ fontSize: 80, color: '#F44336', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Paiement Échoué
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Une erreur est survenue lors du paiement. Veuillez réessayer.
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#F44336',
                '&:hover': { backgroundColor: '#D32F2F' },
                borderRadius: 3,
              }}
              onClick={() => (window.location.href = '/commande')}
            >
              Réessayer
            </Button>
          </>
        )}
      </Container>
    </Box>
  );
};

export default PaymentSuccess;
