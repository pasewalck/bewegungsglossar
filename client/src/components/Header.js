import { Box, Typography, Button } from '@mui/material';
import AppLinksDropdown from './AppLinksDropdown';

const Header = ({ isMobile }) => (
  <Box>
    <Box sx={{
      minHeight: '70px',
      pl: 3,
      bgcolor: 'primary.main',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <Button
        component="a"
        href="/"
        sx={{
          color: "white",
          flexDirection: "column",
          display: 'flex',
          mt: 2,
          mb: 2,
          alignItems: 'start',
          textTransform: 'none',
          transition: 'background-color 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
          }
        }}
      >
        <Typography variant="h1" align="center" sx={{ fontSize: isMobile ? 20 : 25, userSelect: 'none' }}>Bewegungsglossar</Typography>
        {isMobile ? undefined : <Typography variant="span" align="center" sx={{ userSelect: 'none', maxWidth: 500, }}>
          Eine stets wachsende Sammlung an Begriffen aus aktivistischen Kontexten
        </Typography>}
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', pr: 3 }}>
        <AppLinksDropdown />
      </Box>
    </Box>
  </Box >
);

export default Header;
