import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import OutOfStock from '../../assets/out_of_stock.png';
import CartContext from '../../contexts/CartContext';
import RatingStars from '../products/RatingStars';

export default function RelatedProducts({ relatedProductsByCategory }) {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <div className="md:mt-20 mt-12">
      <h2 className="text-2xl font-semibold text-center md:mb-16 mb-10">Related Products</h2>
      <div className="flex flex-wrap md:flex-row justify-center md:justify-between gap-8 mt-8">
        {relatedProductsByCategory.map((relatedProduct) => (
          <div key={relatedProduct.id} className="flex flex-col gap-2">
            <div className="relative">
              <Link to={`/products/${relatedProduct.id}`}>
                {relatedProduct.quantity === 0 && (
                  <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600">
                    <img src={OutOfStock} alt="" />
                  </div>
                )}
                <img
                  className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900"
                  src={relatedProduct.pictureUrl}
                  alt={relatedProduct.name}
                />
              </Link>
              <button
                type="submit"
                className="absolute top-2 right-2 rounded-full flex items-center justify-center hover:text-primary"
              >
                <LuHeart className="m-2" />
              </button>
              <button
                type="submit"
                className={`absolute top-9 right-2 rounded-full flex items-center justify-center  ${relatedProduct.quantity < 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primary'} `}
                onClick={() => addToCart(relatedProduct.id, 1)}
                disabled={
                  relatedProduct.quantity < 1 ||
                  cart.find((item) => item.productId === relatedProduct.id)
                }
              >
                <FiShoppingCart
                  className={`m-2 ${cart.some((item) => item.productId === relatedProduct.id) && 'fill-primary text-primary'}`}
                />
              </button>
            </div>
            <div className="w-60 font-medium">{relatedProduct.name}</div>
            <div className="font-medium text-lg">€{relatedProduct.price}</div>
            <div className="flex gap-2 pb-2">
              <RatingStars rating={relatedProduct.rating} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
