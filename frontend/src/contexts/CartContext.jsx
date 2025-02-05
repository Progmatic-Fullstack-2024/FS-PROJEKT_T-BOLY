import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import shoppingCartService from '../services/shoppingCartService.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        const userCart = await shoppingCartService.getShoppingCartByUserId();
        setCart(userCart);
      } catch (error) {
        toast.error('Error fetching cart');
      }
    };
    getCart();
    setIsLoading(false);
  }, []);

  const addToCart = async (productId, quantity) => {
    try {
      const newCartItem = await shoppingCartService.addCartItem(productId, quantity);
      const { id, name, pictureUrl, price } = newCartItem.product;

      setCart((prev) => {
        const cartItems = Array.isArray(prev) ? prev : [];
        const existingItem = cartItems?.find((item) => item.productId === productId);
        if (existingItem)
          return cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
          );

        return [...cartItems, { id, name, pictureUrl, price, productId, quantity }];
      });
      toast.success('Product(s) added to cart succesfully.');
    } catch (error) {
      toast.error('Could not add product to cart.');
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await shoppingCartService.removeCartItem(productId);

      const newCart = await shoppingCartService.getShoppingCartByUserId();

      setCart(newCart);
      toast.success('Product(s) deleted from cart succesfully.');
    } catch (error) {
      toast.error('Could not delete product from cart.');
    }
  };

  const updateCartItem = async (productId, quantity) => {
    if (quantity === 0) return removeFromCart(productId);
    try {
      await shoppingCartService.updateCartItem(productId, quantity);
      return setCart((prev) => {
        const cartItems = Array.isArray(prev) ? prev : [];
        const existingItem = cartItems.find((item) => item.productId === productId);
        if (existingItem)
          return cartItems.map((item) =>
            item.productId === productId ? { ...item, quantity } : item,
          );
        return [...cartItems, { productId, quantity }];
      });
    } catch (error) {
      return toast.error('Could not update the product quantity in cart.');
    }
  };

  const value = { cart, addToCart, removeFromCart, updateCartItem };

  return <CartContext.Provider value={value}>{!isLoading && children}</CartContext.Provider>;
}

export default CartContext;
