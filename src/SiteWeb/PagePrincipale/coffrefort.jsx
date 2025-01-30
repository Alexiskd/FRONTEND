import React, { useState } from 'react';
import { Box, Typography, Container, Grid, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Assurez-vous d'utiliser React Router
import back from "./backp.png";  // Assurez-vous que l'image "backp.png" est dans le bon répertoire

const Coffrefort = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([
    "ASSA", "BODE", "CECCHERELLI", "CIS", "CONFORTI", "CORBIN",
    "DUTO", "FASTA", "FICHET BAUCHE", "FUMEO-PARMA", "GLITTENBERG",
    "HAGELIN", "KROMER", "LIPS-VAGO", "MAUER", "MELSMETALL", "PARMA",
    "PARMA-PAS", "PICARDIE", "ROSENGREN", "SECURCASA", "SELLA & VALZ",
    "SIBI", "STIEHM", "STUV", "SWEDEN"
]);


  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filtrage des marques en fonction de la recherche
    const filtered = brands.filter((brand) =>
      brand.toLowerCase().includes(value)
    );
    setFilteredBrands(filtered);
  };

  const brands = [
    "ASSA", "BODE", "CECCHERELLI", "CIS", "CONFORTI", "CORBIN",
    "DUTO", "FASTA", "FICHET BAUCHE", "FUMEO-PARMA", "GLITTENBERG",
    "HAGELIN", "KROMER", "LIPS-VAGO", "MAUER", "MELSMETALL", "PARMA",
    "PARMA-PAS", "PICARDIE", "ROSENGREN", "SECURCASA", "SELLA & VALZ",
    "SIBI", "STIEHM", "STUV", "SWEDEN"
];


  return (
    <Box sx={{ backgroundColor: '#F2F2F2', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
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
            Catalogue des Clés de Coffre-Fort
          </Typography>
        </Container>
      </Box>
        



      {/* Search Bar */}
      <Container sx={{ py: 4 }}>
        <TextField
          label="Rechercher une marque"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mb: 4 }}
        />
      </Container>

      {/* List of Brands */}
      <Container sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {filteredBrands.map((brand, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box 
                sx={{
                  backgroundColor: '#FFFFFF',
                  padding: 2,
                  borderRadius: 1,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  textAlign: 'center',
                }}
              >
                {/* Lien vers la page dynamique pour les clés de coffre-fort */}
                <Link to={`/dynamic2/${brand.replace(/\s+/g, '-').toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '500' }}>
                    {brand}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      
    </Box>
  );
};

export default Coffrefort;
