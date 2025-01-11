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
        >
          <ul className="flex flex-col p-4 md:p-0 md:space-x-8 md:flex-row">
            <li>
              <Link
                to="/"
                className="block py-2 px-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-primary"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products/category/all"
                className="block py-2 px-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-primary"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-4 rounded hover:bg-gray-100 md:hover:bg-transparent hover:text-primary"
              >
                Contact
              </Link>
            </li>
          </ul>{' '}
        </div>
      </div>
    </nav>
  );
}
