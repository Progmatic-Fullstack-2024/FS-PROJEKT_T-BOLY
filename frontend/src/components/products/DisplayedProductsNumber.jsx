

export default function DisplayedProductsNumber({pageNumber, totalProducts}) {
  return (
    <div>
      <h1>
        Showing {Math.min((pageNumber - 1) * 9 + 1, totalProducts)} -{' '}
        {Math.min(pageNumber * 9, totalProducts)} of {totalProducts} results
      </h1>
    </div>
  );
}
