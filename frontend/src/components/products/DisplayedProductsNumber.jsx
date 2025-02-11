import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import LanguageContext from '../../contexts/LanguageContext';

export default function DisplayedProductsNumber({ totalProducts }) {
  const [searchParams] = useSearchParams();
  const { t } = useContext(LanguageContext);

  const page = searchParams.get('page') || 1;
  const limit = searchParams.get('limit') || 9;

  return (
    <div className="hidden md:block">
      <h1>
        {t('showing')} {Math.min((page - 1) * limit + 1, totalProducts)} -{' '}
        {Math.min(page * limit, totalProducts)} {t('of')} {totalProducts} {t('results')}
      </h1>
    </div>
  );
}
