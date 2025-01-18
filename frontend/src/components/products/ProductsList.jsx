
import { FiShoppingCart } from 'react-icons/fi';
import { LuHeart } from 'react-icons/lu';

import RatingStars from './RatingStars';


export default function ProductsList({ productsByCategory }) {
  return (
    <div className="flex flex-col gap-12">
      {productsByCategory && productsByCategory.length > 0 ? (
        productsByCategory.map((product, index) => (
          <div>
            <div className="flex gap-12 " key={index}>
              <div className="relative">
                <img
                  className="border-2 rounded-2xl w-80 h-80 p-7 pr-8 shrink-0"
                  src={product.pictureUrl}
                  alt={product.name}
                />
              </div>
              <div className="flex flex-col w-1/2 gap-3 justify-center">
                <div className="text-lg font-medium">{product.name}</div>
                <div>{product.description}</div>
                <div className="font-medium text-lg pt-3 pb-3">${product.price}</div>
                <div className="flex gap-2 pb-2"><RatingStars rating={product.rating}/></div>
                <div className="flex gap-4">
                  <div className="flex">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 w-40 rounded-xl bg-primary p-2 text-white  hover:text-black hover:font-semibold"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                  <button type="button" className="flex items-center text-xl justify-center p-1 hover:text-primary">
                    <LuHeart className="m-2" />
                  </button>
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
