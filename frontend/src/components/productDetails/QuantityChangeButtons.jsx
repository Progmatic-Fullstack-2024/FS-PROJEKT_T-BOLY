export default function QuantityChangeButtons({
  handleDecrement,
  handleIncrement,
  product,
  productInCartCount,
  maxQuantity,
}) {
  return (
    <div className="flex items-center">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={productInCartCount <= 1}
        className={`px-5 py-2 text-xl font-bold border-t-2 border-l-2 border-b-2 rounded-l-xl  ${productInCartCount <= 1 ? 'bg-gray-200 cursor-not-allowed border-gray-200' : 'border-primary hover:bg-primary hover:text-white text-gray-900'}`}
      >
        -
      </button>
      <div
        className={`px-6 py-2 border-2 text-xl ${product.quantity > 0 ? 'border-primary' : 'border-gray-200'}`}
      >
        {productInCartCount}
      </div>
      <button
        type="button"
        onClick={handleIncrement}
        disabled={productInCartCount >= maxQuantity}
        className={`px-5 py-2 text-xl font-bold border-t-2 border-r-2 border-b-2 rounded-r-xl ${productInCartCount >= maxQuantity ? 'bg-gray-200 cursor-not-allowed border-gray-200' : 'border-primary hover:bg-primary hover:text-white text-gray-900'}`}
      >
        +
      </button>
    </div>
  );
}
