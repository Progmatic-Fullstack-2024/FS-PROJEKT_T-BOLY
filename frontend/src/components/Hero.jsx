import { useContext } from 'react';
import { Link } from 'react-router-dom';

import LanguageContext from '../contexts/LanguageContext';

export default function Hero() {
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex bg-fixed bg-center shadow-inner bg-cover bg-[url('https://www.picishop.hu/adat/hero2.jpg')] ">
      <div className="flex h-[700px] md:justify-end justify-center w-screen dark:text-white dark:bg-gray-700 dark:bg-opacity-50">
        <div className="text-center md:w-1/2 my-auto md:text-right md:pr-20 ">
          <p className="hidden lg:block font-agbalumo text-orange-500 drop-shadow-[4px_4px_2px_rgba(255,255,255,0.90)] text-6xl pb-20 dark:drop-shadow-[4px_4px_2px_rgba(245,125,13,0.90)] dark:text-gray-600">
            {t('Crafting smiles with every toy, made for learning, fun, and growth')}
          </p>
          <div className="md:pl-10">
            <Link
              type="button"
              className="bg-orange-400 hover:bg-orange-500 text-white md:text-2xl hover:drop-shadow drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] py-4 px-10 rounded-full dark:drop-shadow-[4px_4px_2px_rgba(245,125,13,0.90)] dark:text-primary dark:bg-gray-600 dark dark:hover:bg-gray-800"
              to="/products/category/all"
            >
              {t('shop now')}
            </Link>
          </div>

          <div>
            <p className="flex-1 w-140 font-agbalumo text-orange-500 drop-shadow-[3px_3px_1px_rgba(255,255,255,0.90)] content-center text-3xl pt-20 dark:drop-shadow-[4px_4px_2px_rgba(245,125,13,0.90)] dark:text-gray-600">
              {t('how do you start')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
