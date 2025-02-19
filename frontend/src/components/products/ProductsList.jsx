import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { TbRating18Plus } from 'react-icons/tb';
import { Link } from 'react-router-dom';

import AddToWishlistHeart from './AddToWishlistHeart';
import ProductsGridSkeleton from './ProductsGridSkeleton';
import RatingStars from './RatingStars';
import OutOfStock from '../../assets/out_of_stock.png';
import AuthContext from '../../contexts/AuthContext';
import CartContext from '../../contexts/CartContext';
import LanguageContext from '../../contexts/LanguageContext';

export default function ProductsList({ productsByCategory, isLoading }) {
  const { addToCart, cart } = useContext(CartContext);
  const { t } = useContext(LanguageContext);
  const { isUserAdult } = useContext(AuthContext);

  if (isLoading) {
    return <ProductsGridSkeleton />;
  }

  return (
    <div className="flex flex-col gap-12">
      {productsByCategory && productsByCategory.length > 0 ? (
        productsByCategory.map((product, index) => (
          <div>
            <div className="flex gap-12 " key={index}>
              <div className="relative">
                <Link to={`/products/${product.id}`}>
                {!isUserAdult && product.ageRecommendationMin >= 18 && (
                  <TbRating18Plus className='absolute top-2 right-2 text-red-500 text-4xl rounded-full flex items-center justify-center'/>
                )}
                  {product.quantity === 0 && (
                    <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600">
                      <img src={OutOfStock} alt="" />
                    </div>
                  )}
                  <img
                    className={`border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900 dark:hover:border-white dark:bg-gray-700 dark:border-primary object-contain ${product.quantity === 0 && 'grayscale opacity-50'} `}
                    src={product.pictureUrl}
                    alt={product.name}
                  />
                </Link>
              </div>
              <div className="flex flex-col w-1/2 gap-3 justify-center">
                <div className="text-lg font-medium">{product.name}</div>
                <div className="text-justify">{product.description}</div>
                <div className="font-medium text-lg pt-3 pb-3">€{product.price.toFixed(2)}</div>
                <div className="flex gap-2 pb-2">
                  <RatingStars rating={product.rating} />
                </div>
                <div className="flex gap-4">
                  <div className="flex">


                    {cart.find((item) => item.productId === product.id) ? (
                      <Link
                        to="/shoppingCart"
                        className="flex items-center justify-center gap-3 w-40 rounded-xl border-2 border-green-600 bg-green-600 text-white hover:border-gray-900 hover:text-black"
                      >
                        <FiShoppingCart />
                        {t('in cart')}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        className={`flex items-center justify-center gap-3 w-40 rounded-xl border-2 ${product.quantity < 1 || !isUserAdult && product.ageRecommendationMin >= 18 ? 'border-gray-200 bg-gray-200 text-gray-900 cursor-not-allowed' : 'border-primary bg-primary p-2 text-white hover:border-gray-900 hover:text-black'} `}
                        onClick={() => addToCart(product.id, 1)}
                        disabled={product.quantity < 1 || !isUserAdult && product.ageRecommendationMin >= 18}
                      >
                        <FiShoppingCart />
                        {product.quantity < 1 ? t('out of stock') : t(`add to cart`)}
                      </button>
                    )}
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
