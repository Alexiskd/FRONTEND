import React, { useState, useContext, useEffect } from 'react';
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

// Importe votre CartContext :
import { CartContext } from '../context/CartContext';

const CommandePagePanier = () => {
  const { cartItems } = useContext(CartContext);

  // Infos client
  const [userInfo, setUserInfo] = useState({
    clientType: 'particulier',
    name: '',
    email: '',
    phone: '',
    address: '',
    postalCode: '',
    additionalInfo: '',
  });

  // Type de livraison
  const [deliveryType, setDeliveryType] = useState('');

  // Stocke les photos/clés pour chaque article
  // On crée un objet dont la clé est l'index de l'item ou un ID unique
  // Exemple : keyPhotos[3] = { keyNumber: 'AB123', frontPhoto: File, backPhoto: File }
  const [keyPhotos, setKeyPhotos] = useState({});

  // Snackbar (messages d'alerte)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  // Calcule le prix total (articles + livraison)
  const getTotalPrice = () => {
    // Somme du prix de tous les articles
    let itemsTotal = cartItems.reduce((sum, item) => {
      return sum + (item.prix || 0);
    }, 0);

    // Supplément selon le mode de livraison
    let deliveryCost = 0;
    switch (deliveryType) {
      case 'lettre':
        deliveryCost = 3;
        break;
      case 'chronopost':
        deliveryCost = 5;
        break;
      case 'recommande':
        deliveryCost = 10;
        break;
      default:
        deliveryCost = 0;
        break;
    }

    return itemsTotal + deliveryCost;
  };

  // Vérifie que tous les champs requis sont remplis (pour la démo)
  const validateForm = () => {
    // Vérifier userInfo
    const requiredUserFields = [
      userInfo.name,
      userInfo.email,
      userInfo.phone,
      userInfo.address,
      userInfo.postalCode,
      userInfo.additionalInfo,
    ];
    if (requiredUserFields.some((field) => !field.trim())) return false;

    // Vérifier le type de livraison
    if (!deliveryType) return false;

    // Vérifier, pour chaque article cle_avec_carte_propriete, que keyNumber + photos sont présents
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      if (item.cle_avec_carte_propriete) {
        const photoData = keyPhotos[i] || {};
        if (
          !photoData.keyNumber ||
          !photoData.frontPhoto ||
          !photoData.backPhoto
        ) {
          return false;
        }
      }
    }
    return true;
  };

  // Gestion des champs texte (informations client)
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Gestion de la sélection de type de livraison
  const handleDeliveryChange = (e) => {
    setDeliveryType(e.target.value);
  };

  // Gestion des champs propres à la clé (numéro, photos)
  const handleKeyInfoChange = (index, fieldName, value) => {
    setKeyPhotos((prev) => ({
      ...prev,
      [index]: { ...(prev[index] || {}), [fieldName]: value },
    }));
  };

  // Gestion des uploads
  const handlePhotoUpload = (index, fieldName, files) => {
    if (!files || !files[0]) return;
    setKeyPhotos((prev) => ({
      ...prev,
      [index]: { ...(prev[index] || {}), [fieldName]: files[0] },
    }));
  };

  // Soumission (fictive) de la commande
  const handleOrder = () => {
    if (!validateForm()) {
      setSnackbarMessage('Veuillez remplir tous les champs obligatoires.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }

    // Exemple de payload final
    const payload = {
      userInfo,
      deliveryType,
      articles: cartItems.map((item, index) => {
        // Si c'est une clé (avec carte), on y ajoute infos recto/verso, keyNumber, etc.
        const keyData = keyPhotos[index] || {};
        return {
          nom: item.nom_article || item.nom || 'Article Sans Nom',
          prix: item.prix || 0,
          cle_avec_carte_propriete: !!item.cle_avec_carte_propriete,
          keyNumber: keyData.keyNumber || '',
          frontPhoto: keyData.frontPhoto || null,
          backPhoto: keyData.backPhoto || null,
        };
      }),
      totalPrice: getTotalPrice(),
    };

    console.log('Payload de la commande :', payload);

    // Exemple de message de succès
    setSnackbarMessage(`Commande validée pour ${getTotalPrice()} € !`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);

    // Ici, vous pourriez rediriger vers une page de paiement
    // ou envoyer ce payload à votre backend
  };

  // Fermeture snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

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
        {/* Titre */}
        <Typography variant="h4" align="center" gutterBottom>
          Commander vos articles
        </Typography>

        {/* Liste des articles du panier */}
        {cartItems.map((item, index) => (
          <Card key={index} sx={{ mb: 4 }}>
            {item.image && (
              <CardMedia
                component="img"
                height="200"
                image={item.image}
                alt={item.nom_article}
              />
            )}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {item.nom_article || item.nom || 'Article Sans Nom'}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Prix : {item.prix ? `${item.prix} €` : 'Non spécifié'}
              </Typography>

              {/* Si c'est une clé avec carte propriétaire, afficher champs spécifiques */}
              {item.cle_avec_carte_propriete && (
                <>
                  <Typography
                    variant="h6"
                    sx={{ mt: 2, mb: 1, color: '#025920' }}
                  >
                    <VpnKey sx={{ verticalAlign: 'middle', mr: 1 }} />
                    Informations pour la clé *
                  </Typography>

                  {/* Numéro de la clé */}
                  <TextField
                    placeholder="* Numéro inscrit sur la clé"
                    variant="outlined"
                    fullWidth
                    value={keyPhotos[index]?.keyNumber || ''}
                    onChange={(e) =>
                      handleKeyInfoChange(index, 'keyNumber', e.target.value)
                    }
                    sx={{ mb: 2, borderRadius: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKey color="action" />
                        </InputAdornment>
                      ),
                    }}
                    required
                  />

                  {/* Upload photo recto */}
                  <Box
                    sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}
                  >
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      Photo de la clé (recto) * :
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label="Télécharger la photo recto"
                      component="label"
                      sx={{
                        backgroundColor: '#E3F2FD',
                        borderRadius: '8px',
                        padding: 1,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handlePhotoUpload(index, 'frontPhoto', e.target.files)
                        }
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Box>

                  {/* Upload photo verso */}
                  <Box
                    sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 1 }}
                  >
                    <Typography variant="body2" sx={{ color: '#333' }}>
                      Photo de la clé (verso) * :
                    </Typography>
                    <IconButton
                      color="primary"
                      aria-label="Télécharger la photo verso"
                      component="label"
                      sx={{
                        backgroundColor: '#E3F2FD',
                        borderRadius: '8px',
                        padding: 1,
                      }}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          handlePhotoUpload(index, 'backPhoto', e.target.files)
                        }
                      />
                      <PhotoCamera />
                    </IconButton>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Formulaire Informations Client */}
        <Typography variant="h5" sx={{ mt: 2, mb: 2, color: '#025920' }}>
          <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
          Informations Client *
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 2 }}>
          <RadioGroup
            row
            name="clientType"
            value={userInfo.clientType}
            onChange={(e) =>
              setUserInfo({ ...userInfo, clientType: e.target.value })
            }
          >
            <FormControlLabel
              value="particulier"
              control={<Radio />}
              label="Particulier"
            />
            <FormControlLabel
              value="entreprise"
              control={<Radio />}
              label="Entreprise"
            />
          </RadioGroup>
        </FormControl>

        <TextField
          placeholder={
            userInfo.clientType === 'entreprise'
              ? '* Nom de l\'entreprise'
              : '* Nom et prénom'
          }
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
          required
        />
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
            onChange={handleDeliveryChange}
            sx={{ borderRadius: 2 }}
            displayEmpty
            required
          >
            <MenuItem value="" disabled>
              Sélectionnez un type de livraison
            </MenuItem>
            <MenuItem value="lettre">Lettre (3€ - 3 jours)</MenuItem>
            <MenuItem value="chronopost">Chronopost (5€ - 1 jour)</MenuItem>
            <MenuItem value="recommande">Recommandé (10€ - 2 jours)</MenuItem>
          </Select>
        </FormControl>

        {/* Prix Total */}
        <Box
          sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4 }}
        >
          <Typography variant="h6">Prix total : {getTotalPrice()} €</Typography>
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
        autoHideDuration={5000}
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

export default CommandePagePanier;
