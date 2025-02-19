import { useContext } from 'react';

import LanguageContext from '../../contexts/LanguageContext';

export default function ShortDescription({ categoryNames, product }) {
  const { t } = useContext(LanguageContext);
  return (
    <div className="flex flex-col rounded-xl border-2 p-5 gap-2 w-full dark:bg-gray-700 dark:border-primary">
      <div className="font-semibold text-xl mb-3">{t('short descripton')}</div>
      <div className="flex md:flex-row flex-col md:justify-between gap-3">
        <div className="md:w-2/3">
          <span className="font-semibold">{t('category')}: </span> {t(categoryNames.join(', '))}
        </div>
        <div className="md:w-1/3 md:mr-16">
          <span className="font-semibold">{t('quantity')}: </span>
          <span className={product.quantity >= 1 ? '' : 'text-red-500 font-bold'}>
            {product.quantity >= 1
              ? `${product.quantity} ${t('available')}`
              : `${t('out of stock')}`}
          </span>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col md:justify-between gap-3 md:mr-16">
        <div className="md:w-2/3">
          <span className="font-semibold">{t('recommended age')}: </span>
          {product.ageRecommendationMin} - {product.ageRecommendationMax} {t('years')}
        </div>
        <div className="md:w-1/3">
          <span className="font-semibold">{t('players number')}: </span>
          {product.playersNumberMin === product.playersNumberMax
            ? `${product.playersNumberMin} `
            : `${product.playersNumberMin} - ${product.playersNumberMax} `}
          {t('player(s)')}
        </div>
      </div>
    </div>
  );
}
