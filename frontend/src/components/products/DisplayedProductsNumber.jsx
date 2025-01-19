export default function DisplayedProductsNumber({limit, pageNumber, totalProducts}) {
  return (
    <div>
      <h1>
        Showing {Math.min((pageNumber - 1) * limit + 1, totalProducts)} -{' '}
        {Math.min(pageNumber * limit, totalProducts)} of {totalProducts} results
      </h1>
    </div>
  );
}
