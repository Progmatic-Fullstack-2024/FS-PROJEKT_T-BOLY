import { useState, useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import LogoText from '../../assets/t-boly-orange.png';
import AuthContext from '../../contexts/AuthContext';
import LoginModal from '../loginModal/LoginModal';
import RegistrationModal from '../registrationModal/RegistrationModal';

export default function Header() {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex flex-col font-orienta">
      {!user?.username && (
        <div className="flex bg-primary justify-end h-8 items-center">
          <button
            type="button"
            className="text-white px-3 text-sm cursor-pointer"
            onClick={() => setLoginModalOpen(true)}
          >
            Login
          </button>
          <button
            type="button"
            className="text-white px-3 text-sm cursor-pointer"
            onClick={() => setRegisterModalOpen(true)}
          >
            Register
          </button>
        </div>
      )}
      {user?.username && (
        <div className="flex bg-primary justify-end h-8 items-center">
          <button
            onClick={toggleDropdown}
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            class="text-white bg-primray hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Hello {user.username}!
            <svg
              class="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {isDropdownOpen && (
            <div
              id="dropdownInformation"
              className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
              
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{user.username}</div>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to="profile_page/orders"
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to="profile_page/favorites"
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to="profile_page/personal_data"
                  >
                    Personal Data
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to="profile_page/change_password"
                  >
                    Change password
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    to="profile_page/addresses"
                  >
                    Addresses
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <button type="button" className="text-white px-3 text-sm cursor-pointer" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <div className="flex justify-around py-8 bg-primary-light">
        <div className="flex items-center">
          <Link to="/">
            <img src={LogoOrange} alt="" className="w-18 h-10 hover:opacity-50" />
          </Link>
          <Link to="/">
            <img src={LogoText} alt="" className="w-18 h-4 hover:opacity-50" />
          </Link>
        </div>

        <Nav className="order-2 sm:order-1 " />
        <div className="flex  items-center order-1 sm:order-2">
          <button type="button">
            <FiShoppingCart className="m-2" />
          </button>
          <Searchbar />
        </div>
      </div>

      {isRegisterModalOpen && <RegistrationModal onClose={() => setRegisterModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </header>
  );
}
