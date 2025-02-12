import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import HuFlag from '../../assets/hungary.png';
import EnFlag from '../../assets/united-kingdom.png';

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  const languageImages = {
    en: EnFlag,
    hu: HuFlag,
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <button
      type="button"
      className="text-white hover:bg-opacity-90 font-medium text-sm py-2.5 text-center inline-flex items-center"
      onClick={handleClick}
    >
      <img src={languageImages[i18n.language] || EnFlag} alt="language flag" className="w-8 h-8" />
      {isOpen && (
        <ul className="absolute top-32 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-gray-500 overflow-hidden">
          <li>
            <button
              onClick={() => handleLanguageChange('en')}
              className="px-4 py-2 w-full hover:bg-gray-100 flex"
              to="profile_page/orders"
              type="button"
            >
              <img src={EnFlag} alt="" className="h-8 w-8 mr-4" />
              <h6 className="">English (US)</h6>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLanguageChange('hu')}
              className="px-4 py-2 w-full hover:bg-gray-100 flex"
              to="profile_page/orders"
              type="button"
            >
              <img src={HuFlag} alt="" className="h-8 w-8 mr-4" />
              <h6 className="">Magyar (HU)</h6>
            </button>
          </li>
        </ul>
      )}
    </button>
  );
}
