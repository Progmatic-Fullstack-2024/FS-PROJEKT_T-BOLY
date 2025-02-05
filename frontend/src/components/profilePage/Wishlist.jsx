import React, { useContext } from 'react';
import WishlistContext from '../../contexts/WishlistContext';

export default function Wishlist() {
  const { wishlist, removeProductFromWishlist } = useContext(WishlistContext);

  if (wishlist.length === 0) {
    return <p className="text-center text-gray-500">Your favorites list is empty.</p>;
  }
  console.log(wishlist);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      <ul className="space-y-4">
        {wishlist.map((item) => (
          <li
            key={item.product.id}
            className="flex items-center justify-between p-4 border rounded-lg shadow-sm"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.product?.pictureUrl || '/placeholder-image.png'}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{item.product.name}</h2>
                <p className="text-sm text-gray-500">{item.product.description}</p>
              </div>
            </div>
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
