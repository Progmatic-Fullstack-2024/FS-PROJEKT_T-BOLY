import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchParams.set('search', debouncedQuery);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  }, [debouncedQuery, searchParams]);
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="relative w-full ">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary focus:border-2 outline-none  block w-full p-2.5 ps-4 pr-10"
          placeholder="Search"
          onChange={handleChange}
          value={query}
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 top-[2px] right-[2px] flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300"
        >
          <FiSearch className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </div>
  );
}
