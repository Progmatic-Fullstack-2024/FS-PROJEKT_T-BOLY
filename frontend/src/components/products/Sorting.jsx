import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import LanguageContext from '../../contexts/LanguageContext';

export default function Sorting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortingValue = searchParams.get('sorting') || 'name';
  const orderValue = searchParams.get('order') || 'asc';
  const { t } = useContext(LanguageContext);

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');

    if (sorting) {
      searchParams.set('sorting', sorting);
    } else searchParams.delete('sorting');

    if (order) {
      searchParams.set('order', order);
    } else searchParams.delete('order');

    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="p-2 w-60 border-2 rounded-lg hover:border-gray-900 focus:border-primary dark:text-primary dark:bg-gray-700 dark:border-primary dark:hover:bg-gray-600 dark:focus:border-primary"
      id="sorting"
      onChange={handleSortingChange}
      value={`${sortingValue}-${orderValue}`}
    >
      <option value="name-asc">{t('default sorting')}</option>
      <option value="name-asc">{t('name')} (A-Z)</option>
      <option value="name-desc">{t('name')} (Z-A)</option>
      <option value="price-asc">
        {t('price')} ({t('low to high')})
      </option>
      <option value="price-desc">
        {t('price')} ({t('high to low')})
      </option>
      <option value="rating-asc">
        {t('rating')} ({t('low to high')})
      </option>
      <option value="rating-desc">
        {t('rating')} ({t('high to low')})
      </option>
    </select>
  );
}
