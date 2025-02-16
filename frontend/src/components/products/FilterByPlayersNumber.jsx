import { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';

import LanguageContext from '../../contexts/LanguageContext';

export default function FilterByPlayersNumber() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useContext(LanguageContext);

  const handleFilterByPlayersNumber = (e) => {
    if (e.target.value === 'all') {
      searchParams.delete('players');
    } else {
      searchParams.set('players', e.target.value);
    }
    searchParams.set('page', 1);
    searchParams.set('limit', 9);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="p-2 w-60 border-2 rounded-lg hover:border-gray-900 focus:border-primary"
      id="players-number"
      onChange={handleFilterByPlayersNumber}
      value={searchParams.get('players') || 'all'}
    >
      <option value="all">{t('number of players')}</option>
      <option value="2-2">
        {t('pair')} (2 {t('players')})
      </option>
      <option value="3-5">
        {t('small group')} (3-5 {t('players')})
      </option>
      <option value="6-99">
        {t('large group')} (6+ {t('players')})
      </option>
    </select>
  );
}
