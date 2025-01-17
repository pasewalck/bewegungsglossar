import React, { useRef, useEffect, useLayoutEffect, useState, forwardRef, useImperativeHandle, startTransition } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { handleSearch } from '../utils/filter.ts';
import ClearIcon from '@mui/icons-material/Clear';
import useDebounce from '../utils/useDebounce';

const SearchBar = forwardRef(({ terms, parent_setFilteredTerms, parent_setSearchQuery, onSearch }, ref) => {
  const inputRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [justCleared, setJustCleared] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if the user is typing in an input or textarea
      if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
        return;
      }
      
      // Focus the search input
      if (inputRef.current && event.key.length === 1) {
        inputRef.current.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    clear(ignoreTerms=false) {
      setSearchQuery('');
      setJustCleared(true);
      parent_setSearchQuery('');
      if (!ignoreTerms) {
        parent_setFilteredTerms(terms);
      }
    }
  }));
  

  const handleClear = () => {
    setSearchQuery('');
    onSearch('');
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 100);
  
  useLayoutEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery, results => {
        startTransition(() => {
          parent_setSearchQuery(debouncedSearchQuery);
          parent_setFilteredTerms(results);
        });
      });
    } else {
      startTransition(() => {
        if (justCleared) {
          setJustCleared(false);
        } else {
          parent_setSearchQuery('');
          parent_setFilteredTerms(terms);
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      variant="outlined"
      placeholder="Begriffe durchsuchen..."
      value={searchQuery}
      onChange={handleChange}
      sx={{
        '& .MuiOutlinedInput-root': {
          padding: '8px', // Move padding here
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'primary.main',
            borderWidth: 1,
          },
        },
      }}
      
      slotProps={{
        input: {
          size: 'small',
          endAdornment: (
            <InputAdornment position="end" sx={{ pr: 2 }}>
              {searchQuery && (
                <IconButton onClick={handleClear} edge="end">
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        },
      }}
    />
  );
});

export default SearchBar;
