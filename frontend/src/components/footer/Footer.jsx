import { FaInstagram, FaTwitter, FaFacebook, FaPinterest } from 'react-icons/fa';

import FooterBg from '../../assets/footer-bg.png';
import TbolyOrange from '../../assets/t-boly-orange.png';

export default function Footer() {
  return (
    <footer className="w-full h-auto relative font-orienta">
      {/* Background Image */}
      <img
        src={FooterBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* Content */}
      <div className="relative w-full max-w-7xl px-10 py-16 bg-opacity-80 mx-auto flex justify-center items-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex mt-10 flex-col items-center md:items-start">
            <img src={TbolyOrange} alt="T-BOLY Logo" className="h-16 w-auto object-contain -ml-5" />
            <p className="text-sm mt-2">Nunc consequat interdum varius sit amet mattis.</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Icons */}
              <div className="text-primary hover:text-opacity-70">
                <FaInstagram size={28} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaTwitter size={28} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaFacebook size={28} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaPinterest size={28} />
              </div>
            </div>
          </div>

          {/* My Account Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold">My Account</h2>
            <ul className="mt-4 space-y-2">
              <li className="hover:underline">Track my order</li>
              <li className="hover:underline">Terms of use</li>
              <li className="hover:underline">Wishlist</li>
              <li className="hover:underline">Submit Your Feedback</li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-semibold">Customer Service</h2>
            <ul className="mt-4 space-y-2">
              <li>Monday to Friday</li>
              <li>10am - 6pm (New York time)</li>
              <li className="text-primary">Call us: 123-456-7868</li>
              <li className="text-primary">Email us: info@example.com</li>
            </ul>
          </div>
          <div className="relative text-center text-xs mt-10 border-t border-gray-300 pt-4">
            &copy; {new Date().getFullYear()} T-BOLY. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
