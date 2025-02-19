export default function QuantityChangeButtons({
  handleDecrement,
  handleIncrement,
  product,
  productInCartCount,
  maxQuantity,
}) {
  return (
    <div className="flex items-center dark:text-primary">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={productInCartCount <= 1}
        className={`px-5 py-2 text-xl font-bold border-t-2 border-l-2 border-b-2 rounded-l-xl dark:bg-gray-700 dark:border-primary dark:hover:bg-gray-600 ${productInCartCount <= 1 ? 'bg-gray-200 cursor-not-allowed border-gray-200 dark:hover:bg-gray-600 dark:text-primary dark:bg-gray-700 dark:cursor-not-allowed' : 'border-primary hover:bg-primary hover:text-white text-gray-900 dark:text-primary dark:bg-gray-700'}`}
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
        className={`px-5 py-2 text-xl font-bold border-t-2 border-r-2 border-b-2 rounded-r-xl dark:bg-gray-700 ${productInCartCount >= maxQuantity ? 'bg-gray-200 cursor-not-allowed dark:text-primary dark:bg-gray-700 dark:cursor-not-allowed border-gray-200 dark:border-primary dark:hover:bg-gray-600' : 'border-primary hover:bg-primary dark:border-primary dark:hover:bg-gray-600 hover:text-white text-gray-primary'}`}
      >
        +
      </button>
    </div>
  );
}
