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
