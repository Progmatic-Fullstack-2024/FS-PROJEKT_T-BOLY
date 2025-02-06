import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');

  const handleSearch = () => {
    if (query.trim() !== '') {
      searchParams.set('search', query);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="hidden md:flex items-center">
      <div className="relative w-full">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary focus:border-2 outline-none block w-full p-2.5 ps-4 pr-10"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          required
        />
        <button
          type="submit"
          onClick={handleSearch}
          className="absolute inset-y-0 top-[2px] right-[2px] flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300"
        >
          <FiSearch className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}
