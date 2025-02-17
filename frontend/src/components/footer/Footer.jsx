import { useContext } from 'react';
import { FaInstagram, FaTwitter, FaFacebook, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import FooterBg from '../../assets/footer-bg.png';
import addressIcon from '../../assets/icons/address.png';
import personalDataIcon from '../../assets/icons/data-breach.png';
import heartIcon from '../../assets/icons/heart.png';
import orderIcon from '../../assets/icons/order-delivery.png';
import TbolyOrange from '../../assets/t-boly-orange.png';
import LanguageContext from '../../contexts/LanguageContext';

export default function Footer() {
  const { t } = useContext(LanguageContext);

  return (
    <footer className="relative w-full text-gray-700 font-orienta dark:bg-gray-900 dark:bg-opacity-70 dark:text-primary ">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <img
          src={FooterBg}
          alt="Background"
          className="w-full h-full object-cover object-center opacity-30 md:opacity-50"
        />
      </div>
      <div className="max-w-7xl mx-auto mt-20 px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
        {/* Logo & Social Media */}
        <div className="col-span-2 md:col-span-1">
          <img src={TbolyOrange} alt="T-BOLY Logo" className="h-16 w-auto mb-4 -ml-5" />
          <p className="text-gray-700 dark:text-primary text-sm md:text-lg">
            {t('Crafting smiles with every toy, made for learning, fun, and growth')}
          </p>
          <div className="flex space-x-4 mt-4">
            <a href="/" className="text-primary hover:text-primary-light transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="/" className="text-primary hover:text-primary-light transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="/" className="text-primary hover:text-primary-light transition duration-300">
              <FaFacebook size={24} />
            </a>
            <a href="/" className="text-primary hover:text-primary-light transition duration-300">
              <FaPinterest size={24} />
            </a>
          </div>
        </div>

        {/* My Account */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('my account')}</h2>
          <ul className="space-y-3 text-gray-700 dark:text-primary text-sm md:text-lg">
            <li>
              <Link className="flex items-center hover:text-primary" to="profile_page/orders">
                <img src={orderIcon} alt="" className="h-5 w-5 mr-2" />
                {t('orders')}
              </Link>
            </li>
            <li>
              <Link className="flex items-center hover:text-primary" to="profile_page/wishlist">
                <img src={heartIcon} alt="" className="h-5 w-5 mr-2" />
                {t('wishlist')}
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center hover:text-primary"
                to="profile_page/personal_data"
              >
                <img src={personalDataIcon} alt="" className="h-5 w-5 mr-2" />
                {t('personal data')}
              </Link>
            </li>
            <li>
              <Link className="flex items-center hover:text-primary" to="profile_page/adresses">
                <img src={addressIcon} alt="" className="h-5 w-5 mr-2" />
                {t('adresses')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">{t('customer service')}</h2>
          <ul className="space-y-2 text-gray-700 dark:text-primary text-sm md:text-lg">
            <li>{t('monday to friday')}</li>
            <li>{t('10 AM - 6 PM')}</li>
            <li>
              {t('call us')}:{' '}
              <a href="tel:1234567868" className="text-primary hover:underline">
                123-456-7868
              </a>
            </li>
            <li>
              {t('email us')}:{' '}
              <a href="mailto:info@example.com" className="text-primary hover:underline">
                info@example.com
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-2xl font-semibold mb-4">{t('stay connected')}</h2>
          <p className="text-gray-700 dark:text-primary text-sm md:text-lg mb-4">
            {t('subscribe to our newsletter')}
          </p>
          <div className="flex bg-primary rounded-lg overflow-hidden">
            <input
              type="email"
              placeholder={t('enter your email')}
              className="w-full px-3 py-2 text-gray-800 outline-none dark:bg-gray-700 dark:text-primary dark:placeholder:text-primary"
            />
            <button
              type="button"
              className="bg-primary px-4 py-2 text-white text-sm md:text-lg font-semibold hover:bg-opacity-70 dark:text-gray-700"
            >
              {t('subscribe')}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 pb-8 text-center text-gray-700 dark:text-primary text-sm md:text-lg">
        <p>
          &copy; {new Date().getFullYear()} T-BOLY. {t('all rights reserved.')}
        </p>
      </div>
    </footer>
  );
}
