import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import back from "./backp.png";

const Contact = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    setFormValues({ name: '', email: '', message: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique d'envoi des données du formulaire
    console.log("Formulaire soumis :", formValues);
  };

  return (
    <Box sx={{ backgroundColor: '#EDEDED', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      {/* Header */}
      <Box 
        style={{
          backgroundImage: `url(${back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: '#FFFFFF',
          padding: '80px 0',
        }}
      >
        <Container>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '700' }}>
            Contactez-nous
          </Typography>
          <Typography variant="subtitle1" align="center" sx={{ fontFamily: 'Roboto, sans-serif', color: '#FFFFFF', maxWidth: '600px', mx: 'auto' }}>
            Nous sommes là pour répondre à toutes vos questions. Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
          </Typography>
        </Container>
      </Box>

      {/* Form Section */}
      <Container sx={{ py: 6, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{
            backgroundColor: '#FFFFFF',
            padding: 5,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '600', mb: 3 }}>
            Formulaire de Contact
          </Typography>
          
          {/* Form Fields */}
          <TextField
            label="Nom"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="filled"
            sx={{
              '& .MuiFilledInput-root': { backgroundColor: '#f5f5f5' },
              '& .Mui-focused': { borderColor: '#025920' },
              borderRadius: 1,
            }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="filled"
            sx={{
              '& .MuiFilledInput-root': { backgroundColor: '#f5f5f5' },
              '& .Mui-focused': { borderColor: '#025920' },
              borderRadius: 1,
            }}
          />
          <TextField
            label="Message"
            name="message"
            value={formValues.message}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="filled"
            multiline
            rows={4}
            sx={{
              '& .MuiFilledInput-root': { backgroundColor: '#f5f5f5' },
              '& .Mui-focused': { borderColor: '#025920' },
              borderRadius: 1,
            }}
          />

          {/* Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              sx={{
                bgcolor: '#025920',
                '&:hover': { bgcolor: '#024514' },
                px: 3,
              }}
            >
              Envoyer
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{
                color: '#025920',
                borderColor: '#025920',
                '&:hover': { borderColor: '#024514', color: '#024514' },
                px: 3,
              }}
            >
              Annuler
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;
