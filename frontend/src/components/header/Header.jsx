import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';


import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import LogoBlack from '../../assets/ant-black.png';
import LogoText from '../../assets/t-boly-orange.png';
import LoginModal from '../loginModal/LoginModal';
import RegistrationModal from '../registrationModal/RegistrationModal';

export default function Header() {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <header className="flex flex-col font-orienta">
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
      <div className="flex justify-around py-8 bg-primary-light">
        <div className="flex items-center">
          <Link to="/"><img src={LogoOrange} alt="" className="w-18 h-10 hover:opacity-50" /></Link>
          <Link to="/"><img src={LogoText} alt="" className="w-18 h-4 hover:opacity-50" /></Link>
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
