import { useContext } from 'react';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';

import LanguageContext from '../../contexts/LanguageContext';

export default function SharingButtons() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex space-x-4 items-center ">
      <div className="md:font-semibold ">{t('share this')} </div>
      <div className="text-gray-500 hover:text-primary">
        <FaInstagram size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaTwitter size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaFacebook size={24} />
      </div>
      <div className="text-gray-500 hover:text-primary">
        <FaPinterest size={24} />
      </div>
    </div>
  );
}
