import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import WikiIcon from '../assets/icons/wiki-icon.png'; // Adjust path as necessary
import CalendarIcon from '../assets/icons/calendar-icon.png'; // Adjust path as necessary

const Header = () => (
  <Box>
    <Box sx={{
      height: '50px',
      p: 2,
      bgcolor: 'primary.main',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Button 
        component="a" 
        href="https://www.google.com" 
        sx={{ display: 'flex', alignItems: 'center', textTransform: 'none' }} // Remove default button text styling
      >
        <img 
          src="https://wiki.aktivismus.org/uploads/images/system/2025-01/ADAFfZfZxlqEIjUz-b1gszpl3weynbzov-36b973bd-9f24-4286-a26d-fe01a10d7f94.jpeg" 
          alt="logo" 
          style={{ height: '50px', width: '50px', objectFit: 'cover' }} 
        />
        <Typography variant="h5" sx={{ ml: 2, color: 'white' }}>MovementWiki</Typography>
      </Button>
      
      {/* Flex container for buttons */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button color="inherit" href="https://wiki.aktivismus.org/" sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
          <img 
            src={WikiIcon} 
            alt="Wiki Icon" 
            style={{ marginRight: '8px', height: '20px', width: '20px', filter: 'invert(1)' }} // Invert colors to white
          />
          Wiki
        </Button>
        <Button color="inherit" href="https://kalender.aktivismus.org/" sx={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={CalendarIcon} 
            alt="Calendar Icon" 
            style={{ marginRight: '8px', height: '20px', width: '20px', filter: 'invert(1)' }} // Invert colors to white
          />
          Kalender
        </Button>
      </Box>
    </Box>
    
    <Box sx={{
      height: '150px',
      p: 2, 
      pb: 4,
      bgcolor: 'primary.main', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column', // Stack items vertically
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography variant="h2" align="center" sx={{ m: 1 }}>Bewegungs Glossar</Typography>
      <Typography variant="h6" align="center" sx={{ mb: 4, width: 500 }}>
        Lorem ipsum lalala naja vllt ne Beschreibung die auch ganz nett wäre aber die gibt es halt noch net :/
      </Typography>
    </Box>
  </Box>
);

export default Header;
