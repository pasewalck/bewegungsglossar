import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const GlossaryList = React.memo(({ terms, searchQuery, selectedTerm }) => {
  const highlightHTML = (html, highlight) => {
    if (typeof highlight === 'string' && !highlight.trim()) {
      return html;
    }

    const regex = new RegExp(`(${highlight})`, 'gi');
    return html.replace(regex, '<mark style="background-color: #F7B377; padding: 0;">$1</mark>');
  };

  return (
    <List> {
      selectedTerm !== null ?
        <ListItem key={0} sx={{ pb: 2 }}>
          <ListItemText primary={
            <Typography
              variant="h6"
              sx={{ fontWeight: 'bold', mb: 0.5 }}
              dangerouslySetInnerHTML={{ __html: highlightHTML(selectedTerm.header, searchQuery) }}
            />}
            secondary={
              <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: highlightHTML(selectedTerm.definition, searchQuery) }}
              />} />
        </ListItem>

        : terms.map((term, index) => (
          <ListItem key={index} sx={{ pb: 2 }}>
            <ListItemText primary={
              <Typography
                variant="h6"
                sx={{ fontWeight: 'bold', mb: 0.5 }}
                dangerouslySetInnerHTML={{ __html: highlightHTML(term.header, searchQuery) }}
              />}
              secondary={
                <Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{ __html: highlightHTML(term.definition, searchQuery) }}
                />} />
          </ListItem>))
    }
    </List>
  );
});

export default GlossaryList;
