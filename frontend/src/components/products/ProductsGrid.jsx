import { useContext } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';
import { Link } from 'react-router-dom';

import RatingStars from './RatingStars';
import OutOfStock from '../../assets/out_of_stock.png';
import CartContext from '../../contexts/CartContext';

export default function ProductsGrid({ productsByCategory }) {
  const { cart, addToCart } = useContext(CartContext);

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
                    className={`border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0 hover:border-gray-900 ${product.quantity === 0 && 'grayscale opacity-50'}`}
                    src={product.pictureUrl}
                    alt={product.name}
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
                  className={`absolute top-9 right-2 rounded-full flex items-center justify-center  ${product.quantity < 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primary'} `}
                  onClick={() => addToCart(product.id, 1)}
                  disabled={
                    product.quantity < 1 || cart.find((item) => item.productId === product.id)
                  }
                >
                  <FiShoppingCart
                    className={`m-2 ${cart.some((item) => item.productId === product.id) && 'fill-primary text-primary'}`}
                  />
                </button>
              </div>
              <div className="w-60 font-medium">{product.name}</div>
              <div className="font-medium text-lg">€{product.price}</div>
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
