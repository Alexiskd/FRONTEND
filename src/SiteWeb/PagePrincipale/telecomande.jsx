import React, { useState } from 'react';
import { Box, Typography, Container, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom'; // Assurez-vous d'utiliser React Router
import back from "./backp.png";

const Telecomande = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([
    "TELECOMMANDES ADYX", "TELECOMMANDES ALBANO", "TELECOMMANDES ALLMATIC", "TELECOMMANDES ALLTRONIK", 
    "TELECOMAMNDES APERTO", "TELECOMMANDES APRIMATIC", "TELECOMMANDES ASTRELL", "TELECOMMANDES AVIDSEN",
    "TELECOMMANDES BENINCA", "TELECOMMANDES BFT", "TELECOMMANDES CAME", "TELECOMMANDES CARDIN", 
    "TELECOMMANDES CASALI", "TELECOMMANDES CASIT", "TELECOMMANDES CDS", "TELECOMMANDES CHAMBERLAIN",
    "TELECOMMANDES CPS", "TELECOMMANDES CRAWFORD", "TELECOMMANDES DEA", "TELECOMMANDES DELMA",
    "TELECOMMANDES DIAGRAL", "TELECOMMANDES DICKERT", "TELECOMMANDES DITEC", "TELECOMMANDES DOITRAND",
    "TELECOMMANDES DUCATI", "TELECOMMANDES ECE", "TELECOMMANDES ECOSTAR", "TELECOMMANDES EUROPE AUTOMATISME",
    "TELECOMMANDES EXTEL", "TELECOMMANDES FAAC", "TELECOMMANDES FADINI", "TELECOMMANDES FERPORT", 
    "TELECOMMANDES GENIUS", "TELECOMMANDES GIBIDI", "TELECOMMANDES HORMANN", "TELECOMMANDES JCM",
    "TELECOMMANDES KEY", "TELECOMMANDES KING GATES", "TELECOMMANDES LIFE", "TELECOMMANDES LIFTMASTER",
    "TELECOMMANDES MARANTEC", "TELECOMMANDES MHOUSE", "TELECOMMANDES MOTORLIFT", "TELECOMMANDES MOTORLINE",
    "TELECOMMANDES MOTOSTAR", "TELECOMMANDES NICE", "TELECOMMANDES NORMSTAHL", "TELECOMMANDES NOVOFERM",
    "TELECOMMANDES O&O", "TELECOMMANDES PORTIS", "TELECOMMANDES PRASTEL", "TELECOMMANDES PROEM", 
    "TELECOMMANDES PROGET", "TELECOMMANDES PROTECO", "TELECOMMANDES RIB", "TELECOMMANDES ROGER", 
    "TELECOMMANDES SEA", "TELECOMMANDES SEAV", "TELECOMMANDES SEIP", "TELECOMMANDES SENTINEL", 
    "TELECOMMANDES SERAI", "TELECOMMANDES SIMINOR", "TELECOMMANDES SIMU", "TELECOMMANDES SOMFY", 
    "TELECOMMANDES SOMMER", "TELECOMMANDES TAU", "TELECOMMANDES TELCOMA", "TELECOMMANDES TELECO", 
    "TELECOMMANDES TORMATIC", "TELECOMMANDES TREBI", "TELECOMMANDES TV-LINK", "TELECOMMANDES V2", 
    "TELECOMMANDES WAYNE DALTON"
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
    "TELECOMMANDES ADYX", "TELECOMMANDES ALBANO", "TELECOMMANDES ALLMATIC", "TELECOMMANDES ALLTRONIK", 
    "TELECOMAMNDES APERTO", "TELECOMMANDES APRIMATIC", "TELECOMMANDES ASTRELL", "TELECOMMANDES AVIDSEN",
    "TELECOMMANDES BENINCA", "TELECOMMANDES BFT", "TELECOMMANDES CAME", "TELECOMMANDES CARDIN", 
    "TELECOMMANDES CASALI", "TELECOMMANDES CASIT", "TELECOMMANDES CDS", "TELECOMMANDES CHAMBERLAIN",
    "TELECOMMANDES CPS", "TELECOMMANDES CRAWFORD", "TELECOMMANDES DEA", "TELECOMMANDES DELMA",
    "TELECOMMANDES DIAGRAL", "TELECOMMANDES DICKERT", "TELECOMMANDES DITEC", "TELECOMMANDES DOITRAND",
    "TELECOMMANDES DUCATI", "TELECOMMANDES ECE", "TELECOMMANDES ECOSTAR", "TELECOMMANDES EUROPE AUTOMATISME",
    "TELECOMMANDES EXTEL", "TELECOMMANDES FAAC", "TELECOMMANDES FADINI", "TELECOMMANDES FERPORT", 
    "TELECOMMANDES GENIUS", "TELECOMMANDES GIBIDI", "TELECOMMANDES HORMANN", "TELECOMMANDES JCM",
    "TELECOMMANDES KEY", "TELECOMMANDES KING GATES", "TELECOMMANDES LIFE", "TELECOMMANDES LIFTMASTER",
    "TELECOMMANDES MARANTEC", "TELECOMMANDES MHOUSE", "TELECOMMANDES MOTORLIFT", "TELECOMMANDES MOTORLINE",
    "TELECOMMANDES MOTOSTAR", "TELECOMMANDES NICE", "TELECOMMANDES NORMSTAHL", "TELECOMMANDES NOVOFERM",
    "TELECOMMANDES O&O", "TELECOMMANDES PORTIS", "TELECOMMANDES PRASTEL", "TELECOMMANDES PROEM", 
    "TELECOMMANDES PROGET", "TELECOMMANDES PROTECO", "TELECOMMANDES RIB", "TELECOMMANDES ROGER", 
    "TELECOMMANDES SEA", "TELECOMMANDES SEAV", "TELECOMMANDES SEIP", "TELECOMMANDES SENTINEL", 
    "TELECOMMANDES SERAI", "TELECOMMANDES SIMINOR", "TELECOMMANDES SIMU", "TELECOMMANDES SOMFY", 
    "TELECOMMANDES SOMMER", "TELECOMMANDES TAU", "TELECOMMANDES TELCOMA", "TELECOMMANDES TELECO", 
    "TELECOMMANDES TORMATIC", "TELECOMMANDES TREBI", "TELECOMMANDES TV-LINK", "TELECOMMANDES V2", 
    "TELECOMMANDES WAYNE DALTON"
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
            Catalogue des Télécommandes 
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
                {/* Lien vers la page de la marque */}
                <Link to={`/${brand.toLowerCase().replace(/\s+/g, '_')}_1_reproduction_cle.html`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
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

export default Telecomande;
