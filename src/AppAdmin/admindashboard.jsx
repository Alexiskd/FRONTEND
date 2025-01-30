// AdminDashboard.jsx
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import Barreadmin from './barreadmin.jsx';
import Ajoutez from './ajoutez.jsx'; // Import de la nouvelle composante

const drawerWidth = 240;

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Barre de navigation latérale */}
      <Barreadmin />

      {/* Contenu principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Routes>
          {/* Route pour la nouvelle composante Ajoutez */}
          <Route path="/app/admin/ajouter" element={<Ajoutez />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default AdminDashboard;