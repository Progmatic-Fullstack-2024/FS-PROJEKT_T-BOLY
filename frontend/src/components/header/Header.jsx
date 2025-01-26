import { useState, useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
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
          <button
            onClick={toggleDropdown}
            id="dropdownInformationButton"
            data-dropdown-toggle="dropdownInformation"
            className="text-white bg-primray hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
            type="button"
          >
            Hello {user.username}!
            <IoIosArrowDown className="w-4 h-4 ms-3" />
          </button>

          {isDropdownOpen && (
            <div
              id="dropdownInformation"
              className="absolute top-8 right-14 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44  "
            >
              <div className="px-4 py-3 text-sm text-gray-900 ">
                <div>{user.username}</div>
                <div className="font-medium truncate">{user.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 ">
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100  "
                    to="profile_page/orders"
                    onClick={toggleDropdown}
                  >
                    Orders
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100  "
                    to="profile_page/favorites"
                    onClick={toggleDropdown}
                  >
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100  "
                    to="profile_page/personal_data"
                    onClick={toggleDropdown}
                  >
                    Personal Data
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100  "
                    to="profile_page/change_password"
                    onClick={toggleDropdown}
                  >
                    Change password
                  </Link>
                </li>
                <li>
                  <Link
                    className="block px-4 py-2 hover:bg-gray-100  "
                    to="profile_page/adresses"
                    onClick={toggleDropdown}
                  >
                    Addresses
                  </Link>
                </li>
              </ul>
            </div>
          )}
          <h3 className="text-white px-3 text-sm">
            {user.role === 'ADMIN' && <Link to="/admin">Admin page</Link>}
          </h3>
          <button type="button" className="text-white px-3 text-sm cursor-pointer" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      <div className="flex  w-full py-8 bg-primary-light md:justify-around ">
        <div className="flex items-center md:mr-0 mr-auto">
          <Link to="/">
            <img src={LogoOrange} alt="" className="w-18 h-10 hover:opacity-50" />
          </Link>
          <Link to="/">
            <img src={LogoText} alt="" className="w-18 h-4 hover:opacity-50" />
          </Link>
        </div>
        <div className="order-2 md:order-1 ">
          <Nav />
        </div>
        <div className="flex order-1 md:order-2">
          <Link to="/shoppingCart">
            <FiShoppingCart className=" w-6 h-6 m-7" />
          </Link>
          <Searchbar />
        </div>
      </div>

      {isRegisterModalOpen && <RegistrationModal onClose={() => setRegisterModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </header>
  );
}
