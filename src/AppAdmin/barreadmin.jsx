import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  styled,
  useTheme,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  ShoppingCart as ShoppingCartIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';

// Définir la largeur du Drawer
const drawerWidth = 240;

// Palette de couleurs vert moderne
const greenPalette = {
  primary: '#4caf50', // Vert principal
  secondary: '#81c784', // Vert secondaire
  background: '#e8f5e9', // Fond léger
  active: '#388e3c', // Vert foncé pour l'élément actif
  hover: '#a5d6a7', // Vert clair pour le survol
  text: '#333', // Couleur du texte
  white: '#ffffff', // Blanc
};

// Styled components pour personnaliser le Drawer et les éléments de liste
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
    backgroundColor: greenPalette.background,
    borderRight: `1px solid ${greenPalette.primary}`,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

const StyledListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ theme, active }) => ({
  borderRadius: '8px',
  margin: '8px 16px',
  color: active ? greenPalette.white : greenPalette.text,
  backgroundColor: active ? greenPalette.primary : 'transparent',
  '&:hover': {
    backgroundColor: active ? greenPalette.primary : greenPalette.hover,
  },
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme, active }) => ({
  color: active ? greenPalette.white : greenPalette.text,
}));

const Barreadmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { text: 'Ajouter', icon: <AddIcon />, path: '/app/admin/ajouter' },
    { text: 'Commande', icon: <ShoppingCartIcon />, path: '/app/admin/commande' },
    { text: 'Statistiques', icon: <BarChartIcon />, path: '/app/admin/statistiques' },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    // Supprimer le token d'authentification
    localStorage.removeItem('token');
    // Rediriger vers la page de connexion admin
    navigate('/app/admin/login');
  };

  const drawerContent = (
    <>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" sx={{ color: greenPalette.primary }}>
          Admin
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: 'auto', mt: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <StyledListItemButton
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false); // Fermer le Drawer sur mobile après navigation
                }}
                active={isActive ? 1 : 0}
              >
                <StyledListItemIcon active={isActive ? 1 : 0}>
                  {item.icon}
                </StyledListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 'bold' : 'regular',
                  }}
                />
              </StyledListItemButton>
            );
          })}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <List>
          <StyledListItemButton
            onClick={handleLogout}
            sx={{ margin: '8px 16px', color: greenPalette.text }}
          >
            <ListItemIcon sx={{ color: greenPalette.text }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </StyledListItemButton>
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ display: { sm: 'none' }, position: 'fixed', top: 0, left: 0, zIndex: theme.zIndex.drawer + 1 }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ m: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: greenPalette.background,
            borderRight: `1px solid ${greenPalette.primary}`,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <StyledDrawer
        variant="permanent"
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        {drawerContent}
      </StyledDrawer>
    </Box>
  );
};

export default Barreadmin;
