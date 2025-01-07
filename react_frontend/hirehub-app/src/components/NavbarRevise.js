import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Box, Drawer, List, ListItem, ListItemButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faHouse, faBook, faInbox, faUser, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import SearchBar from './SearchBar';
import { UserContext } from '../userContext';
import { useContext } from 'react';

/**
 * Navigation Bar for quickly access of Search Bar, Course Page, Homepage, Account, Login/Signup or Logout
 */

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate(); // For navigation

  const handleLogout = () => {
    console.log("User logout");
    logout();
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Adjust button visibility based on screen width
  useEffect(() => {
    const updateShowButton = () => {
      setShowButton(window.innerWidth > 960);
    };
    window.addEventListener('resize', updateShowButton);
    updateShowButton(); // Initial check
    return () => window.removeEventListener('resize', updateShowButton);
  }, []);

  const drawer = (
    <Box sx={{ width: 250 }} onClick={handleDrawerToggle}>
      <List>
        <ListItem>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
            HireHub <FontAwesomeIcon icon={faChalkboardUser} style={{ marginLeft: 8 }} />
          </Typography>
        </ListItem>
        <ListItemButton component={Link} to="/home">
          <FontAwesomeIcon icon={faHouse} style={{ marginRight: 8 }} /> Home
        </ListItemButton>
        <ListItemButton component={Link} to="/course">
          <FontAwesomeIcon icon={faBook} style={{ marginRight: 8 }} /> Courses
        </ListItemButton>
        <ListItemButton component={Link} to="/inbox">
          <FontAwesomeIcon icon={faInbox} style={{ marginRight: 8 }} /> Inbox
        </ListItemButton>
        <ListItemButton component={Link} to="/account">
          <FontAwesomeIcon icon={faUser} style={{ marginRight: 8 }} /> Account
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar position="static"
        sx={{
          background: 'linear-gradient(90deg, rgb(72,50,33) 0%, rgb(39,27,17) 100%)', // Apply gradient
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'center',     // Centers content horizontally
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems='center' justifyContent='space-between' width='90%'>
            {/* Navbar Logo */}
            <Typography
              variant="h5"
              component={Link}
              to="/home"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', color: 'inherit', mr: 2 }}
            >
              HireHub <FontAwesomeIcon icon={faChalkboardUser} style={{ marginLeft: 8, fontSize: '1.5rem' }} />
            </Typography>

            {/* Search Bar */}
            <Box sx={{ flexGrow: 1, maxWidth: '40%', ml: 4 }}>
              <SearchBar />
            </Box>

            {/* Desktop Menu Links */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 'auto' }}>
              <Button component={Link} to="/home" color="inherit">
                <FontAwesomeIcon icon={faHouse} style={{ marginRight: 8, fontSize: '1.5rem' }} /> Home
              </Button>
              <Button component={Link} to="/course" color="inherit">
                <FontAwesomeIcon icon={faBook} style={{ marginRight: 8, fontSize: '1.5rem' }} /> Courses
              </Button>
              <Button component={Link} to="/inbox" color="inherit">
                <FontAwesomeIcon icon={faInbox} style={{ marginRight: 8, fontSize: '1.5rem' }} /> Inbox
              </Button>
              <Button component={Link} to="/account" color="inherit">
                <FontAwesomeIcon icon={faUser} style={{ marginRight: 8, fontSize: '1.5rem' }} /> Account
              </Button>
            </Box>

            {/* Login/Signup Button */}
            {/* Switch between Login/Signup and Logout */}
            {showButton && (user ? (
              <Button variant="outlined" color="inherit" component={Link} sx={{ ml: 2 }} onClick={handleLogout}>Logout</Button>
            ) : (
              <Button variant="outlined" color="inherit" component={Link} to="/" sx={{ ml: 2 }}>Login/Sign-up</Button>
            ))}

            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { md: 'none' } }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Navbar;
