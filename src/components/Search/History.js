import React, { useState } from 'react';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchHistory, setSearchHistory] = useState(
    JSON.parse(localStorage.getItem('searchHistory')) || []
  );

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!searchTerm) return;
    if (searchHistory.includes(searchTerm)) {
      const newSearchHistory = [searchTerm, ...searchHistory.filter(item => item !== searchTerm)];
      setSearchHistory(newSearchHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
      document.cookie = `searchHistory=${JSON.stringify(newSearchHistory)};max-age=3600`;
      setSearchTerm('');
      return;
    }
    const newSearchHistory = [...searchHistory, searchTerm];
    setSearchHistory(newSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
    document.cookie = `searchHistory=${JSON.stringify(newSearchHistory)};max-age=3600`;
    setSearchTerm('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {searchHistory.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
