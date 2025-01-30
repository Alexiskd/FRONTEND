import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, TextField, Fab } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import back from "./backp.png";
import styled from 'styled-components';
const Catalogue = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBrands, setFilteredBrands] = useState([
    "ABUS", "ANKER", "BRICARD", "CAVERS", "CAVITH", "CITY", "CLE-A-GORGES", "CLE-MAGNETIQUE", "CODEM", "CR", "DENY",
    "DMC", "DOM", "ERREBI", "EURO-LOCKS", "FICHET", "FONTAINE", "FTH", "GEBA", "HERACLES", "HK-RR", "ISEO", "IZIS",
    "JMA", "JPM", "KABA", "KESO", "LAPERCHE", "LOTUS", "MEDECO", "MERONI", "METALUX", "MOTTURA", "MUEL", "MUL-T-LOCK",
    "PICARD", "POLLUX", "RADIAL", "REELAX", "RONIS", "SILCA", "TESA", "VACHETTE", "VAK", "VIGISTAR", "YALE", "YARDENI"
  ]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setShowInfo(true);
    const timer = setTimeout(() => {
      setShowInfo(false);
    }, 30000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = brands.filter((brand) =>
      brand.toLowerCase().includes(value)
    );
    setFilteredBrands(filtered);
  };

  const brands = [
    "ABUS", "ANKER", "BRICARD", "CAVERS", "CAVITH", "CITY", "CLE-A-GORGES", "CLE-MAGNETIQUE", "CODEM", "CR", "DENY",
    "DMC", "DOM", "ERREBI", "EURO-LOCKS", "FICHET", "FONTAINE", "FTH", "GEBA", "HERACLES", "HK-RR", "ISEO", "IZIS",
    "JMA", "JPM", "KABA", "KESO", "LAPERCHE", "LOTUS", "MEDECO", "MERONI", "METALUX", "MOTTURA", "MUEL", "MUL-T-LOCK",
    "PICARD", "POLLUX", "RADIAL", "REELAX", "RONIS", "SILCA", "TESA", "VACHETTE", "VAK", "VIGISTAR", "YALE", "YARDENI"
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
          <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '700' }}>
            Catalogue des Marques de Clés
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
                <Link to={`/dynamic/${brand.toLowerCase().replace(/\s+/g, '-')}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography variant="subtitle1" sx={{ fontFamily: 'Roboto, sans-serif', fontWeight: '400' }}>
                    {brand}
                  </Typography>
                </Link>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Info Button - Floating with fade-in/out effect */}
      {showInfo && (
        <Fab
          color="primary"
          sx={{
            position: 'fixed',
            bottom: 12,
            right: 12,
            zIndex: 10,
            backgroundColor: '#025920',
            '&:hover': {
              backgroundColor: '#013d17',
            },
            width: 40,
            height: 40,
            padding: 1,
            opacity: showInfo ? 1 : 0,  // Fade in/out
            transition: 'opacity 1s ease-in-out',  // Smooth transition
          }}
        >
          <InfoIcon sx={{ fontSize: 20 }} />
        </Fab>
      )}

      {/* Info Tooltip Box with fade-in/out effect */}
      {showInfo && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 51,
            right: 35,
            backgroundColor: '#FFFFFF',  // White background
            padding: 1.5,
            borderRadius: '6px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '250px',
            zIndex: 20,
            opacity: showInfo ? 1 : 0,  // Fade in/out
            transition: 'opacity 1s ease-in-out',  // Smooth transition
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '600',
              color: '#000000',  // Black text
              mb: 0.8,
              fontSize: '0.875rem',
            }}
          >
            95 % du marché des clés est représenté par ces marques.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400',
              color: '#000000',  // Black text
              lineHeight: 1.6,
              fontSize: '0.75rem',
            }}
          >
            Vous pouvez également rencontrer d'autres noms associés à ces marques comme : CYLIQ, REELAX, DARMON, FORUM, COGEFERM, ZEISS IKON, et plus encore.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '400',
              color: '#000000',  // Black text
              lineHeight: 1.6,
              fontSize: '0.75rem',
            }}
          >
            Si vous trouvez des marques non listées, n'hésitez pas à nous les communiquer !
          </Typography>
        </Box>
      )}

 


 
    </Box>
  );
};

export default Catalogue;
