import { useSearchParams } from 'react-router-dom';

export default function Sorting() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortingValue = searchParams.get('sorting') || 'name';
  const orderValue = searchParams.get('order') || 'asc';

  const handleSortingChange = (e) => {
    const [sorting, order] = e.target.value.split('-');

    if (sorting) {
      searchParams.set('sorting', sorting);
    } else searchParams.delete('sorting');

    if (order) {
      searchParams.set('order', order);
    } else searchParams.delete('order');

    setSearchParams(searchParams);
  };

  return (
    <select
      className="p-2 w-60 border-2 rounded-lg hover:border-gray-900 focus:border-primary"
      id="sorting"
      onChange={handleSortingChange}
      value={`${sortingValue}-${orderValue}`}
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
