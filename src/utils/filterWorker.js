import Fuse from 'fuse.js';

let fuse;

// eslint-disable-next-line no-restricted-globals
self.onmessage = (e) => {
  const { type, data } = e.data;

  switch(type) {
    case 'initializeFuse':
      console.log('init');
      const { terms, options } = data;
      fuse = new Fuse(terms, options);
      
      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ type: 'initializeDone' });
      console.log('init done');
      break;
    case 'handleSearch':
      const { query } = data;
      if (fuse) {
        const results = fuse.search(query).map(result => result.item);

        // eslint-disable-next-line no-restricted-globals
        self.postMessage({ type: 'searchResults', results });
      }
      break;
    case 'handleLetterFilter':
      const { terms: allTerms, letter } = data;
      const filtered = allTerms.filter(term => term.header.startsWith(letter));

      // eslint-disable-next-line no-restricted-globals
      self.postMessage({ type: 'letterFilterResults', filtered });
      break;
    default:
      break;
  }
};
