import React, { useContext, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { toast } from 'react-toastify';

import CartContext from '../../contexts/CartContext';

export default function AddToShoppingCart({ product }) {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInCart = cart.some((item) => item.productId === product.id);

  const handleClick = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      if (isInCart) {
        removeFromCart(product.id);
      } else {
        addToCart(product.id, 1);
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`absolute top-9 right-2 rounded-full flex items-center justify-center  ${product.quantity < 1 ? 'text-gray-300 cursor-not-allowed' : 'hover:text-primary'} `}
      disabled={product.quantity < 1 || isSubmitting}
    >
      <FiShoppingCart
        className={`m-2 ${isInCart && 'fill-primary text-primary hover:fill-red-600 hover:text-red-600'}`}
      />
    </button>
  );
}
