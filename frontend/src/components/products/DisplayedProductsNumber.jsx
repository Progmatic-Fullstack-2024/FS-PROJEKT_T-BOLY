import { useSearchParams } from 'react-router-dom';

export default function DisplayedProductsNumber({ totalProducts }) {
  const [searchParams] = useSearchParams();

  const page=searchParams.get('page') || 1
  const limit=searchParams.get('limit') || 9

  return (
    <div className="hidden md:block">
      <h1>
        Showing{' '}
        {Math.min((page - 1) * limit + 1, totalProducts)} -{' '}
        {Math.min(page * limit, totalProducts)} of{' '}
        {totalProducts} results
      </h1>
    </div>
  );
}
