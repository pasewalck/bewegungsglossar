import { useEffect } from 'react';

const TermUpdater = ({ url, setTerms, setFilteredTerms }) => {
  // Fetch data on page load
  useEffect(() => {
    const fetchTerms = async () => {
      try {

        const response = await fetch(`${url}/api/terms`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const terms = data;
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

  return null;
};

export default TermUpdater;
