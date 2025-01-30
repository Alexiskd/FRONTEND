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
import back from "./backp.png";
import { CartContext } from '../context/CartContext.jsx';

const CleDynamicPage = () => {
  const { brandName } = useParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // États pour les notifications
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Accéder au contexte du panier
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (!brandName) {
      setError('La marque n\'a pas été fournie.');
      setLoading(false);
      return;
    }

    const fetchKeysByBrand = async () => {
      try {
        setLoading(true);
        setError(null);

        // Formater le brandName : majuscules et remplacer les espaces par des tirets
        const formattedBrandName = brandName.toUpperCase().replace(/\s+/g, '-');
        
        // Construire l'URL avec le brandName formaté
        const response = await fetch(`http://localhost:3000/produit/cles?marque=${encodeURIComponent(formattedBrandName)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `Erreur lors du chargement des clés pour la marque ${formattedBrandName}`);
        }

        const data = await response.json();

        // Décoder le nom de chaque clé
        const decodedData = data && Array.isArray(data) 
          ? data.map(item => ({
              ...item,
              nom: decodeURIComponent(item.nom),
              type_article: 'cle', // Ajout du type par défaut
            })) 
          : [];

        setKeys(decodedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKeysByBrand();
  }, [brandName]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredKeys = keys.filter((item) =>
    item.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (item) => {
    console.log('Données de l\'article envoyé à addToCart :', item);

    if (!item.nom || !item.type_article) {
      console.error('Les champs requis ne sont pas présents dans l\'article.');
      setSnackbarMessage('Erreur : Les informations de l\'article sont incomplètes.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    addToCart({
      nom_article: item.nom,
      type_article: item.type_article,
    });

    setSnackbarMessage('Article ajouté au panier avec succès !');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  const handleOrderNow = (item) => {
    const formattedBrandName = brandName.toUpperCase().replace(/\s+/g, '-');
    const encodedBrandName = encodeURIComponent(formattedBrandName);
    const articleType = 'cle'; // Puisque nous sommes dans CleDynamicPage
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
      {/* Section Hero du Catalogue */}
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
            Clés pour la marque {brandName.toUpperCase().replace(/\s+/g, '-')}
          </Typography>
        </Container>
      </Box>

      {/* Barre de Recherche */}
      <Container sx={{ py: 4 }}>
        <TextField
          label="Rechercher une clé"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Container>

      {/* Liste des Clés */}
      {loading ? (
        <Typography variant="h6" align="center">
          Chargement des clés...
        </Typography>
      ) : error ? (
        <Typography variant="h6" align="center" color="error">
          {error}
        </Typography>
      ) : filteredKeys.length > 0 ? (
        <Container sx={{ py: 2 }}>
          <Grid container spacing={2}>
            {filteredKeys.map((item, index) => (
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
                    {item.imageUrl && item.imageUrl.trim() !== '' ? (
                      <img
                        src={item.imageUrl}
                        alt={item.nom}
                        style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
                      />
                    ) : (
                      <Typography variant="body2" color="textSecondary">Aucune image disponible</Typography>
                    )}
                  </Box>

                  <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
                    {item.nom}
                  </Typography>
                  <Typography variant="body1" sx={{ my: 2 }}>
                    Prix : {item.prix ? `${item.prix} €` : 'Non disponible'}
                  </Typography>
                  {item.cleAvecCartePropriete && (
                    <Typography variant="body2" color="textSecondary">
                      Carte de propriété disponible
                    </Typography>
                  )}
                  {/* Assurez-vous que `delai_fabrication` existe dans vos données ou supprimez cette ligne si non nécessaire */}
                  {item.delai_fabrication && (
                    <Typography variant="body2" color="textSecondary" sx={{ my: 2 }}>
                      Délai de fabrication : {item.delai_fabrication || 'Non spécifié'}
                    </Typography>
                  )}

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
                      onClick={() => handleAddToCart(item)}
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
                      onClick={() => handleOrderNow(item)}
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
          Aucune clé trouvée pour cette recherche.
        </Typography>
      )}

      {/* Snackbar pour les notifications */}
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

export default CleDynamicPage;
