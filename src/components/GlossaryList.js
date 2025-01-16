import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const GlossaryList = React.memo(({ terms, searchQuery }) => {
  const highlightText = (text, highlight) => {
    if (!highlight.trim()) {
      return <span>{text}</span>;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return (
      <span>
        {parts.filter(String).map((part, i) =>
          regex.test(part) ? (
            <mark key={i} style={{ backgroundColor: '#F7B377', padding: 0 }}>
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <List> {
      terms.map((term, index) => (
        <ListItem key={index} sx={{ pb: 2 }}>
          <ListItemText primary={
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              {highlightText(term.header, searchQuery)}
            </Typography>}
            secondary={
              <Typography variant="body1">
                {highlightText(term.definition, searchQuery)}
              </Typography>} />
        </ListItem>))
    }
    </List>
  );
});

export default GlossaryList;
