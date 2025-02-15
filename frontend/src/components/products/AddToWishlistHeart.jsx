import React, { useContext } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';

import WishlistContext from '../../contexts/WishlistContext';

export default function AddToWishlistHeart({ product }) {
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  const handleClick = async () => {
    if (isInWishlist) {
      await removeProductFromWishlist(product.id);
    } else {
      await addProductToWishlist(product.id);
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className="rounded-full flex items-center justify-center hover:text-primary"
    >
      {isInWishlist ? (
        <IoHeartSharp className="m-2 text-primary" />
      ) : (
        <IoHeartOutline className="m-2" />
      )}
    </button>
  );
}
