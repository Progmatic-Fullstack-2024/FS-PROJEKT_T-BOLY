import Nav from './Nav';
import Searchbar from './Searchbar';
import LogoOrange from '../../assets/ant-orange.png';
import LogoText from '../../assets/t-boly-orange.png';
import { FiShoppingCart } from 'react-icons/fi';

export default function Header() {
  return (
    <header className="flex flex-col font-orienta ">
      <div className="flex bg-primary justify-end h-8 items-center">
        <h2 className="text-white px-3 text-sm">Login</h2>
        <h2 className="text-white px-3 text-sm">Register</h2>
      </div>
      <div className="flex justify-around py-8 bg-primary-light">
        <div className="flex items-center">
          <img src={LogoOrange} alt="" className="w-18 h-10" />
          <img src={LogoText} alt="" className="w-18 h-4" />
        </div>
       
          <Nav className="order-2 sm:order-1 " />
          <div className="flex  items-center order-1 sm:order-2">
            <button>
              <FiShoppingCart className="m-2" />
            </button>
            <Searchbar />
          </div>
        
      </div>
    </header>
  );
}
