// src/PagePrincipale/CoffreFortDynamic.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import back from "./backp.png"; // Assurez-vous que l'image "backp.png" est dans le bon répertoire
import { CartContext } from '../context/CartContext.jsx';

const CoffreFortDynamic = () => {
  const { brandName } = useParams(); // Récupérer la marque depuis l'URL
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [coffres, setCoffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Accéder au contexte du panier
  const { addToCart } = useContext(CartContext);

  // États pour les notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    if (!brandName) {
      setError('La marque n\'a pas été fournie.');
      setLoading(false);
      return;
    }

    const fetchCoffresByBrand = async () => {
      try {
        setLoading(true);
        setError(null);

        const formattedBrandName = brandName.toUpperCase().replace(/\s+/g, '-');
        console.log('Formatted Brand Name:', formattedBrandName); // Log de débogage

        // Mise à jour de l'URL pour récupérer les coffres-forts par marque
        const response = await fetch(`http://cleservice/api/produit/cles?marque=${formattedBrandName}`);

        if (!response.ok) {
          throw new Error(`Erreur lors du chargement des coffres-forts pour la marque ${formattedBrandName}`);
        }

        const data = await response.json();
        console.log('Réponse API:', data);  // Affichage des données récupérées pour vérifier la structure

        if (data && Array.isArray(data)) {
          setCoffres(data);
        } else {
          setCoffres([]);
        }

      } catch (err) {
        console.error('Erreur:', err.message); // Affichage de l'erreur dans la console
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoffresByBrand();
  }, [brandName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCoffres = coffres.filter((coffre) =>
    coffre.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = async (item) => {
    const addToPanierDto = {
      nom_article: item.nom,
      type_article: 'coffre-fort',
      // Vous pouvez ajouter d'autres informations nécessaires ici
    };

    try {
      // Si vous souhaitez envoyer le panier au backend sans authentification,
      // assurez-vous que votre backend peut gérer cela, peut-être avec une session ou un identifiant temporaire.
      const response = await fetch('http://cleservice/api/panier/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${token}`, // Supprimez ceci si l'authentification n'est pas requise
        },
        body: JSON.stringify(addToPanierDto),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout au panier.');
      }

      const result = await response.json();
      addToCart({ id: result.id, nom_article: item.nom, quantite: 1 });

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

  const handleOrderNow = (item) => {
    const formattedBrandName = brandName.toUpperCase().replace(/\s+/g, '-');
    const encodedBrandName = encodeURIComponent(formattedBrandName);
    const articleType = 'coffre-fort'; // Spécifique à CoffreFortDynamic
    const encodedArticleType = encodeURIComponent(articleType);
    const encodedArticleName = encodeURIComponent(item.nom);
    navigate(`/commander/${encodedBrandName}/${encodedArticleType}/${encodedArticleName}`);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Catalogue Hero Section */}
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
            Coffres-forts pour la marque {brandName.toUpperCase().replace(/\s+/g, '-')}
          </Typography>
        </Container>
      </Box>

      {/* Search Bar */}
      <Container sx={{ py: 4 }}>
        <TextField
          label="Rechercher un coffre-fort"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Container>

      {/* List of Coffres-forts */}
      {loading ? (
        <Typography variant="h6" align="center">
          Chargement des coffres-forts...
        </Typography>
      ) : error ? (
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      ) : filteredCoffres.length > 0 ? (
        <Container sx={{ py: 2 }}>
          <Grid container spacing={2}>
            {filteredCoffres.map((coffre, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    backgroundColor: '#FFFFFF',
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    textAlign: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.2)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '200px',
                      height: '200px',
                      backgroundColor: '#e0e0e0',
                      borderRadius: '8px',
                      margin: '0 auto 16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {coffre.image ? (
                      <img
                        src={coffre.image}
                        alt={coffre.nom}
                        style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">Aucune image disponible</Typography>
                    )}
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
                    {coffre.nom}
                  </Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Prix : {coffre.prix ? `${coffre.prix} €` : 'Non disponible'}
                  </Typography>
                  {coffre.coffre_avec_carte_propriete && (
                    <Typography variant="body2" color="textSecondary">
                      Carte de propriété disponible
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary" sx={{ my: 2 }}>
                    Délai de fabrication : {coffre.delai_fabrication || 'Non spécifié'}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        backgroundColor: '#025920',
                        '&:hover': {
                          backgroundColor: '#014d16',
                        },
                        height: '40px',
                        width: '230px',
                      }}
                      onClick={() => handleAddToCart(coffre)}
                    >
                      Ajouter au panier
                    </Button>

                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        backgroundColor: '#025920',
                        '&:hover': {
                          backgroundColor: '#014d16',
                        },
                        height: '40px',
                      }}
                      onClick={() => handleOrderNow(coffre)}
                    >
                      Commander
                    </Button>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Typography variant="h6" align="center">
          Aucun coffre-fort trouvé pour cette recherche.
        </Typography>
      )}

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

export default CoffreFortDynamic;
