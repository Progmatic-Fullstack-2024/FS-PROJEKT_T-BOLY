import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddToShoppingCart from './AddToShoppingCart';
import AddToWishlistHeart from './AddToWishlistHeart';
import RatingStars from './RatingStars';
import OutOfStock from '../../assets/out_of_stock.png';
import productService from '../../services/productService';

export default function TopProductsByRating() {
  const [productsByRating, setProductsByRating] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <div className="text-center p-32 text-3xl">Loading...</div>;
  }

  return (
    <div className="md:mt-28 mt-12 md:m-52">
      <h2 className="text-3xl font-semibold text-center md:mb-28 mb-10">Top Products</h2>
      <div className="flex flex-wrap md:flex-row flex-col justify-center md:justify-between gap-8 mt-8">
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
                  className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900"
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
            <div className="font-medium text-lg">€{topProduct.price}</div>
            <div className="flex gap-2 pb-2">
              <RatingStars rating={topProduct.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
