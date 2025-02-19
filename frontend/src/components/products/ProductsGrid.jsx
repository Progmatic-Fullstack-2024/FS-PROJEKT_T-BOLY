import { useContext } from 'react';
import { TbRating18Plus } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import AddToShoppingCart from './AddToShoppingCart';
import AddToWishlistHeart from './AddToWishlistHeart';
import ProductsGridSkeleton from './ProductsGridSkeleton';
import RatingStars from './RatingStars';
import OutOfStock from '../../assets/out_of_stock.png';
import AuthContext from '../../contexts/AuthContext';

export default function ProductsGrid({ productsByCategory, isLoading }) {
  const { isUserAdult } = useContext(AuthContext);

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }
  return (
    <div className="flex flex-wrap gap-8 justify-between md:mr-44">
      {productsByCategory && productsByCategory.length > 0 ? (
        productsByCategory.map((product, index) => (
          <div>
            <div className="flex flex-col gap-2" key={index}>
              <div className="relative">
                <Link to={`/products/${product.id}`}>
                  {product.quantity === 0 && (
                    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600">
                      <img src={OutOfStock} alt="" />
                    </div>
                  )}
                  <img
                    className={`border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900 dark:hover:border-white dark:bg-gray-700 dark:border-primary object-contain ${product.quantity === 0 && 'grayscale opacity-50'}`}
                    src={product.pictureUrl}
                    alt={product.name}
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <AddToWishlistHeart product={product} />
                </div>

                {!isUserAdult && product.ageRecommendationMin >= 18 ? (
                  <TbRating18Plus className="absolute top-9 right-2 text-red-500 text-4xl rounded-full flex items-center justify-center" />
                ) : (
                  <AddToShoppingCart product={product} />
                )}
              </div>
              <div className="w-60 font-medium">{product.name}</div>
              <div className="font-medium text-lg">€{product.price.toFixed(2)}</div>
              <div className="flex gap-2 pb-2">
                <RatingStars rating={product.rating} />
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
