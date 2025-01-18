

export default function FilterByPlayersNumber({handleFilterByPlayersNumber, filterByPlayersNumber}) {
  return (
    <select
      className="p-2 w-60"
      id="players-number"
      onChange={handleFilterByPlayersNumber}
      value={filterByPlayersNumber}
    >
      <option value="all">Players Number</option>
      <option value="all">All</option>
      <option value="2-2">Pair (2 players)</option>
      <option value="3-5">Small group (3-5 players)</option>
      <option value="6-99">Large group (6+ players)</option>
    </select>
  );
}
