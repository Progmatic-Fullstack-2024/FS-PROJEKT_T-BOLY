import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  return (
    <div className="relative w-full md:w-64 lg:w-96">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <FiSearch className="w-5 h-5 text-gray-500" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        className="bg-white bg-opacity-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none placeholder:text-gray-500"
        placeholder="Search..."
      />
    </div>
  );
}

