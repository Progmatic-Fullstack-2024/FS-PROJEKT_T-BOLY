import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddToShoppingCart from './AddToShoppingCart';
import AddToWishlistHeart from './AddToWishlistHeart';
import RatingStars from './RatingStars';
import TopProductsByRatingSkeleton from './TopProductsByRatingSkeleton';
import OutOfStock from '../../assets/out_of_stock.png';
import LanguageContext from '../../contexts/LanguageContext';
import productService from '../../services/productService';

export default function TopProductsByRating() {
  const [productsByRating, setProductsByRating] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { t } = useContext(LanguageContext);
  useEffect(() => {
    const fetchTopProductsByRating = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        setProductsByRating(data.topProductsByRating);
      } catch (error) {
        toast.error(`Failed to fetch products.`);
      } finally {
        setLoading(false);
      }
    };

    fetchTopProductsByRating();
  }, []);

  if (isLoading) {
    return <TopProductsByRatingSkeleton />;
  }

  return (
    <div className="pd:pt-28 pt-12 pd:m-52 pb-10 dark:text-primary dark:bg-gray-700">
      <h2 className="text-3xl font-semibold text-center md:mb-28 mb-10">
        {t('top products by rating')}
      </h2>
      <div className="flex flex-wrap justify-center gap-8 mt-8 mb-20">
        {productsByRating.map((topProduct) => (
          <div key={topProduct.id} className="flex flex-col gap-2">
            <div className="relative">
              <Link to={`/products/${topProduct.id}`}>
                {topProduct.quantity === 0 && (
                  <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600">
                    <img src={OutOfStock} alt="" />
                  </div>
                )}
                <img
                  className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 object-contain dark:border-primary hover:border-gray-900 dark:hover:border-white dark:bg-gray-800"
                  src={topProduct.pictureUrl}
                  alt={topProduct.name}
                />
              </Link>
              <div className=" absolute text-xl top-2 right-1 ">
                <AddToWishlistHeart product={topProduct} />
              </div>
              <AddToShoppingCart product={topProduct} />
            </div>
            <div className="w-60 font-medium">{topProduct.name}</div>
            <div className="font-medium text-lg">€{topProduct.price.toFixed(2)}</div>
            <div className="flex gap-2 pb-2">
              <RatingStars rating={topProduct.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
