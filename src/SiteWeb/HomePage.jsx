import React from 'react';
import { Box, Button, Typography, Container, Divider, Grid, IconButton } from '@mui/material';
import back from "./PagePrincipale/backp.png";
import logo from "./icon2.png";
import { Link } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/VpnKey';
import LockIcon from '@mui/icons-material/Lock';
import QuoteIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import VerifiedIcon from '@mui/icons-material/Verified';
import AbusLogo from '../assets/pictures/Abus.png';
import SilcaLogo from '../assets/pictures/Silca.png';
import BricardLogo from '../assets/pictures/Bricard.png';
import Slider from './PagePrincipale/Slider';
const Login = () => {
  return (
    <Box sx={{ backgroundColor: '#F9F9F9', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <Box
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#F2F2F2',
          padding: '64px 0',
          position: 'relative'
        }}
      >
        <Container>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: '700' }}>
            Un double de clé ? Facile et rapide !
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: '700' }}>
            Appelez le 01 42 67 48 61
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, fontWeight: '300' }}>
            Reproduisez vos clés en ligne en toute sécurité.
          </Typography>
          {/* Boutons "bento modern" */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', gap: 2 }}>
            <Button
              component={Link}
              to="/trouvez.php"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '12px',
                backgroundColor: '#37A65E',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '600',
                padding: '12px 24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#2e8c52',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  backgroundColor: '#268545',
                  transform: 'translateY(0)'
                }
              }}
            >
              Commander un double de clé
            </Button>
            <Button
              component={Link}
              to="/cylindre.php"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '12px',
                backgroundColor: '#37A65E',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '600',
                padding: '12px 24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#2e8c52',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  backgroundColor: '#268545',
                  transform: 'translateY(0)'
                }
              }}
            >
              Commander un cylindre de sécurité
            </Button>
            <Button
              component={Link}
              to="/devis.php"
              variant="contained"
              size="large"
              sx={{
                borderRadius: '12px',
                backgroundColor: '#37A65E',
                color: '#fff',
                textTransform: 'none',
                fontWeight: '600',
                padding: '12px 24px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#2e8c52',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  backgroundColor: '#268545',
                  transform: 'translateY(0)'
                }
              }}
            >
              Demande de devis
            </Button>
          </Box>
        </Container>
      </Box>
      {/* fin hero section */}
      {/* Boutique Section */}
      <Container sx={{ py: 6, backgroundColor: '#F4F6F9', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 4, textAlign: 'center', color: '#333' }}>
          Visitez notre boutique au cœur de Paris 17ᵉ
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#555' }}>
          Située au 20 rue de Lévis, la Serrurerie Maison Bouvet vous accueille du lundi au samedi. pour tous vos besoins en serrurerie.
        </Typography>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center', color: '#555' }}>
          Nos services en boutique :
        </Typography>
        <Typography sx={{ textAlign: 'center', color: '#777' }}>- Reproduction de clés</Typography>
        <Typography sx={{ textAlign: 'center', color: '#777' }}>- Vente de serrures et cylindres</Typography>
        <Typography sx={{ textAlign: 'center', color: '#777' }}>- Conseils personnalisés</Typography>
        <Typography variant="h6" sx={{ mt: 3, textAlign: 'center', color: '#555' }}>
          Horaires d'ouverture : Du lundi au samedi, de 8h30 à 12h30 et de 14h00 à 18h00.
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#555' }}>
          Contactez-nous : Tél : 01 42 67 47 28 | Email : contact@cleservice.com
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#555' }}>
          Plan d'accès : Notre boutique est située à proximité des stations de métro Villiers (lignes 2 et 3) et Monceau (ligne 2).
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            component="a"
            href="https://www.google.com/maps?q=20+rue+de+Lévis,+Paris,+France"
            target="_blank"
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#37A65E', color: '#fff', '&:hover': { backgroundColor: '#0059b3' }, borderRadius: '50px' }}
          >
            Voir sur Google Maps
          </Button>
        </Box>
        {/* Google Map Embed */}
        <Container sx={{ py: 6, backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 4, textAlign: 'center', color: '#333' }}>
          Trouvez notre boutique
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#555', mb: 3 }}>
          Vous pouvez nous trouver à l'adresse suivante :
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyA7lo5IVVfLt8l5g5SiYbObTFVyEklhv5M&q=20+rue+de+Lévis,+Paris,+France"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </Box>
       </Container>
       </Container>
      {/* Services Section */}
      <Container sx={{ py: 6, backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 6, textAlign: 'center', color: '#333' }}>
          Nos Services En Ligne
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <KeyIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Faites-vous livrer votre clé </Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
              Grâce au numéro de votre clé, nous pouvons en réaliser une copie et vous l'envoyer directement. Livraison d'un double de clé conforme à l'original.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <LockIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Cylindre de sécurité</Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
                Remplacez vos cylindres de sécurité pour une protection renforcée de votre domicile.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <QuoteIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Demande de devis</Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
                Recevez un devis personnalisé pour vos besoins spécifiques en serrurerie.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      
      {/* Why Choose Us Section */}
      <Container sx={{ py: 6, backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 4, textAlign: 'center', color: '#333' }}>
          Pourquoi Choisir CleService.com ?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <BuildIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Expertise reconnue</Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
                Avec plus de 50 ans d'expérience, nous sommes spécialisés dans la reproduction de clés en ligne.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <LockIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Qualité garantie</Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
                Nos produits sont fabriqués directement par les plus grands fabricants de serrurerie, assurant une conformité totale.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ textAlign: 'center', backgroundColor: '#ffffff', padding: 4, borderRadius: '12px', boxShadow: 3 }}>
              <AccessTimeIcon sx={{ fontSize: 50, color: '#37A65E' }} />
              <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#333' }}>Service rapide et sécurisé</Typography>
              <Typography sx={{ mt: 1, color: '#777' }}>
                Commandez en ligne et recevez vos clés directement chez vous, en toute sécurité.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      {/* Partners Section */}
      <Container sx={{ py: 6, backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 3, textAlign: 'center', color: '#333' }}>
        Nos Fournisseurs
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', color: '#555' }}>
        Nous collaborons avec des marques de renom pour garantir la qualité de nos produits :
        </Typography>
        <Slider />
      </Container>

      
      {/* Order Process Section */}
      <Container sx={{ py: 6, backgroundColor: '#F4F6F9', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 4, textAlign: 'center', color: '#333' }}>
          Processus de Commande Simplifié
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <ArrowDownwardIcon sx={{ transform: 'rotate(-90deg)' }}/>
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '500', color: '#555' }}>
              1.Sélectionnez votre clé
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <ArrowDownwardIcon sx={{ transform: 'rotate(-90deg)' }}/>
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '500', color: '#555' }}>
              2.Tapez votre numéro de clé
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <ArrowDownwardIcon sx={{ transform: 'rotate(-90deg)' }} />
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '500', color: '#555' }}>
              3.Payez en ligne
            </Typography>
          </Grid>
          <Grid item sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <ArrowDownwardIcon sx={{ transform: 'rotate(-90deg)' }}/>
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '500', color: '#555' }}>
              4.Livraison à domicile
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button component={Link} to="/commande" variant="contained" size="large" sx={{ backgroundColor: '#37A65E', color: '#fff', '&:hover': { backgroundColor: '#0059b3' }, borderRadius: '50px' }}>
            Commencer votre commande
          </Button>
        </Box>
      </Container>
      {/* Quality & Security Commitment Section */}
      <Container sx={{ py: 6, backgroundColor: '#F9FAFB', borderRadius: '12px' }}>
        <Typography variant="h4" sx={{ fontWeight: '700', mb: 6, textAlign: 'center', color: '#333' }}>
          Engagement envers la qualité et la sécurité
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <VerifiedIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#555' }}>
              Certifications et garanties
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#777' }}>
              Nous garantissons des reproductions de clés conformes aux normes de sécurité en vigueur.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <IconButton sx={{ fontSize: '2rem', color: '#37A65E' }}>
              <LockIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mt: 2, fontWeight: '600', color: '#555' }}>
              Sécurité des transactions
            </Typography>
            <Typography sx={{ textAlign: 'center', color: '#777' }}>
              Vos données personnelles et vos paiements sont protégés grâce à des technologies de cryptage avancées.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      
      {/* Footer */}
            <Box sx={{ backgroundColor: '#F2F2F2', color: '#025920', py: 2, borderTop: '1px solid #025920', height: 'auto' }}>
                    <Container sx={{ textAlign: 'center', py: 1 }}>
                      <Typography variant="subtitle1" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif', fontWeight: '400' }}>
                        Maison Bouvet - CLÉ SERVICE
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        20 rue Lévis - 75017 Paris
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        Tél : 01 42 67 48 61 - Fax : 01 42 67 47 29
                      </Typography>
                      <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        <a href="mailto:contact@cleservice.com" style={{ color: '#025920', textDecoration: 'none' }}>
                          contact@cleservice.com
                        </a>
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        Ouvert du lundi au vendredi de 8h30 à 12h30 et de 14h à 18h
                      </Typography>
                      <Typography variant="caption" sx={{ mt: 1, color: '#025920', fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        Maison Bouvet - S.A.S. au capital de 1000€
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#025920', fontFamily: 'Poppins, sans-serif', fontWeight: '300' }}>
                        RCS PARIS : 500 188 339 – TVA : FR55500188339 - APE : 4674A
                      </Typography>
                    </Container>
                  </Box>
      
    </Box>
  );
};

export default Login;