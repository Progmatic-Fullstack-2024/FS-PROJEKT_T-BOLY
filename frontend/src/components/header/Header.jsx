import { useState, useContext, useEffect, useRef } from 'react';
import { FiShoppingCart, FiLogOut } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { TbTruckDelivery } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

import LanguageDropdown from './LanguageDropdown';
import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import addressIcon from '../../assets/icons/address.png';
import pesronalDataIcon from '../../assets/icons/data-breach.png';
import heartIcon from '../../assets/icons/heart.png';
import orderIcon from '../../assets/icons/order-delivery.png';
import resetPasswordIcon from '../../assets/icons/reset-password.png';
import userIcon from '../../assets/icons/user.png';
import LogoText from '../../assets/t-boly-orange.png';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';
import DarkModeToggle from '../DarkModeToggle';
import LoginModal from '../loginModal/LoginModal';
import ResetPassword from '../loginModal/ResetPassword';
import RegistrationModal from '../registrationModal/RegistrationModal';

export default function Header() {
  const { t } = useContext(LanguageContext);

  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
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
        <div className="flex bg-primary justify-end h-8 items-center dark:text-primary dark:bg-gray-800">
          <div className="text-white ml-2 md:ml-24 md:w-96 w-32 flex items-center md:gap-3 gap-2 md:text-sm text-xs font-medium">
            <TbTruckDelivery className="text-3xl"/> <span>{t(`Free shipping on orders over`)} €150</span>
          </div>
          <DarkModeToggle />
          <button
            type="button"
            className="text-white px-3 text-m cursor-pointer dark:text-primary"
            onClick={() => setLoginModalOpen(true)}
          >
            {t('login')}
          </button>
          <button
            type="button"
            className="text-white px-3 text-m cursor-pointer dark:text-primary"
            onClick={() => setRegisterModalOpen(true)}
          >
            {t('register')}
          </button>
        </div>
      )}
      {user?.username && (
        <div className="flex bg-primary justify-between h-8 items-center dark:text-primary dark:bg-gray-800">
          <div className="text-white ml-2 md:ml-24 md:w-96 w-32 flex items-center md:gap-3 gap-2 md:text-sm text-xs font-medium">
            <TbTruckDelivery className="text-2xl"/> <span>{t(`Free shipping on orders over`)} €150</span>
          </div>
          <div className="flex">
            <div ref={dropdownRef} className="relative inline-block">
              <DarkModeToggle />
              <button
                onClick={toggleDropdown}
                className="text-white hover:bg-opacity-90 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Hello {user.username}!
                <IoIosArrowDown className="w-4 h-4 ml-3" />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-10 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-800">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-primary">
                    <div>{user.username}</div>
                    <div className="font-medium truncate">{user.email}</div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-primary">
                    <li>
                      <Link
                        className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                        to="profile_page/orders"
                        onClick={toggleDropdown}
                      >
                        <img src={orderIcon} alt="" className="h-6 w-6 mr-2" />
                        {t('orders')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                        to="profile_page/wishlist"
                        onClick={toggleDropdown}
                      >
                        <img src={heartIcon} alt="" className="h-6 w-6 mr-2 " />
                        {t('wishlist')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                        to="profile_page/personal_data"
                        onClick={toggleDropdown}
                      >
                        <img src={pesronalDataIcon} alt="" className="h-6 w-6 mr-2 " />
                        {t('personal data')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                        to="profile_page/change_password"
                        onClick={toggleDropdown}
                      >
                        <img src={resetPasswordIcon} alt="" className="h-6 w-6 mr-2 " />
                        {t('change password')}
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                        to="profile_page/addresses"
                        onClick={toggleDropdown}
                      >
                        <img src={addressIcon} alt="" className="h-6 w-6 mr-2 " />
                        {t('addresses')}
                      </Link>
                    </li>

                    {user.role === 'ADMIN' && (
                      <li>
                        <Link
                          className="px-4 py-2 hover:bg-gray-100 flex dark:hover:bg-gray-600"
                          to="/admin"
                          onClick={toggleDropdown}
                        >
                          <img src={userIcon} alt="" className="h-6 w-6 mr-2 " />
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
        </div>
      )}

      <div className="flex w-full py-8 bg-primary-light md:justify-around dark:text-primary dark:bg-gray-700">
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
        <div className="flex items-center justify-center gap-8 order-1 md:order-2">
          <Link to="/shoppingCart" className="relative">
            <FiShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full text-xs px-1">
                {cartCount}
              </span>
            )}
          </Link>
          <Searchbar />
          <LanguageDropdown />
        </div>
      </div>

      {isRegisterModalOpen && (
        <RegistrationModal
          onClose={() => setRegisterModalOpen(false)}
          setLoginModalOpen={() => setLoginModalOpen(true)}
        />
      )}
      {isLoginModalOpen && (
        <LoginModal
          onClose={() => setLoginModalOpen(false)}
          openResetPasswordModal={() => setIsResetPasswordModalOpen(true)}
        />
      )}
      {isResetPasswordModalOpen && (
        <ResetPassword onClose={() => setIsResetPasswordModalOpen(false)} />
      )}
    </header>
  );
}
