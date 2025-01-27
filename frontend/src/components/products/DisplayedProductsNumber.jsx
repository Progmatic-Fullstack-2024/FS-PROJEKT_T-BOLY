import { useSearchParams } from 'react-router-dom';

export default function DisplayedProductsNumber({ totalProducts }) {
  const [searchParams] = useSearchParams();

  return (
    <div className="hidden md:block">
      <h1>
        Showing{' '}
        {Math.min((searchParams.get('page') - 1) * searchParams.get('limit') + 1, totalProducts)} -{' '}
        {Math.min(searchParams.get('page') * searchParams.get('limit'), totalProducts)} of{' '}
        {totalProducts} results
      </h1>
    </div>
  );
}
