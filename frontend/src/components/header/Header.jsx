import { useState, useContext, useEffect, useRef } from 'react';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import LanguageDropdown from './LanguageDropdown';
import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import LogoText from '../../assets/t-boly-orange.png';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';
import LoginModal from '../loginModal/LoginModal';
import RegistrationModal from '../registrationModal/RegistrationModal';

export default function Header() {
  const { t } = useContext(LanguageContext);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartCount(totalCount);
  }, [cart]);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex flex-col">
      {!user?.username && (
        <div className="flex bg-primary justify-end h-8 items-center">
          <button
            type="button"
            className="text-white px-3 text-m cursor-pointer"
            onClick={() => setLoginModalOpen(true)}
          >
            {t('login')}
          </button>
          <button
            type="button"
            className="text-white px-3 text-m cursor-pointer"
            onClick={() => setRegisterModalOpen(true)}
          >
            {t('register')}
          </button>
        </div>
      )}
      {user?.username && (
        <div className="flex bg-primary justify-end h-8 items-center">
          <div ref={dropdownRef} className="relative inline-block">
            <button
              onClick={toggleDropdown}
              className="text-white hover:bg-opacity-90 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Hello {user.username}!
              <IoIosArrowDown className="w-4 h-4 ml-3" />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-10 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                <div className="px-4 py-3 text-sm text-gray-900">
                  <div>{user.username}</div>
                  <div className="font-medium truncate">{user.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="profile_page/orders"
                      onClick={toggleDropdown}
                    >
                      {t('orders')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="profile_page/wishlist"
                      onClick={toggleDropdown}
                    >
                      {t('wishlist')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="profile_page/personal_data"
                      onClick={toggleDropdown}
                    >
                      {t('personal data')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="profile_page/change_password"
                      onClick={toggleDropdown}
                    >
                      {t('change password')}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="profile_page/adresses"
                      onClick={toggleDropdown}
                    >
                      {t('adresses')}
                    </Link>
                  </li>

                  {user.role === 'ADMIN' && (
                    <li>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-100"
                        to="/admin"
                        onClick={toggleDropdown}
                      >
                        {t('admin page')}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <button
            type="button"
            className="flex items-center text-white px-3 text-sm cursor-pointer hover:bg-red-600 hover:text-white rounded-md p-2 transition duration-300"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <FiLogOut className="w-5 h-5 mr-1" /> {t('logout')}
          </button>
        </div>
      )}

      <div className="flex w-full py-8 bg-primary-light md:justify-around">
        <div className="flex items-center md:mr-0 mr-auto">
          <Link to="/">
            <img src={LogoOrange} alt="" className="w-18 h-10 hover:opacity-50" />
          </Link>
          <Link to="/">
            <img src={LogoText} alt="" className="w-18 h-4 hover:opacity-50" />
          </Link>
        </div>
        <div className="order-3 md:order-1">
          <Nav />
        </div>
        <div className="order-1 flex md:order-3">
          <LanguageDropdown />
        </div>
        <div className="flex order-1 md:order-2">
          <Link to="/shoppingCart" className="relative">
            <FiShoppingCart className="w-6 h-6 m-7" />
            {cartCount > 0 && (
              <span className="absolute top-5 right-3 bg-red-600 text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </Link>
          <Searchbar />
        </div>
      </div>

      {isRegisterModalOpen && <RegistrationModal onClose={() => setRegisterModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </header>
  );
}
