import { useContext } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaPinterest } from 'react-icons/fa';

import FooterBg from '../../assets/footer-bg.png';
import TbolyOrange from '../../assets/t-boly-orange.png';
import LanguageContext from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useContext(LanguageContext);
  return (
    <footer className="w-full h-[32rem] relative font-orienta">
      {/* Background Image */}
      <img
        src={FooterBg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />

      {/* Content */}
      <div className="relative w-full max-w-8xl px-10 py-16 bg-opacity-80 mx-auto flex justify-center items-center h-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo Section */}
          <div className="flex mt-10 flex-col items-center md:items-start">
            <img src={TbolyOrange} alt="T-BOLY Logo" className="h-16 w-auto object-contain -ml-5" />
            <p className="text-sm mt-2">Nunc consequat interdum varius sit amet mattis.</p>
            <div className="flex space-x-4 mt-4">
              {/* Social Icons */}
              <div className="text-primary hover:text-opacity-70">
                <FaInstagram size={24} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaTwitter size={24} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaFacebook size={24} />
              </div>
              <div className="text-primary hover:text-opacity-70">
                <FaPinterest size={24} />
              </div>
            </div>
          </div>

          {/* My Account Section */}
          <div>
            <h2 className="text-xl font-semibold">{t('my account')}</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <div className="hover:underline">{t('track my order')}</div>
              </li>
              <li>
                <div className="hover:underline">{t('terms of use')}</div>
              </li>
              <li>
                <div className="hover:underline">{t('wishlist')}</div>
              </li>
              <li>
                <div className="hover:underline">{t('submit your feedback')}</div>
              </li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div className="hidden md:block">
            <h2 className="text-xl font-semibold">{t('costumer service')}</h2>
            <ul className="mt-4 space-y-2">
              <li>{t('monday to friday')}</li>
              <li>10am - 6pm (New York time)</li>
              <li>
                {t('call us')}:{' '}
                <a className="text-primary" href="tel:1234567868">
                  123-456-7868
                </a>
              </li>
              <li>
                {t('email us')}:{' '}
                <a className="text-primary" href="mailto:info@example.com">
                  info@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
