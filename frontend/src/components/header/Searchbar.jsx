import { FaSearch } from 'react-icons/fa';

export default function Searchbar() {
  return (
    <form className="flex items-center">
      <div className="relative w-full ">
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border-2 border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary focus:border-2 outline-none  block w-full p-2.5 ps-4 pr-10"
          placeholder="Search"
          required
        />
        <button
          type="submit"
          className="absolute inset-y-0 top-[2px] right-[2px] flex items-center justify-center w-10 h-10 bg-orange-500 text-white rounded-full hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300"
        >
          <FaSearch className="w-4 h-4" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}
