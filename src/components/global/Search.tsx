import React, { useState } from 'react';

const Search = (): JSX.Element => {
  const [search, setSearch] = useState('');
  return (
    <div className="search w-100 position-relative">
      <input
        type="text"
        className="form-control me-2 w-100"
        value={search}
        placeholder="Ingrese su búsqueda..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
