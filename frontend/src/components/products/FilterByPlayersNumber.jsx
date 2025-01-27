import { useSearchParams } from 'react-router-dom';

export default function FilterByPlayersNumber() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterByPlayersNumber = (e) => {
    searchParams.set('players', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="p-2 w-60 border-2 rounded-lg hover:border-gray-900 focus:border-primary"
      id="players-number"
      onChange={handleFilterByPlayersNumber}
      value={searchParams.get('players')}
    >
      <option value="all">Number of players</option>
      <option value="2-2">Pair (2 players)</option>
      <option value="3-5">Small group (3-5 players)</option>
      <option value="6-99">Large group (6+ players)</option>
    </select>
  );
}
