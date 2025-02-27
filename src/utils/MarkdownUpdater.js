import { useEffect } from 'react';

const MarkdownUpdater = ({ url, setTerms, setFilteredTerms }) => {
  // Fetch data on page load
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const markdownData = await response.text();
        const terms = parseMarkdown(markdownData);
        setTerms(terms);
        setFilteredTerms(terms);
        console.log('Successfully loaded the glossary database');
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTerms();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const parseMarkdown = (markdown) => {
    const lines = markdown.split('\n');
    const terms = [];
    let currentTerm = null;

    const parseInlineStyles = (text) => {
      return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // Bold
        .replace(/\*(.*?)\*/g, '<em>$1</em>')              // Italic
        .replace(/`(.*?)`/g, '<code>$1</code>');           // Code
    };
  
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('### ')) {
        if (currentTerm) {
          terms.push(currentTerm);
        }
        currentTerm = { header: parseInlineStyles(line.slice(4)), definition: '' };
      } else if (currentTerm && line.startsWith('> ')) {
        currentTerm.definition += (currentTerm.definition ? ' ' : '') + parseInlineStyles(line.slice(2));
      }
    });
  
    if (currentTerm) {
      terms.push(currentTerm);
    }
  
    return terms;
  };  

  return null;
};

export default MarkdownUpdater;
