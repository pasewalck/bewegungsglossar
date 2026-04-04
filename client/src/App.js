import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import GlossaryPanel from './components/GlossaryPanel';
import theme from './theme/theme.js';
import { initializeWorker, initializeFuse } from './utils/filter.js';
import TermUpdater from './utils/TermUpdater.js';

const App = () => {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState(terms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    initializeWorker();
  }, []);

  const init = useCallback((newTerms) => {
    setTerms(newTerms);
    setFilteredTerms(newTerms);
    initializeFuse(newTerms);
  }, []);

  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSetSelectedTerm = useCallback((term) => {
    setSelectedTerm(term);
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <TermUpdater url={process.env.REACT_APP_BACKEND_URL || ""} setTerms={init} setFilteredTerms={setFilteredTerms} />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header isMobile={isMobile} />
        <Box sx={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          justifyContent: 'center',
        }}>
          <Box sx={{
            display: 'flex',
            width: '1200px',
            maxWidth: '100%',
            flexDirection: isMobile ? 'column' : 'row',
          }}>
            <SearchPanel
              parent_setSearchQuery={handleSearchQueryChange}
              parent_setFilteredTerms={setFilteredTerms}
              parent_setSelectedTerm={handleSetSelectedTerm}
              setSelectedTerm={setSelectedTerm}
              terms={terms}
              filteredTerms={filteredTerms}
              isMobile={isMobile}
              sx={{ width: '40%', flexShrink: 0 }}
            />
            <GlossaryPanel
              terms={filteredTerms}
              searchQuery={searchQuery}
              selectedTerm={selectedTerm}
              isMobile={isMobile}
              sx={{
                width: isMobile ? '100%' : '60%',
                flexShrink: 0
              }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
