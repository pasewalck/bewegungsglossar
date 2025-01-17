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
        const terms = parseMarkdown(markdownData); // Assume parseMarkdown is defined elsewhere
        setTerms(terms);
        setFilteredTerms(terms); // Initialize filtered terms
        console.log('Loaded markdown db');
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
  
    lines.forEach(line => {
      line = line.trim();
      if (line.startsWith('### ')) {
        if (currentTerm) {
          terms.push(currentTerm);
        }
        currentTerm = { header: line.slice(4), definition: '' };
      } else if (currentTerm && line.startsWith('> ')) {
        currentTerm.definition += (currentTerm.definition ? ' ' : '') + line.slice(2);
      }
    });
  
    if (currentTerm) {
      terms.push(currentTerm);
    }
  
    return terms;
  };  

  return null; // No UI needed for this component
};

export default MarkdownUpdater;
