export default function ShortDescription({ categoryNames, product }) {
  return (
    <div className="flex flex-col rounded-xl border-2 p-5 gap-2 w-full">
      <div className="font-semibold text-xl mb-3">Short description</div>
      <div className="flex md:flex-row flex-col md:justify-between gap-3">
        <div className="md:w-2/3">
          <span className="font-semibold">Category:</span> {categoryNames.join(', ')}
        </div>
        <div className="md:w-1/3 md:mr-16">
          <span className="font-semibold">Quantity: </span>
          <span className={product.quantity >= 1 ? '' : 'text-red-500 font-bold'}>
            {product.quantity >= 1 ? `${product.quantity} available` : `Out of stock`}
          </span>
        </div>
      </div>
      <div className=" flex md:flex-row flex-col md:justify-between gap-3 md:mr-16">
        <div className="md:w-2/3">
          <span className="font-semibold">Recommended age: </span>
          {product.ageRecommendationMin} - {product.ageRecommendationMax} years
        </div>
        <div className="md:w-1/3">
          <span className="font-semibold">Players number: </span>
          {product.playersNumberMin === product.playersNumberMax
            ? `${product.playersNumberMin} `
            : `${product.playersNumberMin} - ${product.playersNumberMax} `}
          player(s)
        </div>
      </div>
    </div>
  );
}
