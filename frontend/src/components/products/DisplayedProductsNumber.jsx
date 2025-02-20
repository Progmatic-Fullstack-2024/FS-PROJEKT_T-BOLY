import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import LanguageContext from '../../contexts/LanguageContext';

export default function DisplayedProductsNumber({ totalProducts, isLoading }) {
  const [searchParams] = useSearchParams();
  const { t } = useContext(LanguageContext);

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 9;

  if (isLoading) {
    return (
      <div className="hidden md:block ml-auto">
        <h1>{`${t('showing')} ... - ... ${t('of')} ... ${t('results')}`}</h1>
      </div>
    );
  }

  return (
    <div className="hidden md:block dark:text-primary ml-auto">
      <h1>
        {t('showing')} {Math.min((page - 1) * limit + 1, totalProducts)} -{' '}
        {Math.min(page * limit, totalProducts)} {t('of')} {totalProducts} {t('results')}
      </h1>
    </div>
  );
}
