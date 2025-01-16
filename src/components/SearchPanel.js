import React, { useState, useRef, useLayoutEffect, startTransition  } from 'react';
import { Box, Button, Grid2 } from '@mui/material';
import SearchBar from './SearchBar';
import AlphabeticalTermList from './AlphabeticalTermList';
import useDebounce from '../utils/useDebounce';
import { handleSearch, handleLetterFilter } from '../utils/filter.ts';

const SearchPanel = ({ onUpdate, setSelectedTerm, terms, sx }) => {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchBarRef = useRef(null);

  const setFilteredTerms = (terms) => {
    onUpdate(terms, searchQuery);
  };

  const handleLetterClick = (letter) => {
    const newSelectedLetter = letter === selectedLetter ? null : letter;
    console.log('clear');
    setSelectedLetter(newSelectedLetter);

    console.log(newSelectedLetter, selectedLetter);
    if (searchBarRef.current) {
      searchBarRef.current.clear(); // Clear the search bar
    }
    onLetterFilter(newSelectedLetter === null ? '' : newSelectedLetter);
  };

  const handleSearchQuery = (query) => {
    setSelectedLetter(null); // Clear letter selection when searching
    console.log('clear');
    setSearchQuery(query);
  };

  const handleClearFilter = () => {
    console.log('clear');
    setSelectedLetter(null);
    onLetterFilter(''); // Clear filter
  };

  const onLetterFilter = (letter) => {
    setSearchQuery('');
    handleLetterFilter(terms, letter, results => {
      startTransition(() => {
        setFilteredTerms(results);
      });
    });
    setSelectedTerm(null);
  };

  const onTermSelect = (term) => {
    setSelectedTerm(term);
    setFilteredTerms([term]);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 100);
  
  useLayoutEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery, results => {
        startTransition(() => {
          setFilteredTerms(results);
        });
      });
    } else {
      startTransition(() => {
        setFilteredTerms(terms);
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

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
        <SearchBar ref={searchBarRef} onSearch={handleSearchQuery} />
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
              Clear
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
        <AlphabeticalTermList 
          terms={terms} 
          onLetterSelect={handleLetterClick}
          onTermSelect={onTermSelect}
        />
        <Box sx={{ flexShrink: 0, height: 40 }} />
      </Box>
    </Box>
  );
};

export default SearchPanel;
