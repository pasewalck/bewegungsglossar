import React, { useState, useRef, startTransition  } from 'react';
import { Box, Button, Grid2 } from '@mui/material';
import SearchBar from './SearchBar';
import AlphabeticalTermList from './AlphabeticalTermList';
import { handleLetterFilter } from '../utils/filter.ts';

const SearchPanel = ({ parent_setSearchQuery, parent_setFilteredTerms, parent_setSelectedTerm, terms, filteredTerms, sx }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const searchBarRef = useRef(null);

  const handleLetterClick = (letter) => {
    const newSelectedLetter = letter === selectedLetter ? null : letter;
    setSelectedLetter(newSelectedLetter);
    onLetterFilter(newSelectedLetter === null ? '' : newSelectedLetter);
  };

  const handleSearchQuery = (query) => {
    setSelectedLetter(null); // Clear letter selection when searching
    parent_setSelectedTerm(null);
  };

  const handleClearFilter = () => {
    if (searchBarRef.current) {
      searchBarRef.current.clear(); // Clear the search bar
    }

    setSelectedLetter(null);
    onLetterFilter(''); // Clear filter
  };

  const onLetterFilter = (letter) => {
    if (searchBarRef.current) {
      searchBarRef.current.clear(true); // Clear the search bar
    }

    handleLetterFilter(terms, letter, results => {
      startTransition(() => {
        parent_setFilteredTerms(results);
      });
    });
    parent_setSelectedTerm(null);
  };

  const onTermSelect = (term) => {
    if (searchBarRef.current) {
      searchBarRef.current.clear(); // Clear the search bar
    }
    
    parent_setSelectedTerm(term);
    parent_setFilteredTerms(terms);
  };
  
  return (
    <Box sx={{ 
      borderRight: 1, 
      borderColor: 'divider', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      ...sx
    }}>
      <Box sx={{ p: 4, pl: 3, pb: 0 }}>
        <SearchBar
          ref={searchBarRef}
          terms={terms}
          parent_setSearchQuery={parent_setSearchQuery}
          parent_setFilteredTerms={parent_setFilteredTerms}
          onSearch={handleSearchQuery}
          />
        <Grid2 container spacing={1} sx={{ mt: 2 }}>
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
            <Grid2 key={letter}>
              <Button
                variant={selectedLetter === letter ? "contained" : "outlined"}
                size="small"
                onClick={() => handleLetterClick(letter)}
                sx={{ minWidth: '35px', height: '35px', p: 0, fontWeight: 'bold', fontSize: 16 }}
              >
                {letter}
              </Button>
            </Grid2>
          ))}
          <Grid2>
            <Button 
              onClick={handleClearFilter}
              variant="contained"
              size="small"
              disabled={!selectedLetter}
              sx={{ 
                minWidth: '70px', 
                height: '35px',
                fontWeight: 'bold', 
                fontSize: 16,
                bgcolor: '#FFFFFF',
                color: 'primary.main',
                '&.Mui-disabled': {
                  border: 'none',
                  backgroundColor: 'transparent'
                }
              }}
            >
              Filter löschen
            </Button>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{ 
        flexGrow: 1, 
        mt: 3, 
        mx: 2,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {filteredTerms.length > 0 && (
        <AlphabeticalTermList 
          terms={filteredTerms} 
          onLetterSelect={handleLetterClick}
          onTermSelect={onTermSelect}
        />)}
        <Box sx={{ flexShrink: 0, height: 40 }} />
      </Box>
    </Box>
  );
};

export default SearchPanel;
