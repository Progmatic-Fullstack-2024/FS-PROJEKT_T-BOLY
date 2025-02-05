import React, { useContext } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import WishlistContext from '../../contexts/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeProductFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return (
      <div className="mx-auto w-full h-full bg-white rounded-2xl shadow-lg p-12 flex flex-col items-center justify-center">
        <AiOutlineHeart className="text-primary text-6xl mb-6" />
        <p className="text-center text-3xl font-semibold text-gray-700">Your wishlist is empty</p>
        <p className="text-center text-gray-500 mt-4">
          Start adding items to your wishlist by browsing our products.
        </p>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full h-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      <ul className="space-y-4">
        {wishlist.map((item) => (
          <li
            key={item.product.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <Link to={`/products/${item.product.id}`} className="flex items-center space-x-4">
              <img
                src={item.product?.pictureUrl || '/placeholder-image.png'}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">{item.product.description}</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => removeProductFromWishlist(item.product.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
