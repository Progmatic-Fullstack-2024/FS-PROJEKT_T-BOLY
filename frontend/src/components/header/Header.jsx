import { FiShoppingCart } from 'react-icons/fi';

import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import LogoText from '../../assets/t-boly-orange.png';
import { useState } from 'react';
import RegistrationModal from '../registrationModal/RegistrationModal';
import LoginModal from '../loginModal/LoginModal';

export default function Header() {
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <header className="flex flex-col font-orienta">
      <div className="flex bg-primary justify-end h-8 items-center">
        <h2
          className="text-white px-3 text-sm cursor-pointer"
          onClick={() => setLoginModalOpen(true)}
        >
          Login
        </h2>
        <h2
          className="text-white px-3 text-sm cursor-pointer"
          onClick={() => setRegisterModalOpen(true)}
        >
          Register
        </h2>
      </div>
      <div className="flex justify-around py-8 bg-primary-light">
        <div className="flex items-center">
          <img src={LogoOrange} alt="" className="w-18 h-10" />
          <img src={LogoText} alt="" className="w-18 h-4" />
        </div>

        <Nav />
        <div className="flex items-center ">
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
