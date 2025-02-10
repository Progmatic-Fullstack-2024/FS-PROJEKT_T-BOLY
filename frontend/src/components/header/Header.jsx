import { useState, useContext, useEffect, useRef } from 'react';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';

import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import adressIcon from '../../assets/icons/address.png';
import pesronalDataIcon from '../../assets/icons/data-breach.png';
import heartIcon from '../../assets/icons/heart.png';
import orderIcon from '../../assets/icons/order-delivery.png';
import resetPasswordIcon from '../../assets/icons/reset-password.png';
import userIcon from '../../assets/icons/user.png';
import LogoText from '../../assets/t-boly-orange.png';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import LoginModal from '../loginModal/LoginModal';
import RegistrationModal from '../registrationModal/RegistrationModal';

export default function Header() {
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
            Login
          </button>
          <button
            type="button"
            className="text-white px-3 text-m cursor-pointer"
            onClick={() => setRegisterModalOpen(true)}
          >
            Register
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
                      className="block px-4 py-2 hover:bg-gray-100 flex"
                      to="profile_page/orders"
                      onClick={toggleDropdown}
                    >
                      <img src={orderIcon} alt="" className="h-6 w-6 mr-2" />
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100 flex"
                      to="profile_page/wishlist"
                      onClick={toggleDropdown}
                    >
                      <img src={heartIcon} alt="" className="h-6 w-6 mr-2 " />
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100 flex"
                      to="profile_page/personal_data"
                      onClick={toggleDropdown}
                    >
                      <img src={pesronalDataIcon} alt="" className="h-6 w-6 mr-2 " />
                      Personal Data
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100 flex"
                      to="profile_page/change_password"
                      onClick={toggleDropdown}
                    >
                      <img src={resetPasswordIcon} alt="" className="h-6 w-6 mr-2 " />
                      Change password
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="block px-4 py-2 hover:bg-gray-100 flex"
                      to="profile_page/adresses"
                      onClick={toggleDropdown}
                    >
                      <img src={adressIcon} alt="" className="h-6 w-6 mr-2 " />
                      Addresses
                    </Link>
                  </li>

                  {user.role === 'ADMIN' && (
                    <li>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-100 flex"
                        to="/admin"
                        onClick={toggleDropdown}
                      >
                        <img src={userIcon} alt="" className="h-6 w-6 mr-2 " />
                        Admin page
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
            <FiLogOut className="w-5 h-5 mr-1" /> Logout
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
        <div className="order-2 md:order-1">
          <Nav />
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

      {isRegisterModalOpen && (
        <RegistrationModal
          onClose={() => setRegisterModalOpen(false)}
          setLoginModalOpen={() => setLoginModalOpen(true)}
        />
      )}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </header>
  );
}
