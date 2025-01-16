import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import Header from './components/Header';
import SearchPanel from './components/SearchPanel';
import GlossaryPanel from './components/GlossaryPanel';
import theme from './theme/theme.ts';
import { initializeWorker, initializeFuse } from './utils/filter.ts';
import MarkdownUpdater from './utils/MarkdownUpdater';

const App = () => {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState(terms);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTerm, setSelectedTerm] = useState(null);

  useEffect(() => {
    initializeWorker();
    document.title = 'Bewegungsglossar';
  }, []);

  const init = (newTerms) => {
    setTerms(newTerms);
    initializeFuse(newTerms);
  };

  const onUpdate = (newTerms, query) => {
    setFilteredTerms(newTerms);
    setSearchQuery(query);
  }


  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Box sx={{ 
          display: 'flex', 
          flex: 1, 
          overflow: 'hidden',
          justifyContent: 'center', 
        }}>
          <MarkdownUpdater url='https://pad.degrowth.net/s/Glossar/download' setTerms={init} setFilteredTerms={setFilteredTerms} />
          <Box sx={{
            display: 'flex',
            width: '1200px',
            maxWidth: '100%',
          }}>
            <SearchPanel 
              onUpdate={onUpdate}
              setSelectedTerm={setSelectedTerm}
              terms={terms}
              sx={{ width: '40%', flexShrink: 0 }}
            />
            <GlossaryPanel 
              terms={filteredTerms} 
              searchQuery={searchQuery}
              selectedTerm={selectedTerm}
              sx={{ width: '60%', flexShrink: 0 }}
            />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
