import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = forwardRef(({ onSearch }, ref) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

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
    clear() {
      setInputValue('');
    }
  }));

  const handleClear = () => {
    setInputValue('');
    console.log('s');
    onSearch('');
  };

  const handleChange = (e) => {
    console.log('s');
    onSearch(e.target.value);
    setInputValue(e.target.value);
  };

  return (
    <TextField
      inputRef={inputRef}
      fullWidth
      variant="outlined"
      placeholder="Search terms..."
      value={inputValue}
      onChange={handleChange}
        sx={{
            pt: 1,
            pb: 1,
            pl: 1,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 2,
            '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'transparent',
            },
            '&:hover fieldset': {
                borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'transparent',
            },
            },
        }}
      slotProps={{
        input: {
          size: 'small',
          endAdornment: (
            <InputAdornment position="end">
              {inputValue && (
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
