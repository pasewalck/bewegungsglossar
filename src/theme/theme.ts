import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#613583', // Customize your primary color
    },
    secondary: {
      main: '#f44336', // Customize your secondary color
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          border: 'none',
          '&:hover': {
            border: 'none',
          },
        },
      },
    },
  },
});

export default theme;
