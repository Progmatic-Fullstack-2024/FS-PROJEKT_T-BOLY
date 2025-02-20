import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import HuFlag from '../../assets/hungary.png';
import EnFlag from '../../assets/united-kingdom.png';

export default function LanguageDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { i18n } = useTranslation();

  const languageImages = {
    en: EnFlag,
    hu: HuFlag,
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setIsOpen(false); // Close dropdown after selection
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        type="button"
        className="text-white hover:bg-opacity-90 font-medium text-sm py-2.5 text-center inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
        onClick={handleClick}
      >
        <img
          src={languageImages[i18n.language] || EnFlag}
          alt="language flag"
          className="w-8 h-8"
        />
        {isOpen ? (
          <IoIosArrowUp className="text-primary font-extrabold text-2xl" />
        ) : (
          <IoIosArrowDown className="text-primary font-extrabold text-2xl" />
        )}
      </button>
      {isOpen && (
        <ul className="absolute top-12 right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 text-gray-500 overflow-hidden dark:text-primary dark:bg-gray-800">
          <li>
            <button
              onClick={() => handleLanguageChange('en')}
              className="px-4 py-2 w-full hover:bg-gray-100 flex items-center"
              type="button"
            >
              <img src={EnFlag} alt="" className="h-8 w-8 mr-4" />
              <h6 className="">English (US)</h6>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleLanguageChange('hu')}
              className="px-4 py-2 w-full hover:bg-gray-100 flex items-center"
              type="button"
            >
              <img src={HuFlag} alt="" className="h-8 w-8 mr-4" />
              <h6 className="">Magyar (HU)</h6>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
