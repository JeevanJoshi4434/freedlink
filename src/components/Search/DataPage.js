import React, { useEffect } from 'react';

const DataPage = () => {
  useEffect(() => {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory) {
      const pokemonData = JSON.stringify(searchHistory);
      document.cookie = `pokemon=${pokemonData};max-age=3600`;
    }
  }, []);

  return <div>Data is stored in a temporary cookie named "pokemon".</div>;
};

export default DataPage;
