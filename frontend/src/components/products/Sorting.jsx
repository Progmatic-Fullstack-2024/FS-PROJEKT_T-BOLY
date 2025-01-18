

export default function Sorting({ handleSortingChange, sortingOption }) {
  return (
    <select
      className="p-2 w-60"
      id="sorting"
      onChange={handleSortingChange}
      value={`${sortingOption.sorting}-${sortingOption.order}`}
    >
      <option value="name-asc">Default sorting</option>
      <option value="name-asc">Name (A-Z)</option>
      <option value="name-desc">Name (Z-A)</option>
      <option value="price-asc">Price (Low to High)</option>
      <option value="price-desc">Price (High to Low)</option>
      <option value="rating-asc">Rating (Low to High)</option>
      <option value="rating-desc">Rating (High to Low)</option>
    </select>
  );
}
