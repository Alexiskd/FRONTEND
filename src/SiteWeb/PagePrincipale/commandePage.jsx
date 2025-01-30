// src/PagePrincipale/CommandePage.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  Snackbar,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import {
  PhotoCamera,
  CloudUpload,
  Person,
  Email,
  Phone,
  Home,
  LocationCity,
  Info,
  VpnKey,
  LocalShipping,
  CheckCircle,
  Error as ErrorIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const CommandePage = () => {
  const { brandName, articleType, articleName } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userInfo, setUserInfo] = useState({
    clientType: 'particulier',
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    additionalInfo: '',
  });
  const [keyInfo, setKeyInfo] = useState({
    keyNumber: '',
    frontPhoto: null,
    backPhoto: null,
  });
  const [deliveryType, setDeliveryType] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log(`Fetching article for type: ${articleType}, brand: ${brandName}, name: ${articleName}`);

        // Détermination de l'URL en fonction du type d'article
        let endpoint = `http://localhost:3000/produit/cles/by-name?nom=${encodeURIComponent(articleName)}`;
        

        const response = await fetch(endpoint);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Article non trouvé.');
          } else {
            throw new Error('Erreur lors du chargement de l\'article.');
          }
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        // Vérification si le brandName correspond
        if (data && data.marque && data.marque.toLowerCase() !== brandName.toLowerCase()) {
          throw new Error('Marque de l\'article ne correspond pas.');
        }

        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [brandName, articleName, articleType]);


  const validateForm = () => {
    const requiredFields = [
      userInfo.name,
      userInfo.email,
      userInfo.phone,
      userInfo.address,
      userInfo.postalCode,
      keyInfo.keyNumber,
      keyInfo.frontPhoto,
      keyInfo.backPhoto,
      deliveryType,
    ];
  
    return requiredFields.every((field) => field && field.toString().trim() !== "");
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name in userInfo) {
      setUserInfo((prev) => ({ ...prev, [name]: value }));
    } else if (name in keyInfo) {
      setKeyInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoUpload = (event) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      setKeyInfo((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      setSnackbarMessage("Veuillez remplir tous les champs obligatoires.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return; // Empêche la redirection si le formulaire est invalide
    }
  
    try {
      // Procéder à l'envoi de la commande
      const requestData = {
        amount: Math.round(article.prix * 100), // Convert to cents for most payment systems
        currency: 'eur',
        description: `Achat de ${article.nom}`,
        return_url: 'https://www.cleservice.com/trouvez.php',
      };
  
      const response = await fetch('http://localhost:3000/stancer/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error("Erreur lors de la création du paiement.");
      }
  
      const paymentData = await response.json();
  
      if (!paymentData.paymentUrl) {
        throw new Error("L'URL de paiement est manquante.");
      }
  
      // Redirection vers la page de paiement
      window.location.href = paymentData.paymentUrl;
    } catch (error) {
      console.error("Erreur lors de la commande:", error.message);
      setSnackbarMessage(`Erreur: ${error.message}`);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  
  
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6">Chargement de la commande...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', py: 4 }}>
      <Container
        sx={{
          maxWidth: '800px',
          backgroundColor: '#FFFFFF',
          padding: 4,
          borderRadius: 3,
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Informations de l'Article */}
        <Card sx={{ mb: 4 }}>
          {article?.image && (
            <CardMedia
              component="img"
              height="300"
              image={article.image}
              alt={article.nom}
            />
          )}
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {article.nom}
            </Typography>
            {article.description && (
              <Typography variant="body1" color="textSecondary">
                {article.description}
              </Typography>
            )}
            {article.cle_avec_carte_propriete && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                <VpnKey sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                Carte de propriété disponible
              </Typography>
            )}
            <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
              Délai de fabrication : {article.delai_fabrication || 'Non spécifié'}
            </Typography>
          </CardContent>
        </Card>

        {/* Formulaire de Commande */}
        <Typography variant="h4" align="center" gutterBottom>
          Commander {article?.nom || 'un article'}
        </Typography>

        {/* Section Informations sur la clé */}
        {article?.cle_avec_carte_propriete && (
          <>
            <Typography variant="h6" sx={{ mt: 3, mb: 2, color: '#025920' }}>
              <VpnKey sx={{ verticalAlign: 'middle', mr: 1 }} />
              Informations sur la clé *
            </Typography>
            <TextField
              placeholder="* Numéro inscrit sur la clé"
              variant="outlined"
              fullWidth
              name="keyNumber"
              value={keyInfo.keyNumber}
              onChange={handleInputChange}
              sx={{ mb: 3, borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKey color="action" />
                  </InputAdornment>
                ),
              }}
              aria-label="Numéro inscrit sur la clé"
              required
            />
          </>
        )}

        {/* Upload Photos de la Clé */}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#333' }}>
            Photo de la clé (recto) * :
          </Typography>
          <IconButton
            color="primary"
            aria-label="Télécharger la photo recto de la clé"
            component="label"
            sx={{
              backgroundColor: '#E3F2FD',
              borderRadius: '8px',
              padding: 1,
            }}
            required
          >
            <input type="file" name="frontPhoto" accept="image/*" hidden onChange={handlePhotoUpload} />
            <PhotoCamera />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
          <Typography variant="body2" sx={{ color: '#333' }}>
            Photo de la clé (verso) * :
          </Typography>
          <IconButton
            color="primary"
            aria-label="Télécharger la photo verso de la clé"
            component="label"
            sx={{
              backgroundColor: '#E3F2FD',
              borderRadius: '8px',
              padding: 1,
            }}
            required
          >
            <input type="file" name="backPhoto" accept="image/*" hidden onChange={handlePhotoUpload} />
            <PhotoCamera />
          </IconButton>
        </Box>

        {/* Section Informations Client */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#025920' }}>
          <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
          Informations Client *
        </Typography>
        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <RadioGroup
            row
            name="clientType"
            value={userInfo.clientType}
            onChange={handleInputChange}
          >
            <FormControlLabel value="particulier" control={<Radio />} label="Particulier" />
            <FormControlLabel value="entreprise" control={<Radio />} label="Entreprise" />
          </RadioGroup>
        </FormControl>
        {userInfo.clientType === 'entreprise' ? (
          <TextField
            placeholder="* Nom de l'entreprise"
            variant="outlined"
            fullWidth
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            sx={{ mb: 3, borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            aria-label="Nom de l'entreprise"
            required
          />
        ) : (
          <TextField
            placeholder="* Nom et prénom"
            variant="outlined"
            fullWidth
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            sx={{ mb: 3, borderRadius: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            aria-label="Nom et prénom"
            required
          />
        )}
        <TextField
          placeholder="* Adresse email"
          variant="outlined"
          fullWidth
          name="email"
          type="email"
          value={userInfo.email}
          onChange={handleInputChange}
          sx={{ mb: 3, borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            ),
          }}
          aria-label="Adresse email"
          required
        />
        <TextField
          placeholder="* Téléphone"
          variant="outlined"
          fullWidth
          name="phone"
          type="tel"
          value={userInfo.phone}
          onChange={handleInputChange}
          sx={{ mb: 3, borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone color="action" />
              </InputAdornment>
            ),
          }}
          aria-label="Téléphone"
          required
        />
        <TextField
          placeholder="* Adresse de livraison"
          variant="outlined"
          fullWidth
          name="address"
          value={userInfo.address}
          onChange={handleInputChange}
          sx={{ mb: 3, borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home color="action" />
              </InputAdornment>
            ),
          }}
          aria-label="Adresse de livraison"
          required
        />
        <TextField
          placeholder="* Code postal"
          variant="outlined"
          fullWidth
          name="postalCode"
          value={userInfo.postalCode}
          onChange={handleInputChange}
          sx={{ mb: 3, borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCity color="action" />
              </InputAdornment>
            ),
          }}
          aria-label="Code postal"
          required
        />
        <TextField
          placeholder="* Informations complémentaires de livraison"
          variant="outlined"
          fullWidth
          name="additionalInfo"
          value={userInfo.additionalInfo}
          onChange={handleInputChange}
          sx={{ mb: 3, borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Info color="action" />
              </InputAdornment>
            ),
          }}
          aria-label="Informations complémentaires de livraison"
          required
        />

        {/* Section Type de Livraison */}
        <Typography variant="h6" sx={{ mt: 4, mb: 2, color: '#025920' }}>
          <LocalShipping sx={{ verticalAlign: 'middle', mr: 1 }} />
          Type de Livraison *
        </Typography>
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Select
            value={deliveryType}
            onChange={(e) => setDeliveryType(e.target.value)}
            sx={{ borderRadius: 2 }}
            displayEmpty
            inputProps={{ 'aria-label': 'Type de Livraison' }}
            required
          >
            <MenuItem value="" disabled>
              Sélectionnez un type de livraison
            </MenuItem>
            <MenuItem value="lettre">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CloudUpload sx={{ mr: 1 }} />
                Lettre (3€ - 3 jours)
              </Box>
            </MenuItem>
            <MenuItem value="chronopost">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CloudUpload sx={{ mr: 1 }} />
                Chronopost Sécurisé (5€ - 1 jour)
              </Box>
            </MenuItem>
            <MenuItem value="recommande">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CloudUpload sx={{ mr: 1 }} />
                Recommandé Sécurisé (10€ - 2 jours)
              </Box>
            </MenuItem>
          </Select>
        </FormControl>

        {/* Prix Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}>
          <Typography variant="h6">
            Prix total : {article?.prix ? `${article.prix} €` : 'Non spécifié'}
          </Typography>
          <Button
            variant="contained"
            startIcon={<CheckCircle />}
            sx={{
              backgroundColor: '#025920',
              '&:hover': {
                backgroundColor: '#014d16',
              },
              borderRadius: 3,
              paddingX: 3,
            }}
            onClick={handleOrder}
          >
            Commander
          </Button>
        </Box>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
          iconMapping={{
            success: <CheckCircle fontSize="inherit" />,
            error: <ErrorIcon fontSize="inherit" />,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CommandePage;
