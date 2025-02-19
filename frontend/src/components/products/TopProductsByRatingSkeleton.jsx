import { useContext } from 'react';

import LanguageContext from '../../contexts/LanguageContext';

export default function TopProductsByRatingSkeleton() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="pd:pt-28 pt-12 pd:m-52 pb-10 dark:text-primary dark:bg-gray-700">
      <h2 className="text-3xl font-semibold text-center md:mb-28 mb-10">
        {t('top products by rating')}
      </h2>
      <div className="flex flex-wrap gap-8 justify-center mb-20">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-4 w-80 animate-pulse">
            <div className="h-80 w-80 bg-gray-200 rounded-xl" />
            <div className="h-6 w-3/4 bg-gray-200 rounded" />
            <div className="h-6 w-1/2 bg-gray-200 rounded" />
            <div className="h-5 w-40 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
