import React from 'react';
import { Box, Typography, Container, Divider, Button, Grid, Avatar } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import back from "./backp.png";

const AboutUs = () => {
  return (
    <Box sx={{ backgroundColor: '#F9F9F9', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Poppins, sans-serif' }}>
      
      {/* Hero Section */}
      <Box style={{
                backgroundImage: `url(${back})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: '#F2F2F2',
                padding: '64px 0',
              }}>
        <Container>
          <Typography variant="h3" sx={{ fontWeight: 700, marginBottom: 2 }}>
          Qui sommes-nous ?

          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 300, marginBottom: 4 }}>
            Spécialistes en reproduction de clés depuis 30 ans, nous offrons un service moderne et sécurisé directement en ligne.
          </Typography>
          
        </Container>
      </Box>

      {/* About Us Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 500, color: '#333', marginBottom: 4 }}>
          À propos de CLE SERVICE - La Maison BOUVET
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', fontWeight: 300, marginBottom: 4 }}>
          CLE SERVICE vous propose un service rapide et sécurisé de reproduction de clés en ligne, grâce à plus de 30 ans d'expertise dans le domaine de la serrurerie et de la sécurité. 
          Simplifiez vos démarches et bénéficiez d’un service de qualité, rapide et sécurisé, sans vous déplacer.
        </Typography>

        <Typography variant="h6" align="center" sx={{ fontWeight: 600, color: '#37A65E', marginBottom: 2 }}>
          Vous avez besoin d'un double de clé ?
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', fontWeight: 300, marginBottom: 4 }}>
          Fini les allers-retours avec votre serrurier. Grâce à **CLE SERVICE**, vous pouvez commander un double de clé directement depuis chez vous, et le recevoir à domicile, rapidement et sans effort.
        </Typography>

        {/* Key Benefits Section */}
        <Grid container spacing={4} justifyContent="center" sx={{ marginBottom: 6 }}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: 3, boxShadow: 3, textAlign: 'center', height: '100%' }}>
              <Avatar sx={{ backgroundColor: '#37A65E', width: 60, height: 60, margin: '0 auto' }}>
                <CheckCircleOutline sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#37A65E', marginTop: 2 }}>
                Commandez en ligne
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', marginTop: 1 }}>
                Commandez facilement votre reproduction de clé depuis chez vous en quelques clics.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: 3, boxShadow: 3, textAlign: 'center', height: '100%' }}>
              <Avatar sx={{ backgroundColor: '#37A65E', width: 60, height: 60, margin: '0 auto' }}>
                <CheckCircleOutline sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#37A65E', marginTop: 2 }}>
                Recevez chez vous
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', marginTop: 1 }}>
                Profitez de la livraison rapide directement à votre porte, sans perte de temps.
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: 3, boxShadow: 3, textAlign: 'center', height: '100%' }}>
              <Avatar sx={{ backgroundColor: '#37A65E', width: 60, height: 60, margin: '0 auto' }}>
                <CheckCircleOutline sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, color: '#37A65E', marginTop: 2 }}>
                Service Précis
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', marginTop: 1 }}>
                Nous nous assurons que chaque clé reproduite respecte une précision optimale, même pour des modèles spécifiques.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Client Trust Section */}
        <Typography variant="h5" align="center" sx={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
          Nos clients nous font déjà confiance :
        </Typography>

        <Typography variant="body1" align="center" sx={{ color: '#555', fontWeight: 300, marginBottom: 6 }}>
          Ambassade de Colombie, Ambassade de Russie, Salon de l’Automobile, Restaurant François Clerc, Burberrys, Givenchy, Monceau Fleurs, MACIF, Monoprix, Yves Rocher, Crédit Maritime, Ligue Nationale de Football, et bien d’autres institutions.
        </Typography>

        <Typography variant="body1" sx={{ color: '#555', fontWeight: 300, marginBottom: 6 }}>
          Comme eux, optez pour CLE SERVICE et bénéficiez de notre rapidité, qualité et sécurité.
        </Typography>

        {/* Call to Action */}
        <Grid container justifyContent="center">
          <Grid item>
          <Button
            component={Link}
            to="/contact.php"
            variant="contained"
            sx={{
              backgroundColor: '#37A65E',
              color: '#FFFFFF',
              borderRadius: '20px',
              padding: '18px 50px',  // Augmenter la largeur du bouton
              fontWeight: '600',
              textTransform: 'none',
              width: 'auto',  // Vous pouvez aussi ajuster à '100%' si vous voulez qu'il prenne toute la largeur disponible
              '&:hover': {
              backgroundColor: '#F1F1F1',
              transform: 'translateY(-2px)',
              
    },
  }}
>
  Nous contacter
</Button>

          </Grid>
        </Grid>

      </Container>

      
      
    </Box>
  );
};

export default AboutUs;
