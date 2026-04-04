let worker;

export const initializeWorker = () => {
  worker = new Worker(new URL('./filterWorker.js', import.meta.url));
};

export const initializeFuse = (terms) => {
  const options = {
    keys: ['header', 'definition'],
    threshold: 0.3,
  };

  worker.postMessage({ type: 'initializeFuse', data: { terms, options } });
};

export const handleSearch = (query, callback) => {
  worker.onmessage = (e) => {
    const { type, results } = e.data;
    if (type === 'searchResults') {
      callback(results);
    }
  };
  worker.postMessage({ type: 'handleSearch', data: { query } });
};

export const handleLetterFilter = (terms, letter, callback) => {
  worker.onmessage = (e) => {
    const { type, filtered } = e.data;
    if (type === 'letterFilterResults') {
      callback(filtered);
    }
  };
  worker.postMessage({ type: 'handleLetterFilter', data: { terms, letter } });
};
