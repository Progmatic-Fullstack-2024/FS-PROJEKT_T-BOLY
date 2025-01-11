import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <nav className="relative text-text-dark">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`absolute top-16 left-1/2 transform -translate-x-1/2 w-64 bg-white border rounded-lg shadow-lg transition-all duration-300  ${
            isMenuOpen ? 'opacity-100 scale-100 bg-white' : 'opacity-0 scale-95 pointer-events-none'
          } md:static md:transform-none md:opacity-100 md:scale-100 md:w-auto md:flex md:border-none md:shadow-none md:bg-primary-light`}
        ><div className='flex'>
          <button
            type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white  hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-2 px-5 mx-4 rounded-full"
          >
            <Link to="/"> Home </Link>
          </button>
          <button
            type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white  hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-2 px-5 mx-4 rounded-full"
          >
            <Link to="/about"> About </Link>
          </button>
          <button
            type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white  hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-2 px-5 mx-4 rounded-full"
          >
            <Link to="/products/category/all"> Shop </Link>
          </button>
          <button
            type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white  hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-2 px-5 mx-4 rounded-full"
          >
            <Link to="/contact"> Contact </Link>
          </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
