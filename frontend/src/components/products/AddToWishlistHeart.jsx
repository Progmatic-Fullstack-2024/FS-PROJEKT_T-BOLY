import React, { useContext, useState } from 'react';
import { IoHeartOutline, IoHeartSharp } from 'react-icons/io5';
import { toast } from 'react-toastify';

import WishlistContext from '../../contexts/WishlistContext';

export default function AddToWishlistHeart({ product }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { wishlist, addProductToWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  const isInWishlist = wishlist.some((item) => item.productId === product.id);

  const handleClick = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (isInWishlist) {
        await removeProductFromWishlist(product.id);
      } else {
        await addProductToWishlist(product.id);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <button
      disabled={isSubmitting}
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
