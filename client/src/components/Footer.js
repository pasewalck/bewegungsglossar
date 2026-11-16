import { Box, Link, Typography } from '@mui/material';

const SOURCE_URL = 'https://0xacab.org/aktivistek/bewegungsglossar/';
const DATA_SOURCE_URL = 'https://wiki.aktivismus.org/books/bewegungs-glossar/';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      bgcolor: 'grey.200',
      color: 'text.primary',
      flexShrink: 0,
      px: 3,
      py: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 3,
      flexWrap: 'wrap',
    }}
  >
    <Typography variant="body2">
      <Link
        href={SOURCE_URL}
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
      >
        Quellcode
      </Link>
    </Typography>
    <Typography variant="body2">
      <Link
        href={DATA_SOURCE_URL}
        target="_blank"
        rel="noopener noreferrer"
        color="inherit"
        underline="hover"
      >
        Datenquelle
      </Link>
    </Typography>
  </Box>
);

export default Footer;
