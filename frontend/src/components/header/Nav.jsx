import { useState, useEffect } from 'react';
import { AiOutlineCloseCircle, AiOutlineMenu } from 'react-icons/ai';
import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleMenuCloser = (buttonStatus) => {
    if (buttonStatus) {
      setTimeout(() => setIsMenuOpen(false), 3000);
    }
  };

  return (
    <nav className="text-text-dark text-2xl">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center border-2 border-primary border-opacity-30 text-primary text-sm rounded-lg md:hidden focus:outline-none"
          aria-expanded={isMenuOpen}
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            handleMenuCloser(true);
          }}
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <AiOutlineCloseCircle className="w-6 h-6" />
          ) : (
            <AiOutlineMenu className="w-6 h-6" />
          )}
        </button>

        <div
          className={`absolute top-44 left-0 transform w-full text-center border rounded-lg shadow-lg transition-all duration-300 ${
            isMenuOpen
              ? 'opacity-95 scale-100 bg-primary-light text-primary'
              : 'opacity-0 scale-95 pointer-events-none'
          } md:pointer-events-auto md:static md:transform-none md:opacity-100 md:scale-100 md:w-auto md:flex md:border-none md:shadow-none md:bg-primary-light`}
        >
          <ul className="flex flex-col p-4 md:p-0 md:space-x-8 md:flex-row">
            <li>
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={activePath === '/' ? 'text-orange-500 font-bold' : 'hover:text-primary'}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsMenuOpen(false)}
                className={
                  activePath === '/about' ? 'text-orange-500 font-bold' : 'hover:text-primary'
                }
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/products/category/all"
                onClick={() => setIsMenuOpen(false)}
                className={
                  activePath === '/products/category/all'
                    ? 'text-orange-500 font-bold'
                    : 'hover:text-primary'
                }
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={
                  activePath === '/contact' ? 'text-orange-500 font-bold' : 'hover:text-primary'
                }
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
