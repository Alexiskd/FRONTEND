import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Box, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu'; // Icône hamburger pour le menu mobile
import logo from './icon2.png'; // Remplace par le chemin de ton logo
import Cart from './UserPA/cart.jsx'; // Import de la composante Cart

const Header = () => {
  const [open, setOpen] = useState(false); // Gère l'état d'ouverture du menu mobile

  // Fonction pour ouvrir/fermer le menu
  const toggleDrawer = (open) => {
    setOpen(open);
  };

  return (
    <div>
      <AppBar position="static" sx={{ backgroundColor: '#025920', boxShadow: 'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          {/* Box pour le logo et le texte */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: '600', fontSize: '1.25rem' }}>
              Cleservice.com
            </Typography>
          </Box>

          {/* Menu hamburger pour mobile */}
          <IconButton 
            color="inherit" 
            aria-label="menu" 
            onClick={() => toggleDrawer(true)} 
            sx={{ display: { xs: 'block', md: 'none' } }} // Afficher seulement sur mobile
          >
            <MenuIcon />
          </IconButton>

          {/* Menu pour les grandes tailles d'écran */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', width: '100%' }}>
            <Button color="inherit" component={Link} to="/" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/qui-sommes-nous.php" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Qui sommes-nous ?
            </Button>
            <Button color="inherit" component={Link} to="/trouvez.php" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Catalogue
            </Button>
            <Button color="inherit" component={Link} to="/catalogue-cles-coffre.php" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Coffre Fort
            </Button>
            <Button color="inherit" component={Link} to="/badges.php" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Badges
            </Button>
            <Button color="inherit" component={Link} to="/contact.php" sx={{ fontWeight: '500', marginLeft: '15px' }}>
              Contact
            </Button>
            {/* Composante Cart ajoutée ici */}
            <Cart />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Menu déroulant pour mobile */}
      <Drawer anchor="right" open={open} onClose={() => toggleDrawer(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => toggleDrawer(false)} // Ferme le menu lorsqu'on clique sur un élément
        >
          <List>
            <ListItem button component={Link} to="/" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/qui-sommes-nous.php" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Qui sommes-nous ?" />
            </ListItem>
            <ListItem button component={Link} to="/trouvez.php" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Catalogue" />
            </ListItem>
            <ListItem button component={Link} to="/coffrefort-dynamic" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Coffre Fort" />
            </ListItem>
            <ListItem button component={Link} to="/catalogue-telecommandes.php" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Telecommande" />
            </ListItem>
            <ListItem button component={Link} to="/badges.php" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Badges" />
            </ListItem>
            <ListItem button component={Link} to="/contact.php" sx={{ padding: '10px 20px' }}>
              <ListItemText primary="Contact" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
