import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AuthContext from './AuthContext.jsx';
import shoppingCartService from '../services/shoppingCartService.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(10);
  const [coupon, setCoupon] = useState('');

  useEffect(() => {
    const getCart = async () => {
      try {
        if (user?.username) {
          const userCart = await shoppingCartService.getShoppingCartByUserId();
          setCart(userCart);
        } else {
          setCart([]);
        }
      } catch (error) {
        toast.error('Error fetching cart');
      }
    };
    getCart();
    setIsLoading(false);
  }, [user?.username]);

  useEffect(() => {
    const calculateSubtotalPrice = () => {
      const total = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      setSubtotalPrice(total);
      const discountPrice = coupon ? (total / 100) * (100 - coupon.discount) : total;
      const newShippingPrice = discountPrice > 150 ? 0 : 10;
      setShippingPrice(newShippingPrice);
      setTotalPrice(discountPrice + newShippingPrice);
    };
    calculateSubtotalPrice();
  }, [cart, coupon]);

  const addToCart = async (productId, quantity) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (isSubmitting) return;
    setIsSubmitting(true);
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
        setIsSubmitting(false);
        return [...cartItems, { id, name, pictureUrl, price, productId, quantity }];
      });
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeFromCart = async (productId) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await shoppingCartService.removeCartItem(productId);

      const newCart = await shoppingCartService.getShoppingCartByUserId();

      setCart(newCart);
      setIsSubmitting(false);
      toast.success('Product(s) deleted from cart succesfully.');
    } catch (error) {
      toast.error('Could not delete product from cart.');
    } finally {
      setIsSubmitting(false);
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

  const clearCart = async () => {
    try {
      await shoppingCartService.clearShoppingCart();
      setCart([]);
    } catch (error) {
      toast.error('Could not clear the cart.');
    }
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateCartItem,
    clearCart,
    subtotalPrice,
    totalPrice,
    shippingPrice,
    coupon,
    setCoupon,
  };

  return <CartContext.Provider value={value}>{!isLoading && children}</CartContext.Provider>;
}

export default CartContext;
