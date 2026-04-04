import React from 'react';
import { Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';

const AlphabeticalTermList = ({ terms, onLetterSelect, onTermSelect }) => {
  const groupedTerms = terms.reduce((acc, term) => {
    const firstLetter = term.header[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {});

  const sortedLetters = Object.keys(groupedTerms).sort();

  return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%', // Use maxHeight instead of height
        overflowY: 'auto', 
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 2,
        p: 2,
        m: 1, // Add margin to give space for the shadow
    }}>
      {sortedLetters.map(letter => (
        <Box key={letter} sx={{ mb: 2 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold', 
              cursor: 'pointer',
              '&:hover': { color: 'primary.main' },
            }}
            onClick={() => onLetterSelect(letter)}
          >
            {letter}
          </Typography>
          <List dense>
            {groupedTerms[letter].map((term, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton onClick={() => onTermSelect(term)}>
                  <ListItemText 
                    primary={term.header} 
                    slotProps={{ sx: { fontSize: '1rem' } }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default AlphabeticalTermList;
