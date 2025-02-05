import { FiShoppingCart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import AddToWishlistHeart from './AddToWishlistHeart';
import RatingStars from './RatingStars';

export default function ProductsList({ productsByCategory }) {
  return (
    <div className="flex flex-col gap-12">
      {productsByCategory && productsByCategory.length > 0 ? (
        productsByCategory.map((product, index) => (
          <div>
            <div className="flex gap-12 " key={index}>
              <div className="relative">
                <Link to={`/products/${product.id}`}>
                  <img
                    className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900"
                    src={product.pictureUrl}
                    alt={product.name}
                  />
                </Link>
              </div>
              <div className="flex flex-col w-1/2 gap-3 justify-center">
                <div className="text-lg font-medium">{product.name}</div>
                <div className="text-justify">{product.description}</div>
                <div className="font-medium text-lg pt-3 pb-3">€{product.price}</div>
                <div className="flex gap-2 pb-2">
                  <RatingStars rating={product.rating} />
                </div>
                <div className="flex gap-4">
                  <div className="flex">
                    <button
                      type="button"
                      className={`flex items-center justify-center gap-3 w-40 rounded-xl border-2 ${product.quantity >= 1 ? 'border-primary bg-primary p-2 text-white hover:border-gray-900 hover:text-black' : 'border-gray-200 bg-gray-200 text-gray-900 cursor-not-allowed'}`}
                      disabled={product.quantity < 1}
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                  <div className="text-3xl">
                    <AddToWishlistHeart product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div>No products found for this category.</div>
      )}
    </div>
  );
}
