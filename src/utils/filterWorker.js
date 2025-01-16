import Fuse from 'fuse.js';

let fuse;

self.onmessage = (e) => {
  const { type, data } = e.data;

  switch(type) {
    case 'initializeFuse':
      console.log('init');
      const { terms, options } = data;
      fuse = new Fuse(terms, options);
      self.postMessage({ type: 'initializeDone' });
      console.log('init done');
      break;
    case 'handleSearch':
      const { query } = data;
      if (fuse) {
        const results = fuse.search(query).map(result => result.item);
        self.postMessage({ type: 'searchResults', results });
      }
      break;
    case 'handleLetterFilter':
      const { terms: allTerms, letter } = data;
      const filtered = allTerms.filter(term => term.header.startsWith(letter));
      self.postMessage({ type: 'letterFilterResults', filtered });
      break;
    default:
      break;
  }
};
