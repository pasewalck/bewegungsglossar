import React from 'react';
import { Box, Typography } from '@mui/material';
import GlossaryList from './GlossaryList';

const GlossaryPanel = ({ terms, searchQuery, selectedTerm, sx }) => (
  <Box sx={{ p: terms.length > 0 ? 2 : 4, overflowY: 'auto', height: '100%', ...sx }}>
    {terms.length > 0 ? (
      <GlossaryList terms={terms} searchQuery={searchQuery} selectedTerm={selectedTerm} />
    ) : (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'top',
        height: '100%',
      }}>
        <Typography variant="h6" align="center">Nichts gefunden :/</Typography>
      </Box>
    )}
  </Box>
);

export default GlossaryPanel;
