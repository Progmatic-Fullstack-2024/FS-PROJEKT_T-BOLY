import { IoSearchOutline } from 'react-icons/io5';

export default function Searchbar() {
  return (
    <div className="w-40 relative text-xs">
      <input
        type="text"
        placeholder="Search"
        className="p-1 mr-5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 w-full"
      />
      <button
        type="submit"
        className="absolute top-0 right-0 bg-primary rounded-full flex items-center justify-center"
      >
        <IoSearchOutline className=" text-white w-6 h-6 p-1" />
      </button>
    </div>
  );
}
