import { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

import AuthContext from './AuthContext.jsx';
import wishlistService from '../services/wishlistService.js';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSumitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (user?.username) {
          const data = await wishlistService.getWishlist();
          setWishlist(data.products || []);
        } else {
          setWishlist([]);
        }
      } catch (error) {
        toast.error('Error fetching wishlist');
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, [user?.username]);

  const addProductToWishlist = async (productId) => {
    if (isSumitting) return;
    setIsSubmitting(true);
    try {
      const updatedWishlist = await wishlistService.addProduct(productId);
      setWishlist(updatedWishlist.products);
      setIsSubmitting(false);
      toast.success('Product added to wishlist');
    } catch (error) {
      toast.error('Error adding product to wishlist');
    }
  };

  const removeProductFromWishlist = async (productId) => {
    if (isSumitting) return;
    setIsSubmitting(true);
    try {
      await wishlistService.removeProduct(productId);
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.productId !== productId));
      setIsSubmitting(false);
      toast.success('Product removed from wishlist');
    } catch (error) {
      toast.error('Error removing product from wishlist');
    }
  };

  const value = {
    wishlist,
    addProductToWishlist,
    removeProductFromWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>{!isLoading && children}</WishlistContext.Provider>
  );
}

export default WishlistContext;
